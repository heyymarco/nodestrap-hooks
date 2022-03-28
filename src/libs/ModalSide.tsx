// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    compositionOf,
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    
    
    
    //combinators:
    children,
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

// nodestrap utilities:
import {
    // utilities:
    setRef,
}                           from './utilities'

// nodestrap components:
import type {
    // react components:
    ElementProps,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
    usesBorderRadius,
    useExcitedState,
    TogglerExcitedProps,
}                           from './Basic'
import CloseButton          from './CloseButton'
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    CardProps,
    Card,
}                           from './Card'
import {
    // react components:
    Collapse,
}                           from './Collapse'
import {
    // hooks:
    BackdropStyle,
    BackdropVariant,
    
    
    
    // styles:
    usesDialogLayout,
    usesDialogStates,
    
    usesBackdropLayout,
    usesBackdropVariants,
    usesBackdropStates,
    
    
    
    // react components:
    DialogProps,
    
    ModalProps,
    Modal,
}                           from './Modal'
import {
    // styles:
    usesActionBarLayout,
    
    
    
    // react components:
    ModalCardCloseType,
}                           from './ModalCard'



// hooks:

// appearances:

export type ModalSideStyle = 'inlineStart'|'inlineEnd'|'blockStart'|'blockEnd' // might be added more styles in the future
export interface ModalSideVariant {
    modalSideStyle? : ModalSideStyle
}
export const useModalSideVariant = ({ modalSideStyle }: ModalSideVariant) => {
    return {
        class : modalSideStyle ? modalSideStyle : 'inlineStart',
    };
};



// styles:
export const usesSideDialogLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesDialogLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if <Card> is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the <Card>'s header should be visible first
            alignItems     : 'stretch', // stretch <Card> horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // children:
            ...children(['&', '*'], { // <Collapse> & <Card>
                // sizes:
                boxSizing     : 'border-box',     // the final size is including borders & paddings
                inlineSize    : 'auto',           // follows the content's width, but
                maxInlineSize : '100%',           // up to the maximum available parent's width
                blockSize     : 'auto',           // follows the content's height, but
                maxBlockSize  : '100%',           // up to the maximum available parent's height
                overflow      : 'hidden',         // force the <Card> to scroll
            }),
            
            
            
            // children:
            ...children('*', { // <Card>
                // sizes:
                // maximum height of <Card> when side-left & side-right
                flex          : [[1, 1, '100%']], // growable, shrinkable, initial from parent's height
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'card')), // apply general cssProps starting with card***
            }),
        }),
    });
};
export const usesSideDialogVariants = () => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...variants([
            rule('.blockStart>&', {
                // children:
                ...children(['&', '*'], { // <Collapse> & <Card>
                    // borders:
                    // remove rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : '0px',
                    [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                }),
            }),
            rule('.blockEnd>&', {
                // children:
                ...children(['&', '*'], { // <Collapse> & <Card>
                    // borders:
                    // remove rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                    [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                }),
            }),
            rule('.inlineStart>&', {
                // children:
                ...children(['&', '*'], { // <Collapse> & <Card>
                    // borders:
                    // remove rounded corners on left:
                    [borderRadiusDecls.borderStartStartRadius] : '0px',
                    [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                }),
            }),
            rule('.inlineEnd>&', {
                // children:
                ...children(['&', '*'], { // <Collapse> & <Card>
                    // borders:
                    // remove rounded corners on right:
                    [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                    [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                }),
            }),
        ]),
    });
};
export const usesSideDialogStates = () => {
    return style({
        ...imports([
            // states:
            usesDialogStates(),
        ]),
    });
};

export const useSideDialogSheet = createUseSheet(() => [
    mainComposition(
        rule('&&', { // makes `.SideDialog` is more specific than `.Collapse`
            ...imports([
                // layouts:
                usesSideDialogLayout(),
                
                // variants:
                usesSideDialogVariants(),
                
                // states:
                usesSideDialogStates(),
            ]),
        }),
    ),
    compositionOf('actionBar',
        imports([
            usesActionBarLayout(),
        ]),
    ),
], /*sheetId :*/'qvp7n6e4ck'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesSideBackdropLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBackdropLayout(),
        ]),
        ...style({
            // layouts:
            display      : 'grid',    // use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            // child default sizes:
         // justifyItems : 'start',   // align left horizontally // already defined in variant `.(inline|block)(Start|End)`
         // alignItems   : 'stretch', // stretch    vertically   // already defined in variant `.(inline|block)(Start|End)`
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesSideBackdropVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesBackdropVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule('.blockStart', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'stretch', // stretch   horizontally
                alignItems   : 'start',   // align top vertically
            }),
            rule('.blockEnd', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'stretch', // stretch   horizontally
                alignItems   : 'end',     // align top vertically
            }),
            rule('.inlineStart', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'start',   // align left horizontally
                alignItems   : 'stretch', // stretch    vertically
            }),
            rule('.inlineEnd', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'end',     // align left horizontally
                alignItems   : 'stretch', // stretch    vertically
            }),
        ]),
    });
};
export const usesSideBackdropStates = () => {
    return style({
        ...imports([
            // states:
            usesBackdropStates(),
        ]),
    });
};

export const useSideBackdropSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesSideBackdropLayout(),
            
            // variants:
            usesSideBackdropVariants(),
            
            // states:
            usesSideBackdropStates(),
        ]),
    ),
], /*sheetId :*/'g93sfdvlhc'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'mdlsde' });



// react components:

export type ModalSideCloseType = ModalCardCloseType



export interface SideDialogProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>
    extends
        DialogProps<TElement, TCloseType>,
        CardProps<TElement>,
        
        // appearances:
        ModalSideVariant,
        
        // states:
        TogglerExcitedProps
{
    // components:
    card? : React.ReactComponentElement<any, ElementProps>
}
export function SideDialog<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>(props: SideDialogProps<TElement, TCloseType>) {
    // styles:
    const sheet        = useSideDialogSheet();
    
    
    
    // states:
    const excitedState = useExcitedState(props);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,                   // moved to <Card>
        
        
        // semantics:
        semanticTag,              // moved to <Collapse>
        semanticRole,             // moved to <Collapse>
        'aria-modal' : ariaModal, // moved to <Collapse>
        
        
        // accessibilities:
        isVisible,                // moved to <Collapse>
        tabIndex = -1,            // moved to <Card>
        active,                   // moved to <Collapse>
        inheritActive,            // moved to <Collapse>
        
        
        // actions:
        onActiveChange,           // implemented
        onExcitedChange,          // not implemented
        
        
        // components:
        card = <Card<TElement> />,
        
        
        // children:
        header,                   // changed the default
    ...restCardProps} = props;
    
    
    
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
                    // variants:
                    size={props.size}
                    
                    
                    // actions:
                    onClick={handleClose}
                />
            </h5>
        );
        
        
        
        // other component:
        return header;
    })();
    
    
    
    // jsx:
    const defaultCardProps : CardProps<TElement> = {
        // other props:
        ...restCardProps,
        
        
        // essentials:
        elmRef : !card.props.elmRef ? elmRef : (elm) => {
            setRef(card.props.elmRef, elm);
            
            setRef(elmRef, elm);
        },
        
        
        // accessibilities:
        ...{
            tabIndex,
        },
        
        
        // children:
        header : headerFn,
    };
    return (
        <Collapse<TElement>
            // semantics:
            semanticTag ={semanticTag}
            semanticRole={semanticRole}
            aria-modal={ariaModal}
            {...{
                open : isVisible,
            }}
            
            
            // accessibilities:
            active={active}
            inheritActive={inheritActive}
            
            
            // layouts:
            orientation={props.modalSideStyle?.startsWith('block') ? 'block' : 'inline'}
            nude={true}
            
            
            // classes:
            classes={[
                sheet.main, // inject SideDialog class
            ]}
            stateClasses={[...(props.stateClasses ?? []),
                excitedState.class,
            ]}
            
            
            // events:
            onAnimationEnd={(e) => {
                // states:
                excitedState.handleAnimationEnd(e);
            }}
        >
            { React.cloneElement(React.cloneElement(card, defaultCardProps), card.props) }
        </Collapse>
    );
}



export interface ModalSideProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>
    extends
        ModalProps<TElement, TCloseType>,
        SideDialogProps<TElement, TCloseType>
{
}
export function ModalSide<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>(props: ModalSideProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useSideBackdropSheet();
    
    
    
    // variants:
    const modalSideVariant   = useModalSideVariant(props);
    
    
    
    // rest props:
    const {
        // ModalSideVariant:
        modalSideStyle,
        
        
        // children:
        header,
        footer,
        children,
    ...restBackdropProps} = props;
    
    
    
    // jsx:
    return (
        <Modal<TElement, TCloseType>
            // other props:
            {...restBackdropProps}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                modalSideVariant.class,
            ]}
        >
            <SideDialog<TElement, TCloseType>
                // ModalSideVariant:
                modalSideStyle={modalSideStyle}
                
                
                // children:
                header={header}
                footer={footer}
            >
                { children }
            </SideDialog>
        </Modal>
    );
}
export { ModalSide as default }

export type { OrientationName, OrientationVariant }

export type { BackdropStyle, BackdropVariant }
