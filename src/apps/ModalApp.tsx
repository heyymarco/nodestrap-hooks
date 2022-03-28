import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import Element   from '../libs/Element';
import Basic   from '../libs/Basic';
import {
	ThemeName,
	SizeName,
} 					from '../libs/Basic';
import Indicator from '../libs/Indicator';
import Content from '../libs/Content';
import Button from '../libs/Button';
import ButtonIcon from '../libs/ButtonIcon';
import Modal, { BackdropStyle } from '../libs/Modal';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const modalStyles = [undefined, 'hidden', 'interactive', 'static'];
	const [backdropStyle,    setModalStyle     ] = useState<BackdropStyle|undefined>(undefined);

	

    return (
        <div className="App">
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
				<Button onClick={() => setActive(true)}>Show modal</Button>
				<ButtonIcon btnStyle='link' theme='secondary' aria-label='Close' icon='close' />
				<Modal theme={theme} size={size} gradient={enableGrad} outlined={outlined} enabled={enabled} active={active}
					backdropStyle={backdropStyle}

					onActiveChange={(newActive) => {
						setActive(newActive);
					}}
				>
					<Element>
						<form method='dialog'>
							<button value='confirm'>OK</button>
						</form>
						<img style={{width: '200px'}} src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
					</Element>
				</Modal>
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
					BackdropStyle:
					{
						modalStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={backdropStyle===st}
									onChange={(e) => setModalStyle((e.target.value || undefined) as (BackdropStyle|undefined))}
								/>
								{`${st}`}
							</label>
						)
					}
				</p>
            </Container>
        </div>
    );
}

export default App;
