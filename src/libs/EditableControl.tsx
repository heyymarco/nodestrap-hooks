// react (builds html using javascript):
import {
    default as React,
    useState,
    useEffect,
    useRef,
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
    usesThemeImpt,
    usesBackg,
    usesAnim,
}                           from './BasicComponent'
import {
    // styles:
    usesControl,
    
    
    
    // react components:
    ControlProps,
    Control,
}                           from './Control'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'
import {
    // hooks:
    Result as ValResult,
    usePropValidation,
    
    
    
    // react components:
    ValidationProps,
}                           from './validations'
import {
    colors,
}                           from './colors'      // configurable colors & theming defs



// hooks:

// states:

//#region validInvalid
export interface ValidInvalidVars {
    animValidUnvalid     : any
    animInvalidUninvalid : any
}
const [validInvalidRefs, validInvalidDecls] = createCssVar<ValidInvalidVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerAnim(validInvalidRefs.animValidUnvalid);
    propsManager.registerAnim(validInvalidRefs.animInvalidUninvalid);
}

// .vald will be added after validating-animation done:
const selectorIsValided        =  '.vald'
// .val = programatically valid, :valid = user valid:
const selectorIsValidating     = ['.val',
                                  ':valid:not(.vald):not(.unval):not(.noval):not(.invd):not(.inv)']
// .unval will be added after loosing valid and will be removed after unvalidating-animation done:
const selectorIsUnvalidating   =  '.unval'
// if all above are not set => unvalided
// optionally use .noval to kill pseudo :valid:
const selectorIsUnvalided      = [':not(.vald):not(.val):not(:valid):not(.unval)',
                                  '.noval']

// .invd will be added after invalidating-animation done:
const selectorIsInvalided      =  '.invd'
// .inv = programatically invalid, :invalid = user invalid:
const selectorIsInvalidating   = ['.inv',
                                  ':invalid:not(.invd):not(.uninv):not(.noval):not(.vald):not(.val)']
// .uninv will be added after loosing invalid and will be removed after uninvalidating-animation done:
const selectorIsUninvalidating =  '.uninv'
// if all above are not set => uninvalided
// optionally use .noval to kill pseudo :invalid:
const selectorIsUninvalided    = [':not(.invd):not(.inv):not(:invalid):not(.uninv)',
                                  '.noval']

// if all above are not set => noValidation
// optionally use .noval to kill pseudo :valid & :invalid:
const selectorIsNoValidation   = [':not(.vald):not(.val):not(:valid):not(.unval)' +
                                  ':not(.invd):not(.inv):not(:invalid):not(.uninv)',
                                  '.noval']

export const isValided        = (styles: StyleCollection) => rule(selectorIsValided        , styles);
export const isValidating     = (styles: StyleCollection) => rule(selectorIsValidating     , styles);
export const isUnvalidating   = (styles: StyleCollection) => rule(selectorIsUnvalidating   , styles);
export const isUnvalided      = (styles: StyleCollection) => rule(selectorIsUnvalided      , styles);

export const isValid          = (styles: StyleCollection) => rule([selectorIsValidating    , selectorIsValided  ], styles);
export const isUnvalid        = (styles: StyleCollection) => rule([selectorIsUnvalidating  , selectorIsUnvalided], styles);

export const isInvalided      = (styles: StyleCollection) => rule(selectorIsInvalided      , styles);
export const isInvalidating   = (styles: StyleCollection) => rule(selectorIsInvalidating   , styles);
export const isUninvalidating = (styles: StyleCollection) => rule(selectorIsUninvalidating , styles);
export const isUninvalided    = (styles: StyleCollection) => rule(selectorIsUninvalided    , styles);

export const isInvalid        = (styles: StyleCollection) => rule([selectorIsInvalidating  , selectorIsInvalided  ], styles);
export const isUninvalid      = (styles: StyleCollection) => rule([selectorIsUninvalidating, selectorIsUninvalided], styles);

export const isNoValidation   = (styles: StyleCollection) => rule(selectorIsNoValidation   , styles);

/**
 * Uses valid & invalid states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents valid & invalid state definitions.
 */
export const usesValidInvalid = () => {
    // dependencies:
    const [, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            vars({
                [validInvalidDecls.animValidUnvalid]     : animRefs.animNone,
                [validInvalidDecls.animInvalidUninvalid] : animRefs.animNone,
            }),
            states([
                isValidating([
                    vars({
                        [validInvalidDecls.animValidUnvalid]     : cssProps.animValid,
                    }),
                ]),
                isUnvalidating([
                    vars({
                        [validInvalidDecls.animValidUnvalid]     : cssProps.animUnvalid,
                    }),
                ]),
                
                isInvalidating([
                    vars({
                        [validInvalidDecls.animInvalidUninvalid] : cssProps.animInvalid,
                    }),
                ]),
                isUninvalidating([
                    vars({
                        [validInvalidDecls.animInvalidUninvalid] : cssProps.animUninvalid,
                    }),
                ]),
            ]),
        ]),
        validInvalidRefs,
        validInvalidDecls,
    ] as const;
};

export const markValid = () => composition([
    imports([
        usesThemeValid(), // switch to valid theme
    ]),
]);
/**
 * Creates a conditional color definitions at valid state.
 * @param themeName The name of valid theme.
 * @returns A `StyleCollection` represents the conditional color definitions at valid state.
 */
export const usesThemeValid = (themeName: ThemeName = 'success') => usesThemeImpt(themeName);

export const markInvalid = () => composition([
    imports([
        usesThemeInvalid(), // switch to invalid theme
    ]),
]);
/**
 * Creates a conditional color definitions at invalid state.
 * @param themeName The name of invalid theme.
 * @returns A `StyleCollection` represents the conditional color definitions at invalid state.
 */
export const usesThemeInvalid = (themeName: ThemeName = 'danger') => usesThemeImpt(themeName);

export type EditableControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type ValidatorHandler       = () => ValResult
export type CustomValidatorHandler = (state: ValidityState, value: string) => ValResult
export const useInputValidator     = (customValidator?: CustomValidatorHandler) => {
    // states:
    let [isValid, setIsValid] = useState<ValResult>(null);


    
    const handleValidation = (target: EditableControlElement, immediately = false) => {
        const update = (validity: ValidityState, valuePrev?: string) => {
            const valueNow = target.value;
            if ((valuePrev !== undefined) && (valuePrev !== valueNow)) return; // the value has been modified during waiting => abort further validating
            

            
            // instantly update variable `isValid` without waiting state to refresh (re-render)
            // because the value is needed immediately by `useStateValidInvalid` at startup
            isValid = (customValidator ? customValidator(validity, valueNow) : validity.valid);
            setIsValid(isValid);
        };



        if (immediately) {
            // instant validate:
            update(target.validity);
        }
        else {
            const validity  = target.validity;
            const valuePrev = target.value;
        
            // delay a while for the further validating, to avoid unpleasant splash effect
            setTimeout(
                () => update(validity, valuePrev),
                (validity.valid !== false) ? 300 : 600
            );
        } // if
    }
    const handleInit = (target: EditableControlElement) => {
        handleValidation(target, /*immediately =*/true);
    }
    const handleChange = (target: EditableControlElement) => {
        handleValidation(target);
    }
    return {
        /**
         * Handles the validation result.
         * @returns  
         * `null`  = uncheck.  
         * `true`  = valid.  
         * `false` = invalid.
         */
        validator    : ((): ValResult => isValid) as ValidatorHandler,

        handleInit   : handleInit,
        handleChange : handleChange,
    };
};
export const useStateValidInvalid  = (props: ValidationProps, validator?: ValidatorHandler) => {
    // fn props:
    const propValidation = usePropValidation(props);
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);



    // defaults:
    const defaultValided: ValResult         = null; // if [isValid] was not specified => the default value is [isValid=null] (neither valid nor invalid)


    
    // states:
    const [valided,       setValided      ] = useState<ValResult|undefined>((): (ValResult|undefined) => {
        // if disabled or readOnly => no validation
        if (!propEnabled || propReadOnly)         return null;



        // use prop as the primary validator:
        if (propValidation.isValid !== undefined) return propValidation.isValid; // validity is set => set state to uncheck/valid/invalid

        
        
        // use input validator as secondary:
        if (validator)                            return undefined; // undefined means => evaluate the validator *at startup*

        
        
        // use default value as fallback:
        return defaultValided;
    });

    const [succAnimating, setSuccAnimating] = useState<boolean|null>(null); // null => no-succ-animation, true => succ-animation, false => unsucc-animation
    const [errAnimating,  setErrAnimating ] = useState<boolean|null>(null); // null => no-err-animation,  true => err-animation,  false => unerr-animation
    
    
    
    /*
     * state is set as [context and / or controllable] if [            validation is enabled] && [validity is set]
     * state is set as validator                       if [validator's validation is enabled] && [validator has loaded]
     * otherwise return undefined (represents no change needed)
     */
    const validFn = ((): (ValResult|undefined) => {
        // if disabled or readOnly => no validation
        if (!propEnabled || propReadOnly)         return null;



        // use prop as the primary validator:
        if (propValidation.isValid !== undefined) return propValidation.isValid; // validity is set => set state to uncheck/valid/invalid

        
        
        // use input validator as secondary:
        if ((valided !== undefined)) return (validator ? validator() : defaultValided); // if validator has loaded => evaluate the validator *now*

        
        
        // no change needed:
        return undefined;
    })();

    if ((validFn !== undefined) && (valided !== validFn)) { // change detected => apply the change & start animating
        setValided(validFn);   // remember the last change

        switch (validFn) {
            case true: // success
                // if was error => un-error:
                if (valided === false) setErrAnimating(false);  // start unerr-animation

                setSuccAnimating(true); // start succ-animation
                break;

            case false: // error
                // if was success => un-success:
                if (valided === true)  setSuccAnimating(false); // start unsucc-animation

                setErrAnimating(true);  // start err-animation
                break;
                
            case null: // uncheck
                // if was success => un-success:
                if (valided === true)  setSuccAnimating(false); // start unsucc-animation

                // if was error => un-error:
                if (valided === false) setErrAnimating(false);  // start unerr-animation
                break;
        } // switch
    }

    
    
    // watch the changes once (only at startup):
    useEffect(() => {
        if (valided === undefined) {
            // now validator has been loaded => re-*set the initial* state of `valided` with any values other than `undefined`
            // once set, this effect will never be executed again
            setValided(validator ? validator() : defaultValided);
        }
    }, [valided, validator]);

    
    
    const handleIdleSucc = () => {
        // clean up finished animation

        setSuccAnimating(null); // stop succ-animation/unsucc-animation
    }
    const handleIdleErr = () => {
        // clean up finished animation

        setErrAnimating(null);  // stop err-animation/unerr-animation
    }
    const noValidation = // causing the validFn *always* `null`:
        (!propEnabled || propReadOnly)
        ||
        (propValidation.isValid === null)
        ||
        (!validator);
    return {
        /**
         * `true`  : validating/valided
         * `false` : invalidating/invalided
         * `null`  : uncheck/unvalidating/uninvalidating
        */
        valid        : (valided ?? null) as ValResult,
        noValidation : noValidation,

        class: [
            // valid classes:
            ((): string|null => {
                if (succAnimating === true)  return   'val';
                if (succAnimating === false) return 'unval';
    
                if (valided === true)        return   'vald';
    
                return null;
            })(),



            // invalid classes:
            ((): string|null => {
                if (errAnimating === true)   return   'inv';
                if (errAnimating === false)  return 'uninv';
    
                if (valided === false)       return   'invd';
    
                return null;
            })(),



            // neutral classes:
            ((): string|null => {
                if (valided === null) {
                    // if (noValidation) {
                    //     return 'noval'; // validation_disabled by controllable prop => use class .noval to kill [:valid || :invalid]
                    // }
                    // else {
                    //     return null; // discard all classes above
                    // } // if

                    return 'noval';
                } // if
    
                return null;
            })(),
        ].filter((c) => !!c).join(' ') || undefined,
        
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling

            if (/((?<![a-z])(valid|unvalid)|(?<=[a-z])(Valid|Unvalid))(?![a-z])/.test(e.animationName)) {
                handleIdleSucc();
            }
            else if (/((?<![a-z])(invalid|uninvalid)|(?<=[a-z])(Invalid|Uninvalid))(?![a-z])/.test(e.animationName)) {
                handleIdleErr();
            }
        },
    };
};
//#endregion validInvalid



// styles:
export const usesEditableControl = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // states:
    const [validInvalid] = usesValidInvalid();
    
    
    
    return composition([
        imports([
            // bases:
            usesControl(),
            
            // layouts:
            sizes(),
            
            // states:
            validInvalid(),
        ]),
        layout({
            // accessibility:
            userSelect : 'none', // disable selecting text (double clicking not causing selecting text)
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        states([
            isValid([
                imports([
                    markValid(),
                ]),
            ]),
            isInvalid([
                imports([
                    markInvalid(),
                ]),
            ]),
        ]),
    ]);
}
export const useEditableControlSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesEditableControl(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, {backg}] = usesBackg();
    
    
    
    //#region keyframes
    const keyframesValid     : PropEx.Keyframes = {
        from : {
            backg: colors.success,
        },
        to   : {
            backg: backg,
        },
    };
    const keyframesUnvalid   : PropEx.Keyframes = {};
    
    
    
    const keyframesInvalid   : PropEx.Keyframes = {
        from : {
            backg: colors.danger,
        },
        to   : {
            backg: backg,
        },
    };
    const keyframesUninvalid : PropEx.Keyframes = {};
    //#endregion keyframes
    
    
    
    return {
        //#region animations
        '@keyframes valid'     : keyframesValid,
        '@keyframes unvalid'   : keyframesUnvalid,
        '@keyframes invalid'   : keyframesInvalid,
        '@keyframes uninvalid' : keyframesUninvalid,
        animValid              : [['1000ms', 'ease-out', 'both', keyframesValid    ]],
        animUnvalid            : [[ '100ms', 'ease-out', 'both', keyframesUnvalid  ]],
        animInvalid            : [['1000ms', 'ease-out', 'both', keyframesInvalid  ]],
        animUninvalid          : [[ '100ms', 'ease-out', 'both', keyframesUninvalid]],
        //#endregion animations
    };
}, { prefix: 'edit' });



// react components:

export interface EditableControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        ControlProps<TElement>,

        ValidationProps
{
    // identifiers:
    name?            : string


    // values:
    defaultValue?    : string | number | ReadonlyArray<string>
    value?           : string | number | ReadonlyArray<string>
    

    // validations:
    customValidator? : CustomValidatorHandler
    required?        : boolean
}
export const EditableControl = <TElement extends EditableControlElement = EditableControlElement>(props: EditableControlProps<TElement>) => {
    // styles:
    const sheet          = useEditableControlSheet();

    
    
    // states:
    const inputValidator = useInputValidator(props.customValidator);
    const stateValInval  = useStateValidInvalid(props, inputValidator.validator);


    
    // jsx:
    const inputRef       = useRef<TElement|null>(null);
    return (
        <Control<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateValInval.class,
            ]}


            // validations:
            elmRef={(elm) => {
                if (elm) {
                    if (elm.validity) {
                        inputRef.current = elm;
                    }
                    else {
                        const firstChild = elm.querySelector('input,select,textarea');
                        if (firstChild) inputRef.current = firstChild as TElement;
                    } // if

                    if (inputRef.current) inputValidator.handleInit(inputRef.current);
                } // if


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                    } // if
                } // if
            }}
            onChange={(e) => { // watch change event from current element or bubbling from children
                // validations:
                if (inputRef.current) inputValidator.handleChange(inputRef.current);


                // forwards:
                props.onChange?.(e);
            }}
        

            // events:
            onAnimationEnd={(e) => {
                // validations:
                stateValInval.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
};
export { EditableControl as default }
