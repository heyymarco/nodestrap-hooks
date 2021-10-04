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
import Popup from '../libs/Popup';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);
	const [mild,       setMild      ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);
	const [active2,      setActive2   ] = useState(false);

	const targetButtonRef = useRef<HTMLButtonElement>(null);

	

    return (
        <div className="App">
            <Container>
				<Button onClick={() => setActive(!active)}>Toggle popup</Button>
				<Popup theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
				
					active={active}
				>
					Hopla!
				</Popup>
				<hr style={{flexBasis: '100%'}} />
				
				<Button elmRef={targetButtonRef} onClick={() => setActive2(!active2)}>Toggle popup at this button</Button>
				<Popup targetRef={targetButtonRef} popupPlacement='right' theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled}
				
					active={active2}
				>
					Hopla!
				</Popup>
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
