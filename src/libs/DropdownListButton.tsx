// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap components:
import {
    // general types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    
    
    
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ListStyle,
    ListVariant,
    
    
    
    // utilities:
    calculateSemanticRole,
    
    
    
    // react components:
    DropdownListCloseType,
    
    DropdownListItemProps,
    DropdownListItem,
    
    DropdownListSeparatorItem,
    
    DropdownListComponentProps,
    DropdownListComponent,
}                           from './DropdownList'
import {
    // react components:
    DropdownButtonProps,
    DropdownButton,
}                           from './DropdownButton'



// react components:

export type { DropdownListItemProps, DropdownListItemProps as ItemProps }
export { DropdownListItem, DropdownListItem as Item }



export { DropdownListSeparatorItem, DropdownListSeparatorItem as SeparatorItem }



export type { DropdownListCloseType }



export interface DropdownListButtonProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>
    extends
        DropdownButtonProps<TElement, TCloseType>,
        
        Omit<DropdownListComponentProps<TElement, TCloseType>, 'onClick'>
{
}
export function DropdownListButton<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownListCloseType>(props: DropdownListButtonProps<TElement, TCloseType>) {
    // rest props:
    const {
        // essentials:
        listRef,
        
        
        // components:
        list,
        
        
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
        <DropdownButton<TElement, TCloseType>
            // other props:
            {...restDropdownProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]                      }
            semanticRole={props.semanticRole ?? calculateSemanticRole(props)}
        >
            <DropdownListComponent<TElement, TCloseType>
                // essentials:
                listRef={listRef}
                
                
                // components:
                list={list}
                
                
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
        </DropdownButton>
    );
}
DropdownListButton.prototype = DropdownButton.prototype; // mark as DropdownButton compatible
export { DropdownListButton as default }

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }

export type { ListStyle, ListVariant }
