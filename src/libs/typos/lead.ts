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
import gens                 from './general'
import pars                 from './paragraph'



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : gens.fontSizeMd        as Prop.FontSize          | Cust.Expr,
        fontFamily        : pars.fontFamily        as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : gens.fontWeightLight   as Prop.FontWeight        | Cust.Expr,
        fontStyle         : pars.fontStyle         as Prop.FontStyle         | Cust.Ref,
        textDecoration    : pars.textDecoration    as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : pars.lineHeight        as Prop.LineHeight        | Cust.Expr,
    
        foreg             : pars.foreg             as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : pars.marginBlockStart  as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : pars.marginBlockEnd    as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : pars.marginInlineStart as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : pars.marginInlineEnd   as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, { prefix: 'lead' });
export default cssProps;



// create a new styleSheet & attach:
createNodestrapStyle(() => [
    global([
        rule('.lead', [
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
