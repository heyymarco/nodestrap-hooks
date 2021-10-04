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
    usesBasicComponentLayout,
    usesBasicComponentVariants,
    
    
    
    // react components:
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
}                           from './Content'
import {
    // hooks:
    usesThemeDefault,
}                           from './Control'



// hooks:

// appearances:

export type LabelStyle = 'content' // might be added more styles in the future
export interface LabelVariant {
    labelStyle?: LabelStyle
}
export const useLabelVariant = (props: LabelVariant) => {
    return {
        class: props.labelStyle ? props.labelStyle : null,
    };
};



// styles:
export const usesLabelLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicComponentLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        layout({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            
            
            
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
export const usesLabelVariants = () => {
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
            usesBasicComponentVariants(),
            
            // layouts:
            sizes(),
            usesNudeVariant(),
        ]),
        variants([
            rule('.content', [ // content
                imports([
                    usesContentLayout(),
                    usesContentVariants(),
                ]),
            ]),
        ]),
    ]);
};
export const usesLabel = () => {
    return composition([
        imports([
            // layouts:
            usesLabelLayout(),
            
            // variants:
            usesLabelVariants(),
        ]),
    ]);
};

export const useLabelSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesLabel(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'lb' });



// react components:

export interface LabelProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>,
        
        // layouts:
        NudeVariant,
        
        // appearances:
        LabelVariant
{
    // children:
    children? : React.ReactNode
}
export function Label<TElement extends HTMLElement = HTMLElement>(props: LabelProps<TElement>) {
    // styles:
    const sheet        = useLabelSheet();
    
    
    
    // variants:
    const nudeVariant  = useNudeVariant(props);
    const labelVariant = useLabelVariant(props);

    
    
    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                nudeVariant.class,
                labelVariant.class,
            ]}
        />
    );
}
export { Label as default }