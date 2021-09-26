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

interface ButtongroupItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItemProps<TElement>
{
}
const ButtongroupItem = <TElement extends HTMLElement = HTMLElement>(props: ButtongroupItemProps<TElement>) => {
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
ButtongroupItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible



export interface ButtongroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // accessibilities:
    label?       : string
}
export const Buttongroup = <TElement extends HTMLElement = HTMLElement>(props: ButtongroupProps<TElement>) => {
    // rest props:
    const {
        // accessibilities:
        role,
        label,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Listgroup
            // other props:
            {...restProps}
            
            
            // accessibilities:
            role={role ?? 'group'}
            aria-label={label ?? 'Buttons'}
            
            
            // layouts:
            orientation={props.orientation ?? 'inline'}
            
            
            // variants:
            mild={props.mild ?? false}
        >
            { props.children }
        </Listgroup>
    );
};
Buttongroup.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Buttongroup as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
