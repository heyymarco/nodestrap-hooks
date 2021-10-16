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
					<CarouselItem><img src='https://picsum.photos/400/600' alt='' /></CarouselItem>
					<CarouselItem><img src='https://picsum.photos/600/400' alt='' /></CarouselItem>
					<CarouselItem><img src='https://picsum.photos/400/400' alt='' /></CarouselItem>
					<CarouselItem><img src='https://picsum.photos/600/600' alt='' /></CarouselItem>
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
