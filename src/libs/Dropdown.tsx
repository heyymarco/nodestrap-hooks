// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // utilities:
    isTypeOf,
}                           from './react-cssfn' // cssfn for react
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
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // react components:
    ListgroupItemProps,
    ListgroupItem,
    
    ListgroupProps,
    Listgroup,
}                           from './Listgroup'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'



// utilities:
const isSelfOrDescendantOf = (element: HTMLElement, desired: HTMLElement): boolean => {
    let parent: HTMLElement|null = element;
    do {
        if (parent === desired) return true; // confirmed
        
        // let's try again:
        parent = parent.parentElement;
    } while (parent);
    
    
    
    return false; // not the descendant of desired
};



// react components:

export type CloseType = number|'shortcut'|'blur'

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
    onClose?    : (closeType: CloseType) => void
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
        
        
        // behaviors:
        actionCtrl = true,
        
        
        // popups:
        targetRef,
        popupPlacement,
        popupModifiers,
        popupPosition,
        
        
        // actions:
        onClose,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    // dom effects:
    const listRef = useRef<TElement|null>(null);
    
    useEffect(() => {
        if (isVisible) {
            listRef.current?.focus(); // when actived => focus the dropdown, so the user able to use [esc] key to close the dropdown
        } // if isVisible
    }, [isVisible]);
    
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.button !== 0) return; // only handle left click
            
            
            
            // although clicking on page won't change the focus, but we decided this event as lost focus on dropdown:
            handleFocus({ target: e.target } as FocusEvent);
        };
        const handleFocus = (e: FocusEvent) => {
            if (!isVisible) return; // dropdown is not shown => nothing to do
            if (!onClose)   return; // [onClose] is not set  => nothing to do
            
            
            
            const focusedTarget = e.target;
            if (!focusedTarget) return;
            // check if focusedTarget is inside dropdown or not:
            if ((focusedTarget instanceof HTMLElement) && listRef.current && isSelfOrDescendantOf(focusedTarget, listRef.current)) return; // focus is still in dropdown => nothing to do
            
            
            
            // `targetRef` is dropdown friend, so focus on `targetRef` is considered not to lose focus on dropdown:
            if (focusedTarget === targetRef?.current) return; 
            
            
            
            // focus is outside of dropdown => dropdown lost focus => hide dropdown
            onClose('blur');
        };
        
        
        
        document.addEventListener('click', handleClick);
        document.addEventListener('focus', handleFocus, { capture: true }); // force `focus` as bubbling
        
        
        
        // cleanups:
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('focus', handleFocus);
        };
    }, [onClose, isVisible, targetRef]);
    
    
    
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
                actionCtrl={actionCtrl}
                
                
                // Control props:
                {...{
                    // accessibilities:
                    tabIndex : tabIndex ?? -1,
                }}
                
                
                // events:
                onKeyUp={(e) => {
                    // backwards:
                    props.onKeyUp?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        if ((e.key === 'Escape') || (e.code === 'Escape')) {
                            onClose?.('shortcut');
                            e.preventDefault();
                        } // if
                    } // if
                }}
            >
                {
                    propEnabled
                    ?
                    (
                        children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                            isTypeOf(child, ListgroupItem)
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
                                        // backwards:
                                        child.props.onClick?.(e);
                                        
                                        
                                        
                                        if (!e.defaultPrevented) {
                                            onClose?.(index);
                                            e.preventDefault();
                                        } // if
                                    }}
                                />
                                :
                                child
                            )
                            :
                            (
                                actionCtrl
                                ?
                                <ListgroupItem
                                    // essentials:
                                    key={index}
                                    
                                    
                                    // events:
                                    onClick={(e) => {
                                        if (!e.defaultPrevented) {
                                            onClose?.(index);
                                            e.preventDefault();
                                        } // if
                                    }}
                                >
                                    { child }
                                </ListgroupItem>
                                :
                                child
                            )
                        ))
                    )
                    :
                    children
                }
            </Listgroup>
        </Collapse>
    );
};
export { Dropdown as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
