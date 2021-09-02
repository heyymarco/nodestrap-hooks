// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // hooks:
    ChkStyle,
    VariantCheck,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from './Check'



// react components:

export interface RadioProps
    extends
        CheckProps
{
}
export const Radio = (props: RadioProps) => {
    // jsx:
    return (
        <Check
            // other props:
            {...props}
            
            
            // formats:
            type={props.type ?? 'radio'}
        />
    );
};
export { Radio as default }

export type { ChkStyle, VariantCheck }
