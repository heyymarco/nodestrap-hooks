// react:
import {
    default as React,
    useRef,
    useCallback,
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

// others libs:
import {
    // general types:
    Instance            as Popper,
    Placement           as PopupPlacement,
    Modifier            as PopupModifier,
    PositioningStrategy as PopupPosition,
    
    
    
    createPopper,
}                           from '@popperjs/core'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    usesNudeVariant,
    NudeVariant,
    useNudeVariant,
}                           from './Basic'
import {
    // hooks:
    usesEnableDisableState,
    
    isActived,
    isActivating,
    isPassivating,
    isPassived,
    usesActivePassiveState as indicatorUsesActivePassiveState,
    useActivePassiveState,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'



// hooks:

// states:

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassiveState = () => {
    // dependencies:
    const [activePassive, activePassiveRefs, activePassiveDecls, ...restActivePassive] = indicatorUsesActivePassiveState();
    
    
    
    return [
        () => composition([
            imports([
                activePassive(),
            ]),
            states([
                isActived([
                    vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                    }),
                ]),
                isActivating([
                    vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                        [activePassiveDecls.anim  ] : cssProps.animActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                        [activePassiveDecls.anim  ] : cssProps.animPassive,
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
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
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
            usesNudeVariant(),
        ]),
    ]);
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const [enableDisable] = usesEnableDisableState();
    const [activePassive] = usesActivePassiveState();
    
    
    
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
            transform : 'scale(1.02)',
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
        IndicatorProps<TElement>,
        
        // layouts:
        NudeVariant
{
    // popups:
    targetRef?      : React.RefObject<HTMLElement>|HTMLElement|null // getter ref
    popupPlacement? : PopupPlacement
    popupModifiers? : Partial<PopupModifier<string, any>>[]
    popupPosition?  : PopupPosition
}
export function Popup<TElement extends HTMLElement = HTMLElement>(props: PopupProps<TElement>) {
    // styles:
    const sheet              = usePopupSheet();
    
    
    
    // variants:
    const nudeVariant        = useNudeVariant(props);
    
    
    
    // states:
    const activePassiveState = useActivePassiveState(props);
    const isVisible          = activePassiveState.active || (!!activePassiveState.class);
    
    
    
    // dom effects:
    const popupRef  = useRef<HTMLDivElement|null>(null);
    const popperRef = useRef<Popper|null>(null);
    
    const createPopperCb = useCallback(() => {
        if (popperRef.current) return; // popper is already been created => nothing to do
        
        
        
        const target = (props.targetRef instanceof HTMLElement) ? props.targetRef : props.targetRef?.current;
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
    }, [props.targetRef, props.popupPlacement, props.popupModifiers, props.popupPosition]); // (re)create the function on every time the popup's properties changes
    // (re)run the function on every time the function's reference changes:
    useLayoutEffect(createPopperCb, [createPopperCb]); // primary   chance (in case of `targetRef` is not the parent element)
    useEffect(createPopperCb, [createPopperCb]);       // secondary chance (in case of `targetRef` is the parent element)
    
    const visibleRef = useRef({ isVisible, wasVisible: null as (boolean|null) });
    visibleRef.current.isVisible = isVisible;
    const updatePopperOptions = () => {
        if (!popperRef.current) return; // popper was not already created => nothing to do
        
        
        
        const visible = visibleRef.current;
        if (visible.wasVisible === visible.isVisible) return; // `isVisible` was not changed => nothing to do
        visible.wasVisible = visible.isVisible;
        
        
        
        popperRef.current.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers ?? []),
                
                { name: 'eventListeners', enabled: visible.isVisible },
            ],
        }));
        popperRef.current.update();
    };
    // (re)run the function on every time the popup's visible changes:
    useLayoutEffect(updatePopperOptions, [isVisible]); // primary   chance (in case of `targetRef` is not the parent element)
    useEffect(updatePopperOptions, [isVisible]);       // secondary chance (in case of `targetRef` is the parent element)
    
    
    
    
    // jsx:
    // the `Popup` take care of the *popup animation*:
    const Popup = (
        <Indicator<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                nudeVariant.class,
            ]}
            
            
            // events:
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                activePassiveState.handleAnimationEnd(e);
            }}
        />
    );
    
    // no `targetRef` specified => no `popper` needed:
    if (!props.targetRef) return Popup;
    
    // wrap with a `<div>` for positioning, so the `popper` (position engine) won't modify the `Popup`'s css:
    return (
        <div
            ref={popupRef}
            style={{ zIndex: 1080 }}
        >
            { Popup }
        </div>
    );
}
export { Popup as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
