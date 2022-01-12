// jss:
import {
    Plugin,
    JssStyle as Style,
    
    Rule,
    RuleList,
}                           from 'jss'           // base technology of our cssfn components



class KeyframesStyleRule {
    // unrecognized syntax on lower version of javascript
    // // BaseRule:
    // type        : string  = 'style' // for satisfying `jss-plugin-nested`
    // key         : string
    // isProcessed : boolean = false   // required to avoid double processed
    // options     : any
    // renderable? : Object|null|void
    
    // unrecognized syntax on lower version of javascript
    // // ContainerRule:
    // at          = '@keyframes'
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
        (this as any).at    = '@keyframes';
        
        // StyleRule:
        (this as any).style    = style; // the `style` needs to be attached to `KeyframesStyleRule` for satisfying `onProcessStyle()`
        (this as any).selector = '';    // for satisfying `jss-plugin-nested`
    }
    
    
    
    /**
     * Generates a CSS string.
     */
    toString(options : any = {}) {
        if (!(this as any).rules) {
            const rules = new RuleList((this as any).options);
            for (const [key, frame] of Object.entries((this as any).style)) {
                const frameRule = rules.add(key, (frame as Style));
                (frameRule as any).selector = key;
            } // for
            (this as any).rules = rules;
            
            rules.process(); // plugin-nested was already performed but another plugin such as plugin-camel-case might not been performed => re-run the plugins
        } // if
        
        
        
        return `${(this as any).key} {${
            ((this as any).rules as RuleList).toString(options)
        }}`
    }
}



const onCreateRule = (key: string, style: Style|null, options: any): (Rule|any) => {
    if (key.startsWith('@keyframes ')) {
        return new KeyframesStyleRule(key, style ?? {}, options);
    } // if
    
    
    
    return null;
};

export default function pluginKeyframes(): Plugin { return {
    onCreateRule,
}}
