import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container 		from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/Basic';
import {
	Button,
	ButtonStyle,
	OrientationName,
}						from '../libs/Button';
import {
	Group, ListStyle,
}						from '../libs/Group';
import { Check } from '../libs/Check';
import { TogglerMenuButton } from '../libs/TogglerMenuButton';
import { Radio } from '../libs/Radio';
import { DropdownListButton, DropdownListItem } from '../libs/DropdownListButton';
import { EmailInput, TextInput } from '../libs/Input';
import { Label } from '../libs/Label';



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
	const [orientation,    setOrientation     ] = useState<OrientationName|undefined>(undefined);

	const btnStyles = [undefined, 'link', 'ghost'];
	const [btnStyle,    setBtnStyle     ] = useState<ButtonStyle|undefined>(undefined);

	const listStyles = [undefined, 'content','flat','flush','btn','tab','breadcrumb','bullet'];
	const [listStyle,    setListStyle     ] = useState<ListStyle|undefined>(undefined);



    return (
        <div className="App">
            <Container>
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
				
				<Check
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
					>
					check btn
				</Check>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
                    <Button
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}

						btnStyle={btnStyle}
					>
						button
					</Button>
                    <Check
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
					>
						check btn
					</Check>
                    <TogglerMenuButton
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}
					/>
					<DropdownListButton
						// popupPlacement='bottom'
						
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled}
						orientation={orientation}

						buttonChildren='show menu'
					>
						<>hello</>
						<DropdownListItem theme='danger'>i'm angry</DropdownListItem>
						<DropdownListItem actionCtrl={false} theme='success'>i'm fine</DropdownListItem>
						<DropdownListItem size='sm'>i'm small</DropdownListItem>
						<DropdownListItem size='lg'>i'm big</DropdownListItem>
						<DropdownListItem gradient={true}>i'm 3d</DropdownListItem>
						<DropdownListItem outlined={true}>i'm transparent</DropdownListItem>
						<DropdownListItem>i'm controllable</DropdownListItem>
						<DropdownListItem active={true}>i'm controllable</DropdownListItem>
						<DropdownListItem actionCtrl={false}>
							<TextInput placeholder='type here' enableValidation={false} />
						</DropdownListItem>
					</DropdownListButton>
                    <Radio
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
						name='option'
					>
						opt 1
					</Radio>
                    <Radio
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
						name='option'
					>
						opt 2
					</Radio>
                    <Radio
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
						name='option'
					>
						opt 3
					</Radio>
					<Button
						theme='success'
					>
						button
					</Button>
					<Button
						theme='danger'
					>
						button
					</Button>
                </Group>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
					<Button
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}

						btnStyle={btnStyle}
					>
						button
					</Button>
                    <Check
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
					>
						check btn
					</Check>
                    <TogglerMenuButton
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}
					/>

					<DropdownListButton
						// popupPlacement='bottom'
						
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled}
						orientation={orientation}

						buttonChildren='show menu'
					>
						<>hello</>
						<DropdownListItem theme='danger'>i'm angry</DropdownListItem>
						<DropdownListItem actionCtrl={false} theme='success'>i'm fine</DropdownListItem>
						<DropdownListItem size='sm'>i'm small</DropdownListItem>
						<DropdownListItem size='lg'>i'm big</DropdownListItem>
						<DropdownListItem gradient={true}>i'm 3d</DropdownListItem>
						<DropdownListItem outlined={true}>i'm transparent</DropdownListItem>
						<DropdownListItem>i'm controllable</DropdownListItem>
						<DropdownListItem active={true}>i'm controllable</DropdownListItem>
						<DropdownListItem actionCtrl={false}>
							<TextInput placeholder='type here' enableValidation={false} />
						</DropdownListItem>
					</DropdownListButton>

					<Group
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}
						orientation={orientation}
						listStyle={listStyle}
					>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							checkStyle='togglerBtn'
							name='option'
						>
							opt 1
						</Radio>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							checkStyle='togglerBtn'
							name='option'
						>
							opt 2
						</Radio>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							checkStyle='togglerBtn'
							name='option'
						>
							opt 3
						</Radio>
					</Group>
                </Group>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
					<Button
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}

						btnStyle={btnStyle}
					>
						button
					</Button>
                    <Check
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
					>
						check btn
					</Check>
                    <TogglerMenuButton
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}
					/>

					<DropdownListButton
						// popupPlacement='bottom'
						
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled}
						orientation={orientation}

						buttonChildren='show menu'
					>
						<>hello</>
						<DropdownListItem theme='danger'>i'm angry</DropdownListItem>
						<DropdownListItem actionCtrl={false} theme='success'>i'm fine</DropdownListItem>
						<DropdownListItem size='sm'>i'm small</DropdownListItem>
						<DropdownListItem size='lg'>i'm big</DropdownListItem>
						<DropdownListItem gradient={true}>i'm 3d</DropdownListItem>
						<DropdownListItem outlined={true}>i'm transparent</DropdownListItem>
						<DropdownListItem>i'm controllable</DropdownListItem>
						<DropdownListItem active={true}>i'm controllable</DropdownListItem>
						<DropdownListItem actionCtrl={false}>
							<TextInput placeholder='type here' enableValidation={false} />
						</DropdownListItem>
					</DropdownListButton>

					<Group
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}
						orientation={orientation && ((orientation === 'block') ? 'inline' : 'block')}
						listStyle={listStyle}
					>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							checkStyle='togglerBtn'
							name='option'
						>
							opt 1
						</Radio>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							checkStyle='togglerBtn'
							name='option'
						>
							opt 2
						</Radio>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							checkStyle='togglerBtn'
							name='option'
						>
							opt 3
						</Radio>
					</Group>
                </Group>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
					<Button
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}

						btnStyle={btnStyle}
					>
						button
					</Button>
                    <Check
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}

						checkStyle='togglerBtn'
					>
						check btn
					</Check>
					<Check
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active} enableValidation={false}

						arrive={arrive}
						focus={focus}
						
						press={press}
						nude={false}
					/>
                    <TogglerMenuButton
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
						
						press={press}
					/>

					<Label
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}
					>
						Your email
					</Label>
					<EmailInput
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
					/>

					<Group
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}
						orientation={orientation && ((orientation === 'block') ? 'inline' : 'block')}
						listStyle={listStyle}
					>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							nude={false}
							name='option'
						>
							opt 1
						</Radio>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							nude={false}
							name='option'
						>
							opt 2
						</Radio>
						<Radio
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined} mild={mild}

							enabled={enabled} active={active} enableValidation={false}

							arrive={arrive}
							focus={focus}
							
							press={press}

							nude={false}
							name='option'
						>
							opt 3
						</Radio>
					</Group>
                </Group>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
					<Label
						theme='secondary' size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}
					>
						Your email
					</Label>
					<EmailInput
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
					/>
                </Group>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
					<Label
						theme='secondary' size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}
					>
						https://example.com/users/
					</Label>
					<TextInput
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}
					/>
                </Group>
				<hr style={{flexBasis: '100%'}} />
				<Group
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
					orientation={orientation}
					listStyle={listStyle}
				>
					<TextInput
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}

						placeholder='username'
					/>
					<Label
						theme='secondary' size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}
					>
						@
					</Label>
					<TextInput
						theme={theme} size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						enabled={enabled} active={active}

						arrive={arrive}
						focus={focus}

						placeholder='server'
					/>
                </Group>
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
									onChange={(e) => setOrientation((e.target.value || undefined) as (OrientationName|undefined))}
								/>
								{`${ori}`}
							</label>
						)
					}
				</p>
				<p>
					ButtonStyle:
					{
						btnStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={btnStyle===st}
									onChange={(e) => setBtnStyle((e.target.value || undefined) as (ButtonStyle|undefined))}
								/>
								{`${st}`}
							</label>
						)
					}
				</p>
				<p>
					ListStyle:
					{
						listStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={listStyle===st}
									onChange={(e) => setListStyle((e.target.value || undefined) as (ListStyle|undefined))}
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
