// jss:
import type {
    Plugin,
    JssStyle as Style,
    
    Rule,
    StyleSheet,
}                           from 'jss'           // base technology of our cssfn components

// cssfn:
import type {
    OptionalOrFalse,
    ProductOrFactoryOrDeepArray,
}                           from './types'       // cssfn's types
import {
    // types:
    SelectorList,
    
    
    
    // parses:
    parseSelectors,
    
    
    
    // tests:
    isParentSelector,
    
    
    
    // renders:
    selectorsToString,
    
    
    
    // transforms:
    flatMapSelectors,
}                           from './css-selector'



// utilities:

const ruleGenerateId    = (rule: Rule, sheet?: StyleSheet) => (rule as any).name ?? rule.key;
const getOptions = (rule: Rule, parentRule: Rule|StyleSheet|undefined, optionsCache: any) => {
    if (optionsCache) return {...optionsCache, index: optionsCache.index + 1}; // increase the index from cache
    
    
    
    let nestingLevel = (rule.options as any)?.nestingLevel;
    nestingLevel = (nestingLevel ?? 0) + 1;
    
    const options = {
        ...rule.options,
        
        nestingLevel,
        index: ((parentRule as any)?.indexOf?.(rule) ?? 0) + 1,
        
        generateId : ruleGenerateId, // do not auto-generate id for @keyframes
    };
    delete (options as any).name;
    return options;
};
const combineSelector = (parentSelector: string, nestedSelector: string): string|null => {
    const parentSelectors : SelectorList|null = parentSelector ? parseSelectors(parentSelector) : [[]];
    if (!parentSelectors) return null; // parsing error => invalid selector
    
    const nestedSelectors : SelectorList|null = parseSelectors(nestedSelector);
    if (!nestedSelectors) return null; // parsing error => invalid selector
    
    
    
    const combinedSelectors : SelectorList = (
        parentSelectors
        .flatMap((parentSelector) =>
            flatMapSelectors(nestedSelectors, (selector) => {
                // we're only interested of ParentSelector
                if (isParentSelector(selector)) return parentSelector;
                
                // preserve the another selector types:
                return selector;
            })
        )
    );
    
    // convert back the parsed_object_tree to string:
    return selectorsToString(combinedSelectors);
};

// prevents JSS to clone the CSSFN Style
class EmptyStyle {
    constructor(style?: Style) {
        if (style) Object.assign(this, style);
    }
};
const emptyStyle : Style = new EmptyStyle();
Object.seal(emptyStyle);



export type StyleCollection = ProductOrFactoryOrDeepArray<OptionalOrFalse<Style>>
export type MergeStylesCallback = (styles: StyleCollection) => Style|null
const createOnProcessStyle = (mergeStyles: MergeStylesCallback) => (style: Style|null, rule: Rule, sheet?: StyleSheet): Style => {
    if (!style) return {};
    
    
    
    if (rule.type !== 'style') return style;
    
    
    
    const styleRule  = rule;
    const parentRule = styleRule.options.parent;
    
    
    
    let optionsCache = null;
    for (const [nestedSelector, nestedStyles] of
        Object.getOwnPropertySymbols(style).map((sym): [symbol, StyleCollection] => [sym, (style as any)[sym] as StyleCollection])
    ) {
        const nestedSelectorStr : string = nestedSelector.description ?? '';
        
        
        
        optionsCache = getOptions(styleRule, parentRule, optionsCache);
        
        
        
        if (['@media', '@supports', '@document'].some((at) => nestedSelectorStr.startsWith(at))) { // conditional rules
            const parentSelector : string = (styleRule as any).selector ?? '';
            
            /*
                from:
                .fooClass {                         // parentRule
                    fontSize: 'small'
                    @media (min-width: 1024px) {    // nested conditional
                        fontSize: 'large'           // the nestedStyles
                    }
                }
                
                to:
                .fooClass {
                    fontSize: 'small'
                }
                @media (min-width: 1024px) {        // move up the nestedSelectorStr
                    .fooClass {                     // duplicate the parentRule selector
                        fontSize: 'large'           // move the nestedStyles
                    }
                }
            */
            
            // place conditional right after the parent rule to ensure right ordering:
            
            const conditionalRule = (parentRule as any).addRule(  // move up the nestedSelectorStr
                nestedSelectorStr,
                emptyStyle as Style,
                optionsCache
            ); // causes trigger of all plugins
            
            conditionalRule.addRule(                              // duplicate the parentRule selector
                styleRule.key,
                mergeStyles(nestedStyles) ?? emptyStyle,          // move the nestedStyles
                { ...optionsCache, selector: parentSelector }
            ); // causes trigger of all plugins
        }
        else if (nestedSelectorStr.includes('&')) { // nested rules
            const parentSelector : string = (styleRule as any).selector ?? '';
            
            const selector = combineSelector(parentSelector, nestedSelectorStr);
            if (selector) {
                (parentRule as any).addRule(
                    selector,
                    mergeStyles(nestedStyles) ?? emptyStyle,
                    { ...optionsCache, selector }
                ); // causes trigger of all plugins
            } // if
        }
        else if (nestedSelectorStr[0] === '@') {
            // move `@something` to StyleSheet:
            sheet?.addRule(
                nestedSelectorStr,
                mergeStyles(nestedStyles) ?? emptyStyle,
                optionsCache
            ); // causes trigger of all plugins
        }
        else {
            (style as any)[nestedSelectorStr] = mergeStyles(nestedStyles) ?? emptyStyle;
        } // if
        
        
        
        // nested style has been processed => delete the nested:
        delete (style as any)[nestedSelector];
    } // for
    
    
    
    // return the modified style:
    return style;
};

export default function pluginNested(mergeStyles: MergeStylesCallback): Plugin { return {
    onProcessStyle: createOnProcessStyle(mergeStyles),
}}
