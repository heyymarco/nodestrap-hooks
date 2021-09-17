// cssfn:
import type {
    Prop,
    Cust,
}                           from '../css-types'  // ts defs support for jss
import {
    // styles:
    createSheet,


    // compositions:
    global,


    // layouts:
    layout,


    // rules:
    variants,
    rule,
    isFirstChild,
    isLastChild,
}                           from '../cssfn'      // cssfn core
import {
    createCssConfig,


    // utilities:
    usesGeneralProps,
}                           from '../css-config' // Stores & retrieves configuration using *css custom properties* (css variables)
import gens                 from './general'



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : gens.fontSizeMd as Prop.FontSize          | Cust.Expr,
        fontFamily        : 'inherit'       as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : 'inherit'       as Prop.FontWeight        | Cust.Expr,
        fontStyle         : 'inherit'       as Prop.FontStyle         | Cust.Ref,
        textDecoration    : 'inherit'       as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : 'inherit'       as Prop.LineHeight        | Cust.Expr,
    
        foreg             : 'inherit'       as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : '1em'           as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : '1em'           as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0               as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0               as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, { prefix: 'bq' });
export default cssProps;



// create a new styleSheet & attach:
createSheet(() => [
    global([
        rule(['blockquote', '.blockquote'], [
            layout({
                // layouts:
                display : 'block',



                // customize:
                ...usesGeneralProps(cssProps),
            }),
            variants([
                isFirstChild([
                    layout({
                        // spacings:
                        marginBlockStart : 0, // kill the first marginBlockStart for the first element
                    }),
                ]),
                isLastChild([
                    layout({
                        // spacings:
                        marginBlockEnd   : 0, // kill the last marginBlockEnd for the last element
                    }),
                ]),
            ]),
        ]),
    ]),
])
.attach();
