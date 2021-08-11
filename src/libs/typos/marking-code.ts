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
import colors               from '../colors'     // configurable colors & theming defs



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : [[
            'calc((', gens.fontSizeSm, '+', gens.fontSizeMd, ')/2)'
        ]]                                           as Prop.FontSize       | Cust.Expr,
        fontFamily        : gens.fontFamilyMonospace as Prop.FontFamily[]   | Cust.Ref,
        fontWeight        : gens.fontWeightNormal    as Prop.FontWeight     | Cust.Expr,
        fontStyle         : 'none'                   as Prop.FontStyle      | Cust.Ref,
        textDecoration    : 'none'                   as Prop.TextDecoration | Cust.Ref,
        lineHeight        : 'inherit'                as Prop.LineHeight     | Cust.Expr,
    
        foreg             : colors.pink              as Prop.Color          | Cust.Ref,
        backg             : 'none'                   as Prop.Background     | Cust.Ref,
        
        //#region borders
        border            : 'none'                   as Prop.Border         | Cust.Expr,
        borderRadius      : 0                        as Prop.BorderRadius   | Cust.Expr,
        //#endregion borders

        //#region spacings
        paddingInline     : 0                        as Prop.PaddingInline  | Cust.Expr,
        paddingBlock      : 0                        as Prop.PaddingBlock   | Cust.Expr,
        //#endregion spacings
    };
}, { prefix: 'code' });
export default cssProps;



// create a new styleSheet & attach:
createNodestrapStyle(() => [
    global([
        rule(['code', '.code', 'var', '.var', 'samp', '.samp'], [
            layout({
                // layouts:
                display : 'inline',



                // customize:
                ...usesGeneralProps(cssProps),
            }),
        ]),
    ]),
])
.attach();
