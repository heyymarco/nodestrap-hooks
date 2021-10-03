// react (builds html using javascript):
import {
    default as React,
    useRef,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    setElmRef,
}                           from './react-cssfn' // cssfn for react
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
    
    
    
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    DropdownListCloseType,
    
    DropdownListItemProps,
    DropdownListItem,
    
    DropdownListProps,
    DropdownList,
}                           from './DropdownList'
import {
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'



// react components:

export type { DropdownListItemProps, DropdownListItemProps as ItemProps }
export { DropdownListItem, DropdownListItem as Item }
export type { DropdownListCloseType }



export interface DropdownListButtonProps<TCloseType = DropdownListCloseType>
    extends
        DropdownListProps<HTMLButtonElement, TCloseType>,
        TogglerActiveProps<TCloseType>,
        
        ButtonIconProps
{
    // accessibilities:
    label?          : string
    
    
    // children:
    buttonChildren? : React.ReactNode
}
export function DropdownListButton<TCloseType = DropdownListCloseType>(props: DropdownListButtonProps<TCloseType>) {
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
        orientation  = 'inline',
        
        
        // appearances:
        icon         = 'face', // from IconProps
        iconPosition = 'end',  // from IconProps
        
        
        // children:
        children,
        buttonChildren,
    ...restProps} = props;
    
    
    
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
                    setElmRef(elmRef, elm);
                    setElmRef(buttonRef, elm);
                }}
                
                
                // accessibilities:
                {...{
                    label,
                }}
                
                
                // layouts:
                orientation={orientation}
                
                
                // appearances:
                {...{
                    icon,
                    iconPosition,
                }}
                
                
                
                // children:
                children={buttonChildren}
                
                
                // events:
                onClick={(e) => {
                    if (!e.defaultPrevented) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                }}
            />
            <DropdownList<HTMLElement, TCloseType>
                // other props:
                {...restProps}
                
                
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
                orientation={(orientation === 'inline') ? 'block' : 'inline'}
            >
                { children }
            </DropdownList>
        </>
    );
}
DropdownListButton.prototype = ButtonIcon.prototype; // mark as ButtonIcon compatible
export { DropdownListButton as default }

export type { PopupPlacement, PopupModifier, PopupPosition }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
