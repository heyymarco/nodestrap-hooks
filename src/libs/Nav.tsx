// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // utilities:
    defineSemantic,
}                           from './react-cssfn' // cssfn for react
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItem,
    
    ListProps,
    List,
}                           from './List'
import Icon                 from './Icon'



// react components:

export interface NavItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListItemProps<TElement>
{
}
export function NavItem<TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) {
    // jsx:
    return (
        <ListItem<TElement>
            // other props:
            {...props}
            
            
            // essentials:
            tag={props.tag ?? (props.href ? 'a' : undefined)}
            
            
            // accessibilities:
            aria-current={props['aria-current'] ?? (props.active ? 'page' : undefined)}
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
            
            
            // accessibilities:
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
            
            
            // accessibilities:
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
    
    
    
    // fn props:
    const [tag, role] = defineSemantic(props, { preferredTag: 'nav', preferredRole: 'navigation' });
    
    
    
    // jsx:
    return (
        <List<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={tag}
            
            
            // accessibilities:
            role={role}
            
            
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

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
