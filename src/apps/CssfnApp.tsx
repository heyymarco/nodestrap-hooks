// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import {
    // createStyle,
    createSheet,
    style,
    layout,
    // children,
    mainComposition,
    imports,
    composition,
    globalDef,
    // variants,
    // createCssfnStyle,
    // global,
    // Style,
    // atRoot,
    // vars,
    rules,
    rule,
    states,
    // nestedRule,
    // atGlobal,
    // fontFace,
    keyframes,
    // Styles,
    // isHover,
}                           from '../libs/cssfn'           // cssfn core
// import {
//     breakpoints,
//     isScreenWidthAtLeast,
// }                           from '../libs/breakpoints'
import {Range} from '../libs/Range';




// const keyframesFadeIn = {
//     from: {
//         opacity: 0,
//     },
//     '100%': {
//         opacity: 0.8,
//     },
// };
// const keyframesFadeOut = {
//     from: {
//         opacity: 0.9,
//     },
//     '100%': {
//         opacity: 0.1,
//     },
// };

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

export default function Page() {
    const [specificityWeight, setSpecificityWeight] = useState<number>(-1);

    const sheet = createSheet(() => [
        mainComposition([
            // style({
            //     ...imports([
            //         style({
            //             ...imports([
            //                 {
            //                     '--test-deep-import': 0,
            //                 },
            //             ]),
            //             ...style({
            //                 '--test-import-style-1': 0,
            //             }),
            //             ...style({
            //                 '--test-import-style-2': 0,
            //             }),
            //             '--test-import-style-x': 0,
            //         }),
            //         {
            //             '--test-import': 0,
            //         }
            //     ]),
            //     ...style({
            //         '--test-1': 0,
            //     }),
            // }),
            // layout({
            //     ...children(['::before', '::after'], {
            //         color: 'red',
            //     })
            // })
            // imports([
            //     layout({
            //         color: 'red',
            //     }),
            //     layout({
            //         color: null,
            //     }),
            // ]),
            // rules([
            //     rule([
            //         '.passive',
            //     ], [
            //         layout({
            //             background: 'pink',
            //         }),
            //     ]),
                
            //     rule([
            //         ['.active', ':checked:not(.actived)'],
            //     ], [
            //         layout({
            //             background: 'pink',
            //         }),
            //     ]),
                
            //     rule([
            //         '.passive',
            //         ':is(.active, .actived)',
            //         // ['.active', ':checked:not(.actived)'],
            //     ], [
            //         layout({
            //             background: 'pink',
            //         }),
            //     ]),
                
            //     rule([
            //         ['.active', ':checked:not(.actived)'],
            //     ], [
            //         layout({
            //             background: 'pink',
            //         }),
            //     ]),
            // ], { minSpecificityWeight: 3 }),
            // style({
            //     display: 'grid',
            //     appearance: 'none',

            //     ...states([
            //         rule([':disabled', '.disable', '.disabled'], {
            //             opacity: 0.5,
            //         }),
            //     ]),
            //     ...rule([':enabled', '.enabling'], {
            //         opacity: 0.95,
            //     }),
            // }),
            keyframes('fadeOut', {
                from: {
                    background: 'orange',
                },
                to : {
                    background: 'red',
                }
            }),
            states([
                rule([
                    ':wohaa',
                    ':weleh',
                    '::before',
                    '::after'
                ], [
                    layout({
                        color: 'pink',
                    }),
                ]),

                // rule([
                //     '&>.one',
                // ], [
                //     layout({
                //         color: 'pink',
                //     }),
                // ]),
                // rule([
                //     ['&>.one', '&>.other', '::before'],
                // ], [
                //     layout({
                //         color: 'pink',
                //     }),
                // ]),
                // rule([
                //     ['&>.one', '::before', '::after'],
                // ], [
                //     layout({
                //         color: 'pink',
                //     }),
                // ]),
    
                // rule([
                //     '.one>&',
                // ], [
                //     layout({
                //         color: 'red',
                //     }),
                // ]),
                // rule([
                //     ['.one>&', '.other>&', '::before'],
                // ], [
                //     layout({
                //         color: 'red',
                //     }),
                // ]),
                // rule([
                //     ['.one>&', '::before', '::after'],
                // ], [
                //     layout({
                //         color: 'red',
                //     }),
                // ]),
                
                // rule([
                //     '.one.two.three.four.five',
                // ], [
                //     layout({
                //         color: 'pink',
                //     }),
                // ]),
                // rule([
                //     ['.one.two.three.four.five', '::before'],
                // ], [
                //     layout({
                //         color: 'pink',
                //     }),
                // ]),
                // rule([
                //     ['.one.two.three.four.five', '::before', '::after:first-child'],
                // ], [
                //     layout({
                //         color: 'pink',
                //     }),
                // ]),
                
                // rule([
                //     [':one:two.tree', ':ONE:TWO:THREEE:not(.FOUR)'],
                // ], [
                //     layout({
                //         background: 'pink',
                //     }),
                // ]),
            ]
            // , { specificityWeight: 4 }
            )
            // rules([
            //     atGlobal([
            //         rule('.btn', [
            //             layout({
            //                 background: 'gray',
            //                 ...nestedRule('&', [
            //                     layout({
            //                         color: 'magenta',
            //                     }),
            //                 ]),
            //             }),
            //         ]),
            //     ]),
            // ]),
        ]),
    ]);

    
    return (
        <>
            <pre dangerouslySetInnerHTML={{ __html: sheet.toString()}} />
            
            <hr />

            {/* <Range
                theme='primary'

                min={-1} max={5} value={specificityWeight}
                onChange={(e) => {
                    setSpecificityWeight(e.currentTarget.valueAsNumber);
                }}
            /> */}
        </>
    );
}