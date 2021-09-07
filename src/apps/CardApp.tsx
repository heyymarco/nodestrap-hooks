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
import BasicComponent   from '../libs/BasicComponent';
import Indicator from '../libs/Indicator';
import Content from '../libs/Content';
import Card from '../libs/Card';
import type * as Cards from '../libs/Card';



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

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Cards.OrientationName|undefined>(undefined);

	

    return (
        <div className="App">
            <Container>
                <BasicComponent
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}
				>
                        test
                </BasicComponent>
                <Indicator
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
				>
                        test
                </Indicator>
                <Content
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active}
				>
                        test
                </Content>
				<Card
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} orientation={orientation}

					header={
						<h4>Header</h4>
					}
					footer={
						<>Footer</>
					}
				>
					<p>Hello world</p>
                </Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}
					header=
						'Lorem ipsum dolor'
					
					children={<>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
					</>}
					footer=
						'dolor sit amet'
					
				/>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}>
					<h5>Card title</h5>
					<p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<a href='/'>Card link</a>
					<a href='/'>Another link</a>
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}>
					<h5>Card title</h5>
					<h6>Card subtitle</h6>
					<p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					<a href='/'>Card link</a>
					<a href='/'>Another link</a>
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}>
					<img src='https://picsum.photos/300/200' alt='' />
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}>
					<img src='https://picsum.photos/300/200' alt='' />
					<h5>Card title</h5>
					<p>This is a wider card with supporting text below as a natural lead-in to additional content.<br>
					</br>This content is a little bit longer.</p>
					<p>Last updated 3 mins ago</p>
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}
					header=
						'Lorem ipsum dolor'

					footer=
						'dolor sit amet'
				>
					<img src='https://picsum.photos/300/200' alt='' />
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}
					header=
						'Lorem ipsum dolor'

					footer=
						'dolor sit amet'
				>
					<img src='https://picsum.photos/300/200' alt='' />
					<h5>Card title</h5>
					<p>This is a wider card with supporting text below as a natural lead-in to additional content.<br>
					</br>This content is a little bit longer.</p>
					<p>Last updated 3 mins ago</p>
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}
					header=
						'Lorem ipsum dolor'

					footer=
						'dolor sit amet'
				>
					<img src='https://picsum.photos/300/200' alt='' />
					<img src='https://picsum.photos/300/200' alt='' />
					<img src='https://picsum.photos/300/200' alt='' />
					<h5>Card title</h5>
					<p>This is a wider card with supporting text below as a natural lead-in to additional content.<br>
					</br>This content is a little bit longer.</p>
					<p>Last updated 3 mins ago</p>
					<img src='https://picsum.photos/300/200' alt='' />
					<h5>Card title</h5>
					<p>This is a wider card with supporting text below as a natural lead-in to additional content.<br>
					</br>This content is a little bit longer.</p>
					<p>Last updated 3 mins ago</p>
					<img src='https://picsum.photos/300/200' alt='' />
				</Card>
				<Card theme={theme} size={size} gradient={enableGrad} outlined={outlined} mild={mild} enabled={enabled} active={active} orientation={orientation}>
					<figure>
						<img src='https://picsum.photos/300/200' alt='' />

					</figure>
					<h5>Card title</h5>
					<p>This is a wider card with supporting text below as a natural lead-in to additional content.<br>
					</br>This content is a little bit longer.</p>
					<p>Last updated 3 mins ago</p>
				</Card>
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
					OrientationStyle:
					{
						orientations.map(ori =>
							<label key={ori ?? ''}>
								<input type='radio'
									value={ori}
									checked={orientation===ori}
									onChange={(e) => setOrientation((e.target.value || undefined) as (Cards.OrientationName|undefined))}
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
