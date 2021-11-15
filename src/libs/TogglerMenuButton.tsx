// react:
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
    createUseSheet,
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

// nodestrap utilities:
import typos                from './typos/index' // configurable typography (texting) defs
import {
    // hooks:
    usePropActive,
}                           from './accessibilities'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    ThemeName,
    mildOf,
    usesAnim,
    
    
    
    // configs:
    cssDecls as bcssDecls,
}                           from './Basic'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
    isPassived,
    isActive,
    
    
    
    // configs:
    cssProps as icssProps,
    cssDecls as icssDecls,
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
    // styles:
    labelElm,
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from './Check'



// hooks:

// states:

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
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary') => controlUsesThemeActive(themeName);
//#endregion activePassive


// animations:

//#region svg animations
export interface SvgAnimVars {
    topTransfIn  : any
    midTransfIn  : any
    btmTransfIn  : any
    
    topTransfOut : any
    midTransfOut : any
    btmTransfOut : any
    
    
    
    /**
     * final transform for the svg top.
     */
    topTransf    : any
    /**
     * final transform for the svg middle.
     */
    midTransf    : any
    /**
     * final transform for the svg bottom.
     */
    btmTransf    : any
    
    /**
     * final animation for the svg top.
     */
    topAnim      : any
    /**
     * final animation for the svg middle.
     */
    midAnim      : any
    /**
     * final animation for the svg bottom.
     */
    btmAnim      : any
}
const [svgAnimRefs, svgAnimDecls] = createCssVar<SvgAnimVars>();

export const usesSvgAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    // css vars:
    const transfNoneVars = () => vars({
        [svgAnimDecls.topTransfIn]  : animRefs.transfNone,
        [svgAnimDecls.midTransfIn]  : animRefs.transfNone,
        [svgAnimDecls.btmTransfIn]  : animRefs.transfNone,
        
        [svgAnimDecls.topTransfOut] : animRefs.transfNone,
        [svgAnimDecls.midTransfOut] : animRefs.transfNone,
        [svgAnimDecls.btmTransfOut] : animRefs.transfNone,
    });
    const transfInVars   = () => vars({
        [svgAnimDecls.topTransfIn]  : cssProps.svgTopTransfIn,
        [svgAnimDecls.midTransfIn]  : cssProps.svgMidTransfIn,
        [svgAnimDecls.btmTransfIn]  : cssProps.svgBtmTransfIn,
    });
    const transfOutVars  = () => vars({
        [svgAnimDecls.topTransfOut] : cssProps.svgTopTransfOut,
        [svgAnimDecls.midTransfOut] : cssProps.svgMidTransfOut,
        [svgAnimDecls.btmTransfOut] : cssProps.svgBtmTransfOut,
    });
    
    const animNoneVars   = () => vars({
        [svgAnimDecls.topAnim]   : animRefs.animNone,
        [svgAnimDecls.midAnim]   : animRefs.animNone,
        [svgAnimDecls.btmAnim]   : animRefs.animNone,
    });
    const animInVars     = () => vars({
        [svgAnimDecls.topAnim]   : cssProps.svgTopAnimIn,
        [svgAnimDecls.midAnim]   : cssProps.svgMidAnimIn,
        [svgAnimDecls.btmAnim]   : cssProps.svgBtmAnimIn,
    });
    const animOutVars    = () => vars({
        [svgAnimDecls.topAnim]   : cssProps.svgTopAnimOut,
        [svgAnimDecls.midAnim]   : cssProps.svgMidAnimOut,
        [svgAnimDecls.btmAnim]   : cssProps.svgBtmAnimOut,
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
                [svgAnimDecls.topTransf] : [[ // double array => makes the JSS treat as space separated values
                    svgAnimRefs.topTransfIn,
                    svgAnimRefs.topTransfOut,
                ]],
                [svgAnimDecls.midTransf] : [[ // double array => makes the JSS treat as space separated values
                    svgAnimRefs.midTransfIn,
                    svgAnimRefs.midTransfOut,
                ]],
                [svgAnimDecls.btmTransf] : [[ // double array => makes the JSS treat as space separated values
                    svgAnimRefs.btmTransfIn,
                    svgAnimRefs.btmTransfOut,
                ]],
            }),
        ]),
        svgAnimRefs,
        svgAnimDecls,
    ] as const;
};
//#endregion svg animations



// styles:
const svgElm = 'svg';
export const usesSvgLayout = () => {
    // dependencies:
    
    // animations:
    const [, svgAnimRefs] = usesSvgAnim();
    
    
    
    return composition([
        layout({
            // sizes:
            // fills the entire parent text's height:
            blockSize  : `calc(1em * var(${bcssDecls.lineHeight},${typos.lineHeight}))`,
            inlineSize : 'auto', // calculates the width by [height * aspect-ratio]
            
            
            
            // children:
            overflow: 'visible', // allows graphics to overflow the canvas
            ...children('*', [
                layout({
                    // appearances:
                    stroke        : 'currentColor', // set menu color as parent's font color
                    strokeWidth   : 4,              // set menu thickness, 4 of 24 might enough
                    strokeLinecap : 'square',       // set menu edges square
                    
                    
                    
                    // animations:
                    transformOrigin : '50% 50%',
                }),
                variants([
                    isNthChild(0, 1, [
                        layout({
                            // animations:
                            transf : svgAnimRefs.topTransf,
                            anim   : svgAnimRefs.topAnim,
                        }),
                    ]),
                    isNthChild(0, 2, [
                        layout({
                            // animations:
                            transf : svgAnimRefs.midTransf,
                            anim   : svgAnimRefs.midAnim,
                        }),
                    ]),
                    isNthChild(0, 3, [
                        layout({
                            // animations:
                            transf : svgAnimRefs.btmTransf,
                            anim   : svgAnimRefs.btmAnim,
                        }),
                    ]),
                ]),
            ]),
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
            ...children(labelElm, [
                layout({
                    // children:
                    ...children(svgElm, [
                        imports([
                            usesSvgLayout(),
                        ]),
                    ]),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
            ]),
        }),
        vars({
            [icssDecls.animActive ] : cssProps.animActive,
            [icssDecls.animPassive] : cssProps.animPassive,
        }),
    ]);
};
export const usesTogglerMenuButtonVariants = () => {
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

export const useTogglerMenuButtonSheet = createUseSheet(() => [
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
    
    
    
    //#region transforms hamburger menu to cross menu
    const keyframesSvgTopIn  : PropEx.Keyframes = {
        from : {
            transform : svgAnimRefs.topTransfOut,
        },
        '43%': {
            transform : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]],
        },
        '71%': {
            transform : [['rotate(-60deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]],
        },
        to   : {
            transform : svgAnimRefs.topTransfIn,
        },
    };
    const keyframesSvgMidIn  : PropEx.Keyframes = {
        from : {
            transform : svgAnimRefs.midTransfOut,
        },
        '19%': {
            transform : [[                  'scaleX(1.35)'                        ]],
        },
        to   : {
            transform : svgAnimRefs.midTransfIn,
        },
    };
    const keyframesSvgBtmIn  : PropEx.Keyframes = {
        from : {
            transform : svgAnimRefs.btmTransfOut,
        },
        '43%': {
            transform : [['rotate(45deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']],
        },
        '71%': {
            transform : [['rotate(60deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']],
        },
        to   : {
            transform : svgAnimRefs.btmTransfIn,
        },
    };
    //#endregion transforms hamburger menu to cross menu
    
    
    
    //#region transforms cross menu to hamburger menu
    const keyframesSvgTopOut : PropEx.Keyframes = {
        from : keyframesSvgTopIn.to,
        '43%': keyframesSvgTopIn.from,
        '71%': {
            transformOrigin : '91.7% 12.5%',
            transform : [['rotate(15deg)' , 'scaleX(1)'   , 'translate(0, 0)',     ]],
        },
        to   : keyframesSvgTopIn.from,
    };
    const keyframesSvgMidOut : PropEx.Keyframes = {
        from : keyframesSvgMidIn.to,
        '81%': keyframesSvgMidIn['19%'],
        to   : keyframesSvgMidIn.from,
    };
    const keyframesSvgBtmOut : PropEx.Keyframes = {
        from : keyframesSvgBtmIn.to,
        '43%': keyframesSvgBtmIn.from,
        '71%': {
            transformOrigin : '91.7% 87.5%',
            transform : [['rotate(-15deg)', 'scaleX(1)'   , 'translate(0, 0)',     ]],
        },
        to   : keyframesSvgBtmIn.from,
    };
    //#endregion transforms cross menu to hamburger menu
    
    
    
    const animDuration = '300ms';
    
    return {
        //#region animations
        svgTopTransfIn         : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)' ]],
        svgMidTransfIn         : [[                  'scaleX(0)'   ,                       ]],
        svgBtmTransfIn         : [['rotate(45deg)' , 'scaleX(1.35)', 'translate(0, -37.5%)']],
        
        svgTopTransfOut        : [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]],
        svgMidTransfOut        : [[                  'scaleX(1)'   ,                       ]],
        svgBtmTransfOut        : [['rotate(0deg)'  , 'scaleX(1)'   , 'translate(0, 0)'     ]],
        
        '@keyframes svgTopIn'  : keyframesSvgTopIn,
        '@keyframes svgMidIn'  : keyframesSvgMidIn,
        '@keyframes svgBtmIn'  : keyframesSvgBtmIn,
        '@keyframes svgTopOut' : keyframesSvgTopOut,
        '@keyframes svgMidOut' : keyframesSvgMidOut,
        '@keyframes svgBtmOut' : keyframesSvgBtmOut,
        svgAnimDuration        :   animDuration,
        svgTopAnimIn           : [[animDuration, 'ease-out', 'both', keyframesSvgTopIn ]],
        svgMidAnimIn           : [[animDuration, 'ease-out', 'both', keyframesSvgMidIn ]],
        svgBtmAnimIn           : [[animDuration, 'ease-out', 'both', keyframesSvgBtmIn ]],
        svgTopAnimOut          : [[animDuration, 'ease-out', 'both', keyframesSvgTopOut]],
        svgMidAnimOut          : [[animDuration, 'ease-out', 'both', keyframesSvgMidOut]],
        svgBtmAnimOut          : [[animDuration, 'ease-out', 'both', keyframesSvgBtmOut]],
        
        
        
        animActive             : [[animDuration, 'ease-out', 'both', icssProps['@keyframes active' ] ]],
        animPassive            : [[animDuration, 'ease-out', 'both', icssProps['@keyframes passive'] ]],
        //#endregion animations
    };
}, { prefix: 'tgmn' });



// react components:

export interface TogglerMenuButtonProps
    extends
        CheckProps
{
}
export function TogglerMenuButton(props: TogglerMenuButtonProps) {
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
    const propActive  = usePropActive(props); // controllable active only; uncontrollable (toggle active) always return `false`
    
    
    
    // jsx:
    return (
        <Check
            // other props:
            {...props}
            
            
            // semantics:
            aria-expanded={props['aria-expanded'] ?? propActive}
            
            
            // accessibilities:
            label={props.label ?? 'Toggle navigation'}
            
            
            // validations:
            enableValidation={props.enableValidation ?? false}
            
            
            // variants:
            nude={props.nude ?? false}
            checkStyle={props.checkStyle ?? 'btn'}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { childrenFn }
        </Check>
    );
}
TogglerMenuButton.prototype = Check.prototype; // mark as Check compatible
export { TogglerMenuButton as default }
