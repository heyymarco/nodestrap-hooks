// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import type {
    DictionaryOf,
}                           from './types'       // cssfn's types
import type {
    PropEx,
}                           from './css-types'   // ts defs support for jss
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
    states,
    rule,
    
    
    
    // utilities:
    solidBackg,
    pascalCase,
}                           from './cssfn'       // cssfn core
import {
    // react hooks:
    createUseCssfnStyle,
    
    // react components:
    ElementProps,
    Element,
}                           from '../libs/react-cssfn' // cssfn for react
import {
    createCssVar,
    fallbacks,
}                           from './css-var'
import {
    createCssConfig,
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import
    colors,
    * as color              from './colors'      // configurable colors & theming defs
import
    borders,
    * as border             from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

//#region themes
export interface ThemeVars {
    /**
     * themed foreground color.
     */
    foregTh          : any
    
    /**
     * themed background.
     */
    backgTh          : any
    
    /**
     * themed border color.
     */
    borderTh         : any
    
    /**
     * themed foreground color - at outlined variant.
     */
    outlinedForegTh  : any
    
    /**
     * themed foreground color - at mild variant.
     */
    mildForegTh      : any
    
    /**
     * themed background - at mild variant.
     */
    mildBackgTh      : any
    
    /**
     * focused themed box-shadow color.
     */
    boxShadowFocusTh : any
}
/**
 * Uses color definitions *for each* `themeOptions()`.
 * @returns An `[]` represents the color definitions *for each* `themeOptions()`.
 */
const [themeRefs, themeDecls] = createCssVar<ThemeVars>();
export const usesThemes = (factory = themeOf, options = themeOptions()) => {
    return [
        () => composition([
            rules([
                options.map((theme) => () => rule(
                    `.th${pascalCase(theme)}`,
                    factory(theme)
                )),
            ]),
        ]),
        themeRefs,
        themeDecls,
    ] as const;
};
/**
 * Creates a color definition for the specified `theme`.
 * @param theme The given theme name written in camel case.
 * @returns A `Style` represents the color definition for the given `theme`.
 */
export const themeOf = (theme: string) => composition([
    vars({
        [themeDecls.foregTh]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`],   // light on dark backg | dark on light backg
        [themeDecls.backgTh]          : (colors as DictionaryOf<typeof colors>)[theme],
        [themeDecls.borderTh]         : (colors as DictionaryOf<typeof colors>)[`${theme}Bold`],   // 20% background + 80% page's foreground
        [themeDecls.outlinedForegTh]  : themeRefs.backgTh,
        [themeDecls.mildForegTh]      : themeRefs.borderTh,
        [themeDecls.mildBackgTh]      : (colors as DictionaryOf<typeof colors>)[`${theme}Mild`],   // // 20% background + 80% page's background
        [themeDecls.boxShadowFocusTh] : (colors as DictionaryOf<typeof colors>)[`${theme}Thin`],
    }),
]);
/**
 * Gets the all available theme options.
 * @returns A `string[]` represents the all available theme options.
 */
export const themeOptions = (): string[] => Object.keys(color.themes);

export const themeDefault = (theme: string|null = null) => {
    if (theme) return themeIf(theme);
    
    
    
    const [, foregRefs, foregDecls] = usesForeg();
    const [, backgRefs, backgDecls] = usesBackg();
    const [, , borderDecls        ] = usesBorder();
    const [, , outlinedDecls      ] = usesOutlined();
    const [, , mildDecls          ] = usesMild();
    const [, , boxShadowFocusDecls] = usesBoxShadowFocus();
    return composition([
        vars({
            [foregDecls.foregIf]                   : cssProps.foreg,
            [backgDecls.backgIf]                   : 'transparent',
            [borderDecls.borderIf]                 : cssProps.borderColor,
            [outlinedDecls.outlinedForegIf]        : foregRefs.foregIf,
            [mildDecls.mildForegIf]                : foregRefs.foregIf,
            [mildDecls.mildBackgIf]                : backgRefs.backgIf,
            [boxShadowFocusDecls.boxShadowFocusIf] : colors.secondaryThin,
        }),
    ]);
};
/**
 * Creates a conditional color definition for the specified `theme`.
 * @param theme The theme name written in camel case.
 * @returns A `Style` represents the conditional color definition for the specified `theme`.
 */
export const themeIf = (theme: string) => {
    const [, , foregDecls           ] = usesForeg();
    const [, backgRefs , backgDecls ] = usesBackg();
    const [, borderRefs, borderDecls] = usesBorder();
    const [, , outlinedDecls        ] = usesOutlined();
    const [, , mildDecls            ] = usesMild();
    const [, , boxShadowFocusDecls  ] = usesBoxShadowFocus();
    return composition([
        vars({
            [foregDecls.foregIf]                   : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
            [backgDecls.backgIf]                   : (colors as DictionaryOf<typeof colors>)[theme],
            [borderDecls.borderIf]                 : (colors as DictionaryOf<typeof colors>)[`${theme}Bold`], // 20% background + 80% page's foreground
            [outlinedDecls.outlinedForegIf]        : backgRefs.backgIf,
            [mildDecls.mildForegIf]                : borderRefs.borderIf,
            [mildDecls.mildBackgIf]                : (colors as DictionaryOf<typeof colors>)[`${theme}Mild`], // 20% background + 80% page's background
            [boxShadowFocusDecls.boxShadowFocusIf] : (colors as DictionaryOf<typeof colors>)[`${theme}Thin`],
        }),
    ]);
};
/**
 * Creates an important conditional color definition for the specified `theme`.
 * @param theme The theme name written in camel case.
 * @returns A `Style` represents the important conditional color definition for the specified `theme`.
 */
export const themeIfIf = (theme: string) => {
    const [, , foregDecls           ] = usesForeg();
    const [, backgRefs , backgDecls ] = usesBackg();
    const [, borderRefs, borderDecls] = usesBorder();
    const [, , outlinedDecls        ] = usesOutlined();
    const [, , mildDecls            ] = usesMild();
    const [, , boxShadowFocusDecls  ] = usesBoxShadowFocus();
    return composition([
        vars({
            [foregDecls.foregIfIf]                   : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
            [backgDecls.backgIfIf]                   : (colors as DictionaryOf<typeof colors>)[theme],
            [borderDecls.borderIfIf]                 : (colors as DictionaryOf<typeof colors>)[`${theme}Bold`], // 20% background + 80% page's foreground
            [outlinedDecls.outlinedForegIfIf]        : backgRefs.backgIfIf,
            [mildDecls.mildForegIfIf]                : borderRefs.borderIfIf,
            [mildDecls.mildBackgIfIf]                : (colors as DictionaryOf<typeof colors>)[`${theme}Mild`], // 20% background + 80% page's background
            [boxShadowFocusDecls.boxShadowFocusIfIf] : (colors as DictionaryOf<typeof colors>)[`${theme}Thin`],
        }),
    ]);
};
//#endregion themes

//#region sizes
export interface SizeVars {
    // empty (might be added soon)
}
const [sizeRefs, sizeDecls] = createCssVar<SizeVars>();
/**
 * Creates sizing definitions *for each* `sizeOptions()`.
 * @returns A `[]` represents the sizing definitions *for each* `sizeOptions()`.
 */
export const usesSizes = (factory = sizeOf, options = sizeOptions()) => {
    return [
        () => composition([
            rules([
                options.map((size) => () => rule(
                    `.sz${pascalCase(size)}`,
                    factory(size)
                )),
            ]),
        ]),
        sizeRefs,
        sizeDecls,
    ] as const;
};
/**
 * Creates a sizing definition for the specified `size`.
 * @param size The given size name written in camel case.
 * @returns A `Style` represents the sizing definition for the given `size`.
 */
export const sizeOf = (size: string) => composition([
    layout({
        // overwrites propName = propName{Size}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, size)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `string[]` represents the all available size options.
 */
export const sizeOptions = (): string[] => ['sm', 'lg'];
//#endregion sizes


//#region gradient
export interface GradientVars {
    backgGradTg : any
}
const [gradientRefs, gradientDecls] = createCssVar<GradientVars>();
export const usesGradient = (off = noGradient, on = isGradient) => {
    return [
        () => composition([
            rules([
                rule(':not(.gradient)' , off(/*inherit =*/true)),
                rule(     '.gradient'  , on()                  ),
            ]),
        ]),
        gradientRefs,
        gradientDecls,
    ] as const;
};
/**
 * Creates a no gradient definition when the gradient variant is disabled.
 * @returns A `Style` represents the no gradient definition.
 */
export const noGradient = (inherit = false) => composition([
    vars({
        // *toggle off* the background gradient prop:
        [gradientDecls.backgGradTg]     : inherit ? 'unset' : 'initial',
    }),
]);
/**
 * Creates a gradient definition when the gradient variant is enabled.
 * @returns A `Style` represents the gradient definition.
 */
export const isGradient = () => composition([
    vars({
        // *toggle on* the background gradient prop:
        [gradientDecls.backgGradTg]     : cssProps.backgGrad,
    }),
]);
//#endregion gradient

//#region outlined
export interface OutlinedVars {
    /**
     * conditional foreground color - at outlined variant.
     */
    outlinedForegIfIf : any

    /**
     * conditional unthemed foreground color - at outlined variant.
     */
    outlinedForegIf   : any

    /**
     * functional foreground color - at outlined variant.
     */
    outlinedForegFn   : any

    /**
     * toggles *on* foreground color - at outlined variant.
     */
    outlinedForegTg   : any



    /**
     * functional backgrounds - at outlined variant.
     */
    outlinedBackgFn : any

    /**
     * toggles *on* backgrounds - at outlined variant.
     */
    outlinedBackgTg : any
}
const [outlinedRefs, outlinedDecls] = createCssVar<OutlinedVars>();
export const usesOutlined = (off = noOutlined, on = isOutlined) => {
    // dependencies:
    const [themes, themeRefs] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                themes,
            ]),
            rules([
                // grandpa ??? .outlined and parent not .outlined and current not .outlined:
                rule(                     ':not(.outlined)&:not(.outlined)' , off(/*inherit =*/false)), // can't inherit, because outlined() uses dedicated color theme

                // grandpa iss .outlined or  parent is  .outlined or  current is  .outlined:
                // double `.outlined.outlined` to combat with `:not(.outlined)&:not(.outlined)`
                rule(['.outlined.outlined &',  '.outlined&',  '&.outlined'] , on()                   ),
            ]),
            vars({
                [outlinedDecls.outlinedForegFn]: fallbacks(
                    outlinedRefs.outlinedForegIfIf, // first  priority
                       themeRefs.outlinedForegTh,   // second priority
                    outlinedRefs.outlinedForegIf,   // third  priority
                ),
        
                [outlinedDecls.outlinedBackgFn]: 'transparent',
            }),
        ]),
        outlinedRefs,
        outlinedDecls,
    ] as const;
};
/**
 * Creates a no outlined definition when the outlined variant is disabled.
 * @returns A `Style` represents the no outlined definition.
 */
export const noOutlined = (inherit = false) => composition([
    vars({
        // *toggle off* the outlined props:
        [outlinedDecls.outlinedForegTg] : inherit ? 'unset' : 'initial',
        [outlinedDecls.outlinedBackgTg] : inherit ? 'unset' : 'initial',
    }),
]);
/**
 * Creates an outlined definition when the outlined variant is enabled.
 * @returns A `Style` represents the outlined definition.
 */
export const isOutlined = () => {
    const [outlined, outlinedRefs] = usesOutlined();

    
    
    return composition([
        rules([
            outlined,
        ]),
        layout({
            // *toggle on* the outlined props:
            [outlinedDecls.outlinedForegTg] : outlinedRefs.outlinedForegFn,
            [outlinedDecls.outlinedBackgTg] : outlinedRefs.outlinedBackgFn,
        }),
    ]);
};
//#endregion outlined

//#region mild
export interface MildVars {
    /**
     * conditional foreground color - at mild variant.
     */
    mildForegIfIf : any

    /**
     * conditional unthemed foreground color - at mild variant.
     */
    mildForegIf   : any

    /**
     * functional foreground color - at mild variant.
     */
    mildForegFn   : any

    /**
     * toggles *on* foreground color - at mild variant.
     */
    mildForegTg   : any
    
    
    
    /**
     * conditional background - at mild variant.
     */
    mildBackgIfIf : any

    /**
     * conditional unthemed background - at mild variant.
     */
    mildBackgIf   : any

    /**
     * functional backgrounds - at mild variant.
     */
    mildBackgFn   : any

    /**
     * toggles *on* backgrounds - at mild variant.
     */
    mildBackgTg   : any
}
const [mildRefs, mildDecls] = createCssVar<MildVars>();
export const usesMild = (off = noMild, on = isMild) => {
    // dependencies:
    const [themes, themeRefs] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                themes,
            ]),
            rules([
                // grandpa's .mild does not affect the .mild
                // parent not .mild and current not .mild:
                rule(':not(.mild)&:not(.mild)' , off(/*inherit =*/false)), // can't inherit, because mild() uses dedicated color theme
                
                // parent is  .mild or  current is  .mild:
                rule([    '.mild&',  '&.mild'] , on()                   ),
            ]),
            vars({
                [mildDecls.mildForegFn]: fallbacks(
                     mildRefs.mildForegIfIf, // first  priority
                    themeRefs.mildForegTh,   // second priority
                     mildRefs.mildForegIf,   // third  priority
                ),
        
                [mildDecls.mildBackgFn]: fallbacks(
                     mildRefs.mildBackgIfIf, // first  priority
                    themeRefs.mildBackgTh,   // second priority
                     mildRefs.mildBackgIf,   // third  priority
                ),
            }),
        ]),
        mildRefs,
        mildDecls,
    ] as const;
};
/**
 * Creates a no mild definition when the mild variant is disabled.
 * @returns A `Style` represents the no mild definition.
 */
export const noMild = (inherit = false) => composition([
    vars({
        // *toggle off* the mild props:
        [mildDecls.mildForegTg] : inherit ? 'unset' : 'initial',
        [mildDecls.mildBackgTg] : inherit ? 'unset' : 'initial',
    }),
]);
/**
 * Creates a mild definition when the mild variant is enabled.
 * @returns A `Style` represents the mild definition.
 */
export const isMild = () => composition([
    layout({
        // *toggle on* the mild props:
        [mildDecls.mildForegTg] : mildRefs.mildForegFn,
        [mildDecls.mildBackgTg] : mildRefs.mildBackgFn,
    }),
]);
//#endregion mild


//#region foreg
export interface ForegVars {
    /**
     * conditional foreground color.
     */
    foregIfIf : any

    /**
     * conditional unthemed foreground color.
     */
    foregIf   : any

    /**
     * functional foreground color.
     */
    foregFn   : any

    /**
     * final foreground color.
     */
    foreg     : any
}
const [foregRefs, foregDecls] = createCssVar<ForegVars>();
export const usesForeg = () => {
    // dependencies:
    const [themes  , themeRefs   ] = usesThemes();
    const [outlined, outlinedRefs] = usesOutlined();
    const [mild    , mildRefs    ] = usesMild();
    
    
    
    return [
        () => composition([
            imports([
                themes,
                outlined,
                mild,
            ]),
            vars({
                [foregDecls.foregFn]: fallbacks(
                    foregRefs.foregIfIf, // first  priority
                    themeRefs.foregTh,   // second priority
                    foregRefs.foregIf,   // third  priority
                ),
        
                // define a final *foreground* color func:
                [foregDecls.foreg]: fallbacks(
                    outlinedRefs.outlinedForegTg, // toggle outlined
                    mildRefs.mildForegTg,         // toggle mild
                    foregRefs.foregFn,
                ),
            }),
        ]),
        foregRefs,
        foregDecls,
    ] as const;
};
//#endregion foreg

//#region backg
export interface BackgVars {
    /**
     * none background.
     */
    backgNone   : any
    
    /**
     * conditional background.
     */
    backgIfIf   : any
    
    /**
     * conditional unthemed background.
     */
    backgIf     : any
    
    /**
     * functional backgrounds.
     */
    backgFn     : any
    
    /**
     * toggles background gradient.
     */
    backgGradTg : any
    
    /**
     * final background color.
     */
    backgCol    : any
    
    /**
     * final background color as solid background.
     */
    backgSol    : any
    
    /**
     * final backgrounds.
     */
    backg       : any
}
const [backgRefs, backgDecls] = createCssVar<BackgVars>();
export const usesBackg = () => {
    // dependencies:
    const [themes  , themeRefs   ] = usesThemes();
    const [outlined, outlinedRefs] = usesOutlined();
    const [mild    , mildRefs    ] = usesMild();

    
    
    return [
        () => composition([
            imports([
                themes,
                outlined,
                mild,
            ]),
            vars({
                // define a *none* background:
                [backgDecls.backgNone]: solidBackg('transparent'),

                [backgDecls.backgFn]: fallbacks(
                    backgRefs.backgIfIf, // first  priority
                    themeRefs.backgTh,   // second priority
                    backgRefs.backgIf,   // third  priority
                ),
        
                // define a final *background* color func:
                [backgDecls.backgCol]: fallbacks(
                    outlinedRefs.outlinedBackgTg, // toggle outlined
                    mildRefs.mildBackgTg,         // toggle mild
                    backgRefs.backgFn,
                ),
                [backgDecls.backgSol]: solidBackg(backgRefs.backgCol),
                // define a final *backgrounds* func:
                [backgDecls.backg]: [
                    // top layer:
                    fallbacks(
                        backgRefs.backgGradTg,
                        backgRefs.backgNone,
                    ),
        
                    // middle layer:
                    backgRefs.backgSol,
        
                    // bottom layer:
                    cssProps.backg,
                ],
            }),
        ]),
        backgRefs,
        backgDecls,
    ] as const;
};
//#endregion backg

//#region border
export interface BorderVars {
    /**
     * conditional border color.
     */
    borderIfIf : any

    /**
     * conditional unthemed border color.
     */
    borderIf   : any

    /**
     * functional border color.
     */
    borderFn   : any

    /**
     * final border color.
     */
    borderCol  : any
}
const [borderRefs, borderDecls] = createCssVar<BorderVars>();
export const usesBorder = () => {
    // dependencies:
    const [themes  , themeRefs   ] = usesThemes();
    const [outlined, outlinedRefs] = usesOutlined();
    
    
    
    return [
        () => composition([
            imports([
                themes,
                outlined,
            ]),
            vars({
                [borderDecls.borderFn]: fallbacks(
                    borderRefs.borderIfIf, // first  priority
                     themeRefs.borderTh,   // second priority
                    borderRefs.borderIf,   // third  priority
                ),
                
                // define a final *border* color func:
                [borderDecls.borderCol] : fallbacks(
                    outlinedRefs.outlinedForegTg, // toggle outlined
                      borderRefs.borderFn
                ),
            }),
        ]),
        borderRefs,
        borderDecls,
    ] as const;
};
//#endregion border


//#region boxShadow focus
export interface BoxShadowFocusVars {
    /**
     * Supports for Control
     */
    
    
    
    /**
     * none box shadow.
     */
    boxShadowNone      : any

    /**
     * focused conditional box-shadow color.
     */
    boxShadowFocusIfIf : any

    /**
     * focused conditional unthemed box-shadow color.
     */
    boxShadowFocusIf   : any

    /**
     * focused functional box-shadow color.
     */
    boxShadowFocusFn   : any

    /**
     * final box-shadow.
     */
    boxShadow          : any
}
const [boxShadowFocusRefs, boxShadowFocusDecls] = createCssVar<BoxShadowFocusVars>();
export const usesBoxShadowFocus = () => {
    // dependencies:
    const [themes  , themeRefs   ] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                themes,
            ]),
            vars({
                // define a *none* box shadow:
                [boxShadowFocusDecls.boxShadowNone] : [[0, 0, 'transparent']],

                [boxShadowFocusDecls.boxShadowFocusFn]: [[
                    cssProps.boxShadowFocus,      // box-shadow pos, width, spread, etc
        
                    // box-shadow color:
                    fallbacks(
                        boxShadowFocusRefs.boxShadowFocusIfIf, // first  priority
                                 themeRefs.boxShadowFocusTh,   // second priority
                        boxShadowFocusRefs.boxShadowFocusIf,   // third  priority
                    ),
                ]],
                
                // define a final *box-shadow* func:
                [boxShadowFocusDecls.boxShadow] : [ // single array => makes the JSS treat as comma separated values
                    cssProps.boxShadow,
                ],
            }),
        ]),
        boxShadowFocusRefs,
        boxShadowFocusDecls,
    ] as const;
};
//#endregion boxShadow focus

//#region animations
export interface AnimVars {
    /**
     * none filter.
     */
    filterNone    : any
    /**
     * final filter.
     */
    filter        : any

    /**
     * none transform.
     */
    transfNone    : any
    /**
     * final transform.
     */
    transf        : any

    /**
     * none animation.
     */
    animNone      : any
    /**
     * final animation.
     */
    anim          : any
}
const [animRefs, animDecls] = createCssVar<AnimVars>();
export const usesAnim = () => {
    return [
        () => composition([
            vars({
                // define a *none* filter:
                [animDecls.filterNone]    : 'brightness(100%)',
                // define a final *filter* func:
                [animDecls.filter]: [[ // double array => makes the JSS treat as space separated values
                    cssProps.filter,
                ]],
                
                // define a *none* transform:
                [animDecls.transfNone]    : 'translate(0)',
                // define a final *transform* func:
                [animDecls.transf]: [[ // double array => makes the JSS treat as space separated values
                    animRefs.transfNone,
                ]],
                
                // define a *none* animation:
                [animDecls.animNone]      : 'none',
                // define a final *animation* func:
                [animDecls.anim]      : [ // single array => makes the JSS treat as comma separated values
                    cssProps.anim,
                ],
            }),
        ]),
        animRefs,
        animDecls,
    ] as const;
};
//#endregion animations



export const useBasicComponentStyle = createUseCssfnStyle(() => {
    const [themes]             = usesThemes();
    const [sizes]              = usesSizes();
    
    const [gradient]           = usesGradient();
    const [outlined]           = usesOutlined();
    const [mild]               = usesMild();
    
    const [foreg , foregRefs]  = usesForeg();
    const [backg , backgRefs]  = usesBackg();
    const [border, borderRefs] = usesBorder();
    
    const [anim  , animRefs]   = usesAnim();
    
    
    
    return [
        mainComposition([
            imports([
                themes,
                sizes,
                gradient,
                outlined,
                mild,
                foreg,
                backg,
                border,
                anim,
            ]),
            layout({
                // customize:
                ...usesGeneralProps(cssProps), // apply *general* cssProps
                
                // foregrounds:
                foreg       : foregRefs.foreg,
                
                // backgrounds:
                backg       : backgRefs.backg,
                
                // borders:
                borderColor : borderRefs.borderCol,
                
                // states & animations:
                filter      : animRefs.filter,
                anim        : animRefs.anim,
            }),
            states([
    
            ]),
        ]),
    ];
});



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const keyframesNone : PropEx.Keyframes = { };

    
    
    return {
        //#region typos
        fontSize          : typos.fontSizeNm,
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg        : typos.fontSizeMd,
        fontFamily        : 'inherit',
        fontWeight        : 'inherit',
        fontStyle         : 'inherit',
        textDecoration    : 'inherit',
        lineHeight        : 'inherit',
        //#endregion typos

        
        
        //#region foreg, backg, borders
        foreg             : 'currentColor',
        
        backg             : 'transparent',
        backgGrad         : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        
        border            : borders.default,
        borderColor       : borders.color,
        borderRadius      : border.radiuses.md,
        borderRadiusSm    : border.radiuses.sm,
        borderRadiusLg    : border.radiuses.lg,
        //#endregion foreg, backg, borders

        
        
        //#region spacings
        paddingInline     : [['calc((', spacers.sm, '+', spacers.md, ')/2)']],
        paddingBlock      : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']],
        paddingInlineSm   : spacers.sm,
        paddingBlockSm    : spacers.xs,
        paddingInlineLg   : spacers.md,
        paddingBlockLg    : spacers.sm,
        //#endregion spacings

        
        
        // appearances:
        opacity           : 1,


        
        //#region animations
        transition        : [
            ['color'      , '300ms', 'ease-out'],
            ['background' , '300ms', 'ease-out'],
            ['border'     , '300ms', 'ease-out'],
            ['inline-size', '300ms', 'ease-out'],
            ['block-size' , '300ms', 'ease-out'],
            ['font-size'  , '300ms', 'ease-out'],
            ['opacity'    , '300ms', 'ease-out'],
        ],

        // TODO: remove none...
        boxShadowNone     : [[0, 0, 'transparent']],
        boxShadow         : [[0, 0, 'transparent']],
        boxShadowFocus    : [[0, 0, 0, '0.25rem' ]], // supports for Control children's theming

        // TODO: remove none...
        filterNone        : 'brightness(100%)',
        filter            : 'brightness(100%)',

        '@keyframes none' : keyframesNone,
        // TODO: remove none...
        animNone          : [[keyframesNone]],
        anim              : [[keyframesNone]],
        //#endregion animations
    };
}, { prefix: 'bsc' });



// react hooks:

export interface VariantTheme {
    theme?: string
}
export function useVariantTheme(props: VariantTheme, themeDefault?: () => (string|undefined)) {
    const theme = props.theme ?? themeDefault?.();
    return {
        class: theme ? `th${pascalCase(theme)}` : null,
    };
}

export interface VariantSize {
    size?: 'sm' | 'lg' | string
}
export function useVariantSize(props: VariantSize) {
    return {
        class: props.size ? `sz${pascalCase(props.size)}` : null,
    };
}

export interface VariantGradient {
    gradient?: boolean
}
export function useVariantGradient(props: VariantGradient) {
    return {
        class: props.gradient ? 'gradient' : null,
    };
}

export interface VariantOutlined {
    outlined?: boolean
}
export function useVariantOutlined(props: VariantOutlined) {
    return {
        class: props.outlined ? 'outlined' : null,
    };
}

export interface VariantMild {
    mild?: boolean
}
export function useVariantMild(props: VariantMild) {
    return {
        class: props.mild ? 'mild' : null,
    };
}

export type OrientationStyle = 'block'|'inline'
export interface VariantOrientation {
    orientation?: OrientationStyle
}
export function useVariantOrientation(props: VariantOrientation) {
    return {
        class: props.orientation ? props.orientation : null,
    };
}



// react components:

export interface BasicComponentProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        VariantTheme,
        VariantSize,
        VariantGradient,
        VariantOutlined,
        VariantMild
{
}
export default function BasicComponent<TElement extends HTMLElement = HTMLElement>(props: BasicComponentProps<TElement>) {
    // styles:
    const styles       = useBasicComponentStyle();

    
    
    // variants:
    const variTheme    = useVariantTheme(props);
    const variSize     = useVariantSize(props);
    const variGradient = useVariantGradient(props);
    const variOutlined = useVariantOutlined(props);
    const variMild     = useVariantMild(props);



    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variTheme.class,
                variSize.class,
                variGradient.class,
                variOutlined.class,
                variMild.class,
            ]}
        />
    );
}
export { BasicComponent }
