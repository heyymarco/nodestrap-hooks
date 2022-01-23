// cssfn:
import type {
    Prop,
    Cust,
}                           from './css-types'   // ts defs support for cssfn
import createCssConfig      from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)



// general types:
export type BorderRadius = Prop.BorderRadius | Cust.Expr



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



// setup css variables:
cssProps.default = cssProps.md;
