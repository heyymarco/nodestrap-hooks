// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // createStyle,
    createStyle,
    // createNodestrapStyle,
    // global,
    Style,
    Styles,
}                           from '../libs/nodestrap'       // nodestrap core



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


createStyle({
    // @global:
    ['']: {
        '&:root': {
            '--hello': 'world',
            extend: [
                { '--hi': 'arnold', } as Style
            ],
        } as Style,

        '@keyframes fadeIn': keyframesFadeIn,

        extend: {
            '@keyframes fadeOut': keyframesFadeOut,

            extend: [
                {
                    extend: {
                        '@keyframes fadeOutPlus': keyframesFadeOut,
                    } as Style,
                } as Style,
            ]
        } as Style,
    } as Style,
})
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
