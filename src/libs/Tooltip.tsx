// react (builds html using javascript):
import {
    default as React,
    useState,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    composition,
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
    usesBackg,
    usesBorder,
    usesBorderStroke,
}                           from './Basic'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'
import typos                from './typos/index' // configurable typography (texting) defs



// utilities:
const isEnabled = (target: HTMLElement|null|undefined) => {
    if (!target) return false; // if no target => assumes target as disabled
    
    return !target.matches(':disabled, .disable, .disabled')
};



// styles:
const arrowWrapperElm = '[data-popper-arrow]';
const arrowElm        = '::before';

export const usesTooltipLayout = () => {
    // dependencies:
    
    // colors:
    const [, backgRefs       ] = usesBackg();
    const [, borderRefs      ] = usesBorder();
    
    // layouts:
    const [, borderStrokeRefs] = usesBorderStroke();
    
    
    
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
        ]),
        layout({
            // children:
            ...children(arrowWrapperElm, composition([
                layout({
                    // children:
                    ...children(arrowElm, composition([
                        layout({
                            // layouts:
                            display     : 'block',
                            content     : '""',
                            
                            
                            
                            // backgrounds:
                            backg       : backgRefs.backg,
                            
                            
                            
                            // borders:
                            border      : borderStrokeRefs.border,      // all border properties
                            
                            borderColor : borderRefs.borderCol,         // overwrite color prop
                            
                            borderWidth : borderStrokeRefs.borderWidth, // overwrite width prop
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'arrow')), // apply general cssProps starting with arrow***
                        }),
                    ])),
                }),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            ...['top', 'bottom', 'left', 'right'].map((tooltipPos) =>
                rule(`[data-popper-placement^="${tooltipPos}"]>&`, [
                    layout({
                        // children:
                        ...children(arrowWrapperElm, composition([
                            layout({
                                [tooltipPos] : 'calc(100% - 1px)',
                                
                                
                                
                                // children:
                                ...children(arrowElm, composition([
                                    layout({
                                        // customize:
                                        ...usesGeneralProps(usesPrefixedProps(usesPrefixedProps(cssProps, 'arrow'), tooltipPos)), // apply general cssProps starting with arrow*** and then starting with ***${tooltipPos}
                                    }),
                                ])),
                            }),
                        ])),
                    }),
                ]),
            ),
        ]),
    ]);
};
export const usesTooltipVariants = () => {
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
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesTooltipStates = () => {
    return composition([
        imports([
            // states:
            usesPopupStates(),
        ]),
    ]);
};
export const usesTooltip = () => {
    return composition([
        imports([
            // layouts:
            usesTooltipLayout(),
            
            // variants:
            usesTooltipVariants(),
            
            // states:
            usesTooltipStates(),
        ]),
    ]);
};

export const useTooltipSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesTooltip(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        boxShadow            : [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
        
        
        
        // spacings:
        margin               : '0.6rem',
        
        
        
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



// react components:

export interface TooltipProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
}
export function Tooltip<TElement extends HTMLElement = HTMLElement>(props: TooltipProps<TElement>) {
    // styles:
    const sheet        = useTooltipSheet();
    
    
    
    // states:
    const [isHover , setIsHover ] = useState<boolean>(false);
    const [isFocus , setIsFocus ] = useState<boolean>(false);
    const [activeDn, setActiveDn] = useState<boolean>(false);
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
    ...restProps}  = props;
    
    
    
    // fn props:
    const newActiveDn = isEnabled(props.targetRef?.current) && (isHover || isFocus);
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
    
    
    
    // dom effects:
    useEffect(() => {
        const target = props.targetRef?.current;
        if (!target) return; // target was not specified => nothing to do
        if (active !== undefined) return; // controllable [active] is set => no set uncontrollable required
        
        
        
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
            target.removeEventListener('focus', handleFocus);
            target.removeEventListener('blur', handleBlur);
        };
    }, [props.targetRef, active]);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            role={props.role ?? 'tooltip'}
            {...{
                active        : activeFn,
                inheritActive : false,
            }}
            
            
            // popups:
            popupPlacement={props.popupPlacement ?? 'top'}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { props.children }
            <div data-popper-arrow></div>
        </Popup>
    );
}
export { Tooltip as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
