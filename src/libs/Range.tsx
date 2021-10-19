// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    children,
    
    
    
    // rules:
    variants,
    states,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
}                           from './EditableControl'
import {
    // styles:
    inputElm,
    
    
    // react components:
    Input,
}                           from './Input'
import {
    stripoutRange,
}                           from './stripouts'



// styles:
const thumbElm = '::after';
export const usesRangeLayout = () => {
    return composition([
        imports([
            // layouts:
            usesEditableControlLayout(),
        ]),
        layout({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // flow to the document's writing flow
            justifyContent : 'start',  // if range is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the range's first part should be visible first
            alignItems     : 'center', // default center items vertically
            flexWrap       : 'nowrap', // prevents the range to wrap to the next row
            
            
            
            // positions:
            verticalAlign  : 'baseline', // range's text should be aligned with sibling text, so the range behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, composition([
                imports([
                    stripoutRange(), // clear browser's default styles
                ]),
                layout({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    
                    
                    
                    // children:
                    ...children(thumbElm, composition([
                        layout({
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'thumb')), // apply general cssProps starting with thumb***
                        }),
                    ])),
                }),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesRangeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesEditableControlVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesRangeStates = () => {
    return composition([
        imports([
            // states:
            usesEditableControlStates(),
        ]),
    ]);
};
export const usesRange = () => {
    return composition([
        imports([
            // layouts:
            usesRangeLayout(),
            
            // variants:
            usesRangeVariants(),
            
            // states:
            usesRangeStates(),
        ]),
    ]);
};

export const useRangeSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesRange(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'rnge' });



// react components:

export interface RangeProps
    extends
        EditableControlProps<HTMLInputElement>,
        Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>
{
    // validations:
    min?      : string | number
    max?      : string | number
    
    
    // formats:
    step?     : number | string
    
    
    // events:
    onChange? : React.ChangeEventHandler<HTMLInputElement>
}
export function Range(props: RangeProps) {
    // styles:
    const sheet = useRangeSheet();
    
    
    
    // jsx:
    return (
        <Input
            // other props:
            {...props}
            
            
            // formats:
            type='range'
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export { Range as default }
