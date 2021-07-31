// jss   (builds css  using javascript):
import type {
    Plugin,
    JssStyle,

    Rule,
}                           from 'jss'           // base technology of our nodestrap components



class GlobalStyleRule {
    // BaseRule:
    type        : string  = 'style' // for satisfying the jss-plugin-nested
    key         : string
    isProcessed : boolean = false   // required to avoid double processed
    options     : any
    renderable? : Object|null|void

    style       : JssStyle
    selector    : string  = ''      // for satisfying the jss-plugin-nested

    
    
    constructor (key: string, style: JssStyle, options: any) {
        this.key     = key;
        this.style   = style;
        this.options = options;

        options?.jss?.plugins?.onProcessRule(this); // let's `jss-plugin-extend` & `jss-plugin-nested` take care
    }

    
    
    /**
     * Generates a CSS string.
     */
    toString() {
        return ''
    }
}



export default function pluginGlobal(): Plugin { return {
    onCreateRule(key: string, style: JssStyle, options: any): Rule|any {
        switch (key) {
            case '':
            case '@global':
                return new GlobalStyleRule(key, style, options);
            
            default:
                return null;
        } // switch
    },
}}