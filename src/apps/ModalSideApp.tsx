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
import Indicator from '../libs/Indicator';
import Content from '../libs/Content';
import Button from '../libs/Button';
import ButtonIcon from '../libs/ButtonIcon';
import ModalSide, * as ModalSides from '../libs/ModalSide';
import { ModalStyle } from '../libs/ModalSide';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);
	
	const modalSideStyles = [undefined, 'inlineStart','inlineEnd','blockStart','blockEnd'];
	const [modalSideStyle,    setModalSideStyle     ] = useState<ModalSides.ModalSideStyle|undefined>(undefined);

	const [wideContent, setWideContent   ] = useState(false);
	const [tallContent, setTallContent   ] = useState(false);

	const modalStyles = [undefined, 'hidden', 'interactive', 'static'];
	const [modalStyle,    setModalStyle     ] = useState<ModalStyle|undefined>(undefined);

	

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
				<Button onClick={() => setActive(true)}>Show modalSide</Button>
				<ButtonIcon btnStyle='link' theme='secondary' aria-label='Close' icon='close' />
				<ModalSide theme={theme} size={size} gradient={enableGrad} outlined={outlined} enabled={enabled} active={active}

					header=
					'Lorem ipsum dolor'

					// footer=
					// 'dolor sit amet'

					onActiveChange={(newActive) => {
						setActive(newActive);
					}}

					modalStyle={modalStyle}
					modalSideStyle={modalSideStyle}
				>
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
						ModalStyle:
						{
							modalStyles.map(st =>
								<label key={st ?? ''}>
									<input type='radio'
										value={st}
										checked={modalStyle===st}
										onChange={(e) => setModalStyle((e.target.value || undefined) as (ModalStyle|undefined))}
									/>
									{`${st}`}
								</label>
							)
						}
					</p>
					<p>
						ModalSideStyle:
						{
							modalSideStyles.map(st =>
								<label key={st ?? ''}>
									<input type='radio'
										value={st}
										checked={modalSideStyle===st}
										onChange={(e) => setModalSideStyle((e.target.value || undefined) as (ModalSides.ModalSideStyle|undefined))}
									/>
									{`${st}`}
								</label>
							)
						}
					</p>
					<p>
						<label>
							<input type='checkbox'
								checked={wideContent}
								onChange={(e) => setWideContent(e.target.checked)}
							/>
							simulate wide content
						</label>
					</p>
					<p>
						<label>
							<input type='checkbox'
								checked={tallContent}
								onChange={(e) => setTallContent(e.target.checked)}
							/>
							simulate tall content
						</label>
					</p>
					{wideContent && <>
						<p style={{whiteSpace: 'nowrap'}}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit qui provident vero at, veniam eligendi velit, culpa odit modi cumque fugit dicta facere asperiores autem iusto tenetur saepe, accusamus cum?
						</p>
					</>}
					{tallContent && <>
						<p>
							Lorem<br/>
							ipsum<br/>
							dolor<br/>
							sit,<br/>
							amet<br/>
							consectetur<br/>
							adipisicing<br/>
							elit.<br/>
							Obcaecati,<br/>
							fugiat<br/>
							quam<br/>
							corrupti<br/>
							doloremque<br/>
							mollitia<br/>
							fuga<br/>
							tempora<br/>
							sequi<br/>
							repellat?<br/>
							Sint<br/>
							quia<br/>
							doloremque,<br/>
							accusantium<br/>
							perferendis<br/>
							autem<br/>
							cupiditate!<br/>
							Sapiente<br/>
							odio<br/>
							sit<br/>
							voluptatem<br/>
							accusamus.
						</p>
					</>}
				</ModalSide>
                <hr style={{flexBasis: '100%'}} />
            </Container>
        </div>
    );
}

export default App;
