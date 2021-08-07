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


const [cssProps, cssDecls] = createCssConfig('boo', () => ({
    backg: 'pink',
    color: 'red',

    favColor: 'red',
}));
