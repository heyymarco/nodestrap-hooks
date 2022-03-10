// react:
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap utilities:
import {
    // utilities:
    setRef,
}                           from './utilities'

// nodestrap components:
import {
    // hooks:
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'
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
    
    DropdownProps,
    Dropdown,
}                           from './Dropdown'



// react components:

export type { DropdownCloseType }



export interface DropdownButtonProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>
    extends
        Pick<ButtonIconProps, 'icon'|'iconPosition'|'onClick'>,
        TogglerActiveProps<TCloseType>,
        
        Omit<DropdownProps<TElement, TCloseType>, 'onClick'>
{
    // essentials:
    buttonRef?         : React.Ref<HTMLButtonElement> // setter ref
    
    
    // layouts:
    buttonOrientation? : OrientationName
    
    
    // accessibilities:
    label?             : string
    
    
    // children:
    buttonChildren?    : React.ReactNode
}
export function DropdownButton<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>(props: DropdownButtonProps<TElement, TCloseType>) {
    // states:
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // essentials:
        buttonRef,
        
        
        // semantics:
        'aria-expanded' : ariaExpanded = isActive,
        
        
        // accessibilities:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        label,
        
        
        // layouts:
        orientation       = 'block',
        buttonOrientation = 'inline',
        
        
        // appearances:
        icon         = (() => { // from IconProps
            switch (orientation) {
                // todo: detect LTR or RTL
                case 'inline' :
                    return 'dropright';
                
                case 'block'  :
                default       :
                    return 'dropdown';
            } // switch
        })(),
        iconPosition = 'end',   // from IconProps
        
        
        // popups:
        targetRef,
        
        
        // events:
        onClick,
        
        
        // children:
        children,
        buttonChildren,
    ...restSharedProps} = props;
    const {
        // essentials:
        style,          // delete
        
        
        // identifiers:
        id,             // delete
        
        
        // classes:
        mainClass,      // delete
        classes,        // delete
        variantClasses, // delete
        stateClasses,   // delete
    ...restDropdownProps} = restSharedProps;
    const {
        // layouts:
        size,
        nude,
        
        
        // colors:
        theme,
        gradient,
        outlined,
        mild,
        
        
        // states:
        enabled,
    } = restDropdownProps;
    
    
    
    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    }
    
    
    
    // dom effects:
    /*
    we use `useState` instead of `useRef` for storing the ButtonIcon's DOM reference.
    so if the DOM reference changed, it triggers a new render,
    and then pass the correct (newest) DOM reference to the Dropdown.
    */
    // const buttonRef2 = useRef<HTMLButtonElement|null>(null);
    const [buttonRef2, setButtonRef2] = useState<HTMLButtonElement|null>(null);
    
    
    
    // jsx:
    return (
        <>
            <ButtonIcon
                // essentials:
                elmRef={(elm) => {
                    setRef(buttonRef, elm);
                    setButtonRef2(elm);
                }}
                
                
                // semantics:
                aria-expanded={ariaExpanded}
                
                
                // accessibilities:
                label={label}
                
                
                // appearances:
                icon={icon}
                iconPosition={iconPosition}
                
                
                // variants:
                {...{
                    // layouts:
                    size,
                    orientation: buttonOrientation,
                    nude,
                    
                    
                    // colors:
                    theme,
                    gradient,
                    outlined,
                    mild,
                }}
                
                
                // states:
                enabled={enabled}
                active={isActive}
                
                
                // classes:
                classes={[
                    'last-visible-child',
                ]}
                
                
                // events:
                onClick={(e) => {
                    onClick?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                }}
            >
                {buttonChildren}
            </ButtonIcon>
            <Dropdown<HTMLElement, TCloseType>
                // other props:
                {...restDropdownProps}
                
                
                // popups:
                targetRef={targetRef ?? buttonRef2}
                
                
                // accessibilities:
                active={isActive}
                onActiveChange={(newActive, closeType) => {
                    if (onActiveChange) { // controllable
                        onActiveChange(newActive, closeType);
                    }
                    else { // uncontrollable
                        setActive(newActive);
                    } // if
                }}
                
                
                // layouts:
                orientation={orientation}
            >
                { children }
            </Dropdown>
        </>
    );
}
DropdownButton.prototype = ButtonIcon.prototype; // mark as ButtonIcon compatible
export { DropdownButton as default }

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }
