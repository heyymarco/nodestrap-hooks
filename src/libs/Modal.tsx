// react:
import {
    default as React,
    useState,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components
import {
    createPortal,
}                           from 'react-dom'

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
    // hooks:
    usesSizeVariant,
    usesAnim,
    usesExcitedState,
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

export type BackdropStyle = 'hidden'|'interactive'|'static' // might be added more styles in the future
export interface BackdropVariant {
    backdropStyle? : BackdropStyle
}
export const useBackdropVariant = ({ backdropStyle }: BackdropVariant) => {
    return {
        class : backdropStyle ? backdropStyle : null,
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
        zIndex       : 1040,
        
        
        
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
        IndicatorProps<TElement>,
        ModalAction<TCloseType>,
        
        // states:
        TogglerExcitedProps
{
    // accessibilities:
    isVisible? : boolean
    tabIndex?  : number
}

export interface ModalProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>
    extends
        IndicatorProps<TElement>,
        Omit<DialogProps<TElement, TCloseType>, 'isVisible'>,
        
        // appearances:
        BackdropVariant
{
    // modals:
    viewportRef? : React.RefObject<HTMLElement>|HTMLElement|null // getter ref
    
    
    // performances:
    lazy?        : boolean
}
export function Modal<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCloseType>(props: ModalProps<TElement, TCloseType>) {
    // styles:
    const sheet                     = useBackdropSheet();
    
    
    
    // variants:
    const backdropVariant           = useBackdropVariant(props);
    
    
    
    // states:
    const [excitedDn, setExcitedDn] = useState(false);
    
    
    
    // rest props:
    const {
        // essentials:
        style,          // moved  to <Dialog>
     // outerRef,       // remain in <Backdrop>
        elmRef,         // moved  to <Dialog>
        
        
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        tabIndex,       // moved  to <Dialog>
        
        excited,
        onExcitedChange,
        
        
        // actions:
        onActiveChange,
        
        
        // modals:
        viewportRef,
        
        
        // performances:
        lazy = false,
        
        
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
    
    
    
    // verifies:
    React.Children.only(children);
    if (!React.isValidElement<DialogProps<TElement, TCloseType>>(children)) throw Error('Invalid child element.');
    
    
    
    // states:
    const activePassiveState = useActivePassiveState({ active, inheritActive: false });
    const isActive           = activePassiveState.active;
    const isVisible          = isActive || (!!activePassiveState.class);
    const isModal            = isVisible && !['hidden', 'interactive'].includes(backdropVariant.class ?? '');
    
    
    
    // fn props:
    const excitedFn   = excited ?? excitedDn;
    
    
    
    // dom effects:
    const [containerElm] = useState(() => (typeof(document) === 'undefined') ? null : document.createElement('div'));
    const viewportElm    = (viewportRef === null) ? null : ((viewportRef === undefined) ? ((typeof(document) === 'undefined') ? null : document.body) : ((viewportRef instanceof HTMLElement) ? viewportRef : viewportRef?.current));
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!containerElm || !viewportElm) return; // server side => no portal
        
        
        
        // setups:
        viewportElm.appendChild(containerElm);
        
        
        
        // cleanups:
        return () => {
            containerElm.parentElement?.removeChild(containerElm);
        };
    }, []); // runs once at startup
    
    const dialogRef = useRef<TElement|null>(null);
    useEffect(() => {
        // conditions:
        if (!isVisible) return; // <Dialog> is not shown => nothing to do
        
        
        
        // setups:
        dialogRef.current?.focus({ preventScroll: true }); // when actived => focus the <Dialog>, so the user able to use [esc] key to close the modal
    }, [isVisible]); // (re)run the setups on every time the <Dialog> is shown
    
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isModal)     return; // only for modal mode
        if (!viewportElm) return; // server side => no portal
        
        
        
        // setups:
        viewportElm.classList.add(sheet.body);
        
        
        
        // cleanups:
        return () => {
            viewportElm.classList.remove(sheet.body);
        };
    }, [isModal, sheet.body]); // (re)run the setups on every time the isModal & sheet.body changes
    
    
    
    // jsx:
    if (!containerElm) return <></>; // server side => no portal
    
    interface NativeDialogProps {
        ref?      : React.Ref<TElement>
        open?     : boolean
    }
    let defaultDialogProps : DialogProps<TElement, TCloseType> & NativeDialogProps = {
        // essentials:
        style           : style,
        elmRef          : (elm) => {
            setRef(children.props.elmRef, elm);
            
            setRef(elmRef   , elm);
            setRef(dialogRef, elm);
        },
        
        
        // semantics:
        semanticTag     : [null, 'dialog'],
        semanticRole    :        'dialog' ,
        'aria-modal'    : isModal || undefined,
        
        
        // accessibilities:
        isVisible       : isVisible,
        tabIndex        : tabIndex,
        excited         : excitedFn,
        onExcitedChange : (newExcited) => {
            children.props.onExcitedChange?.(newExcited);
            
            onExcitedChange?.(newExcited);
            setExcitedDn(newExcited);
        },
        
        
        // actions:
        onActiveChange  : (newActive, closeType) => {
            children.props.onActiveChange?.(newActive, closeType);
            
            onActiveChange?.(newActive, closeType);
        },
        
        
        // variants:
        // layouts:
        size            : size,
     // orientation     : orientation,
        nude            : nude,
        // colors:
        theme           : theme,
        gradient        : gradient,
        outlined        : outlined,
        mild            : mild,
        
        
        // <Indicator> states:
        enabled         : enabled,
        inheritEnabled  : inheritEnabled,
        readOnly        : readOnly,
        inheritReadOnly : inheritReadOnly,
        active          : isActive,
        inheritActive   : false,
    };
    if (typeof(children.type) === 'string') {
        defaultDialogProps = {
            // essentials:
            ref: defaultDialogProps.elmRef,
        };
        if (children.type === 'dialog') {
            defaultDialogProps.open = defaultDialogProps.isVisible;
        } // if
    } // if
    
    return createPortal(
        <Indicator<TElement>
            // other props:
            {...restBackdropProps}
            
            
            // accessibilities:
            active       ={isActive}
            inheritActive={false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                backdropVariant.class,
            ]}
            
            
            // events:
            // watch left click on the overlay only (not at the <Dialog>):
            onClick={(e) => {
                props.onClick?.(e);
                
                
                
                if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
                    if (!e.defaultPrevented) {
                        if (props.backdropStyle !== 'static') {
                            if (onActiveChange) {
                                onActiveChange(false, 'overlay' as unknown as TCloseType);
                                e.preventDefault();
                            } // if
                        }
                        else {
                            setExcitedDn(true);
                            dialogRef.current?.focus({ preventScroll: true }); // re-focus to the <Dialog>, so the user able to use [esc] key to close the Modal
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
            { (!lazy || isVisible) && React.cloneElement(React.cloneElement(children, defaultDialogProps), children.props) }
        </Indicator>
    , containerElm);
}
export { Modal as default }
