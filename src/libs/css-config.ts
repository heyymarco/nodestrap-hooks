// cssfn:
import type {
    Factory,
    ProductOrFactory,
    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './types'       // cssfn's types
import type {
    PropEx,
    Cust,
}                           from './css-types'   // ts defs support for cssfn
import {
    // general types:
    StyleSheet,
    CssValue,
    CssProps,
    
    
    
    // styles:
    createSheet,
    
    
    
    // compositions:
    globalDef,
    
    
    
    // rules:
    rule,
    keyframes,
}                           from './cssfn'       // cssfn core

// others libs:
import { pascalCase }       from 'pascal-case'   // pascal-case support for jss
import { camelCase }        from 'camel-case'    // camel-case  support for jss



// general types:
export type Refs     <TProps extends {}> = { [key in keyof TProps]: Cust.Ref    }
export type Decls    <TProps extends {}> = { [key in keyof TProps]: Cust.Decl   }
export type Vals     <TProps extends {}> = { [key in keyof TProps]: TProps[key] }
export interface CssConfigOptions {
    /**
     * The prefix name of the generated css vars.
     */
    prefix? : string

    /**
     * The declaring location (selector) of the generated css vars.
     */
    rule?   : string
}
export interface CssConfigSettings extends CssConfigOptions {
    /**
     * The prefix name of the generated css vars.
     */
    prefix  : string

    /**
     * The declaring location (selector) of the generated css vars.
     */
    rule    : string

    /**
     * Regenerates the css vars.
     * @param immediately `true` to refresh immediately (guaranteed has been refreshed after `refresh()` returned) -or- `false` to refresh shortly after current execution finished.
     */
    refresh : ((immediately?: boolean) => void)
}
export type CssConfig<TProps extends {}> = readonly [Refs<TProps>, Decls<TProps>, Vals<TProps>, CssConfigSettings]



// defaults:
const _defaultPrefix = '';
const _defaultRule   = ':root';



// global proxy's handlers:
const unusedObj = {};
const settingsHandler: ProxyHandler<CssConfigSettings> = {
    set : (settings, propName: string, newValue: any): boolean => {
        if (!(propName in settings)) return false; // the requested prop does not exist



        // apply the default value (if any):
        newValue = newValue ?? ((): any => {
            switch (propName) {
                case 'prefix' : return _defaultPrefix;
                case 'rule'   : return _defaultRule;
                default       : return newValue;
            } // switch
        })();
        
        
        
        // compare `oldValue` & `newValue`:
        const oldValue = (settings as any)[propName];
        if (oldValue === newValue) return true; // success but no change => no need to update



        // apply changes & update:
        (settings as any)[propName] = newValue;
        settings.refresh(); // setting changed => need to `refresh()` the jss
        return true; // notify the operation was completed successfully
    },
};



export type CssConfigProps = { [PropName: string]: CssValue }
/**
 * Create, read, update, and delete configurations using *css variables* (css custom properties) stored at `:root` level (default) or at the desired `rule`.  
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
 */
const createCssConfig = <TProps extends CssConfigProps>(initialProps: ProductOrFactory<TProps>, options?: CssConfigOptions): CssConfig<TProps> => {
    // settings:
    const settings: CssConfigSettings = {
        ...options,

        prefix  : (options?.prefix ?? _defaultPrefix),
        rule    : (options?.rule   ?? _defaultRule),

        refresh : (immediately) => refresh(immediately),
    };
    
    
    
    // data sources:

    type TValue       = ValueOf<TProps>

    /**
     * A *virtual css*.  
     * The source of truth.  
     * If modified, causing the `genProps` & `genKeyframes` need to `refresh()`.
     */
    let _propsCache    : Dictionary</*original: */TValue>|null = null;
    const getProps    = (): Dictionary</*original: */TValue> => {
        if (!_propsCache) {
            _propsCache = ((typeof(initialProps) === 'function') ? (initialProps as Factory<TProps>)() : initialProps) as unknown as Dictionary</*original: */TValue>;
        } // if
        
        
        
        return _propsCache;
    }



    // data generates:

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
    let genStyleSheet : StyleSheet<''> | null = null;

    /**
     * Gets the *declaration name* of the specified `propName`, eg: `--my-favColor`.
     * @param propName The `props`'s prop name to retrieve.
     * @returns A `Cust.Decl` represents the declaration name of the specified `propName`.
     */
    const decl = (propName: string): Cust.Decl => {
        propName = propName.replace(/^@keyframes\s+/, 'keyframes-'); // replace `@keyframes fooSomething` => `keyframes-fooSomething`

        return settings.prefix ? `--${settings.prefix}-${propName}` : `--${propName}`; // add double dash with prefix `--prefix-` or double dash without prefix `--`
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
        return settings.prefix ? `${settings.prefix}-${keyframesName}` : keyframesName; // add prefix `prefix-` or just a `keyframesName`
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
         * Determines if the specified `propValue` can be transformed to another equivalent prop link `var(...)`.
         * @param srcPropValue The value to test.
         * @returns `true` indicates it's transformable, otherwise `false`.
         */
        const isTransformableProp = <TTSrcValue,>(srcPropValue: TTSrcValue): boolean => {
            if ((srcPropValue === undefined) || (srcPropValue === null)) return false; // skip empty prop

            if ((typeof(srcPropValue) === 'string') && (/^(none|unset|inherit|initial|revert)$/).test(srcPropValue)) return false; // ignore global keywords

            return true; // passed, transformable
        };

        /**
         * Determines if the specified `srcPropName` and `refPropName` are pointed to the same object.
         * @param srcPropName The prop name of `srcProps`.
         * @param refPropName The prop name of `refProps`.
         * @returns `true` indicates the same object, otherwise `false`.
         */
        const isSelfProp = (srcPropName: string, refPropName: string): boolean => {
            if (!Object.is(srcProps, refProps)) return false; // if `srcProps` & `refProps` are not the same object in memory => always return `false`
            
            return (srcPropName === refPropName);
        };

        /**
         * Determines if the specified `srcPropName` is a special `@keyframes name`.
         * @param srcPropName The prop name of `srcProps`.
         * @returns  
         * A `string` represents the name of `@keyframes`.  
         * -or-  
         * `null` if not a special `@keyframes name`.
         */
        const isKeyframesName = (srcPropName: string): string|null => srcPropName.match(/(?<=@keyframes\s+)[\w-]+/)?.[0] ?? null;

        const isExistingKeyframes = <TTRefValue,>(refPropValue: TTRefValue): boolean => {
            if (typeof(refPropValue) !== 'object') return false; // should be an object
            if (Array.isArray(refPropValue))       return false; //   but not an array
            
            
            
            return Object.values(genKeyframes).some((keyframes) => Object.is(keyframes, refPropValue));
        };

        /**
         * Determines if the specified `srcPropValue` and `refPropValue` are deeply the same by reference or value.
         * @param srcPropValue The first value to test.
         * @param refPropValue The second value to test.
         * @returns `true` if both are equal, otherwise `false`.
         */
        const deepEqual = <TTSrcValue, TTRefValue>(srcPropValue: TTSrcValue, refPropValue: TTRefValue): boolean => {
            if (Object.is(srcPropValue, refPropValue)) return true; // shallow equal



            if (isExistingKeyframes(refPropValue)) return false; // `@keyframes` must be compared by reference, no deep equal



            // both must be an object:
            if (typeof(srcPropValue) !== 'object') return false;
            if (typeof(refPropValue) !== 'object') return false;

            // both must be an array -or- both must not be an array:
            if (Array.isArray(srcPropValue) !== Array.isArray(refPropValue)) return false;



            // both props count must be the same:
            if (Object.keys(srcPropValue).length !== Object.keys(refPropValue).length) return false;
            
            for (const [deepPropName, deepSrcPropValue] of Object.entries(srcPropValue)) {
                if (!deepEqual(deepSrcPropValue, (refPropValue as any)[deepPropName])) return false; // the same prop name with different prop value => false
            } // for



            return true; // no differences detected => true
        };

        /**
         * Determines if the specified entry [`srcPropName`, `srcPropValue`] has the equivalent entry in `refProps`.
         * @param srcPropName The prop name of `srcProps`.
         * @param srcPropValue The prop value of `srcProps`.
         * @returns A `Cust.Ref` represents the link to the equivalent entry in `refProps`.  
         * -or- `null` if no equivalent found.
         */
        const findEqualProp = <TTSrcValue,>(srcPropName: string, srcPropValue: TTSrcValue): (Cust.Ref|null) => {
            for (const [refPropName, refPropValue] of Object.entries(refProps)) { // search for duplicates
                if ((refPropValue === undefined) || (refPropValue === null)) continue; // skip empty ref
                if (isSelfProp(srcPropName, refPropName)) break;                       // stop search if reaches current entry (search for prev entries only)



                if (!isTransformableProp(srcPropValue)) continue; // skip non transformable prop



                // comparing the `srcPropValue` & `refPropValue` deeply:
                if (deepEqual(srcPropValue, refPropValue)) return ref(refPropName); // return the link to the ref
            } // for // search for duplicates

            return null; // not found
        }

        /**
         * Determines if the specified `srcKeyframesValue` has the equivalent value in `genKeyframes`.
         * @param srcKeyframesValue The value of `@keyframes`.
         * @returns A `PropEx.Keyframes` represents the object reference to the equivalent value in `genKeyframes`.  
         * -or- `null` if no equivalent found.
         */
        const findEqualKeyframes = (srcKeyframesValue: PropEx.Keyframes): (PropEx.Keyframes|null) => {
            for (const refKeyframesValue of Object.values(genKeyframes)) { // search for duplicates
                // if ((refKeyframesValue === undefined) || (refKeyframesValue === null)) continue; // skip empty ref



                // comparing the `srcKeyframesValue` & `refKeyframesValue` deeply:
                if (deepEqual(srcKeyframesValue, refKeyframesValue)) return refKeyframesValue; // return the object reference to the ref
            } // for // search for duplicates

            return null; // not found
        }


        
        /**
         * Stores the modified entries of `srcProps`.
         */
        const modifSrcProps: Dictionary<TSrcValue|Cust.Ref|Cust.KeyframesRef|any[]> = {}; // initially empty (no modification)



        for (const [srcPropName, srcPropValue] of Object.entries(srcProps)) { // walk each entry in `srcProps`
            if ((srcPropValue === undefined) || (srcPropValue === null)) continue; // skip empty src



            //#region handle `@keyframes foo`
            {
                const keyframesName = isKeyframesName(srcPropName);
                if (keyframesName) {
                    let srcKeyframesValue = srcPropValue as unknown as PropEx.Keyframes; // assumes the current `srcPropValue` is a valid `@keyframes`' value.
                    srcKeyframesValue = findEqualKeyframes(srcKeyframesValue) ?? srcKeyframesValue;

                    

                    // create a link to current `@keyframes` name:
                    const keyframesReference = keyframesRef(keyframesName); // `@keyframes`' name is always created even if the content is the same as the another `@keyframes`

                    // store the new `@keyframes`:
                    genKeyframes[keyframesReference] = srcKeyframesValue;

                    
                    
                    // store the modified `srcProps`' entry:
                    modifSrcProps[propRename?.(srcPropName) ?? srcPropName] = keyframesReference;

                    // mission done => continue walk to the next entry:
                    continue;
                } // if
            }
            //#endregion handle `@keyframes foo`



            //#region handle equal entry
            {
                const equalPropRef = findEqualProp(srcPropName, srcPropValue);
                if (equalPropRef) {
                    // store the modified `srcProps`' entry:
                    modifSrcProps[propRename?.(srcPropName) ?? srcPropName] = equalPropRef;
                    
                    // mission done => continue walk to the next entry:
                    continue;
                } // if
            }
            //#endregion handle equal entry



            //#region handle array
            if (Array.isArray(srcPropValue)) {
                // convert the array as a literal object:
                const srcLiteralProps = srcPropValue as Dictionary<any>;



                const equalLiteral = transformDuplicates(/*srcProps: */srcLiteralProps, /*refProps: */refProps);
                if (equalLiteral) {
                    // convert the literal object back to an array:
                    const equalArray: ValueOf<typeof equalLiteral>[] = [];
                    Object.assign(equalArray, equalLiteral); // convert literal object to array



                    // store the modified `srcProps`' entry:
                    modifSrcProps[propRename?.(srcPropName) ?? srcPropName] = equalArray;
                    
                    // mission done => continue walk to the next entry:
                    continue;
                } // if
            } // if
            //#endregion handle array



            //#region handle no value change
            if (propRename) {
                // The `srcPropValue` was not modified but the `srcPropName` needs to be renamed:
                modifSrcProps[propRename(srcPropName)] = srcPropValue;
            } // if
            //#endregion handle no value change
        } // for // walk each entry in `srcProps`



        // if the `modifSrcProps` is not empty (has any modifications) => return the (original + modified):
        if (Object.keys(modifSrcProps).length) {
            // `propRename` does exists    => all entries are always modified => return the modified:
            if (propRename) return modifSrcProps;

            // `propRename` doesn't exists => return (original + modified):
            return {...srcProps, ...modifSrcProps};
        } // if

        
        
        return null; // `null` means no modification was performed
    }
    
    const rebuild = () => {
        // // backup prev generated data for comparison:
        // const oldGenKeyframes = genKeyframes;
        // const oldGenProps     = genProps;



        const props = getProps();

        
        
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
        genStyleSheet = createSheet([
            globalDef([
                rule(settings.rule, genProps),
                Object.entries(genKeyframes).map(([name, value]) => keyframes(name, value)),
            ]),
        ])
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
    const refresh = (immediately = false): void => {
        if (immediately) {
            // regenerate the data now:

            rebuild();
            _valid = true; // mark the `genProps` & `genKeyframes` as valid

            // now the data was guaranteed regenerated.
        }
        else {
            // promise to regenerate the data in the future as soon as possible:

            _valid = false; // mark the `genProps` & `genKeyframes` as invalid
            Promise.resolve().then(() => {
                if (_valid) return; // has been previously generated => abort
                rebuild();
                _valid = true; // mark the `genProps` & `genKeyframes` as valid
            });
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
        if (propName === '$$typeof') return undefined; // react runtime type check
        
        
        
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
        const props = getProps();

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

    const getPropList = (): ArrayLike<string|symbol> => {
        return Object.keys(getProps());
    }

    const getPropDescDecl = (propName: string): PropertyDescriptor|undefined => {
        const propDecl = getDecl(propName);
        if (!propDecl) return undefined; // not found

        return {
            value        : propDecl,

            writable     : true,
            enumerable   : true,
            configurable : true,
        };
    }
    const getPropDescRef = (propName: string): PropertyDescriptor|undefined => {
        const propRef = getRef(propName);
        if (!propRef) return undefined; // not found

        return {
            value        : propRef,

            writable     : true,
            enumerable   : true,
            configurable : true,
        };
    }
    const getPropDescVal = (propName: string): PropertyDescriptor|undefined => {
        const propVal = getVal(propName);
        if (!propVal) return undefined; // not found

        return {
            value        : propVal,

            writable     : true,
            enumerable   : true,
            configurable : true,
        };
    }



    return [
        //#region proxies - representing data in various formats
        new Proxy<Dictionary</*getter: */          Cust.Ref | /*setter: */TValue>>(unusedObj, {
            get                      : (_unusedObj, propName: string)                   => getRef(propName),
            set                      : (_unusedObj, propName: string, newValue: TValue) => setDirect(propName, newValue),
            deleteProperty           : (_unusedObj, propName: string)                   => setDirect(propName, null as any),
            
            ownKeys                  : (_unusedObj)                                     => getPropList(),
            getOwnPropertyDescriptor : (_unusedObj, propName: string)                   => getPropDescRef(propName),
        }) as Refs<TProps>,

        new Proxy<Dictionary</*getter: */         Cust.Decl | /*setter: */TValue>>(unusedObj, {
            get                      : (_unusedObj, propName: string)                   => getDecl(propName),
            set                      : (_unusedObj, propName: string, newValue: TValue) => setDirect(propName, newValue),
            deleteProperty           : (_unusedObj, propName: string)                   => setDirect(propName, null as any),
            
            ownKeys                  : (_unusedObj)                                     => getPropList(),
            getOwnPropertyDescriptor : (_unusedObj, propName: string)                   => getPropDescDecl(propName),
        }) as Decls<TProps>,

        new Proxy<Dictionary</*getter: */TValue | Cust.Expr | /*setter: */TValue>>(unusedObj, {
            get                      : (_unusedObj, propName: string)                   => getVal(propName),
            set                      : (_unusedObj, propName: string, newValue: TValue) => setDirect(propName, newValue),
            deleteProperty           : (_unusedObj, propName: string)                   => setDirect(propName, null as any),
            
            ownKeys                  : (_unusedObj)                                     => getPropList(),
            getOwnPropertyDescriptor : (_unusedObj, propName: string)                   => getPropDescVal(propName),
        }) as Vals<TProps>,
        //#endregion proxies - representing data in various formats



        // settings:
        new Proxy<CssConfigSettings>(settings, settingsHandler),
    ];
}
export { createCssConfig, createCssConfig as default }



// utilities:
/**
 * Includes the *general* props in the specified `cssProps`.
 * @param cssProps The collection of the css vars to be filtered.
 * @returns A `PropList` which is the copy of the `cssProps` that only having *general* props.
 */
export const usesGeneralProps = (cssProps: Refs<{}>): CssProps => {
    const result: CssProps = {};
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
         * subOpacity
         */
        if ((/^(icon|img|media|arrow(Top|Right|Bottom|Left)?|separator|items|item|sub|logo|toggler|menus|menu|label|control|btn|navBtn|prevBtn|nextBtn|nav|switch|link|bullet|ghost|overlay|card|caption|header|footer|body|tab|breadcrumb|numbered|element|track|tracklower|trackupper|thumb)($|[A-Z])/).test(propName)) continue; // exclude

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
         * For weight-variant
         * Eg:
         * fontWeightLight
         * fontWeightNormal
         */
        if ((/[a-z](Lighter|Light|Normal|Bold|Bolder)$/).test(propName)) continue; // exclude

        // suffixes:
        /**
         * For state-variant
         * Eg:
         * animValid
         * animInvalidInline
         */
        if ((/(None|Excited|Running|Enable|Disable|Active|Passive|Press|Release|Check|Clear|Hover|Arrive|Leave|Focus|Blur|Valid|Unvalid|Invalid|Uninvalid|Full|Compact)(Block|Inline)?$/).test(propName)) continue; // exclude

        // some props ending with inline|block:
        /**
         * Eg:
         * inlineSizeInline
         *  blockSizeInline
         * inlineSizeBlock
         *  blockSizeBlock
         */
        if ((/^(((((inline|block)|(min|max)(Inline|Block))Size)|cursor)(Inline|Block))$/).test(propName)) continue; // exclude
        
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
        if ((/^(backgGrad(Inline|Block)?|backgOverlay(Img|Size)?|orientation|align|horzAlign|vertAlign|spacing|img|size|valid|invalid|transDuration|(top|bottom|left|right)Transform|fontFamily\w+|fontSize[0-9]+)$/).test(propName)) continue; // exclude

        // props starting with `@`:
        /**
         * Eg:
         * @keyframes
         */
        if ((/^@/).test(propName)) continue; // exclude
        

        
        // if not match => include it:
        result[propName] = (propValue as Cust.Ref);
    } // for
    return result;
}

/**
 * Includes the props in the specified `cssProps` starting with specified `prefix`.
 * @param cssProps The collection of the css vars to be filtered.
 * @param prefix The prefix name of the props to be *included*.
 * @returns A `PropList` which is the copy of the `cssProps` that only having matching `prefix` name.  
 * The returning props has been normalized (renamed), so they don't start with `prefix`.
 */
export const usesPrefixedProps = (cssProps: Refs<{}>, prefix: string): CssProps => {
    const result: CssProps = {};
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
        result[camelCase(propNameLeft)] = (propValue as Cust.Ref);
    } // for
    return result;
}

/**
 * Includes the props in the specified `cssProps` ending with specified `suffix`.
 * @param cssProps The collection of the css vars to be filtered.
 * @param suffix The suffix name of the props to be *included*.
 * @returns A `PropList` which is the copy of the `cssProps` that only having matching `suffix` name.  
 * The returning props has been normalized (renamed), so they don't end with `suffix`.
 */
export const usesSuffixedProps = (cssProps: Refs<{}>, suffix: string): CssProps => {
    suffix = pascalCase(suffix);
    const result: CssProps = {};
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
        result[propNameLeft] = (propValue as Cust.Ref);
    } // for
    return result;
}

/**
 * Backups the prop's values in the specified `cssProps`.
 * @param cssProps The collection of the css vars to be backed up.
 * @param backupSuff The suffix name of the backup's props.
 * @returns A `PropList` which is the copy of the `cssProps` that the prop's names was renamed with the specified `backupSuff` name.  
 * eg:  
 * --com-backgBak     : var(--com-backg)  
 * --com-boxShadowBak : var(--com-boxShadow)
 */
export const backupProps = (cssProps: Refs<{}>, backupSuff: string = 'Bak'): CssProps => {
    backupSuff = pascalCase(backupSuff);
    const result: CssProps = {};
    for (const propName of Object.keys(cssProps)) {
        result[`${propName}${backupSuff}`] = `var(${propName})`;
    } // for
    return result;
}

/**
 * Restores the prop's values in the specified `cssProps`.
 * @param cssProps The collection of the css vars to be restored.
 * @param backupSuff The suffix name of the backup's props.
 * @returns A `PropList` which is the copy of the `cssProps` that the prop's values pointed to the backup's values.  
 * eg:  
 * --com-backg     : var(--com-backgBak)  
 * --com-boxShadow : var(--com-boxShadowBak)
 */
export const restoreProps = (cssProps: Refs<{}>, backupSuff: string = 'Bak'): CssProps => {
    const result: CssProps = {};
    for (const propName of Object.keys(cssProps)) {
        result[propName] = `var(${propName}${backupSuff})`;
    } // for
    return result;
}

/**
 * Overwrites prop declarations from the specified `cssProps` (source) to the specified `cssDecls` (target).
 * @param cssDecls The collection of the css vars to be overwritten (target).
 * @param cssProps The collection of the css vars for overwritting (source).
 * @returns A `PropList` which is the copy of the `cssProps` that overwrites to the specified `cssDecls`.
 */
export const overwriteProps = <TProps extends {}>(cssDecls: Decls<TProps>, cssProps: Refs<{}>): CssProps => {
    const result: CssProps = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        const targetPropName = (cssDecls as DictionaryOf<typeof cssDecls>)[propName];
        if (!targetPropName) continue; // target prop not found => skip

        result[targetPropName] = (propValue as Cust.Ref);
    } // for
    return result;
}

/**
 * Overwrites prop declarations from the specified `cssProps` (source) to the specified `cssDeclss` (targets).
 * @param cssProps The collection of the css vars for overwritting (source).
 * @param cssDeclss The list of the parent's collection css props to be overwritten (targets).
 * The order must be from the most specific parent to the least specific one.
 * @returns A `PropList` which is the copy of the `cssProps` that overwrites to the specified `cssDeclss`.
 */
export const overwriteParentProps = (cssProps: Refs<{}>, ...cssDeclss: Decls<{}>[]): CssProps => {
    const result: CssProps = {};
    for (const [propName, propValue] of Object.entries(cssProps)) {
        const targetPropName = ((): Cust.Decl => {
            for (const cssDecls of cssDeclss) {
                if (propName in cssDecls) return (cssDecls as DictionaryOf<typeof cssDecls>)[propName]; // found => replace the cssDecl
            } // for

            return (propName as Cust.Decl); // not found => use the original decl name
        })();
        if (!targetPropName) continue; // target prop not found => skip
        
        result[targetPropName] = (propValue as Cust.Ref);
    }
    return result;
}
