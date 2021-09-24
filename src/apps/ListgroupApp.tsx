import './App.css';

import {
	default as React,
    useState,
}                          from 'react';

import Container from '../libs/Container';
import BasicComponent   from '../libs/BasicComponent';
import {
	ThemeName,
	SizeName,
} 					from '../libs/BasicComponent';
import Indicator from '../libs/Indicator';
import Control   from '../libs/Control';
import ActionControl   from '../libs/ActionControl';
import Button   from '../libs/Button';
import Content from '../libs/Content';
import Listgroup, {ListgroupItem} from '../libs/Listgroup';
import type * as Listgroups from '../libs/Listgroup';



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

	const actionCtrls = [false, undefined, true];
	const [actionCtrl,      setActionCtrl   ] = useState<boolean|undefined>(undefined);

	const [childEnabled,    setChildEnabled   ] = useState(false);
	const [childActive,      setChildActive   ] = useState(true);

	const orientations = [undefined, 'block', 'inline'];
	const [orientation,    setOrientation     ] = useState<Listgroups.OrientationName|undefined>(undefined);

	const listStyles = [undefined, 'content', 'bullet'];
	const [listStyle,    setListStyle     ] = useState<Listgroups.ListStyle|undefined>(undefined);

	

    return (
        <div className="App">
            <Container>
                <BasicComponent
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}
				>
                    element
                </BasicComponent>
                <Content
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}
				>
                    content
                </Content>
                <Indicator
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                    indicator
                </Indicator>
				<Control
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                    control
                </Control>
				<ActionControl
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined}

					enabled={enabled} active={active}
				>
                    action control
                </ActionControl>
				<Listgroup
					theme={theme} size={size} gradient={enableGrad}
					outlined={outlined} mild={mild}

					enabled={enabled} active={active} actionCtrl={actionCtrl}
					orientation={orientation}
					listStyle={listStyle}
				>
					<>hello</>
					<></>
					<>hey</>
					<ListgroupItem enabled={childEnabled}>
						i'm {childEnabled ? 'enabled' : 'disabled'}
						<input type='checkbox'
							checked={childEnabled}
							onChange={(e) => setChildEnabled(e.target.checked)}
						/>
					</ListgroupItem>
					'hoho'
					<ListgroupItem active={childActive}>
						i'm {childActive ? 'active' : 'passive'}
						<input type='checkbox'
							checked={childActive}
							onChange={(e) => setChildActive(e.target.checked)}
						/>
					</ListgroupItem>
					<ListgroupItem enabled={childEnabled} active={childActive}>
						i'm {childEnabled ? 'enabled' : 'disabled'}
						<input type='checkbox'
							checked={childEnabled}
							onChange={(e) => setChildEnabled(e.target.checked)}
						/>
						&amp; i'm {childActive ? 'active' : 'passive'}
						<input type='checkbox'
							checked={childActive}
							onChange={(e) => setChildActive(e.target.checked)}
						/>
					</ListgroupItem>
					<ListgroupItem theme='danger'>i'm angry</ListgroupItem>
					<ListgroupItem theme='success'>i'm fine</ListgroupItem>
					<ListgroupItem size='sm'>i'm small</ListgroupItem>
					<ListgroupItem size='lg'>i'm big</ListgroupItem>
					<ListgroupItem gradient={true}>i'm 3d</ListgroupItem>
					<ListgroupItem outlined={true}>i'm transparent</ListgroupItem>
					<ListgroupItem actionCtrl={true}>i'm controllable</ListgroupItem>
					<ListgroupItem actionCtrl={true} active={true}>i'm controllable</ListgroupItem>
					<ListgroupItem>
						<Button>button</Button>
					</ListgroupItem>
					<ListgroupItem active={true}>
						<Button>button</Button>
					</ListgroupItem>
                </Listgroup>
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
									onChange={(e) => setOrientation((e.target.value || undefined) as (Listgroups.OrientationName|undefined))}
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
									onChange={(e) => setListStyle((e.target.value || undefined) as (Listgroups.ListStyle|undefined))}
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
