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
import ModalCard, * as ModalCards from '../libs/ModalCard';
import {
    Prop,
} from '../libs/css-types'        // ts defs support for jss
import { ModalStyle } from '../libs/ModalCard';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);
	
	const modalCardStyles = [undefined, 'scrollable'];
	const [modalCardStyle,    setModalCardStyle     ] = useState<ModalCards.ModalCardStyle|undefined>(undefined);

	const aligns = [undefined, 'start', 'center', 'end'];
	const [horzAlign,  setHorzAlign   ] = useState<Prop.JustifyItems|undefined>(undefined);
	const [vertAlign,  setVertAlign   ] = useState<Prop.AlignItems|undefined>(undefined);

	const [wideContent, setWideContent   ] = useState(false);
	const [tallContent, setTallContent   ] = useState(false);

	const modalStyles = [undefined, 'hidden', 'interactive'];
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
				<Button onClick={() => setActive(true)}>Show modalCard</Button>
				<ButtonIcon btnStyle='link' theme='secondary' aria-label='Close' icon='close' />
				<ModalCard theme={theme} size={size} gradient={enableGrad} outlined={outlined} enabled={enabled} active={active}
					modalStyle={modalStyle}
					
					header=
					'Lorem ipsum dolor'

					footer=
					'dolor sit amet'

					onActiveChange={(newActive) => {
						setActive(newActive);
					}}

					modalCardStyle={modalCardStyle}
					horzAlign={horzAlign}
					vertAlign={vertAlign}
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
						ModalCardStyle:
						{
							modalCardStyles.map(st =>
								<label key={st ?? ''}>
									<input type='radio'
										value={st}
										checked={modalCardStyle===st}
										onChange={(e) => setModalCardStyle((e.target.value || undefined) as (ModalCards.ModalCardStyle|undefined))}
									/>
									{`${st}`}
								</label>
							)
						}
					</p>
					<p>
						horzAlign:
						{
							aligns.map(al =>
								<label key={al ?? ''}>
									<input type='radio'
										value={al}
										checked={horzAlign===al}
										onChange={(e) => setHorzAlign((e.target.value || undefined) as (Prop.JustifyItems|undefined))}
									/>
									{`${al}`}
								</label>
							)
						}
					</p>
					<p>
						vertAlign:
						{
							aligns.map(al =>
								<label key={al ?? ''}>
									<input type='radio'
										value={al}
										checked={vertAlign===al}
										onChange={(e) => setVertAlign((e.target.value || undefined) as (Prop.AlignItems|undefined))}
									/>
									{`${al}`}
								</label>
							)
						}
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
				</ModalCard>
                <hr style={{flexBasis: '100%'}} />
            </Container>
        </div>
    );
}

export default App;
