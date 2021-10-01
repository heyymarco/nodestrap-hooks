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
import {ListItem} from '../libs/List';
import Accordion, {AccordionItem} from '../libs/Accordion';
import type * as Accordions from '../libs/Accordion';



function App() {
    const themes = [undefined,'primary','secondary','success','info','warning','danger','light','dark'];
    const [theme, 	   setTheme     ] = useState<ThemeName|undefined>('primary');

    const sizes = ['sm', undefined, 'lg'];
	const [size, 	   setSize      ] = useState<SizeName|undefined>(undefined);

	const [enableGrad, setEnableGrad] = useState(false);
	const [outlined,   setOutlined  ] = useState(false);

	const [enabled,    setEnabled   ] = useState(true);
	const [active,      setActive   ] = useState(false);

	const actionCtrls = [false, undefined, true];
	const [actionCtrl,      setActionCtrl   ] = useState<boolean|undefined>(undefined);

	const [childEnabled,    setChildEnabled   ] = useState(false);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Accordions.OrientationName|undefined>(undefined);

	const listStyles = [undefined, 'bullet'];
	const [listStyle,    setListStyle     ] = useState<Accordions.ListStyle|undefined>(undefined);

	

    return (
        <div className="App">
            <Container>
				<hr style={{flexBasis: '100%'}} />
                <Accordion
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle}
				>
					<AccordionItem label='test'>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit voluptatum esse debitis praesentium non labore error ex eius mollitia, aliquid quos asperiores ullam. Cupiditate pariatur vitae minus nisi provident?</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit voluptatum esse debitis praesentium non labore error ex eius mollitia, aliquid quos asperiores ullam. Cupiditate pariatur vitae minus nisi provident?</p>
					</AccordionItem>
					<AccordionItem theme='danger' label='hey'>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit voluptatum esse debitis praesentium non labore error ex eius mollitia, aliquid quos asperiores ullam. Cupiditate pariatur vitae minus nisi provident?</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit voluptatum esse debitis praesentium non labore error ex eius mollitia, aliquid quos asperiores ullam. Cupiditate pariatur vitae minus nisi provident?</p>
					</AccordionItem>
					<AccordionItem enabled={childEnabled} label={<>
						i'm {childEnabled ? 'enabled' : 'disabled'}
						<input type='checkbox'
							checked={childEnabled}
							onChange={(e) => setChildEnabled(e.target.checked)}
							onClick={(e) => e.stopPropagation()}
						/>
					</>}>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit voluptatum esse debitis praesentium non labore error ex eius mollitia, aliquid quos asperiores ullam. Cupiditate pariatur vitae minus nisi provident?</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur odit voluptatum esse debitis praesentium non labore error ex eius mollitia, aliquid quos asperiores ullam. Cupiditate pariatur vitae minus nisi provident?</p>
					</AccordionItem>
					<ListItem>hoho</ListItem>
                </Accordion>
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
					actionCtrl:
					{
						actionCtrls.map(ac =>
							<label key={`${ac}`}>
								<input type='radio'
									value={`${ac}`}
									checked={actionCtrl===ac}
									onChange={(e) => setActionCtrl((() => {
										const value = e.target.value;
										if (!value) return undefined;
										switch (value) {
											case 'true' : return true;
											case 'false': return false;
											default     : return undefined;
										} // switch
									})())}
								/>
								{`${ac ?? 'unset'}`}
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
									onChange={(e) => setOrientation((e.target.value || undefined) as (Accordions.OrientationName|undefined))}
								/>
								{`${ori}`}
							</label>
						)
					}
				</p>
				<p>
					ListStyle:
					{
						listStyles.map(st =>
							<label key={st ?? ''}>
								<input type='radio'
									value={st}
									checked={listStyle===st}
									onChange={(e) => setListStyle((e.target.value || undefined) as (Accordions.ListStyle|undefined))}
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
