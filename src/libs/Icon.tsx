// react:
import {
    default as React,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Factory,
}                           from './types'       // cssfn's types
import type {
    Cust,
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
    children,
    
    
    
    // rules:
    rules,
    variants,
    rule,
    fontFace,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
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

// nodestrap utilities:
import {
    // styles:
    fillTextLineHeightLayout,
}                           from './layouts'

// nodestrap components:
import {
    // react components:
    ElementProps,
    Element,
}                           from './Element'
import {
    // hooks:
    isSize          as basicIsSize,
    usesSizeVariant as basicUsesSizeVariant,
    SizeVariant     as BasicSizeVariant,
    useSizeVariant  as basicUseSizeVariant,
    
    ThemeName,
    usesThemeVariant      as basicUsesThemeVariant,
    ThemeVariant,
    useThemeVariant,
    
    usesOutlinedVariant,
    
    notMild,
    isMild,
    usesMildVariant        as basicUsesMildVariant,
    MildVariant,
    useMildVariant,
    
    usesForeg       as basicUsesForeg,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './Basic'
import fontItems            from './Icon-font-material'



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'nm'|'md'|'lg'|'1em' | (string & {})

export const isSize = (sizeName: SizeName, styles: StyleCollection) => basicIsSize(sizeName, styles);

/**
 * Uses basic sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = (sizeOverwrite?: Cust.Ref, factory = sizeOf, options = sizeOptions()) => {
    // dependencies:
    const [sizes, sizeRefs, sizeDecls, ...restSizes] = basicUsesSizeVariant(factory, options);
    
    
    
    return [
        () => sizeOverwrite ? composition([
            vars({
                [cssDecls.size]: ((sizeOverwrite !== cssProps.size) ? sizeOverwrite : null),
            }),
        ]) : sizes(),
        sizeRefs,
        sizeDecls,
        ...restSizes,
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
export const sizeOptions = (): SizeName[] => ['sm', 'nm', 'md', 'lg', '1em'];

export interface SizeVariant {
    size?: SizeName
}
export const useSizeVariant = (props: SizeVariant) => basicUseSizeVariant(props as BasicSizeVariant);
//#endregion sizes


// colors:

//#region themes
/**
 * Uses theme colors.  
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export const usesThemeVariant = (factory?: Factory<StyleCollection>, options?: ThemeName[]) => {
    // dependencies:
    const [themes, themeRefs, themeDecls, ...restThemes] = basicUsesThemeVariant(factory, options);
    
    
    
    return [
        () => composition([
            imports([
                themes(),
            ]),
            vars({
                // delete unused imported vars:
                [themeDecls.foreg        ] : null,
                [themeDecls.border       ] : null,
                [themeDecls.foregOutlined] : null,
                [themeDecls.foregMild    ] : null,
                [themeDecls.focus        ] : null,
            }),
            vars({
                // prevent theme from inheritance, so the Icon always use currentColor if the theme is not set
                [themeDecls.backg        ] : 'initial',
                [themeDecls.backgMild    ] : 'initial',
            }),
        ]),
        themeRefs,
        themeDecls,
        ...restThemes,
    ] as const;
};
//#endregion themes

//#region mild
/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory?: Factory<StyleCollection>) => {
    // dependencies:
    const [mild, mildRefs , mildDecls, ...restMild] = basicUsesMildVariant(factory);
    const [    , themeRefs                        ] = usesThemeVariant();
    
    
    
    return [
        () => composition([
            imports([
                mild(),
            ]),
            vars({
                // delete unused imported vars:
                [mildDecls.foregFn] : null,
            }),
            vars({
                [mildDecls.backgFn] : fallbacks(
                 // themeRefs.backgMildImpt,  // first  priority
                    themeRefs.backgMild,      // second priority
                 // themeRefs.backgMildCond,  // third  priority
                    
                    cssProps.foreg,           // default => uses config's foreground
                ),
            }),
        ]),
        mildRefs,
        mildDecls,
        ...restMild,
    ] as const;
};
//#endregion mild

//#region foreg
/**
 * Uses foreground color (icon color).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export const usesForeg = (foregOverwrite?: Cust.Ref) => {
    // dependencies:
    const [foreg, foregRefs, foregDecls, ...restForeg] = basicUsesForeg();
    const [     , themeRefs                          ] = usesThemeVariant();
    const [     , mildRefs                           ] = usesMildVariant();
    
    
    
    return [
        () => foregOverwrite ? composition([
            vars({
                [foregDecls.foreg]   : ((foregOverwrite !== foregRefs.foreg) ? foregOverwrite : null),
            }),
        ]) : composition([
            imports([
                foreg(),
            ]),
            vars({
                [foregDecls.foregFn] : fallbacks(
                 // themeRefs.backgImpt,  // first  priority
                    themeRefs.backg,      // second priority
                 // themeRefs.backgCond,  // third  priority
                    
                    cssProps.foreg,       // default => uses config's foreground
                ),
                [foregDecls.foreg]   : fallbacks(
                 // outlinedRefs.backgTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    mildRefs.backgTg,     // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregRefs.foregFn,    // default => uses our `foregFn`
                ),
            }),
        ]),
        foregRefs,
        foregDecls,
        ...restForeg,
    ] as const;
};
//#endregion foreg

//#region icon color
export interface IconColorVars {
    /**
     * final icon color.
     */
    iconCol       : any
    /**
     * toggles on icon color - at mild variant.
     */
    iconColMildTg : any
}
const [iconColorRefs, iconColorDecls] = createCssVar<IconColorVars>();

/**
 * Uses icon color.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents icon color definitions.
 */
export const usesIconColor = () => {
    // dependencies:
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, foregRefs   ] = usesForeg();
    
    
    
    return [
        () => composition([
            vars({
                [iconColorDecls.iconCol]       : fallbacks(
                    outlinedRefs.foregTg,         // toggle outlined (if `usesOutlinedVariant()` applied)
                    iconColorRefs.iconColMildTg,  // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregRefs.foregFn,            // default => uses our `foregFn`
                ),
            }),
            variants([
                notMild([
                    vars({
                        [iconColorDecls.iconColMildTg] : 'initial',
                    }),
                ]),
                isMild([
                    vars({
                        [iconColorDecls.iconColMildTg] : outlinedRefs.foregFn,
                    }),
                ]),
            ]),
        ]),
        iconColorRefs,
        iconColorDecls,
    ] as const;
};
//#endregion icon color



// utilities:
/**
 * Merges two specified url to final url.
 * @param base The relative or absolute base url.
 * @param target The relative or absolute target url.
 * @returns A final url.  
 * If `target` is an absolute url, the `base` discarded.  
 * Otherwise, the combination of `base` url followed by `target` url.
 */
export const concatUrl = (base: string, target: string) => {
    const dummyUrl  = new URL('http://dummy');
    if (!base.endsWith('/') || !base.endsWith('\\')) base += '/';
    const baseUrl   = new URL(base, dummyUrl);
    const targetUrl = new URL(target, baseUrl);

    const result = targetUrl.href;
    if (result.startsWith(dummyUrl.origin)) return result.substr(dummyUrl.origin.length);
    return result;
};

/**
 * Gets the file format based on the extension of the specified `fileName`.
 * @param fileName The name of the file to retrieve.
 * @returns  
 * A `string` represents the file format.  
 * -or-  
 * `null` if the format file is unknown.
 */
export const formatOf = (fileName: string) => {
    if (!fileName) return null;

    
    
    const match = fileName.match(/(?<=\.)\w+$/)?.[0];
    if (match) {
        if (match === 'ttf') return 'format("truetype")';

        return                      `format("${match}")`;
    } // if

    
    
    return null;
};



// styles:
export interface IconVars {
    /**
     * Icon's image url or icon's name.
     */
    img : any
}
const [iconRefs, iconDecls] = createCssVar<IconVars>();

export const usesIconLayout      = () => {
    // dependencies:
    
    // colors:
    const [foreg, foregRefs] = usesForeg();
    
    
    
    return composition([
        imports([
            // colors:
            foreg(),
        ]),
        layout({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // center items horizontally
            alignItems     : 'center',      // center items vertically
            flexWrap       : 'nowrap',      // no wrapping
            
            
            
            // positions:
            verticalAlign : 'baseline', // icon's text should be aligned with sibling text, so the icon behave like <span> wrapper
            
            
            
            // children:
            ...children('::before', [
                imports([
                    fillTextLineHeightLayout(),
                ]),
            ]),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // foregrounds:
            foreg : foregRefs.foreg,
        }),
    ]);
};
export const usesIconFontLayout  = (img?: Cust.Ref) => {
    return composition([
        rules([
            // load a custom font:
            fontFace([
                imports([
                    config.font.style, // define the font's properties
                ]),
                layout({
                    src: config.font.files.map((file) => `url("${concatUrl(config.font.path, file)}") ${formatOf(file)}`).join(','),
                }),
            ]),
        ]),
        layout({
            ...children('::after', [
                imports([
                    // use the loaded custom font:
                    config.font.style, // apply the defined font's properties
                ]),
                layout({
                    // layouts:
                    content       : img ?? iconRefs.img, // put the icon's name here, the font system will replace the name to the actual image
                    display       : 'inline',            // use inline, so it takes the width & height automatically
                    
                    
                    
                    // foregrounds:
                    foreg         : 'currentColor', // set foreground as icon's color
                    
                    
                    
                    // backgrounds:
                    backg         : 'transparent',  // set background as transparent
                    
                    
                    
                    // sizes:
                    fontSize      : cssProps.size, // set icon's size
                    overflowY     : 'hidden',      // hides the pseudo-inherited underline
                    
                    
                    
                    // accessibilities:
                    userSelect    : 'none', // disable selecting icon's text
                    
                    
                    
                    // typos:
                    lineHeight    : 1,
                    textTransform : 'none',
                    letterSpacing : 'normal',
                    wordWrap      : 'normal',
                    whiteSpace    : 'nowrap',
                    direction     : 'ltr',
                    
                    
                    
                    //#region turn on available browser features
                    '-webkit-font-smoothing'  : 'antialiased',        // support for all WebKit browsers
                    'textRendering'           : 'optimizeLegibility', // support for Safari and Chrome
                    '-moz-osx-font-smoothing' : 'grayscale',          // support for Firefox
                    fontFeatureSettings       : 'liga',               // support for IE
                    //#endregion turn on available browser features
                }),
            ]),
        }),
    ]);
};
export const usesIconImageLayout = (img?: Cust.Ref) => {
    return composition([
        layout({
            // backgrounds:
            backg         : 'currentColor', // set background as icon's color
            
            
            
            // sizes:
            // a dummy element, for making the image's width
            ...children('img', [
                layout({
                    // layouts:
                    display    : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // appearances:
                    visibility : 'hidden', // hide the element, but still consumes the dimension
                    
                    
                    
                    // sizes:
                    blockSize  : cssProps.size, // set icon's size
                    inlineSize : 'auto',        // calculates the width by [blockSize * aspect_ratio]
                    
                    
                    
                    // transition:
                    transition : 'inherit', // inherit transition for smooth sizing changes
                    
                    
                    
                    // accessibilities:
                    userSelect : 'none', // disable selecting icon's img
                }),
            ]),
            
            
            
            // image masking:
            maskSize      : 'contain',           // image's size is as big as possible without being cropped
            maskRepeat    : 'no-repeat',         // just one image, no repetition
            maskPosition  : 'center',            // place the image at the center
            maskImage     : img ?? iconRefs.img, // set icon's image
        }),
    ]);
};

export const usesIconVariants    = () => {
    // dependencies:
    
    // layouts:
    const [sizes]            = usesSizeVariant();
    
    // colors:
    const [themes]           = usesThemeVariant();
    const [mild]             = usesMildVariant();
    
    
    
    return composition([
        imports([
            // layouts:
            sizes(),
            
            // colors:
            themes(),
            mild(),
        ]),
    ]);
};

export const usesIconImage       = (img: Cust.Ref, foregOverwrite?: Cust.Ref, sizeOverwrite?: Cust.Ref) => {
    // dependencies:
    
    // layouts:
    const [sizes] = sizeOverwrite  ? usesSizeVariant(sizeOverwrite)  : [null];
    
    // colors:
    const [foreg, foregRefs] = foregOverwrite ? usesForeg(foregOverwrite) : [null, null];
    
    
    
    return composition([
        imports([
            // layouts:
            usesIconImageLayout(img),
            sizes?.(),
            
            // colors:
            foreg?.(),
        ]),
        (foregRefs ? layout({
            // foregrounds:
            foreg : foregRefs.foreg, // foreg => color => currentColor => backg
        }) : null),
    ]);
};

export const usesIcon = () => {
    return composition([
        imports([
            // layouts:
            usesIconLayout(),
            
            // variants:
            usesIconVariants(),
        ]),
        variants([
            rule('.font', [
                imports([
                    // layouts:
                    usesIconFontLayout(),
                ]),
            ]),
            rule('.img', [
                imports([
                    // layouts:
                    usesIconImageLayout(),
                ]),
            ]),
        ]),
    ]);
};

export const useIcon = <TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) => {
    return useMemo(() => {
        const iconImg = (() => {
            const file = config.img.files.find((file) => file.match(/[\w-.]+(?=\.\w+$)/)?.[0] === props.icon);
            if (!file) return null;
            return concatUrl(config.img.path, file);
        })();
        
        const isIconFont = config.font.items.includes(props.icon);



        return {
            class: (() => {
                if (iconImg)    return 'img';  // icon name is found in iconImg

                if (isIconFont) return 'font'; // icon name is found in iconFont

                return null; // icon name is not found in both iconImg & iconFont
            })(),

            style: {
                // appearances:
                [iconDecls.img]: (() => {
                    if (iconImg)    return `url("${iconImg}")`; // the url of the icon's image

                    if (isIconFont) return `"${props.icon}"`;   // the string of the icon's name

                    return undefined; // icon name is not found in both iconImg & iconFont
                })(),
            },

            children: [
                (iconImg && (
                    <img key='ico-img' src={iconImg} alt='' />
                )),
            ].filter((child) => !!child) as React.ReactNode,
        };
    }, [props.icon]);
};
export const useIconSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesIcon(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        foreg  : 'currentColor',
        
        sizeNm : '24px',
    };

    
    
    return {
        ...basics,
        size    :            basics.sizeNm,
        sizeSm  : [['calc(', basics.sizeNm, '*', 0.75  , ')']],
        sizeMd  : [['calc(', basics.sizeNm, '*', 1.50  , ')']],
        sizeLg  : [['calc(', basics.sizeNm, '*', 2.00  , ')']],
        size1em : '1em',



        // animations:
        transition : bcssProps.transition,
    };
}, { prefix: 'ico' });



export const config = {
    font: {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/fonts',

        /**
         * A list of icon's fonts with extensions.  
         * The order does matter. Place the most preferred file on the first.
         */
        files : [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],

        /**
         * A list of valid icon-font's content.
         */
        items : fontItems as unknown as string[],

        /**
         * The css style of icon-font to be loaded.
         */
        style : composition([
            layout({
                fontFamily     : '"Material Icons"',
                fontWeight     : 400,
                fontStyle      : 'normal',
                textDecoration : 'none',
            }),
        ]),
    },
    img: {
        /**
         * A `url directory` pointing to the collection of the icon's images.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/icons',

        /**
         * A list of icon's images with extensions.  
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files : [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
            'busy.svg',
            'prev.svg',
            'next.svg',
            'dropdown.svg',
            'dropright.svg',
            'dropleft.svg',
        ],
    },
};



// react components:
type CustomIconList  =
|'instagram'
|'whatsapp'
|'close'
|'busy'
|'prev'
|'next'
|'dropdown'
|'dropright'
|'dropleft';
export type IconList = CustomIconList | ((typeof fontItems)[number]) | (string & {})

export interface IconProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        // layouts:
        SizeVariant,
        
        // colors:
        ThemeVariant,
        MildVariant
{
    // appearances:
    icon: IconList
}
export function Icon<TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) {
    // styles:
    const sheet        = useIconSheet();
    
    
    
    // variants:
    const sizeVariant  = useSizeVariant(props);
    
    const themeVariant = useThemeVariant(props);
    const mildVariant  = useMildVariant(props);
    
    
    
    // appearances:
    const icon         = useIcon(props);
    
    
    
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                sizeVariant.class,
                
                themeVariant.class,
                mildVariant.class,
            ]}
            classes={[...(props.classes ?? []),
                // appearances:
                icon.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // appearances:
                ...icon.style,
            }}
        >
            { icon.children }
            { props.children }
        </Element>
    );
}
export { Icon as default }
