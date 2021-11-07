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
	Progress, ProgressBar,
	OrientationName,
}						from '../libs/Progress';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const milds = [false, undefined, true];
	const [mild,       setMild      ] = useState<boolean|undefined>(undefined);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<OrientationName|undefined>(undefined);


    return (
        <div className="App">
            <Container>
				<Progress
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					orientation={orientation}
				>
                    <ProgressBar
						// theme={theme} size={size} gradient={enableGrad}
						// outlined={outlined}
						// mild={mild}

						value={30}
					/>
                </Progress>

				<br />
				<Progress
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					orientation={orientation}
				>
                    <ProgressBar
						// theme={theme} size={size} gradient={enableGrad}
						// outlined={outlined}
						// mild={mild}

						value={30}
					>
						30%
					</ProgressBar>
                    <ProgressBar
						theme='danger' size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						value={50}
					>
						50%
					</ProgressBar>
                </Progress>

				<br />

				<Progress
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={true}

					orientation={orientation}
				>
                    <ProgressBar
						// theme={theme} size={size} gradient={enableGrad}
						// outlined={outlined}
						// mild={mild}

						value={30}
					>
						30%
					</ProgressBar>
                    <ProgressBar
						theme='danger' size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						value={50}
					>
						50%
					</ProgressBar>
                </Progress>
				
				<br />

				<Progress
					theme={theme} size={size} gradient={enableGrad}
					outlined={true} mild={mild}

					orientation={orientation}
				>
                    <ProgressBar
						// theme={theme} size={size} gradient={enableGrad}
						// outlined={outlined}
						// mild={mild}

						value={30}
					>
						30%
					</ProgressBar>
                    <ProgressBar
						theme='danger' size={size} gradient={enableGrad}
						outlined={outlined} mild={mild}

						value={50}
					>
						50%
					</ProgressBar>
                </Progress>
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
