// react (builds html using javascript):
import {
    default as React,
    useRef,
    useLayoutEffect,
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
    
    
    
    // utilities:
    setElmRef,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    backupProps,
    restoreProps,
    overwriteProps,
    overwriteParentProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizeVariant,
    usesAnim,
    
    
    
    // configs:
    cssDecls as bcssDecls,
}                           from './Basic'
import {
    // styles:
    usesResponsiveContainerGridLayout,
}                           from './Container'
import {
    // hooks:
    useActivePassiveState,
    
    
    
    // configs:
    cssDecls as icssDecls,
}                           from './Indicator'
import {
    // configs:
    cssDecls as ccssDecls,
}                           from './Content'
import {
    // styles:
    usesModalElement,
    
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
    // hooks:
    OrientationName,
    OrientationVariant,
    
    
    
    // configs:
    cssDecls as rcssDecls,
    
    
    
    // react components:
    CardProps,
    Card,
}                           from './Card'
import Button               from './Button'
import CloseButton          from './CloseButton'



// hooks:

// appearances:

export type ModalCardStyle = 'scrollable' // might be added more styles in the future
export interface ModalCardVariant {
    modalCardStyle? : ModalCardStyle
    horzAlign?      : Prop.JustifyItems
    vertAlign?      : Prop.AlignItems
}
export const useModalCardVariant = (props: ModalCardVariant) => {
    return {
        class : props.modalCardStyle ? props.modalCardStyle : null,
        
        style : {
            [cssDecls.horzAlign] : props.horzAlign,
            [cssDecls.vertAlign] : props.vertAlign,
        },
    };
};



// styles:
const cardElm      = '*';
const cardItemsElm = '*';
const cardBodyElm  = '.body';

export const usesCard = () => {
    // dependencies:
    
    // animations:
    const [, animRefs] = usesAnim();
    
    
    
    const newCardProps = overwriteParentProps(
        usesGeneralProps(cssProps), // apply general cssProps
        
        // parents:
        rcssDecls, // Card
        ccssDecls, // Content
        icssDecls, // Indicator
        bcssDecls, // Basic
    );
    
    
    
    return layout({
        ...backupProps(newCardProps), // backup Card's cssProps before overwriting
        
        ...children(cardElm, composition([
            imports([
                usesModalElement(),
            ]),
            layout({
                // children:
                ...children(cardItemsElm, composition([
                    layout({
                        // customize:
                        ...restoreProps(newCardProps), // restore Card's cssProps
                    }),
                ])),
            }),
            variants([
                rule(':nth-child(n)', [ // force overwrite
                    layout({
                        // layouts:
                        gridArea : 'content',
                        
                        
                        
                        // animations:
                        anim     : animRefs.anim,
                        
                        
                        
                        // customize:
                        ...newCardProps, // overwrite Card's cssProps
                    }),
                ]),
            ]),
        ])),
    });
};

export const usesModalCardLayout = () => {
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
            ...usesCard(),
            
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
export const usesModalCardVariants = () => {
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
                    // scroller at ModalCard's layer
                    overflow : 'auto', // enable horz & vert scrolling
                    
                    
                    
                    // children:
                    ...children(cardElm, composition([
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
                    ])),
                }),
            ]),
            rule('.scrollable', [
                layout({
                    // children:
                    ...children(cardElm, composition([
                        layout({
                            // sizes:
                            boxSizing     : 'border-box', // the final size is including borders & paddings
                            inlineSize    : 'auto',       // follows the content's width, but
                            maxInlineSize : '100%',       // up to the maximum available parent's width
                            blockSize     : 'auto',       // follows the content's height, but
                            maxBlockSize  : '100%',       // up to the maximum available parent's height
                            
                            
                            
                            // children:
                            ...children(cardBodyElm, composition([
                                layout({
                                    // scrolls:
                                    // scroller at Card's body layer (for the `.scrollable` turned on)
                                    overflow : 'auto', // enable horz & vert scrolling
                                }),
                            ])),
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesModalCardStates = () => {
    return composition([
        imports([
            // states:
            usesModalStates(),
        ]),
    ]);
};
export const usesModalCard = () => {
    return composition([
        imports([
            // layouts:
            usesModalCardLayout(),
            
            // variants:
            usesModalCardVariants(),
            
            // states:
            usesModalCardStates(),
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

export const useModalCardSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModalCard(),
        ]),
    ]),
    compositionOf('actionBar', [
        imports([
            usesActionBarLayout(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // positions:
        horzAlign                   : 'center',
        vertAlign                   : 'center',
    };
}, { prefix: 'mdlcrd' });



// react components:

export type ModalCardCloseType = 'ui'|ModalCloseType



export interface ModalCardElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>
    extends
        ModalElementProps<TElement, TCloseType>,
        CardProps<TElement>
{
}
export function ModalCardElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>(props: ModalCardElementProps<TElement, TCloseType>) {
    // rest props:
    const {
        // accessibilities:
        tabIndex = -1,
        
        
        // actions:
        onActiveChange,
    ...restProps} = props;
    
    
    
    return (
        <Card
            // other props:
            {...restProps}
            
            
            // accessibilities:
            {...{
                tabIndex,
            }}
        />
    );
}
ModalCardElement.prototype = ModalElement.prototype; // mark as ModalElement compatible






export interface ModalCardProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>
    extends
        ModalProps<TElement, TCloseType>,
        CardProps<TElement>,
        
        // appearances:
        ModalCardVariant
{
}
export function ModalCard<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>(props: ModalCardProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useModalCardSheet();
    
    
    
    // variants:
    const modalCardVariant   = useModalCardVariant(props);
    
    
    
    // states:
    const activePassiveState = useActivePassiveState(props);
    const isVisible          = activePassiveState.active || (!!activePassiveState.class);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        active,         // from accessibilities, removed
        inheritActive,  // from accessibilities, removed
        
        
        // appearances:
        modalCardStyle,
        
        
        // children:
        header,
        footer,
    ...restProps} = props;
    
    
    
    // dom effects:
    const cardRef = useRef<TElement|null>(null);
    
    useLayoutEffect(() => {
        if (cardRef.current && navigator.userAgent.toLowerCase().includes('firefox')) {
            if (isVisible) {
                cardRef.current.style.overflow = (modalCardStyle === 'scrollable') ? '' : 'visible';
                
                // setTimeout(() => {
                //     if (cardRef.current) cardRef.current.style.overflow = 'clip';
                // }, 0);
            }
            else {
                cardRef.current.style.overflow = '';
            } // if
        } // if firefox
    }, [isVisible, modalCardStyle]);
    
    
    
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
                    onClick={(e) => {
                        if (!e.defaultPrevented) {
                            props.onActiveChange?.(false, 'ui' as unknown as TCloseType);
                            e.preventDefault();
                        } // if
                    }}
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
                    onClick={(e) => {
                        if (!e.defaultPrevented) {
                            props.onActiveChange?.(false, 'ui' as unknown as TCloseType);
                            e.preventDefault();
                        } // if
                    }}
                >
                    Close
                </Button>
            </p>
        );
        
        
        
        // other component:
        return footer;
    })();
    
    
    
    // jsx:
    return (
        <Modal<TElement, TCloseType>
            // other props:
            {...props}
            
            
            // essentials:
            elmRef={(elm) => {
                setElmRef(elmRef, elm);
                setElmRef(cardRef, elm);
            }}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                modalCardVariant.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // variants:
                ...modalCardVariant.style,
            }}
            
            
            // events:
            onAnimationEnd={(e) => {
                // states:
                activePassiveState.handleAnimationEnd(e);
                
                
                
                // forwards:
                props.onAnimationEnd?.(e);
            }}
        >
            <ModalCardElement<TElement, TCloseType>
                // other props:
                {...restProps}
                
                
                // children:
                header={headerFn}
                footer={footerFn}
            />
        </Modal>
    );
}
export { ModalCard as default }

export type { OrientationName, OrientationVariant }
