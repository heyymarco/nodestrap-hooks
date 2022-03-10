// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap utilities:
import {
    // utilities:
    isTypeOf,
}                           from './utilities'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'

// nodestrap components:
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItem,
    
    ListProps,
    List,
}                           from './List'
import {
    // general types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    
    
    
    // hooks:
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    DropdownCloseType,
    
    DropdownComponentProps,
    
    DropdownProps,
    Dropdown,
}                           from './Dropdown'



// utilities:
export const calculateSemanticRole = <TElement extends HTMLElement = HTMLElement>(props: React.PropsWithChildren<Omit<ListProps<TElement>, keyof React.DOMAttributes<TElement>>>) => {
    if (props.role) return null;
    
    
    
    const children   = props.children;
    const actionCtrl = props.actionCtrl ?? true;
    if (React.Children.toArray(children).some((child) =>
        isTypeOf(child, ListItem)
        ?
        !(child.props.actionCtrl ?? actionCtrl) // ListItem is not an actionCtrl => not a menu item => role='dialog'
        :
        !actionCtrl // default ListItem wrapper is not an actionCtrl => not a menu item => role='dialog'
    )) return 'dialog';
    
    
    
    return 'menu';
};



// react components:

// ListItem => DropdownListItem
export type { ListItemProps, ListItemProps as DropdownListItemProps, ListItemProps as ItemProps }
export { ListItem, ListItem as DropdownListItem, ListItem as Item }



// ListSeparatorItem => DropdownListSeparatorItem
export { ListSeparatorItem, ListSeparatorItem as DropdownListSeparatorItem, ListSeparatorItem as SeparatorItem }



export type DropdownListCloseType = number|DropdownCloseType



export interface DropdownListComponentProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownComponentProps<TElement, TCloseType>,
        ListProps<TElement>
{
}
export function DropdownListComponent<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListComponentProps<TElement, TCloseType>) {
    // rest props:
    const {
        // accessibilities:
        tabIndex = -1,  // from DropdownComponent, moved to List
        
        
        // behaviors:
        actionCtrl = true, // set default to true
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    // handlers:
    const handleClose = onActiveChange && ((e: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
        if (!e.defaultPrevented) {
            onActiveChange?.(false, index as unknown as TCloseType);
            e.preventDefault();
        } // if
    });
    
    
    
    // jsx:
    return (
        <List<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            {...{
                tabIndex,
            }}
            
            
            // behaviors:
            actionCtrl={actionCtrl}
        >
            {
                propEnabled
                ?
                (
                    React.Children.map(children, (child, index) => (
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
                                    child.props.onClick?.(e);
                                    
                                    
                                    
                                    handleClose?.(e, index);
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
                                    handleClose?.(e, index);
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



export interface DropdownListProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownProps<TElement, TCloseType>,
        DropdownListComponentProps<TElement, TCloseType>
{
}
export function DropdownList<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListProps<TElement, TCloseType>) {
    // rest props:
    const {
        // children:
        children,
    ...restDropdownProps} = props;
    const {
        // layouts:
        size,
        orientation,
        // nude,
        
        
        // colors:
        theme      = 'secondary', // set default to secondary
        gradient,
        outlined,
        mild,
        
        
        // variants:
        listStyle  = 'joined', // set default to joined
        
        
        // behaviors:
        actionCtrl,
        
        
        // <Indicator> states:
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        // active,
        // inheritActive,
    } = restDropdownProps;
    
    
    
    // jsx:
    return (
        <Dropdown<TElement, TCloseType>
            // other props:
            {...restDropdownProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]                      }
            semanticRole={props.semanticRole ?? calculateSemanticRole(props)}
        >
            <DropdownListComponent<TElement, TCloseType>
                // variants:
                // layouts:
                size={size}
                orientation={orientation}
                nude={false}
                // colors:
                theme={theme}
                gradient={gradient}
                outlined={outlined}
                mild={mild}
                
                
                // variants:
                listStyle={listStyle}
                
                
                // behaviors:
                actionCtrl={actionCtrl}
                
                
                // <Indicator> states:
                enabled={enabled}
                inheritEnabled={inheritEnabled}
                readOnly={readOnly}
                inheritReadOnly={inheritReadOnly}
                active={false}
                inheritActive={false}
            >
                { children }
            </DropdownListComponent>
        </Dropdown>
    );
}
export { DropdownList as default }

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }

export type { ListStyle, ListVariant }
