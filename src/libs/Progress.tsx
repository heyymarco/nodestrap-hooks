// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    SingleOrArray,
}                           from './types'      // cssfn's types
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    children,
    
    
    
    // rules:
    variants,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    Element,
    
    
    
    // utilities:
    isTypeOf,
    parseNumber,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from './css-var'     // Declares & retrieves *css variables* (css custom properties).
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
    
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    
    notOutlined,
    notMild,
    usesMildVariant,
    mildOf,
    usesBackg,
    usesBorderStroke,
    usesBorderRadius,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // styles:
    listItemElm,
    usesListLayout,
}                           from './List'
import colors               from './colors'      // configurable colors & theming defs
import spacers              from './spacers'     // configurable spaces defs



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;


// colors:

//#region alternate backg
export interface AltBackgVars {
    /**
     * functional alternate background color.
     */
    altBackgFn     : any
    /**
     * final alternate background color.
     */
    altBackgCol    : any
    /**
     * final alternate background layers.
     */
    altBackg       : any
}
const [altBackgRefs, altBackgDecls] = createCssVar<AltBackgVars>();

/**
 * Uses alternate background layer(s).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents alternate background layer(s) definitions.
 */
export const usesAltBackg = () => {
    // dependencies:
    const [, mildRefs    ] = usesMildVariant();
    
    
    
    return [
        () => composition([
            vars({
                [altBackgDecls.altBackgFn]  : mildRefs.backgMildFn,
                [altBackgDecls.altBackgCol] : 'transparent',
                [altBackgDecls.altBackg]    : [ // single array => makes the JSS treat as comma separated values
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // bottom layer:
                    altBackgRefs.altBackgCol,
                ],
            }),
            variants([
                notOutlined([
                    vars({
                        [altBackgDecls.altBackgCol] : colors.backg,
                    }),
                    variants([
                        notMild([
                            vars({
                                [altBackgDecls.altBackgCol] : altBackgRefs.altBackgFn,
                            }),
                        ]),
                    ]),
                ]),
            ]),
        ]),
        altBackgRefs,
        altBackgDecls,
    ] as const;
};
//#endregion alternate backg


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


// appearances:

export type ProgressBarStyle = 'striped' // might be added more styles in the future
export interface ProgressBarVariant {
    progressBarStyle?: SingleOrArray<ProgressBarStyle>
}
export const useProgressBarVariant = (props: ProgressBarVariant) => {
    return {
        class: props.progressBarStyle ? ((Array.isArray(props.progressBarStyle) ? props.progressBarStyle : [props.progressBarStyle]).filter((style) => !!style).join(' ') || null) : null,
    };
};



// styles:
export const usesProgressLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    // dependencies:
    
    // colors:
    const [altBackg, altBackgRefs] = usesAltBackg();
    
    
    
    return composition([
        imports([
            // colors:
            altBackg(),
            
            // layouts:
            usesListLayout(options),
        ]),
        layout({
            // layouts:
            justifyContent : 'start',   // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            
            
            
            // backgrounds:
            backg          : altBackgRefs.altBackg,
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockSelector,  [ // block
                layout({
                    // layouts:
                    display : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    
                    
                    
                    // overwrites propName = propName{Block}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
                }),
            ]),
            rule(orientationInlineSelector, [ // inline
                layout({
                    // layouts:
                    display : 'flex',        // use block flexbox, so it takes the entire parent's width
                    
                    
                    
                    // overwrites propName = propName{Inline}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
                }),
            ]),
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
            usesBasicVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesProgress = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesProgressLayout(options),
            
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



export const usesProgressBarInheritMildVariant = () => {
    return composition([
        variants([
            rule('.mild>&', [ // .mild>.progress => specificity weight excluding parent = 1
                imports([
                    mildOf(true),
                ]),
            ]),
        ]),
    ]);
};



export const usesProgressBarLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // range vars:
    const [progressBarVars , progressBarVarRefs] = usesProgressBarVars();
    
    
    
    return composition([
        layout({
            // sizes:
            flex     : [[progressBarVarRefs.progressBarValueRatio, progressBarVarRefs.progressBarValueRatio, 0]], // growable, shrinkable, initial from 0 width; using `rangeValueRatio` for the grow/shrink ratio
            overflow : 'hidden',
            
            
            
            // children:
            ...children(listItemElm, [
                imports([
                    // layouts:
                    usesBasicLayout(),
                    
                    // progressBar vars:
                    progressBarVars(),
                ]),
                layout({
                    // layouts:
                    display        : 'flex',   // fills the entire wrapper's width
                    justifyContent : 'center', // center items (text, icon, etc) horizontally
                    alignItems     : 'center', // center items (text, icon, etc) vertically
                    
                    
                    
                    // borders:
                    [borderStrokeDecls.borderWidth]            : 0, // discard border
                    [borderRadiusDecls.borderStartStartRadius] : 0, // discard borderRadius
                    [borderRadiusDecls.borderStartEndRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndStartRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndEndRadius]     : 0, // discard borderRadius
                    
                    
                    
                    // sizes:
                    flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
                }),
            ]),
        }),
    ]);
};
export const usesProgressBarVariants = () => {
    // dependencies:
    
    // colors:
    const [, backgRefs] = usesBackg();
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        layout({
            // children:
            ...children(listItemElm, [
                imports([
                    // variants:
                    usesBasicVariants(),
                    usesProgressBarInheritMildVariant(),
                    
                    // layouts:
                    sizes(),
                ]),
            ]),
        }),
        variants([
            rule('.striped', [
                layout({
                    // children:
                    ...children(listItemElm, [
                        layout({
                            // backgrounds:
                            backg : [ // single array => makes the JSS treat as comma separated values
                                // top layer:
                                cssProps.itemBackgOverlay,
                                
                                // bottom layer:
                                backgRefs.backg,
                            ],
                        }),
                    ]),
                }),
            ]),
        ]),
    ]);
};
export const usesProgressBar = () => {
    return composition([
        variants([
            rule('&&', [ // makes `.ProgressBar` is more specific than `wrapperElm`
                imports([
                    // layouts:
                    usesProgressBarLayout(),
                    
                    // variants:
                    usesProgressBarVariants(),
                ]),
            ]),
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
    // forked from Bootstrap 5:
    const itemBackgOverlayImg = 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)';
    
    
    
    return {
        // backgrounds:
        itemBackgOverlayImg      :   itemBackgOverlayImg,
        itemBackgOverlay         : [[itemBackgOverlayImg, 'left/1rem 1rem'      ]],
        itemBackgOverlaySm       : [[itemBackgOverlayImg, 'left/0.25rem 0.25rem']],
        itemBackgOverlayLg       : [[itemBackgOverlayImg, 'left/3rem 3rem'      ]],
        
        
        
        // sizes:
        minInlineSize            : 'unset', // fills the entire parent's width:
        minBlockSize             : 'auto',  // depends on ProgressBar's height
        
        minInlineSizeBlock       : 'auto',  // depends on ProgressBar's width
        minBlockSizeBlock        : '10rem', // manually set the min height
        
        
        
        itemBoxSizing            : 'border-box', // the final size is including borders & paddings
        
        itemMinInlineSize        : 'unset',
        itemMinBlockSize         : spacers.md,
        itemMinBlockSizeSm       : spacers.xs,
        itemMinBlockSizeLg       : spacers.xl,
        
        itemMinBlockSizeBlock    : 'unset',
        itemMinInlineSizeBlock   : spacers.md,
        itemMinInlineSizeBlockSm : spacers.xs,
        itemMinInlineSizeBlockLg : spacers.xl,
        
        
        
        // spacings:
        itemPaddingInline        : 0,
        itemPaddingBlock         : 0,
    };
}, { prefix: 'prgs' });



// utilities:
const calculateValues = <TElement extends HTMLElement = HTMLElement>(props: ProgressBarProps<TElement>) => {
    // fn props:
    const valueFn    : number  = parseNumber(props.value)  ?? 0;
    const minFn      : number  = parseNumber(props.min)    ?? 0;
    const maxFn      : number  = parseNumber(props.max)    ?? 100;
    const negativeFn : boolean = (maxFn < minFn);
    const valueRatio : number  = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    return {
        valueFn,
        minFn,
        maxFn,
        negativeFn,
        valueRatio,
    };
}



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
    const sheet    = useProgressSheet();
    const barSheet = useProgressBarSheet();
    
    
    
    // rest props:
    const {
        // children:
        children,
    /*...restProps*/}  = props;
    
    
    
    // variants:
    const orientationVariant  = useOrientationVariant(props);
    const orientationVertical = (orientationVariant.class === 'block');
    
    
    
    // progressBar vars:
    const [, , progressBarVarDecls] = usesProgressBarVars();
    
    
    
    // jsx fn props:
    const remainingValueRatio = 1 - Math.min((
        (Array.isArray(children) ? children : [children]).map((child) => {
            // <ProgressBar> component:
            if (isTypeOf(child, ProgressBar)) {
                // fn props:
                const { valueRatio } = calculateValues(child.props);
                return valueRatio;
            }// if
            
            
            
            // other component:
            return 0;
        })
        .reduce((accum, valueRatio) => accum + valueRatio) // sum
    ), 1);
    const restProgressBar = (
        <Element
            // semantics:
            aria-hidden={true} // just a dummy element, no meaningful content here
            
            
            // classes:
            mainClass={barSheet.main}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [progressBarVarDecls.progressBarValueRatio]: remainingValueRatio,
            }}
        ></Element>
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null] }
            semanticRole={props.semanticRole ?? 'group'}
            
            aria-orientation={props['aria-orientation'] ?? (orientationVertical ? 'vertical' : 'horizontal')}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
        >
            { orientationVertical ? restProgressBar : null }
            { orientationVertical ? (Array.isArray(children) ? children : [children]).slice().reverse() : children }
            { orientationVertical ? null : restProgressBar }
        </Basic>
    );
}

export type { OrientationName, OrientationVariant }



export interface ProgressBarProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>,
        
        // appearances:
        ProgressBarVariant
{
    // values:
    value?    : string | number
    min?      : string | number
    max?      : string | number
}
export function ProgressBar<TElement extends HTMLElement = HTMLElement>(props: ProgressBarProps<TElement>) {
    // styles:
    const sheet              = useProgressBarSheet();
    
    
    
    // variants:
    const progressBarVariant = useProgressBarVariant(props);
    
    
    
    // fn props:
    const {
        valueFn,
        minFn,
        maxFn,
        negativeFn,
        valueRatio,
    } = calculateValues(props);
    
    
    
    // progressBar vars:
    const [, , progressBarVarDecls] = usesProgressBarVars();
    
    
    
    // jsx:
    return (
        <Element
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]       }
            semanticRole={props.semanticRole ?? 'progressbar'}
            
            
            aria-valuenow={props['aria-valuenow'   ] ?? valueFn}
            aria-valuemin={props['aria-valuemin'   ] ?? (negativeFn ? maxFn : minFn)}
            aria-valuemax={props['aria-valuemax'   ] ?? (negativeFn ? minFn : maxFn)}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [progressBarVarDecls.progressBarValueRatio]: valueRatio,
            }}
            variantClasses={[...(props.variantClasses ?? []),
                progressBarVariant.class,
            ]}
        >
            <Basic<TElement>
                // other props:
                {...props}
                
                
                // variants:
                mild={props.mild ?? false}
            />
        </Element>
    );
}
