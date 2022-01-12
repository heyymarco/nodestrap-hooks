import './App.css';

import {
	default as React,
}                          from 'react';



import {
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components

import jssPluginNested       from '../libs/jss-plugin-nested'

const customJss = createJss().setup({plugins:[
	jssPluginNested((styles) => styles as any),
]});



customJss.createStyleSheet({
	grandma: {
		'&>.parent': {
			'& input[type=checkbox][   data-test   *=   "you&me"    ]:nth-child(2n+5)' : {
				color: 'red',
	
				'& div[data-hello="you\'re awesome"][data-yeah="good\\\"yeah"]' : {
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
			'&.yeahh:is(:is(.very.amazing), :not(:so::bad))': {
				color: 'purple',
			},
			'&.yesss:is(:is(.very&.amazing), :not(:so&::bad))': {
				color: 'magenta',
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
