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
import colors               from '../colors'      // configurable colors & theming defs
import
    borders,
    * as border             from '../borders'     // configurable borders & border radiuses defs



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : 'inherit'            as Prop.FontSize       | Cust.Expr,
        fontFamily        : 'inherit'            as Prop.FontFamily[]   | Cust.Ref,
        fontWeight        : 'inherit'            as Prop.FontWeight     | Cust.Expr,
        fontStyle         : 'inherit'            as Prop.FontStyle      | Cust.Ref,
        textDecoration    : 'inherit'            as Prop.TextDecoration | Cust.Ref,
        lineHeight        : 'inherit'            as Prop.LineHeight     | Cust.Expr,
        overflowWrap      : 'inherit'            as Prop.OverflowWrap   | Cust.Expr,
        
        foreg             : 'inherit'            as Prop.Color          | Cust.Ref,
        backg             : colors.warningThin   as Prop.Background     | Cust.Ref,
        
        //#region borders
        border            : borders.default      as Prop.Border         | Cust.Expr,
        borderRadius      : border.radiuses.sm   as Prop.BorderRadius   | Cust.Expr,
        //#endregion borders
        
        //#region spacings
        paddingInline     : '0.2em'              as Prop.PaddingInline  | Cust.Expr,
        paddingBlock      : '0em'                as Prop.PaddingBlock   | Cust.Expr,
        //#endregion spacings
    };
}, { prefix: 'mrk' });
export default cssProps;



// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        rule(['mark', '.mark'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps),
        }),
    ]),
])
.attach();
