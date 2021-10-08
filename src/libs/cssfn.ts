// jss   (builds css  using javascript):
import {
    // general types:
    JssStyle,
    JssValue,
    Classes,
    Styles,
    StyleSheet,

    create as createJss,
}                           from 'jss'          // base technology of our cssfn components
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

// cssfn:
import type {
    Optional,
    SingleOrArray,
    SingleOrDeepArray,
    ProductOrFactoryOrDeepArray,
    ProductOrFactory,

    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './types'      // cssfn's types
import type {
    Prop,
    PropEx,
    Cust,
}                           from './css-types'  // ts defs support for jss

// utilities:
import { pascalCase }       from 'pascal-case'  // pascal-case support for jss
import { camelCase }        from 'camel-case'   // camel-case  support for jss



// general types:

export type { JssStyle, JssValue, Classes, Styles, StyleSheet }
export type { Prop, PropEx, Cust }
export type { Dictionary, ValueOf, DictionaryOf }

export type Style                                                = JssStyle & ExtendableStyle
export type StyleCollection                                      = ProductOrFactoryOrDeepArray<Optional<Style>>

export type ClassName                                            = string
export type RealClass                                            = `.${ClassName}`
export type PseudoClass                                          = `:${ClassName}`
export type Class                                                = RealClass|PseudoClass
export type ClassEntry<TClassName extends ClassName = ClassName> = readonly [TClassName, StyleCollection]
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
export type SelectorCollection                                   = SingleOrDeepArray<Optional<Selector>>

export type NestedSelector                                       = '&'|`&${Selector}`|`${Selector}&`

export type RuleEntry                                            = readonly [SelectorCollection, StyleCollection]
export type RuleEntrySource                                      = ProductOrFactory<Optional<RuleEntry>>
export type RuleList                                             = RuleEntrySource[]
export type RuleCollection                                       = SingleOrArray<RuleEntrySource|RuleList>

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
export const createJssSheet = <TClassName extends ClassName = ClassName>(styles: ProductOrFactory<Styles<TClassName>>): StyleSheet<TClassName> => {
    return customJss.createStyleSheet(
        ((typeof(styles) === 'function') ? styles() : styles)
    );
}
export const createSheet    = <TClassName extends ClassName = ClassName>(classes: ProductOrFactory<ClassList<TClassName>>): StyleSheet<TClassName> => {
    return createJssSheet(
        () => usesCssfn(classes)
    );
}



// cssfn hooks:
export const usesCssfn = <TClassName extends ClassName = ClassName>(classes: ProductOrFactory<ClassList<TClassName>>): Styles<TClassName> => {
    return (mergeStyles(
        ((typeof(classes) === 'function') ? classes() : classes)
        /*
            empty `className` recognized as `@global` in our `jss-plugin-global`
            but to make more compatible with JSS' official `jss-plugin-global`
            we convert empty `className` to `'@global'`
         */
        .map(([className, styles]): Style => ({ [className || '@global'] : mergeStyles(styles) })) // convert each `[className, styles]` to `{ className : mergeStyles(styles) | null }`
    ) ?? {}) as Styles<TClassName>;
}



// compositions:
/**
 * Defines the (sub) component's composition.
 * @returns A `StyleCollection` represents the (sub) component's composition.
 */
export const composition     = (styles: StyleCollection[]): StyleCollection => styles;
/**
 * Merges the (sub) component's composition to single `Style`.
 * @returns A `Style` represents the merged (sub) component's composition  
 * -or-  
 * `null` represents an empty `Style`.
 */
export const mergeStyles     = (styles: StyleCollection): Style|null => {
    /*
        StyleCollection = ProductOrFactoryOrDeepArray<Optional<Style>>
        StyleCollection = ProductOrFactory<Optional<Style>> | ProductOrFactoryDeepArray<Optional<Style>>
        typeof          = ---------- not an array --------- | -------------- is an array ---------------
    */
    
    
    
    if (!Array.isArray(styles)) {
        // not an array => ProductOrFactory<Optional<Style>>
        
        const styleValue: Optional<Style> = (
            (typeof(styles) === 'function')
            ?
            styles() // a function => Factory<Optional<Style>>
            :
            styles   // a product  => Optional<Style>
        );
        if (!styleValue) return null; // `null` or `undefined` => return `null`
        
        
        
        return styleValue;
    } // if
    
    
    
    const mergedStyles: Style = {}
    for (const subStyles of styles) {
        const subStyleValue: Optional<Style> = (
            Array.isArray(subStyles)
            ?
            mergeStyles(subStyles) // an array => ProductOrFactoryDeepArray<Optional<Style>> => recursively `mergeStyles()`
            :
            (
                // not an array => ProductOrFactory<Optional<Style>>
                
                (typeof(subStyles) === 'function')
                ?
                subStyles() // a function => Factory<Optional<Style>>
                :
                subStyles   // a product  => Optional<Style>
            )
        );
        if (!subStyleValue) continue; // `null` or `undefined` => skip
        
        
        
        mergeStyle(mergedStyles, subStyleValue);
    } // for
    if (Object.keys(mergedStyles).length === 0) return null; // an empty object => return `null`
    return mergedStyles;
}
/**
 * Defines the additional component's composition.
 * @returns A `ClassEntry` represents the component's composition.
 */
export const compositionOf   = <TClassName extends ClassName = ClassName>(className: TClassName, styles: StyleCollection[]): ClassEntry<TClassName> => [
    className,
    styles
];
// shortcut compositions:
/**
 * Defines the main component's composition.
 * @returns A `ClassEntry` represents the component's composition.
 */
export const mainComposition = (styles: StyleCollection[])      => compositionOf('main' , styles);
/**
 * Defines the global style applied to a whole document.
 * @returns A `ClassEntry` represents the global style.
 */
export const global          = (ruleCollection: RuleCollection) => compositionOf(''     , [rules(ruleCollection)]);
export const imports         = (styles: StyleCollection[])      => composition(styles);



// layouts:
/**
 * Defines component's layout.
 * @returns A `Style` represents the component's layout.
 */
export const layout = (style: Style): Style => style;
/**
 * Defines component's variable(s).
 * @returns A `Style` represents the component's variable(s).
 */
export const vars   = (items: { [name: string]: JssValue }): Style => items;
//combinators:
export const combinators = (combinator: string, selectors: SelectorCollection, styles: StyleCollection): PropList => {
    const combiSelectors = flat(selectors).map((selector) => {
        if (!selector) selector = '*'; // empty selector => match any element
        
        if (selector === '&') return selector; // no children => the parent itself
        
        if (((combinator === ' ') || (combinator === '>')) && selector.startsWith('::')) return `&${selector}`; // pseudo element => attach the parent itself (for descendants & children)
        
        return `&${combinator}${selector}`;
    });
    if (!combiSelectors.length) return {}; // no selector => return empty
    
    
    
    const mergedStyles = mergeStyles(styles); // merge the `styles` to single `Style`, for making JSS understand
    if (!mergedStyles) return {}; // no style => return empty
    
    
    
    return {
        [combiSelectors.join(',')]: mergedStyles as JssValue,
    };
};
export const descendants      = (selectors: SelectorCollection, styles: StyleCollection) => combinators(' ', selectors, styles);
export const children         = (selectors: SelectorCollection, styles: StyleCollection) => combinators('>', selectors, styles);
export const siblings         = (selectors: SelectorCollection, styles: StyleCollection) => combinators('~', selectors, styles);
export const adjacentSiblings = (selectors: SelectorCollection, styles: StyleCollection) => combinators('+', selectors, styles);



// rules:
export const rules = (ruleCollection: RuleCollection, minSpecificityWeight: number = 0): StyleCollection => composition(
    ((): StyleCollection[] => {
        const noSelectors: StyleCollection[] = [];
        
        return [
            ...(Array.isArray(ruleCollection) ? ruleCollection : [ruleCollection])
                .map((ruleEntrySourceList: RuleEntrySource|RuleList): Optional<RuleEntry>[] => { // convert: Factory<RuleEntry>|RuleEntry|RuleList => [RuleEntry]|[RuleEntry]|[...RuleList] => [RuleEntry]
                    const isOptionalString                = (value: any): value is OptionalString => {
                        if (value === null)      return true; // optional `null`
                        if (value === undefined) return true; // optional `undefined`
                        
                        
                        
                        return ((typeof value) === 'string');
                    };
                    const isOptionalStringDeepArr         = (value: any): value is OptionalString[] => {
                        if (!Array.isArray(value)) return false;
                        
                        
                        
                        const nonOptionalStringItems = value.filter((v) => !isOptionalString(v));
                        if (nonOptionalStringItems.length === 0) return true;
                        
                        
                        
                        for (const nonOptionalStringItem of nonOptionalStringItems) {
                            if (!isOptionalStringDeepArr(nonOptionalStringItem)) return false;
                        } // for
                        
                        
                        
                        return true;
                    };
                    
                    const isOptionalSelector              = (value: any): value is Optional<Selector>   => isOptionalString(value);
                    const isOptionalSelectorDeepArr       = (value: any): value is Optional<Selector>[] => isOptionalStringDeepArr(value);
                    
                    const isOptionalStyleOrFactory        = (value: any): value is ProductOrFactory<Style> => {
                        if (value === null)      return true; // optional `null`
                        if (value === undefined) return true; // optional `undefined`
                        
                        
                        
                        return (
                            value
                            &&
                            (
                                ((typeof(value) === 'object') && !Array.isArray(value)) // literal object => `Style`
                                ||
                                (typeof(value) === 'function') // function => `Factory<Style>`
                            )
                        );
                    };
                    const isOptionalStyleOrFactoryDeepArr = (value: any): value is Style[] => {
                        if (!Array.isArray(value)) return false;
                        
                        
                        
                        const nonStyleOrFactoryItems = value.filter((v) => !isOptionalStyleOrFactory(v));
                        if (nonStyleOrFactoryItems.length === 0) return true;
                        
                        
                        
                        for (const nonStyleOrFactoryItem of nonStyleOrFactoryItems) {
                            if (!isOptionalStyleOrFactoryDeepArr(nonStyleOrFactoryItem)) return false;
                        } // for
                        
                        
                        
                        return true;
                    };
                    
                    const isOptionalRuleEntry             = (value: any): value is Optional<RuleEntry> => {
                        if (value === null)      return true; // optional `null`
                        if (value === undefined) return true; // optional `undefined`
                        
                        
                        
                        if (value.length !== 2)  return false; // not a tuple => not a `RuleEntry`
                        
                        
                        
                        const [first, second] = value;
                        
                        /*
                            the first element must be `SelectorCollection`:
                            * `Optional<Selector>`
                            * DeepArrayOf< `Optional<Selector>` >
                            * empty array
                        */
                        // and
                        /*
                            the second element must be `StyleCollection`:
                            * `Optional<Style>` | `Factory<Optional<Style>>`
                            * DeepArrayOf< `Optional<Style> | Factory<Optional<Style>>` >
                            * empty array
                        */
                        return (
                            (
                                isOptionalSelector(first)
                                ||
                                isOptionalSelectorDeepArr(first)
                            )
                            &&
                            (
                                isOptionalStyleOrFactory(second)
                                ||
                                isOptionalStyleOrFactoryDeepArr(second)
                            )
                        );
                    };
                    
                    
                    
                    if (typeof(ruleEntrySourceList) === 'function') return [ruleEntrySourceList()];
                    if (isOptionalRuleEntry(ruleEntrySourceList))   return [ruleEntrySourceList];
                    return ruleEntrySourceList.map((ruleEntrySource) => (typeof(ruleEntrySource) === 'function') ? ruleEntrySource() : ruleEntrySource);
                })
                .flat(/*depth: */1) // flatten: Optional<RuleEntry>[][] => Optional<RuleEntry>[]
                .filter((optionalRuleEntry): optionalRuleEntry is RuleEntry => !!optionalRuleEntry)
                .map(([selectors, styles]): readonly [NestedSelector[], StyleCollection] => {
                    let nestedSelectors = flat(selectors).filter((selector): selector is Selector => !!selector).map((selector): NestedSelector => {
                        if (selector.startsWith('@')) return (selector as NestedSelector); // for `@media`

                        if (selector.includes('&')) return (selector as NestedSelector); // &.foo   .boo&   .foo&.boo

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



                    if (nestedSelectors.includes('&')) { // contains one/more selectors with zero specificity
                        nestedSelectors = nestedSelectors.filter((nestedSelector) => (nestedSelector !== '&')); // filter out selectors with zero specificity
                        noSelectors.push(styles); // add styles with zero specificity
                    } // if



                    return [nestedSelectors, styles];
                })
                .filter(([nestedSelectors]) => (nestedSelectors.length > 0)) // filter out empty `nestedSelectors`
                .map(([nestedSelectors, styles]) => [
                    nestedSelectors,
                    mergeStyles(styles) // merge the `styles` to single `Style`, for making JSS understand
                ] as const)
                .filter(([, mergedStyles]) => !!mergedStyles) // filter out empty `mergedStyles`
                .map(([nestedSelectors, mergedStyles]): Style => {
                    return {
                        [nestedSelectors.join(',')] : mergedStyles as JssValue,
                    };
                }),
            
            ...noSelectors,
        ];
    })()
);
// shortcut rules:
/**
 * Defines component's variants.
 * @returns A `StyleCollection` represents the component's variants.
 */
export const variants = (variants: RuleCollection, minSpecificityWeight: number = 0): StyleCollection => rules(variants, minSpecificityWeight);
/**
 * Defines component's states.
 * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
 * @returns A `StyleCollection` represents the component's states.
 */
export const states   = (states: RuleCollection|((inherit: boolean) => RuleCollection), inherit = false, minSpecificityWeight = 3): StyleCollection => {
    return rules((typeof(states) === 'function') ? states(inherit) : states, minSpecificityWeight);
}
// rule items:
/**
 * Defines component's `style(s)` that is applied when the specified `selector(s)` meet the conditions.
 * @returns A `RuleEntry` represents the component's rule.
 */
export const rule = (selectors: SelectorCollection, styles: StyleCollection): RuleEntry => [selectors, styles];
// shortcut rule items:
export const noRule            = (styles: StyleCollection) => rule('&'                  , styles);
export const atRoot            = (styles: StyleCollection) => rule(':root'              , styles);
export const atGlobal          = (styles: StyleCollection) => rule('@global'            , styles);
export const fontFace          = (styles: StyleCollection) => atGlobal(
    rules([
        rule('@font-face', styles),
    ]),
);
export const isFirstChild      = (styles: StyleCollection) => rule(     ':first-child'  , styles);
export const isNotFirstChild   = (styles: StyleCollection) => rule(':not(:first-child)' , styles);
export const isLastChild       = (styles: StyleCollection) => rule(     ':last-child'   , styles);
export const isNotLastChild    = (styles: StyleCollection) => rule(':not(:last-child)'  , styles);
export const isNthChild        = (step: number, offset: number, styles: StyleCollection): RuleEntry => {
    if (step === 0) { // no step
        if (offset === 0) return rule(':none', null); // element indices are starting from 1 => never match => return empty style
        
        if (offset === 1) return isFirstChild(styles);
        
        return rule(`:nth-child(${offset})`, styles);
    }
    else if (step === 1) { // 1 step
        return rule(`:nth-child(n+${offset})`, styles);
    }
    else { // 2+ steps
        return rule(`:nth-child(${step}n+${offset})`, styles);
    } // if
};
export const isNotNthChild     = (step: number, offset: number, styles: StyleCollection): RuleEntry => {
    if (step === 0) { // no step
        // if (offset === 0) return rule(':none', null); // element indices are starting from 1 => never match => return empty style
        
        if (offset === 1) return isNotFirstChild(styles);
        
        return rule(`:not(:nth-child(${offset}))`, styles);
    }
    else if (step === 1) { // 1 step
        return rule(`:not(:nth-child(n+${offset}))`, styles);
    }
    else { // 2+ steps
        return rule(`:not(:nth-child(${step}n+${offset}))`, styles);
    } // if
};
export const isNthLastChild    = (step: number, offset: number, styles: StyleCollection): RuleEntry => {
    if (step === 0) { // no step
        if (offset === 0) return rule(':none', null); // element indices are starting from 1 => never match => return empty style
        
        if (offset === 1) return isLastChild(styles);
        
        return rule(`:nth-last-child(${offset})`, styles);
    }
    else if (step === 1) { // 1 step
        return rule(`:nth-last-child(n+${offset})`, styles);
    }
    else { // 2+ steps
        return rule(`:nth-last-child(${step}n+${offset})`, styles);
    } // if
};
export const isNotNthLastChild = (step: number, offset: number, styles: StyleCollection): RuleEntry => {
    if (step === 0) { // no step
        // if (offset === 0) return rule(':none', null); // element indices are starting from 1 => never match => return empty style
        
        if (offset === 1) return isNotLastChild(styles);
        
        return rule(`:not(:nth-last-child(${offset}))`, styles);
    }
    else if (step === 1) { // 1 step
        return rule(`:not(:nth-last-child(n+${offset}))`, styles);
    }
    else { // 2+ steps
        return rule(`:not(:nth-last-child(${step}n+${offset}))`, styles);
    } // if
};
export const isActive          = (styles: StyleCollection) => rule(     ':active'        , styles);
export const isNotActive       = (styles: StyleCollection) => rule(':not(:active)'       , styles);
export const isFocus           = (styles: StyleCollection) => rule(     ':focus'         , styles);
export const isNotFocus        = (styles: StyleCollection) => rule(':not(:focus)'        , styles);
export const isFocusVisible    = (styles: StyleCollection) => rule(     ':focus-visible' , styles);
export const isNotFocusVisible = (styles: StyleCollection) => rule(':not(:focus-visible)', styles);
export const isHover           = (styles: StyleCollection) => rule(     ':hover'         , styles);
export const isNotHover        = (styles: StyleCollection) => rule(':not(:hover)'        , styles);
export const isEmpty           = (styles: StyleCollection) => rule(     ':empty'         , styles);
export const isNotEmpty        = (styles: StyleCollection) => rule(':not(:empty)'        , styles);



// utilities:
/**
 * Returns a new array with all sub-array elements concatenated into it recursively up to infinity depth.
 * @param collection An element -or- an array of element -or- a recursive array of element
 * @returns A new array with all sub-array elements concatenated into it.
 */
const flat = <T,>(collection: SingleOrDeepArray<T>): T[] => {
    /*
        SingleOrDeepArray<T> =       T      | DeepArray<T>
        typeof               = not an array | is an array
    */
    
    
    
    if (!Array.isArray(collection)) {
        // not an array => T
        
        return [collection];
    } // if
    
    
    
    const merged: T[] = [];
    for (const item of collection) {
        if (Array.isArray(item)) {
            // an array => DeepArray<T> => recursively `flat()`
            
            merged.push(...flat(item));
        }
        else {
            // not an array => T
            
            merged.push(item);
        } // if
    } // for
    return merged;
};
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
 * @returns A `Cust.Expr` represents a solid background.
 */
export const solidBackg = (color: Cust.Expr, clip : Prop.BackgroundClip = 'border-box'): Cust.Expr => {
    return [[`linear-gradient(${color},${color})`, clip]];
}
export { pascalCase, camelCase }
