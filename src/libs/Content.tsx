// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // general types:
    Selector,
    SelectorCollection,
    
    
    
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



// styles:
const mediaElm = ['figure', 'img', 'svg', 'video', '.media'];
const linksElm = ['a', '.link'];

export interface ContentChildrenOptions {
    mediaSelector ?: SelectorCollection
}
export const usesContentChildrenFill = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelector = mediaElm,
    } = options;
    
    
    
    // dependencies:
    
    // spacings:
    const [, containerRefs]     = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock  = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return composition([
        imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: mediaSelector }), // make a nicely rounded corners
        ]),
        layout({
            // children:
            ...children(mediaSelector, [
                layout({
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
                    ...nextSiblings(mediaSelector, [
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
            ]),
        }),
    ]);
};
export const usesContentChildrenMedia = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelector = mediaElm,
    } = options;
    
    const allMediaSelector = (
        [mediaSelector]
        .flat(Infinity)
        .filter((m): m is Selector => !!m)
    );
    const figureSelector    = allMediaSelector.some((m) => (m === 'figure')) && 'figure';
    const nonFigureSelector = allMediaSelector.filter((m): m is Selector => !!m && (m !== 'figure'))
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        layout({
            // children:
            
            // first: reset top_level <figure>
            ...children(figureSelector, [
                imports([
                    stripoutFigure(), // clear browser's default styling on figure
                ]),
                layout({
                    // layouts:
                    display : 'block', // fills the entire parent's width
                }),
            ]),
            
            // then: styling top_level <figure>, top_level <media> & nested <media>:
            ...children([
                nonFigureSelector,
                nonFigureSelector.map((m) => `figure>${m}`),
            ], [
                imports([
                    stripoutImage(), // clear browser's default styling on image
                ]),
                layout({
                    // layouts:
                    display : 'block', // fills the entire parent's width
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
                }),
            ]),
            
            // finally: styling top_level <figure> & top_level <media> as separator:
            ...children(allMediaSelector, [
                layout({
                    // borders:
                    // let's Nodestrap system to manage borderStroke & borderRadius:
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
                    usesBorderAsSeparatorBlock({ itemsSelector: allMediaSelector }), // must be placed at the last
                ]),
            ]),
        }),
    ]);
};
export interface ContentChildrenLinksOptions {
    linkSelector ?: SelectorCollection
}
export const usesContentChildrenLinks = (options: ContentChildrenLinksOptions = {}) => {
    // options:
    const {
        linkSelector = linksElm,
    } = options;
    
    
    
    return composition([
        layout({
            // children:
            ...children(linkSelector, [
                layout({
                    // children:
                    // make a gap to sibling <a>:
                    ...nextSiblings(linkSelector, [
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
        }),
    ]);
};
export const usesContentChildren = (options: (ContentChildrenOptions & ContentChildrenLinksOptions) = {}) => {
    return composition([
        imports([
            // media:
            usesContentChildrenMedia(options),
            
            // links:
            usesContentChildrenLinks(options),
            
            // spacings:
            usesContentChildrenFill(options), // must be placed at the last
        ]),
    ]);
};

export const usesContentBasicLayout = () => {
    return composition([
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
            // layouts:
            usesContentLayout(),
            
            // variants:
            usesContentVariants(),
            
            // children:
            usesContentChildren(),
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
