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

export type Style                                                = JssStyle & ExtendableStyle

export type ClassName                                            = string
export type RealClass                                            = `.${ClassName}`
export type PseudoClass                                          = `:${ClassName}`
export type Class                                                = RealClass|PseudoClass
export type ClassEntry<TClassName extends ClassName = ClassName> = readonly [TClassName, Style]
export type ClassList <TClassName extends ClassName = ClassName> = ClassEntry<TClassName>[]

export type OptionalString                                       = Optional<string>

export type UniversalSelector                                    = '*'
export type RealElementSelector                                  = string
export type PseudoElementSelector                                = `::${string}`
export type ElementSelector                                      = RealElementSelector|PseudoElementSelector
export type ClassSelector                                        = Class
export type IdSelector                                           = `#${string}`
export type SingleSelector                                       = UniversalSelector|ElementSelector|ClassSelector|IdSelector
export type Selector                                             = SingleSelector|`${SingleSelector}${SingleSelector}`|`${SingleSelector}${SingleSelector}${SingleSelector}`|`${SingleSelector}${SingleSelector}${SingleSelector}${SingleSelector}`|`${SingleSelector}${SingleSelector}${SingleSelector}${SingleSelector}${SingleSelector}`
export type NestedSelector                                       = '&'|`&${Selector}`|`${Selector}&`
export type RuleEntry                                            = readonly [SingleOrArray<Optional<Selector>>, SingleOrArray<Style>]
export type RuleList                                             = RuleEntry[]
export type RuleCollection                                       = (RuleEntry|RuleList)[]
export type PropList                                             = Dictionary<JssValue>



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
export const createStyle = <TClassName extends ClassName = ClassName>(styles: Styles<TClassName>|Factory<Styles<TClassName>>): StyleSheet<TClassName> => {
    return customJss.createStyleSheet(
        ((typeof(styles) === 'function') ? styles() : styles)
    );
}
export const createNodestrapStyle = <TClassName extends ClassName = ClassName>(classes: ClassList<TClassName>|Factory<ClassList<TClassName>>): StyleSheet<TClassName> => {
    return createStyle(
        () => usesNodestrap(classes)
    );
}



// nodestrap hooks:
export const usesNodestrap = <TClassName extends ClassName = ClassName>(classes: ClassList<TClassName>|Factory<ClassList<TClassName>>): Styles<TClassName> => {
    const mergedStyles = {} as Styles<TClassName>;

    
    
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
 * Defines the additional component's composition.
 * @returns A `ClassEntry` represents the component's composition.
 */
export const compositionOf = <TClassName extends ClassName = 'main'>(className: TClassName, styles: SingleOrArray<Style>): ClassEntry<TClassName> => [
    className,

    mergeStyles(styles)
];
/**
 * Defines the main component's composition.
 * @returns A `ClassEntry` represents the component's composition.
 */
export const composition   = (styles: SingleOrArray<Style>)   => compositionOf('main' , styles);
/**
 * Defines the global style applied to a whole document.
 * @returns A `ClassEntry` represents the global style.
 */
export const global        = (ruleCollection: RuleCollection) => compositionOf(''     , rules(ruleCollection));



// layouts:
/**
 * Defines component's layout.
 * @returns A `Style` represents the component's layout.
 */
export const layout = (style: Style): Style => style;
//combinators:
export const combinators = (combinator: string, selectors: SingleOrArray<Optional<Selector>>, styles: SingleOrArray<Style>): PropList => ({
    [ (Array.isArray(selectors) ? selectors : [selectors]).map((selector) => `&${combinator}${selector}`).join(',') ] : mergeStyles(styles) as JssValue,
});
export const descendants      = (selectors: SingleOrArray<Optional<Selector>>, styles: SingleOrArray<Style>) => combinators(' ', selectors, styles);
export const children         = (selectors: SingleOrArray<Optional<Selector>>, styles: SingleOrArray<Style>) => combinators('>', selectors, styles);
export const siblings         = (selectors: SingleOrArray<Optional<Selector>>, styles: SingleOrArray<Style>) => combinators('~', selectors, styles);
export const adjacentSiblings = (selectors: SingleOrArray<Optional<Selector>>, styles: SingleOrArray<Style>) => combinators('+', selectors, styles);



// rule groups:
export const rules = (ruleCollection: RuleCollection, minSpecificityWeight: number = 0): Style => ({
    extend: ((): Style[] => {
        const noSelectors: Style[] = [];

        return [
            ...ruleCollection
                .map((ruleEntryList: RuleEntry|RuleList): RuleList => { // unflat: RuleEntry|RuleList => [RuleEntry]|RuleList => RuleList
                    const isOptionalString      = (value: any): value is OptionalString => {
                        if ((typeof value) === 'string') return true; // a `string` detected

                        if (value === null)              return true; // optional `null`
                        if (value === undefined)         return true; // optional `undefined`

                        return false; // the value is not an `OptionalString`
                    };
                    const isOptionalStringArr   = (value: any): value is OptionalString[] => {
                        return (
                            Array.isArray(value)
                            &&
                            value.every((v) => isOptionalString(v))
                        );
                    };

                    const isOptionalSelector    = (value: any): value is Optional<Selector>   => isOptionalString(value);
                    const isOptionalSelectorArr = (value: any): value is Optional<Selector>[] => isOptionalStringArr(value);

                    const isStyle               = (value: any): value is Style => {
                        return value && (typeof(value) === 'object') && !Array.isArray(value);
                    };
                    const isStyleArr            = (value: any): value is Style[] => {
                        return (
                            Array.isArray(value)
                            &&
                            value.every((v) => isStyle(v))
                        );
                    };

                    const isRuleEntry           = (value: any): value is RuleEntry => {
                        if (value.length !== 2) return false; // not a tuple => not a `RuleEntry`

                        
                        
                        const [first, second] = value;

                        // the first element must be an `Optional<Selector>` -or- an array of `Optional<Selector>` -or- an empty array
                        // and
                        // the second element must be a `Style`              -or- an array of `Style`              -or- an empty array
                        return (
                            (
                                isOptionalSelector(first)
                                ||
                                isOptionalSelectorArr(first)
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
                .map(([selectors, styles]): readonly [NestedSelector[], Style] => {
                    let nestedSelectors = (Array.isArray(selectors) ? selectors : [selectors]).map((selector): NestedSelector => {
                        if (!selector) return '&';

                        if (selector.startsWith('&') || selector.endsWith('&')) return (selector as NestedSelector);

                        // if (selector.startsWith('.') || selector.startsWith(':') || selector.startsWith('#') || (selector === '*')) return `&${selector}`;

                        return `&${selector}`;
                    });
                    if (minSpecificityWeight >= 2) {
                        nestedSelectors = nestedSelectors.map((nestedSelector: NestedSelector): NestedSelector => {
                            if (nestedSelector === '&') return nestedSelector; // zero specificity => no change

                            // one/more specificities found => increase the specificity weight until reaches `minSpecificityWeight`

                            
                            
                            // calculate the specificity weight:
                            // `.realClassName` or `:pseudoClassName` (without parameters):
                            const classes               = nestedSelector.match(/(\.|:(?!(is|not)(?![\w-])))[\w-]+/gmi); // count the `.RealClass` and `:PseudoClass` but not `:is` or `:not`
                            const specificityWeight     = classes?.length ?? 0;
                            const missSpecificityWeight = minSpecificityWeight - specificityWeight;

                            
                            
                            // the specificity weight was meet the minimum specificity required => no change:
                            if (missSpecificityWeight <= 0) return nestedSelector;

                            // the specificity weight is less than the minimum specificity required => increase the specificity:
                            return `${nestedSelector}${(new Array(missSpecificityWeight)).fill(((): Selector => {
                                const lastClass = classes?.[classes.length - 1];
                                if (lastClass) {
                                    // the last word (without parameters):
                                    if (nestedSelector.length === (nestedSelector.lastIndexOf(lastClass) + lastClass.length)) return (lastClass as Selector); // `.RealClass` or `:PseudoClass` without parameters
                                } // if
                                
                                
                                
                                // use a **hacky class name** to increase the specificity:
                                return ':not(._)';
                            })()).join('')}` as NestedSelector;
                        });
                    } // if

                    const mergedStyles: Style = {
                        extend: styles,
                    };



                    if (nestedSelectors.includes('&')) { // contains one/more selectors with zero specificity
                        nestedSelectors = nestedSelectors.filter((nestedSelector) => (nestedSelector !== '&')); // filter out selectors with zero specificity
                        noSelectors.push(mergedStyles); // add styles with zero specificity
                    } // if



                    return [nestedSelectors, mergedStyles];
                })
                .filter(([nestedSelectors]) => (nestedSelectors.length > 0)) // filter out empty `nestedSelectors`
                .map(([nestedSelectors, mergedStyles]): Style => {
                    return {
                        [nestedSelectors.join(',')] : mergedStyles,
                    };
                }),
            
            ...noSelectors,
        ];
    })(),
});
// shortcut rule groups:
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

// rules:
/**
 * Defines component's `style(s)` that is applied when the specified `selector(s)` meet the conditions.
 * @returns A `RuleEntry` represents the component's rule.
 */
export const rule = (selectors: SingleOrArray<Optional<Selector>>, styles: SingleOrArray<Style>): RuleEntry => [selectors, styles];
// shortcut rules:
export const atRoot          = (styles: SingleOrArray<Style>) => rule(':root'              , styles);
export const isFirstChild    = (styles: SingleOrArray<Style>) => rule(     ':first-child'  , styles);
export const isNotFirstChild = (styles: SingleOrArray<Style>) => rule(':not(:first-child)' , styles);
export const isLastChild     = (styles: SingleOrArray<Style>) => rule(     ':last-child'   , styles);
export const isNotLastChild  = (styles: SingleOrArray<Style>) => rule(':not(:last-child)'  , styles);
/*export const isNthChild    = (step: number, offset: number, styles: SingleOrArray<Style>): RuleEntry => {
    if (step <= 0) { // no step
        if (offset <= 0) return rule(':none', {}); // element indices are starting from 1 => never match => return empty style

        if (offset === 1) return isFirstChild(styles);

        return rule(`:nth-child(${offset})`, {});
    }
    else if (step === 1) {

    }
    
    
    
    if(offset <= 0) {

    } // if
};*/



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
export const mergeStyles = (styles: SingleOrArray<Style>): Style => (Array.isArray(styles) ? ({ extend: styles } as Style) : styles);
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
