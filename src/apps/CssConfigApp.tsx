// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our cssfn components

// cssfn:
import createCssConfig      from '../libs/css-config'      // Stores & retrieves configuration using *css custom properties* (css variables)


function App() {
	return (
        <div className="App">
            test
        </div>
    );
}

export default App;


export const [cssProps, cssDecls, ,cssConfig] = createCssConfig(() => {
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
}, { prefix: 'boo' });
// cssConfig.prefix = 'wow';
(window as any).cssConfig = cssConfig;
(window as any).cssProps = cssProps;