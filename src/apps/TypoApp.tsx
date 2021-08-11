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

            <h1 className='display-1'>Display 1</h1>
            <p>Some paragraph</p>

            <h2 className='display-2'>Display 2</h2>
            <p>Some paragraph</p>

            <h1 className='display-1'>Display 1</h1>
            <h2 className='display-2'>Sub Display 2</h2>
            <p>Some paragraph</p>

            <h1 className='display-1'>Display 1</h1>
            <h2 className='display-2'>Sub Display 2</h2>
            <h3 className='display-3'>Sub Display 3</h3>
            <p>Some paragraph</p>

            <blockquote>
                <p>This is a blockquote</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti vel est aliquam, doloremque quae, nisi quod labore numquam rem voluptatum voluptate, ullam distinctio velit aperiam dolor qui eos blanditiis ut!</p>
            </blockquote>

            <p>I am <mark>marked</mark> here</p>

            <p>The syntax is <code>console.log('hello world')</code></p>

            <p>Press <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>del</kbd></p>

            <p>
                <del>deleted</del> <s>wrong</s>
            </p>
            <p>
                <ins>inserted</ins> <u>underlined</u>
            </p>
            <p>
                <small>small text</small> <span className='small'>small text too</span>
            </p>
            <p>
                <strong>important</strong> <b>bold</b>
            </p>
            <p>
                <em>really</em> <i>italic</i>
            </p>
        </div>
    );
}

export default App;