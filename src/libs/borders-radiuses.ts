// nodestrap (modular web components):
import type {
    Prop,
    Cust,
}                           from './css-types'  // ts defs support for jss
import type {
    // general types:
    Style,
}                           from './cssfn'      // cssfn core
import createCssConfig      from './css-config' // Stores & retrieves configuration using *css custom properties* (css variables)



// general types:
type BorderRadius = Prop.BorderRadius | Cust.Expr



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        none    : '0px'     as BorderRadius,
        sm      : '0.2rem'  as BorderRadius,
        md      : '0.25rem' as BorderRadius,
        lg      : '0.3rem'  as BorderRadius,
        pill    : '50rem'   as BorderRadius,
        circle  : '50%'     as BorderRadius,
    };
    
    const defaults = {
        default : basics.md as BorderRadius,
    };
    
    return {
        ...basics,
        ...defaults,
    };
}, { prefix: 'bd-rd' });
export { cssProps as radiuses, cssProps as default }
const radiuses = cssProps;



// export our mixins:
const defaultRadius      : BorderRadius = radiuses?.default ?? radiuses?.md ?? '0.25rem';
export const all         = (radius: BorderRadius = defaultRadius): Style => {
    return {
        borderRadius     : (((radius === defaultRadius) ? radiuses?.default : undefined) ?? radius) as BorderRadius,
    };
};
export const topStart    = (radius: BorderRadius = defaultRadius): Style => ({ borderTopLeftRadius     : all(radius).borderRadius as Prop.BorderTopLeftRadius,     })
export const topEnd      = (radius: BorderRadius = defaultRadius): Style => ({ borderTopRightRadius    : all(radius).borderRadius as Prop.BorderTopRightRadius,    })
export const bottomStart = (radius: BorderRadius = defaultRadius): Style => ({ borderBottomLeftRadius  : all(radius).borderRadius as Prop.BorderBottomLeftRadius,  })
export const bottomEnd   = (radius: BorderRadius = defaultRadius): Style => ({ borderBottomRightRadius : all(radius).borderRadius as Prop.BorderBottomRightRadius, })

export const top         = (radius: BorderRadius = defaultRadius): Style => ((radius: BorderRadius) => ({ borderTopLeftRadius: radius as Prop.BorderTopLeftRadius, borderTopRightRadius: radius as Prop.BorderTopRightRadius,                                                                                                                                 }))(all(radius).borderRadius as BorderRadius)
export const bottom      = (radius: BorderRadius = defaultRadius): Style => ((radius: BorderRadius) => ({                                                                                                                     borderBottomLeftRadius: radius as Prop.BorderBottomLeftRadius, borderBottomRightRadius: radius as Prop.BorderBottomRightRadius, }))(all(radius).borderRadius as BorderRadius)
export const start       = (radius: BorderRadius = defaultRadius): Style => ((radius: BorderRadius) => ({ borderTopLeftRadius: radius as Prop.BorderTopLeftRadius,                                                            borderBottomLeftRadius: radius as Prop.BorderBottomLeftRadius,                                                                  }))(all(radius).borderRadius as BorderRadius)
export const end         = (radius: BorderRadius = defaultRadius): Style => ((radius: BorderRadius) => ({                                                          borderTopRightRadius: radius as Prop.BorderTopRightRadius,                                                                borderBottomRightRadius: radius as Prop.BorderBottomRightRadius, }))(all(radius).borderRadius as BorderRadius)
