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
    // styles:
    usesIndicator,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import spacers              from './spacers'     // configurable spaces defs



// styles:
export const usesContent = () => {
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
            // bases:
            usesIndicator(),
            
            // layouts:
            sizes(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
}
export const useContentSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesContent(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        paddingInline        : spacers.default, // override to BasicComponent
        paddingBlock         : spacers.default, // override to BasicComponent
        paddingInlineSm      : spacers.sm,      // override to BasicComponent
        paddingBlockSm       : spacers.sm,      // override to BasicComponent
        paddingInlineLg      : spacers.lg,      // override to BasicComponent
        paddingBlockLg       : spacers.lg,      // override to BasicComponent
        //#endregion spacings
    };
}, { prefix: 'ct' });



// react components:

export interface ContentProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Content<TElement extends HTMLElement = HTMLElement>(props: ContentProps<TElement>) {
    // styles:
    const sheet = useContentSheet();

    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export { Content }