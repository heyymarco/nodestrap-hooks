// react (builds html using javascript):
import {
    default as React,
    useContext,
    useLayoutEffect,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// jss   (builds css  using javascript):
import {
    JssStyle,
    JssValue,
    Classes,
    Styles,

    create as createJss,
    SheetsManager,
}                           from 'jss'           // ts defs support for jss
import {
    jss as jssDefault,
    createUseStyles,
    JssContext,
}                           from 'react-jss'     // base technology of our nodestrap components
import jssPluginExtend      from 'jss-plugin-extend'
import jssPluginGlobal      from 'jss-plugin-global'
import jssPluginCamelCase   from 'jss-plugin-camel-case'
import jssPluginExpand      from 'jss-plugin-expand'
import jssPluginNested      from 'jss-plugin-nested'
import
    jssPluginNormalizeShorthands
                            from './jss-plugin-normalize-shorthands'
import type {
    Prop,
    PropEx,
    Cust,
}                           from './Css'         // ts defs support for jss
import type {
    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './CssConfig'   // ts defs support for jss
import CssConfig            from './CssConfig'   // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import { pascalCase }       from 'pascal-case'   // pascal-case support for jss
import { camelCase }        from 'camel-case'    // camel-case  support for jss



// general types:

export type { JssStyle, Classes }
export type { Prop, PropEx, Cust }
export type { Dictionary, ValueOf, DictionaryOf }

export type Factory<T>                                 = () => T
export type Style                                      = JssStyle
export type OptionalString                             = string|null|undefined
export type ClassEntry<TClass extends string = string> = [TClass, Style]
export type ClassList <TClass extends string = string> = ClassEntry<TClass>[]
export type RuleEntry                                  = [(OptionalString|OptionalString[]), (Style|Style[])]
export type RuleList                                   = RuleEntry[]
export type RuleCollection                             = (RuleEntry|RuleList)[]
export type PropList                                   = { [name: string]: JssValue }



// jss:
const customJss = createJss().setup({plugins:[
    jssPluginGlobal(),
    jssPluginExtend(),
    jssPluginNested(),
    jssPluginCamelCase(),
    jssPluginExpand(),
    jssPluginNormalizeShorthands(),
]});



// styles:

const styleSheetManager = new SheetsManager();
export const createUseStyleSheet          = <TClass extends string = string>(styles: Styles<TClass> | Factory<Styles<TClass>>): Factory<Classes<TClass>> => {
    const styleSheetId  = {}; // a simple object as the styleSheet's identifier (by reference)

    
    return (): Classes<TClass> => {
        const styleSheet = useMemo(() => (
            // from existing (if any):
            styleSheetManager.get(styleSheetId)
            ??
            // or create a new one:
            (() => {
                // create a new styleSheet using our pre-configured customJss:
                const styleSheet = customJss.createStyleSheet(
                    ((typeof(styles) === 'function') ? styles() : styles)
                )
                ;
                
                
                
                // register to styleSheetManager to be manageable:
                styleSheetManager.add(styleSheetId, styleSheet);

                
                
                // here the styleSheet:
                return styleSheet;
            })()
        ), []);
        
        
        
        useLayoutEffect(() => {
            // use the styleSheet:
            styleSheetManager.manage(styleSheetId);
            
            
            
            // cleanups:
            return () => {
                // unuse the styleSheet:
                styleSheetManager.unmanage(styleSheetId);
            };
        }, [])



        return styleSheet.classes;
    };
}
export const createUseComponentStyleSheet = <TClass extends string>(styles: ClassList<TClass> | Factory<ClassList<TClass>>): Factory<Classes<TClass>> => {
    return createUseStyleSheet(
        Object.assign({}, // combines array to props
            ...((typeof(styles) === 'function') ? styles() : styles).map((style) => ({ [style[0] ?? 'main']: style[1] }))
        )
    );
}



export const composition = <TClass extends string = 'main'>(styles: Style[], className: TClass = 'main' as TClass): ClassEntry<TClass> => [
    className,

    {
        extend: (styles as Style),
    } as Style
];



export const layout = (style: Style): Style => style;



export const rules = (ruleCollection: RuleCollection, specificityWeight: number = 0): Style => ({
    extend: [
        ...((): Style[] => {
            const noRules: Style[] = [];

            return [
                ...ruleCollection
                    .map((ruleEntryList: RuleEntry|RuleList): RuleList => {
                        const isOptionalString = (value: RuleEntry|(OptionalString|Style)|(OptionalString|Style)[]): value is OptionalString => {
                            if ((typeof value) === 'string') return true; // a string detected

                            if (value === null)              return true; // optional null
                            if (value === undefined)         return true; // optional undefined

                            return false; // the value is not a string
                        };
                        const isOptionalStringArr = (value: RuleEntry|(OptionalString|Style)|(OptionalString|Style)[]): value is OptionalString[] => {
                            return (
                                Array.isArray(value)
                                &&
                                value.every((v) => isOptionalString(v))
                            );
                        }

                        const isStyle = (value: RuleEntry|(OptionalString|Style)|(OptionalString|Style)[]): value is Style => {
                            if (value === null)              return false; // null
                            if (value === undefined)         return false; // undefined

                            return ((typeof value) === 'object');
                        }
                        const isStyleArr = (value: RuleEntry|(OptionalString|Style)|(OptionalString|Style)[]): value is Style[] => {
                            return (
                                Array.isArray(value)
                                &&
                                value.every((v) => isStyle(v))
                            );
                        }

                        
                        
                        const isRuleEntry = (value: RuleEntry|RuleList): value is RuleEntry => {
                            if (value.length !== 2) return false; // not a tuple => not a RuleEntry

                            
                            
                            const [first, second] = value;

                            // the first element must be an `OptionalString` -or- an array of `OptionalString` -or- an empty array
                            // and
                            // the second element must be a `Style` (object) -or- an array of `Style` (object) -or- an empty array
                            return (
                                (
                                    isOptionalString(first)
                                    ||
                                    isOptionalStringArr(first)
                                )
                                &&
                                (
                                    isStyle(second)
                                    ||
                                    isStyleArr(second)
                                )
                            );
                        };



                        if (isRuleEntry(ruleEntryList)) return [ruleEntryList];
                        return ruleEntryList;
                    })
                    .flat(1)
                    .map(([rules, styles]): Style => {
                        let normalizedRules = (Array.isArray(rules) ? rules : [rules]).map((rule): string => {
                            if (!rule) return '&';

                            if (rule.includes('&')) return rule;

                            if (rule.includes('.') || rule.includes(':')) return `&${rule}`;

                            return `&.${rule}`;
                        });
                        if (specificityWeight > 0) {
                            const specificity = (new Array(specificityWeight)).fill(':not(._)').join('');
                            normalizedRules = normalizedRules.map((rule) => (rule === '&') ? rule : `${rule}${specificity}`);
                        } // if

                        const mergedStyles = {
                            extend: (Array.isArray(styles) ? styles : [styles]) as Style,
                        } as Style;



                        if (normalizedRules.includes('&')) {
                            normalizedRules = normalizedRules.filter((rule) => (rule !== '&'));
                            noRules.push(mergedStyles);
                        } // if



                        return {
                            [normalizedRules.join(',')] : mergedStyles,
                        };
                    }),
                
                ...noRules,
            ];
        })(),
    ] as Style,
});

export const variants = (variants: RuleCollection): Style => rules(variants);

export const states = (states: RuleCollection, inherit = false): Style => rules(states, /*specificityWeight :*/1);



export const gradient = (): RuleList => [
    [ [':not(.gradient)'], [{ '--no-gradient' : 'no' }] ],
    [      ['.gradient', '.grad'],  [{ '--has-gradient': 'yes' }, {'--is-gradient': 'yea'}] ],
];



/**
 * A css builder for styling Nodestrap's components.
 * Supports many variants like theming, sizes, gradient, outlined, orientation, and more.
 * Supports many states like disabled, active, pressed, and more.
 */
export class ElementStyles {
    //#region global props
    /**
     * Includes the *general* prop names in the specified `cssProps`.  
     * @param cssProps The collection of the prop name to be filtered.  
     * @returns A `PropList` which is the copy of the `cssProps` that only having *general* prop names.
     */
    protected filterGeneralProps<TCssProps>(cssProps: TCssProps): PropList {
        const propList: PropList = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name matching with following:

            // prefixes:
            /**
             * For sub-component-variant
             * Eg:
             * fooSomething
             * booSomething
             * logoBackgColor
             * logoOpacity
             */
            if ((/^(icon|img|items|item|logo|toggler|menu|menus|label|control|btn|navBtn|prevBtn|nextBtn|nav|switch|link|bullet|ghost|overlay|caption|header|footer|body)[A-Z]/).test(name)) continue; // exclude

            // suffixes:
            /**
             * For size-variant
             * Eg:
             * somethingSm
             * something0em
             */
            if ((/(Xs|Sm|Nm|Md|Lg|Xl|Xxl|Xxxl|[0-9]+em|None)$/).test(name)) continue; // exclude

            // suffixes:
            /**
             * For state-variant
             * Eg:
             * animValid
             * animInvalidInline
             */
             if ((/(Enable|Disable|Active|Passive|Press|Release|Check|Clear|Hover|Arrive|Leave|Focus|Blur|Valid|Unvalid|Invalid|Uninvalid|Full|Compact)(Block|Inline)?$/).test(name)) continue; // exclude

            // special props:
            /**
             * Eg:
             * foo
             * boo
             * size
             * orientation
             * valid   => (icon)Valid   => valid
             * invalid => (icon)Invalid => invalid
             */
            if ((/backgGrad|orientation|align|horzAlign|vertAlign|spacing|img|size|valid|invalid/).test(name)) continue; // exclude

            // @keyframes:
            if ((/@/).test(name)) continue; // exclude
            

            
            // if not match => include it:
            propList[name] = prop;
        }
        return propList;
    }

    /**
     * Includes the prop names in the specified `cssProps` starting with specified `prefix`.
     * @param cssProps The collection of the prop name to be filtered.  
     * @param prefix The prefix name of the prop names to be *included*.  
     * @returns A `PropList` which is the copy of the `cssProps` that only having matching prefix names.  
     * The retuning prop names has been normalized (renamed), so it doesn't starting with `prefix`.
     */
    protected filterPrefixProps<TCssProps>(cssProps: TCssProps, prefix: string): PropList {
        const propList: PropList = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name not starting with specified prefix:
            if (!name.startsWith(prefix)) continue; // exclude
            if (name.length <= prefix.length) continue; // at least 1 char left;

            // if match => remove the prefix => normalize the case => then include it:
            propList[camelCase(name.substr(prefix.length))] = prop;
        }
        return propList;
    }

    /**
     * Includes the prop names in the specified `cssProps` ending with specified `suffix`.
     * @param cssProps The collection of the prop name to be filtered.  
     * @param suffix The suffix name of the prop names to be *included*.  
     * @returns A `PropList` which is the copy of the `cssProps` that only having matching suffix names.  
     * The retuning prop names has been normalized (renamed), so it doesn't ending with `suffix`.
     */
    protected filterSuffixProps<TCssProps>(cssProps: TCssProps, suffix: string): PropList {
        suffix = pascalCase(suffix);
        const propList: PropList = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name not ending with specified suffix:
            if (!name.endsWith(suffix)) continue; // exclude
            if (name.length <= suffix.length) continue; // at least 1 char left;

            // if match => remove the suffix => then include it:
            propList[name.substr(0, name.length - suffix.length)] = prop;
        }
        return propList;
    }

    /**
     * Backups the value of the specified `cssProps`.
     * @param cssProps The props to be backed up.  
     * @param backupSuff The suffix name of the backup props.
     * @returns A `PropList` which is the copy of the `cssProps` that the prop names renamed with the specified `backupSuff`.
     */
    protected backupProps<TCssProps>(cssProps: TCssProps, backupSuff: string = 'Bak'): PropList {
        const propList: PropList = {};
        for (const [name] of Object.entries(cssProps)) {
            propList[`${name}${backupSuff}`] = `var(${name})`;
        }
        return propList;
    }

    /**
     * Restores the value of the specified `cssProps`.
     * @param cssProps The props to be restored.  
     * @param backupSuff The suffix name of the backup props.
     * @returns A `PropList` which is the copy of the `cssProps` that the prop values pointed to the backed up values.
     */
    protected restoreProps<TCssProps>(cssProps: TCssProps, backupSuff: string = 'Bak'): PropList {
        const propList: PropList = {};
        for (const [name] of Object.entries(cssProps)) {
            propList[name] = `var(${name}${backupSuff})`;
        }
        return propList;
    }

    /**
     * Overwrites prop declarations from the specified `cssProps` into the specified `cssDecls`.  
     * @param cssDecls The collection of the prop name to be overwritten. 
     * @param cssProps The collection of the prop name to overwrite.  
     * @returns A `PropList` which is the copy of the `cssProps` that overwrites the specified `cssDecls`.
     */
    protected overwriteProps<TCssDecls extends { [key in keyof TCssProps]: string }, TCssProps>(cssDecls: TCssDecls, cssProps: TCssProps): PropList {
        const propList: PropList = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            const varDecl = (cssDecls as unknown as DictionaryOf<typeof cssDecls>)[name];
            if (!varDecl) continue;
            propList[varDecl] = prop;
        }
        return propList;
    }

    /**
     * Overwrites prop declarations from the specified `cssProps` into the specified `cssDeclss`.  
     * @param cssDeclss The list of the parent's collection prop name to be overwritten.  
     * The order must be from the most specific parent to the least specific one.  
     * @param cssProps The collection of the prop name to overwrite.  
     * @returns A `PropList` which is the copy of the `cssProps` that overwrites the specified `cssDeclss`.
     */
    protected overwriteParentProps<TCssProps>(cssProps: TCssProps, ...cssDeclss: { [key in keyof unknown]: string }[]): PropList {
        const propList: PropList = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            const varDecl = ((): string => {
                for (const cssDecls of cssDeclss) {
                    if (name in cssDecls) return (cssDecls as DictionaryOf<typeof cssDecls>)[name]; // found => replace the cssDecl
                } // for

                return name; // not found => use the original decl name
            })();
            if (!varDecl) continue;
            propList[varDecl] = prop;
        }
        return propList;
    }
    //#endregion global props


    
    //#region props
    /**
     * Holds the prefix name of the generated css props.  
     * Useful to avoid name collision if working with another css frameworks.
     */
    private _prefix   : string = 'ns';
    /**
     * Gets the prefix name of the generated css props.  
     */
    public  get prefix() { return this._prefix }
    /**
     * Sets the prefix name of the generated css props.  
     * Useful to avoid name collision if working with another css frameworks.
     */
    public  set prefix(newValue: string) {
        if (this._prefix === newValue) return; // already the same => no change required
        this._prefix        = newValue; // update the new prefix
        this._useStylesCache = null;    // clear the cache
    }

    
    
    /**
     * Gets the declaration name of the specified `propName`.
     * @param propName The name of prop to retrieve.
     * @returns A generated prop name for declaring the prop.
     */
    public decl(name: string) {
        const prefix = this._prefix;
        if (prefix) return `--${prefix}-${name}`;
        return `--${name}`;
    }

    /**
     * Gets the *value* (reference) of the specified `propName`.
     * @param propName The name of prop to retrieve.
     * @param fallbacks The name of secondary/next prop to retrieve if the `propName` was not found.
     * @returns A generated css expression for retrieving the value.
     */
    public ref(propName: string, ...fallbacks: string[]) {
        const prefix = this._prefix ? `--${this._prefix}-` : '--';



        const fallbackRecursive = (...fallbacks: string[]): string => {
            const [curentFallback, ...restFallbacks] = fallbacks;

            if (!curentFallback) return ''; // no more fallback => return empty

            // handle the curentFallback and recursively handle the restFallbacks:
            return `,var(${prefix}${curentFallback}${fallbackRecursive(...restFallbacks)})`;
        };



        return `var(${prefix}${propName}${fallbackRecursive(...fallbacks)})`;
    }
    //#endregion props



    // styles:
    protected _useStylesCache : ((() => Classes<'main'>)|null) = null;
    /**
     * Returns a jss stylesheet for styling dom.
     * @returns A jss stylesheet instance.
     */
    public /*virtual*/ useStyles(): Classes<'main'> {
        // hack: wrap with function twice and then unwrap twice:
        // so we can use *react hook* here:
        return (() => // wrap-1
            () => { // wrap-2
                const jssContext = useContext(JssContext);

                if (!this._useStylesCache) {
                    // console.log('creating style...');

                    const jss = jssContext.jss ?? jssDefault;
                    jss.use(
                        jssPluginGlobal(),
                        jssPluginNormalizeShorthands()
                    );

                    this._useStylesCache = createUseStyles(
                        Object.assign({},
                            ...this.styles().map((style) => ({ [style[0] ?? '@global']: style[1] }))
                        )
                    );
                }
                // else {
                //     console.log('use cached style');
                // }
                return this._useStylesCache();
            }
        )()(); // unwrap-1 & unwrap-2
    }
    /**
     * Creates one/more composite styles, with the themes & states applied.
     * @returns A `ClassList` represents the composite style definitions.
     */
    protected /*virtual*/ styles(): ClassList { return [
        [ 'main'    , this.composition() ],

        [ '@global' , this.global()      ],
    ]}

    /**
     * Creates a global style applied to a whole document.
     * @returns A `JssStyle` represents a global style definition.
     */
    public /*virtual*/ global(): JssStyle { return {} }



    // compositions:
    /**
     * Creates a composite style made up from layout + variants + states + functions.
     * @returns A `JssStyle` represents a composite style definition.
     */
    public /*virtual*/ composition(): JssStyle { return {
        extend: [
            // watch variant classes:
            this.useVariants(),

            // watch state classes/pseudo-classes:
            this.useStates(),
            
            // after watching => use func props:
            this.usePropsFn(),

            // all the required stuff has been loaded,
            // now load the layout:
            this.layout(),
        ] as JssStyle,
    }}


    
    // layouts:
    /**
     * Defines the layout of the component.
     * @returns A `JssStyle` represents a layout definition.
     */
    public /*virtual*/ layout(): JssStyle { return {} }



    // variants:
    /**
     * Watches & applies `variant classes` on current element.
     * @returns A `JssStyle` represents the implementation of the variants.
     */
    public /*virtual*/ useVariants(): JssStyle {
        return this.combineRules(this.variants());
    }
    /**
     * Creates css rule definitions for all variants by manipulating some props.
     * @returns A `RuleList` represents the css rule definitions for all variants.
     */
    public /*virtual*/ variants(): RuleList { return [] }



    // states:
    /**
     * Watches & applies `state classes` on current element.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the implementation of the states.
     */
    public /*virtual*/ useStates(inherit = false): JssStyle {
        return this.combineRules(this.states(inherit), /*addSpecificity :*/1);
    }
    /**
     * Creates css rule definitions for all states by manipulating some props.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `RuleList` represents the css rule definitions for all states.
     */
    public /*virtual*/ states(inherit: boolean): RuleList { return [] }



    // functions:
    /**
     * Uses `propsFn` on current element.
     * @returns A `JssStyle` represents the implementation of the `propsFn`.
     */
    public /*virtual*/ usePropsFn(): JssStyle {
        const style: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(this.propsFn())) {
            style[name] = prop;
        }
        return style as JssStyle;
    }
    /**
     * Creates a functional prop definitions in which the values *depends on* the variants and/or the states using *fallback* strategy.
     * @returns A `PropList` represents the functional prop definitions.
     */
    public /*virtual*/ propsFn(): PropList { return {} }



    // utilities:
    protected /*virtual*/ combineRules(ruleList: RuleList, addSpecificity: number = 0): JssStyle { return {
        extend: [
            ...((): JssStyle[] => {
                const noRules: JssStyle[] = [];

                return [
                    ...ruleList.map(([rules, styles]): JssStyle => {
                        let normalizedRules = (Array.isArray(rules) ? rules : [rules]).map((rule): string => {
                            if (!rule) return '&';
    
                            if (rule.includes('&')) return rule;
    
                            if (rule.includes('.') || rule.includes(':')) return `&${rule}`;
    
                            return `&.${rule}`;
                        });
                        if (addSpecificity > 0) {
                            const specificity = (new Array(addSpecificity)).fill(':not(._)').join('');
                            normalizedRules = normalizedRules.map((rule) => (rule === '&') ? rule : `${rule}${specificity}`);
                        } // if

                        const mergedStyles = {
                            extend: (Array.isArray(styles) ? styles : [styles]) as JssStyle,
                        } as JssStyle;



                        if (normalizedRules.includes('&')) {
                            normalizedRules = normalizedRules.filter((rule) => (rule !== '&'));
                            noRules.push(mergedStyles);
                        } // if



                        return {
                            [normalizedRules.join(',')] : mergedStyles,
                        };
                    }),
                    
                    ...noRules,
                ];
            })(),
        ] as JssStyle,
    }}
    
    protected iif<T extends PropList|JssStyle>(condition: boolean, content: T): T {
        return condition ? content : ({} as T);
    }

    /**
     * Escapes some sets of character in svg data, so it will be valid to be written in css.
     * @param svgData The raw svg data to be escaped.
     * @returns A `string` represents an escaped svg data.
     */
    public escapeSvg(svgData: string): string {
        const escapedChars: Dictionary<string> = {
            '<': '%3c',
            '>': '%3e',
            '#': '%23',
            '(': '%28',
            ')': '%29',
        };

        const svgDataCopy = Array.from(svgData);
        for (const index in svgDataCopy) {
            const char = svgDataCopy[index];
            if (char in escapedChars) svgDataCopy[index] = escapedChars[char];
        }
    
        return svgDataCopy.join('');
    }

    /**
     * Creates a single layer solid background based on specified `color`.
     * @param color The color of the solid background to create.
     * @returns A `JssValue` represents a solid background.
     */
    public solidBackg(color: Cust.Ref, clip : Prop.BackgroundClip = 'border-box'): JssValue {
        return [[`linear-gradient(${color},${color})`, clip]];
    }
}



// configs:

export { CssConfig }



// react components:

const htmlPropList = [
    // All HTML Attributes
    'accept',
    'acceptCharset',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'as',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'cite',
    'classID',
    'cols',
    'colSpan',
    'content',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'disabled',
    'download',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'high',
    'href',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'integrity',
    'keyParams',
    'keyType',
    'kind',
    'label',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsInline',
    'poster',
    'preload',
    'readOnly',
    'rel',
    'required',
    'reversed',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'summary',
    'target',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap',

    // Standard HTML Attributes:
    'accessKey',
    // 'className',
    'contentEditable',
    'contextMenu',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'slot',
    'spellCheck',
    'style',
    'title',
    'translate',
    
    // accessibility:
    'tabIndex',

    // values:
    'defaultValue',
];
const isHtmlProp = (propName: string) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName)

export interface ElementProps<TElement extends HTMLElement = HTMLElement>
    extends
        React.DOMAttributes<TElement>,
        React.AriaAttributes
{
    // essentials:
    tag?            : keyof JSX.IntrinsicElements
    style?          : React.CSSProperties
    elmRef?         : React.Ref<TElement> // setter ref


    // identifiers:
    id?             : string


    // accessibility:
    role?           : React.AriaRole


    // classes:
    mainClass?      :  string|null|undefined
    classes?        : (string|null|undefined)[]
    variantClasses? : (string|null|undefined)[]
    stateClasses?   : (string|null|undefined)[]
}
export default function Element<TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>) {
    // html props:
    const htmlProps = useMemo(() => {
        const htmlProps = {
            ref : props.elmRef as any,
        };

        for (const name in props) {
            if (isHtmlProp(name)) {
                (htmlProps as any)[name] = (props as any)[name];
            } // if
        } // for
        
        return htmlProps;
    }, [props]);



    // fn props:
    const Tag = (props.tag ?? 'div');

    
    
    // jsx:
    return (
        <Tag
            // other props:
            {...htmlProps}


            // accessibility:
            role={props.role}


            // classes:
            className={[
                // main:
                props.mainClass,


                // additionals:
                ...(props.classes ?? []),


                // variants:
                ...(props.variantClasses ?? []),


                // states:
                ...(props.stateClasses ?? []),
            ].filter((c) => !!c).join(' ') || undefined}
        >
            { props.children }
        </Tag>
    );
};
export { Element }



// utils:

export { pascalCase, camelCase }

export function isTypeOf<TProps>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>): element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>> {
    return (
        React.isValidElement<TProps>(element)
        &&
        (
            (element.type === funcComponent)
            ||
            (
                (typeof element.type === 'function')
                &&
                (
                    (element.type.prototype instanceof funcComponent)
                    ||
                    (element.type.prototype === funcComponent.prototype)
                )
            )
        )
    );
}