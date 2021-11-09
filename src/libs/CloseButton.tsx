// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap components:
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    ButtonType,
    IconPosition,
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'



// react components:

export type { IconPosition }

export interface CloseButtonProps
    extends
        ButtonIconProps
{
}
export function CloseButton(props: CloseButtonProps) {
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
}
CloseButton.prototype = ButtonIcon.prototype; // mark as ButtonIcon compatible
export { CloseButton as default }

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType }
