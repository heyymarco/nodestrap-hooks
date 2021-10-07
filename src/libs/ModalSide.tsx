// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
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
}                           from './react-cssfn' // cssfn for react
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
    usesExcitedState,
    useExcitedState,
    TogglerExcitedProps,
}                           from './Basic'
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
    ModalProps,
    Modal,
}                           from './Modal'
import {
    // styles:
    usesActionBarLayout,
    
    
    
    // react components:
    ModalCardCloseType,
    
    ModalCardElementProps,
    ModalCardElement,
}                           from './ModalCard'
import {
    // react components:
    Collapse,
}                           from './Collapse'
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    Card,
}                           from './Card'
import CloseButton          from './CloseButton'



// hooks:

// appearances:

export type ModalSideStyle = 'inlineStart'|'inlineEnd'|'blockStart'|'blockEnd' // might be added more styles in the future
export interface ModalSideVariant {
    modalSideStyle? : ModalSideStyle
}
export const useModalSideVariant = (props: ModalSideVariant) => {
    return {
        class : props.modalSideStyle ? props.modalSideStyle : 'inlineStart',
    };
};



// styles:
export const usesModalSideElementLayout = () => {
    return composition([
        imports([
            // layouts:
            usesModalElementLayout(),
        ]),
        layout({
            // layouts:
            display        : 'flex',
            flexDirection  : 'column',
            justifyContent : 'start',   // if Card is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the Card's header should be visible first
            alignItems     : 'stretch', // stretch Card horizontally
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            boxSizing     : 'border-box', // the final size is including borders & paddings
            inlineSize    : 'auto',       // follows the content's width, but
            maxInlineSize : '100%',       // up to the maximum available parent's width
            blockSize     : 'auto',       // follows the content's height, but
            maxBlockSize  : '100%',       // up to the maximum available parent's height
            overflow      : 'hidden',     // force the Card to scroll, otherwise clipped
            
            
            
            // children:
            ...children('*', composition([ // Card
                layout({
                    // sizes:
                    flex          : [[1, 1, '100%']], // growable, shrinkable, initial from parent's height
                    
                    boxSizing     : 'inherit',
                    inlineSize    : 'inherit',
                    maxInlineSize : 'inherit',
                    blockSize     : 'inherit',
                    maxBlockSize  : 'inherit',
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'card')), // apply general cssProps starting with card***
                }),
            ])),
        }),
    ]);
};
export const usesModalSideElementVariants = () => {
    return composition([
        variants([
            rule('.inlineStart>&', [
                layout({
                    // children:
                    ...children(['&', '*'], composition([ // Card
                        layout({
                            // border radiuses:
                            borderStartStartRadius : 0, // remove border radius on left_top
                            borderEndStartRadius   : 0, // remove border radius on left_bottom
                        }),
                    ])),
                }),
            ]),
            rule('.inlineEnd>&', [
                layout({
                    // children:
                    ...children(['&', '*'], composition([ // Card
                        layout({
                            // border radiuses:
                            borderStartEndRadius : 0, // remove border radius on right_top
                            borderEndEndRadius   : 0, // remove border radius on right_bottom
                        }),
                    ])),
                }),
            ]),
            rule('.blockStart>&', [
                layout({
                    // children:
                    ...children(['&', '*'], composition([ // Card
                        layout({
                            // border radiuses:
                            borderStartStartRadius : 0, // remove border radius on top_left
                            borderStartEndRadius   : 0, // remove border radius on top_right
                        }),
                    ])),
                }),
            ]),
            rule('.blockEnd>&', [
                layout({
                    // children:
                    ...children(['&', '*'], composition([ // Card
                        layout({
                            // border radiuses:
                            borderEndStartRadius : 0, // remove border radius on bottom_left
                            borderEndEndRadius   : 0, // remove border radius on bottom_right
                        }),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesModalSideElementStates = () => {
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
export const usesModalSideElement = () => {
    return composition([
        variants([
            rule('&&', [ // makes `.ModalSideElement` is more specific than `.Collapse`
                imports([
                    // layouts:
                    usesModalSideElementLayout(),
                    
                    // variants:
                    usesModalSideElementVariants(),
                    
                    // states:
                    usesModalSideElementStates(),
                ]),
            ]),
        ]),
    ]);
};

export const useModalSideElementSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModalSideElement(),
        ]),
    ]),
    compositionOf('actionBar', [
        imports([
            usesActionBarLayout(),
        ]),
    ]),
]);



export const usesModalSideLayout = () => {
    return composition([
        imports([
            // layouts:
            usesModalLayout(),
        ]),
        layout({
            // layouts:
            display      : 'grid',    // use a grid for the layout, so we can align the Card both horizontally & vertically
            
            // child default sizes:
         // justifyItems : 'start',   // align left horizontally // already defined in variant `.(inline|block)(Start|End)`
         // alignItems   : 'stretch', // stretch    vertically   // already defined in variant `.(inline|block)(Start|End)`
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesModalSideVariants = () => {
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
            rule('.inlineStart', [
                layout({
                    // layouts:
                    
                    // child default sizes:
                    justifyItems : 'start',   // align left horizontally
                    alignItems   : 'stretch', // stretch    vertically
                }),
            ]),
            rule('.inlineEnd', [
                layout({
                    // layouts:
                    
                    // child default sizes:
                    justifyItems : 'end',     // align left horizontally
                    alignItems   : 'stretch', // stretch    vertically
                }),
            ]),
            rule('.blockStart', [
                layout({
                    // layouts:
                    
                    // child default sizes:
                    justifyItems : 'stretch', // stretch   horizontally
                    alignItems   : 'start',   // align top vertically
                }),
            ]),
            rule('.blockEnd', [
                layout({
                    // layouts:
                    
                    // child default sizes:
                    justifyItems : 'stretch', // stretch   horizontally
                    alignItems   : 'end',     // align top vertically
                }),
            ]),
        ]),
    ]);
};
export const usesModalSideStates = () => {
    return composition([
        imports([
            // states:
            usesModalStates(),
        ]),
    ]);
};
export const usesModalSide = () => {
    return composition([
        imports([
            // layouts:
            usesModalSideLayout(),
            
            // variants:
            usesModalSideVariants(),
            
            // states:
            usesModalSideStates(),
        ]),
    ]);
};

export const useModalSideSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesModalSide(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'mdlsde' });



// react components:

export type ModalSideCloseType = ModalCardCloseType



export interface ModalSideElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>
    extends
        ModalCardElementProps<TElement, TCloseType>,
        
        // states:
        TogglerExcitedProps,
        
        // appearances:
        ModalSideVariant
{
}
export function ModalSideElement<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>(props: ModalSideElementProps<TElement, TCloseType>) {
    // styles:
    const sheet        = useModalSideElementSheet();
    
    
    
    // states:
    const excitedState = useExcitedState(props);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,         // moved to Card
        
        
        // accessibilities:
        active,         // from accessibilities, moved to Collapse
        inheritActive,  // from accessibilities, moved to Collapse
        tabIndex = -1,  // from ModalElement   , moved to Card
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        header,
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
                    // actions:
                    onClick={handleClose}
                />
            </h5>
        );
        
        
        
        // other component:
        return header;
    })();
    
    
    
    // jsx:
    return (
        <Collapse<TElement>
            // accessibilities:
            {...{
                active,
                inheritActive,
            }}
            
            
            // layouts:
            orientation={props.modalSideStyle?.startsWith('block') ? 'block' : 'inline'}
            
            
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
                
                
                
                // forwards:
                props.onAnimationEnd?.(e);
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
            />
        </Collapse>
    );
}
ModalSideElement.prototype = ModalCardElement.prototype; // mark as ModalCardElement compatible



export interface ModalSideProps<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>
    extends
        ModalProps<TElement, TCloseType>,
        ModalSideElementProps<TElement, TCloseType>
{
}
export function ModalSide<TElement extends HTMLElement = HTMLElement, TCloseType = ModalSideCloseType>(props: ModalSideProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useModalSideSheet();
    
    
    
    // variants:
    const modalSideVariant   = useModalSideVariant(props);
    
    
    
    // jsx:
    return (
        <Modal<TElement, TCloseType>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                modalSideVariant.class,
            ]}
        >
            <ModalSideElement<TElement, TCloseType>
                // other props:
                {...props}
            />
        </Modal>
    );
}
export { ModalSide as default }

export type { ModalStyle, ModalVariant }
export type { OrientationName, OrientationVariant }
