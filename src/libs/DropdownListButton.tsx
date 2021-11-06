// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // general types:
    Tag,
    Role,
    SemanticTag,
    SemanticRole,
}                           from './react-cssfn' // cssfn for react
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ListStyle,
    ListVariant,
    
    
    
    // utilities:
    calculateSemanticRole,
    
    
    
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
    listTag?          : Tag
    listRole?         : Role
    listSemanticTag?  : SemanticTag
    listSemanticRole? : SemanticRole
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
        listSemanticTag,
        listSemanticRole,
        
        tag,            // delete, replace with: listTag
        role,           // delete, replace with: listRole
        semanticTag,    // delete, replace with: listSemanticTag
        semanticRole,   // delete, replace with: listSemanticRole
        
        
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
            dropdownSemanticTag={props.dropdownSemanticTag   ?? [null]                      }
            dropdownSemanticRole={props.dropdownSemanticRole ?? calculateSemanticRole(props)}
        >
            <DropdownListElement<HTMLElement, TCloseType>
                // other props:
                {...restProps}
                
                
                // semantics:
                tag ={listTag }
                role={listRole}
                semanticTag ={listSemanticTag }
                semanticRole={listSemanticRole}
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
