// react:
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
    nextSiblings,
    
    
    
    // rules:
    variants,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import spacers              from './spacers'     // configurable spaces defs
import {
    stripoutFigure,
    stripoutImage,
}                           from './stripouts'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    
    expandBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    expandPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // hooks:
    usesContainer,
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
}                           from './Container'



// spacings:

export const usesMediaFill = () => {
    // dependencies:
    
    // spacings:
    const [, containerRefs]     = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock  = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return composition([
        layout({
            // layouts:
            display        : 'block', // fills the entire parent's width
            
            
            
            // sizes:
            // span to maximum width including parent's paddings:
            boxSizing      : 'border-box', // the final size is including borders & paddings
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : `calc(100% + (${positivePaddingInline} * 2))`,
            },
            
            
            
            // spacings:
            marginInline   : negativePaddingInline, // cancel out parent's padding with negative margin
            marginBlockEnd : positivePaddingBlock,  // add a spacing to the next sibling
            
            
            
            // children:
            // make sibling <media> closer (cancel out prev sibling's spacing):
            ...nextSiblings(mediaElm, [
                layout({
                    // spacings:
                    marginBlockStart : negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                }),
            ]),
        }),
        variants([
            rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // spacings:
                    marginBlockStart : negativePaddingBlock, // cancel out parent's padding with negative margin
                }),
            ]),
            rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // spacings:
                    marginBlockEnd   : negativePaddingBlock, // cancel out parent's padding with negative margin
                }),
            ]),
        ]),
    ]);
};



// styles:
const mediaElm = ['figure', 'img', 'svg', 'video', '.media'];

export const usesContentMediaLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            stripoutImage(), // clear browser's default styling on image
            
            // spacings:
            usesMediaFill(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
            
            
            
            // borders:
            ...expandBorderStroke(), // expand borderStroke css vars
            ...expandBorderRadius(), // expand borderRadius css vars
            // remove rounded corners on top:
            [borderRadiusDecls.borderStartStartRadius] : '0px',
            [borderRadiusDecls.borderStartEndRadius  ] : '0px',
            // remove rounded corners on bottom:
            [borderRadiusDecls.borderEndStartRadius  ] : '0px',
            [borderRadiusDecls.borderEndEndRadius    ] : '0px',
        }),
        imports([
            // borders:
            usesBorderAsSeparatorBlock({ itemsSelector: mediaElm }),
        ]),
    ]);
};
export const usesContentMedia = () => {
    return composition([
        layout({
            // children:
            //#region links
            // handle <a> as content-link:
            
            ...children('a', [
                layout({
                    // children:
                    // following by another <a>:
                    ...nextSiblings('a', [
                        layout({
                            // spacings:
                            // add a space between links:
                            marginInlineStart: cssProps.linkSpacing,
                        }),
                    ]),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
                }),
            ]),
            //#endregion links
            
            //#region media
            // handle <figure> & <media> as content-media:
            
            //#region first: reset top_level <figure> and inner <media>
            ...children('figure', [
                imports([
                    stripoutFigure(), // clear browser's default styling on figure
                ]),
                layout({
                    // children:
                    ...children(mediaElm.filter((m) => (m !== 'figure')), [
                        imports([
                            stripoutImage(), // clear browser's default styling on image
                        ]),
                        layout({
                            // layouts:
                            display: 'block', // fills the entire parent's width
                        }),
                    ]),
                }),
            ]),
            //#endregion first: reset top_level <figure> and inner <media>
            
            // then: styling top_level <figure> & top_level <media>:
            ...children(mediaElm, [
                imports([
                    // layouts:
                    usesContentMediaLayout(),
                ]),
            ]),
            //#endregion media
        }),
    ]);
};



export const usesContentBasicLayout = () => {
    return composition([
        imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: mediaElm }), // make a nicely rounded corners
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
export const usesContentLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
            usesContentBasicLayout(),
        ]),
    ]);
};
export const usesContentBasicVariants = () => {
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
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesContentVariants = () => {
    return composition([
        imports([
            // variants:
            usesBasicVariants(),
            
            // layouts:
            usesContentBasicVariants(),
        ]),
    ]);
};

export const useContentSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // media:
            usesContentMedia(),
            
            // layouts:
            usesContentLayout(),
            
            // variants:
            usesContentVariants(),
        ]),
    ]),
], /*sheetId :*/'2h0i4lc78z'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        paddingInline   : spacers.default, // override to Basic
        paddingBlock    : spacers.default, // override to Basic
        paddingInlineSm : spacers.sm,      // override to Basic
        paddingBlockSm  : spacers.sm,      // override to Basic
        paddingInlineLg : spacers.lg,      // override to Basic
        paddingBlockLg  : spacers.lg,      // override to Basic
        //#endregion spacings
        
        
        
        // links:
        linkSpacing     : spacers.sm,
    };
}, { prefix: 'ct' });



// react components:

export interface ContentProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export function Content<TElement extends HTMLElement = HTMLElement>(props: ContentProps<TElement>) {
    // styles:
    const sheet = useContentSheet();

    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export { Content as default }



export function Article(props: ContentProps) { return <Content {...props} semanticTag='article' semanticRole='article' />       }
export function Section(props: ContentProps) { return <Content {...props} semanticTag='section' semanticRole='region' />        }
export function Aside  (props: ContentProps) { return <Content {...props} semanticTag='aside'   semanticRole='complementary' /> }

// mark as Content compatible:
Article.prototype = Content.prototype;
Section.prototype = Content.prototype;
Aside.prototype   = Content.prototype;
