// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // configs:
    createCssConfig,
}                           from '../libs/nodestrap'   // nodestrap's core


function App() {
	return (
        <div className="App">
            test
        </div>
    );
}

export default App;


export const [cssProps, cssDecls] = createCssConfig('boo', () => {
    const keyframesFadeOut = {
        from: {
            opacity: 0,
        },
        '100%': {
            opacity: 0.8,
        },
    };

    return {
        backg: 'pink',
        color: 'red',

        favColor: 'red',

        fadeEnd  : 0.8,
        '@keyframes fadeOut': keyframesFadeOut,
        animFade: [['300ms', 'ease-out', 'both', keyframesFadeOut]],
    };
});