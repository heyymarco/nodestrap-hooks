// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our nodestrap components

// nodestrap (modular web components):
import '../libs/typos/index'



function App() {
	return (
        <div>
            <p>General text</p>
            <p className='txt-sec'>Secondary text</p>
        </div>
    );
}

export default App;