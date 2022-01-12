// jss:
import type {
    Plugin,
    JssStyle as Style,
    
    Rule,
    StyleSheet,
}                           from 'jss'           // base technology of our cssfn components

// cssfn:
import type {
    ValueOf,
}                           from './types'       // cssfn's types
import {
    SelectorList,
    parseSelectors,
    flatMapSelectors,
    selectorsToString,
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
                const [
                    /*
                        selector types:
                        '&'  = parent         selector
                        '*'  = universal      selector
                        '['  = attribute      selector
                        ''   = element        selector
                        '#'  = ID             selector
                        '.'  = class          selector
                        ':'  = pseudo class   selector
                        '::' = pseudo element selector
                    */
                    selectorType,
                    
                    /*
                        selector name:
                        string = the name of [element, ID, class, pseudo class, pseudo element] selector
                    */
                    // selectorName,
                    
                    /*
                        selector parameter(s):
                        string       = the parameter of pseudo class selector, eg: nth-child(2n+3) => '2n+3'
                        array        = [name, operator, value, options] of attribute selector, eg: [data-msg*="you & me" i] => ['data-msg', '*=', 'you & me', 'i']
                        SelectorList = nested selector(s) of pseudo class [:is(...), :where(...), :not(...)]
                    */
                    // selectorParams,
                ] = selector;
                
                
                
                // we're only interested of selector type '&'
                
                // replace selector type of `&` with `parentSelector`:
                if (selectorType === '&') return parentSelector;
                
                // preserve the another selector types:
                return selector;
            })
        )
    );
    
    // convert back the parsed_object_tree to string:
    return selectorsToString(combinedSelectors);
};



const onProcessStyle = (style: Style|null, rule: Rule, sheet?: StyleSheet): Style => {
    if (!style) return {};
    
    
    
    if (rule.type !== 'style') return style;
    
    
    
    const styleRule  = rule;
    const parentRule = styleRule.options.parent;
    
    
    
    let optionsCache = null;
    for (const [nestedSelector, nestedStyle] of
        Object.getOwnPropertySymbols(style).map((sym): [symbol, ValueOf<typeof style>] => [sym, (style as any)[sym] as any])
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
                        fontSize: 'large'           // the nestedStyle
                    }
                }
                
                to:
                .fooClass {
                    fontSize: 'small'
                }
                @media (min-width: 1024px) {        // move up the nestedSelectorStr
                    .fooClass {                     // duplicate the parentRule selector
                        fontSize: 'large'           // move the nestedStyle
                    }
                }
            */
            
            // place conditional right after the parent rule to ensure right ordering:
            
            const conditionalRule = (parentRule as any).addRule(  // move up the nestedSelectorStr
                nestedSelectorStr,
                { /* empty style */ } as Style,
                optionsCache
            ); // causes trigger of all plugins
            
            conditionalRule.addRule(                              // duplicate the parentRule selector
                styleRule.key,
                (nestedStyle as Style),                                     // move the nestedStyle
                { ...optionsCache, selector: parentSelector }
            ); // causes trigger of all plugins
        }
        else if (nestedSelectorStr.includes('&')) { // nested rules
            const parentSelector : string = (styleRule as any).selector ?? '';
            
            const selector = combineSelector(parentSelector, nestedSelectorStr);
            if (selector) {
                (parentRule as any).addRule(
                    selector,
                    (nestedStyle as Style),
                    { ...optionsCache, selector }
                ); // causes trigger of all plugins
            } // if
        }
        else if (nestedSelectorStr[0] === '@') {
            // move `@something` to StyleSheet:
            sheet?.addRule(
                nestedSelectorStr,
                (nestedStyle as Style),
                optionsCache
            ); // causes trigger of all plugins
        }
        else {
            (style as any)[nestedSelectorStr] = (nestedStyle as Style);
        } // if
        
        
        
        // nested style has been processed => delete the nested:
        delete (style as any)[nestedSelector];
    } // for
    
    
    
    // return the modified style:
    return style;
};

export default function pluginNested(): Plugin { return {
    onProcessStyle,
}}
