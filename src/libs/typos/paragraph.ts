// nodestrap (modular web components):
import type {
    Prop,
    Cust,
}                           from '../css-types'  // ts defs support for jss
import {
    // styles:
    createNodestrapStyle,


    // compositions:
    global,


    // layouts:
    layout,


    // rules:
    rule,
}                           from '../nodestrap'  // nodestrap core
import {
    createCssConfig,


    // utilities:
    usesGeneralProps,
}                           from '../css-config' // Stores & retrieves configuration using *css custom properties* (css variables)



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
createNodestrapStyle(() => [
    global([
        rule(['p', '.p'], [
            layout({
                // layouts:
                display : 'block',



                // spacings:
                '&:first-child': {
                    marginBlockStart : 0, // kill the first marginStart for the first element
                },
                '&:last-child': {
                    marginBlockEnd   : 0, // kill the last marginEnd for the last element
                },



                // customize:
                ...usesGeneralProps(cssProps),
            }),
        ]),
    ]),
])
.attach();
