// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // utilities:
    isTypeOf,
}                           from './react-cssfn' // cssfn for react
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // react components:
    DropdownCloseType,
    
    DropdownElementProps,
    DropdownElement,
    
    DropdownProps,
    Dropdown,
}                           from './Dropdown'
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListProps,
    List,
}                           from './List'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'



// react components:

// ListItem => DropdownListItem
export type { ListItemProps, ListItemProps as DropdownListItemProps, ListItemProps as ItemProps }
export { ListItem, ListItem as DropdownListItem, ListItem as Item }



export type DropdownListCloseType = number|DropdownCloseType



export interface DropdownListElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownElementProps<TElement, TCloseType>,
        ListProps<TElement>
{
}
export function DropdownListElement<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListElementProps<TElement, TCloseType>) {
    // rest props:
    const {
        // behaviors:
        actionCtrl = true,
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    return (
        <List
            // other props:
            {...restProps}
            
            
            // behaviors:
            actionCtrl={actionCtrl}
        >
            {
                propEnabled
                ?
                (
                    children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                        isTypeOf(child, ListItem)
                        ?
                        (
                            ((child.props.enabled ?? true) && (child.props.actionCtrl ?? actionCtrl))
                            ?
                            <child.type
                                // other props:
                                {...child.props}
                                
                                
                                // essentials:
                                key={child.key ?? index}
                                
                                
                                // events:
                                onClick={(e) => {
                                    // backwards:
                                    child.props.onClick?.(e);
                                    
                                    
                                    
                                    if (!e.defaultPrevented) {
                                        onActiveChange?.(false, index as unknown as TCloseType);
                                        e.preventDefault();
                                    } // if
                                }}
                            />
                            :
                            child
                        )
                        :
                        (
                            actionCtrl
                            ?
                            <ListItem
                                // essentials:
                                key={index}
                                
                                
                                // events:
                                onClick={(e) => {
                                    if (!e.defaultPrevented) {
                                        onActiveChange?.(false, index as unknown as TCloseType);
                                        e.preventDefault();
                                    } // if
                                }}
                            >
                                { child }
                            </ListItem>
                            :
                            child
                        )
                    ))
                )
                :
                children
            }
        </List>
    );
}
DropdownListElement.prototype = DropdownElement.prototype; // mark as DropdownElement compatible



export interface DropdownListProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownProps<TElement, TCloseType>,
        ListProps<TElement>
{
}
export function DropdownList<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListProps<TElement, TCloseType>) {
    // rest props:
    const {
        // accessibilities:
        active,         // from accessibilities, removed
        inheritActive,  // from accessibilities, removed
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Dropdown<TElement, TCloseType>
            // other props:
            {...props}
        >
            <DropdownListElement<TElement, TCloseType>
                // other props:
                {...restProps}
            />
        </Dropdown>
    );
}
export { DropdownList as default }

export type { PopupPlacement, PopupModifier, PopupPosition }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
