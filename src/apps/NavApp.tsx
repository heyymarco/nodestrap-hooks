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
import Nav, {Item, NextItem, PrevItem} from '../libs/Nav';
import type * as Navs from '../libs/Nav';



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

	const actionCtrls = [false, undefined, true];
	const [actionCtrl,      setActionCtrl   ] = useState<boolean|undefined>(undefined);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Navs.OrientationName|undefined>(undefined);

	const listStyles = [undefined, 'content','flat','flush','btn','tab','breadcrumb','bullet'];
	const [listStyle,    setListStyle     ] = useState<Navs.ListStyle|undefined>(undefined);

	

    return (
        <div className="App">
            <Container>
				<Nav
					label='Page navigation example'
					
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle}
				>
					<>Previous</>
					<>1</>
					<>2</>
					<>3</>
					<>Next</>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle}
				>
					<Item enabled={false}>Previous</Item>
					<Item>1</Item>
					<Item active={true}>2</Item>
					<Item>3</Item>
					<Item>Next</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle}
				>
					<PrevItem />
					<Item href='http://www.google.com'>1</Item>
					<Item active={true}>2</Item>
					<Item onClick={() => alert('hello world')}>3</Item>
					<NextItem />
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['content', 'flat']}
				>
					<Item active={true}>Active</Item>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['content', 'flush']}
				>
					<Item active={true}>Active</Item>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={true} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['content', 'btn']}
				>
					<Item active={true}>Active</Item>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={true} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['content', 'btn', 'flat']}
				>
					<Item active={true}>Active</Item>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={true} mild={false}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['content', 'tab']}
				>
					<Item active={true}>Active</Item>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={false} mild={true}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['content', 'tab']}
				>
					<Item active={true}>Active</Item>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
                <hr style={{flexBasis: '100%'}} />
				<Nav
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle ?? ['breadcrumb']}
				>
					<Item href='http://www.google.com'>Link</Item>
					<Item onClick={() => alert('hello world')}>Link</Item>
					<Item active={true}>Active</Item>
					<Item enabled={false}>Disabled</Item>
                </Nav>
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
									onChange={(e) => setOrientation((e.target.value || undefined) as (Navs.OrientationName|undefined))}
								/>
								{`${ori}`}
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
									onChange={(e) => setListStyle((e.target.value || undefined) as (Navs.ListStyle|undefined))}
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
