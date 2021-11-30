import './App.css';

import {
	default as React,
}                          from 'react';



import {
    create as createJss,
}                           from 'jss'           // base technology of our cssfn components

import jssPluginCamelCase       from '../libs/jss-plugin-camel-case'

const customJss = createJss().setup({plugins:[
    jssPluginCamelCase(),
]});



customJss.createStyleSheet({
	test1: {
		borderRadius     : '5px',
        backgroundColor  : 'lightBlue',
        color            : 'darkBlue',
        '--foo'          : 123,
        '--fooBoo'       : 'bleh',
        
        fallbacks : {
            borderColor : 'black',
            '--boo'     : 456,
            '--booMoo'  : 'yeah',
        },
	},
    test2: {
        borderRadius     : '5px',
        backgroundColor  : 'lightBlue',
        
        fallbacks : [
            {
                paddingInline : '1px',
                '--bleh'      : 'huh',
                '--blehFeh'   : 999,
            },
            {
                paddingBlock  : '2px',
                '--moo'       : 'huh',
                '--mooPurr'   : 999,
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
