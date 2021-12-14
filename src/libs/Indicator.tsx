// react:
import {
    default as React,
    useState,
    useReducer,
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

// nodestrap utilities:
import {
    // hooks:
    TAccessibility,
    usePropAccessibility,
    usePropEnabled,
    usePropActive,
    
    
    
    // react components:
    AccessibilityProps,
    AccessibilityProvider,
}                           from './accessibilities'

// others libs:
// @ts-ignore
import triggerChange        from 'react-trigger-change'

// nodestrap components:
import type {
    // hooks:
    SemanticProps,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeCond,
    outlinedOf,
    mildOf,
    usesAnim,
    fallbackNoneFilter,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'



// hooks:

// states:

//#region enableDisable
export interface EnableDisableVars {
    filter : any
    anim   : any
}
const [enableDisableRefs, enableDisableDecls] = createCssVar<EnableDisableVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(enableDisableRefs.filter);
    propsManager.registerAnim(enableDisableRefs.anim);
}

// if all below are not set => enabled:
const selectorIsEnabled   =  ':not(.enable):not(.disabled):not(.disable):not(:disabled)'
// .enable will be added after loosing disable and will be removed after enabling-animation done:
const selectorIsEnabling  =  '.enable'
// .disable = styled disable, :disabled = real disable:
const selectorIsDisabling = ['.disable',
                             ':disabled:not(.disabled)']
// .disabled will be added after disabling-animation done:
const selectorIsDisabled  =  '.disabled'

export const isEnabled         = (styles: StyleCollection) => rule(selectorIsEnabled  , styles);
export const isEnabling        = (styles: StyleCollection) => rule(selectorIsEnabling , styles);
export const isDisabling       = (styles: StyleCollection) => rule(selectorIsDisabling, styles);
export const isDisabled        = (styles: StyleCollection) => rule(selectorIsDisabled , styles);

export const isEnable          = (styles: StyleCollection) => rule([selectorIsEnabling , selectorIsEnabled ], styles);
export const isDisable         = (styles: StyleCollection) => rule([selectorIsDisabling, selectorIsDisabled], styles);
export const isEnablingDisable = (styles: StyleCollection) => rule([selectorIsEnabling , selectorIsDisabling, selectorIsDisabled], styles);

/**
 * Uses enable & disable states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents enable & disable state definitions.
 */
export const usesEnableDisableState = () => {
    return [
        () => composition([
            states([
                isEnabling([
                    vars({
                        [enableDisableDecls.filter] : cssProps.filterDisable,
                        [enableDisableDecls.anim  ] : cssProps.animEnable,
                    }),
                ]),
                isDisabling([
                    vars({
                        [enableDisableDecls.filter] : cssProps.filterDisable,
                        [enableDisableDecls.anim  ] : cssProps.animDisable,
                    }),
                ]),
                isDisabled([
                    vars({
                        [enableDisableDecls.filter] : cssProps.filterDisable,
                    }),
                ]),
            ]),
        ]),
        enableDisableRefs,
        enableDisableDecls,
    ] as const;
};

export const useEnableDisableState = (props: IndicationProps & SemanticProps) => {
    // fn props:
    const propEnabled = usePropEnabled(props);
    const htmlCtrls   = [
        'button',
        'fieldset',
        'input',
        'select',
        'optgroup',
        'option',
        'textarea',
    ];
    const isCtrlElm   = props.tag && htmlCtrls.includes(props.tag);



    // states:
    const [enabled,   setEnabled  ] = useState<boolean>(propEnabled); // true => enabled, false => disabled
    const [animating, setAnimating] = useState<boolean|null>(null);   // null => no-animation, true => enabling-animation, false => disabling-animation

    
    
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn: boolean = propEnabled /*controllable*/;

    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
        setAnimating(enabledFn); // start enabling-animation/disabling-animation
    }

    
    
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop enabling-animation/disabling-animation
    }
    return {
        enabled  : enabled,
        disabled : !enabled,

        class    : ((): string|null => {
            // enabling:
            if (animating === true)  return 'enable';

            // disabling:
            if (animating === false) {
                if (isCtrlElm) {
                    // a control_element uses pseudo :disabled for disabling
                    // not needed using class .disable
                    return null;
                }
                else {
                    // a generic_element uses class .disable for disabling
                    return 'disable';
                } // if
            } // if

            // fully disabled:
            if (!enabled) return 'disabled';

            // fully enabled:
            return null;
        })(),

        props : (isCtrlElm ? {
            // a control_element uses pseudo :disabled for disabling
            disabled: !enabled,
        } : {}),

        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
//#endregion enableDisable

//#region activePassive
export interface ActivePassiveVars {
    filter : any
    anim   : any
}
const [activePassiveRefs, activePassiveDecls] = createCssVar<ActivePassiveVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(activePassiveRefs.filter);
    propsManager.registerAnim(activePassiveRefs.anim);
}

// .actived will be added after activating-animation done:
const selectorIsActived     =  '.actived'
// .active = programatically active, :checked = user active:
const selectorIsActivating  = ['.active',
                               ':checked:not(.actived)']
// .passive will be added after loosing active and will be removed after deactivating-animation done:
const selectorIsPassivating =  '.passive'
// if all above are not set => passived:
const selectorIsPassived    =  ':not(.actived):not(.active):not(:checked):not(.passive)'

export const isActived           = (styles: StyleCollection) => rule(selectorIsActived    , styles);
export const isActivating        = (styles: StyleCollection) => rule(selectorIsActivating , styles);
export const isPassivating       = (styles: StyleCollection) => rule(selectorIsPassivating, styles);
export const isPassived          = (styles: StyleCollection) => rule(selectorIsPassived   , styles);

export const isActive            = (styles: StyleCollection) => rule([selectorIsActivating , selectorIsActived ], styles);
export const isPassive           = (styles: StyleCollection) => rule([selectorIsPassivating, selectorIsPassived], styles);
export const isActivePassivating = (styles: StyleCollection) => rule([selectorIsActivating , selectorIsActived  , selectorIsPassivating], styles);

/**
 * Uses active & passive states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassiveState = () => {
    return [
        () => composition([
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
    ] as const;
};

export const markActive = () => composition([
    imports([
        outlinedOf(false), // kill outlined variant
        mildOf(false),     // kill mild     variant
        
        usesThemeActive(), // switch to active theme
    ]),
]);
/**
 * Creates a conditional color definitions at active state.
 * @param themeName The name of active theme.
 * @returns A `StyleCollection` represents the conditional color definitions at active state.
 */
export const usesThemeActive = (themeName: ThemeName|null = 'secondary') => usesThemeCond(themeName);

export const useActivePassiveState = (props: IndicationProps & SemanticProps, activeDn?: boolean) => {
    // fn props:
    const propActive = usePropActive(props, null);
    const isCheckbox = (props.tag === 'input') && ((props as any).type === 'checkbox');



    // states:
    const [actived,   setActived  ] = useState<boolean>(propActive ?? false); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);           // null => no-animation, true => activating-animation, false => deactivating-animation

    

    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = propActive /*controllable*/ ?? activeDn /*uncontrollable*/ ?? false;

    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    }

    

    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop activating-animation/deactivating-animation
    }
    return {
        /**
         * partially/fully active
        */
        active : actived,

        class  : ((): string|null => {
            // activating:
            if (animating === true) {
                if (isCheckbox) {
                    // a checkbox uses pseudo :checked for activating
                    // not needed using class .active
                    return null;
                }
                else {
                    // a generic_element uses class .active for activating
                    return 'active';
                } // if
            } // if

            // passivating:
            if (animating === false) return 'passive';

            // fully actived:
            if (actived) return 'actived';

            // fully passived:
            return null;
        })(),

        props : (isCheckbox ? {
            // a checkbox uses pseudo :checked for activating
            checked: actived,
        } : {}),

        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};

export interface TogglerActiveProps<TActiveChangeArg = unknown>
    extends
        IndicationProps
{
    // accessibilities:
    defaultActive?     : boolean
    onActiveChange?    : (newActive: boolean, arg?: TActiveChangeArg) => void
}
interface TogglerActiveState  {
    propAccess         : TAccessibility<boolean, boolean, null>
    
    onActiveChange?    : (newActive: boolean) => void
    changeEventTarget? : (React.RefObject<HTMLInputElement>|null)
    
    activeTg           : boolean
}
const togglerActiveReducer = (state: TogglerActiveState, newActive: React.SetStateAction<boolean>): TogglerActiveState => {
    // fn props:
    const { enabled, readOnly, active } = state.propAccess;
    
    
    
    if (!enabled) return state; // control is disabled => no response required
    if (readOnly) return state; // control is readOnly => no response required
    
    
    
    const activeFn: boolean = active /*controllable*/ ?? state.activeTg /*uncontrollable*/;
    const newActiveValue = (typeof newActive === 'function') ? newActive(activeFn) : newActive;
    if (newActiveValue === activeFn) return state; // no change needed
    
    
    
    {
        const { onActiveChange, changeEventTarget } = state;
        
        // fire change event:
        onActiveChange?.(newActiveValue); // __notify_changed__ -or- __request_to_change__
        
        // fire change event:
        if (changeEventTarget?.current) {
            changeEventTarget.current.checked = newActiveValue;
            triggerChange(changeEventTarget.current);
        } // if
    }
    
    
    
    // save the changes:
    if (active !== null) { // controllable [active] is set => no set uncontrollable required
        return state; // discard changes
        // the actual changes relies on __request_to_change__
    }
    else {
        return { ...state, activeTg: newActiveValue }; // set dynamic (uncontrollable)
    } // if
};
export const useTogglerActive = <TActiveChangeArg extends unknown = unknown>(props: TogglerActiveProps<TActiveChangeArg>, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    // fn props:
    const propAccess = usePropAccessibility<boolean, boolean, null>(props, undefined, undefined, null);
    
    
    
    // states:
    const [state, setActive] = useReducer(togglerActiveReducer, /*initialState: */{
        propAccess        : propAccess,
        
        onActiveChange    : props.onActiveChange,
        changeEventTarget : changeEventTarget,
        
        activeTg          : props.defaultActive ?? false, // uncontrollable (dynamic) state: true => user activate, false => user deactivate
    } as TogglerActiveState);
    
    state.propAccess        = propAccess;
    
    state.onActiveChange    = props.onActiveChange;
    state.changeEventTarget = changeEventTarget;
    
    
    
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = propAccess.active /*controllable*/ ?? state.activeTg /*uncontrollable*/;
    
    
    
    return [
        activeFn,
        setActive,
    ];
};
//#endregion activePassive



// styles:
export const usesIndicatorLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesIndicatorVariants = () => {
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
            usesBasicVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesIndicatorStates = () => {
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
            isActive([
                imports([
                    markActive(),
                ]),
            ]),
        ]),
    ]);
};

export const useIndicatorSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesIndicatorLayout(),
            
            // variants:
            usesIndicatorVariants(),
            
            // states:
            usesIndicatorStates(),
        ]),
    ]),
], /*sheetId :*/'9i8stbnt0e'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const filters = propsManager.filters();
    
    const [, {filter: filterEnableDisable}] = usesEnableDisableState();
    const [, {filter: filterActivePassive}] = usesActivePassiveState();
    
    
    
    //#region keyframes
    const keyframesDisable : PropEx.Keyframes = {
        from : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterEnableDisable)),

             // filterEnableDisable, // missing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
        to   : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterEnableDisable)),

                filterEnableDisable, // existing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
    };
    const keyframesEnable  : PropEx.Keyframes = {
        from : keyframesDisable.to,
        to   : keyframesDisable.from,
    };
    
    
    
    const keyframesActive  : PropEx.Keyframes = {
        from : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterActivePassive)),

             // filterActivePassive, // missing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
        to   : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterActivePassive)),

                filterActivePassive, // existing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
    };
    const keyframesPassive : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };
    //#endregion keyframes
    
    
    
    return {
        //#region animations
        filterDisable        : [['grayscale(50%)',  'contrast(50%)'  ]],
        filterActive         : 'initial',

        '@keyframes enable'  : keyframesEnable,
        '@keyframes disable' : keyframesDisable,
        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animEnable           : [['300ms', 'ease-out', 'both', keyframesEnable ]],
        animDisable          : [['300ms', 'ease-out', 'both', keyframesDisable]],
        animActive           : [['150ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['300ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, { prefix: 'indi' });



// react components:

export interface IndicationProps
    extends
        AccessibilityProps
{
}
export interface IndicatorProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>,

        IndicationProps
{
}
export function Indicator<TElement extends HTMLElement = HTMLElement>(props: IndicatorProps<TElement>) {
    // styles:
    const sheet              = useIndicatorSheet();
    
    
    
    // states:
    const enableDisableState = useEnableDisableState(props);
    const activePassiveState = useActivePassiveState(props);
    
    
    
    // fn props:
    const propAccess         = usePropAccessibility(props);
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                enableDisableState.class,
                activePassiveState.class,
            ]}
            
            
            
            // Control::disabled:
            {...enableDisableState.props}
            
            
            
            // Check::checked:
            {...activePassiveState.props}
            
            
            
            // events:
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                enableDisableState.handleAnimationEnd(e);
                activePassiveState.handleAnimationEnd(e);
            }}
        >
            { props.children && <AccessibilityProvider {...propAccess}>
                { props.children }
            </AccessibilityProvider> }
        </Basic>
    );
}
export { Indicator as default }
