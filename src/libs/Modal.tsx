// react:
import {
    default as React,
    useState,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    compositionOf,
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    states,
    
    
    
    //combinators:
    children,
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
import {
    useIsomorphicLayoutEffect,
}                           from './hooks'
import {
    stripoutFocusableElement,
    stripoutDialog,
}                           from './stripouts'
import {
    // utilities:
    setRef,
}                           from './utilities'

// nodestrap components:
import {
    // react components:
    ElementProps,
    Element,
}                           from './Element'
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
     * final animation for the modal.
     */
    anim : any
}
const [modalAnimRefs, modalAnimDecls] = createCssVar<ModalAnimVars>();

export const usesModalAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    return [
        () => style({
            ...imports([
                // animations:
                anim(),
            ]),
            ...vars({
                [modalAnimDecls.anim] : animRefs.animNone,
            }),
            ...states([
                isActivating({
                    ...vars({
                        [modalAnimDecls.anim] : cssProps.animActive,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [modalAnimDecls.anim] : cssProps.animPassive,
                    }),
                }),
            ]),
        }),
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
export const usesDialogLayout = () => {
    // dependencies:
    
    // animations:
    const [anim  , animRefs]   = usesAnim();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
            stripoutDialog(),           // clear browser's default styles
            
            // animations:
            anim(),
        ]),
        ...style({
            // layouts:
            display    : 'block',
            
            
            
            // sizes:
            inlineSize : 'fit-content',
            blockSize  : 'fit-content',
            
            
            
            // animations:
            boxShadow  : animRefs.boxShadow,
            filter     : animRefs.filter,
            anim       : animRefs.anim,
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'element')), // apply general cssProps starting with element***
        }),
    });
};
export const usesDialogStates = () => {
    // dependencies:
    
    // states:
    const [excited]   = usesExcitedState();
    
    
    
    return style({
        ...imports([
            // states:
            excited(),
        ]),
    });
};

export const useDialogSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesDialogLayout(),
            
            // states:
            usesDialogStates(),
        ]),
    ),
], /*sheetId :*/'u4teynvq1y'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesBackdropLayout = () => {
    // dependencies:
    
    // animations:
    const [, modalAnimRefs] = usesModalAnim();
    
    
    
    return style({
        // positions:
        position     : 'fixed',
        inset        : 0,
        
        
        
        // layouts:
        display      : 'grid',
        
        // child default sizes:
        justifyItems : 'center', // center horizontally
        alignItems   : 'center', // center vertically
        
        
        
        // sizes:
        // fills the entire screen:
        boxSizing    : 'border-box', // the final size is including borders & paddings
        minBlockSize : '100vh',
        
        
        
        // animations:
        anim         : modalAnimRefs.anim,
        
        
        
        // customize:
        ...usesGeneralProps(cssProps), // apply general cssProps
    });
};
export const usesBackdropVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule('.hidden', {
                background    : 'none',
            }),
            rule(['.hidden', '.interactive'], {
                // accessibilities:
                pointerEvents : 'none',
                
                
                
                // children:
                ...children('*', { // <Dialog>
                    // accessibilities:
                    pointerEvents : 'initial',
                }),
            }),
        ]),
    });
};
export const usesBackdropStates = () => {
    // dependencies:
    
    // animations:
    const [modalAnim] = usesModalAnim();
    
    
    
    return style({
        ...imports([
            // animations:
            modalAnim(),
        ]),
        ...states([
            isPassived({
                // appearances:
                display: 'none', // hide the modal
            }),
        ]),
    });
};

export const usesDocumentBodyLayout = () => {
    return style({
        // kill the scroll on the body:
        overflow: 'hidden',
    });
};

export const useBackdropSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesBackdropLayout(),
            
            // variants:
            usesBackdropVariants(),
            
            // states:
            usesBackdropStates(),
        ]),
    ),
    compositionOf('body',
        imports([
            usesDocumentBodyLayout(),
        ]),
    ),
], /*sheetId :*/'z26pqrin5i'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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



export interface DialogProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>
    extends
        ModalAction<TCloseType>,
        IndicatorProps<TElement>,
        
        // appearances:
        ModalVariant,
        
        // states:
        TogglerExcitedProps
{
    // accessibilities:
    isModal?   : boolean
    isVisible? : boolean
    tabIndex?  : number
}
export function Dialog<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: DialogProps<TElement, TCloseType>) {
    // styles:
    const sheet        = useDialogSheet();
    
    
    
    // states:
    const excitedState = useExcitedState(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        isModal,
        isVisible,
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
            
            
            // semantics:
            semanticTag ={props.semanticTag   ?? 'dialog'}
            semanticRole={props.semanticRole  ?? 'dialog'}
            aria-modal={isModal}
            {...{
                open : isVisible,
            }}
            
            
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
        DialogProps<TElement, TCloseType>
{
    // performances:
    lazy?   : boolean
    
    
    // components:
    dialog? : React.ReactComponentElement<any, ElementProps>
}
export function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>) {
    // styles:
    const sheet                     = useBackdropSheet();
    
    
    
    // variants:
    const modalVariant              = useModalVariant(props);
    
    
    
    // states:
    const [excitedDn, setExcitedDn] = useState(false);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,        // moved to <Dialog>
        
        
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        tabIndex,       // from Modal, moved to <Dialog>
        
        excited,
        onExcitedChange,
        
        
        // actions:
        onActiveChange,
        
        
        // performances:
        lazy = false,
        
        
        // components:
        dialog = <Dialog<TElement, TCloseType> />,
        
        
        // children:
        children,
    ...restBackdropProps} = props;
    const {
        // layouts:
        size,
        // orientation,
        nude,
        
        
        // colors:
        theme,
        gradient,
        outlined,
        mild,
        
        
        // <Indicator> states:
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        // active,
        // inheritActive,
    } = restBackdropProps;
    
    
    
    // states:
    const activePassiveState        = useActivePassiveState({ active, inheritActive: false });
    const isActive                  = activePassiveState.active;
    const isVisible                 = isActive || (!!activePassiveState.class);
    const isNoBackInteractive       = isVisible && ((modalVariant.class !== 'hidden') && (modalVariant.class !== 'interactive'));
    
    
    
    // fn props:
    const excitedFn   = excited ?? excitedDn;
    
    
    
    // dom effects:
    const childRef = useRef<TElement|null>(null);
    
    useEffect(() => {
        if (!isVisible) return; // modal is not shown => nothing to do
        
        
        
        // setups:
        childRef.current?.focus({ preventScroll: true }); // when actived => focus the <Dialog>, so the user able to use [esc] key to close the modal
    }, [isVisible]); // (re)run the setups on every time the modal is shown
    
    useIsomorphicLayoutEffect(() => {
        if (!isNoBackInteractive) return; // only for no_back_interactive mode
        
        
        
        // setups:
        document.body.classList.add(sheet.body);
        
        
        
        // cleanups:
        return () => {
            document.body.classList.remove(sheet.body);
        };
    }, [isNoBackInteractive, sheet.body]); // (re)run the setups on every time the no_back_interactive & sheet.body changes
    
    
    
    // jsx:
    const defaultDialogProps : DialogProps<TElement, TCloseType> = {
        // essentials:
        elmRef          : (elm) => {
            if (dialog.props.elmRef) setRef(dialog.props.elmRef, elm);
            
            setRef(elmRef, elm);
            setRef(childRef, elm);
        },
        
        
        // accessibilities:
        isModal         : !!(props['aria-modal'] ?? ((isVisible && isNoBackInteractive) ? true : undefined)),
        isVisible       : isVisible,
        tabIndex        : tabIndex,
        excited         : excitedFn,
        onExcitedChange : (newExcited) => {
            dialog.props.onExcitedChange?.(newExcited);
            
            onExcitedChange?.(newExcited);
            setExcitedDn(newExcited);
        },
        
        
        // events:
        onActiveChange  : (newActive, closeType) => {
            dialog.props.onActiveChange?.(newActive, closeType);
            
            onActiveChange?.(newActive, closeType);
        },
        
        
        // variants:
        // layouts:
        size        : size,
        // orientation : orientation,
        nude        : nude,
        // colors:
        theme       : theme,
        gradient    : gradient,
        outlined    : outlined,
        mild        : mild,
        
        
        // <Indicator> states:
        enabled         : enabled,
        inheritEnabled  : inheritEnabled,
        readOnly        : readOnly,
        inheritReadOnly : inheritReadOnly,
        active          : isActive,
        inheritActive   : false,
    };
    return (
        <Indicator<TElement>
            // other props:
            {...restBackdropProps}
            
            
            // accessibilities:
            active       ={isActive}
            inheritActive={false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                modalVariant.class,
            ]}
            
            
            // events:
            // watch left click on the overlay only (not at the <Dialog>):
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
                            childRef.current?.focus({ preventScroll: true }); // re-focus to the <Dialog>, so the user able to use [esc] key to close the Modal
                            e.preventDefault();
                        } // if static
                    } // if
                } // if
            }}
            
            // watch [escape key] on the whole Modal, including <Dialog> & <Dialog>'s children:
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
            { React.cloneElement(React.cloneElement(dialog, defaultDialogProps,
                ((!lazy || isVisible) && children)
            ), dialog.props) }
        </Indicator>
    );
}
export { Modal as default }
