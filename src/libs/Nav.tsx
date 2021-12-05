// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap components:
import Icon                 from './Icon'
import {
    // hooks:
    CurrentActiveProps,
    useCurrentActive,
}                           from './NavButton'
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItem,
    
    ListProps,
    List,
}                           from './List'



// re-exports:
export type { CurrentActiveProps }
export { useCurrentActive }



// react components:

export interface NavItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListItemProps<TElement>,
        CurrentActiveProps
{
}
export function NavItem<TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) {
    // rest props:
    const {
        // accessibilities:
        active,
    ...restProps} = props;
    
    
    
    // fn props:
    const activeDn = useCurrentActive(props);
    const activeFn = active ?? activeDn;
    
    
    
    // jsx:
    return (
        <ListItem<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            aria-current={props['aria-current'] ?? (activeFn ? 'page' : undefined)}
            
            
            // accessibilities:
            active={activeFn}
        />
    );
}
NavItem.prototype = ListItem.prototype; // mark as ListItem compatible

export type { NavItemProps as ItemProps }
export { NavItem as Item }

export function NavPrevItem<TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) {
    // jsx:
    return (
        <NavItem<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            aria-label={props['aria-label'] ?? 'Previous'}
        >
            {
                props.children
                ??
                <Icon
                    // appearances:
                    icon='prev'
                    
                    
                    // variants:
                    size='1em'
                />
            }
        </NavItem>
    );
}
export function NavNextItem<TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) {
    // jsx:
    return (
        <NavItem<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            aria-label={props['aria-label'] ?? 'Next'}
        >
            {
                props.children
                ??
                <Icon
                    // appearances:
                    icon='next'
                    
                    
                    // variants:
                    size='1em'
                />
            }
        </NavItem>
    );
}
NavPrevItem.prototype = NavItem.prototype; // mark as NavItem compatible
NavNextItem.prototype = NavItem.prototype; // mark as NavItem compatible
export {
    NavPrevItem as PrevItem,
    NavPrevItem as PrevPage,
    
    NavNextItem as NextItem,
    NavNextItem as NextPage,
}



// ListSeparatorItem => NavSeparatorItem
export { ListSeparatorItem, ListSeparatorItem as NavSeparatorItem, ListSeparatorItem as SeparatorItem }



export interface NavProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListProps<TElement>
{
    // accessibilities:
    label?       : string
}
export function Nav<TElement extends HTMLElement = HTMLElement>(props: NavProps<TElement>) {
    // rest props:
    const {
        // accessibilities:
        label,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <List<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'nav'       }
            semanticRole={props.semanticRole ?? 'navigation'}
            
            
            // layouts:
            orientation={props.orientation ?? 'inline'}
            
            
            // behaviors:
            actionCtrl={props.actionCtrl ?? true}
        >
            { props.children }
        </List>
    );
}
Nav.prototype = List.prototype; // mark as List compatible
export { Nav as default }

export type { OrientationName, OrientationVariant }

export type { ListStyle, ListVariant }
