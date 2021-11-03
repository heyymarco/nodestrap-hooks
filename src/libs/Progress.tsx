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
    
    
    
    // utilities:
    parseNumber,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from './css-var'     // Declares & retrieves *css variables* (css custom properties).
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
    notOrientationInline,
    isOrientationInline,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // styles:
    usesListLayout,
    usesListVariants,
}                           from './List'
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



// hooks:

// progressBar vars:

export interface ProgressBarVars {
    /**
     * ProgressBar's thumb ratio.
     */
    progressBarValueRatio : any
}
const [progressBarVarRefs, progressBarVarDecls] = createCssVar<ProgressBarVars>();

/**
 * Uses ProgressBar variables.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents ProgressBar variables definitions.
 */
export const usesProgressBarVars = () => {
    return [
        () => composition([
        ]),
        progressBarVarRefs,
        progressBarVarDecls,
    ] as const;
};



// styles:
export const usesProgressLayout = () => {
    return composition([
        imports([
            // layouts:
            usesListLayout(),
        ]),
    ]);
};
export const usesProgressVariants = () => {
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
            usesListVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            notOrientationInline([ // block
                layout({
                    // layouts:
                    display : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                }),
            ]),
            isOrientationInline([ // inline
                layout({
                    // layouts:
                    display : 'flex',        // use block flexbox, so it takes the entire parent's width
                }),
            ]),
        ]),
    ]);
};
export const usesProgress = () => {
    return composition([
        imports([
            // layouts:
            usesProgressLayout(),
            
            // variants:
            usesProgressVariants(),
        ]),
    ]);
};

export const useProgressSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesProgress(),
        ]),
    ]),
]);



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
            boxSizing      : 'border-box',     // the final size is including borders & paddings
            flex           : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
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
    
    // range vars:
    const [progressBarVars , progressBarVarRefs] = usesProgressBarVars();
    
    
    
    return composition([
        imports([
            // variants:
            usesBasicVariants(),
            
            // layouts:
            sizes(),
            
            // progressBar vars:
            progressBarVars(),
        ]),
        variants([
            rule(':not(.inline)>*>&', [ // block
                layout({
                    blockSize  : `calc(${progressBarVarRefs.progressBarValueRatio} * 100%)`,
                }),
            ]),
            rule('.inline>*>&', [ // inline
                layout({
                    inlineSize : `calc(${progressBarVarRefs.progressBarValueRatio} * 100%)`,
                }),
            ]),
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
    // styles:
    const sheet = useProgressSheet();
    
    
    
    return (
        <Group<TElement>
            // other props:
            {...props}
            
            
            // variants:
            orientation={props.orientation ?? 'inline'}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }



export interface ProgressBarProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>
{
    // values:
    value?    : string | number
    min?      : string | number
    max?      : string | number
}
export function ProgressBar<TElement extends HTMLElement = HTMLElement>(props: ProgressBarProps<TElement>) {
    // styles:
    const sheet = useProgressBarSheet();
    
    
    
    // fn props:
    const valueFn    : number  = parseNumber(props.value)  ?? 0;
    const minFn      : number  = parseNumber(props.min)    ?? 0;
    const maxFn      : number  = parseNumber(props.max)    ?? 100;
    const negativeFn : boolean = (maxFn < minFn);
    const valueRatio : number  = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    // progressBar vars:
    const [, , progressBarVarDecls] = usesProgressBarVars();
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]       }
            semanticRole={props.semanticRole ?? 'progressbar'}
            
            aria-valuenow   ={props['aria-valuenow'   ] ?? valueFn}
            aria-valuemin   ={props['aria-valuemin'   ] ?? (negativeFn ? maxFn : minFn)}
            aria-valuemax   ={props['aria-valuemax'   ] ?? (negativeFn ? minFn : maxFn)}
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [progressBarVarDecls.progressBarValueRatio]: valueRatio,
            }}
        />
    );
}
