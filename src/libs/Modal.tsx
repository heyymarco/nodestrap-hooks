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
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'component')), // apply general cssProps starting with component***
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
        position     : 'absolute',
        ...rule('body>*>&', {
            position : 'fixed',
        }),
        inset        : 0,
        zIndex       : 1040,
        
        
        
        // layouts:
        display      : 'grid',
        
        // child default sizes:
        justifyItems : 'center', // center horizontally
        alignItems   : 'center', // center vertically
        
        
        
        // sizes:
        // fills the entire screen:
        ...rule('body>*>&', {
            boxSizing    : 'border-box', // the final size is including borders & paddings
            minBlockSize : '100vh',
        }),
        
        
        
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
        componentBoxShadow   : [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        
        
        
        //#region animations
        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animActive           : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['500ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'mdl' });



// react components:

const isServerSide = (typeof(document) === 'undefined');

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
    
    //#region create the portal element and then insert it after the page is fully hydrated
    const [portalElm] = useState(() => isServerSide ? null : document.createElement('div'));
    const viewportElm = (
        viewportRef
        ?
        ((viewportRef.constructor === Object) ? (viewportRef as React.RefObject<HTMLElement>)?.current : (viewportRef as HTMLElement))
        :
        (isServerSide ? null : document.body)
    );
    useEffect(() => {
        // conditions:
        if (!portalElm || !viewportElm) return; // server side => no portal
        
        
        
        // setups:
        viewportElm.appendChild(portalElm);
        
        
        
        // cleanups:
        return () => {
            portalElm.parentElement?.removeChild(portalElm);
        };
    }, [portalElm, viewportElm]); // (re)run the setups on every time the portalElm & viewportElm changes
    //#endregion create the portal element and then insert it after the page is fully hydrated
    
    //#region focus the <Dialog> while the <Modal> is opened
    const dialogRef = useRef<TElement|null>(null);
    useEffect(() => {
        // conditions:
        if (!isVisible) return; // <Dialog> is not shown => nothing to do
        
        
        
        // setups:
        dialogRef.current?.focus({ preventScroll: true }); // when actived => focus the <Dialog>, so the user able to use [esc] key to close the modal
    }, [isVisible]); // (re)run the setups on every time the <Dialog> is shown
    //#endregion focus the <Dialog> while the <Modal> is opened
    
    //#region un-scroll the viewport (<body>) while the <Modal> is opened
    useEffect(() => {
        // conditions:
        if (!isModal)     return; // only for modal mode
        if (!viewportElm) return; // server side => no portal
        
        
        
        // setups:
        const handlePreventDefault = (e: Event) => e.preventDefault();
        const noPassiveOptions : AddEventListenerOptions = { passive: false }

        viewportElm.addEventListener('wheel'    , handlePreventDefault, noPassiveOptions);
        viewportElm.addEventListener('touchmove', handlePreventDefault, noPassiveOptions);
        viewportElm.addEventListener('keydown'  , handlePreventDefault);
        
        
        
        // cleanups:
        return () => {
            viewportElm.removeEventListener('wheel'    , handlePreventDefault, noPassiveOptions);
            viewportElm.removeEventListener('touchmove', handlePreventDefault, noPassiveOptions);
            viewportElm.removeEventListener('keydown'  , handlePreventDefault);
        };
    }, [isModal, viewportElm]); // (re)run the setups on every time the isModal changes
    //#endregion un-scroll the viewport (<body>) while the <Modal> is opened
    
    //#region delays the rendering of portal until the page is fully hydrated
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        // conditions:
        if (isServerSide) return; // client side only
        
        
        
        // setups:
        setIsHydrated(true);
    }, []); // run once at startup
    //#endregion delays the rendering of portal until the page is fully hydrated
    
    
    
    // handlers:
    const handleBackdropPress = (e : React.MouseEvent<TElement, MouseEvent> | React.TouchEvent<TElement>, passive = false) => {
        if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
            if (!e.defaultPrevented) {
                if (props.backdropStyle === 'static') {
                    setExcitedDn(true);
                    dialogRef.current?.focus({ preventScroll: true }); // re-focus to the <Dialog>, so the user able to use [esc] key to close the Modal
                    if (!passive) e.preventDefault();
                } // if
            } // if
        } // if
    };
    const handleBackdropClick : React.MouseEventHandler<TElement> = (e) => {
        if (e.target === e.currentTarget) { // only handle click on the overlay, ignores click bubbling from the children
            if (!e.defaultPrevented) {
                if (props.backdropStyle !== 'static') {
                    if (onActiveChange) {
                        onActiveChange(false, 'overlay' as unknown as TCloseType);
                        e.preventDefault();
                    } // if
                } // if
            } // if
        } // if
    };
    const handleBackdropEscape : React.KeyboardEventHandler<TElement> = (e) => {
        if (!e.defaultPrevented) {
            if ((e.key === 'Escape') || (e.code === 'Escape')) {
                if (onActiveChange) {
                    onActiveChange(false, 'shortcut' as unknown as TCloseType);
                    e.preventDefault();
                } // if
            } // if
        } // if
    };
    const handleContextMenu : React.MouseEventHandler<TElement> = (e) => {
        if (e.target === e.currentTarget) { // only cancels contextMenu on the overlay, allows at the children
            if (!e.defaultPrevented) {
                e.preventDefault();
            } // if
        } // if
    };
    
    
    
    // jsx:
    if (!isHydrated || !portalElm) return <></>; // page is not already hydrated or server side => nothing to render
    
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
            style : defaultDialogProps.style,
            ref   : defaultDialogProps.elmRef,
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
            onMouseDown={(e) => {
                props.onMouseDown?.(e);
                
                handleBackdropPress(e);
            }}
            onTouchStart={(e) => {
                props.onTouchStart?.(e);
                
                handleBackdropPress(e, true);
            }}
            onClick={(e) => {
                props.onClick?.(e);
                
                handleBackdropClick(e);
            }}
            onContextMenu={handleContextMenu}
            
            // watch [escape key] on the whole Modal, including <Dialog> & <Dialog>'s children:
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                handleBackdropEscape(e);
            }}
            
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                activePassiveState.handleAnimationEnd(e);
            }}
        >
            { (!lazy || isVisible) && React.cloneElement(React.cloneElement(children, defaultDialogProps), children.props) }
        </Indicator>
    , portalElm);
}
export { Modal as default }
