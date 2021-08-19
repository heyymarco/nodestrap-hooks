import './App.css';

import {
	default as React,
    useState,
}                          from 'react';


import Container 	from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/BasicComponent';
import Indicator 	from '../libs/Indicator';
import {
	Content,
} 					from '../libs/Content';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const [childEnabled,    setChildEnabled   ] = useState(true);
	const [childActive,      setChildActive   ] = useState(false);



    return (
        <div className="App">
            <Container>
                <Indicator
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                    indicator
                </Indicator>
                <Content
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                    content

					<div style={{display: 'inline-block', background: 'white', border: 'solid 1px black', padding: '10px', margin: '15px'}}>
						<Content
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined}

							inheritEnabled={false}
							enabled={childEnabled}
							
							inheritActive={false}
							active={childActive}

							style={{display: 'inline-block'}}
						>
							independent
						</Content>

						<Content
							theme={theme} size={size} gradient={enableGrad}
							outlined={outlined}

							inheritEnabled={true}
							enabled={childEnabled}
							
							inheritActive={true}
							active={childActive}

							style={{display: 'inline-block'}}
						>
							inherit by prop
						</Content>
					</div>
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
					<label>
						<input type='checkbox'
							checked={childEnabled}
							onChange={(e) => setChildEnabled(e.target.checked)}
						/>
						child enabled
					</label>
				</p>
				<p>
					<label>
						<input type='checkbox'
							checked={childActive}
							onChange={(e) => setChildActive(e.target.checked)}
						/>
						child active
					</label>
				</p>
            </Container>
        </div>
    );
}

export default App;
