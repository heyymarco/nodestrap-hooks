// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // components:
    createUseComponentStyle,

    composition,
    global,

    layout,

    variants,
    states,

    gradient,
}                           from '../libs/nodestrap'   // nodestrap's core


function Child() {
    const styleSheet1 = useChildStyleSheet();

    return (
        <p
            className={[
                styleSheet1.main,
            ].join(' ')}
        >
            I'm children
        </p>
    )
}

function App() {
	const styleSheet1 = useAwesomeButtonStyleSheet();
	const styleSheet2 = useAwesomeButtonStyleSheet();
	const styleSheet3 = useAwesomeButtonStyleSheet();

    const [showChild, setShowChild] = useState(false);

    return (
        <div className="App">
            <div
                className={[
                    styleSheet1.main,
                    styleSheet2.other,
                    styleSheet3.main,
                ].join(' ')}
            >
                show child
                <input type='checkbox' checked={showChild} onChange={(e) => setShowChild(e.target.checked)} />
            </div>
            {
                showChild && <Child/>
            }
        </div>
    );
}

export default App;



const useAwesomeButtonStyleSheet = createUseComponentStyle([
    composition([
        layout({
            background: 'red',
            color: 'blue',

            '--parent-': '"parent"',
        }),

        layout({
            opacity: 0.5,
        }),

        variants([
            [ 'big', {
                fontSize: 'x-large'
            }],

            [ 'small', {
                fontSize: 'x-small'
            }],

            gradient(),

            [ null, (() => {
                console.log('creating parent css....');
                return {};
            })()]
        ]),

        states([
            [ ':hover', { background: 'pink' } ],

            gradient(),
        ]),
    ]),
    composition([

    ], 'other'),
    global([
        [ ':root', {
            '--glob-var': '"hello global"',
        }],
        [ ':root', {
            '--glob-var-oth': '"hello global again"',
        }],
    ]),
]);

const useChildStyleSheet = createUseComponentStyle([
    composition([
        layout({
            '--child-': '"child"',
            background: 'lightGreen',
        }),

        variants([
            [ null, (() => {
                console.log('creating child css....');
                return {};
            })()]
        ]),
    ]),
]);
