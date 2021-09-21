import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/BasicComponent';
import Button from '../libs/Button';
import Busy from '../libs/Busy';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);
	const [mild,       setMild      ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(true);

	const [counter, setCounter] = useState(0);

	

    return (
        <div className="App">
            <Container>
				<Button onClick={() => setActive(!active)}>Toggle busy</Button>
				<h1>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				/></h1>
				<span></span>
				<h2>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				/></h2>
				<span></span>
				<h3>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				/></h3>
				<span></span>
				<h4>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				/></h4>
				<span></span>
				<h5>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				/></h5>
				<span></span>
				<h6>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				/></h6>
				<hr style={{flexBasis: '100%'}} />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Busy
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					/>
				</Button>
				<br />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Busy
						style={{position: 'absolute', left: '100%', top: 0, transform: 'translate(-50%, -50%)'}}
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					/>
				</Button>
				<br />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Busy
						style={{position: 'absolute', left: '100%', top: 0, transform: 'translate(-50%, -50%)'}}
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
						badgeStyle='circle'
					/>
				</Button>
				<br />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Busy
						style={{position: 'absolute', left: '100%', top: 0, transform: 'translate(-50%, -50%)'}}
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
						badgeStyle='circle'
						active={counter > 0}
					/>
				</Button>
				<hr style={{flexBasis: '100%'}} />
				<p>
					Theme:
					{
						themes.map(th =>
							<label key={th ?? ''}>
								<input type='radio'
									value={th}
									checked={theme===th}
									onChange={(e) => setTheme(e.target.value as ThemeName || undefined)}
								/>
								{`${th}`}
							</label>
						)
					}
				</p>
				<p>
					Size:
					{
						sizes.map(sz =>
							<label key={sz ?? ''}>
								<input type='radio'
									value={sz}
									checked={size===sz}
									onChange={(e) => setSize(e.target.value as SizeName || undefined)}
								/>
								{`${sz}`}
							</label>
						)
					}
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={enableGrad}
							onChange={(e) => setEnableGrad(e.target.checked)}
						/>
						enable gradient
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={outlined}
							onChange={(e) => setOutlined(e.target.checked)}
						/>
						outlined
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={mild}
							onChange={(e) => setMild(e.target.checked)}
						/>
						mild
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={enabled}
							onChange={(e) => setEnabled(e.target.checked)}
						/>
						enabled
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={active}
							onChange={(e) => setActive(e.target.checked)}
						/>
						active
					</label>
				</p>
            </Container>
        </div>
    );
}

export default App;
