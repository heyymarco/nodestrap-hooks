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
import Button from '../libs/Button';
import {
	Collapse,
	OrientationName,
} from '../libs/Collapse';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);
	const [mild,       setMild      ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<OrientationName|undefined>(undefined);

	

    return (
        <div className="App">
            <Container>
				<Button onClick={() => setActive(!active)}>Toggle collapse</Button>
				<Collapse theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} orientation={orientation}
				
					active={active}
				>
					<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quisquam soluta reprehenderit obcaecati culpa officiis dolorem, totam alias ex eligendi necessitatibus ad natus velit eius corrupti quis, magnam inventore tenetur?</p>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse natus voluptas corporis quasi doloribus enim numquam at ipsum aliquid explicabo cum reiciendis quos ullam delectus cumque sit, doloremque maxime dolore!</p>
				</Collapse>
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
							checked={mild}
							onChange={(e) => setMild(e.target.checked)}
						/>
						mild
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
