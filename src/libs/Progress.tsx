// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // general types:
    StyleCollection,
    
    
    
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    states,
    
    
    
    //combinators:
    children,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
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

// nodestrap utilities:
import colors               from './colors'      // configurable colors & theming defs
import spacers              from './spacers'     // configurable spaces defs
import {
    // utilities:
    isTypeOf,
    parseNumber,
}                           from './utilities'

// nodestrap components:
import {
    // react components:
    Element,
}                           from './Element'
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
    
    ThemeName,
    usesThemeDefault as basicUsesThemeDefault,
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
    
    
    
    // configs:
    cssProps as bcssProps,
    cssDecls as bcssDecls,
    cssVals  as bcssVals,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // hooks:
    ListBasicStyle,
    
    
    
    // styles:
    listItemElm,
    usesListLayout,
    usesListBasicVariants,
}                           from './List'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;


// colors:

// change default parameter from `null` to 'primary':
export const usesThemeDefault = (themeName: ThemeName|null = 'primary') => basicUsesThemeDefault(themeName);

//#region alternate backg
export interface AltBackgVars {
    /**
     * functional alternate background color.
     */
    backgFn  : any
    /**
     * final alternate background color.
     */
    backgCol : any
    /**
     * final alternate background layers.
     */
    backg    : any
}
const [altBackgRefs, altBackgDecls] = createCssVar<AltBackgVars>();

/**
 * Uses alternate background layer(s).
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents alternate background layer(s) definitions.
 */
export const usesAltBackg = () => {
    // dependencies:
    const [, mildRefs    ] = usesMildVariant();
    
    
    
    return [
        () => style({
            ...vars({
                [altBackgDecls.backgFn ] : mildRefs.backgFn,
                [altBackgDecls.backgCol] : 'transparent',
                [altBackgDecls.backg   ] : [ // single array => makes the JSS treat as comma separated values
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // bottom layer:
                    altBackgRefs.backgCol,
                ],
            }),
            ...variants([
                notOutlined({
                    ...vars({
                        [altBackgDecls.backgCol] : colors.backg,
                    }),
                    ...variants([
                        notMild({
                            ...vars({
                                [altBackgDecls.backgCol] : altBackgRefs.backgFn,
                            }),
                        }),
                    ]),
                }),
            ]),
        }),
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
    valueRatio : any
}
const [progressBarVarRefs, progressBarVarDecls] = createCssVar<ProgressBarVars>({ minify: false }); // do not minify to make sure `style={{ --valueRatio: ... }}` is the same between in server (without `useProgressBarSheet` rendered) & client (with `useProgressBarSheet` rendered)

/**
 * Uses ProgressBar variables.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents ProgressBar variables definitions.
 */
export const usesProgressBarVars = () => {
    return [
        () => style({
            // no style yet
        }),
        progressBarVarRefs,
        progressBarVarDecls,
    ] as const;
};


// states:

//#region running
export interface RunningVars {
    anim : any
}
const [runningRefs, runningDecls] = createCssVar<RunningVars>();

// {
//     const [, , , propsManager] = usesAnim();
//     propsManager.registerAnim(runningRefs.anim);
// }

const selectorIsRunning  = '.running'
const selectorNotRunning = ':not(.running)'

export const isRunning  = (styles: StyleCollection) => rule(selectorIsRunning,  styles);
export const notRunning = (styles: StyleCollection) => rule(selectorNotRunning, styles);

/**
 * Uses running states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents running state definitions.
 */
export const usesRunningState = () => {
    return [
        () => style({
            ...states([
                notRunning({
                    ...vars({
                        [runningDecls.anim] : 'initial',
                    }),
                }),
                isRunning({
                    ...vars({
                        [runningDecls.anim] : cssProps.itemAnimRunning,
                    }),
                }),
            ]),
        }),
        runningRefs,
        runningDecls,
    ] as const;
};

export interface RunningState {
    // states:
    running? : boolean
}
export const useRunningState = (props: RunningState) => {
    return {
        class : (props.running ?? false) ? 'running' : null,
    };
};
//#endregion running


// appearances:

export type ProgressStyle = ListBasicStyle // might be added more styles in the future
export interface ProgressVariant {
    progressStyle?: ProgressStyle
}
export const useProgressVariant = (props: ProgressVariant) => {
    return {
        class: props.progressStyle ? props.progressStyle : null,
    };
};


export type ProgressBarStyle = 'striped' // might be added more styles in the future
export interface ProgressBarVariant {
    progressBarStyle?: ProgressBarStyle
}
export const useProgressBarVariant = (props: ProgressBarVariant) => {
    return {
        class: props.progressBarStyle ? props.progressBarStyle : null,
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
    
    
    
    return style({
        ...imports([
            // colors:
            usesThemeDefault(),
            altBackg(),
            
            // layouts:
            usesListLayout(options),
        ]),
        ...style({
            // layouts:
            ...rule(orientationBlockSelector,  { // block
                display    : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
            }),
            ...rule(orientationInlineSelector, { // inline
                display    : 'flex',        // use block flexbox, so it takes the entire parent's width
            }),
            justifyContent : 'start',       // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            
            
            
            // backgrounds:
            backg          : altBackgRefs.backg,
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            ...rule(orientationBlockSelector,  { // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
            }),
            ...rule(orientationInlineSelector, { // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
            }),
        }),
    });
};
export const usesProgressVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            usesListBasicVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};

export const useProgressSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesProgressLayout(),
            
            // variants:
            usesProgressVariants(),
        ]),
    ),
], /*sheetId :*/'vcm24axqvn'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesProgressBarInheritMildVariant = () => {
    return style({
        ...variants([
            rule('.mild>&', { // .mild>.progress => the specificity weight including parent = 2
                ...imports([
                    mildOf(true),
                ]),
            }),
        ]),
    });
};



export const usesProgressBarLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // range vars:
    const [progressBarVars , progressBarVarRefs] = usesProgressBarVars();
    
    
    
    return style({
        // sizes:
        flex     : [[progressBarVarRefs.valueRatio, progressBarVarRefs.valueRatio, 0]], // growable, shrinkable, initial from 0 width; using `valueRatio` for the grow/shrink ratio
        overflow : 'hidden',
        
        
        
        // children:
        ...children(listItemElm, {
            ...imports([
                // layouts:
                usesBasicLayout(),
                
                // progressBar vars:
                progressBarVars(),
            ]),
            ...style({
                // layouts:
                display        : 'flex',   // fills the entire wrapper's width
                flexDirection  : 'row',    // items are stacked horizontally
                justifyContent : 'center', // center items (text, icon, etc) horizontally
                alignItems     : 'center', // center items (text, icon, etc) vertically
                flexWrap       : 'nowrap', // no wrapping
                
                
                
                // borders:
                [borderStrokeDecls.borderWidth           ] : '0px', // discard border
                // remove rounded corners on top:
                [borderRadiusDecls.borderStartStartRadius] : '0px',
                [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                
                
                
                // sizes:
                flex : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
            }),
            ...vars({
                [bcssDecls.backgGrad] : cssProps.backgGrad,
            }),
        }),
    });
};
export const usesProgressBarVariants = () => {
    // dependencies:
    
    // colors:
    const [, backgRefs] = usesBackg();
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        // children:
        ...children(listItemElm, {
            ...imports([
                // variants:
                usesBasicVariants(),
                usesProgressBarInheritMildVariant(),
                
                // layouts:
                sizes(),
            ]),
        }),
        ...variants([
            rule('.striped', {
                // children:
                ...children(listItemElm, {
                    // backgrounds:
                    backg : [ // single array => makes the JSS treat as comma separated values
                        // top layer:
                        `${cssProps.itemBackgStrippedImg} left/${cssProps.itemBackgStrippedSize} ${cssProps.itemBackgStrippedSize}`,
                        
                        // bottom layer:
                        backgRefs.backg,
                    ],
                }),
            }),
        ]),
    });
};
export const usesProgressBarStates = () => {
    // dependencies:
    
    // states:
    const [running, runningRefs] = usesRunningState();
    
    
    
    return style({
        ...imports([
            // states:
            running(),
        ]),
        // children:
        ...children(listItemElm, {
            // animations:
            anim  : runningRefs.anim,
        }),
    });
};

export const useProgressBarSheet = createUseSheet(() => [
    mainComposition(
        rule('&&', { // makes `.ProgressBar` is more specific than `.Wrapper`
            ...imports([
                // layouts:
                usesProgressBarLayout(),
                
                // variants:
                usesProgressBarVariants(),
                
                // states:
                usesProgressBarStates(),
            ]),
        }),
    ),
], /*sheetId :*/'ymt3ybn64g'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesItemRunning      : PropEx.Keyframes = {
        from : {
            backgroundPositionX : ['1rem', 0],
        },
        to   : {
            backgroundPositionX : [0, 0],
        },
    };
    const keyframesItemRunningBlock : PropEx.Keyframes = {
        from : {
            backgroundPositionY : ['1rem', 0],
        },
        to   : {
            backgroundPositionY : [0, 0],
        },
    };
    //#endregion keyframes
    
    
    
    return {
        //#region animations
        '@keyframes itemRunning'      : keyframesItemRunning,
        '@keyframes itemRunningBlock' : keyframesItemRunningBlock,
        
        itemAnimRunning               : [['1000ms', 'linear', 'both', 'infinite', keyframesItemRunning]],
        itemAnimRunningBlock          : [['1000ms', 'linear', 'both', 'infinite', keyframesItemRunningBlock]],
        //#endregion animations
        
        
        
        // backgrounds:
        backgGrad                : bcssProps.backgGrad,
        backgGradBlock           : (() => {
            const value = [[...bcssVals.backgGrad[0]]];
            value[0][0] = value[0][0].replace('180deg', '270deg');
            return value;
        })(),
        
        
        
        itemBackgStrippedImg     : 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
        itemBackgStrippedSize    : '1rem',
        itemBackgStrippedSizeSm  : '0.25rem',
        itemBackgStrippedSizeLg  : '3rem',
        
        
        
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
        OrientationVariant,
        
        // appearances:
        ProgressVariant
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
    
    const progressVariant     = useProgressVariant(props);
    
    
    
    // progressBar vars:
    const [, , progressBarVarDecls] = usesProgressBarVars();
    
    
    
    // jsx fn props:
    const remainingValueRatio = 1 - Math.min((
        React.Children.toArray(children).map((child) => {
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
                [progressBarVarDecls.valueRatio]: remainingValueRatio,
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
                progressVariant.class,
            ]}
        >
            { orientationVertical ? restProgressBar : null }
            { orientationVertical ? React.Children.toArray(children).slice().reverse() : children }
            { orientationVertical ? null : restProgressBar }
        </Basic>
    );
}

export type { OrientationName, OrientationVariant }



export interface ProgressBarProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>,
        
        // states:
        RunningState,
        
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
    
    
    
    // states:
    const runningState       = useRunningState(props);
    
    
    
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
            variantClasses={[...(props.variantClasses ?? []),
                progressBarVariant.class,
            ]}
            stateClasses={[...(props.stateClasses ?? []),
                runningState.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [progressBarVarDecls.valueRatio]: valueRatio,
            }}
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
