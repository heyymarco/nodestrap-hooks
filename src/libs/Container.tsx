// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    
    
    
    // rules:
    rules,
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
    usesBasicComponentLayout,
    usesBasicComponentVariants,
    
    
    
    // react components:
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    breakpoints,
    isScreenWidthAtLeast,
}                           from './breakpoints'



// styles:
/**
 * Applies a responsive sizing based on screen width.
 * @returns A `Style` represents a responsive sizing based on screen width.
 */
export const usesResponsiveSize = () => composition([
    rules([
        // the container size is determined by screen width:
        Object.keys(breakpoints)
        .map((breakpointName) => isScreenWidthAtLeast(breakpointName, composition([
            vars({
                // overwrites propName = propName{BreakpointName}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, breakpointName)),
            }),
        ]))),
    ]),
]);
/**
 * Applies a responsive container layout.
 * @returns A `Style` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => composition([
    imports([
        usesResponsiveSize(),
    ]),
    layout({
        // spacings:
        paddingInline : cssProps.paddingInline,
        paddingBlock  : cssProps.paddingBlock,
    }),
]);
/**
 * Applies a responsive container using grid layout.
 * @returns A `Style` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = () => composition([
    imports([
        usesResponsiveSize(),
    ]),
    layout({
        // layouts:
        display             : 'grid', // use css grid for layouting
        gridTemplateRows    : [[cssProps.paddingBlock,  'auto', cssProps.paddingBlock ]], // the height of each row
        gridTemplateColumns : [[cssProps.paddingInline, 'auto', cssProps.paddingInline]], // the width of each column
        gridTemplateAreas   : [[
            '"........... blockStart ........."',
            '"inlineStart  content   inlineEnd"',
            '"...........  blockEnd  ........."',
        ]],
        
        
        
        // spacings:
        // since we use grid as paddings, so the css paddings are no longer needed:
        paddingInline : null,
        paddingBlock  : null,
    }),
]);

export const usesContainerLayout = () => composition([
    imports([
        // layouts:
        usesBasicComponentLayout(),
        usesResponsiveContainerLayout(),
    ]),
    layout({
        // layouts:
        display: 'block',
        
        
        
        // customize:
        ...usesGeneralProps(cssProps), // apply general cssProps
    }),
]);
export const usesContainerVariants = () => composition([
    imports([
        // variants:
        usesBasicComponentVariants(),
    ]),
]);
export const usesContainer = () => composition([
    imports([
        // layouts:
        usesContainerLayout(),
        
        // variants:
        usesContainerVariants(),
    ]),
]);

export const useContainerSheet = createUseCssfnStyle(() => [
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
        borderWidth  : 0, // strip out BasicComponent's border
        borderRadius : 0, // strip out BasicComponent's borderRadius
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



// react components:

export interface ContainerProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export const Container = <TElement extends HTMLElement = HTMLElement>(props: ContainerProps<TElement>) => {
    // styles:
    const sheet = useContainerSheet();
    
    
    
    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
};
export { Container as default }
