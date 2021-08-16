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



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'lg'
export interface SizeVars {
    // empty (might be added soon)
}
const [sizeRefs, sizeDecls] = createCssVar<SizeVars>();
/**
 * Uses basic sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizes = (factory = sizeOf, options = sizeOptions()) => {
    return [
        () => composition([
            rules([
                options.map((sizeName) => rule(
                    `.sz${pascalCase(sizeName)}`,
                    factory(sizeName)
                )),
            ]),
        ]),
        sizeRefs,
        sizeDecls,
    ] as const;
};
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `Style` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName: SizeName) => composition([
    vars({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];

export interface VariantSize {
    size?: SizeName
}
export const useVariantSize = (props: VariantSize) => {
    const sizeName = props.size;
    return {
        class: sizeName ? `sz${pascalCase(sizeName)}` : null,
    };
};
//#endregion sizes

//#region orientation
export type OrientationName = 'block'|'inline'
export interface OrientationVars {
    /**
     * configured orientation.
     */
    orientation : any
}
const [orientationRefs, orientationDecls] = createCssVar<OrientationVars>();
/**
 * Uses configurable orientation.  
 * For example: `block`, `inline`.
 * @param factory Customize the callback to create orientation definitions for each orientation in `options`.
 * @param options Customize the orientation options.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents orientation definitions for each orientation in `options`.
 */
export const usesOrientation = (factory = orientationOf, options = orientationOptions()) => {
    return [
        () => composition([
            rules([
                options.map((orientationName) => rule(
                    `.${orientationName}`,
                    factory(orientationName)
                )),
            ]),
        ]),
        orientationRefs,
        orientationDecls,
    ] as const;
};
/**
 * Creates orientation definitions for the given `orientationName`.
 * @param orientationName The given orientation name written in camel case.
 * @returns A `Style` represents orientation definitions for the given `orientationName`.
 */
export const orientationOf = (orientationName: OrientationName) => composition([
    layout({
        display: orientationName,
    }),
    vars({
        [orientationDecls.orientation]: orientationName,
    }),
]);
/**
 * Gets the all available orientation options.
 * @returns A `OrientationName[]` represents the all available orientation options.
 */
export const orientationOptions = (): OrientationName[] => ['block', 'inline'];

export interface VariantOrientation {
    orientation?: OrientationName
}
export const useVariantOrientation = (props: VariantOrientation) => {
    return {
        class: props.orientation ? props.orientation : null,
    };
};
//#endregion orientation


// colors:

//#region themes
export type ThemeName = (keyof typeof color.themes)
export interface ThemeVars {
    /**
     * themed foreground color.
     */
    foregTh            : any
    /**
     * themed background color.
     */
    backgTh            : any
    /**
     * themed border color.
     */
    borderTh           : any
    
    /**
     * themed foreground color - at outlined variant.
     */
    outlinedForegTh    : any
    
    /**
     * themed foreground color - at mild variant.
     */
    mildForegTh        : any
    /**
     * themed background color - at mild variant.
     */
    mildBackgTh        : any
    
    /**
     * themed boxShadow color - at focused state.
     */
    focusBoxShadowTh   : any
    
    
    
    /**
     * conditional unthemed foreground color.
     */
    foregIf            : any
    /**
     * conditional unthemed background color.
     */
    backgIf            : any
    /**
     * conditional unthemed border color.
     */
    borderIf           : any
    
    /**
     * conditional unthemed foreground color - at outlined variant.
     */
    outlinedForegIf    : any
    
    /**
     * conditional unthemed foreground color - at mild variant.
     */
    mildForegIf        : any
    /**
     * conditional unthemed background color - at mild variant.
     */
    mildBackgIf        : any
    
    /**
     * conditional unthemed boxShadow color - at focused state.
     */
    focusBoxShadowIf   : any
    
    
    
    /**
     * important conditional unthemed foreground color.
     */
    foregIfIf          : any
    /**
     * important conditional unthemed background color.
     */
    backgIfIf          : any
    /**
     * important conditional unthemed border color.
     */
    borderIfIf         : any
    
    /**
     * important conditional unthemed foreground color - at outlined variant.
     */
    outlinedForegIfIf  : any
    
    /**
     * important conditional unthemed foreground color - at mild variant.
     */
    mildForegIfIf      : any
    /**
     * important conditional unthemed background color - at mild variant.
     */
    mildBackgIfIf      : any
    
    /**
     * important conditional unthemed boxShadow color - at focused state.
     */
    focusBoxShadowIfIf : any
}
const [themeRefs, themeDecls] = createCssVar<ThemeVars>();
/**
 * Uses theme colors.  
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export const usesThemes = (factory = themeOf, options = themeOptions()) => {
    return [
        () => composition([
            rules([
                options.map((themeName) => rule(
                    `.th${pascalCase(themeName)}`,
                    factory(themeName)
                )),
            ]),
        ]),
        themeRefs,
        themeDecls,
    ] as const;
};
/**
 * Creates color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `Style` represents color definitions for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName) => composition([
    vars({
        [themeDecls.foregTh]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgTh]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderTh]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        [themeDecls.outlinedForegTh]  : themeRefs.backgTh,
        [themeDecls.mildForegTh]      : themeRefs.borderTh,
        [themeDecls.mildBackgTh]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        [themeDecls.focusBoxShadowTh] : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
/**
 * Gets the all available theme options.
 * @returns A `ThemeName[]` represents the all available theme options.
 */
export const themeOptions = () => Object.keys(color.themes) as ThemeName[];

/**
 * Creates the default color definitions for unspecified `themeName`.
 * @param themeName The theme name as the default, written in camel case -or- `null`.
 * @returns A `Style` represents color definitions for the default `themeName`.
 */
export const themeDefault = (themeName: ThemeName|null = null) => {
    if (themeName) return themeIf(themeName);
    
    
    
    return composition([]);
};
/**
 * Creates a conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `Style` represents the conditional color definitions for the given `themeName`.
 */
export const themeIf = (themeName: ThemeName) => {
    return composition([
        vars({
            [themeDecls.foregIf]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
            [themeDecls.backgIf]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
            [themeDecls.borderIf]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
            
            [themeDecls.outlinedForegIf]  : themeRefs.backgIf,
            
            [themeDecls.mildForegIf]      : themeRefs.borderIf,
            [themeDecls.mildBackgIf]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
            
            [themeDecls.focusBoxShadowIf] : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
        }),
    ]);
};
/**
 * Creates an important conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `Style` represents the important conditional color definitions for the given `themeName`.
 */
export const themeIfIf = (themeName: ThemeName) => {
    return composition([
        vars({
            [themeDecls.foregIfIf]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
            [themeDecls.backgIfIf]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
            [themeDecls.borderIfIf]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
            [themeDecls.outlinedForegIfIf]  : themeRefs.backgIfIf,
            [themeDecls.mildForegIfIf]      : themeRefs.borderIfIf,
            [themeDecls.mildBackgIfIf]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
            [themeDecls.focusBoxShadowIfIf] : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
        }),
    ]);
};

export interface VariantTheme {
    theme?: ThemeName
}
export const useVariantTheme = (props: VariantTheme, themeDefault?: ThemeName) => {
    const themeName = props.theme ?? themeDefault;
    return {
        class: themeName ? `th${pascalCase(themeName)}` : null,
    };
};
//#endregion themes

//#region gradient
export interface GradientVars {
    /**
     * toggles on background gradient - at gradient variant.
     */
    backgGradTg : any
}
const [gradientRefs, gradientDecls] = createCssVar<GradientVars>();
/**
 * Uses toggleable gradient.
 * @param off Customize the callback to create gradient definitions when *toggled off*.
 * @param on Customize the callback to create gradient definitions when *toggled on*.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents toggleable gradient definitions.
 */
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
 * Creates gradient definitions when *toggled off*.
 * @returns A `Style` represents gradient definitions when *toggled off*.
 */
export const noGradient = (inherit = false) => composition([
    vars({
        // *toggle off* the background gradient prop:
        [gradientDecls.backgGradTg] : inherit ? 'unset' : 'initial',
    }),
]);
/**
 * Creates gradient definitions when *toggled on*.
 * @returns A `Style` represents gradient definitions when *toggled on*.
 */
export const isGradient = () => composition([
    vars({
        // *toggle on* the background gradient prop:
        [gradientDecls.backgGradTg] : cssProps.backgGrad,
    }),
]);

export interface VariantGradient {
    gradient?: boolean
}
export const useVariantGradient = (props: VariantGradient) => {
    return {
        class: props.gradient ? 'gradient' : null,
    };
};
//#endregion gradient

//#region outlined
export interface OutlinedVars {
    /**
     * functional foreground color - at outlined variant.
     */
    outlinedForegFn : any
    /**
     * toggles on foreground color - at outlined variant.
     */
    outlinedForegTg : any
    
    
    
    /**
     * functional background color - at outlined variant.
     */
    outlinedBackgFn : any
    /**
     * toggles on background color - at outlined variant.
     */
    outlinedBackgTg : any
}
const [outlinedRefs, outlinedDecls] = createCssVar<OutlinedVars>();
/**
 * Uses toggleable outlining.
 * @param off Customize the callback to create outlining definitions when *toggled off*.
 * @param on Customize the callback to create outlining definitions when *toggled on*.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents toggleable outlining definitions.
 */
export const usesOutlined = (off = noOutlined, on = isOutlined) => {
    // dependencies:
    const [themes, themeRefs] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                // `usesOutlined()` implicitly `usesThemes()`
                // `usesOutlined()` requires `usesThemes()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themes,
            ]),
            rules([
                // grandpa ?? `.outlined` and parent not `.outlined` and current not `.outlined`:
                rule(                     ':not(.outlined)&:not(.outlined)' , off(/*inherit =*/false)), // can't inherit from grandpa, because `usesOutlined()` uses dedicated theme
                
                // grandpa is `.outlined` or  parent is  `.outlined` or  current is  `.outlined`:
                // double `.outlined.outlined` to combat with `:not(.outlined)&:not(.outlined)`
                rule(['.outlined.outlined &',  '.outlined&',  '&.outlined'] , on()                   ),
            ]),
            vars({
                [outlinedDecls.outlinedForegFn] : fallbacks(
                    themeRefs.outlinedForegIfIf, // first  priority
                    themeRefs.outlinedForegTh,   // second priority
                    themeRefs.outlinedForegIf,   // third  priority
                    
                    cssProps.foreg,              // default => uses config's foreground
                ),
                
                [outlinedDecls.outlinedBackgFn] : 'transparent', // set background to transparent, regardless of the theme colors
            }),
        ]),
        outlinedRefs,
        outlinedDecls,
    ] as const;
};
/**
 * Creates outlining definitions when *toggled off*.
 * @returns A `Style` represents outlining definitions when *toggled off*.
 */
export const noOutlined = (inherit = false) => composition([
    vars({
        // *toggle off* the outlined props:
        [outlinedDecls.outlinedForegTg] : inherit ? 'unset' : 'initial',
        [outlinedDecls.outlinedBackgTg] : inherit ? 'unset' : 'initial',
    }),
]);
/**
 * Creates outlining definitions when *toggled on*.
 * @returns A `Style` represents outlining definitions when *toggled on*.
 */
export const isOutlined = () => composition([
    vars({
        // *toggle on* the outlined props:
        [outlinedDecls.outlinedForegTg] : outlinedRefs.outlinedForegFn,
        [outlinedDecls.outlinedBackgTg] : outlinedRefs.outlinedBackgFn,
    }),
]);

export interface VariantOutlined {
    outlined?: boolean
}
export const useVariantOutlined = (props: VariantOutlined) => {
    return {
        class: props.outlined ? 'outlined' : null,
    };
};
//#endregion outlined

//#region mild
export interface MildVars {
    /**
     * functional foreground color - at mild variant.
     */
    mildForegFn : any
    /**
     * toggles on foreground color - at mild variant.
     */
    mildForegTg : any
    
    
    
    /**
     * functional background color - at mild variant.
     */
    mildBackgFn : any
    /**
     * toggles on background color - at mild variant.
     */
    mildBackgTg : any
}
const [mildRefs, mildDecls] = createCssVar<MildVars>();
/**
 * Uses toggleable mildification.
 * @param off Customize the callback to create mildification definitions when *toggled off*.
 * @param on Customize the callback to create mildification definitions when *toggled on*.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export const usesMild = (off = noMild, on = isMild) => {
    // dependencies:
    const [themes, themeRefs] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                // `usesMild()` implicitly `usesThemes()`
                // `usesMild()` requires `usesThemes()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themes,
            ]),
            rules([
                // by design: grandpa's `.mild` does not affect current `.mild`
                // parent not `.mild` and current not `.mild`:
                rule(':not(.mild)&:not(.mild)' , off(/*inherit =*/false)), // can't inherit from grandpa, because `usesMild()` uses dedicated theme
                
                // parent is  `.mild` or  current is  `.mild`:
                rule([    '.mild&',  '&.mild'] , on()                   ),
            ]),
            vars({
                [mildDecls.mildForegFn]: fallbacks(
                    themeRefs.mildForegIfIf, // first  priority
                    themeRefs.mildForegTh,   // second priority
                    themeRefs.mildForegIf,   // third  priority
                    
                    cssProps.foreg,          // default => uses config's foreground
                ),
                
                [mildDecls.mildBackgFn]: fallbacks(
                    themeRefs.mildBackgIfIf, // first  priority
                    themeRefs.mildBackgTh,   // second priority
                    themeRefs.mildBackgIf,   // third  priority
                    
                    cssProps.backg,          // default => uses config's background
                ),
            }),
        ]),
        mildRefs,
        mildDecls,
    ] as const;
};
/**
 * Creates mildification definitions when *toggled off*.
 * @returns A `Style` represents mildification definitions when *toggled off*.
 */
export const noMild = (inherit = false) => composition([
    vars({
        // *toggle off* the mildification props:
        [mildDecls.mildForegTg] : inherit ? 'unset' : 'initial',
        [mildDecls.mildBackgTg] : inherit ? 'unset' : 'initial',
    }),
]);
/**
 * Creates mildification definitions when *toggled on*.
 * @returns A `Style` represents mildification definitions when *toggled on*.
 */
export const isMild = () => composition([
    vars({
        // *toggle on* the mildification props:
        [mildDecls.mildForegTg] : mildRefs.mildForegFn,
        [mildDecls.mildBackgTg] : mildRefs.mildBackgFn,
    }),
]);

export interface VariantMild {
    mild?: boolean
}
export const useVariantMild = (props: VariantMild) => {
    return {
        class: props.mild ? 'mild' : null,
    };
};
//#endregion mild


//#region foreg
export interface ForegVars {
    /**
     * functional foreground color.
     */
    foregFn     : any
    
    /**
     * final foreground color.
     */
    foreg       : any
}
const [foregRefs, foregDecls] = createCssVar<ForegVars>();
/**
 * Uses foreground color (text color).
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export const usesForeg = () => {
    // dependencies:
    const [, themeRefs   ] = usesThemes();
    const [, outlinedRefs] = usesOutlined();
    const [, mildRefs    ] = usesMild();
    
    
    
    return [
        () => composition([
            vars({
                [foregDecls.foregFn] : fallbacks(
                    themeRefs.foregIfIf, // first  priority
                    themeRefs.foregTh,   // second priority
                    themeRefs.foregIf,   // third  priority
                    
                    cssProps.foreg,      // default => uses config's foreground
                ),
                
                [foregDecls.foreg]   : fallbacks(
                    outlinedRefs.outlinedForegTg, // toggle outlined (if `usesOutlined()` applied)
                    mildRefs.mildForegTg,         // toggle mild     (if `usesMild()` applied)
                    
                    foregRefs.foregFn,            // default => uses our `foregFn`
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
     * functional background color.
     */
    backgFn     : any
    /**
     * final background color.
     */
    backgCol    : any
    
    /**
     * final background layers.
     */
    backg       : any
}
const [backgRefs, backgDecls] = createCssVar<BackgVars>();
/**
 * Uses background layer(s).
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents background layer(s) definitions.
 */
export const usesBackg = () => {
    // dependencies:
    const [, themeRefs   ] = usesThemes();
    const [, gradientRefs] = usesGradient();
    const [, outlinedRefs] = usesOutlined();
    const [, mildRefs    ] = usesMild();
    
    
    
    return [
        () => composition([
            vars({
                [backgDecls.backgNone] : solidBackg('transparent'),
                
                [backgDecls.backgFn]   : fallbacks(
                    themeRefs.backgIfIf, // first  priority
                    themeRefs.backgTh,   // second priority
                    themeRefs.backgIf,   // third  priority
                    
                    cssProps.backg,      // default => uses config's background
                ),
                [backgDecls.backgCol]  : fallbacks(
                    outlinedRefs.outlinedBackgTg, // toggle outlined (if `usesOutlined()` applied)
                    mildRefs.mildBackgTg,         // toggle mild     (if `usesMild()` applied)
                    
                    backgRefs.backgFn,            // default => uses our `backgFn`
                ),
                
                [backgDecls.backg]     : [
                    // top layer:
                    fallbacks(
                        gradientRefs.backgGradTg, // toggle gradient (if `usesGradient()` applied)
                        
                        backgRefs.backgNone,      // default => no top layer
                    ),
                    
                    // bottom layer:
                    backgRefs.backgCol,
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
     * functional border color.
     */
    borderFn    : any
    
    /**
     * final border color.
     */
    borderCol   : any
}
const [borderRefs, borderDecls] = createCssVar<BorderVars>();
export const usesBorder = () => {
    // dependencies:
    const [, themeRefs   ] = usesThemes();
    const [, outlinedRefs] = usesOutlined();
    
    
    
    return [
        () => composition([
            vars({
                [borderDecls.borderFn]  : fallbacks(
                    themeRefs.borderIfIf, // first  priority
                    themeRefs.borderTh,   // second priority
                    themeRefs.borderIf,   // third  priority
                    
                    cssProps.borderColor, // default => uses config's border color
                ),
                
                [borderDecls.borderCol] : fallbacks(
                    outlinedRefs.outlinedForegTg, // toggle outlined (if `usesOutlined()` applied)
                    
                    borderRefs.borderFn,          // default => uses our `borderFn`
                ),
            }),
        ]),
        borderRefs,
        borderDecls,
    ] as const;
};
//#endregion border


// animations:

//#region focusBlur
export interface FocusBlurVars {
    /**
     * functional boxShadow color - at focus state.
     */
    focusBoxShadowFn  : any
    /**
     * final boxShadow color - at focus state.
     */
    focusBoxShadowCol : any
    /**
     * final boxShadow single layer - at focus state.
     */
    focusBoxShadowLy  : any
    /**
     * toggles on boxShadow single layer - at focus state.
     */
    focusBoxShadowTg : any
}
const [focusBlurRefs, focusBlurDecls] = createCssVar<FocusBlurVars>();
/**
 * Uses focus & blur states.
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents focus & blur state definitions.
 */
export const usesFocusBlur = () => {
    return [
        () => composition([
            vars({
                [focusBlurDecls.focusBoxShadowFn]  : fallbacks(
                    themeRefs.focusBoxShadowIfIf, // first  priority
                    themeRefs.focusBoxShadowTh,   // second priority
                    themeRefs.focusBoxShadowIf,   // third  priority
                    
                    colors.secondaryThin,         // default => uses secondary theme, because its color is neutral
                ),
                [focusBlurDecls.focusBoxShadowCol] : fallbacks(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    focusBlurRefs.focusBoxShadowFn, // default => uses our `focusBoxShadowFn`
                ),
                [focusBlurDecls.focusBoxShadowLy]  : [
                    // focusBoxShadow pos, width, spread, etc:
                    cssProps.boxShadowFocus,
                    
                    // focusBoxShadow color:
                    focusBlurRefs.focusBoxShadowCol,
                ],
            }),
            // TODO: under construction
        ]),
        focusBlurRefs,
        focusBlurDecls,
    ] as const;
}
//#endregion focusBlur

//#region boxShadow
export interface BoxShadowVars {
    /**
     * none boxShadow.
     */
    boxShadowNone : any
    
    /**
     * final boxShadow layers.
     */
    boxShadow     : any
}
const [boxShadowRefs, boxShadowDecls] = createCssVar<BoxShadowVars>();
/**
 * Uses boxShadow layer(s).
 * @returns A `[Style, ReadonlyRefs, ReadonlyDecls]` represents boxShadow layer(s) definitions.
 */
export const usesBoxShadow = () => {
    // dependencies:
    const [, focusBlurRefs] = usesFocusBlur();
    
    
    
    return [
        () => composition([
            vars({
                [boxShadowDecls.boxShadowNone] : [[0, 0, 'transparent']],
                
                [boxShadowDecls.boxShadow] : [
                    // top layer:
                    fallbacks(
                        focusBlurRefs.focusBoxShadowTg, // toggle focusBoxShadow (if `usesFocusBlur()` applied)
                        
                        boxShadowRefs.boxShadowNone,    // default => no top layer
                    ),
                    
                    // bottom layer:
                    cssProps.boxShadow,
                ],
            }),
        ]),
        boxShadowRefs,
        boxShadowDecls,
    ] as const;
};
//#endregion boxShadow

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
                    cssProps.transf,
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



// styles:
export const useBasicComponentStyle = createUseCssfnStyle(() => {
    // dependencies:
    
    // layouts:
    const [sizes]              = usesSizes();
    
    // colors:
    const [themes]             = usesThemes();
    const [gradient]           = usesGradient();
    const [outlined]           = usesOutlined();
    const [mild]               = usesMild();
    
    const [foreg , foregRefs]  = usesForeg();
    const [backg , backgRefs]  = usesBackg();
    const [border, borderRefs] = usesBorder();
    
    // animations:
    const [anim  , animRefs]   = usesAnim();
    
    
    
    return [
        mainComposition([
            imports([
                // layouts:
                sizes,
                
                // colors:
                themes,
                gradient,
                outlined,
                mild,
                
                foreg,
                backg,
                border,
                
                // animations:
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
                transform   : animRefs.transf,
                anim        : animRefs.anim,
            }),
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

        boxShadow         : [[0, 0, 'transparent']],
        boxShadowFocus    : [[0, 0, 0, '0.25rem' ]], // supports for Control children's theming

        filter            : 'brightness(100%)',
        transf            : 'translate(0)',

        '@keyframes none' : keyframesNone,
        anim              : [[keyframesNone]],
        //#endregion animations
    };
}, { prefix: 'bsc' });



// react components:

export interface BasicComponentProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        // layouts:
        VariantSize,
        // VariantOrientation,
        
        // colors:
        VariantTheme,
        VariantGradient,
        VariantOutlined,
        VariantMild
{
}
export const BasicComponent = <TElement extends HTMLElement = HTMLElement>(props: BasicComponentProps<TElement>) => {
    // styles:
    const styles       = useBasicComponentStyle();
    
    
    
    // variants:
    const variSize     = useVariantSize(props);

    const variTheme    = useVariantTheme(props);
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
                variSize.class,

                variTheme.class,
                variGradient.class,
                variOutlined.class,
                variMild.class,
            ]}
        />
    );
};
export { BasicComponent as default }
