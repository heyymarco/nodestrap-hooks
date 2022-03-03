// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

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
    
    
    
    // styles:
    usesDropdownElementLayout,
    
    
    
    // react components:
    DropdownCloseType,
    
    DropdownElementProps,
    DropdownElement,
    
    DropdownProps,
    Dropdown,
}                           from './Dropdown'



// styles:
export const usesDropdownListElementLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesDropdownElementLayout(),
        ]),
        ...style({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'items')), // apply general cssProps starting with items***
        }),
    });
};

export const useDropdownListElementSheet = createUseSheet(() => [
    mainComposition(
        rule('&&', { // makes `.DropdownListElement` is more specific than `.List`
            ...imports([
                // layouts:
                usesDropdownListElementLayout(),
            ]),
        }),
    ),
], /*sheetId :*/'ib5nas167b'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'ddwnlst' });



// utilities:
export const calculateSemanticRole = <TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListProps<TElement, TCloseType>) => {
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



export interface DropdownListElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownElementProps<TElement, TCloseType>,
        ListProps<TElement>
{
}
export function DropdownListElement<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListElementProps<TElement, TCloseType>) {
    // styles:
    const sheet = useDropdownListElementSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,         // from accessibilities, removed
        inheritActive,  // from accessibilities, removed
        tabIndex = -1,  // from ModalElement   , moved to List
        
        
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
            
            
            // variants:
            theme={props.theme ?? 'secondary'}
            listStyle={props.listStyle ?? 'joined'}
            
            
            // classes:
            classes={[
                sheet.main, // inject DropdownListElement class
            ]}
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
DropdownListElement.prototype = DropdownElement.prototype; // mark as DropdownElement compatible



export interface DropdownListProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownProps<TElement, TCloseType>,
        DropdownListElementProps<TElement, TCloseType>
{
}
export function DropdownList<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListProps<TElement, TCloseType>) {
    // jsx:
    return (
        <Dropdown<TElement, TCloseType>
            // other props:
            {...props}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]                      }
            semanticRole={props.semanticRole ?? calculateSemanticRole(props)}
        >
            <DropdownListElement<TElement, TCloseType>
                // other props:
                {...props}
            />
        </Dropdown>
    );
}
export { DropdownList as default }

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }

export type { ListStyle, ListVariant }
