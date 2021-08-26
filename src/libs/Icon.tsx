// react (builds html using javascript):
import {
    default as React,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
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
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
    
    
    
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
    // hooks:
    SizeName       as BasicComponentSizeName,
    isSize         as basicComponentIsSize,
    usesSizes      as basicComponentUsesSizes,
    VariantSize    as BasicComponentVariantSize,
    useVariantSize as basicComponentUseVariantSize,
    
    usesThemes,
    VariantTheme,
    useVariantTheme,
    
    usesMild,
    VariantMild,
    useVariantMild,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './BasicComponent'
import fontItems            from './Icon-font-material'



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'nm'|'md'|'lg'|'1em'

export const isSize = (sizeName: SizeName, styles: StyleCollection) => basicComponentIsSize(sizeName as BasicComponentSizeName, styles);

/**
 * Uses basic sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizes = (factory = sizeOf, options = sizeOptions()) => basicComponentUsesSizes(factory, options as BasicComponentSizeName[]);
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
export const sizeOptions = (): SizeName[] => ['sm', 'nm', 'md', 'lg', '1em'];

export interface VariantSize {
    size?: SizeName
}
export const useVariantSize = (props: VariantSize) => basicComponentUseVariantSize(props as BasicComponentVariantSize);
//#endregion sizes



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
    const dummyUrl  = new URL('http://dummy')
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
     * functional foreground icon color.
     */
    foregFn : any
    /**
     * final foreground icon color.
     */
    foreg   : any
    
    
    
    /**
     * Icon's image url or icon's name.
     */
    img     : any
}
const [iconRefs, iconDecls] = createCssVar<IconVars>();

export const usesIconBase = (foreg?: Cust.Ref) => {
    // dependencies:
    
    // layouts:
    const [sizes]                         = usesSizes();
    
    
    
    return composition([
        imports([
            // layouts:
            sizes(),
        ]),
        layout({
            // layouts:
            display       : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection : 'row',         // flow to the document's writting flow
            alignItems    : 'center',      // center items vertically
            flexWrap      : 'nowrap',      // do not wrap the children to the next row
            
            
            
            // positions:
            verticalAlign : 'baseline', // icon's text should be aligned with sibling text, so the icon behave like <span> wrapper
            
            
            
            // a dummy text content, for making parent's height as tall as line-height
            // the dummy is also used for calibrating the flex's vertical position
            ...children('::before', [
                layout({
                    // layouts:
                    content    : '"\xa0"',       // &nbsp;
                    display    : 'inline-block', // use inline-block, so we can kill the width
                    
                    
                    
                    // appearances:
                    overflow   : 'hidden', // crop the text width (&nbsp;)
                    visibility : 'hidden', // hide the element, but still consumes the dimension
                    
                    
                    
                    // sizes:
                    inlineSize : 0,        // kill the width, we just need the height
                }),
            ]),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // foregrounds:
            foreg : iconRefs.foreg,
        }),
        (foreg ? vars({
            [iconDecls.foreg] : foreg,
        }) : null),
        (foreg ? null : (() => {
            // dependencies:
            
            // colors:
            const [themes, themeRefs, themeDecls] = usesThemes();
            const [mild  , mildRefs             ] = usesMild();
            
            
            
            return composition([
                imports([
                    // colors:
                    themes(),
                    mild(),
                ]),
                vars({
                    // prevent theme from inheritance, so the Icon always use currentColor if the theme is not set
                    [themeDecls.backgTheme]     : 'initial',
                    [themeDecls.backgMildTheme] : 'initial',
                    
                    
                    
                    [iconDecls.foregFn] : fallbacks(
                     // themeRefs.backgImpt,  // first  priority
                        themeRefs.backgTheme, // second priority
                     // themeRefs.backgCond,  // third  priority
                        
                        cssProps.foreg,       // default => uses config's foreground
                    ),
                    [iconDecls.foreg]   : fallbacks(
                        mildRefs.backgMildTg, // toggle mild (if `usesMild()` applied)
                        
                        iconRefs.foregFn,     // default => uses our `foregFn`
                    ),
                }),
            ]);
        })()),
    ]);
};
export const usesIconFont = (img?: Cust.Ref, foreg?: Cust.Ref) => {
    return composition([
        imports([
            usesIconBase(foreg),
        ]),
        rules([
            /*rule('@global', composition([
                rules([
                    //#region custom font
                    rule('@font-face', composition([
                        imports([
                            config.font.styles, // define the font's properties
                        ]),
                        layout({
                            src: config.font.files.map((file) => `url("${concatUrl(config.font.path, file)}") ${formatOf(file)}`).join(','),
                        }),
                    ])),
                    //#endregion custom font
                ]),
            ])),*/
        ]),
        imports([
            // use the loaded custom font:
            config.font.styles, // apply the defined font's properties
        ]),
        layout({
            ...children('::after', [
                layout({
                    // layouts:
                    content       : img ?? iconRefs.img, // put the icon's name here, the font system will replace the name to the actual image
                    display       : 'inline',            // use inline, so it takes the width & height automatically
                    
                    
                    
                    // backgrounds:
                    backg         : 'transparent', // set background as transparent
                    
                    
                    
                    // sizes:
                    fontSize      : cssProps.size, // set icon's size
                    overflowY     : 'hidden',      // hides the pseudo-inherited underline
                    
                    
                    
                    // transition:
                    transition    : 'inherit',
                    
                    
                    
                    // accessibility:
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
                    //#endregion fonts
                }),
            ]),
        }),
    ]);
};
export const usesIconImage = (img?: Cust.Ref, foreg?: Cust.Ref) => {
    return composition([
        imports([
            usesIconBase(foreg),
        ]),
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
                    
                    
                    
                    // accessibility:
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
export const usesIcon = () => {
    return composition([
        variants([
            rule('.font', composition([
                imports([
                    usesIconFont(),
                ]),
            ])),
            rule('.img', composition([
                imports([
                    usesIconImage(),
                ]),
            ])),
        ]),
    ]);
};

export const useIcon = <TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) => {
    return useMemo(() => {
        const imgIcon = (() => {
            const file = config.img.files.find((file) => file.match(/[\w-.]+(?=\.\w+$)/)?.[0] === props.icon);
            if (!file) return null;
            return concatUrl(config.img.path, file);
        })();

        const isFontIcon = config.font.items.includes(props.icon);



        return {
            class: (() => {
                if (imgIcon)    return 'img';  // icon name is found in imgIcon

                if (isFontIcon) return 'font'; // icon name is found in fontIcon

                return null; // icon name is not found in both imgIcon & fontIcon
            })(),

            style: {
                // appearances:
                [iconDecls.img]: (() => {
                    if (imgIcon)    return `url("${imgIcon}")`; // the url of the icon's image

                    if (isFontIcon) return `"${props.icon}"`;   // the string of the icon's name

                    return undefined; // icon name is not found in both imgIcon & fontIcon
                })(),
            },

            children: [
                (imgIcon && (
                    <img key='ico-img' src={imgIcon} alt='' />
                )),
            ].filter((child) => !!child) as React.ReactNode,
        };
    }, [props.icon]);
};
export const useIconSheet = createUseCssfnStyle(() => [
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



const config = {
    font: {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.  
         * It's the `front-end url`, not the physical path on the server.
         */
        path  : '/fonts/',

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
        items : fontItems,

        /**
         * The css style of icon-font to be loaded.
         */
        styles : composition([
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
        path  : '/icons/',

        /**
         * A list of icon's images with extensions.  
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files : [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
        ],
    },
};



// react components:

export interface IconProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        // layouts:
        VariantSize,
        
        // colors:
        VariantTheme,
        VariantMild
{
    // appearances:
    icon: string
}
export const Icon = <TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) => {
    // styles:
    const sheet        = useIconSheet();
    
    
    
    // variants:
    const variSize     = useVariantSize(props);
    
    const variTheme    = useVariantTheme(props);
    const variMild     = useVariantMild(props);

    
    
    // appearances:
    const icon  = useIcon(props);



    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'span'}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                variSize.class,

                variTheme.class,
                variMild.class,
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
};
export { Icon as default }
