import './App.css';
import './MasonryApp.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import {
	ThemeName,
	SizeName,
} 					from '../libs/BasicComponent';
import Masonry from '../libs/Masonry';
import type * as Masonries from '../libs/Masonry';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Masonries.OrientationName|undefined>(undefined);

	

    return (
        <div className="App">
            <Container>
                <Masonry
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					orientation={orientation}
				>
					<img src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
					<img src="https://assets.codepen.io/12005/suspension-bridge.jpg" alt="The Clifton Suspension Bridge" />
					<img src="https://assets.codepen.io/12005/sunset.jpg" alt="Sunset and boats" />
					<img src="https://assets.codepen.io/12005/snowy.jpg" alt="a river in the snow" />
					<img src="https://assets.codepen.io/12005/bristol-balloons1.jpg" alt="a single checked balloon" />
					<img src="https://assets.codepen.io/12005/dog-balloon.jpg" alt="a hot air balloon shaped like a dog" />
					<img src="https://assets.codepen.io/12005/abq-balloons.jpg" alt="View from a hot air balloon of other balloons" />
					<img src="https://assets.codepen.io/12005/disney-balloon.jpg" alt="a balloon fairground ride" />
					<img src="https://assets.codepen.io/12005/bristol-harbor.jpg" alt="sunrise over a harbor" />
					<img src="https://assets.codepen.io/12005/bristol-balloons2.jpg" alt="three hot air balloons in a blue sky" />
					<img src="https://assets.codepen.io/12005/toronto.jpg" alt="the Toronto light up sign at night" />
				</Masonry>
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
					OrientationStyle:
					{
						orientations.map(ori =>
							<label key={ori ?? ''}>
								<input type='radio'
									value={ori}
									checked={orientation===ori}
									onChange={(e) => setOrientation((e.target.value || undefined) as (Masonries.OrientationName|undefined))}
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
