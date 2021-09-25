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
            
            
            // essentials:
            tag={props.tag ?? (props.href ? 'a' : undefined)}
            
            
            // accessibilities:
            aria-current={props['aria-current'] ?? (props.active ? 'page' : undefined)}
        />
    );
}
PaginationItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible

export type { PaginationItemProps as ItemProps }
export { PaginationItem as Item }

export const PaginationPrevItem = <TElement extends HTMLElement = HTMLElement>(props: PaginationItemProps<TElement>) => {
    // jsx:
    return (
        <PaginationItem
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
        </PaginationItem>
    );
}
export const PaginationNextItem = <TElement extends HTMLElement = HTMLElement>(props: PaginationItemProps<TElement>) => {
    // jsx:
    return (
        <PaginationItem
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
        </PaginationItem>
    );
}
export {
    PaginationPrevItem as PrevItem,
    PaginationPrevItem as PrevPage,
    
    PaginationNextItem as NextItem,
    PaginationNextItem as NextPage,
}



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
