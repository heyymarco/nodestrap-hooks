// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // hooks:
    useStateActivePassive,
}                           from './Indicator'
import {
    // react components:
    CollapseProps,
    Collapse,
}                           from './Collapse'
import {
    // hooks:
    ListStyle,
    VariantList,
    
    OrientationName,
    VariantOrientation,
    
    
    
    // react components:
    ListgroupItemProps,
    ListgroupItem,
    
    ListgroupProps,
    Listgroup,
}                           from './Listgroup'



// react components:

export type CloseType = 'ui'|'shortcut'|'blur'

// ListgroupItem => DropdownItem
export type { ListgroupItemProps, ListgroupItemProps as DropdownItemProps, ListgroupItemProps as ItemProps }
export { ListgroupItem, ListgroupItem as DropdownItem, ListgroupItem as Item }



export interface DropdownProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>,
        CollapseProps<TElement>
{
    // accessibilities:
    tabIndex?   : number
    
    
    // actions:
    onClose? : (closeType: CloseType) => void
}
export const Dropdown = <TElement extends HTMLElement = HTMLElement>(props: DropdownProps<TElement>) => {
    // states:
    const stateActPass = useStateActivePassive(props);
    const isVisible    = stateActPass.active || (!!stateActPass.class);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        tabIndex,       // from Dropdown
        
        
        // popups:
        targetRef,
        popupPlacement,
        popupModifiers,
        popupPosition,
    ...restProps} = props;
    
    
    
    // dom effects:
    const listRef = useRef<TElement|null>(null);
    
    useEffect(() => {
        if (isVisible) {
            listRef.current?.focus(); // when actived => focus the dropdown, so the user able to use [esc] key to close the dropdown
        } // if isVisible
    }, [isVisible]);
    
    
    
    // jsx:
    return (
        <Collapse<TElement>
            // accessibilities:
            active={active}
            inheritActive={inheritActive}
            
            
            // popups:
            targetRef={targetRef}
            popupPlacement={popupPlacement}
            popupModifiers={popupModifiers}
            popupPosition={popupPosition}
            popupStyle='wrapper'
            
            
            // events:
            onAnimationEnd={(e) => {
                // states:
                stateActPass.handleAnimationEnd(e);
            }}
        >
            <Listgroup
                // other props:
                {...restProps}
                
                
                // essentials:
                elmRef={(elm) => {
                    listRef.current = elm;
                    
                    
                    // forwards:
                    if (elmRef) {
                        if (typeof(elmRef) === 'function') {
                            elmRef(elm);
                        }
                        else {
                            (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                        } // if
                    } // if
                }}
                
                
                // behaviors:
                actionCtrl={props.actionCtrl ?? true}
                
                
                // Control props:
                {...{
                    // accessibilities:
                    tabIndex : tabIndex ?? -1,
                }}
                
                
                // events:
                onClick={(e) => {
                    // backwards:
                    props.onClick?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        props.onClose?.('ui');
                        e.preventDefault();
                    } // if
                }}
                onKeyUp={(e) => {
                    // backwards:
                    props.onKeyUp?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        if ((e.key === 'Escape') || (e.code === 'Escape')) {
                            props.onClose?.('shortcut');
                            e.preventDefault();
                        } // if
                    } // if
                }}
                onBlur={(e) => {
                    // backwards:
                    props.onBlur?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        props.onClose?.('blur');
                        e.preventDefault();
                    } // if
                }}
            >
                { props.children }
            </Listgroup>
        </Collapse>
    );
};
Dropdown.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Dropdown as default }

export type { ListStyle, VariantList }
export type { OrientationName, VariantOrientation }
