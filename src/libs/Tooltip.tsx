// react (builds html using javascript):
import {
    default as React,
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
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './BasicComponent'
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



// styles:
const arrowWrapperElm = '[data-popper-arrow]';
const arrowElm        = '::before';

export const usesTooltipLayout = () => {
    // dependencies:
    
    // colors:
    const [, backgRefs]  = usesBackg();
    const [, borderRefs] = usesBorder();
    
    
    
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
                            border      : bcssProps.border,
                            borderColor : borderRefs.borderCol,
                            
                            
                            
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
                                        ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'arrow'), tooltipPos)), // apply general cssProps starting with arrow*** and ending with ***${tooltipPos}
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
        // typos:
        whiteSpace           : 'nowrap',
        fontSize             : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeSm           : typos.fontSizeSm,
        fontSizeLg           : typos.fontSizeNm,
        
        
        
        // spacings:
        margin               : '0.6rem',
        
        
        
        // sizes:
        arrowInlineSize      : '0.8rem',
        arrowBlockSize       : '0.8rem',
        arrowClipPath        : 'polygon(100% 0%,100% 100%,0 100%)',
        arrowTransformTop    : [['scaleX(0.7)', 'translateY(-50%)', 'rotate(45deg)' ]],
        arrowTransformRight  : [['scaleY(0.7)', 'translateX(50%)' , 'rotate(135deg)']],
        arrowTransformBottom : [['scaleX(0.7)', 'translateY(50%)' , 'rotate(225deg)']],
        arrowTransformLeft   : [['scaleY(0.7)', 'translateX(-50%)', 'rotate(315deg)']],
    };
}, { prefix: 'ttip' });



// react components:

export interface TooltipProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
}
export const Tooltip = <TElement extends HTMLElement = HTMLElement>(props: TooltipProps<TElement>) => {
    // styles:
    const sheet        = useTooltipSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
    ...restProps}  = props;
    
    
    
    // fn props:
    const activeFn = active ?? !!(props.children ?? false);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            role='tooltip'
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
};
export { Tooltip as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
