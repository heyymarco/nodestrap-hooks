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

            <div className='lead'>Lead Paragraph 1</div>
            <p className='lead'>Lead Paragraph 2</p>

            <h1>Heading 1</h1>
            <p>Some paragraph</p>

            <h2>Heading 2</h2>
            <p>Some paragraph</p>

            <h1>Heading 1</h1>
            <h2>Sub Heading 2</h2>
            <p>Some paragraph</p>

            <h1>Heading 1</h1>
            <h2>Sub Heading 2</h2>
            <h3>Sub Heading 3</h3>
            <p>Some paragraph</p>
        </div>
    );
}

export default App;