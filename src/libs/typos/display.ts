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
}                           from '../nodestrap'  // nodestrap core
import {
    createCssConfig,
}                           from '../css-config' // Stores & retrieves configuration using *css custom properties* (css variables)
import gens                 from './general'
import {
    default as heads,
    usesLevelingRule,
}                           from './heading'



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : 'unset',
        fontSize1         : [['calc(', 5.0, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize2         : [['calc(', 4.5, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize3         : [['calc(', 4.0, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize4         : [['calc(', 3.5, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize5         : [['calc(', 3.0, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize6         : [['calc(', 2.5, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        
        fontFamily        : heads.fontFamily        as Prop.FontFamily[]               | Cust.Ref,
        fontWeight        : 300                     as Prop.FontWeight                 | Cust.Expr,
        fontStyle         : heads.fontStyle         as Prop.FontStyle                  | Cust.Ref,
        textDecoration    : heads.textDecoration    as Prop.TextDecoration             | Cust.Ref,
        lineHeight        : heads.lineHeight        as Prop.LineHeight                 | Cust.Expr,
    
        foreg             : heads.foreg             as Prop.Color                      | Cust.Ref,
        
        marginBlockStart  : heads.marginBlockStart  as Prop.MarginBlockStart           | Cust.Expr,
        marginBlockEnd    : heads.marginBlockEnd    as Prop.MarginBlockEnd             | Cust.Expr,
        marginInlineStart : heads.marginInlineStart as Prop.MarginInlineStart          | Cust.Expr,
        marginInlineEnd   : heads.marginInlineEnd   as Prop.MarginInlineEnd            | Cust.Expr,

        subOpacity        : heads.subOpacity        as Prop.Opacity                    | Cust.Expr,
    };
}, { prefix: 'd' });
export default cssProps;



// create a new styleSheet & attach:
createNodestrapStyle(() => [
    global([
        usesLevelingRule(cssProps, cssDecls, ['.display-']),
    ]),
])
.attach();