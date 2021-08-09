// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our nodestrap components

// nodestrap (modular web components):
import '../libs/typos/index'



function App() {
	return (
        <div>
            <div>General text</div>
            <div className='txt-sec'>Secondary text</div>
            <p>Paragraph text 1</p>
            <p>Paragraph text 2</p>
            <p>Paragraph text 3</p>
        </div>
    );
}

export default App;