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
    DropdownAction,
    
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

export type DropdownListCloseType = number|DropdownCloseType
export interface DropdownListAction<TDropdownListCloseType = DropdownListCloseType>
    extends
        DropdownAction<TDropdownListCloseType>
{
    // actions:
    onClose?  : (closeType: TDropdownListCloseType) => void
}



// ListItem => DropdownItem
export type { ListItemProps, ListItemProps as DropdownItemProps, ListItemProps as ItemProps }
export { ListItem, ListItem as DropdownItem, ListItem as Item }



interface DropdownListElementProps<TElement extends HTMLElement = HTMLElement, TDropdownListCloseType = DropdownListCloseType>
    extends
        DropdownElementProps<TElement, TDropdownListCloseType>,
        DropdownListAction<TDropdownListCloseType>,
        ListProps<TElement>
{
}
function DropdownListElement<TElement extends HTMLElement = HTMLElement, TDropdownListCloseType = DropdownListCloseType>(props: DropdownListElementProps<TElement, TDropdownListCloseType>) {
    // rest props:
    const {
        // behaviors:
        actionCtrl = true,
        
        
        // actions:
        onClose,
        
        
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
                                        onClose?.(index as unknown as TDropdownListCloseType);
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
                                        onClose?.(index as unknown as TDropdownListCloseType);
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



export interface DropdownListProps<TElement extends HTMLElement = HTMLElement, TDropdownListCloseType = DropdownListCloseType>
    extends
        DropdownProps<TElement, TDropdownListCloseType>,
        ListProps<TElement>
{
}
export function DropdownList<TElement extends HTMLElement = HTMLElement, TDropdownListCloseType = DropdownListCloseType>(props: DropdownListProps<TElement, TDropdownListCloseType>) {
    // jsx:
    return (
        <Dropdown<TElement, TDropdownListCloseType>
            // other props:
            {...props}
        >
            <DropdownListElement<TElement, TDropdownListCloseType>
                // other props:
                {...props}
            />
        </Dropdown>
    );
}
export { DropdownList as default }

export type { PopupPlacement, PopupModifier, PopupPosition }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
