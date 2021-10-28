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
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    ElementProps,
    Element,
    
    
    
    // utilities:
    isTypeOf,
    setRef,
    defineSemantic,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // hooks:
    useActivePassiveState,
}                           from './Indicator'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // styles:
    usesCollapseLayout,
    usesCollapseVariants,
    usesCollapseStates,
    
    
    
    // react components:
    CollapseProps,
    Collapse,
}                           from './Collapse'
import {
    stripoutFocusableElement,
}                           from './stripouts'



// styles:
export const usesDropdownElementLayout = () => {
    return composition([
        imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
        ]),
        layout({
            // layouts:
            display : 'block',
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'element')), // apply general cssProps starting with element***
        }),
    ]);
};
export const usesDropdownElement = () => {
    return composition([
        imports([
            // layouts:
            usesDropdownElementLayout(),
        ]),
    ]);
};

export const useDropdownElementSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesDropdownElement(),
        ]),
    ]),
]);



export const usesDropdownLayout = () => {
    return composition([
        imports([
            // layouts:
            usesCollapseLayout(),
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
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesCollapseVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesDropdownStates = () => {
    return composition([
        imports([
            // states:
            usesCollapseStates(),
        ]),
    ]);
};
export const usesDropdown = () => {
    return composition([
        imports([
            // layouts:
            usesDropdownLayout(),
            
            // variants:
            usesDropdownVariants(),
            
            // states:
            usesDropdownStates(),
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
        // backgrounds:
        boxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']],
    };
}, { prefix: 'ddwn' });



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

export type DropdownCloseType = 'shortcut'|'blur'
export interface DropdownAction<TCloseType = DropdownCloseType>
{
    // actions:
    onActiveChange? : (newActive: boolean, arg?: TCloseType) => void
}



export interface DropdownElementProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>
    extends
        DropdownAction<TCloseType>,
        ElementProps<TElement>
{
    // accessibilities:
    tabIndex? : number
}
export function DropdownElement<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>(props: DropdownElementProps<TElement, TCloseType>) {
    // styles:
    const sheet = useDropdownElementSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        tabIndex = -1,
        
        
        // actions:
        onActiveChange, // not implemented
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            {...{
                tabIndex,
            }}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}



export interface DropdownProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>
    extends
        CollapseProps<TElement>,
        DropdownElementProps<TElement, TCloseType>
{
}
export function Dropdown<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>(props: DropdownProps<TElement, TCloseType>) {
    // styles:
    const sheet              = useDropdownSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,        // moved to DropdownElement
        
        
        // accessibilities:
        active,        // from accessibilities
        inheritActive, // from accessibilities
        tabIndex,      // from Dropdown
        
        
        // popups:
        targetRef,
        popupPlacement = (((props.orientation ?? 'block') === 'block') ? 'bottom' : 'right'),
        popupModifiers,
        popupPosition,
        
        
        // actions:
        onActiveChange,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // states:
    const activePassiveState = useActivePassiveState({ active, inheritActive: false });
    const isVisible          = activePassiveState.active || (!!activePassiveState.class);
    
    
    
    // fn props:
    const [tag, role] = defineSemantic(props, { preferredTag: null, preferredRole: 'dialog' });
    
    
    
    // dom effects:
    const childRef = useRef<TElement|null>(null);
    
    useEffect(() => {
        if (isVisible) {
            childRef.current?.focus({ preventScroll: true }); // when actived => focus the dropdown, so the user able to use [esc] key to close the dropdown
        } // if isVisible
    }, [isVisible]);
    
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.button !== 0) return; // only handle left click
            
            
            
            // although clicking on page won't change the focus, but we decided this event as lost focus on dropdown:
            handleFocus({ target: e.target } as FocusEvent);
        };
        const handleFocus = (e: FocusEvent) => {
            if (!isVisible)      return; // dropdown is not shown => nothing to do
            if (!onActiveChange) return; // [onActiveChange] is not set  => nothing to do
            
            
            
            const focusedTarget = e.target;
            if (!focusedTarget) return;
            // check if focusedTarget is inside dropdown or not:
            if ((focusedTarget instanceof HTMLElement) && childRef.current && isSelfOrDescendantOf(focusedTarget, childRef.current)) return; // focus is still in dropdown => nothing to do
            
            
            
            // `targetRef` is dropdown friend, so focus on `targetRef` is considered not to lose focus on dropdown:
            if ((focusedTarget instanceof HTMLElement) && targetRef?.current && isSelfOrDescendantOf(focusedTarget, targetRef?.current)) return;
            
            
            
            // focus is outside of dropdown => dropdown lost focus => hide dropdown
            onActiveChange(false, 'blur' as unknown as TCloseType);
        };
        
        
        
        document.addEventListener('click', handleClick);
        document.addEventListener('focus', handleFocus, { capture: true }); // force `focus` as bubbling
        
        
        
        // cleanups:
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('focus', handleFocus);
        };
    }, [onActiveChange, isVisible, targetRef]);
    
    
    
    // jsx:
    return (
        <Collapse<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={tag}
            
            
            // accessibilities:
            role={props.role ?? (isVisible ? role : undefined)}
            {...{
                active        : activePassiveState.active,
                inheritActive : false,
            }}
            
            
            // popups:
            {...{
                targetRef,
                popupPlacement,
                popupModifiers,
                popupPosition,
            }}
            
            
            // variants:
            nude={props.nude ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // events:
            // watch [escape key] on the whole Dropdown, including DropdownElement & DropdownElement's children:
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === 'Escape') || (e.code === 'Escape')) {
                        if (onActiveChange) {
                            onActiveChange(false, 'shortcut' as unknown as TCloseType);
                            e.preventDefault();
                        } // if
                    } // if
                } // if
            }}
            
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                activePassiveState.handleAnimationEnd(e);
            }}
        >
            {
                isTypeOf<DropdownElementProps<TElement, TCloseType>>(children, DropdownElement)
                ?
                <children.type
                    // other props:
                    {...children.props}
                    
                    
                    // essentials:
                    elmRef={(elm) => {
                        setRef(children.props.elmRef, elm);
                        setRef(elmRef, elm);
                        setRef(childRef, elm);
                    }}
                    
                    
                    // accessibilities:
                    tabIndex={tabIndex}
                    
                    
                    // events:
                    onActiveChange={(newActive, closeType) => {
                        children.props.onActiveChange?.(newActive, closeType);
                        
                        
                        
                        onActiveChange?.(newActive, closeType);
                    }}
                />
                :
                <DropdownElement<TElement, TCloseType>
                    // essentials:
                    elmRef={(elm) => {
                        setRef(elmRef, elm);
                        setRef(childRef, elm);
                    }}
                    
                    
                    // accessibilities:
                    tabIndex={tabIndex}
                    
                    
                    // events:
                    onActiveChange={(newActive, closeType) => {
                        onActiveChange?.(newActive, closeType);
                    }}
                >
                    { children }
                </DropdownElement>
            }
        </Collapse>
    );
}
export { Dropdown as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
