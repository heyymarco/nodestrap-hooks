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
    ButtonProps,
    Button,
}                           from './Button'



// react components:

export type { DropdownListItemProps, DropdownListItemProps as ItemProps }
export { DropdownListItem, DropdownListItem as Item }
export type { DropdownListCloseType }



export interface DropdownListButtonProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownListProps<TElement, TCloseType>,
        TogglerActiveProps<TCloseType>
{
    // accessibilities:
    label?          : string
    text?           : string
    
    
    // children:
    buttonChildren? : React.ReactNode
}
export function DropdownListButton<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListButtonProps<TElement, TCloseType>) {
    // states:
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        label,
        text,
        
        
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
            <Button
                // other props:
                {...(restProps as ButtonProps)}
                
                
                // essentials:
                elmRef={(elm) => {
                    setElmRef(buttonRef, elm);
                }}
                
                
                // accessibilities:
                {...{
                    label,
                    text,
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
            <DropdownList
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
            >
                { children }
            </DropdownList>
        </>
    );
}
DropdownListButton.prototype = DropdownList.prototype; // mark as DropdownList compatible
export { DropdownListButton as default }

export type { PopupPlacement, PopupModifier, PopupPosition }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
