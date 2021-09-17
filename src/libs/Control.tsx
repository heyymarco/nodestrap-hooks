// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Cust,
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // general types:
    JssValue,
    StyleCollection,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    
    
    
    // rules:
    states,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
    fallbacks,
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
    usesThemes,
    usesThemeDefault as basicComponentUsesThemeDefault,
    usesAnim,
}                           from './BasicComponent'
import {
    // hooks:
    isDisable,
    isActive,
    markActive      as indicatorMarkActive,
    usesThemeActive as indicatorUsesThemeActive,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'
import {
    stripOutControl,
}                           from './strip-outs'
import {
    colors,
}                           from './colors'      // configurable colors & theming defs



// hooks:

// states:

//#region activePassive
export const markActive = () => composition([
    imports([
        indicatorMarkActive(),
        
        usesThemeActive(), // switch to active theme
    ]),
]);

// change default parameter from `null` to 'secondary':
export const usesThemeDefault = (themeName: ThemeName|null = 'secondary') => basicComponentUsesThemeDefault(themeName);

// change default parameter from 'secondary' to 'primary':
export const usesThemeActive  = (themeName: ThemeName|null = 'primary') => indicatorUsesThemeActive(themeName);
//#endregion activePassive

//#region focusBlur
export interface FocusBlurVars {
    boxShadowFocusBlur : any
    animFocusBlur      : any
    
    
    
    /**
     * functional boxShadow color - at focus state.
     */
    boxShadowFocusFn   : any
    /**
     * final boxShadow color - at focus state.
     */
    boxShadowFocusCol  : any
    /**
     * final boxShadow single layer - at focus state.
     */
    boxShadowFocusLy   : any
    /**
     * toggles on boxShadow single layer - at focus state.
     */
    boxShadowFocusTg   : any
}
const [focusBlurRefs, focusBlurDecls] = createCssVar<FocusBlurVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerBoxShadow(focusBlurRefs.boxShadowFocusBlur);
    propsManager.registerAnim(focusBlurRefs.animFocusBlur);
}

// .focused will be added after focusing-animation done:
const selectorIsFocused  =  '.focused'
// .focus = programatically focus, :focus = user focus:
const selectorIsFocusing = ['.focus',
                            ':focus:not(.disabled):not(.disable):not(:disabled):not(.focused):not(.blur):not(.blurred)']
// .blur will be added after loosing focus and will be removed after blurring-animation done:
const selectorIsBlurring =  '.blur'
// if all above are not set => blurred
// optionally use .blurred to kill pseudo :focus:
const selectorIsBlurred  = [':not(.focused):not(.focus):not(:focus):not(.blur)',
                            ':not(.focused):not(.focus).disabled:not(.blur)'   ,
                            ':not(.focused):not(.focus).disable:not(.blur)'    ,
                            ':not(.focused):not(.focus):disabled:not(.blur)'   ,
                            '.blurred']

export const isFocused       = (styles: StyleCollection) => rule(selectorIsFocused , styles);
export const isFocusing      = (styles: StyleCollection) => rule(selectorIsFocusing, styles);
export const isBlurring      = (styles: StyleCollection) => rule(selectorIsBlurring, styles);
export const isBlurred       = (styles: StyleCollection) => rule(selectorIsBlurred , styles);

export const isFocus         = (styles: StyleCollection) => rule([selectorIsFocusing, selectorIsFocused], styles);
export const isBlur          = (styles: StyleCollection) => rule([selectorIsBlurring, selectorIsBlurred], styles);
export const isFocusBlurring = (styles: StyleCollection) => rule([selectorIsFocusing, selectorIsFocused , selectorIsBlurring], styles);

/**
 * Uses focus & blur states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents focus & blur state definitions.
 */
export const usesFocusBlur   = () => {
    // dependencies:
    const [, themeRefs] = usesThemes();
    const [, animRefs ] = usesAnim();
    
    
    
    return [
        () => composition([
            vars({
                [focusBlurDecls.boxShadowFocusFn]  : fallbacks(
                    themeRefs.focusImpt,  // first  priority
                    themeRefs.focusTheme, // second priority
                    themeRefs.focusCond,  // third  priority
                    
                    colors.secondaryThin, // default => uses secondary theme, because its color is neutral
                ),
                [focusBlurDecls.boxShadowFocusCol] : fallbacks(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    focusBlurRefs.boxShadowFocusFn, // default => uses our `boxShadowFocusFn`
                ),
                [focusBlurDecls.boxShadowFocusLy]  : [[ // double array => makes the JSS treat as space separated values
                    // combining: pos width spread color ...
                    
                    // boxShadowFocus pos, width, spread, etc:
                    cssProps.boxShadowFocus,
                    
                    // boxShadowFocus color:
                    focusBlurRefs.boxShadowFocusCol,
                ]],
            }),
            vars({
                [focusBlurDecls.boxShadowFocusBlur] : animRefs.boxShadowNone,
                [focusBlurDecls.animFocusBlur]      : animRefs.animNone,
            }),
            states([
                isFocused([
                    vars({
                        [focusBlurDecls.boxShadowFocusBlur] : focusBlurRefs.boxShadowFocusLy,
                    }),
                ]),
                isFocusing([
                    vars({
                        [focusBlurDecls.boxShadowFocusBlur] : focusBlurRefs.boxShadowFocusLy,
                        [focusBlurDecls.animFocusBlur]      : cssProps.animFocus,
                    }),
                ]),
                isBlurring([
                    vars({
                        [focusBlurDecls.boxShadowFocusBlur] : focusBlurRefs.boxShadowFocusLy,
                        [focusBlurDecls.animFocusBlur]      : cssProps.animBlur,
                    }),
                ]),
            ]),
        ]),
        focusBlurRefs,
        focusBlurDecls,
    ] as const;
};

export const useStateFocusBlur = <TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>) => {
    // fn props:
    const propEnabled = usePropEnabled(props);



    // states:
    const [focused,   setFocused  ] = useState<boolean>(props.focus ?? false); // true => focus, false => blur
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => focusing-animation, false => blurring-animation

    const [focusDn,   setFocusDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user focus, false => user blur


    
    /*
     * state is always blur if disabled
     * state is focus/blur based on [controllable focus] (if set) and fallback to [uncontrollable focus]
     */
    const focusFn: boolean = propEnabled && (props.focus /*controllable*/ ?? focusDn /*uncontrollable*/);

    if (focused !== focusFn) { // change detected => apply the change & start animating
        setFocused(focusFn);   // remember the last change
        setAnimating(focusFn); // start focusing-animation/blurring-animation
    }


    
    const handleFocus = () => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (props.focus !== undefined) return; // controllable [focus] is set => no uncontrollable required



        setFocusDn(true);
    }
    const handleBlur = () => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (props.focus !== undefined) return; // controllable [focus] is set => no uncontrollable required



        setFocusDn(false);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop focusing-animation/blurring-animation
    }
    return {
        focus    : focused,

        class    : ((): string|null => {
            // focusing:
            if (animating === true) {
                // focusing by controllable prop => use class .focus
                if (props.focus !== undefined) return 'focus';

                // negative [tabIndex] => can't be focused by user input => treats Control as *wrapper* element => use class .focus
                if ((props.tabIndex ?? 0) < 0) return 'focus';

                // otherwise use pseudo :focus
                return null;
            } // if

            // blurring:
            if (animating === false) return 'blur';

            // fully focused:
            if (focused) return 'focused';

            // fully blurred:
            if (props.focus !== undefined) {
                return 'blurred'; // blurring by controllable prop => use class .blurred to kill pseudo :focus
            }
            else {
                return null; // discard all classes above
            } // if
        })(),

        handleFocus        : handleFocus,
        handleBlur         : handleBlur,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
//#endregion focusBlur

//#region arriveLeave
export interface ArriveLeaveVars {
    filterArriveLeave : any
    animArriveLeave   : any
}
const [arriveLeaveRefs, arriveLeaveDecls] = createCssVar<ArriveLeaveVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(arriveLeaveRefs.filterArriveLeave);
    propsManager.registerAnim(arriveLeaveRefs.animArriveLeave);
}

// .arrived will be added after arriving-animation done:
const selectorIsArrived  =  '.arrived'
// arrive = a combination of .arrive || :hover || (.focused || .focus || :focus)
// .arrive = programatically arrive, :hover = user hover:
const selectorIsArriving = ['.arrive'                                                                                ,
                            ':hover:not(.disabled):not(.disable):not(:disabled):not(.arrived):not(.leave):not(.left)',
                            '.focused:not(.arrived):not(.leave):not(.left)'                                          ,
                            '.focus:not(.arrived):not(.leave):not(.left)'                                            ,
                            ':focus:not(.disabled):not(.disable):not(:disabled):not(.blur):not(.blurred):not(.arrived):not(.leave):not(.left)']
// .leave will be added after loosing arrive and will be removed after leaving-animation done:
const selectorIsLeaving  =  '.leave'
// if all above are not set => left
// optionally use .left to kill [:hover || (.focused || .focus || :focus)]:
const selectorIsLeft     = [':not(.arrived):not(.arrive):not(:hover):not(.focused):not(.focus):not(:focus):not(.leave)',
                            ':not(.arrived):not(.arrive):not(:hover).blur:not(.leave)'                                 ,
                            ':not(.arrived):not(.arrive):not(:hover).blurred:not(.leave)'                              ,
                            ':not(.arrived):not(.arrive).disabled:not(.leave)'                                         ,
                            ':not(.arrived):not(.arrive).disable:not(.leave)'                                          ,
                            ':not(.arrived):not(.arrive):disabled:not(.leave)'                                         ,
                            '.left']

export const isArrived       = (styles: StyleCollection) => rule(selectorIsArrived , styles);
export const isArriving      = (styles: StyleCollection) => rule(selectorIsArriving, styles);
export const isLeaving       = (styles: StyleCollection) => rule(selectorIsLeaving , styles);
export const isLeft          = (styles: StyleCollection) => rule(selectorIsLeft    , styles);

export const isArrive        = (styles: StyleCollection) => rule([selectorIsArriving, selectorIsArrived ], styles);
export const isLeave         = (styles: StyleCollection) => rule([selectorIsLeaving , selectorIsLeft    ], styles);
export const isArriveLeaving = (styles: StyleCollection) => rule([selectorIsArriving, selectorIsArrived  , selectorIsLeaving], styles);

/**
 * Uses arrive (hover) & leave states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents arrive (hover) & leave state definitions.
 */
export const usesArriveLeave = () => {
    // dependencies:
    const [, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            vars({
                [arriveLeaveDecls.filterArriveLeave] : animRefs.filterNone,
                [arriveLeaveDecls.animArriveLeave]   : animRefs.animNone,
            }),
            states([
                isArrived([
                    vars({
                        [arriveLeaveDecls.filterArriveLeave] : cssProps.filterArrive,
                    }),
                ]),
                isArriving([
                    vars({
                        [arriveLeaveDecls.filterArriveLeave] : cssProps.filterArrive,
                        [arriveLeaveDecls.animArriveLeave]   : cssProps.animArrive,
                    }),
                ]),
                isLeaving([
                    vars({
                        [arriveLeaveDecls.filterArriveLeave] : cssProps.filterArrive,
                        [arriveLeaveDecls.animArriveLeave]   : cssProps.animLeave,
                    }),
                ]),
            ]),
        ]),
        arriveLeaveRefs,
        arriveLeaveDecls,
    ] as const;
};

export const useStateArriveLeave = <TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>, stateFocusBlur: { focus: boolean }) => {
    // fn props:
    const propEnabled = usePropEnabled(props);



    // states:
    const [arrived,   setArrived  ] = useState<boolean>(false);     // true => arrive, false => leave
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => arriving-animation, false => leaving-animation

    const [hoverDn,   setHoverDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user hover, false => user leave



    /*
     * state is always leave if disabled
     * state is arrive/leave based on [controllable arrive] (if set) and fallback to ([uncontrollable hover] || [uncontrollable focus])
     */
    const arriveFn: boolean = propEnabled && (props.arrive /*controllable*/ ?? (hoverDn /*uncontrollable*/ || stateFocusBlur.focus /*uncontrollable*/));

    if (arrived !== arriveFn) { // change detected => apply the change & start animating
        setArrived(arriveFn);   // remember the last change
        setAnimating(arriveFn); // start arriving-animation/leaving-animation
    }


    
    const handleHover = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setHoverDn(true);
    }
    const handleLeave  = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setHoverDn(false);
    }
    const handleIdle   = () => {
        // clean up finished animation

        setAnimating(null); // stop arriving-animation/leaving-animation
    }
    return {
        arrive : arrived,

        class  : ((): string|null => {
            if (animating === true) {
                // arriving by controllable prop => use class .arrive
                if (props.arrive !== undefined) return 'arrive';

                // otherwise use a combination of :hover || (.focused || .focus || :focus)
                return null;
            } // if

            // leaving:
            if (animating === false) return 'leave';

            // fully arrived:
            if (arrived) return 'arrived';

            // fully left:
            if (props.arrive !== undefined) {
                return 'left'; // arriving by controllable prop => use class .left to kill [:hover || (.focused || .focus || :focus)]
            }
            else {
                return null; // discard all classes above
            } // if
        })(),

        handleMouseEnter   : handleHover,
        handleMouseLeave   : handleLeave,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(arrive|leave)|(?<=[a-z])(Arrive|Leave))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
//#endregion arriveLeave



// styles:
export const usesControlLayout = () => {
    return composition([
        imports([
            // resets:
            stripOutControl(), // clear browser's default styles
            
            // layouts:
            usesIndicatorLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
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
        ]),
    ]);
};
export const usesControlStates = () => {
    // dependencies:
    
    // states:
    const [focusBlur]   = usesFocusBlur();
    const [arriveLeave] = usesArriveLeave();
    
    
    
    return composition([
        imports([
            // states:
            usesIndicatorStates(),
            focusBlur(),
            arriveLeave(),
        ]),
        states([
            isDisable([
                layout({
                    // accessibilities:
                    cursor     : cssProps.cursorDisable,
                    userSelect : 'none',
                }),
            ]),
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
        ]),
    ]);
};
export const usesControl = () => {
    return composition([
        imports([
            // layouts:
            usesControlLayout(),
            
            // variants:
            usesControlVariants(),
            
            // states:
            usesControlStates(),
        ]),
    ]);
};

export const useControlSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesControl(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, animRefs, , propsManager] = usesAnim();
    const boxShadows = propsManager.boxShadows();
    const filters    = propsManager.filters();
    
    const defaultBoxShadow = (boxShadow : Cust.Ref) => fallbacks(boxShadow, animRefs.boxShadowNone);
    const defaultFilter    = (filter    : Cust.Ref) => fallbacks(filter   , animRefs.filterNone);
    
    const [, {boxShadowFocusBlur}] = usesFocusBlur();
    const [, {filterArriveLeave} ] = usesArriveLeave();
    
    
    
    //#region keyframes
    const keyframesFocus  : PropEx.Keyframes = {
        from : {
            boxShadow: [[[ // triple array => makes the JSS treat as comma separated values
                ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),

             // boxShadowFocusBlur, // missing the last => let's the browser interpolated it
            ].map(defaultBoxShadow)]] as unknown as JssValue,
        },
        to   : {
            boxShadow: [[[ // triple array => makes the JSS treat as comma separated values
                ...boxShadows.filter((b) => (b !== boxShadowFocusBlur)),

                boxShadowFocusBlur, // existing the last => let's the browser interpolated it
            ].map(defaultBoxShadow)]] as unknown as JssValue,
        },
    };
    const keyframesBlur   : PropEx.Keyframes = {
        from : keyframesFocus.to,
        to   : keyframesFocus.from,
    };
    
    
    
    const keyframesArrive : PropEx.Keyframes = {
        from : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterArriveLeave)),

             // filterArriveLeave, // missing the last => let's the browser interpolated it
            ].map(defaultFilter)],
        },
        to   : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterArriveLeave)),

                filterArriveLeave, // existing the last => let's the browser interpolated it
            ].map(defaultFilter)],
        },
    };
    const keyframesLeave  : PropEx.Keyframes = {
        from : keyframesArrive.to,
        to   : keyframesArrive.from,
    };
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursor              : 'pointer',
        cursorDisable       : 'not-allowed',
        
        
        
        //#region animations
        boxShadowFocus      : [[0, 0, 0, '0.25rem' ]], // supports for Control children's theming
        filterArrive        : [['brightness(85%)', 'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))']],
        
        '@keyframes focus'  : keyframesFocus,
        '@keyframes blur'   : keyframesBlur,
        '@keyframes arrive' : keyframesArrive,
        '@keyframes leave'  : keyframesLeave,
        animFocus           : [['150ms', 'ease-out', 'both', keyframesFocus ]],
        animBlur            : [['300ms', 'ease-out', 'both', keyframesBlur  ]],
        animArrive          : [['150ms', 'ease-out', 'both', keyframesArrive]],
        animLeave           : [['300ms', 'ease-out', 'both', keyframesLeave ]],
        //#endregion animations
    };
}, { prefix: 'ctrl' });



// react components:

export interface ControlProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>
{
    // accessibilities:
    focus?    : boolean
    tabIndex? : number

    arrive?   : boolean
}
export const Control = <TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>) => {
    // styles:
    const sheet            = useControlSheet();

    
    
    // states:
    const stateFocusBlur   = useStateFocusBlur(props);
    const stateArriveLeave = useStateArriveLeave(props, stateFocusBlur);



    // fn props:
    const propEnabled      = usePropEnabled(props);

    

    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateFocusBlur.class,
                stateArriveLeave.class,
            ]}


            // Control props:
            {...{
                // accessibilities:
                tabIndex : props.tabIndex ?? (propEnabled ? 0 : -1),
            }}
        

            // events:
            onFocus=        {(e) => { stateFocusBlur.handleFocus();        props.onFocus?.(e);      }}
            onBlur=         {(e) => { stateFocusBlur.handleBlur();         props.onBlur?.(e);       }}
            onMouseEnter=   {(e) => { stateArriveLeave.handleMouseEnter(); props.onMouseEnter?.(e); }}
            onMouseLeave=   {(e) => { stateArriveLeave.handleMouseLeave(); props.onMouseLeave?.(e); }}
            onAnimationEnd= {(e) => {
                // states:
                stateFocusBlur.handleAnimationEnd(e);
                stateArriveLeave.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
};
export { Control as default }
