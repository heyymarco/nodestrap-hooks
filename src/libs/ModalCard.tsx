// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Prop,
}                           from './css-types'   // ts defs support for cssfn
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
    useExcitedState,
    TogglerExcitedProps,
}                           from './Basic'
import {
    // styles:
    usesResponsiveContainerGridLayout,
}                           from './Container'
import Button               from './Button'
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
    Popup,
}                           from './Popup'
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
    ModalCloseType,
    
    DialogProps,
    
    ModalProps,
    Modal,
}                           from './Modal'



// hooks:

// appearances:

export type ModalCardStyle = 'scrollable' // might be added more styles in the future
export interface ModalCardVariant {
    modalCardStyle? : ModalCardStyle
    horzAlign?      : Prop.JustifyItems
    vertAlign?      : Prop.AlignItems
}
export const useModalCardVariant = ({ modalCardStyle, horzAlign, vertAlign }: ModalCardVariant) => {
    return {
        class : modalCardStyle ? modalCardStyle : null,
        
        style : {
            [cssDecls.horzAlign] : horzAlign,
            [cssDecls.vertAlign] : vertAlign,
        },
    };
};



// styles:
export const usesCardDialogLayout = () => {
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
            alignItems     : 'center',  // center <Card> horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // children:
            ...children('*', { // <Card>
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'card')), // apply general cssProps starting with card***
            }),
        }),
    });
};
export const usesCardDialogVariants = () => {
    return style({
        ...variants([
            rule(':not(.scrollable)>&', {
                // sizes:
                flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                
                boxSizing     : 'content-box',    // the final size is excluding borders & paddings
                inlineSize    : 'max-content',    // forcing the <Card>'s width follows the <Card>'s items width
                blockSize     : 'max-content',    // forcing the <Card>'s height follows the <Card>'s items height
            }),
            rule('.scrollable>&', {
                // sizes:
                flex          : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height
                
                
                
                // children:
                ...children(['&', '*'], { // <Popup> & <Card>
                    // sizes:
                    boxSizing     : 'border-box',     // the final size is including borders & paddings
                    inlineSize    : 'auto',           // follows the content's width, but
                    maxInlineSize : '100%',           // up to the maximum available parent's width
                    blockSize     : 'auto',           // follows the content's height, but
                    maxBlockSize  : '100%',           // up to the maximum available parent's height
                    overflow      : 'hidden',         // force the <Card> to scroll
                }),
            }),
        ]),
    });
};
export const usesCardDialogStates = () => {
    return style({
        ...imports([
            // states:
            usesDialogStates(),
        ]),
    });
};

export const usesActionBarLayout = () => {
    return style({
        // layouts:
        display        : 'flex',          // use block flexbox, so it takes the entire parent's width
        flexDirection  : 'row',           // items are stacked horizontally
        justifyContent : 'space-between', // items are separated horizontally as far as possible
        alignItems     : 'center',        // items are centered vertically
        flexWrap       : 'nowrap',        // no wrapping
        
        
        
        // children:
        ...children('*', {
            // only one child:
            ...rule(':first-child:last-child', {
                marginInlineStart: 'auto',
            }),
        }),
    });
};

export const useCardDialogSheet = createUseSheet(() => [
    mainComposition(
        rule('&&', { // makes `.CardDialog` is more specific than `.Popup`
            ...imports([
                // layouts:
                usesCardDialogLayout(),
                
                // variants:
                usesCardDialogVariants(),
                
                // states:
                usesCardDialogStates(),
            ]),
        }),
    ),
    compositionOf('actionBar',
        imports([
            usesActionBarLayout(),
        ]),
    ),
], /*sheetId :*/'ifh5e9blw5'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesCardBackdropLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBackdropLayout(),
        ]),
        ...style({
            // layouts:
         // display      : 'grid',             // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            // child default sizes:
            justifyItems : cssProps.horzAlign, // align (default center) horizontally
            alignItems   : cssProps.vertAlign, // align (default center) vertically
            
            
            
            // children:
            ...children('*', { // <CardDialog>
                // layouts:
                gridArea : 'content',
            }),
            
            //#region psedudo elm for filling the end of horz & vert scroll
            ...children(['::before', '::after'], {
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
            ...children('::before', {
                // layouts:
                gridArea    : 'inlineEnd',
            }),
            ...children('::after', {
                // layouts:
                gridArea    : 'blockEnd',
            }),
            //#endregion psedudo elm for filling the end of horz & vert scroll
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        ...imports([
            // layouts:
            usesResponsiveContainerGridLayout(), // applies responsive container functionality using css grid
        ]),
    });
};
export const usesCardBackdropVariants = () => {
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
            rule(':not(.scrollable)', {
                // scrolls:
                // scroller at ModalCard's layer
                overflow : 'auto', // enable horz & vert scrolling on Modal (backdrop)
            }),
        ]),
    });
};
export const usesCardBackdropStates = () => {
    return style({
        ...imports([
            // states:
            usesBackdropStates(),
        ]),
    });
};

export const useCardBackdropSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesCardBackdropLayout(),
            
            // variants:
            usesCardBackdropVariants(),
            
            // states:
            usesCardBackdropStates(),
        ]),
    ),
], /*sheetId :*/'j3ol5k9hzm'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // positions:
        horzAlign : 'center',
        vertAlign : 'center',
    };
}, { prefix: 'mdlcrd' });



// react components:

export type ModalCardCloseType = 'ui'|ModalCloseType



export interface CardDialogProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>
    extends
        DialogProps<TElement, TCloseType>,
        CardProps<TElement>,
        
        // appearances:
        ModalCardVariant,
        
        // states:
        TogglerExcitedProps
{
    // components:
    card? : React.ReactComponentElement<any, ElementProps>
}
export function CardDialog<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>(props: CardDialogProps<TElement, TCloseType>) {
    // styles:
    const sheet        = useCardDialogSheet();
    
    
    
    // states:
    const excitedState = useExcitedState(props);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,                   // moved to <Card>
        
        
        // semantics:
        semanticTag,              // moved to <Popup>
        semanticRole,             // moved to <Popup>
        'aria-modal' : ariaModal, // moved to <Popup>
        
        
        // accessibilities:
        isVisible,                // moved to <Popup>
        tabIndex = -1,            // moved to <Card>
        active,                   // moved to <Popup>
        inheritActive,            // moved to <Popup>
        
        
        // actions:
        onActiveChange,           // implemented
        onExcitedChange,          // not implemented
        
        
        // components:
        card = <Card<TElement> />,
        
        
        // children:
        header,                   // changed the default
        footer,                   // changed the default
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
    
    const footerFn = (() => {
        // default (unset) or string:
        if ((footer === undefined) || (typeof footer === 'string')) return (
            <p
                // classes:
                className={sheet.actionBar}
            >
                { footer }
                <Button
                    // variants:
                    size={props.size}
                    
                    
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
        footer : footerFn,
    };
    return (
        <Popup<TElement>
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
            nude={true}
            
            
            // classes:
            classes={[
                sheet.main, // inject CardDialog class
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
        </Popup>
    );
}



export interface ModalCardProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>
    extends
        ModalProps<TElement, TCloseType>,
        CardDialogProps<TElement, TCloseType>
{
}
export function ModalCard<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>(props: ModalCardProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useCardBackdropSheet();
    
    
    
    // variants:
    const modalCardVariant   = useModalCardVariant(props);
    
    
    
    // rest props:
    const {
        // ModalCardVariant:
        modalCardStyle,
        horzAlign,
        vertAlign,
        
        
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
                modalCardVariant.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // variants:
                ...modalCardVariant.style,
            }}
        >
            <CardDialog<TElement, TCloseType>
                // ModalCardVariant:
                modalCardStyle={modalCardStyle}
                horzAlign={horzAlign}
                vertAlign={vertAlign}
                
                
                // children:
                header={header}
                footer={footer}
            >
                { children }
            </CardDialog>
        </Modal>
    );
}
export { ModalCard as default }

export type { OrientationName, OrientationVariant }

export type { BackdropStyle, BackdropVariant }
