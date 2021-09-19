// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    
    
    
    // rules:
    rules,
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
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizes,
}                           from './BasicComponent'
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
    
    
    
    // styles:
    usesListgroupLayout,
    usesListgroupVariants,
    usesListgroupStates,
    
    
    
    // react components:
    ListgroupItemProps,
    ListgroupItem,
    
    ListgroupProps,
    Listgroup,
}                           from './Listgroup'
import {
    stripOutFocusableElement,
}                           from './strip-outs'



// styles:

/*
    Dropdown is just a composite component made of
    *modified* ListGroup
    and
    Collapse
*/

export const usesDropdownLayout = () => {
    return composition([
        imports([
            stripOutFocusableElement(), // clear browser's default styles
            
            // layouts:
            usesListgroupLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesDropdownVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesListgroupVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesDropdownStates = () => {
    return composition([
        imports([
            // states:
            usesListgroupStates(),
        ]),
    ]);
};
export const usesDropdown = () => {
    return composition([
        rules([
            rule('&&', [ // makes Dropdown more specific than ListGroupItem
                imports([
                    // layouts:
                    usesDropdownLayout(),
                    
                    // variants:
                    usesDropdownVariants(),
                    
                    // states:
                    usesDropdownStates(),
                ]),
            ]),
        ]),
    ]);
};

export const useDropdownSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesDropdown(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'ddwn' });



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
    // styles:
    const sheet = useDropdownSheet();
    
    
    
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
                
                
                // classes:
                mainClass={props.mainClass ?? sheet.main}
                
                
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
