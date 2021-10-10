// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Cust,
}                           from './css-types'   // ts defs support for cssfn
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
    isFirstChild,
    isNotFirstChild,
    isLastChild,
    isNotLastChild,
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
import {
    // hooks:
    usesSizeVariant,
    usesBorderStroke,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // configs:
    cssProps as bcssProps,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import spacers              from './spacers'     // configurable spaces defs
import {
    stripoutFigure,
    stripoutImage,
}                           from './stripouts'



// hooks:

// layouts:

export const usesMediaFill = (paddingInline? : Cust.Ref, paddingBlock? : Cust.Ref) => {
    // dependencies:
    
    // paddings:
    const [, paddingRefs]       = usesPadding(paddingInline, paddingBlock);
    const negativePaddingInline = `calc(0px - ${paddingRefs.paddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${paddingRefs.paddingBlock})`;
    
    
    
    return composition([
        layout({
            // layouts:
            display        : 'block', // fills the entire parent's width
            
            
            
            // sizes:
            // span to maximum width including parent's paddings:
            boxSizing      : 'border-box', // the final size is including borders & paddings
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : `calc(100% + (${paddingRefs.paddingInline} * 2))`,
            },
            
            
            
            // spacings:
            marginInline   : negativePaddingInline, // cancel out parent's padding with negative margin
            
            marginBlockEnd : paddingRefs.paddingBlock, // add a spacing to the next sibling
            
            
            
            // children:
            // make sibling <media> closer (cancel out prev sibling's spacing):
            ...adjacentSiblings(mediaElm, composition([
                layout({
                    // spacings:
                    marginBlockStart : negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                }),
            ])),
        }),
        variants([
            isFirstChild(composition([
                layout({
                    // spacings:
                    marginBlockStart : negativePaddingBlock, // cancel out parent's padding with negative margin
                }),
            ])),
            isLastChild(composition([
                layout({
                    // spacings:
                    marginBlockEnd   : negativePaddingBlock, // cancel out parent's padding with negative margin
                }),
            ])),
        ]),
    ]);
};


// borders:
interface BorderVars {
    borderStartStartRadius : any
    borderStartEndRadius   : any
    borderEndStartRadius   : any
    borderEndEndRadius     : any
}
const [borderRadiusRefs, borderRadiusDecls] = createCssVar<BorderVars>();
export const usesBorderRadius = (borderRadius : Cust.Ref = bcssProps.borderRadius) => {
    return [
        () => composition([
            vars({
                [borderRadiusDecls.borderStartStartRadius] : borderRadius,
                [borderRadiusDecls.borderStartEndRadius]   : borderRadius,
                [borderRadiusDecls.borderEndStartRadius]   : borderRadius,
                [borderRadiusDecls.borderEndEndRadius]     : borderRadius,
            }),
            layout({
                // borders:
                borderStartStartRadius : borderRadiusRefs.borderStartStartRadius,
                borderStartEndRadius   : borderRadiusRefs.borderStartEndRadius,
                borderEndStartRadius   : borderRadiusRefs.borderEndStartRadius,
                borderEndEndRadius     : borderRadiusRefs.borderEndEndRadius,
            }),
        ]),
        borderRadiusRefs,
        borderRadiusDecls,
    ] as const;
};


export const usesBorderAsContainer = (itemsSelector: SelectorCollection = '*', orientationBlockRule : SelectorCollection = ':not(.inline)', orientationInlineRule : SelectorCollection = '.inline', borderWidth : Cust.Ref = bcssProps.borderWidth, borderRadiusRef? : Cust.Ref) => {
    // dependencies:
    
    // borders:
    const [borderRadius, borderRadiusRefs] = usesBorderRadius(borderRadiusRef);
    
    
    
    return composition([
        imports([
            // borders:
            usesBorderStroke(),
            borderRadius(),
        ]),
        // layout({
        //     // borders:
        //     overflow     : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        variants([
            !!orientationBlockRule && rule(orientationBlockRule, [
                layout({
                    // children:
                    ...children(itemsSelector, composition([
                        variants([
                            isFirstChild([
                                layout({
                                    // add rounded corners on top:
                                    borderStartStartRadius : `calc(${borderRadiusRefs.borderStartStartRadius} - ${borderWidth})`,
                                    borderStartEndRadius   : `calc(${borderRadiusRefs.borderStartEndRadius} - ${borderWidth})`,
                                }),
                            ]),
                            isLastChild([
                                layout({
                                    // add rounded corners on bottom:
                                    borderEndStartRadius   : `calc(${borderRadiusRefs.borderEndStartRadius} - ${borderWidth})`,
                                    borderEndEndRadius     : `calc(${borderRadiusRefs.borderEndEndRadius} - ${borderWidth})`,
                                }),
                            ]),
                        ]),
                    ])),
                }),
            ]),
            !!orientationInlineRule && rule(orientationInlineRule, [
                layout({
                    // children:
                    ...children(itemsSelector, composition([
                        variants([
                            isFirstChild([
                                layout({
                                    // add rounded corners on left:
                                    borderStartStartRadius : `calc(${borderRadiusRefs.borderStartStartRadius} - ${borderWidth})`,
                                    borderEndStartRadius   : `calc(${borderRadiusRefs.borderEndStartRadius} - ${borderWidth})`,
                                }),
                            ]),
                            isLastChild([
                                layout({
                                    // add rounded corners on right:
                                    borderStartEndRadius   : `calc(${borderRadiusRefs.borderStartEndRadius} - ${borderWidth})`,
                                    borderEndEndRadius     : `calc(${borderRadiusRefs.borderEndEndRadius} - ${borderWidth})`,
                                }),
                            ]),
                        ]),
                    ])),
                }),
            ]),
            (!orientationBlockRule && !orientationInlineRule) && noRule([
                layout({
                    // children:
                    ...children(itemsSelector, composition([
                        layout({
                            // add rounded corners on top:
                            borderStartStartRadius : `calc(${borderRadiusRefs.borderStartStartRadius} - ${borderWidth})`,
                            borderStartEndRadius   : `calc(${borderRadiusRefs.borderStartEndRadius} - ${borderWidth})`,
                            
                            // add rounded corners on bottom:
                            borderEndStartRadius   : `calc(${borderRadiusRefs.borderEndStartRadius} - ${borderWidth})`,
                            borderEndEndRadius     : `calc(${borderRadiusRefs.borderEndEndRadius} - ${borderWidth})`,
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesBorderAsSeparatorBlock = (replaceLast = false, borderRadius? : Cust.Ref) => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius(borderRadius);
    
    
    
    return composition([
        imports([
            // borders:
            usesBorderStroke(),
        ]),
        layout({
            // borders:
            borderInlineWidth : 0, // remove (left|right)-border
            
            
            
            // shadows:
            boxShadow         : undefined, // remove shadow
        }),
        variants([
            // supports for Card too
            
            // assumes the Card *always* have a body, so the second-last-item is always a body
            // remove bottom-border at the last-item, so that it wouldn't collide with the Card's bottom-border
            // and
            // remove double border by removing bottom-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the bottom-border, we need it for the replacement of the footer's top-border
            rule(`:where(:not(:nth-last-child(${(replaceLast ? 2 : 0)})))`, composition([ // :where(...) => avoid increasing specificity
                layout({
                    // borders:
                    borderBlockEndWidth    : 0, // remove bottom-border
                }),
            ])),
            
            
            
            // remove top-border at the header, so that it wouldn't collide with the Card's top-border
            // remove top-border at the footer, as the replacement => use second-last-item bottom-border (from the body)
            rule([':where(:first-child)', (replaceLast && ':where(:last-child)')], composition([ // :where(...) => avoid increasing specificity
                layout({
                    // borders:
                    borderBlockStartWidth  : 0, // remove top-border
                }),
            ])),
        ]),
        variants([
            isNotFirstChild([
                layout({
                    // children:
                    // modify (container|any) & container>separator (if any)
                    ...children(['&', ':where(&)>:nth-child(n)'], composition([ // `:where(&) *` => zero specificity 
                        layout({
                            // remove rounded corners on top:
                            borderStartStartRadius : 0, [borderRadiusDecls.borderStartStartRadius] : 0,
                            borderStartEndRadius   : 0, [borderRadiusDecls.borderStartEndRadius]   : 0,
                        }),
                    ])),
                }),
            ]),
            isNotLastChild([
                layout({
                    // children:
                    // modify (container|any) & container>separator (if any)
                    ...children(['&', ':where(&)>:nth-child(n)'], composition([ // `:where(&) *` => zero specificity 
                        layout({
                            // remove rounded corners on bottom:
                            borderEndStartRadius   : 0, [borderRadiusDecls.borderEndStartRadius]   : 0,
                            borderEndEndRadius     : 0, [borderRadiusDecls.borderEndEndRadius]     : 0,
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesBorderAsSeparatorInline = (replaceLast = false, borderRadius? : Cust.Ref) => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius(borderRadius);
    
    
    
    return composition([
        imports([
            // borders:
            usesBorderStroke(),
        ]),
        layout({
            // borders:
            borderBlockWidth  : 0, // remove (top|bottom)-border
            
            
            
            // shadows:
            boxShadow         : undefined, // remove shadow
        }),
        variants([
            // supports for Card too
            
            // assumes the Card *always* have a body, so the second-last-item is always a body
            // remove right-border at the last-item, so that it wouldn't collide with the Card's right-border
            // and
            // remove double border by removing right-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the right-border, we need it for the replacement of the footer's left-border
            rule(`:where(:not(:nth-last-child(${(replaceLast ? 2 : 0)})))`, composition([ // :where(...) => avoid increasing specificity
                layout({
                    // borders:
                    borderInlineEndWidth   : 0, // remove right-border
                }),
            ])),
            
            
            
            // remove left-border at the header, so that it wouldn't collide with the Card's left-border
            // remove left-border at the footer, as the replacement => use second-last-item right-border (from the body)
            rule([':where(:first-child)', (replaceLast && ':where(:last-child)')], composition([ // :where(...) => avoid increasing specificity
                layout({
                    // borders:
                    borderInlineStartWidth : 0, // remove left-border
                }),
            ])),
        ]),
        variants([
            isNotFirstChild([
                layout({
                    // children:
                    // modify (container|any) & container>separator (if any)
                    ...children(['&', ':where(&)>:nth-child(n)'], composition([ // `:where(&) *` => zero specificity 
                        layout({
                            // remove rounded corners on left:
                            borderStartStartRadius : 0, [borderRadiusDecls.borderStartStartRadius] : 0,
                            borderEndStartRadius   : 0, [borderRadiusDecls.borderEndStartRadius]   : 0,
                        }),
                    ])),
                }),
            ]),
            isNotLastChild([
                layout({
                    // children:
                    // modify (container|any) & container>separator (if any)
                    ...children(['&', ':where(&)>:nth-child(n)'], composition([ // `:where(&) *` => zero specificity 
                        layout({
                            // remove rounded corners on right:
                            borderStartEndRadius   : 0, [borderRadiusDecls.borderStartEndRadius]   : 0,
                            borderEndEndRadius     : 0, [borderRadiusDecls.borderEndEndRadius]     : 0,
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};


export const usesMediaBorder = (borderRadius? : Cust.Ref) => {
    return composition([
        imports([
            // borders:
            usesBorderAsSeparatorBlock(undefined, borderRadius),
        ]),
        layout({
            // children:
            // make sibling <media> closer:
            // remove double border by removing top-border at the adjacent media(s)
            ...adjacentSiblings(mediaElm, composition([
                layout({
                    // borders:
                    borderBlockStartWidth  : 0, // remove top-border
                }),
            ])),
        }),
        variants([
            // supports for Card too
            
            // because we avoid modifying paragraph's top-border, we delegate the top-border to the <media>
            // so, we need to restore bottom-border that was removed by `usesBorderAsSeparatorBlock()`
            rule(':where(:not(:nth-last-child(0)))', composition([
                layout({
                    // borders:
                    borderBlockEndWidth    : undefined, // restore bottom-border
                }),
            ])),
            // then replace the algoritm above with this one:
            // remove bottom-border at the last-item, so that it wouldn't collide with the Card's bottom-border
            rule(':where(:last-child)', composition([ // :where(...) => avoid increasing specificity
                layout({
                    // borders:
                    borderBlockEndWidth    : 0, // remove bottom-border
                }),
            ])),
        ]),
    ]);
};


// paddings:
interface PaddingVars {
    paddingInline : any
    paddingBlock  : any
}
const [paddingRefs, paddingDecls] = createCssVar<PaddingVars>();
export const usesPadding = (paddingInline : Cust.Ref = cssProps.paddingInline, paddingBlock : Cust.Ref = cssProps.paddingBlock) => {
    return [
        () => composition([
            vars({
                [paddingDecls.paddingInline] : paddingInline,
                [paddingDecls.paddingBlock]  : paddingBlock,
            }),
            layout({
                // borders:
                paddingInline : paddingRefs.paddingInline,
                paddingBlock  : paddingRefs.paddingBlock,
            }),
        ]),
        paddingRefs,
        paddingDecls,
    ] as const;
};



// styles:
const mediaElm = ['figure', 'img', 'svg', 'video'];

export const usesContentMediaLayout = () => {
    return composition([
        imports([
            stripoutImage(), // clear browser's default styling on image
            
            // layouts:
            usesMediaFill(),
            
            // borders:
            usesMediaBorder(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with img***
        }),
    ]);
};
export const usesContentMedia = () => {
    return composition([
        layout({
            // children:
            //#region links
            // handle <a> as content-link:
            
            ...children('a', composition([
                layout({
                    // children:
                    // following by another <a>:
                    ...adjacentSiblings('a', composition([
                        layout({
                            // spacings:
                            // add a space between links:
                            marginInlineStart: cssProps.linkSpacing,
                        }),
                    ])),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
                }),
            ])),
            //#endregion links
            
            //#region media
            // handle <figure> & <media> as content-media:
            
            //#region first: reset top_level <figure> and inner <media>
            ...children('figure', composition([
                imports([
                    stripoutFigure(), // clear browser's default styling on figure
                ]),
                layout({
                    // children:
                    ...children(mediaElm.filter((m) => (m !== 'figure')), composition([
                        imports([
                            stripoutImage(), // clear browser's default styling on image
                        ]),
                        layout({
                            // layouts:
                            display: 'block', // fills the entire parent's width
                        }),
                    ])),
                }),
            ])),
            //#endregion first: reset top_level <figure> and inner <media>
            
            // then: styling top_level <figure> & top_level <media>:
            ...children(mediaElm, composition([
                imports([
                    usesContentMediaLayout(),
                ]),
            ])),
            //#endregion media
        }),
    ]);
};



export const usesContentLayout = () => {
    // dependencies:
    
    // paddings:
    const [paddings] = usesPadding();
    
    
    
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
            
            // borders:
            usesBorderAsContainer(/*itemsSelector: */mediaElm), // make a nicely rounded corners
            // borderRadiuses(), // already included in `usesBorderAsContainer`
            
            // paddings:
            paddings(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesContentVariants = () => {
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
            // variants:
            usesBasicVariants(),
            
            // layouts:
            sizes(),
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