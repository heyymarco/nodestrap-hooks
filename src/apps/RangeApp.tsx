import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/Basic';
import {Range, OrientationName} from '../libs/Range';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);
	const [mild,       setMild      ] = useState(false);
	const [nude,       setNude      ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const arrives = [false, undefined, true];
	const [arrive,       setArrive    ] = useState<boolean|undefined>(undefined);

	const focuses = [false, undefined, true];
	const [focus,       setFocus    ] = useState<boolean|undefined>(undefined);

	const isValids = [undefined, false, null, true];
	const [enableVal, setEnableVal  ] = useState(true);
	const [isValid,   setIsValid    ] = useState<boolean|null|undefined>(undefined);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<OrientationName|undefined>(undefined);

	const [slider1, setSlider1] = useState<number>(20);
	const [slider2, setSlider2] = useState<number>(40);
	const [slider3, setSlider3] = useState<number>(-40);

	
	const [slider4, setSlider4] = useState<number>(0);



    return (
        <div className="App">
            <Container>
				<p>Uncontrollable:</p>
                <Range
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild} nude={nude}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					orientation={orientation}

					defaultValue={slider1}
					onChange={(e) => setSlider1(e.currentTarget.valueAsNumber)}
				/>
				<span>{ slider1 }</span>
				<br /><br />

				<Range
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild} nude={nude}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					orientation={orientation}

					min={20} max={90} step={15} defaultValue={slider2}
					onChange={(e) => {
						console.log(e.target, 'onChange', e.currentTarget.valueAsNumber);
						setSlider2(e.currentTarget.valueAsNumber);
					}}
				/>
				<span>{ slider2 }</span>
				<br /><br />
				
                <Range
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild} nude={nude}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					orientation={orientation}

					min={-20} max={-90} step={15} defaultValue={slider3}
					onChange={(e) => {
						console.log(e.target, 'onChange', e.currentTarget.valueAsNumber);
						setSlider3(e.currentTarget.valueAsNumber);
					}}
				/>
				<span>{ slider3 }</span>
				<br /><br />

				<hr />

				<p>Controllable:</p>

				<Range
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild} nude={nude}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}

					enableValidation={false}
					isValid={isValid}

					orientation={orientation}

					min={0} max={360} step={1} value={slider4}
					onChange={(e) => {
						setSlider4(e.currentTarget.valueAsNumber);
					}}

					trackLowerStyle={{ background: 'unset', filter: 'unset' }}
					trackUpperStyle={{ background: 'unset', filter: 'unset' }}
					trackStyle={{ background: `hsla(${slider4}deg, 100%, 50%, 1)` }}
				/>
				<span>{ slider4 }</span>
				<br /><br />

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
							checked={nude}
							onChange={(e) => setNude(e.target.checked)}
						/>
						nude
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
				<p>
					Arrive:
					{
						arrives.map(ar =>
							<label key={`${ar}`}>
								<input type='radio'
									value={`${ar}`}
									checked={arrive===ar}
									onChange={(e) => setArrive((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${ar ?? 'auto'}`}
							</label>
						)
					}
				</p>
				<p>
					Focus:
					{
						focuses.map(fc =>
							<label key={`${fc}`}>
								<input type='radio'
									value={`${fc}`}
									checked={focus===fc}
									onChange={(e) => setFocus((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${fc ?? 'auto'}`}
							</label>
						)
					}
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={enableVal}
							onChange={(e) => setEnableVal(e.target.checked)}
						/>
						enable validation
					</label>
				</p>
				<p>
					is valid:
					{
						isValids.map(val =>
							<label key={`${val}`}>
								<input type='radio'
									value={`${val}`}
									checked={isValid===val}
									onChange={(e) => setIsValid((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											case 'null' : return null;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${(val===undefined) ? 'auto' : val}`}
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
