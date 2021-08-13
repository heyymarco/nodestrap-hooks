// react (builds html using javascript):
import {
    default as React,
}                           from 'react'                   // base technology of our cssfn components

// cssfn:
import colors      from '../libs/colors'


function App() {
	return (
        <div style={{
            backgroundColor : colors.successMild,
            color           : colors.successBold,
        }}>
            test
        </div>
    );
}

export default App;