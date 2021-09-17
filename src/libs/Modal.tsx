// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
    useLayoutEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Prop,
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    composition,
    compositionOf,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    children,
    
    
    
    // rules:
    variants,
    states,
    rule,
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
    backupProps,
    restoreProps,
    overwriteProps,
    overwriteParentProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizes,
    OrientationName,
    VariantOrientation,
    usesAnim,
    
    
    
    // configs:
    cssDecls as bcssDecls,
}                           from './BasicComponent'
import {
    // styles:
    usesResponsiveContainerGridLayout,
}                           from './Container'
import {
    // hooks:
    isActivating,
    isPassivating,
    useStateActivePassive,
    
    
    
    // configs:
    cssDecls as icssDecls,
}                           from './Indicator'
import {
    // configs:
    cssDecls as ccssDecls,
}                           from './Content'
import {
    // configs:
    cssDecls as rcssDecls,
    
    
    
    // react components:
    CardProps,
    Card,
}                           from './Card'
import {
    // styles:
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    Popup,
}                           from './Popup'
import Button               from './Button'
import CloseButton          from './CloseButton'
import {
    stripOutFocusableElement,
}                           from './strip-outs'
import typos                from './typos/index' // configurable typography (texting) defs



// hooks:

// animations:

//#region overlay animations
interface OverlayAnimVars {
    /**
     * none animation.
     */
    animNone    : any
    /**
     * final animation for the overlay.
     */
    overlayAnim : any
}
const [overlayAnimRefs, overlayAnimDecls] = createCssVar<OverlayAnimVars>();

export const usesOverlayAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            imports([
                // animations:
                anim(),
            ]),
            vars({
                [overlayAnimDecls.overlayAnim] : animRefs.animNone,
            }),
            states([
                isActivating([
                    vars({
                        [overlayAnimDecls.overlayAnim] : cssProps.overlayAnimActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [overlayAnimDecls.overlayAnim] : cssProps.overlayAnimPassive,
                    }),
                ]),
            ]),
        ]),
        overlayAnimRefs,
        overlayAnimDecls,
    ] as const;
};
//#endregion overlay animations


// appearances:

export type ModalStyle = 'scrollable' // might be added more styles in the future
export interface VariantModal {
    modalStyle? : ModalStyle
}
export function useVariantModal(props: VariantModal) {
    return {
        class: props.modalStyle ? props.modalStyle : null,
    };
}

export interface AlignModal {
    horzAlign? : Prop.JustifyItems
    vertAlign? : Prop.AlignItems
}
export function useAlignModal(props: AlignModal) {
    return {
        style: {
            [cssDecls.horzAlign] : props.horzAlign,
            [cssDecls.vertAlign] : props.vertAlign,
        },
    };
}



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
        bcssDecls, // BasicComponent
    );
    
    
    
    return layout({
        ...backupProps(newCardProps), // backup Card's cssProps before overwriting
        
        ...children(cardElm, composition([
            imports([
                stripOutFocusableElement(), // clear browser's default styles
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

export const usesModalLayout = () => {
    // dependencies:
    
    // animations:
    const [anim                 ] = usesAnim();
    const [    , overlayAnimRefs] = usesOverlayAnim();
    
    
    
    return composition([
        imports([
            // layouts:
            usesResponsiveContainerGridLayout(), // applies responsive container functionality using css grid
            
            // animations:
            anim(),
        ]),
        layout({
            // layouts:
         // display      : 'grid',             // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the Card both horizontally & vertically
            justifyItems : cssProps.horzAlign, // align (default center) horizontally
            alignItems   : cssProps.vertAlign, // align (default center) vertically
            
            
            
            // sizes:
            // fills the entire screen:
            boxSizing    : 'border-box', // the final size is including borders & paddings
            position     : 'fixed',
            inset        : 0,
            width        : '100vw',
            height       : '100vh',
         // maxWidth     : 'fill-available', // hack to excluding scrollbar // not needed since all html pages are virtually full width
         // maxHeight    : 'fill-available', // hack to excluding scrollbar // will be handle by javascript soon
            
            
            
            // animations:
            anim         : overlayAnimRefs.overlayAnim,
            
            
            
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
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'overlay')), // apply general cssProps starting with overlay***
        }),
    ]);
};
export const usesModalVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(':not(.scrollable)', [
                layout({
                    // scrolls:
                    // scroller at Modal's layer
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
export const usesModalStates = () => {
    // dependencies:
    
    // animations:
    const [overlayAnim] = usesOverlayAnim();
    
    
    
    return composition([
        imports([
            // states:
            usesPopupStates(),
            
            // animations:
            overlayAnim(),
        ]),
    ]);
};
export const usesModal = () => {
    return composition([
        imports([
            // layouts:
            usesModalLayout(),
            
            // variants:
            usesModalVariants(),
            
            // states:
            usesModalStates(),
        ]),
    ]);
};

export const usesDocumentBodyLayout = () => {
    return composition([
        layout({
            // kill the scroll on the body:
            overflow: 'hidden',
        }),
    ]);
};
export const usesActionBarLayout = () => {
    return composition([
        layout({
            // layouts:
            display        : 'flex',          // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',           // items are stacked horizontally
            justifyContent : 'space-between', // items are separated horizontally
            alignItems     : 'center',        // items are centered vertically
            
            
            
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

export const useModalSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModal(),
        ]),
    ]),
    compositionOf('body', [
        imports([
            usesDocumentBodyLayout(),
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
    //#region keyframes
    const keyframesOverlayActive  : PropEx.Keyframes = {
        from : {
            filter : [[ // double array => makes the JSS treat as space separated values
                'opacity(0)',
            ]],
        },
        to   : {
            filter : [[ // double array => makes the JSS treat as space separated values
                'opacity(1)',
            ]],
        },
    };
    const keyframesOverlayPassive : PropEx.Keyframes = {
        from : keyframesOverlayActive.to,
        to   : keyframesOverlayActive.from,
    };
    //#endregion keyframes
    
    
    
    return {
        // positions:
        horzAlign                   : 'center',
        vertAlign                   : 'center',
        
        
        
        // backgrounds:
        backg                       : typos.backg,
        boxShadow                   : [[0, 0, '10px', 'black']],
        
        overlayBackg                : 'rgba(0,0,0, 0.5)',
        
        
        
        //#region animations
        '@keyframes overlayActive'  : keyframesOverlayActive,
        '@keyframes overlayPassive' : keyframesOverlayPassive,
        overlayAnimActive           : [['300ms', 'ease-out', 'both', keyframesOverlayActive ]],
        overlayAnimPassive          : [['500ms', 'ease-out', 'both', keyframesOverlayPassive]],
        //#endregion animations
    };
}, { prefix: 'mdl' });



// react components:

export type CloseType = 'ui'|'overlay'|'shortcut'

export interface ModalProps<TElement extends HTMLElement = HTMLElement>
    extends
        CardProps<TElement>,
        
        // layouts:
        AlignModal,
        
        // appearances:
        VariantModal
{
    // accessibilities:
    tabIndex?   : number
    
    
    // actions:
    onClose?    : (closeType: CloseType) => void
}
export const Modal = <TElement extends HTMLElement = HTMLElement>(props: ModalProps<TElement>) => {
    // styles:
    const sheet        = useModalSheet();
    
    
    
    // variants:
    const alignModal   = useAlignModal(props);
    const variModal    = useVariantModal(props);
    
    
    
    // states:
    const stateActPass = useStateActivePassive(props);
    const isVisible    = stateActPass.active || (!!stateActPass.class);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        tabIndex,       // from Modal
        
        
        // actions:
        onClose,        // from Modal
        
        
        // variants:
        modalStyle,
        
        
        // children:
        header,
        footer,
    ...restProps} = props;
    
    
    
    // dom effects:
    const cardRef = useRef<TElement|null>(null);
    
    useLayoutEffect(() => {
        if (cardRef.current && navigator.userAgent.toLowerCase().includes('firefox')) {
            if (isVisible) {
                cardRef.current.style.overflow = (modalStyle === 'scrollable') ? '' : 'visible';
                
                // setTimeout(() => {
                //     if (cardRef.current) cardRef.current.style.overflow = 'clip';
                // }, 0);
            }
            else {
                cardRef.current.style.overflow = '';
            } // if
        } // if firefox
    }, [isVisible, modalStyle]);
    
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add(sheet.body);
            
            
            
            cardRef.current?.focus(); // when actived => focus the dialog, so the user able to use [esc] key to close the dialog
            
            
            
            // cleanups:
            return () => {
                document.body.classList.remove(sheet.body);
            };
        } // if isVisible
    }, [isVisible, sheet.body]);
    
    
    
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
                    onClick={() => props.onClose?.('ui')}
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
                    // accessibilities:
                    text='Close'
                    
                    
                    // actions:
                    onClick={() => props.onClose?.('ui')}
                />
            </p>
        );
        
        
        
        // other component:
        return footer;
    })();
    
    
    
    // jsx:
    return (
        <Popup
            // accessibilities:
            role={active ? 'dialog' : undefined}
            aria-modal={active ? true : undefined}
            active={active}
            inheritActive={inheritActive}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                variModal.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // variants:
                ...alignModal.style,
            }}
            
            
            // events:
            // watch left click on the overlay only (not at the Card):
            onClick={(e) => {
                if (e.target === e.currentTarget) props.onClose?.('overlay');
            }}
            
            // watch [escape key] on the whole Modal, including Card & Card's children:
            onKeyUp={(e) => {
                if ((e.key === 'Escape') || (e.code === 'Escape')) props.onClose?.('shortcut');
            }}
            
            onAnimationEnd={(e) => {
                // states:
                stateActPass.handleAnimationEnd(e);
            }}
        >
            <Card<TElement>
                // other props:
                {...restProps}
                
                
                // essentials:
                elmRef={(elm) => {
                    cardRef.current = elm;
                    
                    
                    // forwards:
                    if (elmRef) {
                        if (typeof(elmRef) === 'function') {
                            elmRef(elm);
                        }
                        else {
                            (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                        } // if
                    } // if
                }}
                
                
                // Control props:
                {...{
                    // accessibilities:
                    tabIndex : tabIndex ?? -1,
                }}
                
                
                // children:
                header={headerFn}
                footer={footerFn}
            />
        </Popup>
    );
};
export { Modal as default }

export type { OrientationName, VariantOrientation }
