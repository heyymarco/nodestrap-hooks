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
    OrientationName,
    notOrientationBlock,
    isOrientationBlock,
    OrientationVariant,
    useOrientationVariant,
    ThemeName,
    outlinedOf,
    mildOf,
    usesBackg,
    usesBorder,
    usesBorderStroke,
    expandBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    usesPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
}                           from './Content'
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    
    
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
const progressBarElm = ':nth-child(n)';



export const usesProgressLayout = () => {
    // dependencies:
    
    // colors:
    const [border      ] = usesBorder();
    
    // borders:
    const [borderStroke] = usesBorderStroke();
    const [borderRadius] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // colors:
            border(),
            
            // borders:
            borderStroke(),
            borderRadius(),
            usesBorderAsContainer({     // make a nicely rounded corners
                orientationBlockRule  : '.block',
                orientationInlineRule : ':not(.block)',
            }),
        ]),
        layout({
            // layouts:
         // display        : 'flex',    // customizable orientation // already defined in variant `.block`/`.inline`
         // flexDirection  : 'column',  // customizable orientation // already defined in variant `.block`/`.inline`
            justifyContent : 'start',   // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            alignItems     : 'stretch', // wrappers width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // borders:
            ...expandBorderStroke(), // expand borderStroke css vars
            ...expandBorderRadius(), // expand borderRadius css vars
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
        }),
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
            usesBasicVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            notOrientationBlock([ // inline
                layout({
                    // layouts:
                    display           : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection     : 'row',         // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children(progressBarElm, [
                        imports([
                            // borders:
                            usesBorderAsSeparatorInline(),
                        ]),
                    ]),
                }),
            ]),
            isOrientationBlock([ // block
                layout({
                    // layouts:
                    display           : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    flexDirection     : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children(progressBarElm, [
                        imports([
                            // borders:
                            usesBorderAsSeparatorBlock(),
                        ]),
                    ]),
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
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
        ]),
        layout({
            // layouts:
            display        : 'inline-block', // use inline block, so it takes the width & height as we set
            
            
            
            // borders:
            [borderStrokeDecls.borderWidth]            : 0, // discard border
            [borderRadiusDecls.borderStartStartRadius] : 0, // discard borderRadius
            [borderRadiusDecls.borderStartEndRadius]   : 0, // discard borderRadius
            [borderRadiusDecls.borderEndStartRadius]   : 0, // discard borderRadius
            [borderRadiusDecls.borderEndEndRadius]     : 0, // discard borderRadius
            
            
            
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
        BasicProps<TElement>,
        
        // layouts:
        OrientationVariant
{
}
export function Progress<TElement extends HTMLElement = HTMLElement>(props: ProgressProps<TElement>) {
    // styles:
    const sheet = useProgressSheet();
    
    
    
    // variants:
    const orientationVariant    = useOrientationVariant(props);
    const orientationHorizontal = (orientationVariant.class === 'inline');
    
    
    
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
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
