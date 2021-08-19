// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import type {
    Optional,
    Factory,
}                           from './types'       // cssfn's types
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
    createUseCssfnStyle,
    
    
    
    // react components:
    ElementProps,
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
    SizeName,
    usesSizes,
    themeIf,
    outlinedOf,
    mildOf,
    usesAnim,
    
    usesBasicComponent,
    
    
    
    // react components:
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    // hooks:
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



// hooks:

// states:

//#region enableDisable
export interface EnableDisableVars {
    filterEnableDisable : any
    animEnableDisable   : any
}
const [enableDisableRefs, enableDisableDecls] = createCssVar<EnableDisableVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(enableDisableRefs.filterEnableDisable);
    propsManager.registerAnim(enableDisableRefs.animEnableDisable);
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
export const isEnablingDisable = (styles: StyleCollection) => rule([selectorIsEnabling, selectorIsDisabling, selectorIsDisabled], styles);

export const usesEnableDisable = () => {
    // dependencies:
    const [, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            vars({
                [enableDisableDecls.filterEnableDisable] : animRefs.filterNone,
                [enableDisableDecls.animEnableDisable]   : animRefs.animNone,
            }),
            states([
                isEnabling([
                    vars({
                        [enableDisableDecls.filterEnableDisable] : cssProps.filterDisable,
                        [enableDisableDecls.animEnableDisable]   : cssProps.animEnable,
                    }),
                ]),
                isDisabling([
                    vars({
                        [enableDisableDecls.filterEnableDisable] : cssProps.filterDisable,
                        [enableDisableDecls.animEnableDisable]   : cssProps.animDisable,
                    }),
                ]),
                isDisabled([
                    vars({
                        [enableDisableDecls.filterEnableDisable] : cssProps.filterDisable,
                    }),
                ]),
            ]),
        ]),
        enableDisableRefs,
        enableDisableDecls,
    ] as const;
};

export function useStateEnableDisable(props: IndicationProps & ElementProps) {
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
}
//#endregion enableDisable

//#region activePassive
export interface ActivePassiveVars {
    filterActivePassive : any
    animActivePassive   : any
}
const [activePassiveRefs, activePassiveDecls] = createCssVar<ActivePassiveVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(activePassiveRefs.filterActivePassive);
    propsManager.registerAnim(activePassiveRefs.animActivePassive);
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
export const isActivePassivating = (styles: StyleCollection) => rule([selectorIsActivating , selectorIsActived, selectorIsPassivating], styles);

export const usesActivePassive = (onActive: (Optional<Factory<StyleCollection>>) = markActive) => {
    // dependencies:
    const [, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            vars({
                [activePassiveDecls.filterActivePassive] : animRefs.filterNone,
                [activePassiveDecls.animActivePassive]   : animRefs.animNone,
            }),
            states([
                isActived([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                    }),
                ]),
                isActivating([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                        [activePassiveDecls.animActivePassive]   : cssProps.animActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                        [activePassiveDecls.animActivePassive]   : cssProps.animPassive,
                    }),
                ]),
                
                isActive(onActive?.()),
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
        
        themeActive(),     // switch to active theme
    ]),
]);
/**
 * Creates a conditional color definitions at active state.
 * @returns A `StyleCollection` represents the conditional color definitions at active state.
 */
export const themeActive = () => themeIf('secondary');

export function useStateActivePassive(props: IndicationProps & ElementProps, activeDn?: boolean) {
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
}

export interface TogglerActiveProps
    extends
        IndicationProps
{
    // accessibility:
    defaultActive?  : boolean
    onActiveChange? : (active: boolean) => void
}
export function useTogglerActive(props: TogglerActiveProps, changeEventTarget?: (React.RefObject<HTMLInputElement>|null)): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    // fn props:
    const propAccess   = usePropAccessibility<boolean, boolean, null>(props, undefined, undefined, null);
    const propEnabled  = propAccess.enabled;
    const propReadOnly = propAccess.readOnly;
    const propActive   = propAccess.active;



    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false); // uncontrollable (dynamic) state: true => user activate, false => user deactivate



    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = propActive /*controllable*/ ?? activeTg /*uncontrollable*/;



    const setActive: React.Dispatch<React.SetStateAction<boolean>> = (newActive) => {
        if (!propEnabled) return; // control is disabled => no response required
        if (propReadOnly) return; // control is readOnly => no response required

        
        
        const newActiveValue = (typeof newActive === 'function') ? newActive(activeFn) : newActive;
        if (newActiveValue === activeFn) return; // no change needed

        
        
        if (propActive === null) { // controllable [active] is set => no uncontrollable required, otherwise do it
            setActiveTg(newActiveValue); // set dynamic (uncontrollable)
        } // if
        
        
        
        // fire change event:
        props.onActiveChange?.(newActiveValue); // notify changed -or- request to change
        
        
        
        // fire change event:
        if (changeEventTarget?.current) {
            changeEventTarget.current.checked = newActiveValue;
            triggerChange(changeEventTarget.current);
        } // if
    };
    return [
        activeFn,
        setActive,
    ];
}
//#endregion activePassive



// styles:
export const usesIndicator = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName: SizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // states:
    const [enableDisable] = usesEnableDisable();
    const [activePassive] = usesActivePassive();
    
    
    
    return composition([
        imports([
            // base:
            usesBasicComponent(),
            
            // layouts:
            sizes(),
            
            // states:
            enableDisable(),
            activePassive(),
        ]),
        layout({
            // layouts:
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
}
export const useIndicatorSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesIndicator(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const filters = propsManager.filters();
    
    const [, {filterEnableDisable}] = usesEnableDisable();
    const [, {filterActivePassive}] = usesActivePassive();
    
    
    
    const keyframesDisable : PropEx.Keyframes = {
        from : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterEnableDisable)),

             // filterEnableDisable, // missing the last => let's the browser interpolated it
            ]],
        },
        to   : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterEnableDisable)),

                filterEnableDisable, // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesEnable  : PropEx.Keyframes = {
        from : keyframesDisable.to,
        to   : keyframesDisable.from,
    };
    
    
    
    const keyframesActive  : PropEx.Keyframes = {
        from : {
            // foreg       : fallbacks(outlinedRefs.foregOutlinedTg, mildRefs.foregMildTg,  foregRefs.foregFn),
            // backg       : fallbacks(outlinedRefs.backgOutlinedTg, mildRefs.backgMildTg,  backgRefs.backgFn),
            // borderColor : fallbacks(outlinedRefs.foregOutlinedTg,                       borderRefs.borderFn),

            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterActivePassive)),

             // filterActivePassive, // missing the last => let's the browser interpolated it
            ]],
        },
        to   : {
            // foreg       : foregRefs.foregFn,
            // backg       : backgRefs.backgFn,
            // borderColor : borderRefs.borderFn,

            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterActivePassive)),

                filterActivePassive, // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesPassive : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };
    
    
    
    return {
        //#region animations
        filterDisable        : [['grayscale(50%)',  'opacity(50%)'  ]],
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
        BasicComponentProps<TElement>,

        IndicationProps
{
}
export default function Indicator<TElement extends HTMLElement = HTMLElement>(props: IndicatorProps<TElement>) {
    // styles:
    const sheet        = useIndicatorSheet();
    
    
    
    // states:
    const stateEnbDis  = useStateEnableDisable(props);
    const stateActPass = useStateActivePassive(props);
    
    
    
    // fn props:
    const propAccess   = usePropAccessibility(props);
    
    
    
    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateEnbDis.class,
                stateActPass.class,
            ]}
            
            
            
            // Control::disabled:
            {...stateEnbDis.props}
            
            
            
            // Check::checked:
            {...stateActPass.props}
            
            
            
            // events:
            onAnimationEnd={(e) => {
                // states:
                stateEnbDis.handleAnimationEnd(e);
                stateActPass.handleAnimationEnd(e);
                
                
                
                // forwards:
                props.onAnimationEnd?.(e);
            }}
        >
            { props.children && <AccessibilityProvider {...propAccess}>
                { props.children }
            </AccessibilityProvider> }
        </BasicComponent>
    );
}
export { Indicator }
