// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import type {
    DictionaryOf,
}                           from './types'       // cssfn's types
import type {
    Cust,
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // general types:
    StyleCollection,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    
    
    
    // rules:
    variants,
    rule,
    
    
    
    // utilities:
    solidBackg,
    pascalCase,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
    
    
    
    // react components:
    ElementProps,
    Element,
}                           from '../libs/react-cssfn' // cssfn for react
import {
    createCssVar,
    fallbacks,
}                           from './css-var'     // Declares & retrieves *css variables* (css custom properties).
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

export const isSize = (sizeName: SizeName, styles: StyleCollection) => rule(`.sz${pascalCase(sizeName)}`, styles);

/**
 * Uses basic sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizes = (factory = sizeOf, options = sizeOptions()) => {
    return [
        () => composition([
            variants([
                options.map((sizeName) => isSize(sizeName,
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
 * @returns A `StyleCollection` represents sizing definitions for the given `sizeName`.
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

export const isOrientation = (orientationName: OrientationName, styles: StyleCollection) => rule(`.${orientationName}`, styles);

/**
 * Uses configurable orientation.  
 * For example: `block`, `inline`.
 * @param factory Customize the callback to create orientation definitions for each orientation in `options`.
 * @param options Customize the orientation options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents orientation definitions for each orientation in `options`.
 */
export const usesOrientations = (factory = orientationOf, options = orientationOptions()) => {
    return [
        () => composition([
            variants([
                options.map((orientationName) => isOrientation(orientationName,
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
 * @returns A `StyleCollection` represents orientation definitions for the given `orientationName`.
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
    foregTheme         : any
    /**
     * themed background color.
     */
    backgTheme         : any
    /**
     * themed border color.
     */
    borderTheme        : any
    
    /**
     * themed foreground color - at outlined variant.
     */
    foregOutlinedTheme : any
    
    /**
     * themed foreground color - at mild variant.
     */
    foregMildTheme     : any
    /**
     * themed background color - at mild variant.
     */
    backgMildTheme     : any
    
    /**
     * themed focus color - at focused state.
     */
    focusTheme         : any
    
    
    
    /**
     * conditional unthemed foreground color.
     */
    foregCond          : any
    /**
     * conditional unthemed background color.
     */
    backgCond          : any
    /**
     * conditional unthemed border color.
     */
    borderCond         : any
    
    /**
     * conditional unthemed foreground color - at outlined variant.
     */
    foregOutlinedCond  : any
    
    /**
     * conditional unthemed foreground color - at mild variant.
     */
    foregMildCond      : any
    /**
     * conditional unthemed background color - at mild variant.
     */
    backgMildCond      : any
    
    /**
     * conditional unthemed focus color - at focused state.
     */
    focusCond          : any
    
    
    
    /**
     * important conditional unthemed foreground color.
     */
    foregImpt          : any
    /**
     * important conditional unthemed background color.
     */
    backgImpt          : any
    /**
     * important conditional unthemed border color.
     */
    borderImpt         : any
    
    /**
     * important conditional unthemed foreground color - at outlined variant.
     */
    foregOutlinedImpt  : any
    
    /**
     * important conditional unthemed foreground color - at mild variant.
     */
    foregMildImpt      : any
    /**
     * important conditional unthemed background color - at mild variant.
     */
    backgMildImpt      : any
    
    /**
     * important conditional unthemed focus color - at focused state.
     */
    focusImpt          : any
}
const [themeRefs, themeDecls] = createCssVar<ThemeVars>();

export const isTheme = (themeName: ThemeName, styles: StyleCollection) => rule(`.th${pascalCase(themeName)}`, styles);

/**
 * Uses theme colors.  
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export const usesThemes = (factory = themeOf, options = themeOptions()) => {
    return [
        () => composition([
            variants([
                options.map((themeName) => isTheme(themeName,
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
 * @returns A `StyleCollection` represents color definitions for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName) => composition([
    vars({
        [themeDecls.foregTheme]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgTheme]         : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderTheme]        : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedTheme] : themeRefs.backgTheme,
        
        [themeDecls.foregMildTheme]     : themeRefs.borderTheme,
        [themeDecls.backgMildTheme]     : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusTheme]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
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
 * @returns A `StyleCollection` represents color definitions for the default `themeName`.
 */
export const themeDefault = (themeName: ThemeName|null = null) => {
    if (themeName) return themeIf(themeName);
    
    
    
    return composition([]);
};
/**
 * Creates a conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `StyleCollection` represents the conditional color definitions for the given `themeName`.
 */
export const themeIf = (themeName: ThemeName) => composition([
    vars({
        [themeDecls.foregCond]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgCond]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderCond]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedCond]  : themeRefs.backgCond,
        
        [themeDecls.foregMildCond]      : themeRefs.borderCond,
        [themeDecls.backgMildCond]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusCond]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
/**
 * Creates an important conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `StyleCollection` represents the important conditional color definitions for the given `themeName`.
 */
export const themeIfIf = (themeName: ThemeName) => composition([
    vars({
        [themeDecls.foregImpt]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgImpt]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderImpt]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedImpt]  : themeRefs.backgImpt,
        
        [themeDecls.foregMildImpt]      : themeRefs.borderImpt,
        [themeDecls.backgMildImpt]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusImpt]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }),
]);

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

// grandpa ?? `.gradient` and parent not `.gradient` and current not `.gradient`:
export const noGradient = (styles: StyleCollection) => rule(                     ':not(.gradient)&:not(.gradient)', styles);
// grandpa is `.gradient` or  parent is  `.gradient` or  current is  `.gradient`:
// double `.gradient.gradient` to combat with `:not(.gradient)&:not(.gradient)`
export const isGradient = (styles: StyleCollection) => rule(['.gradient.gradient &',  '.gradient&',  '&.gradient'], styles);

/**
 * Uses toggleable gradient.
 * @param factory Customize the callback to create gradient definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable gradient definitions.
 */
export const usesGradient = (factory = gradientOf) => {
    return [
        () => composition([
            variants([
                noGradient(factory(false)),
                isGradient(factory(true)),
            ]),
        ]),
        gradientRefs,
        gradientDecls,
    ] as const;
};
/**
 * Creates gradient definitions based on the given `toggle`.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate.
 * @returns A `StyleCollection` represents gradient definitions based on the given `toggle`.
 */
export const gradientOf = (toggle = true) => composition([
    vars({
        // *toggle on/off* the background gradient prop:
        [gradientDecls.backgGradTg] : toggle ? cssProps.backgGrad : 'initial',
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
    foregOutlinedFn : any
    /**
     * toggles on foreground color - at outlined variant.
     */
    foregOutlinedTg : any
    
    
    
    /**
     * functional background color - at outlined variant.
     */
    backgOutlinedFn : any
    /**
     * toggles on background color - at outlined variant.
     */
    backgOutlinedTg : any
}
const [outlinedRefs, outlinedDecls] = createCssVar<OutlinedVars>();

// grandpa ?? `.outlined` and parent not `.outlined` and current not `.outlined`:
export const noOutlined = (styles: StyleCollection) => rule(                     ':not(.outlined)&:not(.outlined)', styles);
// grandpa is `.outlined` or  parent is  `.outlined` or  current is  `.outlined`:
// double `.outlined.outlined` to combat with `:not(.outlined)&:not(.outlined)`
export const isOutlined = (styles: StyleCollection) => rule(['.outlined.outlined &',  '.outlined&',  '&.outlined'], styles);

/**
 * Uses toggleable outlining.
 * @param factory Customize the callback to create outlining definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable outlining definitions.
 */
export const usesOutlined = (factory = outlinedOf) => {
    // dependencies:
    const [themes, themeRefs] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                // `usesOutlined()` implicitly `usesThemes()`
                // `usesOutlined()` requires `usesThemes()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themes(),
            ]),
            vars({
                [outlinedDecls.foregOutlinedFn] : fallbacks(
                    themeRefs.foregOutlinedImpt,  // first  priority
                    themeRefs.foregOutlinedTheme, // second priority
                    themeRefs.foregOutlinedCond,  // third  priority
                    
                    cssProps.foreg,               // default => uses config's foreground
                ),
                
                [outlinedDecls.backgOutlinedFn] : 'transparent', // set background to transparent, regardless of the theme colors
            }),
            variants([
                noOutlined(factory(false)),
                isOutlined(factory(true)),
            ]),
        ]),
        outlinedRefs,
        outlinedDecls,
    ] as const;
};
/**
 * Creates outlining definitions based on the given `toggle`.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate.
 * @returns A `StyleCollection` represents outlining definitions based on the given `toggle`.
 */
export const outlinedOf = (toggle = true) => composition([
    vars({
        // *toggle on/off* the outlined props:
        [outlinedDecls.foregOutlinedTg] : toggle ? outlinedRefs.foregOutlinedFn : 'initial',
        [outlinedDecls.backgOutlinedTg] : toggle ? outlinedRefs.backgOutlinedFn : 'initial',
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
    foregMildFn : any
    /**
     * toggles on foreground color - at mild variant.
     */
    foregMildTg : any
    
    
    
    /**
     * functional background color - at mild variant.
     */
    backgMildFn : any
    /**
     * toggles on background color - at mild variant.
     */
    backgMildTg : any
}
const [mildRefs, mildDecls] = createCssVar<MildVars>();

// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` and current not `.mild`:
export const noMild = (styles: StyleCollection) => rule(':not(.mild)&:not(.mild)', styles);
// parent is  `.mild` or  current is  `.mild`:
export const isMild = (styles: StyleCollection) => rule([    '.mild&',  '&.mild'], styles);

/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export const usesMild = (factory = mildOf) => {
    // dependencies:
    const [themes, themeRefs] = usesThemes();
    
    
    
    return [
        () => composition([
            imports([
                // `usesMild()` implicitly `usesThemes()`
                // `usesMild()` requires `usesThemes()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themes(),
            ]),
            vars({
                [mildDecls.foregMildFn] : fallbacks(
                    themeRefs.foregMildImpt,  // first  priority
                    themeRefs.foregMildTheme, // second priority
                    themeRefs.foregMildCond,  // third  priority
                    
                    cssProps.foreg,           // default => uses config's foreground
                ),
                
                [mildDecls.backgMildFn] : fallbacks(
                    themeRefs.backgMildImpt,  // first  priority
                    themeRefs.backgMildTheme, // second priority
                    themeRefs.backgMildCond,  // third  priority
                    
                    cssProps.backg,           // default => uses config's background
                ),
            }),
            variants([
                noMild(factory(false)),
                isMild(factory(true)),
            ]),
        ]),
        mildRefs,
        mildDecls,
    ] as const;
};
/**
 * Creates mildification definitions based on the given `toggle`.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate.
 * @returns A `StyleCollection` represents mildification definitions based on the given `toggle`.
 */
export const mildOf = (toggle = true) => composition([
    vars({
        // *toggle on/off* the mildification props:
        [mildDecls.foregMildTg] : toggle ? mildRefs.foregMildFn : 'initial',
        [mildDecls.backgMildTg] : toggle ? mildRefs.backgMildFn : 'initial',
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
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
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
                    themeRefs.foregImpt,  // first  priority
                    themeRefs.foregTheme, // second priority
                    themeRefs.foregCond,  // third  priority
                    
                    cssProps.foreg,       // default => uses config's foreground
                ),
                [foregDecls.foreg]   : fallbacks(
                    outlinedRefs.foregOutlinedTg, // toggle outlined (if `usesOutlined()` applied)
                    mildRefs.foregMildTg,         // toggle mild     (if `usesMild()` applied)
                    
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
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents background layer(s) definitions.
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
                    themeRefs.backgImpt,  // first  priority
                    themeRefs.backgTheme, // second priority
                    themeRefs.backgCond,  // third  priority
                    
                    cssProps.backg,       // default => uses config's background
                ),
                [backgDecls.backgCol]  : fallbacks(
                    outlinedRefs.backgOutlinedTg, // toggle outlined (if `usesOutlined()` applied)
                    mildRefs.backgMildTg,         // toggle mild     (if `usesMild()` applied)
                    
                    backgRefs.backgFn,            // default => uses our `backgFn`
                ),
                [backgDecls.backg]     : [ // single array => makes the JSS treat as comma separated values
                    // layering: backg1 | backg2 | backg3 ...
                    
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
/**
 * Uses border color.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border color definitions.
 */
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
                    themeRefs.borderImpt,  // first  priority
                    themeRefs.borderTheme, // second priority
                    themeRefs.borderCond,  // third  priority
                    
                    cssProps.borderColor,  // default => uses config's border color
                ),
                [borderDecls.borderCol] : fallbacks(
                    outlinedRefs.foregOutlinedTg, // toggle outlined (if `usesOutlined()` applied)
                    
                    borderRefs.borderFn,          // default => uses our `borderFn`
                ),
            }),
        ]),
        borderRefs,
        borderDecls,
    ] as const;
};
//#endregion border


// // states:

// //#region focusBlur
// export interface FocusBlurVars {
//     /**
//      * functional boxShadow color - at focus state.
//      */
//     focusBoxShadowFn  : any
//     /**
//      * final boxShadow color - at focus state.
//      */
//     focusBoxShadowCol : any
//     /**
//      * final boxShadow single layer - at focus state.
//      */
//     focusBoxShadowLy  : any
//     /**
//      * toggles on boxShadow single layer - at focus state.
//      */
//     focusBoxShadowTg : any
// }
// const [focusBlurRefs, focusBlurDecls] = createCssVar<FocusBlurVars>();

// /**
//  * Uses focus & blur states.
//  * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents focus & blur state definitions.
//  */
// export const usesFocusBlurBase = () => {
//     // dependencies:
//     const [, themeRefs] = usesThemes();
    
    
    
//     return [
//         () => composition([
//             vars({
//                 [focusBlurDecls.focusBoxShadowFn]  : fallbacks(
//                     themeRefs.focusImpt,  // first  priority
//                     themeRefs.focusTheme, // second priority
//                     themeRefs.focusCond,  // third  priority
                    
//                     colors.secondaryThin, // default => uses secondary theme, because its color is neutral
//                 ),
//                 [focusBlurDecls.focusBoxShadowCol] : fallbacks(
//                     // no toggle outlined nor toggle mild yet (might be added in the future)
                    
//                     focusBlurRefs.focusBoxShadowFn, // default => uses our `focusBoxShadowFn`
//                 ),
//                 [focusBlurDecls.focusBoxShadowLy]  : [[ // double array => makes the JSS treat as space separated values
//                     // combining: pos width spread color ...
                    
//                     // focusBoxShadow pos, width, spread, etc:
//                     cssProps.boxShadowFocus,
                    
//                     // focusBoxShadow color:
//                     focusBlurRefs.focusBoxShadowCol,
//                 ]],
//             }),
//         ]),
//         focusBlurRefs,
//         focusBlurDecls,
//     ] as const;
// }
// //#endregion focusBlur


// animations:

//#region animations
export interface AnimVars {
    /**
     * none boxShadow.
     */
    boxShadowNone : any
    /**
     * final boxShadow layers.
     */
    boxShadow     : any
    
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

const setsBoxShadow = new Set<Cust.Ref>();
const setsFilter    = new Set<Cust.Ref>();
const setsTransf    = new Set<Cust.Ref>();
const setsAnim      = new Set<Cust.Ref>();
const propsManager  = {
    boxShadows          : () => Array.from(setsBoxShadow),
    registerBoxShadow   : (item: Cust.Ref) => setsBoxShadow.add(item),
    unregisterBoxShadow : (item: Cust.Ref) => setsBoxShadow.delete(item),
    
    filters             : () => Array.from(setsFilter),
    registerFilter      : (item: Cust.Ref) => setsFilter.add(item),
    unregisterFilter    : (item: Cust.Ref) => setsFilter.delete(item),
    
    transfs             : () => Array.from(setsTransf),
    registerTransf      : (item: Cust.Ref) => setsTransf.add(item),
    unregisterTransf    : (item: Cust.Ref) => setsTransf.delete(item),
    
    anims               : () => Array.from(setsAnim),
    registerAnim        : (item: Cust.Ref) => setsAnim.add(item),
    unregisterAnim      : (item: Cust.Ref) => setsAnim.delete(item),
} as const;

export const usesAnim = () => {
    return [
        () => composition([
            vars({
                [animDecls.boxShadowNone] : [[0, 0, 'transparent']],
                [animDecls.boxShadow]     : [ // single array => makes the JSS treat as comma separated values
                    // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                    
                    // top layers:
                    ...Array.from(setsBoxShadow).reverse().map((boxShadow) => fallbacks(
                        boxShadow,
                        
                        animRefs.boxShadowNone, // default => none boxShadow
                    )),
                    
                    // bottom layer:
                    cssProps.boxShadow,
                ],
                
                [animDecls.filterNone]    : 'brightness(100%)',
                [animDecls.filter]        : [[ // double array => makes the JSS treat as space separated values
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // top layers:
                    ...Array.from(setsFilter).reverse().map((filter) => fallbacks(
                        filter,
                        
                        animRefs.filterNone, // default => none filter
                    )),
                    
                    // bottom layer:
                    cssProps.filter,
                ]],
                
                [animDecls.transfNone]    : 'translate(0)',
                [animDecls.transf]        : [[ // double array => makes the JSS treat as space separated values
                    // combining: transf1 * transf2 * transf3 ...
                    
                    // top layers:
                    ...Array.from(setsTransf).reverse().map((transf) => fallbacks(
                        transf,
                        
                        animRefs.transfNone, // default => none transf
                    )),
                    
                    // bottom layer:
                    cssProps.transf,
                ]],
                
                [animDecls.animNone]      : 'none',
                [animDecls.anim]          : [ // single array => makes the JSS treat as comma separated values
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // top layers:
                    ...Array.from(setsAnim).reverse().map((anim) => fallbacks(
                        anim,
                        
                        animRefs.animNone, // default => none anim
                    )),
                    
                    // bottom layer:
                    cssProps.anim,
                ],
            }),
        ]),
        animRefs,
        animDecls,
        propsManager,
    ] as const;
};
//#endregion animations



// styles:
export const usesBasicComponent = () => {
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
    
    
    
    return composition([
        imports([
            // layouts:
            sizes(),
            
            // colors:
            themes(),
            gradient(),
            outlined(),
            mild(),
            
            foreg(),
            backg(),
            border(),
            
            // animations:
            anim(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // foregrounds:
            foreg       : foregRefs.foreg,
            
            
            
            // backgrounds:
            backg       : backgRefs.backg,
            
            
            
            // borders:
            borderColor : borderRefs.borderCol,
            
            
            
            // states & animations:
            boxShadow   : animRefs.boxShadow,
            filter      : animRefs.filter,
            transf      : animRefs.transf,
            anim        : animRefs.anim,
        }),
    ]);
};
export const useBasicComponentSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesBasicComponent(),
        ]),
    ]),
]);



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
    const sheet        = useBasicComponentSheet();
    
    
    
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
            mainClass={props.mainClass ?? sheet.main}
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
