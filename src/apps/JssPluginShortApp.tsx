import './App.css';

import {
	default as React,
}                          from 'react';



import {
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components

import jssPluginShort       from '../libs/jss-plugin-short'

const customJss = createJss().setup({plugins:[
    jssPluginShort(),
]});



customJss.createStyleSheet({
	test1: {
		foreg     : 'darkBlue',
		backg     : 'lightBlue',
		anim      : 'initial',

		gapInline : '10px',
		gapBlock  : '10px',
        
        transf    : 'translate(0, 0)',
        fallbacks : {
            transf: 'translate(1px, 1px)',
        },
	},
    test2: {
        foreg     : 'darkBlue',
		backg     : 'lightBlue',
        fallbacks : [
            {
                foreg: 'darkRed',
            },
            {
                backg: 'pink',
            },
        ] as any,
    },
})
.attach();



function App() {
    return (
        <div className="App">
            <div>
                test
            </div>
        </div>
    );
}

export default App;
