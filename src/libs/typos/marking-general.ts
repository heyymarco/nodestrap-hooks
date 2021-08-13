// cssfn:
import {
    // styles:
    createCssfnStyle,


    // compositions:
    global,


    // layouts:
    layout,


    // rules:
    rule,
}                           from '../cssfn'      // cssfn core
import gens                 from './general'



// create a new styleSheet & attach:
createCssfnStyle(() => [
    global([
        rule(['del', 's', 'ins', 'u', 'small', '.small', 'strong', 'b', 'em', 'i'], [
            layout({
                // layouts:
                display : 'inline',
            }),
        ]),
        rule(['del', 's'], [
            layout({
                // typos:
                textDecoration : 'line-through',
            }),
        ]),
        rule(['ins', 'u'], [
            layout({
                // typos:
                textDecoration : 'underline',
            }),
        ]),
        rule(['small', '.small'], [
            layout({
                // typos:
                fontSize       : gens.fontSizeSm,
            }),
        ]),
        rule(['strong', 'b'], [
            layout({
                // typos:
                fontWeight     : gens.fontWeightBolder,
            }),
        ]),
        rule(['em', 'i'], [
            layout({
                // typos:
                fontStyle      : 'italic',
            }),
        ]),
    ]),
])
.attach();
