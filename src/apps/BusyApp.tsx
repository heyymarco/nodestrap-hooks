import './App.css';

import {
	default as React,
    useState,
	useRef,
}                          from 'react';

import Container from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/Basic';
import Button from '../libs/Button';
import Busy from '../libs/Busy';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('danger');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);
	const [mild,       setMild      ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(true);

	const [counter, setCounter] = useState(0);

	const targetButton1Ref = useRef<HTMLButtonElement>(null);
	const targetButton2Ref = useRef<HTMLButtonElement>(null);
	const targetButton3Ref = useRef<HTMLButtonElement>(null);

	

    return (
        <div className="App">
            <Container>
				<Button onClick={() => setActive(!active)}>Toggle badge</Button>
				<h1>Example heading <Busy size={size} gradient={enableGrad} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Busy></h1>
				<span></span>
				<h2 style={{ color: 'blue', }}>Example heading <Busy size={size} gradient={enableGrad} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Busy></h2>
				<span></span>
				<h3 style={{ color: 'darkGreen', }}>Example heading <Busy size={size} gradient={enableGrad} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Busy></h3>
				<span></span>
				<h4 style={{ color: 'orange', }}>Example heading <Busy size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Busy></h4>
				<span></span>
				<h5>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={true} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Busy></h5>
				<span></span>
				<h6>Example heading <Busy theme={theme} size={size} gradient={enableGrad} outlined={true} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Busy></h6>
				<hr style={{flexBasis: '100%'}} />
				<Button
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Busy
						size={size} gradient={enableGrad} outlined={false} mild={mild} enabled={enabled}
						>
							{counter && `${counter}`}
					</Busy>
				</Button>
				<br />
				<Button
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
					elmRef={targetButton1Ref}
				>
					Click me <Busy
						targetRef={targetButton1Ref}
						popupPlacement='right-start'
						popupOffset={-10} popupShift={-10}
						nude={false} outlined={false} theme={theme} size={size} gradient={enableGrad} mild={mild} enabled={enabled}
						>
							{counter && `${counter}`}
					</Busy>
				</Button>
				<br />
				<Button
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
					elmRef={targetButton2Ref}
				>
					Click me <Busy
						targetRef={targetButton2Ref}
						popupPlacement='right-start'
						popupOffset={-10} popupShift={-10}
						nude={false} outlined={false} theme={theme} size={size} gradient={enableGrad} mild={mild} enabled={enabled}
						>
							{counter && `${counter}`}
					</Busy>
				</Button>
				<br />
				<Button
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
					elmRef={targetButton3Ref}
				>
					Click me <Busy
						targetRef={targetButton3Ref}
						popupPlacement='right'
						popupOffset={16}
						theme={theme} size={size} gradient={enableGrad} mild={mild} enabled={enabled}
						active={counter > 0}
						>
					</Busy>
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
