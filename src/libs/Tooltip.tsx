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
    usesBackg,
    usesBorder,
    usesBorderStroke,
    expandBorderStroke,
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
    // dependencies:
    
    // colors:
    const [, backgRefs ] = usesBackg();
    const [border      ] = usesBorder();
    
    // borders:
    const [borderStroke] = usesBorderStroke();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // children:
            ...children(arrowElm, {
                // children:
                ...imports([
                    // colors:
                    border(),
                    
                    // borders:
                    borderStroke(),
                ]),
                ...style({
                    // layouts:
                    display  : 'block',
                    content  : '""',
                    
                    
                    
                    // positions:
                    position : 'absolute',
                    
                    
                    
                    // backgrounds:
                    backg    : backgRefs.backg,
                    
                    
                    
                    // borders:
                    ...expandBorderStroke(), // expand borderStroke css vars
                    borderInlineStartColor : 'transparent',
                    borderBlockStartColor  : 'transparent',
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'arrow')), // apply general cssProps starting with arrow***
                }),
            }),
            ...rules([
                ...['top', 'bottom', 'left', 'right'].map((tooltipPos) =>
                    rule(`.${tooltipPos}`, {
                        // // children:
                        // ...children(arrowWrapperElm, {
                        //     [tooltipPos] : 'calc(100% - 0.7px)',
                        // }),
                        
                        // children:
                        ...children(arrowElm, {
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(usesPrefixedProps(cssProps, 'arrow'), tooltipPos)), // apply general cssProps starting with arrow*** and then starting with ***${tooltipPos}
                        }),
                    }),
                ),
            ]),
            
            
            
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
    return {
        // backgrounds:
        boxShadow            : [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        
        
        
        // spacings:
        // margin               : '0.6rem',
        
        
        
        // typos:
        whiteSpace           : 'nowrap',
        fontSize             : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeSm           : typos.fontSizeSm,
        fontSizeLg           : typos.fontSizeNm,
        
        
        
        // sizes:
        arrowInlineSize      : '0.8rem',
        arrowBlockSize       : '0.8rem',
        arrowClipPath        : 'polygon(100% 0%,100% 100%,0 100%)',
        arrowTopTransform    : [['scaleX(0.7)', 'translateY(-50%)', 'rotate(45deg)' ]],
        arrowRightTransform  : [['scaleY(0.7)', 'translateX(50%)' , 'rotate(135deg)']],
        arrowBottomTransform : [['scaleX(0.7)', 'translateY(50%)' , 'rotate(225deg)']],
        arrowLeftTransform   : [['scaleY(0.7)', 'translateX(-50%)', 'rotate(315deg)']],
    };
}, { prefix: 'ttip' });



// utilities:
const isEnabled = (target: HTMLElement|null|undefined) => {
    if (!target) return false; // if no target => assumes target as disabled
    
    return !target.matches(':disabled, .disable, .disabled')
};



// react components:

export interface TooltipProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
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
    const arrowRef = useRef<HTMLDivElement>(null);
    const middlewareWithArrow = useCallback(async (defaultMiddleware: PopupMiddleware[]) => {
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
        
        
        
        return [
            ...defaultMiddleware,
            arrowMiddleware({
                element : arrow,
                padding : maxBorderRadius ?? 0,
            })
        ];
    }, []);
    
    const handlePopupUpdate   = useCallback(async (computedPosition: ComputePositionReturn) => {
        await onPopupUpdate?.(computedPosition);
        
        
        
        const arrow = arrowRef.current;
        if (!arrow) return;
        const { middlewareData, placement } = computedPosition;
        const { x, y } = middlewareData.arrow ?? {};
        const basePlacement : PopupSide = placement.split('-')[0] as PopupSide;
        const blockPlacement  = ['top' , 'bottom'].includes(basePlacement);
        const inlinePlacement = ['left', 'right' ].includes(basePlacement);
        const invertBasePlacement : PopupSide = {
            top    : 'bottom',
            right  : 'left',
            bottom : 'top',
            left   : 'right',
        }[basePlacement] as PopupSide;
        
        
        console.log('x, y = ', x, y);
        Object.assign(arrow.style, {
            left                  : ((x ?? false) !== false) ? `${x}px` : '',
            top                   : ((y ?? false) !== false) ? `${y}px` : '',
            right                 : '',
            bottom                : '',
            [invertBasePlacement] : '-15px',
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
