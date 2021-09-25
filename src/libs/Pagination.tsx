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



// react components:

export interface PaginationItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItemProps<TElement>
{
}
export const PaginationItem = <TElement extends HTMLElement = HTMLElement>(props: PaginationItemProps<TElement>) => {
    // jsx:
    return (
        <ListgroupItem
            // other props:
            {...props}
            
            
            // accessibilities:
            aria-current={props['aria-current'] ?? (props.active ? 'page' : undefined)}
        />
    );
}
PaginationItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible

export type { PaginationItemProps as ItemProps }
export { PaginationItem as Item }



export interface PaginationProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // accessibilities:
    label?       : string
}
export const Pagination = <TElement extends HTMLElement = HTMLElement>(props: PaginationProps<TElement>) => {
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
Pagination.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Pagination as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
