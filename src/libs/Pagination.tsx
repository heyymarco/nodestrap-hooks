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

// ListgroupItem => PaginationItem
export type { ListgroupItemProps, ListgroupItemProps as PaginationItemProps, ListgroupItemProps as ItemProps }
export { ListgroupItem, ListgroupItem as PaginationItem, ListgroupItem as Item }



export interface PaginationProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // accessibilities:
    label?          : string | React.ReactNode
}
export const Pagination = <TElement extends HTMLElement = HTMLElement>(props: PaginationProps<TElement>) => {
    // jsx:
    return (
        <Listgroup
            // other props:
            {...props}
            
            
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
