// jss   (builds css  using javascript):
import {
    Plugin,

    Rule,
    RuleList,
    StyleSheet,
}                           from 'jss'           // base technology of our nodestrap components
import type {
    Style,
}                           from './jss-plugin-extend'



const ruleGenerateId = (rule: Rule, sheet?: StyleSheet) => (rule as any).name ?? rule.key;

class GlobalStyleRule {
    // BaseRule:
    type        : string  = 'style' // for satisfying `jss-plugin-nested`
    key         : string
    isProcessed : boolean = false   // required to avoid double processed
    options     : any
    renderable? : Object|null|void

    // ContainerRule:
    at          = '@global'
    rules       : RuleList

    // StyleRule:
    style       : Style
    selector    : string  = ''      // for satisfying `jss-plugin-nested`

    
    
    constructor(key: string, style: Style, options: any) {
        this.key     = key;
        this.options = options;



        this.rules = new RuleList({
            ...options,
            parent: this,
        });



        this.style = style; // the `style` needs to be attached to `GlobalStyleRule` for satisfying `onProcessStyle()`
        const plugins : any = options?.jss?.plugins;
        const onProcessStyle : ((style: Style, rule: Rule, sheet?: StyleSheet) => void) | undefined | null = plugins?.onProcessStyle;
        onProcessStyle?.call(plugins, this.style, this as Rule, options?.sheet as (StyleSheet|undefined));


        
        for (const [propName, propValue] of Object.entries(style)) {
            // exceptions:
            if (propName.includes('&')) continue; // do not process nested rule
            if (propName === 'extend')  continue; // do not process `extend` prop
            
            
            
            // because we're in `@global`, all prop names (with some exceptions above) will be recognized as selector expressions
            const selectors = propName;
            this.rules.add(selectors, propValue, {
                ...options,
                generateId : ruleGenerateId,

                selector   : selectors,
            });
        } // for

        
        
        // let's another plugins take care:
        this.rules.process();
    }

    
    
    /**
     * Generates a CSS string.
     */
    toString(options?: any) {
        return this.rules.toString(options);
    }
}



export default function pluginGlobal(): Plugin { return {
    onCreateRule(key: string, style: Style, options: any): Rule|any {
        switch (key) {
            case '':
            case '@global':
                return new GlobalStyleRule(key, style, options);
            
            default:
                return null;
        } // switch
    },
}}