// react (builds html using javascript):
import {
    default as React,
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
    children,
    
    
    
    // rules:
    variants,
    states,
    isNthChild,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from './css-var'     // Declares & retrieves *css variables* (css custom properties).
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
    ThemeName,
    mildOf,
    usesAnim,
    
    
    
    // configs:
    cssDecls as bcssDecls,
}                           from './BasicComponent'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
    isPassived,
    isActive,
}                           from './Indicator'
import {
    // hooks:
    markActive       as controlMarkActive,
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    isFocus,
    isArrive,
}                           from './Control'
import {
    // hooks:
    isPress,
}                           from './ActionControl'
import {
    // hooks:
    usePropActive,
}                           from './accessibilities'
import typos                from './typos/index' // configurable typography (texting) defs
import {
    // styles:
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from './Check'



// hooks:

//#region activePassive
export const markActive = () => composition([
    imports([
        controlMarkActive(),
        
        mildOf(null), // keeps mild variant
        
        usesThemeActive(), // switch to active theme
    ]),
]);

// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null) => controlUsesThemeDefault(themeName);

// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName = 'secondary') => controlUsesThemeActive(themeName);
//#endregion activePassive


// animations:

//#region svg animations
interface SvgAnimVars {
    svgTopTransfIn   : any
    svgMidTransfIn   : any
    svgBtmTransfIn   : any
    
    svgTopTransfOut  : any
    svgMidTransfOut  : any
    svgBtmTransfOut  : any
    
    
    
    /**
     * none transform.
     */
    transfNone       : any
    /**
     * final transform for the svg top.
     */
    svgTopTransf     : any
    /**
     * final transform for the svg middle.
     */
    svgMidTransf     : any
    /**
     * final transform for the svg bottom.
     */
    svgBtmTransf     : any
    
    /**
     * none animation.
     */
    animNone         : any
    /**
     * final animation for the svg top.
     */
    svgTopAnim       : any
    /**
     * final animation for the svg middle.
     */
    svgMidAnim       : any
    /**
     * final animation for the svg bottom.
     */
    svgBtmAnim       : any
}
const [svgAnimRefs, svgAnimDecls] = createCssVar<SvgAnimVars>();

export const usesSvgAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs, ] = usesAnim();
    
    const transfNoneVars = () => vars({
        [svgAnimDecls.svgTopTransfIn]  : animRefs.transfNone,
        [svgAnimDecls.svgMidTransfIn]  : animRefs.transfNone,
        [svgAnimDecls.svgBtmTransfIn]  : animRefs.transfNone,
        
        [svgAnimDecls.svgTopTransfOut] : animRefs.transfNone,
        [svgAnimDecls.svgMidTransfOut] : animRefs.transfNone,
        [svgAnimDecls.svgBtmTransfOut] : animRefs.transfNone,
    });
    const transfInVars = () => vars({
        [svgAnimDecls.svgTopTransfIn]  : cssProps.svgTopTransfOn,
        [svgAnimDecls.svgMidTransfIn]  : cssProps.svgMidTransfOn,
        [svgAnimDecls.svgBtmTransfIn]  : cssProps.svgBtmTransfOn,
    });
    const transfOutVars = () => vars({
        [svgAnimDecls.svgTopTransfOut] : cssProps.svgTopTransfOff,
        [svgAnimDecls.svgMidTransfOut] : cssProps.svgMidTransfOff,
        [svgAnimDecls.svgBtmTransfOut] : cssProps.svgBtmTransfOff,
    });
    
    const animNoneVars = () => vars({
        [svgAnimDecls.svgTopAnim]   : animRefs.animNone,
        [svgAnimDecls.svgMidAnim]   : animRefs.animNone,
        [svgAnimDecls.svgBtmAnim]   : animRefs.animNone,
    });
    const animInVars = () => vars({
        [svgAnimDecls.svgTopAnim]   : cssProps.svgTopAnimOn,
        [svgAnimDecls.svgMidAnim]   : cssProps.svgMidAnimOn,
        [svgAnimDecls.svgBtmAnim]   : cssProps.svgBtmAnimOn,
    });
    const animOutVars = () => vars({
        [svgAnimDecls.svgTopAnim]   : cssProps.svgTopAnimOff,
        [svgAnimDecls.svgMidAnim]   : cssProps.svgMidAnimOff,
        [svgAnimDecls.svgBtmAnim]   : cssProps.svgBtmAnimOff,
    });
    
    
    
    return [
        () => composition([
            imports([
                // animations:
                anim(),

                transfNoneVars(),
                animNoneVars(),
            ]),
            states([
                isActived([
                    imports([
                        transfInVars(),
                    ]),
                ]),
                isActivating([
                    imports([
                        transfInVars(),
                        transfOutVars(),
                        
                        animInVars(),
                    ]),
                ]),
                isPassivating([
                    imports([
                        transfInVars(),
                        transfOutVars(),
                        
                        animOutVars(),
                    ]),
                ]),
                isPassived([
                    imports([
                        transfOutVars(),
                    ]),
                ]),
            ]),
            vars({
                [svgAnimDecls.svgTopTransf] : [[ // double array => makes the JSS treat as space separated values
                    svgAnimRefs.svgTopTransfIn,
                    svgAnimRefs.svgTopTransfOut,
                ]],
                [svgAnimDecls.svgMidTransf] : [[ // double array => makes the JSS treat as space separated values
                    svgAnimRefs.svgMidTransfIn,
                    svgAnimRefs.svgMidTransfOut,
                ]],
                [svgAnimDecls.svgBtmTransf] : [[ // double array => makes the JSS treat as space separated values
                    svgAnimRefs.svgBtmTransfIn,
                    svgAnimRefs.svgBtmTransfOut,
                ]],
            }),
        ]),
        svgAnimRefs,
        svgAnimDecls,
    ] as const;
};
//#endregion svg animations



// styles:
const labelElm = ':nth-child(1n+2)';
const svgElm   = 'svg';
export const usesSvgLayout = () => {
    // dependencies:
    
    // animations:
    const [, svgAnimRefs] = usesSvgAnim();
    
    
    
    return composition([
        layout({
            // sizes:
            // fills the entire parent text's height:
            blockSize  : [['calc(1em *',
                `var(${bcssDecls.lineHeight},${typos.lineHeight})`,
            ')']],
            inlineSize : 'auto', // calculates the width by [height * aspect-ratio]
            
            
            
            // children:
            overflow: 'visible', // allows graphics to overflow the canvas
            ...children('*', composition([
                layout({
                    // appearances:
                    stroke        : 'currentColor', // set menu color as parent's font color
                    strokeWidth   : 4,              // set menu thickness, 4 of 24 might enough
                    strokeLinecap : 'square',       // set menu edges square
                    
                    
                    
                    // animations:
                    transformOrigin : '50% 50%',
                }),
                variants([
                    isNthChild(0, 1, composition([
                        layout({
                            // animations:
                            transf : svgAnimRefs.svgTopTransf,
                            anim   : svgAnimRefs.svgTopAnim,
                        }),
                    ])),
                    isNthChild(0, 2, composition([
                        layout({
                            // animations:
                            transf : svgAnimRefs.svgMidTransf,
                            anim   : svgAnimRefs.svgMidAnim,
                        }),
                    ])),
                    isNthChild(0, 3, composition([
                        layout({
                            // animations:
                            transf : svgAnimRefs.svgBtmTransf,
                            anim   : svgAnimRefs.svgBtmAnim,
                        }),
                    ])),
                ]),
            ])),
        }),
    ]);
};
export const usesTogglerMenuButtonLayout = () => {
    return composition([
        imports([
            // layouts:
            usesCheckLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        layout({
            // children:
            ...children(labelElm, composition([
                layout({
                    // children:
                    ...children(svgElm, composition([
                        imports([
                            usesSvgLayout(),
                        ]),
                    ])),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
            ])),
        }),
    ]);
};
export const usesTogglerMenuButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesCheckVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesTogglerMenuButtonStates = () => {
    // dependencies:
    
    // animations:
    const [svgAnim] = usesSvgAnim();
    
    
    
    return composition([
        imports([
            // states:
            usesCheckStates(),
            
            // animations:
            svgAnim(),
        ]),
        states([
            isActive([
                imports([
                    markActive(),
                ]),
            ]),
            isFocus([
                imports([
                    markActive(),
                ]),
            ]),
            isArrive([
                imports([
                    markActive(),
                ]),
            ]),
            isPress([
                imports([
                    markActive(),
                ]),
            ]),
        ]),
    ]);
};
export const usesTogglerMenuButton = () => {
    return composition([
        imports([
            // layouts:
            usesTogglerMenuButtonLayout(),
            
            // variants:
            usesTogglerMenuButtonVariants(),
            
            // states:
            usesTogglerMenuButtonStates(),
        ]),
    ]);
};

export const useTogglerMenuButtonSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesTogglerMenuButton(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, svgAnimRefs] = usesSvgAnim();
    
    
    
    // transforms hamburger menu to cross menu
    const keyframesSvgTopOn  : PropEx.Keyframes = {
        from : {
            transform : svgAnimRefs.svgTopTransfOut,
        },
        '43%': {
            transform : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
        '71%': {
            transform : [['rotate(-60deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
        to   : {
            transform : svgAnimRefs.svgTopTransfIn,
        },
    };
    const keyframesSvgMidOn  : PropEx.Keyframes = {
        from : {
            transform : svgAnimRefs.svgMidTransfOut,
        },
        '19%': {
            transform : [['scaleX(1.35)',]],
        },
        to   : {
            transform : svgAnimRefs.svgMidTransfIn,
        },
    };
    const keyframesSvgBtmOn  : PropEx.Keyframes = {
        from : {
            transform : svgAnimRefs.svgBtmTransfOut,
        },
        '43%': {
            transform : [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        '71%': {
            transform : [['rotate(60deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        to   : {
            transform : svgAnimRefs.svgBtmTransfIn,
        },
    };
    
    
    
    const keyframesSvgTopOff : PropEx.Keyframes = {
        from : keyframesSvgTopOn.to,
        '43%': keyframesSvgTopOn.from,
        '71%': {
            transformOrigin : '91.7% 12.5%',
            transform       : [['rotate(15deg)',  'scaleX(1)',    'translate(0, 0)',     ]],
        },
        to   : keyframesSvgTopOn.from,
    };
    const keyframesSvgMidOff : PropEx.Keyframes = {
        from : keyframesSvgMidOn.to,
        '81%': keyframesSvgMidOn['19%'],
        to   : keyframesSvgMidOn.from,
    };
    const keyframesSvgBtmOff : PropEx.Keyframes = {
        from : keyframesSvgBtmOn.to,
        '43%': keyframesSvgBtmOn.from,
        '71%': {
            transformOrigin : '91.7% 87.5%',
            transform       : [['rotate(-15deg)', 'scaleX(1)',    'translate(0, 0)',     ]],
        },
        to   : keyframesSvgBtmOn.from,
    };
    
    
    
    const animDuration = '300ms';
    
    
    
    return {
        //#region animations
        svgTopTransfOn         : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        svgMidTransfOn         : [['scaleX(0)',   ]],
        svgBtmTransfOn         : [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        
        svgTopTransfOff        : [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',     ]],
        svgMidTransfOff        : [['scaleX(1)',   ]],
        svgBtmTransfOff        : [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',     ]],
        
        '@keyframes svgTopOn'  : keyframesSvgTopOn,
        '@keyframes svgMidOn'  : keyframesSvgMidOn,
        '@keyframes svgBtmOn'  : keyframesSvgBtmOn,
        '@keyframes svgTopOff' : keyframesSvgTopOff,
        '@keyframes svgMidOff' : keyframesSvgMidOff,
        '@keyframes svgBtmOff' : keyframesSvgBtmOff,
        svgAnimDuration        :   animDuration,
        svgTopAnimOn           : [[animDuration, 'ease-out', 'both', keyframesSvgTopOn ]],
        svgMidAnimOn           : [[animDuration, 'ease-out', 'both', keyframesSvgMidOn ]],
        svgBtmAnimOn           : [[animDuration, 'ease-out', 'both', keyframesSvgBtmOn ]],
        svgTopAnimOff          : [[animDuration, 'ease-out', 'both', keyframesSvgTopOff]],
        svgMidAnimOff          : [[animDuration, 'ease-out', 'both', keyframesSvgMidOff]],
        svgBtmAnimOff          : [[animDuration, 'ease-out', 'both', keyframesSvgBtmOff]],
        //#endregion animations
    };
}, { prefix: 'tgmn' });



// react components:

export interface TogglerMenuButtonProps
    extends
        CheckProps
{
}
export const TogglerMenuButton = (props: TogglerMenuButtonProps) => {
    // styles:
    const sheet       = useTogglerMenuButtonSheet();



    // jsx fn props:
    const childrenFn  = (() => {
        // default (unset):
        if (props.children === undefined) return (
            <svg viewBox='0 0 24 24'>
                <polyline points='2,3 22,3' />
                <polyline points='2,12 22,12' />
                <polyline points='2,21 22,21' />
            </svg>
        );



        // other component:
        return props.children;
    })();



    // fn props:
    const propActive  = usePropActive(props);
    
    const ariaRole    = props.role            ?? 'button';
    const ariaPressed = props['aria-pressed'] ?? ((ariaRole === 'button') ? propActive : undefined);



    // jsx:
    return (
        <Check
            // other props:
            {...props}


            // accessibility:
            role={ariaRole}
            aria-pressed={ariaPressed}
            aria-expanded={props['aria-expanded'] ?? propActive}
            label={props.label ?? 'Toggle navigation'}


            // validations:
            enableValidation={props.enableValidation ?? false}


            // variants:
            chkStyle={props.chkStyle ?? 'btn'}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { childrenFn }
        </Check>
    );
};
TogglerMenuButton.prototype = Check.prototype; // mark as Check compatible
export { TogglerMenuButton as default }
