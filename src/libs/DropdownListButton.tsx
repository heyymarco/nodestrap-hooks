// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
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
    
    DropdownListElementProps,
    DropdownListElement,
}                           from './DropdownList'
import {
    // react components:
    DropdownButtonProps,
    DropdownButton,
}                           from './DropdownButton'



// react components:

export type { DropdownListItemProps, DropdownListItemProps as ItemProps }
export { DropdownListItem, DropdownListItem as Item }



export type { DropdownListCloseType }



export interface DropdownListButtonProps<TCloseType = DropdownListCloseType>
    extends
        DropdownButtonProps<TCloseType>,
        
        DropdownListElementProps<HTMLButtonElement, TCloseType>
{
}
export function DropdownListButton<TCloseType = DropdownListCloseType>(props: DropdownListButtonProps<TCloseType>) {
    // rest props:
    const {
        // accessibilities:
        active,         // from accessibilities, removed
        inheritActive,  // from accessibilities, removed
        
        
        // children:
        children,       // delete
        
        
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
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <DropdownButton<TCloseType>
            // other props:
            {...props}
        >
            <DropdownListElement<HTMLElement, TCloseType>
                // other props:
                {...restProps}
            >
                { children }
            </DropdownListElement>
        </DropdownButton>
    );
}
DropdownListButton.prototype = DropdownButton.prototype; // mark as DropdownButton compatible
export { DropdownListButton as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
export type { OrientationName, OrientationVariant }

export type { ListStyle, ListVariant }
