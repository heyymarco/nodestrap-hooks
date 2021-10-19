// react (builds html using javascript):
import {
    default as React,
    useRef,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    setRef,
}                           from './react-cssfn' // cssfn for react
import type {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from './Basic'
import {
    // hooks:
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // react components:
    DropdownCloseType,
    
    DropdownProps,
    Dropdown,
}                           from './Dropdown'
import {
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'



// react components:

export type { DropdownCloseType }



export interface DropdownButtonProps<TCloseType = DropdownCloseType>
    extends
        ButtonIconProps,
        TogglerActiveProps<TCloseType>,
        
        DropdownProps<HTMLButtonElement, TCloseType>
{
    // layouts:
    buttonOrientation? : OrientationName
    
    
    // accessibilities:
    label?          : string
    
    
    // children:
    buttonChildren? : React.ReactNode
}
export function DropdownButton<TCloseType = DropdownCloseType>(props: DropdownButtonProps<TCloseType>) {
    // states:
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        label,
        
        
        // layouts:
        orientation       = 'block',
        buttonOrientation = (orientation === 'inline') ? 'block' : 'inline',
        
        
        // appearances:
        icon         = (() => { // from IconProps
            switch (orientation) {
                // todo: detect LTR or RTL
                case 'inline' :
                    return 'dropright';
                
                case 'block'  :
                default       :
                    return 'dropdown';
            } // switch
        })(),
        iconPosition = 'end',   // from IconProps
        
        
        // children:
        children,
        buttonChildren,
    ...restProps} = props;
    const {
        // essentials:
        tag,            // delete
        style,          // delete
        
        
        // identifiers:
        id,             // delete
        
        
        // accessibilities:
        role,           // delete
        
        
        // classes:
        mainClass,      // delete
        classes,        // delete
        variantClasses, // delete
        stateClasses,   // delete
    ...restDropdownProps} = restProps;
    
    
    
    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    }
    
    
    
    // dom effects:
    const buttonRef = useRef<HTMLButtonElement|null>(null);
    
    
    
    // jsx:
    return (
        <>
            <ButtonIcon
                // other props:
                {...restProps}
                
                
                // essentials:
                elmRef={(elm) => {
                    setRef(elmRef, elm);
                    setRef(buttonRef, elm);
                }}
                
                
                // accessibilities:
                {...{
                    label,
                }}
                
                
                // layouts:
                orientation={buttonOrientation}
                
                
                // appearances:
                {...{
                    icon,
                    iconPosition,
                }}
                
                
                
                // children:
                children={buttonChildren}
                
                
                // events:
                onClick={(e) => {
                    props.onClick?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                }}
            />
            <Dropdown<HTMLElement, TCloseType>
                // other props:
                {...restDropdownProps}
                
                
                // popups:
                targetRef={props.targetRef ?? buttonRef}
                
                
                // accessibilities:
                active={isActive}
                onActiveChange={(newActive, closeType) => {
                    if (onActiveChange) { // controllable
                        onActiveChange(newActive, closeType as unknown as TCloseType);
                    }
                    else { // uncontrollable
                        setActive(newActive);
                    } // if
                }}
                
                
                // layouts:
                orientation={orientation}
            >
                { children }
            </Dropdown>
        </>
    );
}
DropdownButton.prototype = ButtonIcon.prototype; // mark as ButtonIcon compatible
export { DropdownButton as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
export type { OrientationName, OrientationVariant }
