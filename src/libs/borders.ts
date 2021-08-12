// nodestrap (modular web components):
import type {
    Prop,
    Cust,
}                           from './css-types'  // ts defs support for jss
import type {
    // general types:
    Style,
}                           from './nodestrap'  // nodestrap core
import createCssConfig      from './css-config' // Stores & retrieves configuration using *css custom properties* (css variables)
import * as radius          from './borders-radiuses'
import colors               from './colors'     // configurable colors & theming defs



const radiuses = radius.radiuses;
export { radiuses, radius };



// general types:
type BorderWidth = Prop.BorderWidth | Cust.Expr
type BorderColor = Prop.BorderColor | Cust.Expr
type BorderStyle = Prop.BorderStyle | Cust.Expr
type Border      = Prop.Border      | Cust.Expr



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const widths = {
        none  : '0px' as BorderWidth,
        hair  : '1px' as BorderWidth,
        thin  : '2px' as BorderWidth,
        bold  : '4px' as BorderWidth,
    };
    
    const styles = {
        color : colors.darkThin ?? 'currentColor' as BorderColor,
        style : 'solid'                           as BorderStyle,
    };
    
    const defaults = {
        defaultWidth : widths.hair                                 as BorderWidth,
        default      : [[styles.style, widths.hair, styles.color]] as Border,
    };
    
    return {
        ...widths,
        ...styles,
        ...defaults,
    };
}, { prefix: 'bd' });
export { cssProps as borders, cssProps as default }
const borders = cssProps;



// export our mixins:
// property of .default, .style, .defaultWidth, & .color "might" has deleted by user => use nullish op for safety => .?
const defaultStyle     : BorderStyle = (cssVals?.default as [[BorderStyle, BorderWidth, BorderColor]])?.[0]?.[0] ?? borders?.style        ?? 'solid'
const defaultWidth     : BorderWidth = (cssVals?.default as [[BorderStyle, BorderWidth, BorderColor]])?.[0]?.[1] ?? borders?.defaultWidth ?? borders?.hair ?? '1px'
const defaultColor     : BorderColor = (cssVals?.default as [[BorderStyle, BorderWidth, BorderColor]])?.[0]?.[2] ?? borders?.color        ?? 'currentcolor'
export const all       = (width: BorderWidth = defaultWidth): Style => {
    return {
        border         : (((width === defaultWidth) ? borders?.default : undefined) ?? [[defaultStyle, width, defaultColor]]) as Border,
    };
};
export const top       = (width: BorderWidth = defaultWidth): Style => ({ borderTop    : all(width).border as Prop.BorderTop,    })
export const bottom    = (width: BorderWidth = defaultWidth): Style => ({ borderBottom : all(width).border as Prop.BorderBottom, })
export const left      = (width: BorderWidth = defaultWidth): Style => ({ borderLeft   : all(width).border as Prop.BorderLeft,   })
export const right     = (width: BorderWidth = defaultWidth): Style => ({ borderRight  : all(width).border as Prop.BorderRight,  })

export const notTop    = (width: BorderWidth = defaultWidth): Style => ((border: Border) => ({                                      borderBottom: border as Prop.BorderBottom, borderLeft: border as Prop.BorderLeft, borderRight: border as Prop.BorderRight, }))(all(width).border as Border)
export const notBottom = (width: BorderWidth = defaultWidth): Style => ((border: Border) => ({ borderTop: border as Prop.BorderTop,                                            borderLeft: border as Prop.BorderLeft, borderRight: border as Prop.BorderRight, }))(all(width).border as Border)
export const notLeft   = (width: BorderWidth = defaultWidth): Style => ((border: Border) => ({ borderTop: border as Prop.BorderTop, borderBottom: border as Prop.BorderBottom,                                        borderRight: border as Prop.BorderRight, }))(all(width).border as Border)
export const notRight  = (width: BorderWidth = defaultWidth): Style => ((border: Border) => ({ borderTop: border as Prop.BorderTop, borderBottom: border as Prop.BorderBottom, borderLeft: border as Prop.BorderLeft,                                          }))(all(width).border as Border)
