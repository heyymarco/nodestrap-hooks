import './App.css';

import {
	default as React,
}                          from 'react';



import {
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components

import jssPluginNested       from '../libs/jss-plugin-nested'

const customJss = createJss().setup({plugins:[
    jssPluginNested(),
]});



customJss.createStyleSheet({
	grandma: {
		'&>.parent': {
			'& input[type=checkbox][   data-test   *=   "you&me"    ]:nth-child(2n+5)' : {
				color: 'red',
	
				'& div' : {
					color: 'pink',
				}
			},
			'&>.btn' : {
				color: 'blue',
			},
			':hover&:active' : {
				color: 'pink',
			},
			'& div, & aside, &>footer, &:is(btn, .btn, #btn)': {
				color: 'black',
			},
		},
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
