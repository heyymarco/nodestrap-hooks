import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import Basic   from '../libs/Basic';
import {
	ThemeName,
	SizeName,
} 					from '../libs/Basic';
import Indicator from '../libs/Indicator';
import Content from '../libs/Content';
// import ButtonIcon   from '../libs/ButtonIcon';
import { Navbar } from '../libs/Navbar2';
import { List, ListItem } from '../libs/List';



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

	const compacts = [false, undefined, true];
	const [compact,    setCompact   ] = useState<boolean|undefined>(undefined);

	const [hasLogo,      setHasLogo   ] = useState(true);

	

    return (
        <div className="App" style={{background: 'url("/stone--.svg")'}}>
			
			<Navbar
				theme={theme} size={size} gradient={enableGrad}
				outlined={outlined} mild={mild}

				enabled={enabled}
				
				// defaultActive={true}
				active={active}
				onActiveChange={(active) => setActive(active)}

				compact={compact}

				logo={hasLogo && <img src="/logo.png" alt="" style={{height: '30px'}}  />}
				// toggler={<ButtonIcon icon='close'>Close</ButtonIcon>}
			>{(compact) =>
				<List orientation={compact ? 'block' : 'inline'}>
					<ListItem>hello</ListItem>
					<ListItem enabled={false}>disabled</ListItem>
					<ListItem>hoho</ListItem>
					<ListItem active={true}>active</ListItem>
					<ListItem theme='danger'>angry</ListItem>
					<ListItem theme='success'>fine</ListItem>
					<ListItem size='sm'>small</ListItem>
					<ListItem size='lg'>big</ListItem>
					<ListItem gradient={true}>i'm 3d</ListItem>
				</List>
			}</Navbar>
            <Container>
                <Basic
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}
				>
                        test
                </Basic>
                <Indicator
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                        test
                </Indicator>
                <Content
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}
				>
                        test
                </Content>
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
					Compact:
					{
						compacts.map(cp =>
							<label key={`${cp}`}>
								<input type='radio'
									value={`${cp}`}
									checked={compact===cp}
									onChange={(e) => setCompact((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${cp ?? 'auto'}`}
							</label>
						)
					}
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={hasLogo}
							onChange={(e) => setHasLogo(e.target.checked)}
						/>
						has logo
					</label>
				</p>
            </Container>
        </div>
    );
}

export default App;
