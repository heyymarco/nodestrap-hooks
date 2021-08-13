// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our cssfn components

// cssfn:
import {
    createCssfnStyle,
    global,
    rule,
    layout,
    variants,
    children,
}                           from '../libs/cssfn'           // cssfn core
import {
    isScreenWidthAtLeast,
} from '../libs/breakpoints';



createCssfnStyle(() => [
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