import './App.css';

import {
	ResponsiveProvider,
} from '../libs/responsive';



function App() {
    return (
        <div className="App">
            <ResponsiveProvider
				fallbacks={[2000, 1000, 500, 300, 100]}
			>{(fallback) => ([
				<div key={1}>
					<div style={{background: 'pink', width: `${fallback}px`, height: '20px'}}></div>
				</div>,
				// <span ref={setSpanRef} key={2}>test in { `${fallback}` }</span>
				// <svg ref={undefined}></svg>
			])}</ResponsiveProvider>
        </div>
    );
}

export default App;
