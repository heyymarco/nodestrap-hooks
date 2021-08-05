// jss   (builds css  using javascript):
import {
    JssValue,
    StyleSheet,

    create as createJss,
}                           from 'jss'          // base technology of our nodestrap components
import jssPluginCamelCase   from 'jss-plugin-camel-case'
import jssPluginExpand      from 'jss-plugin-expand'
import jssPluginVendor      from 'jss-plugin-vendor-prefixer'
// import jssPluginGlobal      from './jss-plugin-global'
import jssPluginShort       from './jss-plugin-short'
import jssPluginGlobal      from 'jss-plugin-global' // TODO: fix global plugin

// nodestrap (modular web components):
import type {
    Factory,
    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './types'      // nodestrap's types
import type {
    PropEx,
    Cust,
}                           from './css-types'  // ts defs support for jss

// utils:
import { pascalCase }       from 'pascal-case'  // pascal-case support for jss
import { camelCase }        from 'camel-case'   // camel-case  support for jss



// general types:
export type PropList                     = Dictionary<JssValue>

export type Refs     <TProps extends {}> = { [key in keyof TProps]: Cust.Ref    } // typescript helper: make the TValue appears as Cust.Ref (string)
export type Decls    <TProps extends {}> = { [key in keyof TProps]: Cust.Decl   } // typescript helper: make the TValue appears as Cust.Decl (string)
export type Vals     <TProps extends {}> = { [key in keyof TProps]: TProps[key] } // typescript helper: make the TValue appears as TProps's TValue
export type CssConfig<TProps extends {}> = readonly [Refs<TProps>, Decls<TProps>, Vals<TProps>, ((immediately?: boolean) => void)]



// defaults:
const _defaultRule = ':root';



// jss:
const customJss = createJss().setup({plugins:[
    jssPluginGlobal(),    // requires to be placed before all other plugins
    jssPluginShort(),     // requires to be placed before `camelCase`
    jssPluginCamelCase(),
    jssPluginExpand(),
    jssPluginVendor(),
]});



/**
 * Stores & retrieves configuration using *css custom properties* (css variables) stored at `:root` level (default) or at the desired `rule`.  
 * The config's values can be *accessed directly* in CSS and DOM.
 * 
 * Supports get property by *declaration*, eg:  
 * `myButtonConfig.decls.myFavColor` => returns `'--myBtn-myFavColor'`.  
 * 
 * Supports get property by *reference*, eg:  
 * `myButtonConfig.refs.myFavColor`  => returns `'var(--myBtn-myFavColor)'`.  
 * 
 * Supports get property by *value*, eg:  
 * `myButtonConfig.vals.myFavColor`  => returns `'#ff0000'`.  
 * 
 * Supports set property, eg:  
 * `myButtonConfig.vals.myFavColor = 'red'`  
 * 
 * Supports delete property, eg:  
 * `myButtonConfig.vals.myFavColor = undefined
 * @param prefix The prefix name of the generated css custom props.
 * @param rule The declaring location (selector) of the generated css custom props.
 */
const createCssConfig = <TProps extends {}>(prefix: string, initialProps: TProps|Factory<TProps>, rule = _defaultRule): CssConfig<TProps> => {
    // data sources:

    type TValue       = ValueOf<TProps>

    /**
     * A *virtual css*.  
     * The source of truth.  
     * If modified, causing the `genProps` & `genKeyframes` need to `refresh()`.
     */
    const props       : Dictionary</*original: */TValue> = ((typeof(initialProps) === 'function') ? (initialProps as Factory<TProps>)() : initialProps);



    // generated data:

    /**
     * The *generated css* resides on memory only.  
     * Similar to `props` but some values has been partially/fully *transformed*.  
     * The duplicate values has been replaced with a `var(...)` linked to the existing ones.  
     * eg:  
     * // origin:  
     * props = {  
     *    --col-red      : '#ff0000',  
     *    --col-blue     : '#0000ff',  
     *    --bd-width     : '1px',  
     *    
     *    --col-favorite : '#ff0000',  
     *    --the-border   : [[ 'solid', '1px', '#0000ff' ]],  
     * };  
     *   
     * // transformed:  
     * genProps = {  
     *    --col-red      : '#ff0000',  
     *    --col-blue     : '#0000ff',  
     *    --bd-width     : '1px',  
     *    
     *    --col-favorite : 'var(--col-red)',  
     *    --the-border   : [[ 'solid', 'var(--bd-width)', 'var(--col-blue)' ]],  
     * };  
     */
    let genProps      : Dictionary</*original: */TValue | /*transformed: */Cust.Expr> = {};

    /**
     * The *generated css* of `@keyframes` resides on memory only.
     */
    let genKeyframes  : Dictionary<PropEx.Keyframes> = {};

    /**
     * The *generated css* attached on dom.
     */
    let genStyleSheet : StyleSheet<'@global'> | null = null;

    /**
     * Gets the *declaration name* of the specified `propName`, eg: `--my-favColor`.
     * @param propName The `props`'s prop name to retrieve.
     * @returns A `Cust.Decl` represents the declaration name of the specified `propName`.
     */
    const decl = (propName: string): Cust.Decl => {
        propName = propName.replace(/^@keyframes\s+/, 'keyframes-'); // replace `@keyframes fooSomething` => `keyframes-fooSomething`

        return prefix ? `--${prefix}-${propName}` : `--${propName}`; // add double dash with prefix `--prefix-` or double dash without prefix `--`
    }

    /**
     * Gets the *value* (reference) of the specified `propName`, not the *direct* value, eg: `var(--my-favColor)`.
     * @param propName The `props`'s prop name to retrieve.
     * @returns A `Cust.Ref` represents the expression for retrieving the value of the specified `propName`.
     */
    const ref = (propName: string): Cust.Ref => {
        return `var(${decl(propName)})`;
    }

    /**
     * Gets the *value* (reference) of the specified `keyframesName`.
     * @param keyframesName The `props`'s `@keyframes` name to retrieve.
     * @returns A `Cust.KeyframesRef` represents the expression for retrieving the value of the specified `keyframesName`.
     */
    const keyframesRef = (keyframesName: string): Cust.KeyframesRef => {
        return prefix ? `${prefix}-${keyframesName}` : keyframesName; // add prefix `--prefix-` or just a `keyframesName`
    }



    // constructions:

    /**
     * Transforms the specified `srcProps` with the equivalent literal object,  
     * in which some values might be partially/fully *transformed*.  
     * The duplicate values will be replaced with a `var(...)` linked to the existing props in `refProps`.  
     * @param srcProps The literal object to transform.
     * @param refProps The literal object as the props reference.
     * @param propRename A handler to rename the prop names of `srcProps`.
     * @returns  
     * `null` => *no* transformation was performed.  
     * -or-  
     * A literal object which is equivalent to `srcProps`.
     */
    const transformDuplicates = <TSrcValue, TRefValue>(srcProps: Dictionary<TSrcValue>, refProps: Dictionary<TRefValue>, propRename?: ((srcPropName: string) => string)): (Dictionary<TSrcValue|Cust.Ref|Cust.KeyframesRef|any[]> | null) => {
        /**
         * Determines if the specified `prop` can be transformed to another equivalent prop link `var(...)`.
         * @param prop The value to test.
         * @returns `true` indicates its transformable, otherwise `false`.
         */
        const isTransformableProp = <TTProp,>(prop: TTProp): boolean => {
            if ((prop === undefined) || (prop === null)) return false; // skip empty prop

            if ((typeof(prop) === 'string') && (/^(none|unset|inherit|initial)$/).test(prop)) return false; // ignore reserved keywords

            return true; // passed, transformable
        };

        /**
         * Determines if the specified `srcName` and `refName` are pointed to the same object.
         * @param srcName The prop name of `srcProps`.
         * @param refName The prop name of `refProps`.
         * @returns `true` indicates the same object, otherwise `false`.
         */
        const isSelfProp = (srcName: string, refName: string): boolean => {
            if (!Object.is(srcProps, refProps)) return false; // if srcProps & refProps are not the same object in memory => always return false
            
            return (srcName === refName);
        };

        const isExistingKeyframes = <TTRefProp,>(refProp: TTRefProp): boolean => {
            if (typeof refProp !== 'object') return false;
            if (Array.isArray(refProp))      return false;
            
            
            
            return Object.values(genKeyframes).some((kf) => ((kf as Object) === (refProp as Object)));
        };

        const deepEquals = (srcProp: Object, refProp: Object): boolean => {
            if (Object.is(srcProp, refProp)) return true;



            if (isExistingKeyframes(refProp)) return false; // @keyframes must be compared by reference, no deep equal



            if (typeof srcProp !== 'object') return false;
            if (typeof refProp !== 'object') return false;
            if (Array.isArray(srcProp) !== Array.isArray(refProp)) return false; // both must be an array -or- both must not be an array



            if (Object.keys(srcProp).length !== Object.keys(refProp).length) return false; // items count are different => false
            for (const [name, prop] of Object.entries(srcProp)) {
                if (!deepEquals(prop, (refProp as any)[name])) return false; // the same prop name with different values => false
            } // for



            return true; // no differences detected => true
        };

        /**
         * Determines if the specified `srcProp` and `refProp` are deeply the same by value.
         * @param srcProp The first value to test.
         * @param refProp The second value to test.
         * @returns 
         */
        const isEqualProp = <TTSrcProp, TTRefProp>(srcProp: TTSrcProp, refProp: TTRefProp) => {
            return deepEquals(srcProp, refProp);
        };

        /**
         * Determines if the specified prop [key = `srcName` : value = `srcProp`] has the equivalent prop previously.
         * @param srcName The prop name (key).
         * @param srcProp The prop value.
         * @returns A `Cust.Ref` (`string`) represents the link to the equivalent prop `var(...)`  
         * -or- `null` if no equivalent found.
         */
        const findEqualProp = <TTSrcProp,>(srcName: string, srcProp: TTSrcProp): (Cust.Ref|null) => {
            for (const [refName, refProp] of Object.entries(refProps)) { // search for duplicates
                if ((refProp === undefined) || (refProp === null)) continue; // skip empty ref
                if (isSelfProp(srcName, refName)) break;                     // stop search if reaches current pos (search for prev props only)



                if (!isTransformableProp(srcProp)) continue; // skip non transformable prop



                // comparing the srcProp & refProp:
                if (isEqualProp(srcProp, refProp)) {
                    return ref(refName); // return the link to the ref
                }
            } // for // search for duplicates

            return null; // not found
        }


        
        /**
         * Stores the modified props in `srcProps`.
         */
        const modifSrcProps: Dictionary<TSrcValue|Cust.Ref|Cust.KeyframesRef|any[]> = {}; // initially empty (no modification)



        for (const [srcName, srcProp] of Object.entries(srcProps)) { // walk each props in srcProps
            if ((srcProp === undefined) || (srcProp === null)) continue; // skip empty src



            //#region handle @keyframes foo
            {
                /**
                 * Determines if the current `srcName` is a special `@keyframes name`.  
                 * value:  
                 * `undefined` => *not* a special `@keyframes name`.  
                 * `string`    => represents the name of the `@keyframes`.
                 */
                const keyframesName = srcName.match(/(?<=@keyframes\s+).+/)?.[0];
                if (keyframesName) {
                    /**
                     * Assumes the current `srcProp` is a valid `@keyframes`' value.
                     */
                    const srcKeyframeProp = srcProp as unknown as PropEx.Keyframes;

                    

                    /* -- treats @keyframes *always unique* -- */
                    // /**
                    //  * Determines if the current `srcKeyframeProp` has the equivalent stored `@keyframes`.  
                    //  * value:  
                    //  * `undefined` => *no* equivalent `@keyframes` found.  
                    //  * `string`    => represents the name of the equivalent `@keyframes`.
                    //  */
                    // const equalKfName = Object.entries(genKeyframes).find(entry => isEqualProp(entry[1], srcKeyframeProp))?.[0];
                    // if (equalKfName) {
                    //     // found => use existing @keyframes name:

                    //     // replace with the equivalent `@keyframes` name:
                    //     modifSrcProps[propRename?.(srcName) ?? srcName] = equalKfName;
                    // }
                    // else
                    {
                        // not found => create a @keyframes name:
                        const keyframesReference = keyframesRef(keyframesName);

                        // store the new @keyframes:
                        genKeyframes[`@keyframes ${keyframesReference}`] = srcKeyframeProp;

                        // replace with the new `@keyframes` name:
                        modifSrcProps[propRename?.(srcName) ?? srcName] = keyframesReference;
                    } // if



                    // mission done => continue walk to next prop:
                    continue;
                } // if
            }
            //#endregion handle @keyframes foo



            //#region handle equal item
            {
                /**
                 * Determines if the current `srcProp` has the equivalent prop previously.  
                 * value:  
                 * `null`                 => *no* equivalent prop found.  
                 * A `Cust.Ref` (`string`) => represents the name of the equivalent prop.
                 */
                const equalPropName = findEqualProp(srcName, srcProp);
                if (equalPropName) {
                    modifSrcProps[propRename?.(srcName) ?? srcName] = equalPropName;
                    
                    
                    
                    // mission done => continue walk to next prop:
                    continue;
                } // if
            }
            //#endregion handle equal item



            //#region handle array
            if (Array.isArray(srcProp)) {
                // convert the array as a literal object:
                const literalProps = srcProp as Dictionary<any>;



                /**
                 * Determines if the current `literalProps` has the equivalent literal object,  
                 * in which some values has been partially/fully *transformed*.  
                 * The duplicate values has been replaced with the `var(...)` linked to the existing props in `refProps`.  
                 * value:  
                 * `undefined` => *no* transformation was performed.  
                 * -or-  
                 * A copy *transformed* literal object.
                 */
                const equalLiteral = transformDuplicates(/*srcProps: */literalProps, /*refProps: */refProps);
                if (equalLiteral) {
                    // convert the literal object back to array:
                    const arrayProp: ValueOf<typeof equalLiteral>[] = [];
                    Object.assign(arrayProp, equalLiteral); // convert literal object to array



                    modifSrcProps[propRename?.(srcName) ?? srcName] = arrayProp;
                    
                    
                    
                    // mission done => continue walk to next prop:
                    continue;
                } // if
            } // if
            //#endregion handle array



            //#region handle no value change
            if (propRename) {
                // The `srcProp` is not modified but the `srcName` needs to renamed:
                modifSrcProps[propRename(srcName)] = srcProp;
            } // if
            //#endregion handle no value change
        } // for // walk each props in srcProps



        // if the modifSrcProps is not empty (has any modifications) => return the (original + modified):
        if (Object.keys(modifSrcProps).length) {
            // propRename does exists    => all props always modified => return the modified:
            if (propRename) return modifSrcProps;

            // propRename doesn't exists => return (original + modified):
            return {...srcProps, ...modifSrcProps};
        } // if

        return null; // `null` means no modification was performed
    }
    
    const rebuild = () => {
        // // backup prev generated data for comparison:
        // const oldGenKeyframes = genKeyframes;
        // const oldGenProps     = genProps;

        
        
        // transform the `props`:
        genKeyframes = {}; // clear cached `@keyframes`
        genProps     = transformDuplicates(/*srcProps: */props, /*refProps: */props, /*propRename: */(srcPropName) => decl(srcPropName)) ?? props;
        


        //#region transform the keyframes
        /*
            Dictionary<PropEx.Keyframes>:
            keyframesName     : keyframesValue
            ------------------:---------------------------
            string            : PropEx.Keyframes
            string            : Dictionary<Style>
            ------------------:---------------------------
            '@keyframes foo'  : { '0%': {'opacity': 0.5} },
            '@keyframes dude' : { 'to': {'opacity': 1.0} },
        */
        for (const keyframesValue of Object.values(genKeyframes)) {
            if ((keyframesValue === undefined) || (keyframesValue === null)) continue; // skip empty keyframes



            /*
                PropEx.Keyframes
                Dictionary<Style>
                -------:---------------
                key    : frame
                -------:---------------
                string : Style
                -------:---------------
                '12%'  : {
                            'opacity' : 0.5,
                            'color'   : 'red',
                            'some'    : Cust.Expr,
                         }
            */
            for (const [key, frame] of Object.entries(keyframesValue)) {
                if ((frame === undefined) || (frame === null)) continue; // skip empty frames


                
                keyframesValue[key] = transformDuplicates(/*srcProps: */frame as (typeof frame & DictionaryOf<typeof frame>), /*refProps: */props) ?? frame;
            } // for
        } // for
        //#endregion transform the keyframes



        // // calculate the generated data changes:
        // const remGenKeyframes = Object.entries(oldGenKeyframes).filter(([name, value]) => !(name in    genKeyframes) /*not exist in new*/ /* || !Object.is(value,    genKeyframes[name])*/ /*old !== new*/);
        // const addGenKeyframes = Object.entries(   genKeyframes).filter(([name, value]) => !(name in oldGenKeyframes) /*not exist in old*/    || !Object.is(value, oldGenKeyframes[name])   /*new !== old*/);
        // const remGenProps     = Object.entries(oldGenProps)    .filter(([name, value]) => !(name in    genProps)     /*not exist in new*/ /* || !Object.is(value,    genProps[name])*/     /*old !== new*/);
        // const addGenProps     = Object.entries(   genProps)    .filter(([name, value]) => !(name in oldGenProps)     /*not exist in old*/    || !Object.is(value, oldGenProps[name])       /*new !== old*/);



        // (re)build the styleSheet:

        // detach the old styleSheet (if any):
        genStyleSheet?.detach();

        // create a new styleSheet & attach:
        genStyleSheet =
            customJss
            .createStyleSheet({
                '@global': {
                    [rule]: genProps,
                    ...genKeyframes,
                },
            })
            .attach();
    }
    
    /**
     * Holds the validity status of the `genProps` & `genKeyframes`.  
     * `false` is invalid or never built.  
     * `true`  is valid.
     */
    let _valid = false;

    /**
     * Regenerates the `genProps` & `genKeyframes`.
     * @param immediately `true` to refresh immediately (guaranteed has been refreshed after `refresh()` returned) -or- `false` to refresh shortly after current execution finished.
     */
    const refresh = (immediately = false) => {
        if (immediately) {
            // regenerate the data now:

            rebuild();
            _valid = true; // mark the `genProps` & `genKeyframes` as valid

            // now the data was guaranteed regenerated.
        }
        else {
            // promise to regenerate the data in the future as soon as possible:

            _valid = false; // mark the `genProps` & `genKeyframes` as invalid
            setTimeout(() => {
                if (_valid) return; // has been previously generated => abort
                rebuild();
                _valid = true; // mark the `genProps` & `genKeyframes` as valid
            }, 0);
        } // if
    }
    refresh(); // regenerate the `genProps` & `genKeyframes` for the first time

    /**
     * Ensures the `genProps` & `genKeyframes` was fully generated.
     */
    const ensureGenerated = () => {
        if (_valid) {
            // console.log('refresh not required');
            return; // if was valid => return immediately
        } // if


        refresh(/*immediately*/true); // regenerate the `genProps` & `genKeyframes` and wait until completed
        // console.log(`refresh done - prefix: ${prefix}`);
    }



    // Proxy's getters & setters:

    /**
     * Gets the *declaration name* of the specified `propName`, eg: `--my-favColor`.
     * @param propName The `props`'s prop name to retrieve.
     * @returns A `Cust.Decl` represents the declaration name of the specified `propName` -or- `undefined` if it doesn't exist.
     */
    const getDecl   = (propName: string): Cust.Decl|undefined => {
        /*
            source    props:
            {
                '@keyframes foo' :  {...}
                'myFavColor'     : 'blue',
            }

            generated genProps:
            {
                '--pfx-keyframes-foo' : 'pfx-foo',             // '@keyframes foo'  => decl() => '--pfx-keyframes-foo'
                '--pfx-myFavColor'    : 'var(--col-primary)',  // 'myFavColor'      => decl() => '--pfx-myFavColor'
                '@keyframes pfx-foo'  : {...}
            }
        */



        ensureGenerated(); // ensures the `genProps` & `genKeyframes` was fully generated.
        
        

        const propDecl = decl(propName);

        // check if the `genProps` has `propDecl`:
        if (!(propDecl in genProps)) return undefined; // not found
        
        return propDecl;
    }

    /**
     * Gets the *value* (reference) of the specified `propName`, not the *direct* value, eg: `var(--my-favColor)`.
     * @param propName The `props`'s prop name to retrieve.
     * @returns A `Cust.Ref` represents the expression for retrieving the value of the specified `propName` -or- `undefined` if it doesn't exist.
     */
    const getRef    = (propName: string): Cust.Ref|undefined => {
        const propDecl = getDecl(propName);
        if (!propDecl) return undefined; // not found

        return `var(${propDecl})`;
    }

    /**
     * Gets the *equivalent value* of the specified `propName`, might be the *transformed* value, eg: `[['var(--pad-y)', 'var(--pad-x)']]` -or- the *direct* value, eg: `[['5px', '10px']]`.
     * @param propName The `props`'s prop name to retrieve.
     * @returns A `ValueOf<TProps>` or `Cust.Expr` represents the value of the specified `propName` -or- `undefined` if it doesn't exist.
     */
    const getVal    = (propName: string): /*original: */TValue | /*transformed: */Cust.Expr | /*not found: */undefined => {
        const propDecl = getDecl(propName);
        if (!propDecl) return undefined; // not found

        return genProps[propDecl];
    }

    /**
     * Sets the *direct* value of the specified `propName`.
     * @param propName The `props`'s prop name to update.
     * @param newValue The new value.
     * @returns Always return `true`.
     */
    const setDirect = (propName: string, newValue: TValue): boolean => {
        if ((newValue === undefined) || (newValue === null)) {
            delete props[propName];

            refresh(); // setting changed => need to `refresh()` the jss
        }
        else
        {
            if (props[propName] !== newValue) {
                props[propName] = newValue; // oldValue is different than newValue => update the value

                refresh(); // setting changed => need to `refresh()` the jss
            } // if
        } // if

        return true; // notify update was successful
    }



    return [
        //#region proxies - representing data in various formats
        new Proxy<Dictionary</*getter: */          Cust.Ref | /*setter: */TValue>>(props, {
            get: (_props, propName: string)                   => getRef(propName),
            set: (_props, propName: string, newValue: TValue) => setDirect(propName, newValue),
        }) as Refs<TProps>,

        new Proxy<Dictionary</*getter: */         Cust.Decl | /*setter: */TValue>>(props, {
            get: (_props, propName: string)                   => getDecl(propName),
            set: (_props, propName: string, newValue: TValue) => setDirect(propName, newValue),
        }) as Decls<TProps>,

        new Proxy<Dictionary</*getter: */TValue | Cust.Expr | /*setter: */TValue>>(props, {
            get: (_props, propName: string)                   => getVal(propName),
            set: (_props, propName: string, newValue: TValue) => setDirect(propName, newValue),
        }) as Vals<TProps>,
        //#endregion proxies - representing data in various formats

        refresh,
    ];
}
export { createCssConfig, createCssConfig as default }



// utilities:
/**
 * Includes the *general* props in the specified `cssProps`.
 * @param cssProps The collection of the css custom props to be filtered.
 * @returns A `PropList` which is the copy of the `cssProps` that only having *general* props.
 */
export const filterGeneralProps = <TProps extends {}>(cssProps: Refs<TProps>): PropList => {
    const propList: PropList = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        // excludes the entries if the `propName` matching with following:

        // prefixes:
        /**
         * For sub-component-variant
         * Eg:
         * fooBorder
         * booPadding
         * logoBackgColor
         * logoOpacity
         */
        if ((/^(icon|img|items|item|logo|toggler|menus|menu|label|control|btn|navBtn|prevBtn|nextBtn|nav|switch|link|bullet|ghost|overlay|caption|header|footer|body)[A-Z]/).test(propName)) continue; // exclude

        // suffixes:
        /**
         * For size-variant
         * Eg:
         * paddingSm
         * borderRadius0em
         * fontSizeSm
         * fontSizeXl
         */
        if ((/[a-z](Xs|Sm|Nm|Md|Lg|Xl|Xxl|Xxxl|[0-9]+em)$/).test(propName)) continue; // exclude

        // suffixes:
        /**
         * For state-variant
         * Eg:
         * animValid
         * animInvalidInline
         */
        if ((/(None|Enable|Disable|Active|Passive|Press|Release|Check|Clear|Hover|Arrive|Leave|Focus|Blur|Valid|Unvalid|Invalid|Uninvalid|Full|Compact)(Block|Inline)?$/).test(propName)) continue; // exclude

        // special props:
        /**
         * Eg:
         * spacing
         * valid
         * vertAlign
         * orientation
         * valid   => (icon)Valid   => valid
         * invalid => (icon)Invalid => invalid
         */
        if ((/^(backgGrad|orientation|align|horzAlign|vertAlign|spacing|img|size|valid|invalid)$/).test(propName)) continue; // exclude

        // props starting with `@`:
        /**
         * Eg:
         * @keyframes
         */
        if ((/^@/).test(propName)) continue; // exclude
        

        
        // if not match => include it:
        propList[propName] = (propValue as Cust.Ref);
    } // for
    return propList;
}

/**
 * Includes the props in the specified `cssProps` starting with specified `prefix`.
 * @param cssProps The collection of the css custom props to be filtered.
 * @param prefix The prefix name of the props to be *included*.
 * @returns A `PropList` which is the copy of the `cssProps` that only having matching `prefix` name.  
 * The returning props has been normalized (renamed), so they don't start with `prefix`.
 */
export const filterPrefixProps = <TProps extends {}>(cssProps: Refs<TProps>, prefix: string): PropList => {
    const propList: PropList = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        // excludes the entries if the `propName` not starting with specified `prefix`:
        if (!propName.startsWith(prefix)) continue; // exclude
        if (propName.length <= prefix.length) continue; // at least 1 char left;

        const propNameLeft = propName.substr(prefix.length); // remove the `prefix`
        if (!(/^[A-Z]/).test(propNameLeft)) continue; // the first character must be a capital
        /**
         * removing `menu`:
         * menuColor  => Color  => ok
         * menusColor => sColor => `menus` is not part of `menu`
         */

        // if match => normalize the case => include it:
        propList[camelCase(propNameLeft)] = (propValue as Cust.Ref);
    } // for
    return propList;
}

/**
 * Includes the props in the specified `cssProps` ending with specified `suffix`.
 * @param cssProps The collection of the css custom props to be filtered.
 * @param suffix The suffix name of the props to be *included*.
 * @returns A `PropList` which is the copy of the `cssProps` that only having matching `suffix` name.  
 * The returning props has been normalized (renamed), so they don't end with `suffix`.
 */
export const filterSuffixProps = <TProps extends {}>(cssProps: Refs<TProps>, suffix: string): PropList => {
    suffix = pascalCase(suffix);
    const propList: PropList = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        // excludes the entries if the `propName` not ending with specified `suffix`:
        if (!propName.endsWith(suffix)) continue; // exclude
        if (propName.length <= suffix.length) continue; // at least 1 char left;

        const propNameLeft = propName.substr(0, propName.length - suffix.length); // remove the `suffix`
        /**
         * removing `valid` => `Valid`:
         * colorValid   => color => ok
         * colorInvalid => filtered by pascalized `Valid`
         */

        // if match => include it:
        propList[propNameLeft] = (propValue as Cust.Ref);
    } // for
    return propList;
}

/**
 * Backups the prop's values in the specified `cssProps`.
 * @param cssProps The collection of the css custom props to be backed up.
 * @param backupSuff The suffix name of the backup's props.
 * @returns A `PropList` which is the copy of the `cssProps` that the prop's names was renamed with the specified `backupSuff` name.  
 * eg:  
 * --com-backgBak     : var(--com-backg)  
 * --com-boxShadowBak : var(--com-boxShadow)
 */
export const backupProps = <TProps extends {}>(cssProps: Refs<TProps>, backupSuff: string = 'Bak'): PropList => {
    backupSuff = pascalCase(backupSuff);
    const propList: PropList = {};
    for (const propName of Object.keys(cssProps)) {
        propList[`${propName}${backupSuff}`] = `var(${propName})`;
    } // for
    return propList;
}

/**
 * Restores the prop's values in the specified `cssProps`.
 * @param cssProps The collection of the css custom props to be restored.
 * @param backupSuff The suffix name of the backup's props.
 * @returns A `PropList` which is the copy of the `cssProps` that the prop's values pointed to the backup's values.  
 * eg:  
 * --com-backg     : var(--com-backgBak)  
 * --com-boxShadow : var(--com-boxShadowBak)
 */
export const restoreProps = <TProps extends {}>(cssProps: Refs<TProps>, backupSuff: string = 'Bak'): PropList => {
    const propList: PropList = {};
    for (const propName of Object.keys(cssProps)) {
        propList[propName] = `var(${propName}${backupSuff})`;
    } // for
    return propList;
}

/**
 * Overwrites prop declarations from the specified `cssProps` (source) to the specified `cssDecls` (target).
 * @param cssDecls The collection of the css custom props to be overwritten (target).
 * @param cssProps The collection of the css custom props for overwritting (source).
 * @returns A `PropList` which is the copy of the `cssProps` that overwrites to the specified `cssDecls`.
 */
export const overwriteProps = <TProps extends {}>(cssDecls: Decls<TProps>, cssProps: Refs<TProps>): PropList => {
    const propList: PropList = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        const targetPropName = (cssDecls as DictionaryOf<typeof cssDecls>)[propName];
        if (!targetPropName) continue; // target prop not found => skip

        propList[targetPropName] = (propValue as Cust.Ref);
    } // for
    return propList;
}

/**
 * Overwrites prop declarations from the specified `cssProps` (source) to the specified `cssDeclss` (targets).
 * @param cssProps The collection of the css custom props for overwritting (source).
 * @param cssDeclss The list of the parent's collection css props to be overwritten (targets).
 * The order must be from the most specific parent to the least specific one.
 * @returns A `PropList` which is the copy of the `cssProps` that overwrites to the specified `cssDeclss`.
 */
export const overwriteParentProps = <TProps extends {}>(cssProps: Refs<TProps>, ...cssDeclss: Decls<{}>[]): PropList => {
    const propList: PropList = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        const targetPropName = ((): Cust.Decl => {
            for (const cssDecls of cssDeclss) {
                if (propName in cssDecls) return (cssDecls as DictionaryOf<typeof cssDecls>)[propName]; // found => replace the cssDecl
            } // for

            return (propName as Cust.Decl); // not found => use the original decl name
        })();
        if (!targetPropName) continue; // target prop not found => skip
        
        propList[targetPropName] = (propValue as Cust.Ref);
    }
    return propList;
}
