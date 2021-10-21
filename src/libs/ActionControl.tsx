// react (builds html using javascript):
import {
    default as React,
    useState,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // general types:
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
import {
    // hooks:
    usesSizeVariant,
    usesAnim,
    fallbackNoneFilter,
}                           from './Basic'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
}                           from './Indicator'
import {
    // hooks:
    markActive,
    
    
    
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from './Control'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'



// hooks:

// states:

//#region pressRelease
export interface PressReleaseVars {
    filterPressRelease : any
    animPressRelease   : any
}
const [pressReleaseRefs, pressReleaseDecls] = createCssVar<PressReleaseVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(pressReleaseRefs.filterPressRelease);
    propsManager.registerAnim(pressReleaseRefs.animPressRelease);
}

// .pressed will be added after pressing-animation done:
const selectorIsPressed   =  '.pressed'
// .press = programatically press, :active = user press:
const selectorIsPressing  = ['.press',
                             ':active:not(.disabled):not(.disable):not(:disabled):not(.pressed):not(.release):not(.released)']
// .release will be added after loosing press and will be removed after releasing-animation done:
const selectorIsReleasing =  '.release'
// if all above are not set => released
// optionally use .released to kill pseudo :active:
const selectorIsReleased  = [':not(.pressed):not(.press):not(:active):not(.release)',
                             ':not(.pressed):not(.press).disabled:not(.release)'    ,
                             ':not(.pressed):not(.press).disable:not(.release)'     ,
                             ':not(.pressed):not(.press):disabled:not(.release)'    ,
                             '.released']

export const isPressed        = (styles: StyleCollection) => rule(selectorIsPressed  , styles);
export const isPressing       = (styles: StyleCollection) => rule(selectorIsPressing , styles);
export const isReleasing      = (styles: StyleCollection) => rule(selectorIsReleasing, styles);
export const isReleased       = (styles: StyleCollection) => rule(selectorIsReleased , styles);

export const isPress          = (styles: StyleCollection) => rule([selectorIsPressing , selectorIsPressed ], styles);
export const isRelease        = (styles: StyleCollection) => rule([selectorIsReleasing, selectorIsReleased], styles);
export const isPressReleasing = (styles: StyleCollection) => rule([selectorIsPressing , selectorIsPressed  , selectorIsReleasing], styles);

/**
 * Uses press & release states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents press & release state definitions.
 */
export const usesPressReleaseState = () => {
    return [
        () => composition([
            states([
                isPressed([
                    vars({
                        [pressReleaseDecls.filterPressRelease] : cssProps.filterPress,
                    }),
                ]),
                isPressing([
                    vars({
                        [pressReleaseDecls.filterPressRelease] : cssProps.filterPress,
                        [pressReleaseDecls.animPressRelease]   : cssProps.animPress,
                    }),
                ]),
                isReleasing([
                    vars({
                        [pressReleaseDecls.filterPressRelease] : cssProps.filterPress,
                        [pressReleaseDecls.animPressRelease]   : cssProps.animRelease,
                    }),
                ]),
            ]),
        ]),
        pressReleaseRefs,
        pressReleaseDecls,
    ] as const;
};

export const usePressReleaseState  = (props: ActionControlProps, mouses: number[]|null = [0], keys: string[]|null = ['space']) => {
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);



    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.press ?? false); // true => press, false => release
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => pressing-animation, false => releasing-animation

    const [pressDn,   setPressDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user press, false => user release



    /*
     * state is always released if (disabled || readOnly)
     * state is press/release based on [controllable press] (if set) and fallback to [uncontrollable press]
     */
    const pressFn: boolean = (propEnabled && !propReadOnly) && (props.press /*controllable*/ ?? pressDn /*uncontrollable*/);

    if (pressed !== pressFn) { // change detected => apply the change & start animating
        setPressed(pressFn);   // remember the last change
        setAnimating(pressFn); // start pressing-animation/releasing-animation
    }


    
    useEffect(() => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (propReadOnly)              return; // control is readOnly => no response required
        if (props.press !== undefined) return; // controllable [press] is set => no uncontrollable required



        const handleRelease = () => {
            setPressDn(false);
        }
        window.addEventListener('mouseup', handleRelease);
        window.addEventListener('keyup',   handleRelease);
        return () => {
            window.removeEventListener('mouseup', handleRelease);
            window.removeEventListener('keyup',   handleRelease);
        }
    }, [propEnabled, propReadOnly, props.press]);



    const handlePress = () => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (propReadOnly)              return; // control is readOnly => no response required
        if (props.press !== undefined) return; // controllable [press] is set => no uncontrollable required



        setPressDn(true);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop pressing-animation/releasing-animation
    }
    return {
        /**
         * partially/fully press
        */
        press : pressed,

        class : ((): string|null => {
            // pressing:
            if (animating === true) {
                // // pressing by controllable prop => use class .press
                // if (props.press !== undefined) return 'press';
                
                return 'press'; // support for pressing by [space key] that not triggering :active
                
                // // otherwise use pseudo :active
                // return null;
            } // if

            // releasing:
            if (animating === false) return 'release';

            // fully pressed:
            if (pressed) return 'pressed';

            // fully released:
            if ((props.press !== undefined) || propReadOnly) {
                return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleMouseDown    : ((e) => {
            if (!mouses || mouses.includes(e.button)) handlePress();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown      : ((e) => {
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handlePress();
        }) as React.KeyboardEventHandler<HTMLElement>,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
//#endregion pressRelease

//#region activePassive as pressRelease
/**
 * @deprecated The method should not be used
 * Uses active & passive states as press & release states.
 * @returns A `StyleCollection` represents active & passive state definitions.
 */
export const usesActivePassiveAsPressReleaseState = () => {
    // dependencies:
    
    // states:
    const [, , pressReleaseDecls] = usesPressReleaseState();
    
    
    
    return composition([
        states([
            isActived([
                vars({
                    [pressReleaseDecls.filterPressRelease] : cssProps.filterPress,
                }),
            ]),
            isActivating([
                vars({
                    [pressReleaseDecls.filterPressRelease] : cssProps.filterPress,
                    [pressReleaseDecls.animPressRelease]   : cssProps.animPress,
                }),
            ]),
            isPassivating([
                vars({
                    [pressReleaseDecls.filterPressRelease] : cssProps.filterPress,
                    [pressReleaseDecls.animPressRelease]   : cssProps.animRelease,
                }),
            ]),
        ]),
    ]);
};
//#endregion activePassive as pressRelease



// styles:
export const usesActionControlLayout = () => {
    return composition([
        imports([
            // layouts:
            usesControlLayout(),
        ]),
        layout({
            // accessibilities:
            userSelect : 'none', // disable selecting text (double clicking not causing selecting text)
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesActionControlVariants = () => {
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
            usesControlVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesActionControlStates = () => {
    // dependencies:
    
    // states:
    const [pressRelease] = usesPressReleaseState();
    
    
    
    return composition([
        imports([
            // states:
            usesControlStates(),
            pressRelease(),
        ]),
        states([
            isPress([
                imports([
                    markActive(),
                ]),
            ]),
        ]),
    ]);
};
export const usesActionControl = () => {
    return composition([
        imports([
            // layouts:
            usesActionControlLayout(),
            
            // variants:
            usesActionControlVariants(),
            
            // states:
            usesActionControlStates(),
        ]),
    ]);
};

export const useActionControlSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesActionControl(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const filters = propsManager.filters();
    
    const [, {filterPressRelease}] = usesPressReleaseState();
    
    
    
    //#region keyframes
    const keyframesPress   : PropEx.Keyframes = {
        from : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterPressRelease)),

             // filterPressRelease, // missing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
        to   : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterPressRelease)),

                filterPressRelease, // existing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
    };
    const keyframesRelease : PropEx.Keyframes = {
        from : keyframesPress.to,
        to   : keyframesPress.from,
    };
    //#endregion keyframes
    
    
    
    return {
        //#region animations
        filterPress          : [['brightness(65%)', 'contrast(150%)']],
        
        '@keyframes press'   : keyframesPress,
        '@keyframes release' : keyframesRelease,
        animPress            : [['150ms', 'ease-out', 'both', keyframesPress  ]],
        animRelease          : [['300ms', 'ease-out', 'both', keyframesRelease]],
        //#endregion animations
    };
}, { prefix: 'act' });



// react components:

export interface ActionControlProps<TElement extends HTMLElement = HTMLElement>
    extends
        ControlProps<TElement>
{
    // accessibilities:
    press?   : boolean
}
export function ActionControl<TElement extends HTMLElement = HTMLElement>(props: ActionControlProps<TElement>) {
    // styles:
    const sheet             = useActionControlSheet();
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                pressReleaseState.class,
            ]}
            
            
            // events:
            onClick={(propEnabled || undefined) && props.onClick} // ignores onClick if disabled
            onMouseDown={(e) => { props.onMouseDown?.(e); pressReleaseState.handleMouseDown(e); }}
            onKeyDown=  {(e) => { props.onKeyDown?.(e);   pressReleaseState.handleKeyDown(e);   }}
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                pressReleaseState.handleAnimationEnd(e);
            }}
        />
    );
}
export { ActionControl as default }
