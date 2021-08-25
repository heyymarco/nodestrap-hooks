import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import {
	ThemeName,
	SizeName,
	BasicComponent,
} from '../libs/BasicComponent';
import Indicator from '../libs/Indicator';
import Content from '../libs/Content';
import Icon from '../libs/Icon';



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

	

    return (
        <div className="App">
            <Container>
                <BasicComponent
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}
				>
					element
					<Icon icon='face'               size={size} mild={mild} />
					<Icon icon='face' theme={theme} size={size} mild={mild} />
					<Icon icon='instagram' 				 size={size} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} mild={mild} />
                </BasicComponent>
                <Indicator
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled}
				>
					indicator
					<Icon icon='face'               size={size} mild={mild} />
					<Icon icon='face' theme={theme} size={size} mild={mild} />
					<Icon icon='instagram' 				 size={size} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} mild={mild} />
                </Indicator>
                <Indicator
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={true}
				>
					indicator active
					<Icon icon='face'               size={size} mild={mild} />
					<Icon icon='face' theme={theme} size={size} mild={mild} />
					<Icon icon='instagram' 				 size={size} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} mild={mild} />
                </Indicator>
                <Content
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled}
				>
					content
					<Icon icon='face'               size={size} mild={mild} />
					<Icon icon='face' theme={theme} size={size} mild={mild} />
					<Icon icon='instagram' 				 size={size} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} mild={mild} />
                </Content>
				<Content
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={true}
				>
					content active
					<Icon icon='face'               size={size} mild={mild} />
					<Icon icon='face' theme={theme} size={size} mild={mild} />
					<Icon icon='instagram' 				 size={size} mild={mild} />
					<Icon icon='instagram' theme={theme} size={size} mild={mild} />
                </Content>
				<Icon icon='face'               size={size} mild={mild} />
				<Icon icon='face' theme={theme} size={size} mild={mild} />
				<Icon icon='instagram' 				 size={size} mild={mild} />
				<Icon icon='instagram' theme={theme} size={size} mild={mild} />
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
            </Container>
        </div>
    );
}

export default App;
