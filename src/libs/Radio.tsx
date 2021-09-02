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
    vars,
    children,
    
    
    
    // utilities:
    escapeSvg,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizes,
}                           from './BasicComponent'
import {
    // hooks:
    ChkStyle,
    VariantCheck,
    
    
    
    // styles:
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // configs:
    cssDecls as ccssDecls,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from './Check'



// styles:
const inputElm = ':first-child';
export const usesRadioLayout = () => {
    return composition([
        imports([
            // layouts:
            usesCheckLayout(),
        ]),
        layout({
            ...children(inputElm, composition([
                layout({
                    // borders:
                    borderRadius : '0.5em', // make circle corners
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
            ])),
        }),
        vars({
            [ccssDecls.img] : cssProps.img,
        }),
    ]);
};
export const usesRadioVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesCheckVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesRadioStates = () => {
    return composition([
        imports([
            // states:
            usesCheckStates(),
        ]),
    ]);
};
export const usesRadio = () => {
    return composition([
        imports([
            // layouts:
            usesRadioLayout(),
            
            // variants:
            usesRadioVariants(),
            
            // states:
            usesRadioStates(),
        ]),
    ]);
};

export const useRadioSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesRadio(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region indicators
        img                      : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#000'/></svg>")}")`,
        //#endregion indicators
    };
}, { prefix: 'rad' });



// react components:

export interface RadioProps
    extends
        CheckProps
{
}
export const Radio = (props: RadioProps) => {
    // styles:
    const sheet = useRadioSheet();
    
    
    
    // jsx:
    return (
        <Check
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // formats:
            type={props.type ?? 'radio'}
        />
    );
};
export { Radio as default }

export type { ChkStyle, VariantCheck }
