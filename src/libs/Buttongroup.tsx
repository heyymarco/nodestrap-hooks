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

interface ButtongroupItemProps
{
    children: React.ReactNode
}
function ButtongroupItem(props: ButtongroupItemProps) {
    // jsx:
    return (<>
        { props.children }
    </>);
}
ButtongroupItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible



export interface ButtongroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // accessibilities:
    label?       : string
}
export function Buttongroup<TElement extends HTMLElement = HTMLElement>(props: ButtongroupProps<TElement>) {
    // rest props:
    const {
        // accessibilities:
        role,
        label,
        
        
        // children:
        children,
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
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <ButtongroupItem
                    // essentials:
                    key={index}
                >
                    { child }
                </ButtongroupItem>
            ))}
        </Listgroup>
    );
}
Buttongroup.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Buttongroup as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
