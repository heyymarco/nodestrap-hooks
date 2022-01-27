// react:
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
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

// nodestrap utilities:
import {
    // utilities:
    setRef,
}                           from './utilities'
import {
    // hooks:
    Result as ValResult,
    usePropValidation,
    
    
    
    // react components:
    ValidationProps,
    ValidationProvider,
}                           from './validations'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from './Content'
import {
    // hooks:
    isValid,
    isInvalid,
    usesValidInvalidState,
    markValid,
    markInvalid,
    ValidatorHandler,
    useValidInvalidState,
}                           from './EditableControl'



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
            // because the value is needed immediately by `useValidInvalidState` at startup
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
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesFormVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesFormStates = () => {
    // dependencies:
    
    // states:
    const [validInvalid] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            validInvalid(),
        ]),
        ...states([
            isValid({
                ...imports([
                    markValid(),
                ]),
            }),
            isInvalid({
                ...imports([
                    markInvalid(),
                ]),
            }),
        ]),
    });
};

export const useFormSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesFormLayout(),
            
            // variants:
            usesFormVariants(),
            
            // states:
            usesFormStates(),
        ]),
    ),
], /*sheetId :*/'eqakn9c0py'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'frm' });



// react components:

export interface FormProps
    extends
        ContentProps<HTMLFormElement>,
        React.FormHTMLAttributes<HTMLFormElement>,
        
        ValidationProps
{
    // validations:
    customValidator? : CustomValidatorHandler
    
    
    // children:
    children?        : React.ReactNode
}
export function Form(props: FormProps) {
    // styles:
    const sheet             = useFormSheet();
    
    
    
    // states:
    const formValidator     = useFormValidator(props.customValidator);
    const validInvalidState = useValidInvalidState(props, formValidator.validator);
    
    
    
    // fn props:
    const propValidation    = usePropValidation(props);
    
    
    
    // jsx:
    return (
        <Content<HTMLFormElement>
            // other props:
            {...props}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'form'}
            semanticRole={props.semanticRole ?? 'form'}
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                validInvalidState.class,
            ]}
            
            
            // validations:
            elmRef={(elm) => {
                setRef(props.elmRef, elm);
                
                
                if (elm) {
                    formValidator.handleInit(elm);
                } // if
            }}
            onChange={(e) => { // watch change event bubbling from children
                props.onChange?.(e);
                
                
                
                // validations:
                formValidator.handleChange(e.currentTarget);
            }}
            
            
            // events:
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // validations:
                validInvalidState.handleAnimationEnd(e);
            }}
        >
            { props.children && <ValidationProvider {...propValidation}>
                { props.children }
            </ValidationProvider> }
        </Content>
    );
}
export { Form as default }
