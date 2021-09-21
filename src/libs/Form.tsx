// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    
    
    
    // rules:
    states,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
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
    
    
    
    // styles:
    usesBasicComponentLayout,
    usesBasicComponentVariants,
    
    
    
    // react components:
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
}                           from './Content'
import {
    // hooks:
    isValid,
    isInvalid,
    usesValidInvalid,
    markValid,
    markInvalid,
    ValidatorHandler,
    useStateValidInvalid,
}                           from './EditableControl'
import {
    // hooks:
    Result as ValResult,
    usePropValidation,
    
    
    
    // react components:
    ValidationProps,
    ValidationProvider,
}                           from './validations'



// hooks:

// states:

//#region validInvalid
export type CustomValidatorHandler = (isValid: ValResult) => ValResult
export const useFormValidator      = (customValidator?: CustomValidatorHandler) => {
    // states:
    let [isValid, setIsValid] = useState<ValResult>(null);
    
    
    
    const handleValidation = (target: HTMLFormElement, immediately = false) => {
        const getIsValid = (): ValResult => target.matches(':valid') ? true : (target.matches(':invalid') ? false : null);
        
        
        
        const update = (validPrev?: ValResult) => {
            const validNow = getIsValid();
            if ((validPrev !== undefined) && (validPrev !== validNow)) return; // the validity has been modified during waiting => abort further validating
            
            
            
            // instantly update variable `isValid` without waiting state to refresh (re-render)
            // because the value is needed immediately by `useStateValidInvalid` at startup
            isValid = (customValidator ? customValidator(validNow) : validNow);
            setIsValid(isValid);
        };
        
        
        
        if (immediately) {
            // instant validate:
            update();
        }
        else {
            const validPrev = getIsValid();
            
            // delay a while for the further validating, to avoid unpleasant splash effect
            setTimeout(
                () => update(validPrev),
                (validPrev !== false) ? 300 : 600
            );
        } // if
    }
    const handleInit = (target: HTMLFormElement) => {
        handleValidation(target, /*immediately =*/true);
    }
    const handleChange = (target: HTMLFormElement) => {
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
//#endregion validInvalid



// styles:
export const usesFormLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicComponentLayout(),
            usesContentLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesFormVariants = () => {
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
            usesBasicComponentVariants(),
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesFormStates = () => {
    // dependencies:
    
    // states:
    const [validInvalid] = usesValidInvalid();
    
    
    
    return composition([
        imports([
            // states:
            validInvalid(),
        ]),
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
};
export const usesForm = () => {
    return composition([
        imports([
            // layouts:
            usesFormLayout(),
            
            // variants:
            usesFormVariants(),
            
            // states:
            usesFormStates(),
        ]),
    ]);
};

export const useFormSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesForm(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'frm' });



// react components:

export interface FormProps
    extends
        BasicComponentProps<HTMLFormElement>,
        React.FormHTMLAttributes<HTMLFormElement>,
        
        ValidationProps
{
    // validations:
    customValidator? : CustomValidatorHandler
    
    
    // children:
    children?        : React.ReactNode
}
export const Form = (props: FormProps) => {
    // styles:
    const sheet          = useFormSheet();
    
    
    
    // states:
    const formValidator  = useFormValidator(props.customValidator);
    const stateValInval  = useStateValidInvalid(props, formValidator.validator);
    
    
    
    // fn props:
    const propValidation = usePropValidation(props);
    
    
    
    // jsx:
    return (
        <BasicComponent<HTMLFormElement>
            // other props:
            {...props}
            
            
            // essentials:
            tag={props.tag ?? 'form'}
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateValInval.class,
            ]}
            
            
            // validations:
            elmRef={(elm) => {
                if (elm) {
                    formValidator.handleInit(elm);
                } // if
                
                
                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<HTMLFormElement|null>).current = elm;
                    } // if
                } // if
            }}
            onChange={(e) => { // watch change event bubbling from children
                // validations:
                formValidator.handleChange(e.currentTarget);
                
                
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
        >
            { props.children && <ValidationProvider {...propValidation}>
                { props.children }
            </ValidationProvider> }
        </BasicComponent>
    );
};
export { Form as default }
