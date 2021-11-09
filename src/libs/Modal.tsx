// react:
import {
    default as React,
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
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
    children,
    
    
    
    // rules:
    variants,
    states,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    ElementProps,
    Element,
    
    
    
    // utilities:
    isTypeOf,
    setRef,
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
import {
    stripoutFocusableElement,
}                           from './stripouts'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    usesAnim,
    usesExcitedState,
    useExcitedState,
    TogglerExcitedProps,
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



// hooks:

// animations:

//#region modal animations
export interface ModalAnimVars {
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


// appearances:

export type ModalStyle = 'hidden'|'interactive'|'static' // might be added more styles in the future
export interface ModalVariant {
    modalStyle? : ModalStyle
}
export const useModalVariant = (props: ModalVariant) => {
    return {
        class : props.modalStyle ? props.modalStyle : null,
    };
};



// styles:
export const usesModalElementLayout = () => {
    // dependencies:
    
    // animations:
    const [anim  , animRefs]   = usesAnim();
    
    
    
    return composition([
        imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
            
            // animations:
            anim(),
        ]),
        layout({
            // layouts:
            display : 'inline-block',
            
            
            
            // animations:
            boxShadow : animRefs.boxShadow,
            filter    : animRefs.filter,
            anim      : animRefs.anim,
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'element')), // apply general cssProps starting with element***
        }),
    ]);
};
export const usesModalElementStates = () => {
    // dependencies:
    
    // states:
    const [excited]   = usesExcitedState();
    
    
    
    return composition([
        imports([
            // states:
            excited(),
        ]),
    ]);
};
export const usesModalElement = () => {
    return composition([
        imports([
            // layouts:
            usesModalElementLayout(),
            
            // states:
            usesModalElementStates(),
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
        variants([
            rule('.hidden', [
                layout({
                    background    : 'none',
                }),
            ]),
            rule(['.hidden', '.interactive'], [
                layout({
                    // accessibilities:
                    pointerEvents : 'none',
                    
                    
                    
                    // children:
                    ...children('*', [ // ModalElement
                        layout({
                            // accessibilities:
                            pointerEvents : 'initial',
                        }),
                    ]),
                }),
            ]),
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
        ElementProps<TElement>,
        
        // states:
        TogglerExcitedProps,
        
        // appearances:
        ModalVariant
{
    // accessibilities:
    tabIndex? : number
}
export function ModalElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalElementProps<TElement, TCloseType>) {
    // styles:
    const sheet        = useModalElementSheet();
    
    
    
    // states:
    const excitedState = useExcitedState(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        tabIndex = -1,
        
        
        // actions:
        onActiveChange,  // not implemented
        onExcitedChange, // not implemented
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            {...{
                tabIndex,
            }}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                excitedState.class,
            ]}
            
            
            // events:
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                excitedState.handleAnimationEnd(e);
            }}
        />
    );
}



export interface ModalProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>
    extends
        IndicatorProps<TElement>,
        ModalElementProps<TElement, TCloseType>
{
}
export function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>) {
    // styles:
    const sheet                     = useModalSheet();
    
    
    
    // variants:
    const modalVariant              = useModalVariant(props);
    
    
    
    // states:
    const [excitedDn, setExcitedDn] = useState(false);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,        // moved to ModalElement
        
        
        // accessibilities:
        enabled,        // from accessibilities, not implemented
        inheritEnabled, // from accessibilities, not implemented
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        tabIndex,       // from Modal, moved to ModalElement
        
        excited,
        onExcitedChange,
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // states:
    const activePassiveState        = useActivePassiveState({ active, inheritActive: false });
    const isVisible                 = activePassiveState.active || (!!activePassiveState.class);
    const isNoBackInteractive       = isVisible && ((modalVariant.class !== 'hidden') && (modalVariant.class !== 'interactive'));
    
    
    
    // fn props:
    const excitedFn   = excited ?? excitedDn;
    
    
    
    // dom effects:
    const childRef = useRef<TElement|null>(null);
    
    useEffect(() => {
        if (!isVisible) return; // modal is not shown => nothing to do
        
        
        
        // setups:
        childRef.current?.focus({ preventScroll: true }); // when actived => focus the ModalElement, so the user able to use [esc] key to close the modal
    }, [isVisible]); // (re)run the setups on every time the modal is shown
    
    useLayoutEffect(() => {
        if (!isNoBackInteractive) return; // only for no_back_interactive mode
        
        
        
        // setups:
        document.body.classList.add(sheet.body);
        
        
        
        // cleanups:
        return () => {
            document.body.classList.remove(sheet.body);
        };
    }, [isNoBackInteractive, sheet.body]); // (re)run the setups on every time the no_back_interactive & sheet.body changes
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]  }
            semanticRole={props.semanticRole ?? 'dialog'}
            
            aria-modal={props['aria-modal'] ?? ((isVisible && isNoBackInteractive) ? true : undefined)}
            
            
            // accessibilities:
            {...{
                active        : activePassiveState.active,
                inheritActive : false,
            }}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                modalVariant.class,
            ]}
            
            
            // events:
            // watch left click on the overlay only (not at the ModalElement):
            onClick={(e) => {
                props.onClick?.(e);
                
                
                
                if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
                    if (!e.defaultPrevented) {
                        if (props.modalStyle !== 'static') {
                            if (onActiveChange) {
                                onActiveChange(false, 'overlay' as unknown as TCloseType);
                                e.preventDefault();
                            } // if
                        }
                        else {
                            setExcitedDn(true);
                            childRef.current?.focus({ preventScroll: true }); // re-focus to the ModalElement, so the user able to use [esc] key to close the Modal
                            e.preventDefault();
                        } // if static
                    } // if
                } // if
            }}
            
            // watch [escape key] on the whole Modal, including ModalElement & ModalElement's children:
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === 'Escape') || (e.code === 'Escape')) {
                        if (onActiveChange) {
                            onActiveChange(false, 'shortcut' as unknown as TCloseType);
                            e.preventDefault();
                        } // if
                    } // if
                } // if
            }}
            
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                activePassiveState.handleAnimationEnd(e);
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
                        setRef(children.props.elmRef, elm);
                        setRef(elmRef, elm);
                        setRef(childRef, elm);
                    }}
                    
                    
                    // accessibilities:
                    tabIndex={tabIndex}
                    excited={excitedFn}
                    onExcitedChange={(newExcited) => {
                        children.props.onExcitedChange?.(newExcited);
                        
                        
                        
                        onExcitedChange?.(newExcited);
                        setExcitedDn(newExcited);
                    }}
                    
                    
                    // events:
                    onActiveChange={(newActive, closeType) => {
                        children.props.onActiveChange?.(newActive, closeType);
                        
                        
                        
                        onActiveChange?.(newActive, closeType);
                    }}
                />
                :
                <ModalElement<TElement, TCloseType>
                    // essentials:
                    elmRef={(elm) => {
                        setRef(elmRef, elm);
                        setRef(childRef, elm);
                    }}
                    
                    
                    // accessibilities:
                    tabIndex={tabIndex}
                    excited={excitedFn}
                    onExcitedChange={(newExcited) => {
                        onExcitedChange?.(newExcited);
                        setExcitedDn(newExcited);
                    }}
                    
                    
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
