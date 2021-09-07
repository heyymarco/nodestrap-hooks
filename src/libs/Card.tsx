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
    children,
    adjacentSiblings,
    
    
    
    // rules:
    rules,
    variants,
    rule,
    isFirstChild,
    isNotFirstChild,
    isLastChild,
    isNotLastChild,
    isNotNthLastChild,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
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
    // hooks:
    usesSizes,
    OrientationName,
    noOrientationInline,
    isOrientationInline,
    VariantOrientation,
    useVariantOrientation,
    usesBorder,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    usesContentStates,
    
    
    
    // configs:
    cssProps as ccssProps,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from './Content'
import Button               from './Button'
import {
    stripOutFigure,
    stripOutImage,
}                           from './strip-outs'
import spacers              from './spacers'     // configurable spaces defs



// styles:
const headerElm = 'header';
const footerElm = 'footer';
const bodyElm   = '.body';

export const usesCardImageLayout = () => {
    // dependencies:
    
    // colors:
    const [, borderRefs] = usesBorder();
    
    
    
    return composition([
        imports([
            stripOutImage(), // clear browser's default styling on image
        ]),
        layout({
            // layouts:
            display: 'block', // fills the entire parent's width
            
            
            
            // sizes:
            // span to maximum width including parent's paddings:
            boxSizing      : 'border-box', // the final size is including borders & paddings
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : [['calc(100% + (', cssProps.itemPaddingInline, ' * 2))']],
            },
            
            
            
            // spacings:
            //#region no parent paddings
            // cancel-out parent's padding with negative margin:
            marginInline   : [['calc(0px -', cssProps.itemPaddingInline, ')']],
            marginBlock    : [['calc(0px -', cssProps.itemPaddingBlock,  ')']],
            //#endregion no parent paddings
            
            
            
            // borders:
            //#region border-strokes as a separator
            border       : bcssProps.border,     // copy from children (can't inherit because border(Inline|Block)Width might have been modified)
            borderColor  : borderRefs.borderCol, // copy from children (can't inherit because border(Inline|Block)Width might have been modified)
            
            borderInlineWidth         : 0, // remove (left|right)-border for all-images
            //#endregion border-strokes as a separator
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'img')), // apply general cssProps starting with img***
        }),
        variants([
            //#region no parent paddings
            // kill the top negative margin so the prev sibling can add a bottom space:
            isNotFirstChild(composition([
                layout({
                    marginBlockStart : 0,
                }),
            ])),
            
            // add a bottom space to the next sibling:
            isNotLastChild(composition([
                layout({
                    marginBlockEnd   : cssProps.itemPaddingBlock,
                }),
            ])),
            //#endregion no parent paddings
            
            
            
            //#region border-strokes as a separator
            // remove top-border at the first-image, so that it wouldn't collide with the (header|body|footer)'s top-border
            isFirstChild(composition([
                layout({
                    borderBlockStartWidth : 0,
                }),
            ])),
            
            // remove bottom-border at the last-image, so that it wouldn't collide with the (header|body|footer)'s bottom-border
            isLastChild(composition([
                layout({
                    borderBlockEndWidth   : 0,
                }),
            ])),
            //#endregion border-strokes as a separator
        ]),
    ]);
}
export const usesCardItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesContentLayout(),
        ]),
        layout({
            // layouts:
            display   : 'block', // fills the entire parent's width
            
            
            
            // strip out shadows:
            // moved from here to parent,
            boxShadow : undefined,
            
            
            
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
                rules([
                ]),
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
            ...children(['figure', 'img'], composition([
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
            flex: [[0, 0]], // not growing, not shrinking
            
            
            
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
            flex: [[1, 1]], // allows growing, allows shrinking
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'body')), // apply general cssProps starting with body***
        }),
    ]);
};

export const usesBorderAsSeparatorBlock = () => {
    return composition([
        layout({
            // borders:
            borderInlineWidth : 0, // remove (left|right)-border
            
            
            
            // border radiuses:
            borderRadius      : 0, // remove border radius
        }),
        variants([
            // assumes the card *always* have a body, so the second-last-item is always a body
            // remove bottom-border at the last-item, so that it wouldn't collide with the Card's bottom-border
            // and
            // remove double border by removing bottom-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the bottom-border, we need it for the replacement of the footer's top-border
            isNotNthLastChild(0, 2, composition([
                layout({
                    // borders:
                    borderBlockEndWidth    : 0, // remove bottom-border
                }),
            ])),
            
            
            
            // remove top-border at the header, so that it wouldn't collide with the Card's top-border
            // remove top-border at the footer, as the replacement => use second-last-item bottom-border (from the body)
            rule([':first-child', ':last-child'], composition([
                layout({
                    // borders:
                    borderBlockStartWidth  : 0, // remove top-border
                }),
            ])),
        ]),
    ]);
};
export const usesBorderAsSeparatorInline = () => {
    return composition([
        layout({
            // borders:
            borderBlockWidth  : 0, // remove (top|bottom)-border
            
            
            
            // border radiuses:
            borderRadius      : 0, // remove border radius
        }),
        variants([
            // assumes the card *always* have a body, so the second-last-item is always a body
            // remove right-border at the last-item, so that it wouldn't collide with the Card's right-border
            // and
            // remove double border by removing right-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the right-border, we need it for the replacement of the footer's left-border
            isNotNthLastChild(0, 2, composition([
                layout({
                    // borders:
                    borderInlineEndWidth   : 0, // remove right-border
                }),
            ])),
            
            
            
            // remove left-border at the header, so that it wouldn't collide with the Card's left-border
            // remove left-border at the footer, as the replacement => use second-last-item right-border (from the body)
            rule([':first-child', ':last-child'], composition([
                layout({
                    // borders:
                    borderInlineStartWidth : 0, // remove left-border
                }),
            ])),
        ]),
    ]);
};

export const usesCardLayout = () => {
    // dependencies:
    
    // colors:
    const [border, borderRefs] = usesBorder();
    
    
    
    return composition([
        imports([
            // colors:
            border(),
        ]),
        layout({
            // layouts:
         // display        : 'flex',        // customizable orientation // already defined in block()/inline()
         // flexDirection  : 'column',      // customizable orientation // already defined in block()/inline()
            justifyContent : 'start',       // items are placed starting from the top
            alignItems     : 'stretch',     // items width are 100% of the parent
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // borders:
            //#region make a nicely rounded corners
            /*
                border & borderRadius are moved from children to here,
                for making consistent border color when the children's color are filtered.
                so we need to reconstruct the border & borderRadius here.
            */
            
            
            
            //#region border-strokes
            border       : bcssProps.border,     // moved in from children
            borderColor  : borderRefs.borderCol, // moved in from children
            //#endregion border-strokes
            
            
            
            //#region border radiuses
            borderRadius : bcssProps.borderRadius, // moved in from children
            overflow     : 'hidden',               // clip the children at the rounded corners
            //#endregion border radiuses
            //#endregion make a nicely rounded corners
            
            
            
            // shadows:
            boxShadow    : bcssProps.boxShadow, // moved in from children
            
            
            
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
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            noOrientationInline([ // block
                layout({
                    // layouts:
                    display        : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection  : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children([headerElm, footerElm, bodyElm], composition([
                        imports([
                            usesBorderAsSeparatorBlock(),
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
                            usesBorderAsSeparatorInline(),
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
            usesContentStates(),
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

export const useCardSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesCard(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // typos:
        wordWrap          : 'break-word',
        
        
        
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
    };
}, { prefix: 'crd' });



// react components:

export interface CardProps<TElement extends HTMLElement = HTMLElement>
    extends
        ContentProps<TElement>,
        
        VariantOrientation
{
    // children:
    header? : React.ReactNode
    footer? : React.ReactNode
}
export const Card = <TElement extends HTMLElement = HTMLElement>(props: CardProps<TElement>) => {
    // styles:
    const sheet = useCardSheet();
    
    
    
    // variants:
    const variOrientation = useVariantOrientation(props);
    
    
    
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
        <Content<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'article'}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
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
        </Content>
    );
};
export { Card as default }

export type { OrientationName, VariantOrientation }
