// react (builds html using javascript):
import {
    default as React,
    useRef,
    useLayoutEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    composition,
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
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizes,
}                           from './BasicComponent'
import {
    // hooks:
    usesEnableDisable,
    
    isActived,
    isActivating,
    isPassivating,
    isPassived,
    usesActivePassive as indicatorUsesActivePassive,
    useStateActivePassive,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    // general types:
    Instance            as Popper,
    Placement           as PopupPlacement,
    Modifier            as PopupModifier,
    PositioningStrategy as PopupPosition,
    
    
    
    createPopper,
}                           from '@popperjs/core'



// hooks:

// states:

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassive = () => {
    // dependencies:
    const [activePassive, activePassiveRefs, activePassiveDecls, ...restActivePassive] = indicatorUsesActivePassive();
    
    
    
    return [
        () => composition([
            imports([
                activePassive(),
            ]),
            states([
                isActived([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                    }),
                ]),
                isActivating([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                        [activePassiveDecls.animActivePassive]   : cssProps.animActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                        [activePassiveDecls.animActivePassive]   : cssProps.animPassive,
                    }),
                ]),
            ]),
        ]),
        activePassiveRefs,
        activePassiveDecls,
        ...restActivePassive,
    ] as const;
};
//#endregion activePassive



// styles:
export const usesPopupLayout = () => {
    return composition([
        imports([
            // layouts:
            usesIndicatorLayout(),
        ]),
        layout({
            // layouts:
            display: 'block',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesPopupVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // layouts:
            display : 'block',
            
            
            
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const [enableDisable] = usesEnableDisable();
    const [activePassive] = usesActivePassive();
    
    
    
    return composition([
        imports([
            // states:
            enableDisable(),
            activePassive(),
        ]),
        states([
            isPassived([
                layout({
                    // appearances:
                    display: 'none', // hide the popup
                }),
            ]),
        ]),
    ]);
};
export const usesPopup = () => {
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
            
            // variants:
            usesPopupVariants(),
            
            // states:
            usesPopupStates(),
        ]),
    ]);
};

export const usePopupSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesPopup(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesActive    : PropEx.Keyframes = {
        from  : {
            opacity   : 0,
            transform : 'scale(0)',
        },
        '70%' : {
            transform : 'scale(1.1)',
        },
        to    : {
            opacity   : 1,
            transform : 'scale(1)',
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from  : keyframesActive.to,
        '30%' : keyframesActive['70%'],
        to    : keyframesActive.from,
    };
    //#endregion keyframes
    
    
    
    return {
        //#region animations
        filterActive         : 'initial',
        
        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animActive           : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['500ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'pop' });



// react components:

export interface PopupProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>
{
    // popups:
    targetRef?      : React.RefObject<HTMLElement> // getter ref
    popupPlacement? : PopupPlacement
    popupModifiers? : PopupModifier<string, any>[]
    popupPosition?  : PopupPosition
}
export const Popup = <TElement extends HTMLElement = HTMLElement>(props: PopupProps<TElement>) => {
    // styles:
    const sheet = usePopupSheet();
    
    
    
    // states:
    const stateActPass = useStateActivePassive(props);
    const isVisible    = stateActPass.active || (!!stateActPass.class);
    
    
    
    // dom effects:
    const popupRef  = useRef<HTMLDivElement|null>(null);
    const popperRef = useRef<Popper|null>(null);
    useLayoutEffect(() => {
        const target = props.targetRef?.current;
        const popup  = popupRef.current;
        if (!target) return; // target was not specified => nothing to do
        if (!popup)  return; // popup was unloaded       => nothing to do
        
        
        
        popperRef.current = createPopper(target, popup, {
            ...(props.popupPlacement ? { placement : props.popupPlacement } : {}),
            ...(props.popupModifiers ? { modifiers : props.popupModifiers } : {}),
            ...(props.popupPosition  ? { strategy  : props.popupPosition  } : {}),
        });
        
        
        
        // cleanups:
        return () => {
            popperRef.current?.destroy();
            popperRef.current = null;
        };
    }, [props.targetRef, props.popupPlacement, props.popupModifiers, props.popupPosition]);
    
    useLayoutEffect(() => {
        popperRef.current?.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers ?? []),
                
                { name: 'eventListeners', enabled: isVisible },
            ],
        }));
        
        if (isVisible) popperRef.current?.update();
    }, [isVisible]);
    
    
    
    
    // jsx:
    const Popup = (
        <Indicator<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            onAnimationEnd={(e) => {
                // states:
                stateActPass.handleAnimationEnd(e);
                
                
                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
    
    // no `targetRef` specified => no `popper` needed:
    if (!props.targetRef) return Popup;
    
    // wrap with another element, so the `popper` won't modify the `Popup`'s style:
    return (
        <div
            ref={popupRef}
        >
            { Popup }
        </div>
    );
};
export { Popup as default }
