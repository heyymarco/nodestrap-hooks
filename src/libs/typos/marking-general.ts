// cssfn:
import {
    // styles:
    createSheet,
    
    
    
    // compositions:
    globalDef,
    
    
    
    // rules:
    rule,
}                           from '../cssfn'       // cssfn core

// nodestrap components:
import gens                 from './general'



// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        rule(['del', 's', 'ins', 'u', 'small', '.small', 'strong', 'b', 'em', 'i'], {
            // layouts:
            display        : 'inline',
        }),
        rule(['del', 's'], {
            // typos:
            textDecoration : 'line-through',
        }),
        rule(['ins', 'u'], {
            // typos:
            textDecoration : 'underline',
        }),
        rule(['small', '.small'], {
            // typos:
            fontSize       : gens.fontSizeSm,
        }),
        rule(['strong', 'b'], {
            // typos:
            fontWeight     : gens.fontWeightBolder,
        }),
        rule(['em', 'i'], {
            // typos:
            fontStyle      : 'italic',
        }),
    ]),
])
.attach();
