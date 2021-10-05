// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

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
    createUseSheet,
    
    
    
    // react components:
    ElementProps,
    Element,
}                           from './react-cssfn' // cssfn for react
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
import {
    colors,
    themes as colorThemes,
}                           from './colors'      // configurable colors & theming defs
import {
    borders,
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import typos                from './typos/index' // configurable typography (texting) defs



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'lg' | string
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
export const usesSizeVariant = (factory = sizeOf, options = sizeOptions()) => {
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
    layout({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];

export interface SizeVariant {
    size?: SizeName
}
export const useSizeVariant = (props: SizeVariant) => {
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

export const noOrientation = (orientationName: OrientationName, styles: StyleCollection) => rule(`:not(.${orientationName})`, styles);
export const isOrientation = (orientationName: OrientationName, styles: StyleCollection) => rule(`.${orientationName}`, styles);
export const noOrientationBlock  = (styles: StyleCollection) => noOrientation('block' , styles);
export const noOrientationInline = (styles: StyleCollection) => noOrientation('inline', styles);
export const isOrientationBlock  = (styles: StyleCollection) => isOrientation('block' , styles);
export const isOrientationInline = (styles: StyleCollection) => isOrientation('inline', styles);

/**
 * Uses configurable orientation.  
 * For example: `block`, `inline`.
 * @param factory Customize the callback to create orientation definitions for each orientation in `options`.
 * @param options Customize the orientation options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents orientation definitions for each orientation in `options`.
 */
export const usesOrientationVariant = (factory = orientationOf, options = orientationOptions()) => {
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

export interface OrientationVariant {
    orientation?: OrientationName
}
export const useOrientationVariant = (props: OrientationVariant) => {
    return {
        class: props.orientation ? props.orientation : null,
    };
};
//#endregion orientation

//#region nude
export const noNude = (styles: StyleCollection) => rule(':not(.nude)', styles);
export const isNude = (styles: StyleCollection) => rule('.nude', styles);
export const usesNudeVariant = () => {
    return composition([
        variants([
            isNude([
                layout({
                    // backgrounds:
                    backg        : 'none', // discard background
                    
                    
                    
                    // borders:
                    border       : 0,      // discard border
                 // borderRadius : 0,      // do not discard borderRadius, causing boxShadow looks weird
                    
                    
                    
                    // spacings:
                    padding      : 0,      // discard padding
                }),
            ]),
        ]),
    ]);
};

export interface NudeVariant {
    nude?: boolean
}
export const useNudeVariant = (props: NudeVariant) => {
    return {
        class: props.nude ? 'nude' : null,
    };
};
//#endregion nude


// colors:

//#region themes
export type ThemeName = (keyof typeof colorThemes) | string
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
export const usesThemeVariant = (factory = themeOf, options = themeOptions()) => {
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
export const themeOptions = () => Object.keys(colorThemes) as ThemeName[];

/**
 * Creates the default color definitions for unspecified `themeName`.
 * @param themeName The theme name as the default, written in camel case -or- `null`.
 * @returns A `StyleCollection` represents color definitions for the default `themeName`.
 */
export const usesThemeDefault = (themeName: ThemeName|null = null) => {
    return usesThemeCond(themeName);
};
/**
 * Creates a conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `StyleCollection` represents the conditional color definitions for the given `themeName`.
 */
export const usesThemeCond = (themeName: ThemeName|null) => composition([
    (themeName ? vars({
        [themeDecls.foregCond]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgCond]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderCond]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedCond]  : themeRefs.backgCond,
        
        [themeDecls.foregMildCond]      : themeRefs.borderCond,
        [themeDecls.backgMildCond]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusCond]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }) : vars({
        [themeDecls.foregCond]          : null,
        [themeDecls.backgCond]          : null,
        [themeDecls.borderCond]         : null,
        
        [themeDecls.foregOutlinedCond]  : null,
        
        [themeDecls.foregMildCond]      : null,
        [themeDecls.backgMildCond]      : null,
        
        [themeDecls.focusCond]          : null,
    })),
]);
/**
 * Creates an important conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `StyleCollection` represents the important conditional color definitions for the given `themeName`.
 */
export const usesThemeImpt = (themeName: ThemeName|null) => composition([
    (themeName ? vars({
        [themeDecls.foregImpt]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgImpt]          : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderImpt]         : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedImpt]  : themeRefs.backgImpt,
        
        [themeDecls.foregMildImpt]      : themeRefs.borderImpt,
        [themeDecls.backgMildImpt]      : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusImpt]          : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }) : vars({
        [themeDecls.foregImpt]          : null,
        [themeDecls.backgImpt]          : null,
        [themeDecls.borderImpt]         : null,
        
        [themeDecls.foregOutlinedImpt]  : null,
        
        [themeDecls.foregMildImpt]      : null,
        [themeDecls.backgMildImpt]      : null,
        
        [themeDecls.focusImpt]          : null,
    })),
]);

export interface ThemeVariant {
    theme?: ThemeName
}
export const useThemeVariant = (props: ThemeVariant, themeDefault?: ThemeName) => {
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
export const noGradient = (styles: StyleCollection) => rule(':where(:not(.gradient)) :where(:not(.gradient))&:not(.gradient)', styles);
// grandpa is `.gradient` or  parent is  `.gradient` or  current is  `.gradient`:
export const isGradient = (styles: StyleCollection) => rule([           '.gradient &',          '.gradient&',   '&.gradient'], styles);

/**
 * Uses toggleable gradient.
 * @param factory Customize the callback to create gradient definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable gradient definitions.
 */
export const usesGradientVariant = (factory = gradientOf) => {
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
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents gradient definitions based on the given `toggle`.
 */
export const gradientOf = (toggle: (boolean|null) = true) => composition([
    vars({
        // *toggle on/off* the background gradient prop:
        [gradientDecls.backgGradTg] : toggle ? cssProps.backgGrad : ((toggle !== null) ? 'initial' : null),
    }),
]);

export interface GradientVariant {
    gradient?: boolean
}
export const useGradientVariant = (props: GradientVariant) => {
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
export const noOutlined = (styles: StyleCollection) => rule(':where(:not(.outlined)) :where(:not(.outlined))&:not(.outlined)', styles);
// grandpa is `.outlined` or  parent is  `.outlined` or  current is  `.outlined`:
export const isOutlined = (styles: StyleCollection) => rule([           '.outlined &',          '.outlined&',   '&.outlined'], styles);

/**
 * Uses toggleable outlining.
 * @param factory Customize the callback to create outlining definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable outlining definitions.
 */
export const usesOutlinedVariant = (factory = outlinedOf) => {
    // dependencies:
    const [themes, themeRefs] = usesThemeVariant();
    
    
    
    return [
        () => composition([
            imports([
                // `usesOutlinedVariant()` implicitly `usesThemeVariant()`
                // `usesOutlinedVariant()` requires `usesThemeVariant()` to work correctly, otherwise it uses the parent themes (that's not intented)
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
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents outlining definitions based on the given `toggle`.
 */
export const outlinedOf = (toggle: (boolean|null) = true) => composition([
    vars({
        // *toggle on/off* the outlined props:
        [outlinedDecls.foregOutlinedTg] : toggle ? outlinedRefs.foregOutlinedFn : ((toggle !== null) ? 'initial' : null),
        [outlinedDecls.backgOutlinedTg] : toggle ? outlinedRefs.backgOutlinedFn : ((toggle !== null) ? 'initial' : null),
    }),
]);

export interface OutlinedVariant {
    outlined?: boolean
}
export const useOutlinedVariant = (props: OutlinedVariant) => {
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
export const noMild = (styles: StyleCollection) => rule(':where(:not(.mild))&:not(.mild)', styles);
// parent is  `.mild` or  current is  `.mild`:
export const isMild = (styles: StyleCollection) => rule([           '.mild&',   '&.mild'], styles);

/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory = mildOf) => {
    // dependencies:
    const [themes, themeRefs] = usesThemeVariant();
    
    
    
    return [
        () => composition([
            imports([
                // `usesMildVariant()` implicitly `usesThemeVariant()`
                // `usesMildVariant()` requires `usesThemeVariant()` to work correctly, otherwise it uses the parent themes (that's not intented)
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
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents mildification definitions based on the given `toggle`.
 */
export const mildOf = (toggle: (boolean|null) = true) => composition([
    vars({
        // *toggle on/off* the mildification props:
        [mildDecls.foregMildTg] : toggle ? mildRefs.foregMildFn : ((toggle !== null) ? 'initial' : null),
        [mildDecls.backgMildTg] : toggle ? mildRefs.backgMildFn : ((toggle !== null) ? 'initial' : null),
    }),
]);

export interface MildVariant {
    mild?: boolean
}
export const useMildVariant = (props: MildVariant) => {
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
    const [, themeRefs   ] = usesThemeVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, mildRefs    ] = usesMildVariant();
    
    
    
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
                    outlinedRefs.foregOutlinedTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    mildRefs.foregMildTg,         // toggle mild     (if `usesMildVariant()` applied)
                    
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
    const [, themeRefs   ] = usesThemeVariant();
    const [, gradientRefs] = usesGradientVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, mildRefs    ] = usesMildVariant();
    
    
    
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
                    outlinedRefs.backgOutlinedTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    mildRefs.backgMildTg,         // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgRefs.backgFn,            // default => uses our `backgFn`
                ),
                [backgDecls.backg]     : [ // single array => makes the JSS treat as comma separated values
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    fallbacks(
                        gradientRefs.backgGradTg, // toggle gradient (if `usesGradientVariant()` applied)
                        
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
    const [, themeRefs   ] = usesThemeVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    
    
    
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
                    outlinedRefs.foregOutlinedTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    
                    borderRefs.borderFn,          // default => uses our `borderFn`
                ),
            }),
        ]),
        borderRefs,
        borderDecls,
    ] as const;
};

export const usesBorderStroke = () => {
    // dependencies:
    
    // colors:
    const [border, borderRefs] = usesBorder();
    
    
    
    return composition([
        imports([
            // colors:
            border(),
        ]),
        layout({
            // borders:
            border      : cssProps.border,
            borderColor : borderRefs.borderCol,
        }),
    ]);
};
//#endregion border


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
                    
                    // layers:
                    ...propsManager.boxShadows().map((boxShadow) => fallbacks(
                        boxShadow,
                        
                        animRefs.boxShadowNone, // default => none boxShadow
                    )),
                ],
                
                [animDecls.filterNone]    : 'brightness(100%)',
                [animDecls.filter]        : [[ // double array => makes the JSS treat as space separated values
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...propsManager.filters().map((filter) => fallbacks(
                        filter,
                        
                        animRefs.filterNone, // default => none filter
                    )),
                ]],
                
                [animDecls.transfNone]    : 'translate(0)',
                [animDecls.transf]        : [[ // double array => makes the JSS treat as space separated values
                    // combining: transf1 * transf2 * transf3 ...
                    
                    // layers:
                    ...propsManager.transfs().map((transf) => fallbacks(
                        transf,
                        
                        animRefs.transfNone, // default => none transf
                    )),
                ]],
                
                [animDecls.animNone]      : 'none',
                [animDecls.anim]          : [ // single array => makes the JSS treat as comma separated values
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...propsManager.anims().map((anim) => fallbacks(
                        anim,
                        
                        animRefs.animNone, // default => none anim
                    )),
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
export const usesBasicLayout = () => {
    // dependencies:
    
    // colors:
    const [foreg , foregRefs]  = usesForeg();
    const [backg , backgRefs]  = usesBackg();
    const [border, borderRefs] = usesBorder();
    
    // animations:
    const [anim  , animRefs]   = usesAnim();
    
    
    
    return composition([
        imports([
            // colors:
            usesThemeDefault(),
            
            foreg(),
            backg(),
            border(),
            
            // animations:
            anim(),
        ]),
        layout({
            // layouts:
            display     : 'block',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // foregrounds:
            foreg       : foregRefs.foreg,
            
            
            
            // backgrounds:
            backg       : backgRefs.backg,
            
            
            
            // borders:
            borderColor : borderRefs.borderCol,
            
            
            
            // animations:
            boxShadow   : animRefs.boxShadow,
            filter      : animRefs.filter,
            transf      : animRefs.transf,
            anim        : animRefs.anim,
        }),
    ]);
};
export const usesBasicVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes]              = usesSizeVariant();
    
    // colors:
    const [themes]             = usesThemeVariant();
    const [gradient]           = usesGradientVariant();
    const [outlined]           = usesOutlinedVariant();
    const [mild]               = usesMildVariant();
    
    
    
    return composition([
        imports([
            // layouts:
            sizes(),
            
            // colors:
            themes(),
            gradient(),
            outlined(),
            mild(),
        ]),
    ]);
};
export const usesBasic = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
            
            // variants:
            usesBasicVariants(),
        ]),
    ]);
};

export const useBasicSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesBasic(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const keyframesNone : PropEx.Keyframes = { };

    
    const transDuration = '300ms';
    
    return {
        //#region foreg, backg, borders
        foreg             : 'currentColor',
        
        backg             : 'transparent',
        backgGrad         : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        
        border            : [[borders.style, borders.defaultWidth, borders.color]],
        borderStyle       : borders.style,
        borderWidth       : borders.defaultWidth,
        borderColor       : borders.color,
        
        borderRadius      : borderRadiuses.md,
        borderRadiusSm    : borderRadiuses.sm,
        borderRadiusLg    : borderRadiuses.lg,
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
        
        
        
        //#region animations
        transDuration     : transDuration,
        transition        : [
            // foreg, backg, borders:
            ['color'      , transDuration, 'ease-out'],
            ['background' , transDuration, 'ease-out'],
            ['border'     , transDuration, 'ease-out'],
            
            // sizes:
            ['inline-size', transDuration, 'ease-out'],
            ['block-size' , transDuration, 'ease-out'],
            
            // spacings:
            ['padding'    , transDuration, 'ease-out'],
            
            // appearances:
            ['opacity'    , transDuration, 'ease-out'],
            
            // typos:
            ['font-size'  , transDuration, 'ease-out'],
        ],

        boxShadow         : [[0, 0, 'transparent']],
        filter            : 'brightness(100%)',
        transf            : 'translate(0)',

        '@keyframes none' : keyframesNone,
        anim              : [[keyframesNone]],
        //#endregion animations
    };
}, { prefix: 'bsc' });
propsManager.registerBoxShadow(cssProps.boxShadow);
propsManager.registerFilter(cssProps.filter);
propsManager.registerTransf(cssProps.transf);
propsManager.registerAnim(cssProps.anim);



// react components:

export interface BasicProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        // layouts:
        SizeVariant,
        // OrientationVariant,
        // NudeVariant,
        
        // colors:
        ThemeVariant,
        GradientVariant,
        OutlinedVariant,
        MildVariant
{
}
export function Basic<TElement extends HTMLElement = HTMLElement>(props: BasicProps<TElement>) {
    // styles:
    const sheet           = useBasicSheet();
    
    
    
    // variants:
    const sizeVariant     = useSizeVariant(props);
    
    const themeVariant    = useThemeVariant(props);
    const gradientVariant = useGradientVariant(props);
    const outlinedVariant = useOutlinedVariant(props);
    const mildVariant     = useMildVariant(props);
    
    
    
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                sizeVariant.class,

                themeVariant.class,
                gradientVariant.class,
                outlinedVariant.class,
                mildVariant.class,
            ]}
        />
    );
}
export { Basic as default }