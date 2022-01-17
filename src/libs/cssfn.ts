// jss:
import {
    // general types:
    Classes,
    Styles,
    StyleSheet,
    
    
    
    CreateGenerateId,
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components
// custom jss-plugins:
import jssPluginGlobal      from './jss-plugin-global'
import jssPluginKeyframes   from './jss-plugin-keyframes'
import jssPluginNested      from './jss-plugin-nested'
import jssPluginShort       from './jss-plugin-short'
import jssPluginCamelCase   from './jss-plugin-camel-case'
import jssPluginVendor      from './jss-plugin-vendor'

// cssfn:
import type {
    OptionalOrFalse,
    SingleOrArray,
    SingleOrDeepArray,
    ProductOrFactoryOrDeepArray,
    ProductOrFactory,

    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './types'       // cssfn's types
import type {
    Prop,
    PropEx,
    Cust,
}                           from './css-types'   // ts defs support for cssfn
import {
    // types:
    SimpleSelector as SimpleSelectorModel,
    Combinator,
    Selector       as SelectorModel,
    SelectorList   as SelectorModelList,
    
    
    
    // parses:
    parseSelectors,
    
    
    
    // creates & tests:
    parentSelector,
    isSimpleSelector,
    isParentSelector,
    isClassOrPseudoClassSelector,
    isPseudoElementSelector,
    isCombinatorOf,
    createSelector,
    createSelectorList,
    isNotEmptySelectors,
    
    
    
    // renders:
    selectorToString,
    selectorsToString,
    
    
    
    // transforms:
    groupSelectors,
    groupSelector,
    ungroupSelector,
    
    
    
    // measures:
    calculateSpecificity,
}                           from './css-selector'

// others libs:
import {
    Properties as CssProperties,
}                           from 'csstype'
import { pascalCase }       from 'pascal-case'   // pascal-case support for jss
import { camelCase }        from 'camel-case'    // camel-case  support for jss
import warning              from 'tiny-warning'



// general types:

export type { Classes, Styles, StyleSheet }
export type { Prop, PropEx, Cust }
export type { Dictionary, ValueOf, DictionaryOf }

export type KnownCssPropName                   = keyof CssProperties<string|number>
export type KnownCssPropValue
    <PropName extends KnownCssPropName>        = Exclude<CssProperties<string|number>[PropName], (undefined|null)>
// comment docs disappears in TypeScript:
// export type KnownCssProps                   = { [PropName in KnownCssPropName] ?: (KnownCssPropValue<PropName>|[[KnownCssPropValue<PropName>], '!important']|CssValue) }
// comment docs preserves in TypeScript:
export type KnownCssProps                      = { [PropName in keyof CssProperties<string|number>] ?: (KnownCssPropValue<PropName>|[[KnownCssPropValue<PropName>], '!important']|CssValue) }

export type BasicCssValue                      = (string & {}) | (number & {}) | PropEx.Keyframes
export type CssValue                           = undefined | null | BasicCssValue | BasicCssValue[] | (BasicCssValue|BasicCssValue[]|'!important')[]

export type CustomCssProps                     = { [PropName: Exclude<string, KnownCssPropName>] : CssValue }

export type CssProps                           = KnownCssProps & CustomCssProps
export type Rule                               = { [PropName: symbol] : StyleCollection }

export type Style                              = CssProps & Rule
export type StyleCollection                    = ProductOrFactoryOrDeepArray<OptionalOrFalse<Style>>

export type ClassName                          = string        // not a really string: [A-Z_a-z-]+
export type RealClass                          = (`.${ClassName}` & {})
export type PseudoClass                        = (`:${ClassName}` & {})
export type Class                              = RealClass|PseudoClass
export type ClassEntry
    <TClassName extends ClassName = ClassName> = readonly [TClassName, StyleCollection]
export type ClassList
    <TClassName extends ClassName = ClassName> = ClassEntry<TClassName>[]

export type OptionalString                     = OptionalOrFalse<string>

export type Selector                           = (string & {})
export type SelectorCollection                 = SingleOrDeepArray<OptionalOrFalse<Selector>>

export type RuleSource                         = ProductOrFactory<OptionalOrFalse<Rule>>
export type RuleList                           = RuleSource[]
export type RuleCollection                     = SingleOrArray<RuleSource|RuleList>



// utilities:

const fastHash = (input: string) => {
    let hash = 0, i, chr;
    for (i = 0; i < input.length; i++) {
        chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    } // for
    
    hash = Math.abs(hash);
    return hash.toString(36).slice(-5); // get the last 5 characters
};



// jss:
const createGenerateId : CreateGenerateId = (options = {}) => {
    const takenHashes = new Map<string, string>();
    
    return (rule, sheet): string => {
        const globalID = ((): string => {
            let   sheetId : string|object|null|undefined = (sheet?.options as any)?.sheetId ?? sheet?.options?.index ?? '';
            if (typeof(sheetId) !== 'string') {
                sheetId = (sheetId ? fastHash(JSON.stringify(sheetId)) : '');
                
                if (sheet) {
                    if (!sheet.options) sheet.options = ({} as any);
                    (sheet.options as any).sheetId = sheetId;
                } // if
            } // if
            
            const classId    = rule?.key || '@global';
            const compoundId = `${sheetId}${classId}`; // try to generate an unique Id _without_ a counter
            let   hash       = fastHash(compoundId);
            
            
            
            const maxCounter = 1e10;
            let   counter    = 2;
            for (; counter <= maxCounter; counter++) {
                const owner = takenHashes.get(hash);
                if (!owner || (owner === compoundId)) {
                    takenHashes.set(hash, compoundId);
                    return hash;
                } // if
                
                hash = fastHash(`${compoundId}${counter}`); // try to generate an unique Id _with_ a counter
            } // for
            
            
            
            warning(false, `[JSS] You might have a memory leak. ID counter is at ${counter}.`);
            return hash;
        })();
        
        
        
        const prefix = sheet?.options?.classNamePrefix ?? 'c';
        return `${prefix}${globalID}`;
    };
};
const customJss = createJss().setup({createGenerateId, plugins:[
    jssPluginGlobal(),    // requires to be placed before all other plugins
    jssPluginKeyframes(),
    jssPluginNested((styles) => mergeStyles(styles as StyleCollection) as {}),
    jssPluginShort(),     // requires to be placed before `camelCase`
    jssPluginCamelCase(),
    jssPluginVendor(),
]});



// styles:
let sheetCounter = 0;
export const createJssSheet = <TClassName extends ClassName = ClassName>(styles: ProductOrFactory<Styles<TClassName>>, sheetId?: string): StyleSheet<TClassName> => {
    sheetCounter++;
    
    const stylesObj = ((typeof(styles) === 'function') ? styles() : styles);
    return customJss.createStyleSheet(
        stylesObj,
        /*options:*/ ({
            index   : sheetCounter,         // 0 by default - determines DOM rendering order, higher number = higher specificity (inserted after).
            sheetId : sheetId ?? stylesObj, // custom prop - for identifier purpose
        } as {})
    );
}
export const createSheet    = <TClassName extends ClassName = ClassName>(classes: ProductOrFactory<ClassList<TClassName>>, sheetId?: string): StyleSheet<TClassName> => {
    return createJssSheet(
        () => usesCssfn(classes),
        sheetId
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
        .map(([className, styles]): Style => ({ [className || '@global'] : mergeStyles(styles) as CssValue })) // convert each `[className, styles]` to `{ className : mergeStyles(styles) | null }`
    ) ?? emptyMergedStyle) as Styles<TClassName>;
}



// processors:

const isStyle      = (object: any): object is Style => object && (typeof(object) === 'object') && !Array.isArray(object);
const mergeLiteral = (style: Style, newStyle: Style): void => {
    for (const [propName, newPropValue] of [
        ...Object.entries(newStyle),
        ...Object.getOwnPropertySymbols(newStyle).map((sym) => [sym, newStyle[sym]] as const),
    ]) { // loop through `newStyle`'s props
        
        
        
        if (!isStyle(newPropValue)) {
            // `newPropValue` is not a `Style` => unmergeable => add/overwrite `newPropValue` into `style`:
            delete style[propName]; // delete the old prop (if any), so the new prop always placed at the end of LiteralObject
            style[propName] = newPropValue as any; // add/overwrite
        }
        else {
            // `newPropValue` is a `Style` => possibility to merge with `currentPropValue`
            
            const currentPropValue = style[propName];
            if (!isStyle(currentPropValue)) {
                // `currentPropValue` is not a `Style` => unmergeable => add/overwrite `newPropValue` into `style`:
                delete style[propName]; // delete the old prop (if any), so the new prop always placed at the end of LiteralObject
                style[propName] = newPropValue as any; // add/overwrite
            }
            else {
                // both `newPropValue` & `currentPropValue` are `Style` => merge them recursively (deeply):
                
                const currentValueClone = {...currentPropValue} as Style; // clone the `currentPropValue` to avoid side effect, because the `currentPropValue` is not **the primary object** we're working on
                mergeLiteral(currentValueClone, newPropValue);
                
                // merging style prop no need to rearrange the prop position
                style[propName] = currentValueClone as any; // set the mutated `currentValueClone` back to `style`
            } // if
        } // if
    } // for
}
const mergeNested  = (style: Style): Style => {
    const groupByNested = (
        Object.getOwnPropertySymbols(style)
        .reduce((accum, sym) => {
            const nestedSelector = sym.description ?? '';
            if (
                // nested rules:
                nestedSelector.includes('&')
                ||
                // conditional rules & globals:
                ['@media', '@supports', '@document', '@global'].some((at) => nestedSelector.startsWith(at))
            ) {
                let group = accum.get(nestedSelector);
                if (!group) accum.set(nestedSelector, group = []);
                group.push(sym);
            } // if
            return accum;
    }, new Map<string, symbol[]>()));
    
    
    
    for (const group of Array.from(groupByNested.values())) {
        if (group.length <= 1) continue; // filter out groups with single/no member
        
        
        
        const mergedStyles = mergeStyles(
            group.map((sym) => style[sym])
        );
        
        
        
        style[group[group.length - 1]] = mergedStyles; // merge all member's style to the last member
        for (const sym of group.slice(0, -1)) delete style[sym]; // delete first member to second last member
    } // for
    
    
    
    return style;
}

// prevents JSS to clone the CSSFN Style (because the symbol props are not copied)
class MergedStyle {
    constructor(style?: Style) {
        if (style) Object.assign(this, style);
    }
};
const emptyMergedStyle = new MergedStyle();
Object.seal(emptyMergedStyle);

/**
 * Merges the (sub) component's composition to single `Style`.
 * @returns A `Style` represents the merged (sub) component's composition  
 * -or-  
 * `null` represents an empty `Style`.
 */
export const mergeStyles = (styles: StyleCollection): Style|null => {
    /*
        StyleCollection = ProductOrFactoryOrDeepArray<OptionalOrFalse<Style>>
        StyleCollection = ProductOrFactory<OptionalOrFalse<Style>> | ProductOrFactoryDeepArray<OptionalOrFalse<Style>>
        typeof          = ------------- not an array ------------- | ----------------- is an array ------------------
    */
    
    
    
    if (!Array.isArray(styles)) {
        // not an array => ProductOrFactory<OptionalOrFalse<Style>>
        
        const styleValue: OptionalOrFalse<Style> = (
            (typeof(styles) === 'function')
            ?
            styles() // a function => Factory<OptionalOrFalse<Style>>
            :
            styles   // a product  => OptionalOrFalse<Style>
        );
        if (!styleValue) return null; // `null` or `undefined` => return `null`
        
        
        
        const mergedStyles: Style = (new MergedStyle(styleValue) as Style);
        mergeNested(mergedStyles);
        return mergedStyles;
    } // if
    
    
    
    const mergedStyles: Style = (new MergedStyle() as Style);
    for (const subStyles of styles) { // shallow iterating array
        const subStyleValue: OptionalOrFalse<Style> = (
            Array.isArray(subStyles)
            ?
            // deep iterating array
            mergeStyles(subStyles) // an array => ProductOrFactoryDeepArray<OptionalOrFalse<Style>> => recursively `mergeStyles()`
            :
            // final element => might be a function or a product
            (
                // not an array => ProductOrFactory<OptionalOrFalse<Style>>
                
                (typeof(subStyles) === 'function')
                ?
                subStyles() // a function => Factory<OptionalOrFalse<Style>>
                :
                subStyles   // a product  => OptionalOrFalse<Style>
            )
        );
        if (!subStyleValue) continue; // `null` or `undefined` => skip
        
        
        
        // merge current style to single big style (string props + symbol props):
        mergeLiteral(mergedStyles, subStyleValue);
    } // for
    mergeNested(mergedStyles);
    
    
    
    // do not return an empty style, instead return null:
    if ((!Object.keys(mergedStyles).length) && (!Object.getOwnPropertySymbols(mergedStyles).length)) return null; // an empty object => return `null`
    
    // return non empty style:
    return mergedStyles;
}

const nthChildNModel : SimpleSelectorModel = [ ':', 'nth-child', 'n' ];
const adjustSpecificityWeight = (selectorList: SelectorModelList, minSpecificityWeight: number|null, maxSpecificityWeight: number|null): SelectorModelList => {
    // if (selector === '&') return selector; // only parent selector => no change
    if (
        (minSpecificityWeight == null)
        &&
        (maxSpecificityWeight == null)
    ) return selectorList; // nothing to adjust
    
    
    
    // convert string to parsed_object_tree:
    // const selectorList = parseSelectors(selector);
    // if (!selectorList) return selector; // parse error => no change
    
    
    
    const enum GroupCond {
        Fit,
        TooBig,
        TooSmall,
    }
    type SelectorGroup = { cond: GroupCond, selectorModel: SelectorModel, specificityWeight: number }
    const selectorGroups = selectorList.flatMap((selector) => ungroupSelector(selector)).map((selectorModel: SelectorModel): SelectorGroup => {
        const specificityWeight = calculateSpecificity(selectorModel)[1];
        
        
        
        if ((maxSpecificityWeight !== null) && (specificityWeight > maxSpecificityWeight)) {
            return {
                cond: GroupCond.TooBig,
                selectorModel,
                specificityWeight,
            };
        } // if
        
        
        
        if ((minSpecificityWeight !== null) && (specificityWeight < minSpecificityWeight)) {
            return {
                cond: GroupCond.TooSmall,
                selectorModel,
                specificityWeight,
            };
        } // if
        
        
        
        return {
            cond: GroupCond.Fit,
            selectorModel,
            specificityWeight,
        };
    });
    
    
    
    const fitSelectorModels      = selectorGroups.filter((group) => (group.cond === GroupCond.Fit     ));
    const tooBigSelectorModels   = selectorGroups.filter((group) => (group.cond === GroupCond.TooBig  ));
    const tooSmallSelectorModels = selectorGroups.filter((group) => (group.cond === GroupCond.TooSmall));
    
    
    
    type SelectorAccum = { remaining: number, reducedSelectorModel: SelectorModel }
    const adjustedSelectorList = createSelectorList(
        ...fitSelectorModels.map((group) => group.selectorModel),
        
        ...tooBigSelectorModels.flatMap((group) => {
            const reversedSelectorModel = group.selectorModel.reverse(); // reverse & mutate the current `group.selectorModel` array
            
            const { reducedSelectorModel: reversedReducedSelectorModel, remaining: remainingSpecificityWeight } : SelectorAccum = (
                reversedSelectorModel.slice(0) // clone the `reversedSelectorModel` because the `reduce()` uses `splice()` to break the iteration
                .reduce((accum, selectorEntry, index, array): SelectorAccum => {
                    if (accum.remaining <= 0) {
                        array.splice(1); // eject early by mutating iterated copy - it's okay to **mutate** the `array` because it already cloned at `slice(0)`
                        return accum;
                    } // if
                    
                    
                    
                    if (isSimpleSelector(selectorEntry)) {
                        const [
                            /*
                                selector tokens:
                                '&'  = parent         selector
                                '*'  = universal      selector
                                '['  = attribute      selector
                                ''   = element        selector
                                '#'  = ID             selector
                                '.'  = class          selector
                                ':'  = pseudo class   selector
                                '::' = pseudo element selector
                            */
                            selectorToken,
                            
                            /*
                                selector name:
                                string = the name of [element, ID, class, pseudo class, pseudo element] selector
                            */
                            selectorName,
                            
                            /*
                                selector parameter(s):
                                string       = the parameter of pseudo class selector, eg: nth-child(2n+3) => '2n+3'
                                array        = [name, operator, value, options] of attribute selector, eg: [data-msg*="you & me" i] => ['data-msg', '*=', 'you & me', 'i']
                                SelectorList = nested selector(s) of pseudo class [:is(...), :where(...), :not(...)]
                            */
                            // selectorParams,
                        ] = selectorEntry;
                        if (selectorToken === ':') {
                            switch (selectorName) {
                                case 'is':
                                case 'not':
                                case 'has':
                                    const specificityWeight = calculateSpecificity([selectorEntry])[1];
                                    accum.remaining -= specificityWeight; // reduce the counter
                                    break;
                                
                                case 'where':
                                    break; // don't reduce the counter
                                
                                default:
                                    accum.remaining--; // reduce the counter
                            } // switch
                        }
                        else if (['.', '[',].includes(selectorToken)) {
                            accum.remaining--; // reduce the counter
                        } // if
                    } // if
                    
                    
                    
                    accum.reducedSelectorModel.push(selectorEntry);
                    return accum;
                }, ({
                    remaining            : (group.specificityWeight - (maxSpecificityWeight ?? group.specificityWeight)),
                    reducedSelectorModel : [],
                } as SelectorAccum))
            );
            
            
            
            const [whereSelectorModel, ...pseudoElmSelectorModels] = groupSelector(
                reversedReducedSelectorModel.reverse(),
                { selectorName: 'where' }
            );
            whereSelectorModel.unshift(
                ...reversedSelectorModel.slice(reversedReducedSelectorModel.length).reverse(),
            );
            whereSelectorModel.push(
                ...(new Array<SimpleSelectorModel>((remainingSpecificityWeight < 0) ? -remainingSpecificityWeight : 0)).fill(
                    nthChildNModel // or use `nth-child(n)`
                ),
            );
            return createSelectorList(
                whereSelectorModel,
                ...pseudoElmSelectorModels,
            );
        }),
        
        ...tooSmallSelectorModels.map((group) => ([
            ...group.selectorModel,
            ...(new Array<SimpleSelectorModel>((minSpecificityWeight ?? 1) - group.specificityWeight)).fill(
                group.selectorModel
                .filter(isClassOrPseudoClassSelector) // only interested to class selector -or- pseudo class selector
                .filter((simpleSelector) => {         // pseudo class selector without parameters
                    const [
                        /*
                            selector tokens:
                            '&'  = parent         selector
                            '*'  = universal      selector
                            '['  = attribute      selector
                            ''   = element        selector
                            '#'  = ID             selector
                            '.'  = class          selector
                            ':'  = pseudo class   selector
                            '::' = pseudo element selector
                        */
                        // selectorToken
                        ,
                        
                        /*
                            selector name:
                            string = the name of [element, ID, class, pseudo class, pseudo element] selector
                        */
                        // selectorName
                        ,
                        
                        /*
                            selector parameter(s):
                            string       = the parameter of pseudo class selector, eg: nth-child(2n+3) => '2n+3'
                            array        = [name, operator, value, options] of attribute selector, eg: [data-msg*="you & me" i] => ['data-msg', '*=', 'you & me', 'i']
                            SelectorList = nested selector(s) of pseudo class [:is(...), :where(...), :not(...)]
                        */
                        selectorParams,
                    ] = simpleSelector;
                    
                    return (selectorParams === undefined);
                })
                .pop()         // repeats the last selector until minSpecificityWeight satisfied
                ??
                nthChildNModel // or use `nth-child(n)`
            )
        ] as SelectorModel)),
    );
    
    
    
    // // convert back the parsed_object_tree to string:
    // return selectorsToString(adjustedSelectorList);
    return adjustedSelectorList;
};

export interface NestedRuleOptions {
    groupSelectors ?: boolean
    combinator     ?: Combinator|null
    
    specificityWeight    ?: number|null
    minSpecificityWeight ?: number|null
    maxSpecificityWeight ?: number|null
}
const defaultNestedRuleOptions : Required<NestedRuleOptions> = {
    groupSelectors  : true,
    combinator      : null,
    
    specificityWeight    : null,
    minSpecificityWeight : null,
    maxSpecificityWeight : null,
};
export const nestedRule = (selectors: SelectorCollection, styles: StyleCollection, options: NestedRuleOptions = defaultNestedRuleOptions): Rule => {
    const {
        groupSelectors : doGroupSelectors = defaultNestedRuleOptions.groupSelectors,
        combinator                        = defaultNestedRuleOptions.combinator,
        
        specificityWeight,
    } = options;
    const minSpecificityWeight = specificityWeight ?? options.minSpecificityWeight ?? null;
    const maxSpecificityWeight = specificityWeight ?? options.maxSpecificityWeight ?? null;
    
    
    
    const nestedSelectors = adjustSpecificityWeight(
        flat(selectors)
        .filter((selector): selector is Selector => !!selector)
        .map((selector): Selector => {
            if (selector.startsWith('@')) return selector; // for `@media`
            if (selector.startsWith(' ')) return selector.slice(1); // for `from`, `to`, `25%`
            
            if (selector.includes('&'))   return selector; // &.foo   .boo&   .foo&.boo            
            
            return `&${selector}`;
        })
        .flatMap((selector) => {
            const selectorList = parseSelectors(selector);
            if (!selectorList) throw Error(`parse selector error: ${selector}`);
            return selectorList;
        })
        ,
        minSpecificityWeight,
        maxSpecificityWeight
        
        // .map((selector) =>
        //     adjustSpecificityWeight(
        //         selector,
        //         minSpecificityWeight,
        //         maxSpecificityWeight
        //     )
        // )
    );
    
    
    
    if (!isNotEmptySelectors(nestedSelectors)) return {}; // no nestedSelector => return empty Rule
    
    
    
    if (!doGroupSelectors || (nestedSelectors.length === 1)) {
        return Object.fromEntries(
            nestedSelectors
            .map((nestedSelector) => [
                Symbol(
                    selectorToString(nestedSelector)
                ),
                styles
            ])
        );
    } // if
    
    
    
    const enum GroupCond {
        WithCombinator,
        
        OnlyParent,
        OnlyBeginParent,
        OnlyEndParent,
        RandomParent,
    }
    type SelectorGroup = { cond: GroupCond, selectorModel: SelectorModel }
    const withCombinator  = combinator ? `&${combinator}` : null;
    const selectorsGroups = nestedSelectors.map((nestedSelector): SelectorGroup => {
        const hasFirstParent = ((): boolean => {
            if (nestedSelector.length < 1) return false;                // at least 1 entry must exist, for the first_parent
            
            const firstSelectorEntry = nestedSelector[0];               // take the first entry
            return isParentSelector(firstSelectorEntry);                // the entry must be ParentSelector
        })();
        const followedByCombi  = ((): boolean => {
            if (!combinator)               return false;                // the combinator must be defined
            if (nestedSelector.length < 2) return false;                // at least 2 entry must exist, for the first_parent followed by combinator
            
            const secondSelectorEntry = nestedSelector[1];              // take the second entry
            return isCombinatorOf(secondSelectorEntry, combinator)      // the entry must be the same as combinator
        })();
        
        const withCombi       = hasFirstParent && followedByCombi;
        if (withCombi)        return { cond: GroupCond.WithCombinator , selectorModel: nestedSelector };
        
        const onlyParent      = hasFirstParent && (nestedSelector.length === 1);
        if (onlyParent)       return { cond: GroupCond.OnlyParent     , selectorModel: nestedSelector };
        
        
        
        const hasMiddleParent = ((): boolean => {
            if (nestedSelector.length < 3) return false;                // at least 3 entry must exist, the first & last are already reserved, the middle one is the middle_parent
            
            for (let index = 1, maxIndex = (nestedSelector.length - 2); index <= maxIndex; index++) {
                const middleSelectorEntry = nestedSelector[index];      // take the 2nd_first_entry until the 2nd_last_entry
                if (isParentSelector(middleSelectorEntry)) return true; // the entry must be ParentSelector, otherwise skip to next
            } // for
            
            return false; // ran out of iterator => not found
        })();
        const hasLastParent = ((): boolean => {
            const length = nestedSelector.length;
            if (length < 2) return false;                               // at least 2 entry must exist, the first is already reserved, the last one is the last_parent
            
            const lastSelectorEntry = nestedSelector[length - 1];       // take the last entry
            return isParentSelector(lastSelectorEntry);                 // the entry must be ParentSelector
        })();
        
        const onlyBeginParent = hasFirstParent && !hasMiddleParent && !hasLastParent;
        if (onlyBeginParent)  return { cond: GroupCond.OnlyBeginParent, selectorModel: nestedSelector };
        
        const onlyEndParent   = !hasFirstParent && !hasMiddleParent && hasLastParent;
        if (onlyEndParent)    return { cond: GroupCond.OnlyEndParent  , selectorModel: nestedSelector };
        
        /* ............... */ return { cond: GroupCond.RandomParent   , selectorModel: nestedSelector };
    });
    
    
    
    const withCombiSelectors       : SelectorModelList = selectorsGroups.filter((group) => (group.cond === GroupCond.WithCombinator )).map((group) => group.selectorModel);
    const onlyParentSelectors      : SelectorModelList = selectorsGroups.filter((group) => (group.cond === GroupCond.OnlyParent     )).map((group) => group.selectorModel);
    const onlyBeginParentSelectors : SelectorModelList = selectorsGroups.filter((group) => (group.cond === GroupCond.OnlyBeginParent)).map((group) => group.selectorModel);
    const onlyEndParentSelectors   : SelectorModelList = selectorsGroups.filter((group) => (group.cond === GroupCond.OnlyEndParent  )).map((group) => group.selectorModel);
    const randomParentSelectors    : SelectorModelList = selectorsGroups.filter((group) => (group.cond === GroupCond.RandomParent   )).map((group) => group.selectorModel);
    
    
    
    const [whereSelectorModel, ...pseudoElmSelectorModels] = groupSelectors(
        onlyBeginParentSelectors,
        { selectorName: 'where' }
    );
    const grouped = createSelectorList(
        // only parent
        // &
        (onlyParentSelectors.length ? (
            onlyParentSelectors[0] // just take the first one, the rest are guaranteed to be the same
        ) : []),
        
        
        
        // parent at beginning
        // &aaa
        // &:is(aaa, bbb, ccc)
        ...groupSelectors(
            onlyBeginParentSelectors
        ),
        (onlyBeginParentSelectors.length ? (
            (onlyBeginParentSelectors.length === 1)
            ?
            onlyBeginParentSelectors[0]
            :
            `&:is(${onlyBeginParentSelectors.map((nestedSelector) => nestedSelector.slice(1)).join(',')})`
        ) : null),
        
        
        
        // parent at end
        // aaa&
        // :is(aaa, bbb, ccc)&
        (onlyEndParentSelectors.length ? (
            (onlyEndParentSelectors.length === 1)
            ?
            onlyEndParentSelectors[0]
            :
            `:is(${onlyEndParentSelectors.map((nestedSelector) => nestedSelector.slice(0, -1)).join(',')})&`
        ) : null),
        
        
        
        // parent at random
        // a&aa, bb&b, c&c&c
        (randomParentSelectors.length ? (
            randomParentSelectors.join(',')
        ) : null),
        
        
        
        // parent with combinator
        // &>aaa
        // &>:is(aaa, bbb, ccc)
        ((!!withCombinator && withCombiSelectors.length) ? (
            (withCombiSelectors.length === 1)
            ?
            withCombiSelectors[0]
            :
            `${withCombinator}:is(${withCombiSelectors.map((nestedSelector) => nestedSelector.slice(withCombinator.length)).join(',')})`
        ) : null),
    );
    
    
    
    return {
        ...((grouped.length || ungroupableSelectors.length) ? {
            [Symbol(
                [
                    // groupable selectors:
                    ...(grouped.length ? [
                        (
                            (grouped.length === 1)
                            ?
                            grouped[0]
                            :
                            `:is(${grouped.join(',')})`
                        ),
                    ] : []),
                    
                    // ungroupable selectors:
                    ...ungroupableSelectors
                ].join(',') // join groupableSelector(s), ungroupableSelector, ungroupableSelector, ...
            )] : styles
        } : {}),
    };
};



// compositions:
/**
 * Defines the (sub) component's composition.
 * @returns A `StyleCollection` represents the (sub) component's composition.
 */
export const composition     = (styles: StyleCollection[]): StyleCollection => styles;
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
export const globalDef       = (ruleCollection: RuleCollection) => compositionOf(''     , [rules(ruleCollection)]);
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
export const vars   = (items: { [key: string]: CssValue }): Style => items;



//combinators:
export interface CombinatorOptions extends NestedRuleOptions {
}
const defaultCombinatorOptions : Required<CombinatorOptions> = {
    ...defaultNestedRuleOptions,
};
export const combinators  = (combinator: Combinator, selectors: SelectorCollection, styles: StyleCollection, options: CombinatorOptions = defaultCombinatorOptions): Rule => {
    const combiSelectors : Selector[] = flat(selectors).map((selector) => {
        if (!selector) selector = '*'; // empty selector => match any element
        
        // if (selector === '&') return selector; // no children => the parent itself
        if (selector.includes('&')) return selector; // custom combinator
        
        if (((combinator === ' ') || (combinator === '>')) && selector.startsWith('::')) return `&${selector}`; // pseudo element => attach the parent itself (for descendants & children)
        
        return `&${combinator}${selector}`;
    });
    if (!combiSelectors.length) return {}; // no selector => return empty
    
    
    
    return nestedRule(combiSelectors, styles, { ...options, combinator });
};
export const descendants  = (selectors: SelectorCollection, styles: StyleCollection, options: CombinatorOptions = defaultCombinatorOptions) => combinators(' ', selectors, styles, options);
export const children     = (selectors: SelectorCollection, styles: StyleCollection, options: CombinatorOptions = defaultCombinatorOptions) => combinators('>', selectors, styles, options);
export const siblings     = (selectors: SelectorCollection, styles: StyleCollection, options: CombinatorOptions = defaultCombinatorOptions) => combinators('~', selectors, styles, options);
export const nextSiblings = (selectors: SelectorCollection, styles: StyleCollection, options: CombinatorOptions = defaultCombinatorOptions) => combinators('+', selectors, styles, options);



// rules:
export const rules = (ruleCollection: RuleCollection, options?: NestedRuleOptions): Rule[] => {
    const result = (
        (Array.isArray(ruleCollection) ? ruleCollection : [ruleCollection])
        .flatMap((ruleSourceList: RuleSource|RuleList): OptionalOrFalse<Rule>[] => { // convert: Factory<Rule>|Rule|RuleList => [Rule]|[Rule]|[...RuleList] => [Rule]
            if (typeof(ruleSourceList) === 'function') return [ruleSourceList()];
            if (Array.isArray(ruleSourceList)) return ruleSourceList.map((ruleSource) => (typeof(ruleSource) === 'function') ? ruleSource() : ruleSource);
            return [ruleSourceList];
        })
        .filter((optionalRule): optionalRule is Rule => !!optionalRule)
        // .flatMap((rule) => Object.getOwnPropertySymbols(rule).map((sym) => [sym.description ?? '', rule[sym]] as const))
        // .map(([selectors, styles]): readonly [NestedSelector[], StyleCollection] => {
        //     let nestedSelectors = flat(selectors).filter((selector): selector is Selector => !!selector).map((selector): NestedSelector => {
        //         if (selector.startsWith('@')) return (selector as NestedSelector); // for `@media`
                
        //         if (selector.includes('&')) return (selector as NestedSelector); // &.foo   .boo&   .foo&.boo
                
        //         // if (selector.startsWith('.') || selector.startsWith(':') || selector.startsWith('#') || (selector === '*')) return `&${selector}`;
                
        //         return `&${selector}`;
        //     });
        //     if (minSpecificityWeight >= 2) {
        //         nestedSelectors = nestedSelectors.map((nestedSelector: NestedSelector): NestedSelector => {
        //             if (nestedSelector === '&') return nestedSelector; // zero specificity => no change
                    
        //             // one/more specificities found => increase the specificity weight until reaches `minSpecificityWeight`
                    
                    
                    
        //             // calculate the specificity weight:
        //             // `.realClassName` or `:pseudoClassName` (without parameters):
        //             const classes               = nestedSelector.match(/(\.|:(?!(is|not)(?![\w-])))[\w-]+/gmi); // count the `.RealClass` and `:PseudoClass` but not `:is` or `:not`
        //             const specificityWeight     = classes?.length ?? 0;
        //             const missSpecificityWeight = minSpecificityWeight - specificityWeight;
                    
                    
                    
        //             // the specificity weight was meet the minimum specificity required => no change:
        //             if (missSpecificityWeight <= 0) return nestedSelector;
                    
        //             // the specificity weight is less than the minimum specificity required => increase the specificity:
        //             return `${nestedSelector}${(new Array(missSpecificityWeight)).fill(((): Selector => {
        //                 const lastClass = classes?.[classes.length - 1];
        //                 if (lastClass) {
        //                     // the last word (without parameters):
        //                     if (nestedSelector.length === (nestedSelector.lastIndexOf(lastClass) + lastClass.length)) return (lastClass as Selector); // `.RealClass` or `:PseudoClass` without parameters
        //                 } // if
                        
                        
                        
        //                 // use a **hacky class name** to increase the specificity:
        //                 return ':not(._)';
        //             })()).join('')}` as NestedSelector;
        //         });
        //     } // if
            
            
            
        //     return [nestedSelectors, styles];
        // })
        // .map(([nestedSelectors, styles]) => nestedRule(nestedSelectors, styles, options))
    );
    if (!options) return result;
    
    
    
    return (
        result
        .flatMap((rule) => Object.getOwnPropertySymbols(rule).map((sym) => [sym.description ?? '', rule[sym]] as const))
        .map(([selectors, styles]) => nestedRule(selectors, styles, options))
    );
};
// shortcut rules:
/**
 * Defines component's variants.
 * @returns A `StyleCollection` represents the component's variants.
 */
export const variants = (variants: RuleCollection, options: NestedRuleOptions = defaultNestedRuleOptions): StyleCollection => rules(variants, options);
/**
 * Defines component's states.
 * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
 * @returns A `StyleCollection` represents the component's states.
 */
export const states   = (states: RuleCollection|((inherit: boolean) => RuleCollection), inherit = false, options: NestedRuleOptions = { ...defaultNestedRuleOptions, minSpecificityWeight: 3 }): StyleCollection => {
    return rules((typeof(states) === 'function') ? states(inherit) : states, options);
}
// rule items:
/**
 * Defines component's `style(s)` that is applied when the specified `selector(s)` meet the conditions.
 * @returns A `Rule` represents the component's rule.
 */
export const rule = (selectors: SelectorCollection, styles: StyleCollection): Rule => nestedRule(selectors, styles);
// shortcut rule items:
export const atGlobal          = (ruleCollection: RuleCollection) => rule('@global'     , rules(ruleCollection));
export const fontFace          = (styles: StyleCollection) => rule('@font-face'         , styles);
export const keyframes         = (name: string, items: PropEx.Keyframes) => rule(`@keyframes ${name}`, layout(Object.fromEntries(
    Object.entries(items).map(([key, frame]) => [Symbol(key), frame])
) as Style));
export const noRule            = (styles: StyleCollection) => rule('&'                  , styles);
export const emptyRule         = ()                        => rule(null                 , null  );
export const atRoot            = (styles: StyleCollection) => rule(':root'              , styles);
export const isFirstChild      = (styles: StyleCollection) => rule(     ':first-child'  , styles);
export const isNotFirstChild   = (styles: StyleCollection) => rule(':not(:first-child)' , styles);
export const isLastChild       = (styles: StyleCollection) => rule(     ':last-child'   , styles);
export const isNotLastChild    = (styles: StyleCollection) => rule(':not(:last-child)'  , styles);
export const isNthChild        = (step: number, offset: number, styles: StyleCollection): Rule => {
    if (step === 0) { // no step
        if (offset === 0) return emptyRule(); // element indices are starting from 1 => never match => return empty style
        
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
export const isNotNthChild     = (step: number, offset: number, styles: StyleCollection): Rule => {
    if (step === 0) { // no step
        // if (offset === 0) return emptyRule(); // element indices are starting from 1 => never match => return empty style
        
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
export const isNthLastChild    = (step: number, offset: number, styles: StyleCollection): Rule => {
    if (step === 0) { // no step
        if (offset === 0) return emptyRule(); // element indices are starting from 1 => never match => return empty style
        
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
export const isNotNthLastChild = (step: number, offset: number, styles: StyleCollection): Rule => {
    if (step === 0) { // no step
        // if (offset === 0) return emptyRule(); // element indices are starting from 1 => never match => return empty style
        
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
    
    
    
    return collection.flat(Infinity);
};
export const iif = <T extends CssProps|Rule|Style>(condition: boolean, content: T): T => {
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
