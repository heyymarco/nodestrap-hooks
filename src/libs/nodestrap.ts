// jss   (builds css  using javascript):
import {
    // general types:
    JssStyle,
    JssValue,
    Classes,
    Styles,
    StyleSheet,

    create as createJss,
}                           from 'jss'          // base technology of our nodestrap components
// official jss-plugins:
import jssPluginNested      from 'jss-plugin-nested'
import jssPluginCamelCase   from 'jss-plugin-camel-case'
import jssPluginExpand      from 'jss-plugin-expand'
import jssPluginVendor      from 'jss-plugin-vendor-prefixer'
// custom jss-plugins:
import jssPluginGlobal      from './jss-plugin-global'
import {
    default as jssPluginExtend,
    ExtendableStyle,
    mergeStyle,
}                           from './jss-plugin-extend'
import jssPluginShort       from './jss-plugin-short'

// nodestrap (modular web components):
import type {
    Optional,
    SingleOrArray,
    Factory,

    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './types'      // nodestrap's types
import type {
    Prop,
    PropEx,
    Cust,
}                           from './css-types'  // ts defs support for jss

// utils:
import { pascalCase }       from 'pascal-case'  // pascal-case support for jss
import { camelCase }        from 'camel-case'   // camel-case  support for jss



// general types:

export type { JssStyle, JssValue, Classes, Styles, StyleSheet }
export type { Prop, PropEx, Cust }
export type { Dictionary, ValueOf, DictionaryOf }

export type Style                                      = JssStyle & ExtendableStyle
export type ClassEntry<TClass extends string = string> = readonly [TClass, Style]
export type ClassList <TClass extends string = string> = ClassEntry<TClass>[]
export type OptionalString                             = Optional<string>
export type RuleEntry                                  = readonly [SingleOrArray<OptionalString>, SingleOrArray<Style>]
export type RuleList                                   = RuleEntry[]
export type RuleCollection                             = (RuleEntry|RuleList)[]
export type PropList                                   = Dictionary<JssValue>



// jss:
const customJss = createJss().setup({plugins:[
    jssPluginGlobal(),    // requires to be placed before all other plugins
    jssPluginExtend(),
    jssPluginNested(),
    jssPluginShort(),     // requires to be placed before `camelCase`
    jssPluginCamelCase(),
    jssPluginExpand(),
    jssPluginVendor(),
]});



// styles:
export const createStyle = <TClass extends string = string>(styles: Styles<TClass>|Factory<Styles<TClass>>): StyleSheet<TClass> => {
    return customJss.createStyleSheet(
        ((typeof(styles) === 'function') ? styles() : styles)
    );
}
export const createNodestrapStyle = <TClass extends string = string>(classes: ClassList<TClass>|Factory<ClassList<TClass>>): StyleSheet<TClass> => {
    return createStyle(
        () => usesNodestrap(classes)
    );
}



// nodestrap hooks:
export const usesNodestrap = <TClass extends string = string>(classes: ClassList<TClass>|Factory<ClassList<TClass>>): Styles<TClass> => {
    const mergedStyles = {} as Styles<TClass>;

    
    
    ((typeof(classes) === 'function') ? classes() : classes)
    /*
        empty `className` recognized as `@global` in our `jss-plugin-global`
        but to make more compatible with JSS' official `jss-plugin-global`
        we convert empty `className` to `'@global'`
     */
    .map(([className, style]): Style => ({ [className || '@global']: style })) // convert each `[className, style]` to `Style` of `Style`
    .forEach((style) => mergeStyle(mergedStyles as Style, style)); // merge each `Style` to `mergedStyles`

    
    
    // here the merged `Style`s:
    return mergedStyles;
}



// compositions:
/**
 * Defines the component's composition.
 * @returns A `ClassEntry` represents the component's composition.
 */
export const composition = <TClass extends string = 'main'>(styles: Style[], className: TClass = 'main' as TClass): ClassEntry<TClass> => [
    className,

    {
        extend: styles,
    } as Style
];
/**
 * Defines the global style applied to a whole document.
 * @returns A `ClassEntry` represents the global style.
 */
export const global = (ruleCollection: RuleCollection): ClassEntry<''> => [
    '',

    rules(ruleCollection)
];



// layouts:
/**
 * Defines component's layout.
 * @returns A `Style` represents the component's layout.
 */
export const layout = (style: Style): Style => style;



// rules:
export const rules    = (ruleCollection: RuleCollection, minSpecificityWeight: number = 0): Style => ({
    extend: ((): Style[] => {
        const noRules: Style[] = [];

        return [
            ...ruleCollection
                .map((ruleEntryList: RuleEntry|RuleList): RuleList => { // unflat: RuleEntry|RuleList => [RuleEntry]|RuleList => RuleList
                    const isOptionalString    = (value: any): value is OptionalString => {
                        if ((typeof value) === 'string') return true; // a `string` detected

                        if (value === null)              return true; // optional `null`
                        if (value === undefined)         return true; // optional `undefined`

                        return false; // the value is not an `OptionalString`
                    };
                    const isOptionalStringArr = (value: any): value is OptionalString[] => {
                        return (
                            Array.isArray(value)
                            &&
                            value.every((v) => isOptionalString(v))
                        );
                    };

                    const isStyle             = (value: any): value is Style => {
                        return value && (typeof(value) === 'object') && !Array.isArray(value);
                    };
                    const isStyleArr          = (value: any): value is Style[] => {
                        return (
                            Array.isArray(value)
                            &&
                            value.every((v) => isStyle(v))
                        );
                    };

                    
                    
                    const isRuleEntry         = (value: any): value is RuleEntry => {
                        if (value.length !== 2) return false; // not a tuple => not a `RuleEntry`

                        
                        
                        const [first, second] = value;

                        // the first element must be an `OptionalString` -or- an array of `OptionalString` -or- an empty array
                        // and
                        // the second element must be a `Style`          -or- an array of `Style`          -or- an empty array
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
                .flat(/*depth: */1) // flatten: RuleList[] => [RuleList, RuleList, ...] => [...RuleList, ...RuleList, ...] => [RuleEntry, RuleEntry, ...] => RuleEntry[]
                .map(([rules, styles]): readonly [string[], Style] => {
                    let normalizedRules = (Array.isArray(rules) ? rules : [rules]).map((rule): string => {
                        if (!rule) return '&';

                        if (rule.includes('&')) return rule;

                        if (rule.includes('.') || rule.includes(':')) return `&${rule}`;

                        return `&.${rule}`;
                    });
                    if (minSpecificityWeight >= 2) {
                        normalizedRules = normalizedRules.map((rule): string => {
                            if (rule === '&') return rule; // zero specificity => no change

                            // one/more specificities found => increase the specificity weight until reaches `minSpecificityWeight`

                            
                            
                            // calculate the specificity weight:
                            // `.realClassName` or `:pseudoClassName` (without parameters):
                            const classes               = rule.match(/(\.|:(?!(is|not)(?![\w-])))[\w-]+/gmi); // count the `.realClassName` and `:pseudoClassName` but not `:is` or `:not`
                            const specificityWeight     = classes?.length ?? 0;
                            const missSpecificityWeight = minSpecificityWeight - specificityWeight;

                            
                            
                            // the specificity weight was meet the minimum specificity required => no change:
                            if (missSpecificityWeight <= 0) return rule;

                            // the specificity weight is less than the minimum specificity required => increase the specificity:
                            return `${rule}${(new Array(missSpecificityWeight)).fill(((): string => {
                                const lastClass = classes?.[classes.length - 1];
                                if (lastClass) {
                                    // the last word (without parameters):
                                    if (rule.length === (rule.lastIndexOf(lastClass) + lastClass.length)) return lastClass; // `.realClassName` or `:pseudoClassName` without parameters
                                } // if
                                
                                
                                
                                // use a **hacky class name** to increase the specificity:
                                return ':not(._)';
                            })()).join('')}`;
                        });
                    } // if

                    const mergedStyles: Style = {
                        extend: styles,
                    };



                    if (normalizedRules.includes('&')) { // contains one/more rules with zero specificity
                        normalizedRules = normalizedRules.filter((rule) => (rule !== '&')); // filter out rules with zero specificity
                        noRules.push(mergedStyles); // add styles with zero specificity
                    } // if



                    return [normalizedRules, mergedStyles];
                })
                .filter(([normalizedRules]) => (normalizedRules.length > 0)) // filter out empty normalizedRules
                .map(([normalizedRules, mergedStyles]): Style => {
                    return {
                        [normalizedRules.join(',')] : mergedStyles,
                    };
                }),
            
            ...noRules,
        ];
    })(),
});
/**
 * Defines component's variants.
 * @returns A `Style` represents the component's variants.
 */
export const variants = (variants: RuleCollection): Style => rules(variants);
/**
 * Defines component's states.
 * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
 * @returns A `Style` represents the component's states.
 */
export const states   = (states: RuleCollection|((inherit: boolean) => RuleCollection), inherit = false, minSpecificityWeight = 3): Style => {
    return rules((typeof(states) === 'function') ? states(inherit) : states, minSpecificityWeight);
}



// functions:
/**
 * Defines functional props in which the values *depends on* the variants and/or the states using *fallback* strategy.
 * @returns A `Style` represents the functional props.
 */
export const propsFn = (props: PropList): Style => {
    const style: Dictionary<any> = {};
    for (const [propName, propValue] of Object.entries(props)) {
        style[propName] = propValue;
    } // for
    return style as Style;
}



// utilities:
export const iif = <T extends PropList|Style>(condition: boolean, content: T): T => {
    return condition ? content : ({} as T);
};
/**
 * Escapes some sets of character in svg data, so it will be valid to be written in css.
 * @param svgData The raw svg data to be escaped.
 * @returns A `string` represents an escaped svg data.
 */
export const escapeSvg = (svgData: string): string => {
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
};
/**
 * Creates a single layer solid background based on specified `color`.
 * @param color The color of the solid background to create.
 * @returns A `JssValue` represents a solid background.
 */
export const solidBackg = (color: Cust.Ref, clip : Prop.BackgroundClip = 'border-box'): JssValue => {
    return [[`linear-gradient(${color},${color})`, clip]];
}


    
// prop's utilities:
/**
 * Holds the prefix name of the generated css props.  
 * Useful to avoid name collision if working with another css frameworks.
 */
let prefix: string = 'ns';
/**
 * Gets the *declaration name* of the specified `propName`.
 * @param propName The name of prop to retrieve.
 * @returns A `Cust.Decl` represents the declaration name of the specified `propName`.
 */
export const decl = (propName: string): Cust.Decl => {
    return prefix ? `--${prefix}-${propName}` : `--${propName}`; // add double dash with prefix `--prefix-` or double dash without prefix `--`
}
/**
 * Gets the *value* (reference) of the specified `propName`.
 * @param propName The name of prop to retrieve.
 * @param fallbacks The name of secondary/next prop to retrieve if the specified `propName` was not found.
 * @returns A `Cust.Ref` represents the expression for retrieving the value of the specified `propName`.
 */
export const ref = (propName: string, ...fallbacks: string[]): Cust.Ref => {
    const varPrefix = prefix ? `--${prefix}-` : '--';



    const fallbackRecursive = (...fallbacks: string[]): string => {
        const [curentFallback, ...restFallbacks] = fallbacks;

        if (!curentFallback) return ''; // no more fallback => return empty

        // handle the curentFallback and recursively handle the restFallbacks:
        return `,var(${varPrefix}${curentFallback}${fallbackRecursive(...restFallbacks)})`;
    };



    return `var(${varPrefix}${propName}${fallbackRecursive(...fallbacks)})` as Cust.Ref;
}



// other utilities:
export { pascalCase, camelCase }
