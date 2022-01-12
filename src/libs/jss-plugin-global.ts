// jss:
import {
    Plugin,
    JssStyle as Style,
    
    Rule,
}                           from 'jss'           // base technology of our cssfn components



class GlobalStyleRule {
    // unrecognized syntax on lower version of javascript
    // // BaseRule:
    // type        : string  = 'style' // for satisfying `jss-plugin-nested`
    // key         : string
    // isProcessed : boolean = false   // required to avoid double processed
    // options     : any
    // renderable? : Object|null|void
    
    // unrecognized syntax on lower version of javascript
    // // ContainerRule:
    // at          = '@global'
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
            parent: options?.sheet, // places the nested style on the styleSheet
        };
        (this as any).renderable  = null;
        
        // ContainerRule:
        (this as any).at    = '@global';
        
        // StyleRule:
        (this as any).style    = style; // the `style` needs to be attached to `GlobalStyleRule` for satisfying `onProcessStyle()`
        (this as any).selector = '';    // for satisfying `jss-plugin-nested`
    }
    
    
    
    /**
     * Generates a CSS string.
     */
    toString(options?: any) {
        return ''; // the nested style was placed to styleSheet, so there is nothing to render
    }
}



const onCreateRule = (key: string, style: Style|null, options: any): (Rule|any) => {
    if ((key === '') || (key === '@global') || key.startsWith('@global-') || key.startsWith('@global_')) {
        return new GlobalStyleRule(key, style ?? {}, options);
    } // if
    
    
    
    return null;
};

export default function pluginGlobal(): Plugin { return {
    onCreateRule,
}}
