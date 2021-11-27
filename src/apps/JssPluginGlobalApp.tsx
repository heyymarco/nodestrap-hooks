import './App.css';

import {
	default as React,
}                          from 'react';



import {
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components

import jssPluginGlobal       from '../libs/jss-plugin-global'
import jssPluginNested       from '../libs/jss-plugin-nested'

const customJss = createJss().setup({plugins:[
    jssPluginGlobal(),
	jssPluginNested(),
]});



customJss.createStyleSheet({
	'@global': {
		body: {
			color: 'black',
		},

		'@font-face': {
			'font-family': 'MyCoolFont',
			src: 'url(coolfont.eot)'
		},
	},
	button: {
		float: 'left',

		'&>div': {
			'&>span': {
				'@global': {
					body: {
						background: 'pink'
					},

					'@font-face': {
						'font-family': 'SuperNestedFont',
						src: 'url(superNestedFont.eot)'
					},
				}
			},

			'@global': {
				'@font-face': {
					'font-family': 'MyAwesomeFont',
					src: 'url(awesomefont.eot)'
				},
			},
		},
	},
	
	'@font-face': {
		'font-family': 'MyWebFont',
		src: 'url(webfont.eot)'
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
