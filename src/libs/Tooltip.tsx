// react:
import {
    default as React,
    useState,
    useEffect,
    useCallback,
    useRef,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
    rules,
    
    
    
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
import typos                from './typos/index' // configurable typography (texting) defs

// others libs:
import type {
    ComputePositionReturn,
    Side as PopupSide,
}                           from '@floating-ui/dom'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // general types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'



// styles:
const arrowElm = '.arrow';

export const usesTooltipLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // children:
            ...children(arrowElm, {
                // layouts:
                content     : '""',
                display     : 'block',
                ...rule([':not(.overlay)&', '.nude&'], {
                    display : 'none',
                }),
                
                
                
                // positions:
                position    : 'absolute',
                
                
                
                // backgrounds:
                backg       : 'inherit',
                
                
                
                // borders:
                border      : 'inherit',
                boxShadow   : 'inherit',
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'arrow')), // apply general cssProps starting with arrow***
                ...rules([
                    ...['top', 'bottom', 'left', 'right'].map((tooltipPos) =>
                        rule([
                            `.${tooltipPos}&`,
                            `.${tooltipPos}-start&`,
                            `.${tooltipPos}-end&`,
                        ], {
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(usesPrefixedProps(cssProps, 'arrow'), tooltipPos)), // apply general cssProps starting with arrow*** and then starting with ***${tooltipPos}
                        }),
                    ),
                ]),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesTooltipVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesTooltipStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useTooltipSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesTooltipLayout(),
            
            // variants:
            usesTooltipVariants(),
            
            // states:
            usesTooltipStates(),
        ]),
    ),
], /*sheetId :*/'3h41koviqh'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        // backgrounds:
        boxShadow            : [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        
        
        
        // typos:
        whiteSpace           : 'nowrap',
        fontSize             : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeSm           : typos.fontSizeSm,
        fontSizeLg           : typos.fontSizeNm,
        
        
        
        // sizes:
        arrowInlineSize      : '0.8rem',
        arrowBlockSize       : '0.8rem',
     // arrowClipPath        : 'polygon(100% 0, 100% 100%, 0 100%)',
        arrowClipPath        : 'polygon(200% -100%, 200% 200%, -100% 200%)', // compensates for boxShadow
        arrowTopTransform    : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) *  1))', 'rotate(45deg)' ]],
        arrowRightTransform  : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) * -1))', 'rotate(135deg)']],
        arrowBottomTransform : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) * -1))', 'rotate(225deg)']],
        arrowLeftTransform   : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) *  1))', 'rotate(315deg)']],
    };
    
    return {
        ...basics,
        
        
        
        // sizes:
        arrowInlineSizeSm    : [['calc((', basics.arrowInlineSize, ')*0.75)']],
        arrowBlockSizeSm     : [['calc((', basics.arrowBlockSize , ')*0.75)']],
        arrowInlineSizeLg    : [['calc((', basics.arrowInlineSize, ')*1.50)']],
        arrowBlockSizeLg     : [['calc((', basics.arrowBlockSize , ')*1.50)']],
    }
}, { prefix: 'ttip' });



// setup css variables:
cssProps.arrowInlineSizeSm    = [['calc((', cssProps.arrowInlineSize, ')*0.75)']] as any;
cssProps.arrowBlockSizeSm     = [['calc((', cssProps.arrowBlockSize , ')*0.75)']] as any;
cssProps.arrowInlineSizeLg    = [['calc((', cssProps.arrowInlineSize, ')*1.50)']] as any;
cssProps.arrowBlockSizeLg     = [['calc((', cssProps.arrowBlockSize , ')*1.50)']] as any;



// utilities:
const isEnabled = (target: HTMLElement|null|undefined) => {
    if (!target) return false; // if no target => assumes target as disabled
    
    return !target.matches(':disabled, .disable, .disabled')
};


export interface CalculateArrowSizeProps {
    arrow     : HTMLElement
    placement : PopupPlacement
}
export type CalculateArrowSize = (props: CalculateArrowSizeProps) => Promise<readonly [number, number]>
const defaultCalculateArrowSize : CalculateArrowSize = async ({ arrow, placement }) => {
    const { width, height, }   = arrow.getBoundingClientRect();
    return [
        (width  / 2) - 1,
        (height / 2) - 1,
    ];
};



// react components:

export interface TooltipProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
    // popups:
    unsafe_calculateArrowSize? : CalculateArrowSize
    
    
    // debounces:
    activeDelay?  : number
    passiveDelay? : number
}
export function Tooltip<TElement extends HTMLElement = HTMLElement>(props: TooltipProps<TElement>) {
    // styles:
    const sheet        = useTooltipSheet();
    
    
    
    // states:
    const [isHover , setIsHover ] = useState<boolean>(false);
    const [isFocus , setIsFocus ] = useState<boolean>(false);
    const [activeDn, setActiveDn] = useState<boolean>(false); // instant  active
    const [activeDb, setActiveDb] = useState<boolean>(false); // debounce active
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        
        
        
        // popups:
        unsafe_calculateArrowSize : calculateArrowSize = defaultCalculateArrowSize,
        
        
        
        // debounces:
        activeDelay  = 300,
        passiveDelay = 500,
        
        
        
        // popups:
        onPopupUpdate,
    ...restProps}  = props;
    
    
    
    // fn props:
    const newActiveDn = (isHover || isFocus) && isEnabled((props.targetRef instanceof HTMLElement) ? props.targetRef : props.targetRef?.current);
    if (activeDn !== newActiveDn) { // change detected => apply the change
        setActiveDn(newActiveDn); // remember the last change
    }
    
    const activeFn = (
        active // controllable active
        ??
        (
            !!(props.children ?? false) // tootlip has a content
            &&
            activeDn // uncontrollable active
        )
    );
    
    const enableDebounce = (activeDelay > 0) || (passiveDelay > 0);
    useEffect(() => {
        if (!enableDebounce) return;
        
        
        
        // setups:
        const delay = (activeFn ? activeDelay : passiveDelay);
        const timeoutHandler = (
            (delay > 0)
            ?
            // asynchronous:
            setTimeout(() => {
                setActiveDb(activeFn);
            }, delay)
            :
            // synchronous:
            (() => {
                setActiveDb(activeFn);
                return null;
            })()
        );
        
        
        
        // cleanups:
        return () => {
            if (timeoutHandler) clearTimeout(timeoutHandler); // cancel the `setTimeout` (if not too late)
        };
    }, [activeFn, enableDebounce, activeDelay, passiveDelay]); // (re)run the setups & cleanups on every time the `activeFn` changes
    
    const activeDbFn = enableDebounce ? activeDb : activeFn;
    
    
    
    // dom effects:
    useEffect(() => {
        if (active !== undefined) return; // controllable [active] was set => no uncontrollable manipulation required
        
        const target = (props.targetRef instanceof HTMLElement) ? props.targetRef : props.targetRef?.current;
        if (!target) return; // target was not set => nothing to do
        
        
        
        // handlers:
        const handleHover = () => {
            if (!isEnabled(target)) return; // control is disabled => no response required
            
            
            
            setIsHover(true);
        }
        const handleLeave  = () => {
            if (!isEnabled(target)) return; // control is disabled => no response required
            
            
            
            setIsHover(false);
        }
        const handleFocus = () => {
            if (!isEnabled(target)) return; // control is disabled => no response required
            
            
            
            setIsFocus(true);
        }
        const handleBlur  = () => {
            if (!isEnabled(target)) return; // control is disabled => no response required
            
            
            
            setIsFocus(false);
        }
        
        
        
        // setups:
        target.addEventListener('mouseenter', handleHover);
        target.addEventListener('mouseleave', handleLeave);
        target.addEventListener('focus', handleFocus, { capture: true }); // force `focus` as bubbling
        target.addEventListener('blur', handleBlur, { capture: true }); // force `blur` as bubbling
        
        
        
        // cleanups:
        return () => {
            target.removeEventListener('mouseenter', handleHover);
            target.removeEventListener('mouseleave', handleLeave);
            target.removeEventListener('focus', handleFocus, { capture: true });
            target.removeEventListener('blur', handleBlur, { capture: true });
        };
    }, [active, props.targetRef]); // (re)run the setups & cleanups on every time the `active` & tooltip's target changes
    
    
    
    // callbacks:
    const arrowOffsetMiddleware = useCallback((arrow: HTMLElement): PopupMiddleware => {
        return {
            name: 'arrowOffset',
            async fn({ placement, x, y }) {
                const parentStyle = arrow.parentElement?.style;
                const { display, visibility, transition, animation } = parentStyle ?? {}
                if (parentStyle) {
                    parentStyle.display    = 'block';
                    parentStyle.visibility = 'hidden';
                    parentStyle.transition = 'none';
                    parentStyle.animation  = 'none';
                } // if
                
                const [width, height] = await calculateArrowSize({ arrow, placement });
                
                if (parentStyle) {
                    parentStyle.display    = display    ?? '';
                    parentStyle.visibility = visibility ?? '';
                    parentStyle.transition = transition ?? '';
                    parentStyle.animation  = animation  ?? '';
                } // if
                
                
                
                const basePlacement = placement.split('-')[0];
                const isTop    = (basePlacement === 'top'   );
                const isBottom = (basePlacement === 'bottom');
                const isLeft   = (basePlacement === 'left'  );
                const isRight  = (basePlacement === 'right' );
                return {
                    x: x - (isLeft ? width  : 0) + (isRight  ? width  : 0),
                    y: y - (isTop  ? height : 0) + (isBottom ? height : 0),
                };
            }
        };
    }, [calculateArrowSize]);
    
    const arrowRef = useRef<HTMLDivElement>(null);
    const middlewareWithArrow   = useCallback(async (defaultMiddleware: PopupMiddleware[]) => {
        const arrow = arrowRef.current;
        if (!arrow) return defaultMiddleware;
        
        
        
        const popupRef = arrow.parentElement;
        const style = popupRef ? getComputedStyle(popupRef) : null;
        const maxBorderRadius : number|null = !style ? null : Math.max(...[
            style.borderStartStartRadius,
            style.borderStartEndRadius,
            style.borderEndStartRadius,
            style.borderEndEndRadius,
        ].map((str) => Math.round(Number.parseFloat(str))));
        
        
        
        const { arrow: arrowMiddleware } = await import(/* webpackChunkName: 'floating-ui' */ '@floating-ui/dom');
        
        
        
        const offsetMiddlewareIndex      = defaultMiddleware.findIndex((middleware) => (middleware.name === 'offset'));
        const arrowOffsetMiddlewareIndex = offsetMiddlewareIndex + 1;
        return [
            ...defaultMiddleware.slice(0, arrowOffsetMiddlewareIndex),
            arrowOffsetMiddleware(arrow),
            ...defaultMiddleware.slice(arrowOffsetMiddlewareIndex),
            
            arrowMiddleware({
                element : arrow,
                padding : maxBorderRadius ?? 0,
            }),
        ];
    }, [arrowOffsetMiddleware]);
    
    const handlePopupUpdate     = useCallback(async (computedPosition: ComputePositionReturn) => {
        onPopupUpdate?.(computedPosition);
        
        
        
        const arrow = arrowRef.current;
        if (!arrow) return;
        const { middlewareData, placement } = computedPosition;
        const { x, y } = middlewareData.arrow ?? {};
        const basePlacement : PopupSide = placement.split('-')[0] as PopupSide;
        const invertBasePlacement : PopupSide = {
            top    : 'bottom',
            right  : 'left',
            bottom : 'top',
            left   : 'right',
        }[basePlacement] as PopupSide;
        
        Object.assign(arrow.style, {
            left                  : ((x ?? false) !== false) ? `${x}px` : '',
            top                   : ((y ?? false) !== false) ? `${y}px` : '',
            right                 : '',
            bottom                : '',
            [invertBasePlacement] : '0',
        });
    }, [onPopupUpdate]);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]   }
            semanticRole={props.semanticRole ?? 'tooltip'}
            
            
            
            // accessibilities:
            {...{
                active        : activeDbFn,
                inheritActive : false,
            }}
            
            
            
            // popups:
            popupPlacement={props.popupPlacement ?? 'top'}
            popupMiddleware={middlewareWithArrow}
            
            popupAutoFlip={props.popupAutoFlip ?? true}
            popupAutoShift={props.popupAutoShift ?? true}
            
            onPopupUpdate={handlePopupUpdate}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { props.children }
            <div
                // essentials:
                ref={arrowRef}
                
                
                
                // semantics:
                aria-hidden={true} // the arrow is just for decoration purpose, no meaningful content here
                
                
                
                // classes:
                className='arrow'
            ></div>
        </Popup>
    );
}
export { Tooltip as default }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }
