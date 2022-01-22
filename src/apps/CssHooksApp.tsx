// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import {
    compositionOf,
    mainComposition,
    globalDef,

    layout,

    rule,
    variants,
    states,

    // usingGradient,
}                           from '../libs/cssfn'           // cssfn core
import {
    // components:
    createUseSheet,
}                           from '../libs/react-cssfn'     // cssfn for react
import createCssConfig      from '../libs/css-config'      // Stores & retrieves configuration using *css custom properties* (css variables)




function App() {
	const styleSheet1 = useAwesomeButtonStyle();

    const [showChild, setShowChild] = useState(false);

    return (
        <div className="App">
            <div
                className={[
                    styleSheet1.main,
                ].join(' ')}
            >
                test
            </div>
        </div>
    );
}

export default App;



const useAwesomeButtonStyle = createUseSheet([
    mainComposition({
        display: 'grid',
    }),

], "eiufie");
