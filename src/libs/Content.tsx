// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    OptionalOrFalse,
}                           from './types'       // cssfn's types
import {
    // general types:
    SelectorCollection,
    
    
    
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
    fallbacks,
    
    
    
    //combinators:
    children,
    nextSiblings,
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
import {
    // types:
    PureSelectorList,
    
    
    
    // parses:
    parseSelectors,
    
    
    
    // creates & tests:
    createElementSelector,
    createPseudoClassSelector,
    isElementSelectorOf,
    createSelector,
    createSelectorList,
    isNotEmptySelectors,
    
    
    
    // renders:
    selectorToString,
    
    
    
    // transforms:
    groupSelectors,
    groupSelector,
}                           from './css-selector'

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
    // selectors:
    selectorIsFirstVisibleChild,
    selectorIsLastVisibleChild,
    
    
    
    // hooks:
    usesContainer,
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
}                           from './Container'
import Button               from './Button'



// utilities:
const toSelectors         = (selectorList: OptionalOrFalse<PureSelectorList>): SelectorCollection => selectorList && selectorList.map(selectorToString);
const childSelector       = createSelector( // the specificity weight including parent = 2.1 , is enough to overcome specificity `.FooMedia.FooVariant`
    // specificity weight = 1
    createPseudoClassSelector('nth-child', 'n'), // :nth-child(n)
    
    // specificity weight = 0.1
    createPseudoClassSelector( // :not(_)
        'not',
        createSelectorList(
            createSelector(
                createElementSelector('_')
            )
        ),
    ),
);
const setChildSpecificity = (selectorList: OptionalOrFalse<PureSelectorList>): OptionalOrFalse<PureSelectorList> => {
    return selectorList && (
        selectorList
        .map((selector) => createSelector( // the specificity weight including parent = 2.1 , is enough to overcome specificity `.FooMedia.FooVariant`
            ...selector,
            ...childSelector, // add specificity weight 1.1
        ))
    );
};



// styles:
const mediaElm    = ['figure', 'img', 'svg', 'video', 'picture', 'embed', 'object', '.media'];
const notMediaElm = '.not-media';
const linksElm    = ['a', '.link'];
const notLinksElm = '.not-link';

export interface ContentChildrenOptions {
    mediaSelector    ?: SelectorCollection
    notMediaSelector ?: SelectorCollection
}
export const usesContentChildrenOptions = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelector    : mediaSelectorStr    = mediaElm,
        notMediaSelector : notMediaSelectorStr = notMediaElm,
    } = options;
    
    const mediaSelector                = parseSelectors(mediaSelectorStr);
    const notMediaSelector             = parseSelectors(notMediaSelectorStr);
    const notNotMediaSelector          = notMediaSelector && createPseudoClassSelector( // create pseudo_class `:not()`
        'not',
        groupSelectors(notMediaSelector, { selectorName: 'where' }), // group multiple selectors with `:where()`, to suppress the specificity weight
    );
    
    const mediaSelectorWithExceptZero  = mediaSelector && (
        groupSelectors(mediaSelector, { selectorName: 'where' })     // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((mediaSelectorGroup) => createSelector(
            ...mediaSelectorGroup,
            notNotMediaSelector,                                     // :not(:where(...notMediaSelector))
        ))
    );
    
    return {
        mediaSelectorWithExcept     : toSelectors(setChildSpecificity(mediaSelectorWithExceptZero)),
        mediaSelectorWithExceptZero : toSelectors(mediaSelectorWithExceptZero),
        
        mediaSelector,
        notNotMediaSelector,
    };
};
export const usesContentChildrenFill = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
    } = usesContentChildrenOptions(options);
    
    
    
    // dependencies:
    
    // spacings:
    const [, containerRefs]     = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock  = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return style({
        ...imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: mediaSelectorWithExcept }), // make a nicely rounded corners
        ]),
        ...style({
            // children:
            ...children(mediaSelectorWithExcept, {
                // sizes:
                // span to maximum width including parent's paddings:
                boxSizing      : 'border-box', // the final size is including borders & paddings
                inlineSize     : 'fill-available',
                ...fallbacks({
                    inlineSize : `calc(100% + (${positivePaddingInline} * 2))`,
                }),
                
                
                
                // spacings:
                marginInline         : negativePaddingInline, // cancel out parent's padding with negative margin
                marginBlockEnd       : positivePaddingBlock,  // add a spacing to the next sibling
                ...rule(selectorIsFirstVisibleChild, {
                    marginBlockStart : negativePaddingBlock,  // cancel out parent's padding with negative margin
                }),
                ...rule(selectorIsLastVisibleChild,  {
                    marginBlockEnd   : negativePaddingBlock,  // cancel out parent's padding with negative margin
                }),
                
                
                
                // children:
                // make sibling <media> closer (cancel out prev sibling's spacing):
                ...nextSiblings(mediaSelectorWithExceptZero, {
                    // spacings:
                    marginBlockStart : negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                }),
            }),
        }),
    });
};
export const usesContentChildrenMedia = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
        
        mediaSelector,
        notNotMediaSelector,
    } = usesContentChildrenOptions(options);
    const figureSelector               = mediaSelector     && mediaSelector.find((m)   =>  m && m.some((e)  =>  isElementSelectorOf(e, 'figure')));
    const nonFigureSelector            = mediaSelector     && mediaSelector.filter((m) => !m || m.every((e) => !isElementSelectorOf(e, 'figure')));
    
    const figureSelectorWithExceptMod  = figureSelector    && (
        groupSelector(figureSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((figureSelectorGroup) => createSelector(
            ...figureSelectorGroup,
            notNotMediaSelector,                                 // :not(:where(...notMediaSelector))
        ))
    );
    const figureSelectorWithExcept     = toSelectors(setChildSpecificity(figureSelectorWithExceptMod));
    const figureSelectorWithCombinator = figureSelectorWithExceptMod && (
        figureSelectorWithExceptMod
        .map((figureSelectorGroup) =>
            createSelector(
                ...figureSelectorGroup,
                '>',
            )
        )
    );
    const nonFigureSelectorWithExcept  = toSelectors(setChildSpecificity(nonFigureSelector && (
        groupSelectors(nonFigureSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .flatMap((nonFigureSelectorGroup) => {
            const nonFigureSelectorWithExcept = createSelector(
                ...nonFigureSelectorGroup,
                notNotMediaSelector,                                 // :not(:where(...notMediaSelector))
            );
            return createSelectorList(
                nonFigureSelectorWithExcept,
                ...(!isNotEmptySelectors(figureSelectorWithCombinator) ? [] : figureSelectorWithCombinator.map((selectorCombi) => createSelector(
                    ...selectorCombi,
                    ...nonFigureSelectorWithExcept,
                ))),
            );
        })
    )));
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        // children:
        
        // first: reset top_level <figure>
        ...children(figureSelectorWithExcept, {
            ...imports([
                stripoutFigure(), // clear browser's default styling on figure
                
                // borders:
                usesBorderAsContainer(), // make a nicely rounded corners
            ]),
            ...style({
                // layouts:
                display        : 'flex',    // use block flexbox, so it takes the entire parent's width
                flexDirection  : 'column',  // items are stacked vertically
                justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
                alignItems     : 'stretch', // items width are 100% of the parent
                flexWrap       : 'nowrap',  // prevents the items to wrap to the next column
                
                
                
                // children:
                ...children('*', {
                    ...expandBorderRadius(), // expand borderRadius css vars
                }),
            }),
        }),
        
        // then: styling top_level <figure>, top_level <media> & nested <media>:
        ...children(nonFigureSelectorWithExcept, {
            // layouts:
            ...rule(':not(.media)', {
                ...imports([
                    stripoutImage(), // clear browser's default styling on image
                ]),
                ...style({
                    display : 'block', // fills the entire parent's width
                }),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
        }),
        
        // finally: styling top_level <figure> & top_level <media> as separator:
        ...children(mediaSelectorWithExcept, {
            ...style({
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
            ...imports([
                // borders:
                usesBorderAsSeparatorBlock({ itemsSelector: mediaSelectorWithExceptZero }), // must be placed at the last
            ]),
        }),
    });
};
export interface ContentChildrenLinksOptions {
    linkSelector    ?: SelectorCollection
    notLinkSelector ?: SelectorCollection
}
export const usesContentChildrenLinksOptions = (options: ContentChildrenLinksOptions = {}) => {
    // options:
    const {
        linkSelector    : linkSelectorStr    = linksElm,
        notLinkSelector : notLinkSelectorStr = notLinksElm,
    } = options;
    
    const linkSelector                 = parseSelectors(linkSelectorStr);
    const notLinkSelector              = parseSelectors(notLinkSelectorStr);
    const notNotLinkSelector           = notLinkSelector && createPseudoClassSelector( // create pseudo_class `:not()`
        'not',
        groupSelectors(notLinkSelector, { selectorName: 'where' }), // group multiple selectors with `:where()`, to suppress the specificity weight
    );
    
    const linkSelectorWithExceptZero   = linkSelector && (
        groupSelectors(linkSelector, { selectorName: 'where' })     // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((linkSelectorGroup) => createSelector(
            ...linkSelectorGroup,
            notNotLinkSelector,                                     // :not(:where(...notLinkSelector))
        ))
    );
    
    return {
        linkSelectorWithExcept     : toSelectors(setChildSpecificity(linkSelectorWithExceptZero)),
        linkSelectorWithExceptZero : toSelectors(linkSelectorWithExceptZero),
        
        linkSelector,
        notNotLinkSelector,
    };
};
export const usesContentChildrenLinks = (options: ContentChildrenLinksOptions = {}) => {
    // options:
    const {
        linkSelectorWithExcept,
        linkSelectorWithExceptZero,
    } = usesContentChildrenLinksOptions(options);
    
    
    
    return style({
        // children:
        ...children(linkSelectorWithExcept, {
            // children:
            // make a gap to sibling <a>:
            ...nextSiblings(linkSelectorWithExceptZero, {
                // spacings:
                // add a space between links:
                marginInlineStart: cssProps.linkSpacing,
            }),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
        }),
    });
};
export const usesContentChildren = (options: (ContentChildrenOptions & ContentChildrenLinksOptions) = {}) => {
    return style({
        ...imports([
            // media:
            usesContentChildrenMedia(options),
            
            // links:
            usesContentChildrenLinks(options),
            
            // spacings:
            usesContentChildrenFill(options), // must be placed at the last
        ]),
    });
};

export const usesContentBasicLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(cssProps), // apply general cssProps
        
        
        
        // spacings:
        ...expandPadding(cssProps), // expand padding css vars
    });
};
export const usesContentLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
            usesContentBasicLayout(),
        ]),
    });
};
export const usesContentBasicVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // layouts:
            sizes(),
        ]),
    });
};
export const usesContentVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            usesContentBasicVariants(),
        ]),
    });
};

export const useContentSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesContentLayout(),
            
            // variants:
            usesContentVariants(),
            
            // children:
            usesContentChildren(),
        ]),
    ),
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
    
    
    
    // rest props:
    const {
        // children:
        children,
    ...restProps} = props;

    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restProps}
            
            
            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            {React.Children.map(children, (child) => {
                // link:
                if (
                    React.isValidElement<React.AnchorHTMLAttributes<HTMLButtonElement>>(child)
                    &&
                    (
                        (child.type === 'a')
                        ||
                        (
                            (typeof(child.type) === 'string')
                            &&
                            (child.props.className ?? '').split(' ').some((className) => (className === 'link'))
                        )
                    )
                    &&
                    !(child.props.className ?? '').split(' ').some((className) => (className === 'not-link'))
                ) {
                    // rest props:
                    const {
                        type, // discard
                    ...btnProps} = child.props;
                    
                    
                    
                    return (
                        <Button
                            // semantics:
                            tag={(child.type ?? 'a') as any}
                            
                            
                            // variants:
                            btnStyle='link'
                            
                            
                            // other props:
                            {...btnProps}
                        />
                    );
                } // if
                
                
                
                // other component:
                return child;
            })}
        </Basic>
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
