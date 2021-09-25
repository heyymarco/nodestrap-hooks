// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    ListgroupItemProps,
    ListgroupItem,
    
    ListgroupProps,
    Listgroup,
}                           from './Listgroup'
import Icon                 from './Icon'



// react components:

export interface NavItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItemProps<TElement>
{
}
export const NavItem = <TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) => {
    // jsx:
    return (
        <ListgroupItem
            // other props:
            {...props}
            
            
            // essentials:
            tag={props.tag ?? (props.href ? 'a' : undefined)}
            
            
            // accessibilities:
            aria-current={props['aria-current'] ?? (props.active ? 'page' : undefined)}
        />
    );
}
NavItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible

export type { NavItemProps as ItemProps }
export { NavItem as Item }

export const NavPrevItem = <TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) => {
    // jsx:
    return (
        <NavItem
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
export const NavNextItem = <TElement extends HTMLElement = HTMLElement>(props: NavItemProps<TElement>) => {
    // jsx:
    return (
        <NavItem
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
export {
    NavPrevItem as PrevItem,
    NavPrevItem as PrevPage,
    
    NavNextItem as NextItem,
    NavNextItem as NextPage,
}



export interface NavProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // accessibilities:
    label?       : string
}
export const Nav = <TElement extends HTMLElement = HTMLElement>(props: NavProps<TElement>) => {
    // rest props:
    const {
        // accessibilities:
        label,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Listgroup
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'nav'}
            
            
            // accessibilities:
            aria-label={label ?? 'Page navigation'}
            
            
            // layouts:
            orientation={props.orientation ?? 'inline'}
            
            
            // behaviors:
            actionCtrl={props.actionCtrl ?? true}
        >
            { props.children }
        </Listgroup>
    );
};
Nav.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Nav as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
