// react:
import {
    default as React,
    useRef,
    useCallback,
    useEffect,
    useState,
}                           from 'react'         // base technology of our nodestrap components

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

// nodestrap utilities:
import {
    useIsomorphicLayoutEffect,
}                           from './hooks'

// others libs:
import type {
    // general types:
    Instance            as Popper,
    Placement           as PopupPlacement,
    Modifier            as PopupModifier,
    PositioningStrategy as PopupPosition,
    
    
    
    // createPopper,
}                           from '@popperjs/core'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
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
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassiveState = () => {
    // dependencies:
    const [activePassive, activePassiveRefs, activePassiveDecls, ...restActivePassive] = indicatorUsesActivePassiveState();
    
    
    
    return [
        () => style({
            ...imports([
                activePassive(),
            ]),
            ...states([
                isActived({
                    ...vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                    }),
                }),
                isActivating({
                    ...vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                        [activePassiveDecls.anim  ] : cssProps.animActive,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                        [activePassiveDecls.anim  ] : cssProps.animPassive,
                    }),
                }),
            ]),
        }),
        activePassiveRefs,
        activePassiveDecls,
        ...restActivePassive,
    ] as const;
};
//#endregion activePassive



// styles:
export const usesPopupLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
        ]),
        ...style({
            // layouts:
            display: 'block',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesPopupVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const [enableDisable] = usesEnableDisableState();
    const [activePassive] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // states:
            enableDisable(),
            activePassive(),
        ]),
        ...states([
            isPassived({
                // appearances:
                display: 'none', // hide the popup
            }),
        ]),
    });
};

export const usePopupSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesPopupLayout(),
            
            // variants:
            usesPopupVariants(),
            
            // states:
            usesPopupStates(),
        ]),
    ),
], /*sheetId :*/'usjjnl1scl'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
        IndicatorProps<TElement>
{
    // popups:
    targetRef?      : React.RefObject<HTMLElement>|HTMLElement|null // getter ref
    popupPlacement? : PopupPlacement
    popupModifiers? : Partial<PopupModifier<string, any>>[]
    popupPosition?  : PopupPosition
    
    popupAutoFlip?  : boolean
    popupAutoSlide? : boolean
    popupMargin?    : number
    popupSlide?     : number
    
    
    // performances:
    lazy?           : boolean
}
export function Popup<TElement extends HTMLElement = HTMLElement>(props: PopupProps<TElement>) {
    // styles:
    const sheet              = usePopupSheet();
    
    
    
    // states:
    const activePassiveState = useActivePassiveState(props);
    const isVisible          = activePassiveState.active || (!!activePassiveState.class);
    
    
    
    // rest props:
    const {
        // popups:
        targetRef,
        popupPlacement,
        popupModifiers,
        popupPosition,
        
        popupAutoFlip,
        popupAutoSlide,
        popupMargin,
        popupSlide,
        
        
        // performances:
        lazy = false,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // dom effects:
    const popupRef                      = useRef<HTMLDivElement|null>(null);
    const [popperRef  , setPopperRef  ] = useState<Popper|null>(null); // useState() instead of useRef(), so it triggers re-render after popper is loaded
    const popperLoad                    = useRef<boolean>(false);
    
    const [everVisible, setEverVisible] = useState<boolean>(isVisible); // at the first time visible, re-render (re-create) createPopperCb
    if (isVisible && !everVisible) setEverVisible(true);
    
    const createPopperCb = useCallback(() => {
        // create a new popper if the popper was not already created & Popup is ever visible
        if (!popperRef && everVisible) {
            if (popperLoad.current) return; // prevents race condition of useIsomorphicLayoutEffect() & useEffect()
            popperLoad.current = true;
            
            
            
            const target = (targetRef instanceof HTMLElement) ? targetRef : targetRef?.current;
            const popup  = popupRef.current;
            if (!target) return; // target was not specified => nothing to do
            if (!popup)  return; // popup was unloaded       => nothing to do
            
            
            
            // loading popper-lite:
            (async () => {
                const { createPopper } = await import(/* webpackChunkName: 'popper-lite' */'@popperjs/core/lib/popper-lite.js');
                
                // now popper is loaded then trigger re-render:
                setPopperRef(createPopper(target, popup, {
                    ...(popupPlacement ? { placement : popupPlacement } : {}),
                    ...(popupModifiers ? { modifiers : popupModifiers } : {}),
                    ...(popupPosition  ? { strategy  : popupPosition  } : {}),
                }));
            })();
        } // if
        
        
        
        // cleanups:
        return () => {
            popperRef?.destroy(); // it's okay having race condition of useIsomorphicLayoutEffect() & useEffect()
        };
    }, [targetRef, popupPlacement, popupModifiers, popupPosition, everVisible]); // (re)create the function on every time the popup's properties changes
    // (re)run the function on every time the function's reference changes:
    useIsomorphicLayoutEffect(createPopperCb, [createPopperCb]); // primary   chance (in case of `targetRef` is not the parent element)
    useEffect(                createPopperCb, [createPopperCb]); // secondary chance (in case of `targetRef` is the parent element)
    
    const visibleRef = useRef({ isVisible, wasVisible: null as (boolean|null) });
    visibleRef.current.isVisible = isVisible;
    const updatePopperOptions = () => {
        if (!popperRef) return; // popper was not already created => nothing to do
        
        
        
        const visible = visibleRef.current;
        if (visible.wasVisible === visible.isVisible) return; // `isVisible` was not changed => nothing to do
        visible.wasVisible = visible.isVisible;
        
        
        
        popperRef.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers ?? []),
                
                { name: 'eventListeners', enabled: visible.isVisible },
            ],
        }));
        popperRef.update();
    };
    // (re)run the function on every time the popup's visible changes:
    useIsomorphicLayoutEffect(updatePopperOptions, [isVisible]); // primary   chance (in case of `targetRef` is not the parent element)
    useEffect(updatePopperOptions, [isVisible]);       // secondary chance (in case of `targetRef` is the parent element)
    
    
    
    
    // jsx:
    // the `Popup` take care of the *popup animation*:
    const Popup = (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            active={
                props.active
                &&
                (
                    !targetRef // no `targetRef` specified => no `popper` needed
                    ||
                    !!popperRef      // wait until popper ready
                )
            }
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // events:
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                activePassiveState.handleAnimationEnd(e);
            }}
        >
            { (!lazy || isVisible) && children }
        </Indicator>
    );
    
    // no `targetRef` specified => no `popper` needed:
    if (!targetRef) return Popup;
    
    // wrap with a `<div>` for positioning, so the `popper` (position engine) won't modify the `Popup`'s css:
    return (
        <div
            ref={popupRef}
            style={{ zIndex: 1080 }}
            className='overlay'
        >
            { Popup }
        </div>
    );
}
export { Popup as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
