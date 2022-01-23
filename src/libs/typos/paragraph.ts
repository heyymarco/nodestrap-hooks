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
    isFirstChild,
    isLastChild,
}                           from '../cssfn'       // cssfn core
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
}                           from '../css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : 'inherit' as Prop.FontSize          | Cust.Expr,
        fontFamily        : 'inherit' as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : 'inherit' as Prop.FontWeight        | Cust.Expr,
        fontStyle         : 'inherit' as Prop.FontStyle         | Cust.Ref,
        textDecoration    : 'inherit' as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : 'inherit' as Prop.LineHeight        | Cust.Expr,
        
        foreg             : 'inherit' as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : '1em'     as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : '1em'     as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0         as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0         as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, { prefix: 'p' });
export default cssProps;



// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        rule(['p', '.p'], {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...isFirstChild({
                marginBlockStart : 0, // kill the first marginBlockStart for the first element
            }),
            ...isLastChild({
                marginBlockEnd   : 0, // kill the last marginBlockEnd for the last element
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps),
        }),
    ]),
])
.attach();
