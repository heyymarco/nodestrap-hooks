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
	test: {
		foreg     : 'darkBlue',
		backg     : 'lightBlue',
		anim      : 'initial',

		gapInline : '10px',
		gapBlock  : '10px',
	}
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
