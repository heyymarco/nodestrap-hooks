import './App.css';

import {
	useElementCssSize,
} from '../libs/dimensions';



function App() {
	const setElementRef = useElementCssSize({ varHeight: '--elm-height' });

    return (
        <div className="App">
            <p ref={setElementRef as any}>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, odio illum. Odio vel ex debitis dolores, delectus sint alias saepe explicabo, laboriosam expedita obcaecati provident placeat, cum temporibus et velit?
			</p>
        </div>
    );
}

export default App;
