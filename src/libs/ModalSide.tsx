// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Prop,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    composition,
    compositionOf,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    children,
    
    
    
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
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // styles:
    usesResponsiveContainerGridLayout,
}                           from './Container'
import {
    // styles:
    usesModalElementLayout,
    
    usesModalLayout,
    usesModalVariants,
    usesModalStates,
    
    
    
    // react components:
    ModalCloseType,
    
    ModalElementProps,
    ModalElement,
    
    ModalProps,
    Modal,
}                           from './Modal'
import {
    // react components:
    Popup,
}                           from './Popup'
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    CardProps,
    Card,
}                           from './Card'
import Button               from './Button'
import CloseButton          from './CloseButton'



// hooks:

// appearances:

export type ModalSideStyle = 'scrollable' // might be added more styles in the future
export interface ModalSideVariant {
    modalSideStyle? : ModalSideStyle
    horzAlign?      : Prop.JustifyItems
    vertAlign?      : Prop.AlignItems
}
export const useModalSideVariant = (props: ModalSideVariant) => {
    return {
        class : props.modalSideStyle ? props.modalSideStyle : null,
        
        style : {
            [cssDecls.horzAlign] : props.horzAlign,
            [cssDecls.vertAlign] : props.vertAlign,
        },
    };
};



// styles:
export const usesModalSideElementLayout = () => {
    return composition([
        imports([
            // layouts:
            usesModalElementLayout(),
        ]),
        layout({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if Card is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the Card's header should be visible first
            alignItems     : 'center',  // center Card horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // children:
            ...children('*', composition([ // Card
                layout({
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'card')), // apply general cssProps starting with card***
                }),
            ])),
        }),
    ]);
};
export const usesModalSideElementVariants = () => {
    return composition([
        variants([
            rule(':not(.scrollable)>&', [
                layout({
                    // sizes:
                    boxSizing  : 'content-box', // the final size is excluding borders & paddings
                    inlineSize : 'max-content', // forcing the Card's width follows the Card's items width
                    blockSize  : 'max-content', // forcing the Card's height follows the Card's items height
                    
                    // fix bug on firefox.
                    // setting *(inline|block)Size:max-content* guarantes the scrolling effect never occured (the *scrolling prop* will be ignored).
                    // but on firefox if the *scrolling prop* is not turned off => causing the element clipped off at the top.
                 // overflow   : 'visible', // turn off the scrolling; side effect the rounded corners won't be clipped
                 // overflow   : '-moz-hidden-unscrollable', // not working; use JS solution
                }),
            ]),
            rule('.scrollable>&', [
                layout({
                    // sizes:
                    boxSizing     : 'border-box', // the final size is including borders & paddings
                    inlineSize    : 'auto',       // follows the content's width, but
                    maxInlineSize : '100%',       // up to the maximum available parent's width
                    blockSize     : 'auto',       // follows the content's height, but
                    maxBlockSize  : '100%',       // up to the maximum available parent's height
                    overflow      : 'hidden',     // force the Card to scroll, otherwise clipped
                    
                    
                    
                    // children:
                    ...children('*', composition([ // Card
                        layout({
                            boxSizing     : 'inherit',
                            inlineSize    : 'inherit',
                            maxInlineSize : 'inherit',
                            blockSize     : 'inherit',
                            maxBlockSize  : 'inherit',
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesModalSideElement = () => {
    return composition([
        variants([
            rule('&&', [ // makes `.ModalSideElement` is more specific than `.Popup`
                imports([
                    // layouts:
                    usesModalSideElementLayout(),
                    
                    // variants:
                    usesModalSideElementVariants(),
                ]),
            ]),
        ]),
    ]);
};

export const usesActionBarLayout = () => {
    return composition([
        layout({
            // layouts:
            display        : 'flex',          // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',           // items are stacked horizontally
            justifyContent : 'space-between', // items are separated horizontally as far as possible
            alignItems     : 'center',        // items are centered vertically
            flexWrap       : 'nowrap',        // no wrapping
            
            
            
            // children:
            ...children('*', composition([
                variants([
                    // only one child:
                    rule(':first-child:last-child', composition([
                        layout({
                            marginInlineStart: 'auto',
                        }),
                    ])),
                ]),
            ])),
        }),
    ]);
};

export const useModalSideElementSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModalSideElement(),
        ]),
    ]),
    compositionOf('actionBar', [
        imports([
            usesActionBarLayout(),
        ]),
    ]),
]);



export const usesModalSideLayout = () => {
    return composition([
        imports([
            // layouts:
            usesModalLayout(),
            usesResponsiveContainerGridLayout(), // applies responsive container functionality using css grid
        ]),
        layout({
            // layouts:
         // display      : 'grid',             // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the Card both horizontally & vertically
            
            // child default sizes:
            justifyItems : cssProps.horzAlign, // align (default center) horizontally
            alignItems   : cssProps.vertAlign, // align (default center) vertically
            
            
            
            // children:
            ...children('*', composition([
                layout({
                    // layouts:
                    gridArea : 'content',
                }),
            ])),
            
            //#region psedudo elm for filling the end of horz & vert scroll
            ...children(['::before', '::after'], composition([
                layout({
                    // layouts:
                    content     : '""',
                    display     : 'block',
                    
                    
                    
                    // sizes:
                    // fills the entire grid area:
                    justifySelf : 'stretch',
                    alignSelf   : 'stretch',
                    
                    
                    
                    // appearances:
                    visibility  : 'hidden',
                }),
            ])),
            ...children('::before', composition([
                layout({
                    // layouts:
                    gridArea    : 'inlineEnd',
                }),
            ])),
            ...children('::after', composition([
                layout({
                    // layouts:
                    gridArea    : 'blockEnd',
                }),
            ])),
            //#endregion psedudo elm for filling the end of horz & vert scroll
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesModalSideVariants = () => {
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
            usesModalVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(':not(.scrollable)', [
                layout({
                    // scrolls:
                    // scroller at ModalSide's layer
                    overflow : 'auto', // enable horz & vert scrolling
                }),
            ]),
        ]),
    ]);
};
export const usesModalSideStates = () => {
    return composition([
        imports([
            // states:
            usesModalStates(),
        ]),
    ]);
};
export const usesModalSide = () => {
    return composition([
        imports([
            // layouts:
            usesModalSideLayout(),
            
            // variants:
            usesModalSideVariants(),
            
            // states:
            usesModalSideStates(),
        ]),
    ]);
};

export const useModalSideSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModalSide(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // positions:
        horzAlign : 'center',
        vertAlign : 'center',
    };
}, { prefix: 'mdlsde' });



// react components:

export type ModalSideCloseType = 'ui'|ModalCloseType



export interface ModalSideElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>
    extends
        ModalElementProps<TElement, TCloseType>,
        CardProps<TElement>
{
}
export function ModalSideElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>(props: ModalSideElementProps<TElement, TCloseType>) {
    // styles:
    const sheet = useModalSideElementSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,         // moved to Card
        
        
        // accessibilities:
        active,         // from accessibilities, moved to Popup
        inheritActive,  // from accessibilities, moved to Popup
        tabIndex = -1,  // from ModalElement   , moved to Card
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        header,
        footer,
    ...restProps} = props;
    
    
    
    // handlers:
    const handleClose = onActiveChange && ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!e.defaultPrevented) {
            onActiveChange(false, 'ui' as unknown as TCloseType);
            e.preventDefault();
        } // if
    });
    
    
    
    // jsx fn props:
    const headerFn = (() => {
        // default (unset) or string:
        if ((header === undefined) || (typeof header === 'string')) return (
            <h5
                // classes:
                className={sheet.actionBar}
            >
                { header }
                <CloseButton
                    // actions:
                    onClick={handleClose}
                />
            </h5>
        );
        
        
        
        // other component:
        return header;
    })();
    
    const footerFn = (() => {
        // default (unset) or string:
        if ((footer === undefined) || (typeof footer === 'string')) return (
            <p
                // classes:
                className={sheet.actionBar}
            >
                { footer }
                <Button
                    // actions:
                    onClick={handleClose}
                >
                    Close
                </Button>
            </p>
        );
        
        
        
        // other component:
        return footer;
    })();
    
    
    
    return (
        <Popup
            // accessibilities:
            {...{
                active,
                inheritActive,
            }}
            
            
            // appearances:
            nude={true}
            
            
            // classes:
            classes={[
                sheet.main, // inject ModalSideElement class
            ]}
        >
            <Card
                // other props:
                {...restProps}
                
                
                // essentials:
                elmRef={elmRef}
                
                
                // accessibilities:
                {...{
                    tabIndex,
                }}
                
                
                // children:
                header={headerFn}
                footer={footerFn}
            />
        </Popup>
    );
}
ModalSideElement.prototype = ModalElement.prototype; // mark as ModalElement compatible



export interface ModalSideProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>
    extends
        ModalProps<TElement, TCloseType>,
        CardProps<TElement>,
        
        // appearances:
        ModalSideVariant
{
}
export function ModalSide<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>(props: ModalSideProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useModalSideSheet();
    
    
    
    // variants:
    const modalSideVariant   = useModalSideVariant(props);
    
    
    
    // jsx:
    return (
        <Modal<TElement, TCloseType>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                modalSideVariant.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // variants:
                ...modalSideVariant.style,
            }}
        >
            <ModalSideElement<TElement, TCloseType>
                // other props:
                {...props}
            />
        </Modal>
    );
}
export { ModalSide as default }

export type { OrientationName, OrientationVariant }
