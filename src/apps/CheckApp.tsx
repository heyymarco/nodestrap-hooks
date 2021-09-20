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
import Check, * as Checks   from '../libs/Check';
import EditableControl from '../libs/EditableControl';
import ActionControl from '../libs/ActionControl';
import EditableActionControl from '../libs/EditableActionControl';



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

	const checkStyles = [undefined, 'btn', 'togglerBtn', 'switch'];
	const [checkStyle,    setCheckStyle     ] = useState<Checks.CheckStyle|undefined>(undefined);



    return (
        <div className="App">
            <Container>
				<EditableControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}
				>
                    editable control
                </EditableControl>
				<EditableControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={false}

					enabled={enabled} active={active}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}
				>
                    editable control mild
                </EditableControl>
				<ActionControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}

					focus={focus}
				>
                    action control
                </ActionControl>
				<ActionControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={false}

					enabled={enabled} active={active}

					focus={focus}
				>
                    action control mild
                </ActionControl>
				<EditableActionControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}

					focus={focus}
				>
                    editable action control
                </EditableActionControl>
				<EditableActionControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={false}

					enabled={enabled} active={active}

					focus={focus}
				>
                    editable action control mild
                </EditableActionControl>
				<hr style={{flexBasis: '100%'}} />
				<Check
					theme={theme} size={size} gradient={enableGrad} outlined={outlined}

					enabled={enabled}
					
					active={active}
					onActiveChange={(act) => setActive(act)}

					focus={focus}

					enableValidation={enableVal}
					isValid={isValid}

					checkStyle={checkStyle}
				>
					test
				</Check>
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
					ChkStyle:
					{
						checkStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={checkStyle===st}
									onChange={(e) => setCheckStyle((e.target.value || undefined) as (Checks.CheckStyle|undefined))}
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
