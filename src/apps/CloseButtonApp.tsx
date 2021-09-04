import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container 		from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/BasicComponent';
import Control 			from '../libs/Control';
import ActionControl	from '../libs/ActionControl';
import {
	Button,
}						from '../libs/Button';
import {
	ButtonIcon,
}						from '../libs/ButtonIcon';
import {
	CloseButton,
	BtnStyle,
}						from '../libs/CloseButton';
import type * as Buttons from '../libs/ButtonIcon';



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
	const actives = [false, undefined, true];
	const [active,       setActive      ] = useState<boolean|undefined>(undefined);

	const arrives = [false, undefined, true];
	const [arrive,       setArrive    ] = useState<boolean|undefined>(undefined);

	const focuses = [false, undefined, true];
	const [focus,       setFocus    ] = useState<boolean|undefined>(undefined);

	const presses = [false, undefined, true];
	const [press,       setPress      ] = useState<boolean|undefined>(undefined);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Buttons.OrientationName|undefined>(undefined);

	const btnStyles = [undefined, 'link', 'ghost'];
	const [btnStyle,    setBtnStyle     ] = useState<BtnStyle|undefined>(undefined);



    return (
        <div className="App">
            <Container>
                <Control
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
				>
                    control
                </Control>
                <Control
					tag='button'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
				>
                    control
                </Control>
				<Control
					tag='textarea'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}

					{...{
						defaultValue: 'textarea',
					}}
				/>
                <hr style={{flexBasis: '100%'}} />
                <ActionControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}

					press={press}
				>
                    action control
                </ActionControl>
                <ActionControl
					tag='button'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
					
					press={press}
				>
                    action control
                </ActionControl>
				<hr style={{flexBasis: '100%'}} />
				<ButtonIcon
					icon='face'

					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
					
					press={press}

					orientation={orientation}
					btnStyle={btnStyle}
				>
                    button icon
                </ButtonIcon>
				<ButtonIcon
					icon='instagram'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
					
					press={press}

					orientation={orientation}
					btnStyle={btnStyle}
				>
                    button icon
                </ButtonIcon>
				
				<CloseButton
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
					
					press={press}

					orientation={orientation}
					btnStyle={btnStyle}
				>
                    close button
                </CloseButton>
				<CloseButton
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
					
					press={press}

					orientation={orientation}
					btnStyle={btnStyle}
				/>
				<Button
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}

					arrive={arrive}
					focus={focus}
					
					press={press}

					orientation={orientation}
					btnStyle={btnStyle}
				>
                    button
                </Button>
				<span>button</span>
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
					Active:
					{
						actives.map(ac =>
							<label key={`${ac}`}>
								<input type='radio'
									value={`${ac}`}
									checked={active===ac}
									onChange={(e) => setActive((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${ac ?? 'auto'}`}
							</label>
						)
					}
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
					Press:
					{
						presses.map(pr =>
							<label key={`${pr}`}>
								<input type='radio'
									value={`${pr}`}
									checked={press===pr}
									onChange={(e) => setPress((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${pr ?? 'auto'}`}
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
									onChange={(e) => setOrientation((e.target.value || undefined) as (Buttons.OrientationName|undefined))}
								/>
								{`${ori}`}
							</label>
						)
					}
				</p>
				<p>
					BtnStyle:
					{
						btnStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={btnStyle===st}
									onChange={(e) => setBtnStyle((e.target.value || undefined) as (BtnStyle|undefined))}
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
