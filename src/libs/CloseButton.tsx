// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    ButtonType,
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'



// react components:

export interface CloseButtonProps
    extends
        ButtonIconProps
{
}
export const CloseButton = (props: CloseButtonProps) => {
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...props}
            
            
            // accessibilities:
            label={props.label ?? 'Close'}
            
            
            // appearances:
            icon={props.icon ?? 'close'}
            
            
            // variants:
            btnStyle={props.btnStyle ?? 'icon'}
        />
    );
};
CloseButton.prototype = ButtonIcon.prototype; // mark as ButtonIcon compatible
export { CloseButton as default }

export type { OrientationName, OrientationVariant }
export type { ButtonStyle, ButtonVariant, ButtonType }
