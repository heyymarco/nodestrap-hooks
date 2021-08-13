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
}                           from '../cssfn'      // cssfn core
import {
    createCssConfig,


    // utilities:
    usesGeneralProps,
}                           from '../css-config' // Stores & retrieves configuration using *css custom properties* (css variables)
import borders              from '../borders'    // configurable borders & border radiuses defs
import spacers              from '../spacers'    // configurable spaces defs



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        foreg             : 'inherit'       as Prop.Color             | Cust.Ref,
        opacity           : 0.25            as Prop.Opacity           | Cust.Ref,

        width             : borders.hair    as Prop.Width             | Cust.Ref,
        
        marginBlockStart  : spacers.default as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : spacers.default as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0               as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0               as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, { prefix: 'hr' });
export default cssProps;



// create a new styleSheet & attach:
createNodestrapStyle(() => [
    global([
        rule(['hr'], [
            layout({
                // layouts:
                display         : 'block',



                // sizes:
                blockSize       : cssProps.width,



                // borders:
                border          : 0,


                
                // backgrounds:
                backgroundColor : 'currentColor',



                // customize:
                ...usesGeneralProps(cssProps),

                // delete unnecessary props:
                width : undefined as unknown as null, // delete from cssProps. width means blockSize (the height of the <hr>)
            }),
        ]),
    ]),
])
.attach();
