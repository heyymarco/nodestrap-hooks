// cssfn:
import type {
    PropEx,
    Cust,
}                           from './css-types'   // ts defs support for cssfn
import createCssConfig      from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)



// general types:
export type Length = PropEx.Length | Cust.Expr



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        none    : '0px'  as Length,
        md      : '1rem' as Length,
    };
    
    const defaults = {
        default : basics.md as Length,
    };
    
    return {
        ...basics,
        ...defaults,
        
        xxs     : [['calc(', basics.md, '/', 8  , ')']] as Length,
        xs      : [['calc(', basics.md, '/', 4  , ')']] as Length,
        sm      : [['calc(', basics.md, '/', 2  , ')']] as Length,

        lg      : [['calc(', basics.md, '*', 1.5, ')']] as Length,
        xl      : [['calc(', basics.md, '*', 3  , ')']] as Length,
    };
}, { prefix: 'spc' });
export { cssProps as spacers, cssProps as default }
