// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import {
    // createStyle,
    createSheet,
    layout,
    children,
    mainComposition,
    imports,
    composition,
    globalDef,
    variants,
    // createCssfnStyle,
    // global,
    Style,
    atRoot,
    vars,
    rules,
    rule,
    nestedRule,
    atGlobal,
    fontFace,
    keyframes,
    // Styles,
    isHover,
}                           from '../libs/cssfn'           // cssfn core
import {
    breakpoints,
    isScreenWidthAtLeast,
}                           from '../libs/breakpoints'



function App() {
	return (
        <div className="App">
            test
        </div>
    );
}

export default App;


const keyframesFadeIn = {
    from: {
        opacity: 0,
    },
    '100%': {
        opacity: 0.8,
    },
};
const keyframesFadeOut = {
    from: {
        opacity: 0.9,
    },
    '100%': {
        opacity: 0.1,
    },
};

// const testChildren = children(['.boo', '.foo'], [
//     layout({
//         background: 'pink',
//     }),
// ]);
const setColor = (col: string) => composition([
    layout({
        color: col,
    })
]);
const setSome = () => composition([
    imports([
        setColor('red'),
    ]),
]);
const setSomeSome = () => composition([
    imports([
        setSome(),
    ]),
]);

createSheet(() => [
    mainComposition([
        // imports([
        //     layout({
        //         color: 'red',
        //     }),
        //     layout({
        //         color: null,
        //     }),
        // ]),
        rules([
            isHover([
                layout({
                    opacity: 0.5,
                    color: 'red',
                }),
            ]),
            isHover([
                layout({
                    color: 'blue',
                    display: 'grid',
                }),
            ]),
            rule(':focus', [
                layout({
                    background: 'pink',
                }),
            ]),
        ])
        // rules([
        //     atGlobal([
        //         rule('.btn', [
        //             layout({
        //                 background: 'gray',
        //                 // ...nestedRule('foo', [
        //                 //     layout({
        //                 //     }),
        //                 // ]),
        //             }),
        //         ]),
        //     ]),
        // ]),
    ]),
    // globalDef([
    //     keyframes('fade-out', {
    //         from: {
    //             background: 'red',
    //             filter: [[
    //                 'opacity(0.5)',
    //                 'brightness(85%)',
    //                 'contrast(50%)',
    //             ]],
    //             boxShadow: [
    //                 'aaa',
    //                 'bbb',
    //                 'ccc',
    //             ],
    //         },
    //         to: {
    //             background: 'blue',
    //         },
    //     })
    // ]),
])
.attach();

// var glob = global([
//     [ '.big',
//         [{
//             '--im': '"big"',
//         },
//         {
//             '--im-so': '"bigg"',
//         }]
//     ],

//     [ null,
//         [{
//             '--im-gen': '"gen"',
//         },
//         {
//             '--im-so-gen': '"gennn"',
//         }]
//     ],
// ]);
// console.log(glob);
