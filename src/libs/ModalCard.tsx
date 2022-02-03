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

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    usesExcitedState,
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
    ModalStyle,
    ModalVariant,
    
    
    
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
export const usesModalCardElementLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesModalElementLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if Card is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the Card's header should be visible first
            alignItems     : 'center',  // center Card horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // children:
            ...children('*', { // Card
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'card')), // apply general cssProps starting with card***
            }),
        }),
    });
};
export const usesModalCardElementVariants = () => {
    return style({
        ...variants([
            rule(':not(.scrollable)>&', {
                // sizes:
                flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                
                boxSizing     : 'content-box',    // the final size is excluding borders & paddings
                inlineSize    : 'max-content',    // forcing the Card's width follows the Card's items width
                blockSize     : 'max-content',    // forcing the Card's height follows the Card's items height
            }),
            rule('.scrollable>&', {
                // sizes:
                flex          : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height
                
                
                
                // children:
                ...children(['&', '*'], { // Popup & Card
                    boxSizing     : 'border-box',     // the final size is including borders & paddings
                    inlineSize    : 'auto',           // follows the content's width, but
                    maxInlineSize : '100%',           // up to the maximum available parent's width
                    blockSize     : 'auto',           // follows the content's height, but
                    maxBlockSize  : '100%',           // up to the maximum available parent's height
                    overflow      : 'hidden',         // force the Card to scroll
                }),
            }),
        ]),
    });
};
export const usesModalCardElementStates = () => {
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

export const useModalCardElementSheet = createUseSheet(() => [
    mainComposition(
        rule('&&', { // makes `.ModalCardElement` is more specific than `.Popup`
            ...imports([
                // layouts:
                usesModalCardElementLayout(),
                
                // variants:
                usesModalCardElementVariants(),
                
                // states:
                usesModalCardElementStates(),
            ]),
        }),
    ),
    compositionOf('actionBar',
        imports([
            usesActionBarLayout(),
        ]),
    ),
], /*sheetId :*/'ifh5e9blw5'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesModalCardLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesModalLayout(),
        ]),
        ...style({
            // layouts:
         // display      : 'grid',             // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the Card both horizontally & vertically
            
            // child default sizes:
            justifyItems : cssProps.horzAlign, // align (default center) horizontally
            alignItems   : cssProps.vertAlign, // align (default center) vertically
            
            
            
            // children:
            ...children('*', {
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
export const usesModalCardVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesModalVariants(),
            
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
export const usesModalCardStates = () => {
    return style({
        ...imports([
            // states:
            usesModalStates(),
        ]),
    });
};

export const useModalCardSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesModalCardLayout(),
            
            // variants:
            usesModalCardVariants(),
            
            // states:
            usesModalCardStates(),
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



export interface ModalCardElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>
    extends
        ModalElementProps<TElement, TCloseType>,
        CardProps<TElement>,
        
        // states:
        TogglerExcitedProps,
        
        // appearances:
        ModalCardVariant
{
}
export function ModalCardElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>(props: ModalCardElementProps<TElement, TCloseType>) {
    // styles:
    const sheet        = useModalCardElementSheet();
    
    
    
    // states:
    const excitedState = useExcitedState(props);
    
    
    
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
        onExcitedChange, // not implemented
        
        
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
    return (
        <Popup<TElement>
            // accessibilities:
            {...{
                active,
                inheritActive,
            }}
            
            
            // appearances:
            nude={true}
            
            
            // classes:
            classes={[
                sheet.main, // inject ModalCardElement class
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
            <Card<TElement>
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
ModalCardElement.prototype = ModalElement.prototype; // mark as ModalElement compatible



export interface ModalCardProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>
    extends
        ModalProps<TElement, TCloseType>,
        ModalCardElementProps<TElement, TCloseType>
{
}
export function ModalCard<TElement extends HTMLElement = HTMLElement, TCloseType = ModalCardCloseType>(props: ModalCardProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useModalCardSheet();
    
    
    
    // variants:
    const modalCardVariant   = useModalCardVariant(props);
    
    
    
    // jsx:
    return (
        <Modal<TElement, TCloseType>
            // other props:
            {...props}
            
            
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
            <ModalCardElement<TElement, TCloseType>
                // other props:
                {...props}
            />
        </Modal>
    );
}
export { ModalCard as default }

export type { OrientationName, OrientationVariant }

export type { ModalStyle, ModalVariant }
