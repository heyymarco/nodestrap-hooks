import './App.css';

import {
	ResponsiveProvider,
} from '../libs/responsive';



function App() {
	const containerProps : React.CSSProperties = {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center',
		alignItems     : 'center',
		
		overflow       : 'auto',
		
		paddingInline  : '40px',
		paddingBlock   : '40px',
	};
	const childrenProps : React.CSSProperties = {
		flex: '0 0 auto',
		
		width: `500px`,
		height: '50px',
		
		marginInline : '-30px',
		// marginBlock  : '-30px',
	};

    return (
        <div className="App">
			<ResponsiveProvider
				fallbacks={[
					// 2000,
					// 1000,
					500,
					300,
					100,
				]}
			>{(fallback) => ([
				<div style={{
					...containerProps,
					overflow: 'visible',
					background: 'pink',
				}}>
					<div style={{
						...childrenProps,
						background: 'red',
						alignSelf : 'flex-start',
						width: `${fallback}px`,
					}}>
					</div>
				</div>
			])}</ResponsiveProvider>
			<div style={{
				...containerProps,
				background: 'lightblue',
			}}>
				<div style={{
					...childrenProps,
					alignSelf : 'flex-start',
					background: 'blue',
				}}>
				</div>
			</div>

			{/* <hr />

			<ResponsiveProvider
				fallbacks={[
					// 2000,
					// 1000,
					500,
					300,
					100,
				]}
			>{(fallback) => ([
				<div style={{
					...containerProps,
					background: 'pink',
					overflow: 'visible',
				}}>
					<div style={{
						...childrenProps,
						background: 'red',
						alignSelf: 'flex-end',
						width: `${fallback}px`,
					}}>
					</div>
				</div>
			])}</ResponsiveProvider>
			<div style={{
				...containerProps,
				background: 'lightblue',
			}}>
				<div style={{
					...childrenProps,
					background: 'blue',
					alignSelf: 'flex-end',
				}}>
				</div>
			</div> */}
        </div>
    );
}

export default App;
