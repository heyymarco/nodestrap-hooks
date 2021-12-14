// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

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
    globalDef,
    imports,
    
    
    
    // layouts:
    layout,
    children,
    
    
    
    // rules:
    rules,
    variants,
    rule,
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

// nodestrap utilities:
import {
    breakpoints,
    isScreenWidthAtLeast,
}                           from './breakpoints'

// nodestrap components:
import {
    // hooks:
    expandBorderRadius,
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
    // hooks:
    usesContainer,
    usesBorderAsContainer,
}                           from './Content'



// styles:
/**
 * Applies a responsive container layout.
 * @returns A `Style` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    return composition([
        layout({
            // borders:
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
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
            
            
            
            // borders:
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
            // since we use grid as paddings, so the css paddings are no longer needed:
            paddingInline : undefined as unknown as null, // turn off physical padding, use logical padding we've set above
            paddingBlock  : undefined as unknown as null, // turn off physical padding, use logical padding we've set above
        }),
    ]);
};

export const usesContainerFill = () => {
    // spacings:
    const [, containerRefs]     = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock  = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    const fillSelfSelector = '.fill-self';
    const fillSelector     = ['.fill', fillSelfSelector];
    return composition([
        imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: fillSelector }), // make a nicely rounded corners
        ]),
        layout({
            // children:
            ...children(fillSelector, [
                layout({
                    // sizes:
                    // span to maximum width including parent's paddings:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    fallbacks      : {
                        inlineSize : `calc(100% + (${positivePaddingInline} * 2))`,
                    },
                    
                    
                    
                    // spacings:
                    marginInline   : negativePaddingInline, // cancel out parent's padding with negative margin
                }),
                variants([
                    rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            // spacings:
                            marginBlockStart : negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                    rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            // spacings:
                            marginBlockEnd   : negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                ]),
            ]),
            ...children(fillSelfSelector, [
                layout({
                    ...children('*', [ // * => zero specificity => easy to overwrite
                        layout({
                            // spacings:
                            paddingInline : positivePaddingInline, // restore parent's padding with positive margin
                        }),
                    ]),
                }),
                variants([
                    rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            ...children('*', [ // * => zero specificity => easy to overwrite
                                layout({
                                    // spacings:
                                    paddingBlockStart : positivePaddingBlock, // restore parent's padding with positive margin
                                }),
                            ]),
                        }),
                    ]),
                    rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                        layout({
                            ...children('*', [ // * => zero specificity => easy to overwrite
                                layout({
                                    // spacings:
                                    paddingBlockEnd   : positivePaddingBlock, // restore parent's padding with positive margin
                                }),
                            ]),
                        }),
                    ]),
                ]),
            ]),
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

export const useContainerSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // fills:
            usesContainerFill(),
            
            // layouts:
            usesContainerLayout(),
            
            // variants:
            usesContainerVariants(),
        ]),
    ]),
], /*sheetId :*/'dmgepbofol'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
    globalDef([
        // the container size is determined by screen width:
        Object.keys(breakpoints)
        .map((breakpointName) => isScreenWidthAtLeast(breakpointName, [
            rules([
                atRoot([
                    layout({
                        // overwrites propName = propName{BreakpointName}:
                        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, breakpointName)),
                    }),
                ]),
            ], { minSpecificityWeight: 2 }),
        ])),
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
