import './App.css';

import { useRef } from 'react';
import {
	useElementCssSize,
    UseWindowCssSize,
} from '../libs/dimensions';



function App() {
    const setElementRef = useRef<HTMLParagraphElement>(null);
	useElementCssSize(setElementRef, { varHeight: '--elm-height' });

    return (
        <>
            <UseWindowCssSize varWidth='--win-width' varHeight='--win-height' />
            <div className="App">
                <p ref={setElementRef}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, odio illum. Odio vel ex debitis dolores, delectus sint alias saepe explicabo, laboriosam expedita obcaecati provident placeat, cum temporibus et velit?
                </p>
            </div>
        </>
    );
}

export default App;
