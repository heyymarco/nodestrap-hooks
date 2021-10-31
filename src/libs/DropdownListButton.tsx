// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // general types:
    Tag,
    Role,
    PreferredTag,
    PreferredRole,
}                           from './react-cssfn' // cssfn for react
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
    
    
    
    // utilities:
    calculatePreferredRole,
    
    
    
    // react components:
    DropdownListCloseType,
    
    DropdownListItemProps,
    DropdownListItem,
    
    DropdownListSeparatorItem,
    
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



export { DropdownListSeparatorItem, DropdownListSeparatorItem as SeparatorItem }



export type { DropdownListCloseType }



export interface DropdownListButtonProps<TCloseType = DropdownListCloseType>
    extends
        DropdownButtonProps<TCloseType>,
        
        DropdownListElementProps<HTMLButtonElement, TCloseType>
{
    // semantics:
    listTag?           : Tag
    listRole?          : Role
    listPreferredTag?  : PreferredTag
    listPreferredRole? : PreferredRole
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
        style,          // delete
        
        
        // semantics:
        listTag,
        listRole,
        listPreferredTag,
        listPreferredRole,
        
        tag,            // delete, replace with: listTag
        role,           // delete, replace with: listRole
        preferredTag,   // delete, replace with: listPreferredTag
        preferredRole,  // delete, replace with: listPreferredRole
        
        
        // identifiers:
        id,             // delete
        
        
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
            
            
            // semantics:
            dropdownPreferredTag={props.dropdownPreferredTag   ?? [null]                       }
            dropdownPreferredRole={props.dropdownPreferredRole ?? calculatePreferredRole(props)}
        >
            <DropdownListElement<HTMLElement, TCloseType>
                // other props:
                {...restProps}
                
                
                // semantics:
                tag={listTag}
                role={listRole}
                preferredTag={listPreferredTag}
                preferredRole={listPreferredRole}
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
