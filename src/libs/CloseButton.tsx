// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // hooks:
    OrientationName,
    VariantOrientation,
    
    BtnStyle,
    VariantButton,
    
    
    
    // react components:
    BtnType,
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

export type { OrientationName, VariantOrientation }
export type { BtnStyle, VariantButton, BtnType }
