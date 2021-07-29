// jss   (builds css  using javascript):
import { create as createJss }      from 'jss'   // base technology of our nodestrap components
import type * as Jss                from 'jss'   // ts defs support for jss
import { Cust, PropEx, }            from './Css' // ts defs support for jss

// import presetDefault from 'jss-preset-default'
// import jssPluginFunctions        from 'jss-plugin-rule-value-function'
// import jssPluginObservable       from 'jss-plugin-rule-value-observable'
// import jssPluginTemplate         from 'jss-plugin-template'
import jssPluginGlobal              from 'jss-plugin-global'
// import jssPluginExtend           from 'jss-plugin-extend'
// import jssPluginNested           from 'jss-plugin-nested'
// import jssPluginCompose          from 'jss-plugin-compose'
import jssPluginCamelCase           from 'jss-plugin-camel-case'
// import jssPluginDefaultUnit      from 'jss-plugin-default-unit'
import jssPluginExpand              from 'jss-plugin-expand'
// import jssPluginVendorPrefixer   from 'jss-plugin-vendor-prefixer'
// import jssPluginPropsSort        from 'jss-plugin-props-sort'
import jssPluginNormalizeShorthands from './jss-plugin-normalize-shorthands'



// ts defs:
export type Dictionary<TValue>        = { [key: string]: TValue }
export type ValueOf<TCollection>      = TCollection[keyof TCollection]
export type DictionaryOf<TCollection> = Dictionary<ValueOf<TCollection>>



// jss & utilities:

let customJssCache: Jss.Jss | null = null;
const getCustomJss = () => {
    if (customJssCache) return customJssCache;

    customJssCache = createJss().setup({plugins:[
        // jssPluginFunctions(),
        // jssPluginObservable({}),
        // jssPluginTemplate(),
        jssPluginGlobal(),
        // jssPluginExtend(),
        // jssPluginNested(),
        // jssPluginCompose(),
        jssPluginCamelCase(),
        // jssPluginDefaultUnit({}),
        jssPluginExpand(),
        // jssPluginVendorPrefixer(),
        // jssPluginPropsSort(),
        jssPluginNormalizeShorthands(),
    ]});

    return customJssCache;
}



/**
 * Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.  
 * The config's values can be *accessed directly* into DOM.
 * 
 * Supports get property by *declaration*, eg:  
 * `cssConfig.decls.myFavColor` => returns `'--myFavColor'`.  
 *   
 * Supports get property by *reference*,   eg:  
 * `cssConfig.refs.myFavColor`  => returns `'var(--myFooProp)'`.  
 *   
 * Supports get property by *value*, eg:  
 * `cssConfig.vals.myFavColor`  => returns `'#ff0000'`.  
 *   
 * Supports set property,                  eg:  
 * `cssConfig.vals.myFavColor = 'red'`
 */
export default class CssConfig<TProps, TProp extends ValueOf<TProps>> {
    // settings:

    //#region rule
    /**
     * Holds the declaring location (selector) of the generated css props.  
     * If changed, causing the `_genProps` needs to rebuild.
     */
    private _rule : string;
    
    /**
     * Gets the declaring location (selector) of the generated css props.
     */
    public  get rule() { return this._rule; }
    
    /**
     * Sets the declaring location (selector) of the generated css props.
     */
    public  set rule(newValue: string) {
        if (this._rule === newValue) return; // still the same => no changes needed
        this._rule = newValue;

        this.refresh(); // setting changed => need to rebuild the jss
    }
    //#endregion rule

    //#region prefix
    /**
     * Holds the prefix name of the generated css props.  
     * Useful to avoid name collision if working with another css frameworks.  
     * If changed, causing the `_genProps` needs to rebuild.
     */
    private _prefix : string;

    /**
     * Gets the prefix name of the generated css props.
     */
    public  get prefix() { return this._prefix; }

    /**
     * Sets the prefix name of the generated css props.  
     * Useful to avoid name collision if working with another css frameworks.
     */
    public  set prefix(newValue: string) {
        if (this._prefix === newValue) return; // still the same => no changes needed
        this._prefix = newValue;

        this.refresh(); // setting changed => need to rebuild the jss
    }
    //#endregion prefix



    // data sources:

    /**
     * Virtual *css dom*.  
     * The source of truth.  
     * If changed, causing the `_genProps` needs to rebuild.
     */
    private readonly _props      : Dictionary</*original: */TProp>;



    // generated data:

    /**
     * Generated *css dom* resides on memory only.  
     * Similar to `_props` but some values has been partially/fully *transformed*.  
     * The duplicate values has been replaced with the *'var(...)'* linked to the existing ones.  
     * eg:  
     * // origin:  
     * _props = {  
     *    --col-red      : '#ff0000',  
     *    --col-blue     : '#0000ff',  
     *    --bd-width     : '1px',
     *    
     *    --col-favorite : '#ff0000',  
     *    --the-border   : [[ 'solid', '1px', '#0000ff' ]],  
     * };
     *   
     * // transformed:  
     * _genProps = {  
     *    --col-red      : '#ff0000',  
     *    --col-blue     : '#0000ff',  
     *    --bd-width     : '1px',
     *    
     *    --col-favorite : 'var(--col-red)',  
     *    --the-border   : [[ 'solid', 'var(--bd-width)', 'var(--col-blue)' ]],  
     * }
     */
    public readonly genProps     : Dictionary</*original: */TProp | /*transformed: */Cust.Expr> = {};

    /**
     * Generated *css dom* of @keyframes.
     */
    public readonly genKeyframes : Dictionary<PropEx.Keyframes> = {};

    /**
     * Generated *css dom* resides on html document.
     */
    private          _sheet      : Jss.StyleSheet<'@global'> | null = null;

    /**
     * Converts the origin prop name to the generated prop name, eg: `'favColor'` => `'--my-favColor'`.
     * @param prop The origin prop name.
     * @returns The generated prop name with/without prefix (depends on the configuration).
     */
    private getGenProp(prop: string): string {
        prop = prop.replace(/^@keyframes\s+/, 'keyframes-'); // replaces '@keyframes fooSomething' => 'keyframes-fooSomething'

        const prefix = this._prefix;
        return prefix ? `--${prefix}-${prop}` : `--${prop}`; // add double dash with prefix '--my-' or double dash without prefix '--'
    }

    /**
     * Converts the origin prop name to the generated prop ref, eg: `'favColor'` => `'var(--my-favColor)'`.
     * @param prop The origin prop name.
     * @returns The generated prop ref with/without prefix (depends on the configuration).
     */
    private getGenRef(prop: string): Cust.Ref {
        return `var(${this.getGenProp(prop)})`;
    }

    /**
     * Converts the base @keyframes name to the generated one, eg: `'coolFadeIn'` => `'my-coolFadeIn'`.
     * @param baseName The base @keyframes name.
     * @returns The generated @keyframes name with/without prefix (depends on the configuration).
     */
    private getGenKeyframesName(baseName: string): string {
        const prefix = this._prefix;
        return prefix ? `${prefix}-${baseName}` : baseName; // add prefix '--my-' or just a baseName
    }

    /**
     * Removes all props inside the specified `data`.
     * @param dataContainer The data container.
     */
    private clearData(dataContainer: any) {
        for (const name in Object.keys(dataContainer)) {
            delete dataContainer[name];
        }
    }



    // proxies - representing data in various formats:

    //#region decls
    /**
     * Getter: Gets the *prop name* which is declaring the css prop, eg: `'--my-favColor'`.  
     * Setter: Sets the *direct* value of the css props.
     */
    private readonly _declsProxy : Dictionary</*getter: */          string  | /*setter: */TProp>;

    /**
     * Getter: Gets the *prop name* which is declaring the css prop, eg: `'--my-favColor'`.  
     * Setter: Sets the *direct* value of the css props.
     */
    public get decls() {
        return this._declsProxy as unknown as { [key in keyof TProps]: string }; // typescript helper: make the TValue appears as string
    }
    //#endregion decls

    //#region refs
    /**
     * Getter: Gets the *prop reference* linked to the css prop, not the *direct* value, eg: `'var(--my-favColor)'`.  
     * Setter: Sets the *direct* value of the css props.
     */
    private readonly _refsProxy  : Dictionary</*getter: */       Cust.Ref   | /*setter: */TProp>;

    /**
     * Getter: Gets the *prop reference* linked to the css prop, not the *direct* value, eg: `'var(--my-favColor)'`.  
     * Setter: Sets the *direct* value of the css props.
     */
    public get refs() {
        return this._refsProxy  as unknown as { [key in keyof TProps]: Cust.Ref }; // typescript helper: make the TValue appears as Cust.Ref (string)
    }
    //#endregion refs
    
    //#region vals
    /**
     * Getter: Gets the *equivalent value* of the css prop, might be the *transformed* value, eg: `[['var(--pad-y)', 'var(--pad-x)']]`; or the *direct* value, eg: `[['5px', '10px']]`.  
     * Setter: Sets the *direct* value of the css props.
     */
    private readonly _valsProxy  : Dictionary</*getter: */TProp | Cust.Expr | /*setter: */TProp>;

    /**
     * Getter: Gets the *equivalent value* of the css prop, might be the *transformed* value, eg: `[['var(--pad-y)', 'var(--pad-x)']]`; or the *direct* value, eg: `[['5px', '10px']]`.  
     * Setter: Sets the *direct* value of the css props.
     */
    public get vals() {
        return this._valsProxy as unknown as TProps; // typescript helper: make the TValue appears as TProps's TValue
    }
    //#endregion vals



    // data getters & setters:

    /**
     * Gets the *prop name* which is declaring the css prop, eg: `'--my-favColor'`.
     * @param prop The origin prop name.
     * @return A string represents the declaring css prop -or- `undefined` if it doesn't exist.
     */
    private getDecl(prop: string) {
        /*
            source    cssProps:
            {
                '@keyframes foo' :  {...}
                'myFavColor'     : 'blue',
            }

            generated valProps:
            {
                '--pfx-keyframes-foo' : 'pfx-foo',             // '@keyframes foo'  => getPropName => '--pfx-keyframes-foo'
                '--pfx-myFavColor'    : 'var(--col-primary)',  // 'myFavColor'      => getPropName => '--pfx-myFavColor'
                '@keyframes pfx-foo'  : {...}
            }
        */



        this.ensureGenerated(); // ensures the generated data was fully generated.
        
        

        const genProp = this.getGenProp(prop);

        // check if the genProp is already exists:
        if (!(genProp in this.genProps)) return undefined; // not found
        
        return genProp;
    }

    /**
     * Gets the *prop reference* linked to the css prop, not the *direct* value, eg: `'var(--my-favColor)'`.
     * @param prop The origin prop name.
     */
    private getRef(prop: string) {
        const genProp = this.getDecl(prop);
        if (!genProp) return undefined; // not found

        return `var(${genProp})`;
    }

    /**
     * Gets the *equivalent value* of the css prop, might be the *transformed* value, eg: `[['var(--pad-y)', 'var(--pad-x)']]`; or the *direct* value, eg: `[['5px', '10px']]`.
     * @param prop The origin prop name.
     */
    private getVal(prop: string) {
        const genProp = this.getDecl(prop);
        if (!genProp) return undefined; // not found

        return this.genProps[genProp];
    }

    /**
     * Sets the *direct* value of the css props.
     * @param prop The origin prop name.
     * @param newValue The desired prop value.
     */
    private setDirect(prop: string, newValue: TProp) {
        if ((newValue === undefined) || (newValue === null)) {
            delete this._props[prop];

            this.refresh(); // setting changed => need to rebuild the jss
        }
        else
        {
            if (this._props[prop] !== newValue) {
                this._props[prop] = newValue;

                this.refresh(); // setting changed => need to rebuild the jss
            }
        }

        return true;
    }



    // constructions:

    constructor(
        props  : TProps | (() => TProps),
        prefix = '',
        rule   = ':root'
    ) {
        // settings:
        this._rule   = rule;
        this._prefix = prefix;



        // data sources:
        this._props    = ((typeof(props) === 'function') ? (props as (() => TProps))() : props) as unknown as Dictionary<TProp>;



        // proxies - representing data in various formats:

        const _this = this;

        this._declsProxy = new Proxy<typeof _this._declsProxy>(this._props, {
            get: (t, prop: string)                  => this.getDecl(prop),             // Gets the *prop name* which is declaring the css prop, eg: `'--my-favColor'`.
            set: (t, prop: string, newValue: TProp) => this.setDirect(prop, newValue), // Sets the *direct* value of the css props.
        });

        this._refsProxy = new Proxy<typeof _this._refsProxy>(this._props, {
            get: (t, prop: string)                  => this.getRef(prop),              // Gets the *prop reference* linked to the css prop, not the *direct* value, eg: `'var(--my-favColor)'`.
            set: (t, prop: string, newValue: TProp) => this.setDirect(prop, newValue), // Sets the *direct* value of the css props.
        });

        this._valsProxy = new Proxy<typeof _this._valsProxy>(this._props, {
            get: (t, prop: string)                  => this.getVal(prop),              // Gets the *equivalent value* of the css prop, might be the *transformed* value, eg: `[['var(--pad-y)', 'var(--pad-x)']]`; or the *direct* value, eg: `[['5px', '10px']]`.
            set: (t, prop: string, newValue: TProp) => this.setDirect(prop, newValue), // Sets the *direct* value of the css props.
        });


        
        // constructions:

        this.refresh();
    }


    /**
     * Holds the validity status of the generated data.  
     * `false` is invalid or never built.  
     * `true`  is valid.
     */
    private _valid = false;

    /**
     * Regenerates the css props.
     * @param immediately `true` to refresh the css props immediately (guaranteed has been refreshed after `refresh` returned) -or- `false` to refresh shortly after current execution finished.
     */
    public refresh(immediately = false) {
        if (immediately) {
            // regenerate the data now:

            this.rebuild();
            this._valid = true; // mark the generated data as valid

            // now the data was guaranteed regenerated.
        }
        else
        {
            // promises to regenerate the data in a short time:

            this._valid = false; // mark the generated data as invalid
            setTimeout(() => {
                if (this._valid) return; // has been previously generated => abort
                this.rebuild();
                this._valid = true; // mark the generated data as valid
            }, 0);
        }
    }

    /**
     * Ensures the generated data was fully generated.
     */
    private ensureGenerated() {
        if (this._valid) {
            // console.log('refresh not required');
            return; // if was valid => return immediately
        } // if


        this.refresh(/*immediately*/true); // regenerate the css props and wait until fully done
        // console.log(`refresh done - prefix: ${this._prefix}`);
    }
    

    private rebuild() {
        /**
         * Generated *css dom* of @keyframes.
         */
        const genKeyframes = this.genKeyframes;
        this.clearData(genKeyframes);



        /**
         * Transforms the specified `srcProps` with the equivalent literal object,  
         * in which some values has been partially/fully *transformed*.  
         * The duplicate values has been replaced with the *'var(...)'* linked to the existing props in `refProps`.  
         * @param srcProps The literal object to transform.
         * @param refProps The literal object as the props reference.
         * @param propRename A handler to rename the props name of `srcProps`.
         * @returns  
         * `undefined` => *no* transformation was performed.  
         * -or-  
         * A copy *transformed* literal object.
         */
        const transformDuplicates = <TSrcProp, TRefProp>(srcProps: Dictionary<TSrcProp>, refProps: Dictionary<TRefProp>, propRename?: ((srcName: string) => string)): (Dictionary<TSrcProp|Cust.Ref|(any|Cust.Ref)[]> | undefined) => {
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

            const isKeyframes = <TTRefProp,>(refProp: TTRefProp): boolean => {
                if (typeof refProp !== 'object') return false;
                if (Array.isArray(refProp))      return false;
                
                
                
                return Object.values(genKeyframes).some((kf) => ((kf as Object) === (refProp as Object)));
            };

            const deepEquals = (srcProp: Object, refProp: Object): boolean => {
                if (Object.is(srcProp, refProp)) return true;



                if (isKeyframes(refProp)) return false; // @keyframes must be compared by reference, no deep equal



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
                        return this.getGenRef(refName); // return the link to the ref
                    }
                } // for // search for duplicates

                return null; // not found
            }


            
            /**
             * Stores the modified props in `srcProps`.
             */
            const modifSrcProps: Dictionary<TSrcProp|Cust.Ref|(any|Cust.Ref)[]> = {}; // initially empty (no modification)



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
                    const kfName = srcName.match(/(?<=@keyframes\s+).+/)?.[0];
                    if (kfName) {
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
                            const newKfName = this.getGenKeyframesName(kfName);
    
                            // store the new @keyframes:
                            genKeyframes[`@keyframes ${newKfName}`] = srcKeyframeProp;
    
                            // replace with the new `@keyframes` name:
                            modifSrcProps[propRename?.(srcName) ?? srcName] = newKfName;
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
                     * The duplicate values has been replaced with the *'var(...)'* linked to the existing props in `refProps`.  
                     * value:  
                     * `undefined` => *no* transformation was performed.  
                     * -or-  
                     * A copy *transformed* literal object.
                     */
                    const equalLiteral = transformDuplicates(literalProps, refProps);
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

            return undefined; // undefined means no modification
        } // transformDuplicates


        
        //#region transform the props
        {
            const genProps = this.genProps;
            this.clearData(genProps);
    


            const props = this._props;
    
            /**
             * Determines if the current `props` has the equivalent literal object,  
             * in which some values has been partially/fully *transformed*.  
             * The duplicate values has been replaced with the *'var(...)'* linked to the existing props in `props`.  
             * value:  
             * `undefined` => *no* transformation was performed.  
             * -or-  
             * A copy *transformed* literal object.
             */
            const equalLiteral = transformDuplicates(props, props, (srcName) => this.getGenProp(srcName)) ?? props;
            if (equalLiteral) Object.assign(genProps, equalLiteral);
        }
        //#endregion transform the props
        


        /* -- treats @keyframes *always unique* -- */
        //#region transform the keyframes
        // /*
        //     kfName            : kfProp
        //     ------------------:---------------------------
        //     string            : Dict<  Dict<Cust.Expr>   >
        //     ------------------:---------------------------
        //     '@keyframes foo'  : {     {'opacity': 0.5}  },
        //     '@keyframes dude' : {            ...        },
        // */
        // for (const [name, kfProp] of Object.entries(genKeyframes)) {
        //     if ((kfProp === undefined) || (kfProp === null)) continue; // skip empty keyframes



        //     type TKeyframes      = typeof kfProp // keyframes = (key:string : frame:Dict<Expr>)*
        //     type TFrame          = ValueOf<TKeyframes>
        //     type TModifFrame     = Dictionary<ValueOf<TFrame> | Cust.Ref>
        //     type TmodifKeyframes = Dictionary<TModifFrame>
        //     /**
        //      * Stores the modified props in `kfProp`.
        //      */
        //     const modifKfProp: TmodifKeyframes = {}; // initially empty (no modification)



        //     /*
        //         key    : frameProp
        //         -------:---------------
        //         string : Dict<Cust.Expr>
        //         -------:---------------
        //         '12%'  : {
        //                     'opacity' : 0.5,
        //                     'color'   : 'red',
        //                     'some'    : Cust.Expr,
        //                  }
        //     */
        //     for (const [key, frameProp] of Object.entries(kfProp)) {
        //         if ((frameProp === undefined) || (frameProp === null)) continue; // skip empty frames


        //         /**
        //          * Determines if the current `frameProp` has the equivalent literal object,  
        //          * in which some values has been partially/fully *transformed*.  
        //          * The duplicate values has been replaced with the *'var(...)'* linked to the existing props in `props`.  
        //          * value:  
        //          * `undefined` => *no* transformation was performed.  
        //          * -or-  
        //          * A copy *transformed* literal object.
        //          */
        //         const equalFrameProp = transformDuplicates(frameProp as DictionaryOf<typeof frameProp>, this._props);

        //         // if transformed (modified) => store the modified:
        //         if (equalFrameProp) modifKfProp[key] = equalFrameProp;
        //     } // for

            

        //     // if the modifKfProp is not empty (has any modifications) => replace with the (original + modified):
        //     if (Object.keys(modifKfProp).length) genKeyframes[name] = {...kfProp, ...modifKfProp};
        // } // for
        //#endregion transform the keyframes



        //#region rebuild a new sheet content
        {
            const styles = {
                '@global': {
                    [this._rule]: this.genProps,
                    ...genKeyframes,
                },
            };
    
            // detach the old sheet (if any):
            this._sheet?.detach();
    
            // create a new sheet & attach:
            this._sheet =
                getCustomJss()
                .createStyleSheet(styles)
                .attach();
        }
        //#endregion rebuild a new sheet content
    }
}