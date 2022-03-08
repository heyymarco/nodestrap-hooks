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
import Button, {OrientationName}   from '../libs/Button';
import Dropdown from '../libs/Dropdown';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const milds = [false, undefined, true];
	const [mild,       setMild      ] = useState<boolean|undefined>(undefined);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);
	const [active2,      setActive2   ] = useState(false);

	const actionCtrls = [false, undefined, true];
	const [actionCtrl,      setActionCtrl   ] = useState<boolean|undefined>(undefined);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<OrientationName|undefined>(undefined);

	const targetButton1Ref = useRef<HTMLButtonElement>(null);
	const targetButton2Ref = useRef<HTMLButtonElement>(null);

	

    return (
        <div className="App">
            <Container>
				<Button elmRef={targetButton1Ref} onClick={(e) => {
					if (e.buttons) return; // no other button(s) being pressed
					
					setActive(!active);
				}}>Toggle Dropdown</Button>
				<Dropdown
					targetRef={targetButton1Ref}
					popupPlacement='bottom'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					onActiveChange={(newActive) => {
						// if (document.activeElement === targetButtonRef.current) return; // dropdown lost focus because the toggler button got focus => ignore
						setActive(newActive);
					}}
				>
					<p>Hello world!</p>
                </Dropdown>

				<Button elmRef={targetButton2Ref} onClick={(e) => {
					if (e.buttons) return; // no other button(s) being pressed
					
					setActive2(!active2);
				}}>Toggle Dropdown</Button>
				<Dropdown
					targetRef={targetButton2Ref}
					popupPlacement='bottom'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active2}
					orientation={orientation}
					onActiveChange={(newActive) => {
						// if (document.activeElement === targetButtonRef.current) return; // dropdown lost focus because the toggler button got focus => ignore
						setActive2(newActive);
					}}
				>
					<img style={{width: '200px'}} src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
                </Dropdown>
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
					Mild:
					{
						milds.map(mi =>
							<label key={`${mi}`}>
								<input type='radio'
									value={`${mi}`}
									checked={mild===mi}
									onChange={(e) => setMild((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${mi ?? 'unset'}`}
							</label>
						)
					}
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
				<p>
					actionCtrl:
					{
						actionCtrls.map(ac =>
							<label key={`${ac}`}>
								<input type='radio'
									value={`${ac}`}
									checked={actionCtrl===ac}
									onChange={(e) => setActionCtrl((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${ac ?? 'unset'}`}
							</label>
						)
					}
				</p>
				<p>
					OrientationStyle:
					{
						orientations.map(ori =>
							<label key={ori ?? ''}>
								<input type='radio'
									value={ori}
									checked={orientation===ori}
									onChange={(e) => setOrientation((e.target.value || undefined) as (OrientationName|undefined))}
								/>
								{`${ori}`}
							</label>
						)
					}
				</p>
            </Container>
        </div>
    );
}

export default App;
