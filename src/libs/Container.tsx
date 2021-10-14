// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // styles:
    createSheet,
    
    
    
    // compositions:
    composition,
    mainComposition,
    global,
    imports,
    
    
    
    // layouts:
    layout,
    
    
    
    // rules:
    rules,
    atRoot,
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
    usesPadding,
    expandPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    breakpoints,
    isScreenWidthAtLeast,
}                           from './breakpoints'



// styles:
/**
 * Applies a responsive container layout.
 * @returns A `Style` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    return composition([
        layout({
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
/**
 * Applies a responsive container using grid layout.
 * @returns A `Style` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddingRefs] = usesPadding();
    
    
    
    return composition([
        layout({
            // layouts:
            display             : 'grid', // use css grid for layouting
            // define our logical paddings:
            gridTemplateRows    : [[paddingRefs.paddingBlock,  'auto', paddingRefs.paddingBlock ]], // the height of each row
            gridTemplateColumns : [[paddingRefs.paddingInline, 'auto', paddingRefs.paddingInline]], // the width of each column
            gridTemplateAreas   : [[
                '"........... blockStart ........."',
                '"inlineStart  content   inlineEnd"',
                '"...........  blockEnd  ........."',
            ]],
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
            // since we use grid as paddings, so the css paddings are no longer needed:
            paddingInline : undefined as unknown as null, // turn off physical padding, use logical padding we've set above
            paddingBlock  : undefined as unknown as null, // turn off physical padding, use logical padding we've set above
        }),
    ]);
};

export const usesContainerLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
            usesResponsiveContainerLayout(),
        ]),
        layout({
            // layouts:
            display: 'block',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesContainerVariants = () => {
    return composition([
        imports([
            // variants:
            usesBasicVariants(),
        ]),
    ]);
};
export const usesContainer = () => {
    return composition([
        imports([
            // layouts:
            usesContainerLayout(),
            
            // variants:
            usesContainerVariants(),
        ]),
    ]);
};

export const useContainerSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesContainer(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region borders
        borderWidth  : 0, // strip out Basic's border
        borderRadius : 0, // strip out Basic's borderRadius
        //#endregion borders
        
        
        
        //#region spacings
        paddingInline    : '12px' as PropEx.Length,
        paddingBlock     :  '9px' as PropEx.Length,
    
        paddingInlineSm  : '24px' as PropEx.Length,
        paddingBlockSm   : '18px' as PropEx.Length,
    
        paddingInlineMd  : '36px' as PropEx.Length,
        paddingBlockMd   : '27px' as PropEx.Length,
    
        paddingInlineLg  : '48px' as PropEx.Length,
        paddingBlockLg   : '36px' as PropEx.Length,
    
        paddingInlineXl  : '60px' as PropEx.Length,
        paddingBlockXl   : '45px' as PropEx.Length,
    
        paddingInlineXxl : '72px' as PropEx.Length,
        paddingBlockXxl  : '54px' as PropEx.Length,
        //#endregion spacings
    };
}, { prefix: 'con' });



// create a new styleSheet & attach:
createSheet(() => [
    global([
        // the container size is determined by screen width:
        Object.keys(breakpoints)
        .map((breakpointName) => isScreenWidthAtLeast(breakpointName, composition([
            rules([
                atRoot(composition([
                    layout({
                        // overwrites propName = propName{BreakpointName}:
                        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, breakpointName)),
                    }),
                ])),
            ], /*minSpecificityWeight: */2),
        ]))),
    ]),
])
.attach();



// react components:

export interface ContainerProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export function Container<TElement extends HTMLElement = HTMLElement>(props: ContainerProps<TElement>) {
    // styles:
    const sheet = useContainerSheet();
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export { Container as default }
