// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    createNodestrapStyle,
    global,
    rule,
    layout,
    variants,
    children,
}                           from '../libs/nodestrap'       // nodestrap core
import {
    isScreenWidthAtLeast,
} from '../libs/breakpoints';



createNodestrapStyle(() => [
    global([
        rule('.btn', [
            layout({
                '--btn-name': '"this is btn"',

                ...children('.icon', [
                    layout({
                        '--icon-name': '"this is icon"',
                    }),
                    variants([
                        isScreenWidthAtLeast('md', [
                            layout({
                                '--icon-sz': '"this medium icon"',
                            }),
                        ]),
                    ]),
                ]),
            }),
        ]),
    ]),
])
.attach()
;



function App() {
	return (
        <div>
            
        </div>
    );
}

export default App;