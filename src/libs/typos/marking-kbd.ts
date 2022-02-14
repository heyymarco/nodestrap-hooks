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

// nodestrap components:
import marks                from './marking-mark'
import codes                from './marking-code'



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : codes.fontSize       as Prop.FontSize       | Cust.Expr,
        fontFamily        : codes.fontFamily     as Prop.FontFamily[]   | Cust.Ref,
        fontWeight        : codes.fontWeight     as Prop.FontWeight     | Cust.Expr,
        fontStyle         : codes.fontStyle      as Prop.FontStyle      | Cust.Ref,
        textDecoration    : codes.textDecoration as Prop.TextDecoration | Cust.Ref,
        lineHeight        : codes.lineHeight     as Prop.LineHeight     | Cust.Expr,
        overflowWrap      : codes.overflowWrap   as Prop.OverflowWrap   | Cust.Expr,
        
        foreg             : colors.white         as Prop.Color          | Cust.Ref,
        backg             : colors.grayDark      as Prop.Background     | Cust.Ref,
        
        //#region borders
        border            : marks.border         as Prop.Border         | Cust.Expr,
        borderRadius      : marks.borderRadius   as Prop.BorderRadius   | Cust.Expr,
        //#endregion borders
        
        //#region spacings
        paddingInline     : '0.4em'              as Prop.PaddingInline  | Cust.Expr,
        paddingBlock      : '0.2em'              as Prop.PaddingBlock   | Cust.Expr,
        //#endregion spacings
    };
}, { prefix: 'kbd' });
export default cssProps;



// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        rule(['kbd', '.kbd'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps),
        }),
    ]),
])
.attach();
