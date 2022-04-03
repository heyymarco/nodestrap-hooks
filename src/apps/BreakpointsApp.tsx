// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our cssfn components

// cssfn:
import {
    createSheet,
    globalDef,
    rule,
    layout,
    atRoot,
    rules,
    keyframes,
}                           from '../libs/cssfn'           // cssfn core
import {
    isScreenWidthAtLeast,
} from '../libs/breakpoints';



createSheet(() => [
    globalDef([
        // rule('.btn', [
        //     layout({
        //         '--btn-name': '"this is btn"',

        //         ...children('.icon', [
        //             layout({
        //                 '--icon-name': '"this is icon"',
        //             }),
        //             variants([
        //                 isScreenWidthAtLeast('md', [
        //                     layout({
        //                         '--icon-sz': '"this medium icon"',
        //                     }),
        //                 ]),
        //             ]),
        //         ]),
        //     }),
        // ]),
        keyframes('fadeIn', {
            '50%': {
                color: 'red',
            },
            to: {
                color: 'darkRed',
            }
        }),
        isScreenWidthAtLeast('xl', [ // @global parent
            rules([
                atRoot([
                    layout({
                        fontSize: 'x-large',
                    }),
                ]),
            ], { minSpecificityWeight: 2 }),
        ]),
        isScreenWidthAtLeast('xl', {
            ...rule('div', {
                textDecoration: 'underline',
            })
        }),
        rule('.button', {
            background: 'pink',
            ...isScreenWidthAtLeast('md', { // .button parent
                background: 'red',
            }),
            ...isScreenWidthAtLeast('md', { // .button parent
                color: 'black',
            }),
        }),
        // Object.keys(breakpoints)
        // .map((breakpointName) => isScreenWidthAtLeast(breakpointName, [
        //     rules([
        //         atRoot([
        //             layout({
        //                 '--test': '"oke"',
        //                 // overwrites propName = propName{BreakpointName}:
        //                 // ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, breakpointName)),
        //             }),
        //         ]),
        //     ], { minSpecificityWeight: 2 }),
        // ])),
    ]),
])
.attach()
;



function App() {
	return (
        <div>
            
        </div>
    );
}

export default App;