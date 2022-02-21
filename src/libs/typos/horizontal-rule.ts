// cssfn:
import type {
    Prop,
    Cust,
}                           from '../css-types'   // ts defs support for cssfn
import {
    // styles:
    createSheet,
    
    
    
    // compositions:
    globalDef,
    
    
    
    // rules:
    rule,
}                           from '../cssfn'       // cssfn core
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
}                           from '../css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import borders              from '../borders'     // configurable borders & border radiuses defs
import spacers              from '../spacers'     // configurable spaces defs



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        foreg             : 'inherit'       as Prop.Color             | Cust.Ref,
        opacity           : 0.25            as Prop.Opacity           | Cust.Ref,
        
        marginBlockStart  : spacers.default as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : spacers.default as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0               as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0               as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, { prefix: 'hr' });
export default cssProps;



// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        rule('hr', {
            // layouts:
            display               : 'block',
            
            
            
            // borders:
            border                : 0,
            borderBlockStart      : borders.default,
            borderBlockStartColor : 'currentcolor',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps),
        }),
    ]),
])
.attach();
