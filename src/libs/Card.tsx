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
    children,
    
    
    
    // rules:
    variants,
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
    // hooks:
    usesSizeVariant,
    OrientationName,
    notOrientationInline,
    isOrientationInline,
    OrientationVariant,
    useOrientationVariant,
    usesAnim,
}                           from './Basic'
import {
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
    
    
    
    // styles:
    usesContentMedia,
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
    stripoutFocusableElement,
}                           from './stripouts'






// styles:
const headerElm = 'header';
const footerElm = 'footer';
const bodyElm   = '.body';

export const usesCardItemLayout = () => {
    return composition([
        imports([
            // media:
            usesContentMedia(),
            
            // layouts:
            usesIndicatorLayout(),
            usesContentLayout(),
        ]),
        layout({
            // layouts:
            display : 'block', // fills the entire parent's width
            
            
            
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
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    return composition([
        imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
            
            // borders:
            usesBorderAsContainer(), // make a nicely rounded corners
            
            // animations:
            anim(),
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
            
            
            
            // animations:
            boxShadow   : animRefs.boxShadow,
            filter      : animRefs.filter,
            transf      : animRefs.transf,
            anim        : animRefs.anim,
            
            
            
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
            { header && <header>
                { header }
            </header> }
            { children && <div className='body'>
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
            { footer && <footer>
                { footer }
            </footer> }
        </Indicator>
    );
}
export { Card as default }

export type { OrientationName, OrientationVariant }
