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
import Badge from '../libs/Badge';



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
				<Button onClick={() => setActive(!active)}>Toggle badge</Button>
				<h1>Example heading <Badge theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Badge></h1>
				<span></span>
				<h2>Example heading <Badge theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Badge></h2>
				<span></span>
				<h3>Example heading <Badge theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Badge></h3>
				<span></span>
				<h4>Example heading <Badge theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Badge></h4>
				<span></span>
				<h5>Example heading <Badge theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Badge></h5>
				<span></span>
				<h6>Example heading <Badge theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
					
					active={active}
				>
					New!
				</Badge></h6>
				<hr style={{flexBasis: '100%'}} />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Badge
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
						>
							{counter && `${counter}`}
					</Badge>
				</Button>
				<br />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Badge
						style={{position: 'absolute', left: '100%', top: 0, transform: 'translate(-50%, -50%)'}}
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
						>
							{counter && `${counter}`}
					</Badge>
				</Button>
				<br />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Badge
						style={{position: 'absolute', left: '100%', top: 0, transform: 'translate(-50%, -50%)'}}
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
						badgeStyle='pill'
						>
							{counter && `${counter}`}
					</Badge>
				</Button>
				<br />
				<Button
					style={{margin: '1em'}}
					onClick={() => setCounter((counter < 5) ? (counter + 1) : 0 )}
				>
					Click me <Badge
						style={{position: 'absolute', left: '100%', top: 0, transform: 'translate(-50%, -50%)'}}
						theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
						badgeStyle='pill'
						active={counter > 0}
						>
					</Badge>
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
