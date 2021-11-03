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
    
    
    
    // rules:
    variants,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
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
    usesSizeVariant,
    usesNudeVariant,
    NudeVariant,
    useNudeVariant,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    GroupProps,
    Group,
}                           from './Group'



// styles:
export const usesProgressBarLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
        ]),
        layout({
            // layouts:
            display        : 'inline-block', // use inline block, so it takes the width & height as we set
            
            
            
            // positions:
            verticalAlign  : 'baseline', // label's text should be aligned with sibling text, so the label behave like <span> wrapper
            
            
            
            // sizes:
            /* -- auto size depends on the text's/content's size -- */
            boxSizing      : 'content-box', // the final size is excluding borders & paddings
            
            
            
            // typos:
            textAlign      : 'start', // flow to the document's writing flow
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesProgressBarVariants = () => {
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
            usesBasicVariants(),
            
            // layouts:
            sizes(),
            usesNudeVariant(),
        ]),
    ]);
};
export const usesProgressBar = () => {
    return composition([
        imports([
            // layouts:
            usesProgressBarLayout(),
            
            // variants:
            usesProgressBarVariants(),
        ]),
    ]);
};

export const useProgressBarSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesProgressBar(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'prgs' });



// react components:

export interface ProgressProps<TElement extends HTMLElement = HTMLElement>
    extends
        GroupProps<TElement>
{
}
export function Progress<TElement extends HTMLElement = HTMLElement>(props: ProgressProps<TElement>) {
    return (
        <Group<TElement>
            // other props:
            {...props}
            
            
            // variants:
            orientation={props.orientation ?? 'inline'}
        />
    );
}

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }



export interface ProgressBarProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>
{
}
export function ProgressBar<TElement extends HTMLElement = HTMLElement>(props: ProgressBarProps<TElement>) {
    // styles:
    const sheet = useProgressBarSheet();

    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
