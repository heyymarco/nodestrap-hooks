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
    atGlobal,
    fontFace,
    keyframes,
    // Styles,
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

createSheet(() => [
    // globalDef([
    //     rule(':root', [
    //         layout({
    //             background: 'white',
    //         }),
    //     ]),
    // ]),
    mainComposition([
        // imports([
        //     composition([
        //         layout({
        //             ...children('span', [
        //                 layout({
        //                     border: 'pink',
        //                 }),
        //             ]),
        //         }),
        //     ]),
        // ]),
        // layout({
        //     ...children('span', [
        //         layout({
        //             color: 'red',
        //         }),
        //     ]),
        //     color: 'black',
        //     // ...testChildren,
        //     ...children(['.boo', '.foo'], [
        //         layout({
        //             background: 'pink',
        //         }),
        //     ]),
        //     ...children(['&', 'span', 'aside'], [
        //         layout({
        //             textAlign: 'center',
        //         }),
        //     ]),
        //     ...children(['hello', 'world'], [
        //         layout({
        //             say: 'hello',
        //         }),
        //     ]),
        //     ...children(['hello', 'world'], [
        //         layout({
        //             bye: 'world',
        //         }),
        //     ]),
        // }),
        rules([
            // rule('.rr1', [
            //     layout({
            //         test: 'rule 1',
            //     }),
            // ]),
            // rule(['.rr1', ':rr2', ':disabled'], [
            //     layout({
            //         test: 'rule 2',
            //     }),
            // ]),
            // rule(['.rr5', ':rr6', '&'], [
            //     layout({
            //         test: 'rule 3',
            //     }),
            // ]),
            atGlobal([
                rule('.btn-glob', [
                    layout({
                        content: '"im in nested global"'
                    }),
                ]),
                atRoot([
                    vars({
                        '--my-var-1': '"im should in nested global"'
                    }),
                    variants([
                        isScreenWidthAtLeast('xxl', [
                            layout({
                                fontSize: 'xx-large',
                            }),
                        ]),
                    ]),
                ]),
                fontFace({
                    fontFamily: 'lucida console',
                }),
            ]),
            fontFace({
                fontFamily: 'consolas',
            }),
        ]),
    ]),
    globalDef([
        rule('.btn-cool', [
            layout({
                content: '"im in main global"',

                ...children('.child-1', [
                    layout({
                        ...children('.child-2', [
                            rules([
                                isScreenWidthAtLeast('xxl', [
                                    layout({
                                        fontSize: 'xxx-large',
                                    }),
                                ]),
                            ]),
                        ]),
                    }),
                ]),
            }),
            variants([
                isScreenWidthAtLeast('lg', [
                    layout({
                        content: '"im very cool"',
                    }),
                ]),
            ]),
        ]),
        atRoot([
            vars({
                '--my-var-2': '"im should in main global"'
            }),
            variants([
                isScreenWidthAtLeast('lg', [
                    layout({
                        fontSize: 'x-large',
                    }),
                ]),
            ]),
        ]),
        fontFace({
            fontFamily: 'arial narrow',
        }),
        keyframes('fade-out', {
            from: {
                background: 'red',
            },
            to: {
                background: 'blue',
            },
        })
    ]),
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
