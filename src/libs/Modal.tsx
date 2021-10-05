// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
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
    
    
    
    // rules:
    states,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    ElementProps,
    Element,
    
    
    
    // utilities:
    isTypeOf,
    setElmRef,
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
    usesAnim,
}                           from './Basic'
import {
    // hooks:
    isActivating,
    isPassivating,
    isPassived,
    useActivePassiveState,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    stripOutFocusableElement,
}                           from './strip-outs'



// hooks:

// animations:

//#region modal animations
interface ModalAnimVars {
    /**
     * none animation.
     */
    animNone  : any
    /**
     * final animation for the modal.
     */
    modalAnim : any
}
const [modalAnimRefs, modalAnimDecls] = createCssVar<ModalAnimVars>();

export const usesModalAnim = () => {
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
                [modalAnimDecls.modalAnim] : animRefs.animNone,
            }),
            states([
                isActivating([
                    vars({
                        [modalAnimDecls.modalAnim] : cssProps.animActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [modalAnimDecls.modalAnim] : cssProps.animPassive,
                    }),
                ]),
            ]),
        ]),
        modalAnimRefs,
        modalAnimDecls,
    ] as const;
};
//#endregion modal animations



// styles:
export const usesModalElementLayout = () => {
    return composition([
        imports([
            // resets:
            stripOutFocusableElement(), // clear browser's default styles
        ]),
        layout({
            // layouts:
            display : 'inline-block',
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'element')), // apply general cssProps starting with element***
        }),
    ]);
};
export const usesModalElement = () => {
    return composition([
        imports([
            // layouts:
            usesModalElementLayout(),
        ]),
    ]);
};

export const useModalElementSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModalElement(),
        ]),
    ]),
]);



export const usesModalLayout = () => {
    // dependencies:
    
    // animations:
    const [, modalAnimRefs] = usesModalAnim();
    
    
    
    return composition([
        layout({
            // layouts:
            display      : 'block',
            
            
            
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
            anim         : modalAnimRefs.modalAnim,
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesModalVariants = () => {
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
export const usesModalStates = () => {
    // dependencies:
    
    // animations:
    const [modalAnim] = usesModalAnim();
    
    
    
    return composition([
        imports([
            // animations:
            modalAnim(),
        ]),
        states([
            isPassived([
                layout({
                    // appearances:
                    display: 'none', // hide the modal
                }),
            ]),
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
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesActive    : PropEx.Keyframes = {
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
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };
    //#endregion keyframes
    
    
    
    return {
        // backgrounds:
        backg                : 'rgba(0,0,0, 0.5)',
        elementBoxShadow     : [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        
        
        
        //#region animations
        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animActive           : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['500ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'mdl' });



// react components:

export type ModalCloseType = 'overlay'|'shortcut'
export interface ModalAction<TCloseType = ModalCloseType>
{
    // actions:
    onActiveChange? : (newActive: boolean, arg?: TCloseType) => void
}



export interface ModalElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>
    extends
        ModalAction<TCloseType>,
        ElementProps<TElement>
{
    // accessibilities:
    tabIndex? : number
}
export function ModalElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalElementProps<TElement, TCloseType>) {
    // styles:
    const sheet = useModalElementSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        tabIndex = -1,
        
        
        // actions:
        onActiveChange, // not implemented
    ...restProps} = props;
    
    
    
    return (
        <Element
            // other props:
            {...restProps}
            
            
            // accessibilities:
            {...{
                tabIndex,
            }}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}



export interface ModalProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>
    extends
        IndicatorProps<TElement>,
        ModalAction<TCloseType>
{
    // accessibilities:
    tabIndex? : number
}
export function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useModalSheet();
    
    
    
    // states:
    const activePassiveState = useActivePassiveState(props);
    const isVisible          = activePassiveState.active || (!!activePassiveState.class);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,        // moved to ModalElement
        
        
        // accessibilities:
        active,        // from accessibilities
        inheritActive, // from accessibilities
        tabIndex,      // from Modal, moved to ModalElement
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // dom effects:
    const childRef = useRef<TElement|null>(null);
    
    useEffect(() => {
        if (isVisible) {
            document.body.classList.add(sheet.body);
            
            
            
            childRef.current?.focus({ preventScroll: true }); // when actived => focus the ModalElement, so the user able to use [esc] key to close the Modal
            
            
            
            // cleanups:
            return () => {
                document.body.classList.remove(sheet.body);
            };
        } // if isVisible
    }, [isVisible, sheet.body]);
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            role={active ? 'dialog' : undefined}
            aria-modal={active ? true : undefined}
            {...{
                active,
                inheritActive,
            }}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // events:
            // watch left click on the overlay only (not at the ModalElement):
            onClick={onActiveChange && ((e) => {
                if (!e.defaultPrevented) {
                    if (e.target === e.currentTarget) {
                        onActiveChange(false, 'overlay' as unknown as TCloseType);
                        e.preventDefault();
                    } // if
                } // if
                
                
                
                // forwards:
                props.onClick?.(e);
            })}
            
            // watch [escape key] on the whole Modal, including ModalElement & ModalElement's children:
            onKeyUp={onActiveChange && ((e) => {
                if (!e.defaultPrevented) {
                    if ((e.key === 'Escape') || (e.code === 'Escape')) {
                        onActiveChange(false, 'shortcut' as unknown as TCloseType);
                        e.preventDefault();
                    } // if
                } // if
                
                
                
                // forwards:
                props.onKeyUp?.(e);
            })}
            
            onAnimationEnd={(e) => {
                // states:
                activePassiveState.handleAnimationEnd(e);
                
                
                
                // forwards:
                props.onAnimationEnd?.(e);
            }}
        >
            {
                isTypeOf<ModalElementProps<TElement, TCloseType>>(children, ModalElement)
                ?
                <children.type
                    // other props:
                    {...children.props}
                    
                    
                    // essentials:
                    elmRef={(elm) => {
                        setElmRef(children.props.elmRef, elm);
                        setElmRef(elmRef, elm);
                        setElmRef(childRef, elm);
                    }}
                    
                    
                    // accessibilities:
                    tabIndex={tabIndex}
                    
                    
                    // events:
                    onActiveChange={(newActive, closeType) => {
                        onActiveChange?.(newActive, closeType);
                        
                        
                        
                        // forwards:
                        children.props.onActiveChange?.(newActive, closeType);
                    }}
                />
                :
                <ModalElement<TElement, TCloseType>
                    // essentials:
                    elmRef={(elm) => {
                        setElmRef(elmRef, elm);
                        setElmRef(childRef, elm);
                    }}
                    
                    
                    // accessibilities:
                    tabIndex={tabIndex}
                    
                    
                    // events:
                    onActiveChange={(newActive, closeType) => {
                        onActiveChange?.(newActive, closeType);
                    }}
                >
                    { children }
                </ModalElement>
            }
        </Indicator>
    );
}
export { Modal as default }
