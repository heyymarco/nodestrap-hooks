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
import Radio, * as Radios   from '../libs/Radio';
import EditableControl from '../libs/EditableControl';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const focuses = [false, undefined, true];
	const [focus,       setFocus    ] = useState<boolean|undefined>(undefined);

	const isValids = [undefined, false, null, true];
	const [enableVal, setEnableVal  ] = useState(false);
	const [isValid,   setIsValid    ] = useState<boolean|null|undefined>(undefined);

	const chkStyles = [undefined, 'btn', 'togglerBtn', 'switch', 'fill'];
	const [checkStyle,    setCheckStyle     ] = useState<Radios.CheckStyle|undefined>(undefined);



	return (
        <div className="App">
            <Container>
				<EditableControl
					theme='primary' size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}
				>
                    editable control
                </EditableControl>
				<EditableControl
					theme='primary' size={size} gradient={enableGrad}
					outlined={outlined} mild={false}

					enabled={enabled} active={active}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}
				>
                    editable control
                </EditableControl>
				<hr style={{flexBasis: '100%'}} />
				<p>controllable:</p>
				<Radio
					name='bleh'
					value='first'
					theme={theme} size={size} gradient={enableGrad} outlined={outlined}

					enabled={enabled}
					
					active={active === false}
					onActiveChange={(act) => {
						console.log('OFF', act);
						if (act) {
							setActive(false);
						} // if
					}}
					onChange={(e) => {
						console.log('onChange A', e.target);
					}}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					checkStyle={checkStyle}
				>
						test 1
				</Radio>
				<Radio
					name='bleh'
					value='second'
					theme={theme} size={size} gradient={enableGrad} outlined={outlined}

					enabled={enabled}
					
					active={active === true}
					onActiveChange={(act) => {
						console.log('ON', act);
						if (act) {
							setActive(true);
						} // if
					}}
					onChange={(e) => {
						console.log('onChange B', e.target);
					}}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					checkStyle={checkStyle}
				>
						test 2
				</Radio>
                <hr style={{flexBasis: '100%'}} />
				<p>uncontrollable:</p>
				<Radio
					name='meow'
					value='first'
					theme={theme} size={size} gradient={enableGrad} outlined={outlined}

					enabled={enabled}
					
					defaultActive={active === false}
					onActiveChange={(act) => {
						console.log('off', act);
						if (act) {
							setActive(false);
						} // if
					}}
					onChange={(e) => {
						console.log('onChange a', e.target);
					}}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					checkStyle={checkStyle}
				>
						test 1
				</Radio>
				<Radio
					name='meow'
					value='second'
					theme={theme} size={size} gradient={enableGrad} outlined={outlined}

					enabled={enabled}
					
					defaultActive={active === true}
					onActiveChange={(act) => {
						console.log('on', act);
						if (act) {
							setActive(true);
						} // if
					}}
					onChange={(e) => {
						console.log('onChange b', e.target);
					}}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					checkStyle={checkStyle}
				>
						test 2
				</Radio>
                <hr style={{flexBasis: '100%'}} />
				<p>controllable:</p>
				<input type='radio'
					name='foo'
					checked={active === false}
					onChange={() => setActive(false)}
				/>
				<input type='radio'
					name='foo'
					checked={active === true}
					onChange={() => setActive(true)}
				/>
                <hr style={{flexBasis: '100%'}} />
				<p>uncontrollable:</p>
				<input type='radio'
					name='boo'
					defaultChecked={active === false}
					onChange={() => setActive(false)}
				/>
				<input type='radio'
					name='boo'
					defaultChecked={active === true}
					onChange={() => setActive(true)}
				/>
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
					CheckStyle:
					{
						chkStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={checkStyle===st}
									onChange={(e) => setCheckStyle((e.target.value || undefined) as (Radios.CheckStyle|undefined))}
								/>
								{`${st}`}
							</label>
						)
					}
				</p>
            </Container>
        </div>
    );
}

export default App;
