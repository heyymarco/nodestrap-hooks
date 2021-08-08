// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    createStyle,
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


createStyle({
    '': {
        '&:root': {
            '--hello': 'world',
            extend: [
                { '--hi': 'arnold', } as Style
            ]
        } as Style,
    } as Style,
} as Styles<''>)
.attach();
