import './App.css';

import {
	default as React,
}                          from 'react';



import {
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components

import jssPluginVendor       from '../libs/jss-plugin-vendor'

const customJss = createJss().setup({plugins:[
    jssPluginVendor(),
]});



customJss.createStyleSheet({
	test1: {
		appearance: 'none',
        width: 'fill-available',
        fallbacks : {
            appearance: 'initial',
            height: 'fill-available',
        } as any,
	},
    test2: {
		appearance: 'none',
        width: 'fill-available',
        fallbacks : [
            {
                appearance: 'unset',
                height: 'fill-available',
            },
            {
                appearance: 'initial',
                'inline-size': 'fill-available',
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
