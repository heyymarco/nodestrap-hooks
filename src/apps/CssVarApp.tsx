// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our nodestrap components

// nodestrap (modular web components):
import createCssVar      from '../libs/css-var'      // Stores & retrieves configuration using *css custom properties* (css variables)


interface Apple {
    color: any
    weight: any
    price: any
}
const [appleRefs, appleDecls, appleConfig] = createCssVar<Apple>();
appleConfig.prefix = 'appl';

function App() {
	return (
        <div className="App">
            test
        </div>
    );
}

export default App;


console.log({
    [appleDecls.color]: 'red',
    '--the-price': appleRefs.price,
    '--the-color': appleRefs.color,
});
// appleDecls.color = '--foo';
// appleRefs.price = 'var(--foo)';
(window as any).appleRefs = appleRefs;
(window as any).appleDecls = appleDecls;
(window as any).appleConfig = appleConfig;