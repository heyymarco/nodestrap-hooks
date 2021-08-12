// react (builds html using javascript):
import {
    default as React,
    createContext,
    useContext,
}                           from 'react'             // base technology of our nodestrap components



// defaults:
const _defaultEnableValidation  = true;
const _defaultIsValid           = undefined as (Result|undefined);

const _defaultInheritValidation = true;



// validation results:

/**
 * Validation was skipped because its not required. Neither success nor error shown.
 */
export type Uncheck = null
/**
 * Validation was failed because the value did not meet the criteria.
 */
export type Error   = false
/**
 * Validation was successful and the value meet the criteria.
 */
export type Success = true
export type Result  = Uncheck|Error|Success;



// contexts:

/**
 * Contains validation props.
 */
export interface Validation {
    /**
     * `true`      : validation is enabled  - implements `isValid` prop.  
     * `false`     : validation is disabled - equivalent as `isValid = null` (uncheck).
     */
    enableValidation  : boolean

    /**
     * `undefined` : *automatic* detect valid/invalid state.  
     * `null`      : force validation state to *uncheck*.  
     * `true`      : force validation state to *valid*.  
     * `false`     : force validation state to *invalid*.
     */
    isValid?          : Result
}

/**
 * A react context for validation stuff.
 */
export const Context = createContext<Validation>(/*defaultValue :*/{
    enableValidation  : _defaultEnableValidation,
    isValid           : _defaultIsValid,
});
Context.displayName  = 'Validation';



// hooks:

export function usePropValidation(props: ValidationProps): Validation {
    // contexts:
    const valContext = useContext(Context);



    const inheritValidation : boolean = (props.inheritValidation ?? _defaultInheritValidation);
    const enableValidation = (
        (
            inheritValidation
            ?
            valContext.enableValidation // inherit
            :
            true                        // independent
        )
        &&
        (props.enableValidation ?? _defaultEnableValidation)
    );
    const isValid = ((): Result|undefined => {
        if (!enableValidation) return null; // if validation was disabled => treat validity as `uncheck` (null)

        
        
        const contextIsValid = (
            inheritValidation
            ?
            valContext.isValid          // inherit
            :
            undefined                   // independent
        );
        if (contextIsValid !== undefined) return contextIsValid; // if the context's validity was set other than `auto` (undefined) => use it
        
        
        
        return props.isValid;                                    // otherwise => use the component's validity
    })();
    return {
        enableValidation : enableValidation,
        isValid          : isValid,
    };
}



// react components:

export interface ValidationProps
{
    /**
     * `undefined` : same as `true`.  
     * `true`      : validation is enabled  - implements `isValid` prop.  
     * `false`     : validation is disabled - equivalent as `isValid = null` (uncheck).
     */
    enableValidation?  : boolean

    /**
     * `undefined` : *automatic* detect valid/invalid state.  
     * `null`      : force validation state to *uncheck*.  
     * `true`      : force validation state to *valid*.  
     * `false`     : force validation state to *invalid*.
     */
    isValid?           : Result

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `enableValidation` & `isValid` from parent (`ValidationProvider` context).  
     * `false`     : independent `enableValidation` & `isValid`.
     */
    inheritValidation? : boolean



    // children:
    children?          : React.ReactNode
}
export default function ValidationProvider(props: ValidationProps) {
    return (
        <Context.Provider value={{
            enableValidation : props.enableValidation ?? _defaultEnableValidation,
            isValid          : props.isValid,
        }}>
            {props.children}
        </Context.Provider>
    );
}
export { ValidationProvider }