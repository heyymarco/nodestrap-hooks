// jss:
import {
    Plugin,
    JssStyle as Style,
    
    Rule,
    RuleList,
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
    
    
    
    // creates & tests:
    isParentSelector,
    createSelector,
    createSelectorList,
    
    
    
    // renders:
    selectorsToString,
    
    
    
    // transforms:
    flatMapSelectors,
}                           from './css-selector'



// utilities:

const isConditionalRule = (selector: string) => (['@media', '@supports', '@document'].some((at) => selector.startsWith(at)));
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
    const parentSelectors : SelectorList|null = (
        parentSelector
        ?
        parseSelectors(parentSelector)
        :
        createSelectorList(
            createSelector(...[]) // empty parent selector
        )
    );
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



class ConditionalStyleRule {
    // unrecognized syntax on lower version of javascript
    // // BaseRule:
    // type        : string  = 'style' // for satisfying `jss-plugin-nested`
    // key         : string
    // isProcessed : boolean = false   // required to avoid double processed
    // options     : any
    // renderable? : Object|null|void
    
    // unrecognized syntax on lower version of javascript
    // // ContainerRule:
    // at          = 'sheet'
    // rules       : RuleList
    
    // unrecognized syntax on lower version of javascript
    // // StyleRule:
    // style       : Style
    // selector    : string  = ''      // for satisfying `jss-plugin-nested`
    
    
    
    constructor(key: string, style: Style, options: any) {
        // BaseRule:
        (this as any).type        = 'style'; // for satisfying `jss-plugin-nested`
        (this as any).key         = key;
        (this as any).isProcessed = false;   // required to avoid double processed
        (this as any).options     = {
            ...options,
            parent: this, // places the nested style on here
        };
        (this as any).renderable  = null;
        
        // ContainerRule:
        (this as any).at    = 'sheet';
        (this as any).rules = new RuleList((this as any).options);
        
        // StyleRule:
        (this as any).style    = style; // the `style` needs to be attached to `ConditionalStyleRule` for satisfying `onProcessStyle()`
        (this as any).selector = '';    // for satisfying `jss-plugin-nested`
    }
    
    
    
    indexOf(rule: Rule) {
        return (this as any).rules.indexOf(rule);
    }
    getRule(name: string): Rule|null {
        return (this as any).rules.get(name);
    }
    addRule(name: string, style: Style, options: any) {
        const rule = (this as any).rules.add(name, style, options);
        if (!rule) return null;
        
        (this as any).options.jss.plugins.onProcessRule(rule);
        return rule;
    }
    
    
    
    /**
     * Generates a CSS string.
     */
    toString(options : any = {}) {
        /*
            ignore (this as any).style
            
            because a conditional rule ('@media', '@supports', '@document') is a top level rule,
            it should not have a `propName: propValue` directly,
            instead it should have a/some nested rule(s)
            
            @media (...) {
                color: 'red'    // never happen => ignore style
                
                :root   { ... } // a nested rule from @global parent
                .parent { ... } // a nested rule from .parent parent
            }
        */
        // if (!(this as any).rules) {
        //     const rules = new RuleList((this as any).options);
        //     for (const [key, frame] of Object.entries((this as any).style)) {
        //         const frameRule = rules.add(key, (frame as Style));
        //         (frameRule as any).selector = key;
        //     } // for
        //     (this as any).rules = rules;
            
        //     rules.process(); // plugin-nested was already performed but another plugin such as plugin-camel-case might not been performed => re-run the plugins
        // } // if
        
        
        
        return `${(this as any).key} {\n${
            ((this as any).rules as RuleList).toString(options)
        }\n}`
    }
}



const onCreateRule = (key: string, style: Style|null, options: any): (Rule|any) => {
    if (isConditionalRule(key)) {
        return new ConditionalStyleRule(key, style ?? {}, options);
    } // if
    
    
    
    return null;
};



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
        
        
        
        if (isConditionalRule(nestedSelectorStr)) {
            const parentSelector : string = (styleRule as any).selector ?? '';
            
            /*
                for non-@global parent:
                
                from:
                .parent {                                // parentRule
                    .awesome { fontSize: 'small' }
                    @media (min-width: 1024px) {         // nested conditional
                        .awesome { fontSize: 'large' }   // the nestedStyles
                    }
                }
                
                to:
                .parent {
                    .awesome { fontSize: 'small' }
                }
                @media (min-width: 1024px) {             // move up the nestedSelectorStr
                    .parent {                            // duplicate the parentRule selector
                        .awesome { fontSize: 'large' }   // move the nestedStyles
                    }
                }
                
                
                
                for @global parent:
                
                from:
                @global {                                // parentRule
                    .awesome { fontSize: 'small' }
                    @media (min-width: 1024px) {         // nested conditional
                        .awesome { fontSize: 'large' }   // the nestedStyles
                    }
                }
                
                to:
                @global {
                    .awesome { fontSize: 'small' }
                }
                @media (min-width: 1024px) {             // move up the nestedSelectorStr
                    .awesome { fontSize: 'large' }       // keep the nestedStyles
                }
            */
            
            
            
            const parentKey = styleRule.key ?? '';
            const isGlobalParent = ((parentKey === '') || (parentKey === '@global') || parentKey.startsWith('@global-') || parentKey.startsWith('@global_'));
            
            
            
            const conditionalRule = (parentRule as any).addRule(  // move up the nestedSelectorStr
                nestedSelectorStr,
                isGlobalParent ? (mergeStyles(nestedStyles) ?? emptyStyle) : (emptyStyle as Style),
                optionsCache
            ); // causes trigger of all plugins
            
            if (!isGlobalParent) {
                // place conditional right after the parent rule to ensure right ordering:
                conditionalRule.addRule(                              // duplicate the parentRule selector
                    parentKey,
                    mergeStyles(nestedStyles) ?? emptyStyle,          // move the nestedStyles
                    { ...optionsCache, selector: parentSelector }
                ); // causes trigger of all plugins
            } // if
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
    onCreateRule,
    onProcessStyle: createOnProcessStyle(mergeStyles),
}}
