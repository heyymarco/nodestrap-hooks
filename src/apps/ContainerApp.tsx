import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import type {
	ThemeName,
	SizeName,
} from '../libs/Basic';
import Container from '../libs/Container';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);



    return (
        <div className="App">
            <Container
				theme={theme} size={size} gradient={enableGrad}
				outlined={outlined}
			>
				{/* <p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vero veritatis quam nobis omnis deserunt architecto eligendi corrupti inventore hic, ipsam ducimus qui possimus laboriosam explicabo odit a neque quasi?
				</p> */}
				<div style={{background: 'yellow'}} className='fill-self'>
					<p>I'm fill the entire width</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vero veritatis quam nobis omnis deserunt architecto eligendi corrupti inventore hic, ipsam ducimus qui possimus laboriosam explicabo odit a neque quasi?
					</p>
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vero veritatis quam nobis omnis deserunt architecto eligendi corrupti inventore hic, ipsam ducimus qui possimus laboriosam explicabo odit a neque quasi?
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vero veritatis quam nobis omnis deserunt architecto eligendi corrupti inventore hic, ipsam ducimus qui possimus laboriosam explicabo odit a neque quasi?
				</p>
				<div style={{background: 'yellow'}} className='fill'>
					<p>I'm fill the entire width</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vero veritatis quam nobis omnis deserunt architecto eligendi corrupti inventore hic, ipsam ducimus qui possimus laboriosam explicabo odit a neque quasi?
					</p>
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vero veritatis quam nobis omnis deserunt architecto eligendi corrupti inventore hic, ipsam ducimus qui possimus laboriosam explicabo odit a neque quasi?
				</p>
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
            </Container>
        </div>
    );
}

export default App;
