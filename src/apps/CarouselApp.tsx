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
// import Button from '../libs/Button';
// import ButtonIcon from '../libs/ButtonIcon';
import Carousel, { CarouselItem } from '../libs/Carousel';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	
	const [infiniteLoop,   setInfiniteLoop  ] = useState(false);

	

    return (
        <div className="App">
            <Container>
                <Basic
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}
				>
                        test
                </Basic>
				<Carousel theme={theme} size={size} gradient={enableGrad} outlined={outlined}
					infiniteLoop={infiniteLoop}
				>
					{/* <CarouselItem><div style={{width: '400px', height: '600px', background: 'red'    }}></div></CarouselItem>
					<CarouselItem><div style={{width: '600px', height: '400px', background: 'green'  }}></div></CarouselItem>
					<CarouselItem><div style={{width: '400px', height: '400px', background: 'blue'   }}></div></CarouselItem>
					<CarouselItem><div style={{width: '600px', height: '600px', background: 'yellow' }}></div></CarouselItem> */}

					<CarouselItem><img src="https://cdn.sanity.io/images/cezx9j7p/production/935cf1ce80b5e406908c697904ca9f71bd568a45-1560x1560.jpg?rect=0,195,1560,1170&amp;w=400&amp;h=300" alt="" /></CarouselItem>
					<CarouselItem><img src="https://cdn.sanity.io/images/cezx9j7p/production/a5fcfb5103026afe9150b2f714b148e71077df84-1560x1560.jpg?rect=0,195,1560,1170&amp;w=400&amp;h=300" alt="" /></CarouselItem>
					<CarouselItem><img src="https://cdn.sanity.io/images/cezx9j7p/production/2301e93e4f8022ae8a765a85779bda32850b9994-1560x1560.jpg?rect=0,195,1560,1170&amp;w=400&amp;h=300" alt="" /></CarouselItem>
					<CarouselItem><img src="https://cdn.sanity.io/images/cezx9j7p/production/23f0035aae05da3be9ca6c4b7ac06d8f3c69e070-1560x1560.jpg?rect=0,195,1560,1170&amp;w=400&amp;h=300" alt="" /></CarouselItem>
				</Carousel>
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
							checked={infiniteLoop}
							onChange={(e) => setInfiniteLoop(e.target.checked)}
						/>
						infinite loop
					</label>
				</p>
            </Container>
        </div>
    );
}

export default App;
