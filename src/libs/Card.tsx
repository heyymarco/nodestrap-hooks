// react (builds html using javascript):
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
    vars,
    descendants,
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
    OrientationName,
    notOrientationInline,
    isOrientationInline,
    OrientationVariant,
    useOrientationVariant,
    usesBorderStroke,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './Basic'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // configs:
    cssProps as ccssProps,
}                           from './Content'
import {
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import Button               from './Button'
import {
    stripOutFigure,
    stripOutFocusableElement,
    stripOutImage,
}                           from './strip-outs'
import spacers              from './spacers'     // configurable spaces defs



// hooks:

// layouts:

export const usesImageFill = () => {
    return composition([
        layout({
            // layouts:
            display        : 'block', // fills the entire parent's width
            
            
            
            // sizes:
            // span to maximum width including parent's paddings:
            boxSizing      : 'border-box', // the final size is including borders & paddings
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : [['calc(100% + (', cssProps.itemPaddingInline, ' * 2))']],
            },
            
            
            
            // spacings:
            marginInline   : [['calc(0px -', cssProps.itemPaddingInline, ')']], // cancel out parent's padding with negative margin
            
            marginBlockEnd : cssProps.itemPaddingBlock, // add a spacing to the next sibling
            
            
            
            // children:
            // make sibling image closer (cancel out prev sibling's spacing):
            ...adjacentSiblings(imgElm, composition([
                layout({
                    // spacings:
                    marginBlockStart : [['calc(0px -', cssProps.itemPaddingBlock, ')']], // cancel out prev sibling's spacing with negative margin
                }),
            ])),
        }),
        variants([
            isFirstChild(composition([
                layout({
                    // spacings:
                    marginBlockStart : [['calc(0px -', cssProps.itemPaddingBlock, ')']], // cancel out parent's padding with negative margin
                }),
            ])),
            isLastChild(composition([
                layout({
                    // spacings:
                    marginBlockEnd   : [['calc(0px -', cssProps.itemPaddingBlock, ')']], // cancel out parent's padding with negative margin
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
export const usesBorderRadius = () => {
    return [
        () => composition([
            vars({
                [borderRadiusDecls.borderStartStartRadius] : bcssProps.borderRadius,
                [borderRadiusDecls.borderStartEndRadius]   : bcssProps.borderRadius,
                [borderRadiusDecls.borderEndStartRadius]   : bcssProps.borderRadius,
                [borderRadiusDecls.borderEndEndRadius]     : bcssProps.borderRadius,
            }),
            layout({
                // border radiuses:
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

export const usesBorderAsContainer = (orientationBlockRule : string|null = ':not(.inline)', orientationInlineRule : string|null = '.inline') => {
    // dependencies:
    
    // borders:
    const [borderRadius, borderRadiusRefs] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // borders:
            usesBorderStroke(),
            borderRadius(),
        ]),
        layout({
            // borders:
         // overflow     : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
            
            
            
            // shadows:
            boxShadow    : bcssProps.boxShadow,
        }),
        variants([
            !!orientationBlockRule && rule(orientationBlockRule, [
                layout({
                    // children:
                    ...children('*', composition([
                        variants([
                            isFirstChild([
                                layout({
                                    // add rounded corners on top:
                                    borderStartStartRadius : `calc(${borderRadiusRefs.borderStartStartRadius} - ${bcssProps.borderWidth})`,
                                    borderStartEndRadius   : `calc(${borderRadiusRefs.borderStartEndRadius} - ${bcssProps.borderWidth})`,
                                }),
                            ]),
                            isLastChild([
                                layout({
                                    // add rounded corners on bottom:
                                    borderEndStartRadius   : `calc(${borderRadiusRefs.borderEndStartRadius} - ${bcssProps.borderWidth})`,
                                    borderEndEndRadius     : `calc(${borderRadiusRefs.borderEndEndRadius} - ${bcssProps.borderWidth})`,
                                }),
                            ]),
                        ]),
                    ])),
                }),
            ]),
            !!orientationInlineRule && rule(orientationInlineRule, [
                layout({
                    // children:
                    ...children('*', composition([
                        variants([
                            isFirstChild([
                                layout({
                                    // add rounded corners on left:
                                    borderStartStartRadius : `calc(${borderRadiusRefs.borderStartStartRadius} - ${bcssProps.borderWidth})`,
                                    borderEndStartRadius   : `calc(${borderRadiusRefs.borderEndStartRadius} - ${bcssProps.borderWidth})`,
                                }),
                            ]),
                            isLastChild([
                                layout({
                                    // add rounded corners on right:
                                    borderStartEndRadius   : `calc(${borderRadiusRefs.borderStartEndRadius} - ${bcssProps.borderWidth})`,
                                    borderEndEndRadius     : `calc(${borderRadiusRefs.borderEndEndRadius} - ${bcssProps.borderWidth})`,
                                }),
                            ]),
                        ]),
                    ])),
                }),
            ]),
            (!orientationBlockRule && !orientationInlineRule) && noRule([
                layout({
                    // children:
                    ...children('*', composition([
                        layout({
                            // add rounded corners on top:
                            borderStartStartRadius : `calc(${borderRadiusRefs.borderStartStartRadius} - ${bcssProps.borderWidth})`,
                            borderStartEndRadius   : `calc(${borderRadiusRefs.borderStartEndRadius} - ${bcssProps.borderWidth})`,
                            
                            // add rounded corners on bottom:
                            borderEndStartRadius   : `calc(${borderRadiusRefs.borderEndStartRadius} - ${bcssProps.borderWidth})`,
                            borderEndEndRadius     : `calc(${borderRadiusRefs.borderEndEndRadius} - ${bcssProps.borderWidth})`,
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesBorderAsSeparatorBlock = (replaceLast = false) => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
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
            // assumes the card *always* have a body, so the second-last-item is always a body
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
                    ...descendants(['&', ':where(&) *'], composition([ // `:where(&) *` => zero specificity 
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
                    ...descendants(['&', ':where(&) *'], composition([ // `:where(&) *` => zero specificity 
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
export const usesBorderAsSeparatorInline = (replaceLast = false) => {
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
            // assumes the card *always* have a body, so the second-last-item is always a body
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
                    ...descendants(['&', ':where(&) *'], composition([ // `:where(&) *` => zero specificity 
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
                    ...descendants(['&', ':where(&) *'], composition([ // `:where(&) *` => zero specificity 
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

export const usesImageBorder = () => {
    return composition([
        imports([
            // borders:
            usesBorderAsSeparatorBlock(),
        ]),
        layout({
            // children:
            // make sibling image closer:
            // remove double border by removing top-border at the adjacent images
            ...adjacentSiblings(imgElm, composition([
                layout({
                    // borders:
                    borderBlockStartWidth  : 0, // remove top-border
                }),
            ])),
        }),
        variants([
            // because we avoid modifying paragraph's top-border, we delegate the top-border to the image
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



// styles:
const headerElm = 'header';
const footerElm = 'footer';
const bodyElm   = '.body';
const imgElm    = ['figure', 'img'];

export const usesCardImageLayout = () => {
    return composition([
        imports([
            stripOutImage(), // clear browser's default styling on image
            
            // layouts:
            usesImageFill(),
            
            // borders:
            usesImageBorder(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'img')), // apply general cssProps starting with img***
        }),
    ]);
};
export const usesCardItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesIndicatorLayout(),
            usesContentLayout(),
        ]),
        layout({
            // layouts:
            display   : 'block', // fills the entire parent's width
            
            
            
            // children:
            //#region links
            // handle <a> as card-link:
            
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
            
            //#region images
            // handle <figure> & <img> as card-image:
            
            //#region first: reset top_level <figure> and inner <img>
            ...children('figure', composition([
                imports([
                    stripOutFigure(), // clear browser's default styling on figure
                ]),
                layout({
                    // children:
                    ...children('img', composition([
                        imports([
                            stripOutImage(), // clear browser's default styling on image
                        ]),
                        layout({
                            // layouts:
                            display: 'block', // fills the entire parent's width
                        }),
                    ])),
                }),
            ])),
            //#endregion first: reset top_level <figure> and inner <img>
            
            // then: styling top_level <figure> & top_level <img>:
            ...children(imgElm, composition([
                imports([
                    usesCardImageLayout(),
                ]),
            ])),
            //#endregion images
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesCardCaptionLayout = () => {
    return composition([
        layout({
            // sizes:
            // default card's items height are unresizeable (excepts for the card's body):
            flex : [[0, 1, 'auto']], // ungrowable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'caption')), // apply general cssProps starting with caption***
        }),
    ]);
};
export const usesCardHeaderLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'header')), // apply general cssProps starting with header***
        }),
    ]);
};
export const usesCardFooterLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'footer')), // apply general cssProps starting with footer***
        }),
    ]);
};
export const usesCardBodyLayout = () => {
    return composition([
        layout({
            // sizes:
            // default card's body height is resizeable, ensuring footers are aligned to the bottom:
            flex     : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // scrolls:
            overflow : 'auto', // enable horz & vert scrolling
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'body')), // apply general cssProps starting with body***
        }),
    ]);
};

export const usesCardLayout = () => {
    return composition([
        imports([
            // resets:
            stripOutFocusableElement(), // clear browser's default styles
            
            // borders:
            usesBorderAsContainer(), // make a nicely rounded corners
        ]),
        layout({
            // layouts:
         // display        : 'flex',    // customizable orientation // already defined in variant `.block`/`.inline`
         // flexDirection  : 'column',  // customizable orientation // already defined in variant `.block`/`.inline`
            justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch', // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // children:
            ...children([headerElm, footerElm, bodyElm], composition([
                imports([
                    usesCardItemLayout(),
                ]),
            ])),
            ...children([headerElm, footerElm], composition([
                imports([
                    usesCardCaptionLayout(),
                ]),
            ])),
            ...children(headerElm, composition([
                imports([
                    usesCardHeaderLayout(),
                ]),
            ])),
            ...children(footerElm, composition([
                imports([
                    usesCardFooterLayout(),
                ]),
            ])),
            ...children(bodyElm, composition([
                imports([
                    usesCardBodyLayout(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesCardVariants = () => {
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
            usesIndicatorVariants(),
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            notOrientationInline([ // block
                layout({
                    // layouts:
                    display        : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection  : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children([headerElm, footerElm, bodyElm], composition([
                        imports([
                            // borders:
                            usesBorderAsSeparatorBlock(true),
                        ]),
                    ])),
                }),
            ]),
            isOrientationInline([ // inline
                layout({
                    // layouts:
                    display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    flexDirection  : 'row',         // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children([headerElm, footerElm, bodyElm], composition([
                        imports([
                            // borders:
                            usesBorderAsSeparatorInline(true),
                        ]),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesCardStates = () => {
    return composition([
        imports([
            // states:
            usesIndicatorStates(),
        ]),
    ]);
};
export const usesCard = () => {
    return composition([
        imports([
            // layouts:
            usesCardLayout(),
            
            // variants:
            usesCardVariants(),
            
            // states:
            usesCardStates(),
        ]),
    ]);
};

export const useCardSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesCard(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // sizes:
        boxSizing         : 'border-box', // the final size is including borders & paddings
        blockSize         : '100%',       // fills the entire parent's height if the parent has a specific height, otherwise no effect
        
        
        
        // items:
        itemPaddingInline : ccssProps.paddingInline,
        itemPaddingBlock  : ccssProps.paddingBlock,
        
        
        
        // captions:
        captionFilter     : [['brightness(70%)', 'contrast(140%)']],
        
        
        
        // links:
        linkSpacing       : spacers.sm,
        
        
        
        // typos:
        wordWrap          : 'break-word',
    };
}, { prefix: 'crd' });



// react components:

export interface CardProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>,
        
        // layouts:
        OrientationVariant
{
    // children:
    header? : React.ReactNode
    footer? : React.ReactNode
}
export function Card<TElement extends HTMLElement = HTMLElement>(props: CardProps<TElement>) {
    // styles:
    const sheet              = useCardSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    
    
    
    // rest props:
    const {
        // children:
        children,
        header,
        footer,
    ...restProps} = props;
    
    
    
    // handlers:
    const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
        // triggers `Card`'s onAnimationEnd event
        e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
    };
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'article'}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
        >
            { header && <header
                // triggers `Card`'s onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                { header }
            </header> }
            { children && <div className='body'
                // triggers `Card`'s onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    (React.isValidElement(child) && (child.type === 'a'))
                    ?
                    <Button
                        // other props:
                        {...child.props}
                        
                        
                        // essentials:
                        key={child.key ?? index}
                        tag='a'
                        
                        
                        // variants:
                        btnStyle='link'
                    />
                    :
                    child
                ))}
            </div> }
            { footer && <footer
                // triggers `Card`'s onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                { footer }
            </footer> }
        </Indicator>
    );
}
export { Card as default }

export type { OrientationName, OrientationVariant }
