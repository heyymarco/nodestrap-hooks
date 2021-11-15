// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // general types:
    SelectorCollection,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    children,
    adjacentSiblings,
    
    
    
    // rules:
    variants,
    rule,
    noRule,
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
import spacers              from './spacers'     // configurable spaces defs
import {
    stripoutFigure,
    stripoutImage,
}                           from './stripouts'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    
    usesBorderStroke,
    expandBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    usesPadding,
    expandPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;


//#region containers
export interface ContainerVars {
    // borders:
    borderWidth            : any
    
    borderStartStartRadius : any
    borderStartEndRadius   : any
    borderEndStartRadius   : any
    borderEndEndRadius     : any
    
    
    
    // spacings:
    paddingInline          : any
    paddingBlock           : any
}
const [containerRefs, containerDecls] = createCssVar<ContainerVars>();

/**
 * Uses container.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents container definitions.
 */
export const usesContainer = () => {
    // dependencies:
    
    // borders:
    const [, borderStrokeRefs] = usesBorderStroke();
    const [, borderRadiusRefs] = usesBorderRadius();
    
    // spacings:
    const [, paddingRefs     ] = usesPadding();
    
    
    
    return [
        () => composition([
            vars({
                // borders:
                [containerDecls.borderWidth           ] : borderStrokeRefs.borderWidth,
                
                [containerDecls.borderStartStartRadius] : borderRadiusRefs.borderStartStartRadius,
                [containerDecls.borderStartEndRadius  ] : borderRadiusRefs.borderStartEndRadius,
                [containerDecls.borderEndStartRadius  ] : borderRadiusRefs.borderEndStartRadius,
                [containerDecls.borderEndEndRadius    ] : borderRadiusRefs.borderEndEndRadius,
                
                
                
                // spacings:
                [containerDecls.paddingInline]          : paddingRefs.paddingInline,
                [containerDecls.paddingBlock ]          : paddingRefs.paddingBlock,
            }),
        ]),
        containerRefs,
        containerDecls,
    ] as const;
};
//#endregion containers


// borders:
export interface BorderContainerOptions extends OrientationRuleOptions {
    itemsSelector? : SelectorCollection
}
export const usesBorderAsContainer = (options?: BorderContainerOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    const {
        itemsSelector = '*',
    } = options;
    
    
    
    // dependencies:
    
    // layouts:
    const [container, containerRefs, containerDecls   ] = usesContainer();
    
    // borders:
    const [         ,              , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // layouts:
            container(),
        ]),
        // layout({
        //     // borders:
        //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        variants([
            !!orientationBlockSelector  && rule(orientationBlockSelector,  [
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderStartStartRadius] : 'inherit', // reads parent's prop
                                    [containerDecls.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on top:
                                    [borderRadiusDecls.borderStartStartRadius] : `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderStartEndRadius  ] : `calc(${containerRefs.borderStartEndRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                            rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                                    [containerDecls.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on bottom:
                                    [borderRadiusDecls.borderEndStartRadius  ] : `calc(${containerRefs.borderEndStartRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius    ] : `calc(${containerRefs.borderEndEndRadius    } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            !!orientationInlineSelector && rule(orientationInlineSelector, [
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(':where(:first-child)', [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderStartStartRadius] : 'inherit', // reads parent's prop
                                    [containerDecls.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on left:
                                    [borderRadiusDecls.borderStartStartRadius] : `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndStartRadius  ] : `calc(${containerRefs.borderEndStartRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                            rule(':where(:last-child)',  [ // :where(...) => zero specificity => easy to overwrite
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                                    
                                    [containerDecls.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                                    [containerDecls.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on right:
                                    [borderRadiusDecls.borderStartEndRadius  ] : `calc(${containerRefs.borderStartEndRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius    ] : `calc(${containerRefs.borderEndEndRadius    } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            (!orientationBlockSelector  && !orientationInlineSelector) && noRule([
                layout({
                    // children:
                    ...children(itemsSelector, [
                        vars({
                            /*
                                if the_current_element is a_child_of_container and also a_separator,
                                the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                so we can calculate the correct inner_borderRadius.
                                
                                that's why we set `!important` to the `containerDecls.borderWidth`.
                            */
                            [containerDecls.borderWidth           ] : 'inherit !important', // reads parent's prop
                            
                            [containerDecls.borderStartStartRadius] : 'inherit', // reads parent's prop
                            [containerDecls.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                            [containerDecls.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                            [containerDecls.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        }),
                        layout({
                            // borders:
                            
                            // add rounded corners on top:
                            [borderRadiusDecls.borderStartStartRadius] : `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            [borderRadiusDecls.borderStartEndRadius  ] : `calc(${containerRefs.borderStartEndRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            
                            // add rounded corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius  ] : `calc(${containerRefs.borderEndStartRadius  } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            [borderRadiusDecls.borderEndEndRadius    ] : `calc(${containerRefs.borderEndEndRadius    } - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                            
                            /* recursive calculation of borderRadius is not supported yet */
                        }),
                    ]),
                }),
            ]),
        ]),
    ]);
};


export interface BorderSeparatorOptions {
    replaceLast? : boolean
}
export const usesBorderAsSeparatorBlock  = (options: BorderSeparatorOptions = {}) => {
    // options:
    const {
        replaceLast  = false,
    } = options;
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // layouts:
    const [, , containerDecls   ] = usesContainer();
    
    
    
    return composition([
        layout({
            // borders:
            borderInlineWidth : 0, // remove (left|right)-border
            
            
            
            // shadows:
            boxShadow         : undefined, // remove shadow
        }),
        vars({
            /*
                if the_current_element is a container,
                the `containerDecls.borderWidth` will be deleted (not follows `borderWidth`),
                because the_current_element becomes a separator.
                
                use `0px` instead of 0,
                because the value will be calculated in `calc()` expression.
            */
            [containerDecls.borderWidth] : '0px',
        }),
        
        // removes unecessary border stroke:
        variants([
            // supports for Card too
            
            // assumes the Card *always* have a body, so the second-last-item is always a body
            // remove bottom-border at the last-item, so that it wouldn't collide with the Card's bottom-border
            // and
            // remove double border by removing bottom-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the bottom-border, we need it for the replacement of the footer's top-border
            rule((replaceLast ? ':where(:not(:nth-last-child(2)))' : '&'), [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    borderBlockEndWidth    : 0, // remove bottom-border
                }),
            ]),
            
            
            
            // remove top-border at the header, so that it wouldn't collide with the Card's top-border
            // remove top-border at the footer, as the replacement => use second-last-item bottom-border (from the body)
            rule([':where(:first-child)', (replaceLast && ':where(:last-child)')], [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    borderBlockStartWidth  : 0, // remove top-border
                }),
            ]),
        ]),
        
        // removes unecessary border radius:
        // although the border stroke was/not removed, it *affects* the children's border radius
        // do not remove border radius at the parent's corners (:first-child & :last-child)
        variants([
            rule(':where(:not(:first-child))', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    // remove rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : '0px',
                    [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                }),
            ]),
            rule(':where(:not(:last-child))', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    // remove rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                    [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                }),
            ]),
        ]),
    ]);
};
export const usesBorderAsSeparatorInline = (options: BorderSeparatorOptions = {}) => {
    // options:
    const {
        replaceLast  = false,
    } = options;
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // layouts:
    const [, , containerDecls   ] = usesContainer();
    
    
    
    return composition([
        layout({
            // borders:
            borderBlockWidth  : 0, // remove (top|bottom)-border
            
            
            
            // shadows:
            boxShadow         : undefined, // remove shadow
        }),
        vars({
            /*
                if the_current_element is a container,
                the `containerDecls.borderWidth` will be deleted (not follows `borderWidth`),
                because the_current_element becomes a separator.
                
                use `0px` instead of 0,
                because the value will be calculated in `calc()` expression.
            */
            [containerDecls.borderWidth] : '0px',
        }),
        
        // removes unecessary border stroke:
        variants([
            // supports for Card too
            
            // assumes the Card *always* have a body, so the second-last-item is always a body
            // remove right-border at the last-item, so that it wouldn't collide with the Card's right-border
            // and
            // remove double border by removing right-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the right-border, we need it for the replacement of the footer's left-border
            rule((replaceLast ? ':where(:not(:nth-last-child(2)))' : '&'), [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    borderInlineEndWidth   : 0, // remove right-border
                }),
            ]),
            
            
            
            // remove left-border at the header, so that it wouldn't collide with the Card's left-border
            // remove left-border at the footer, as the replacement => use second-last-item right-border (from the body)
            rule([':where(:first-child)', (replaceLast && ':where(:last-child)')], [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    borderInlineStartWidth : 0, // remove left-border
                }),
            ]),
        ]),
        
        // removes unecessary border radius:
        // although the border stroke was/not removed, it *affects* the children's border radius
        // do not remove border radius at the parent's corners (:first-child & :last-child)
        variants([
            rule(':where(:not(:first-child))', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    // remove rounded corners on left:
                    [borderRadiusDecls.borderStartStartRadius] : '0px',
                    [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                }),
            ]),
            rule(':where(:not(:last-child))', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    // remove rounded corners on right:
                    [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                    [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                }),
            ]),
        ]),
    ]);
};


export const usesMediaBorderSeparator = () => {
    return composition([
        imports([
            // borders:
            usesBorderAsSeparatorBlock(),
        ]),
        layout({
            // children:
            // make sibling <media> closer:
            // remove double border by removing top-border at the adjacent media(s)
            ...adjacentSiblings(mediaElm, [
                layout({
                    // borders:
                    borderBlockStartWidth  : 0, // remove top-border
                }),
            ]),
        }),
        variants([
            // supports for Card too
            
            // because we avoid modifying paragraph's top-border, we delegate the top-border to the <media>
            // so, we need to restore bottom-border that was removed by `usesBorderAsSeparatorBlock()`
            rule('&', [
                layout({
                    // borders:
                    borderBlockEndWidth    : undefined, // restore bottom-border
                }),
            ]),
            // then replace the algoritm above with this one:
            // remove bottom-border at the last-item, so that it wouldn't collide with the Card's bottom-border
            rule(':where(:last-child)', [ // :where(...) => zero specificity => easy to overwrite
                layout({
                    // borders:
                    borderBlockEndWidth    : 0, // remove bottom-border
                }),
            ]),
        ]),
    ]);
};


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
            ...adjacentSiblings(mediaElm, [
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
            usesMediaBorderSeparator(),
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
                    ...adjacentSiblings('a', [
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
export const usesContent = () => {
    return composition([
        imports([
            // media:
            usesContentMedia(),
            
            // layouts:
            usesContentLayout(),
            
            // variants:
            usesContentVariants(),
        ]),
    ]);
};

export const useContentSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesContent(),
        ]),
    ]),
]);



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
