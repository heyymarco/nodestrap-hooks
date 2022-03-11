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



export type BasicButtonIconProps = Pick<ButtonIconProps, 'icon'|'iconPosition'|'onClick'|'label'|'tabIndex'>
export interface DropdownButtonProps<TElement extends HTMLElement = HTMLElement, TCloseType = DropdownCloseType>
    extends
        BasicButtonIconProps,
        TogglerActiveProps<TCloseType>,
        
        Omit<DropdownProps<TElement, TCloseType>, 'onClick'>
{
    // essentials:
    buttonRef?         : React.Ref<HTMLButtonElement> // setter ref
    
    
    // layouts:
    buttonOrientation? : OrientationName
    
    
    // components:
    button?            : React.ReactComponentElement<any, Element>
    
    
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
        inheritActive,  // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        label,
        tabIndex,
        
        
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
        
        
        // components:
        button = <ButtonIcon />,
        
        
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
        // orientation, // renamed buttonOrientation
        nude,
        
        
        // colors:
        theme,
        gradient,
        outlined,
        mild,
        
        
        // <Indicator> states:
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        // active,        // delete, already handled by `useTogglerActive`
        // inheritActive, // delete, already handled by `useTogglerActive`
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
    const defaultButtonProps : (BasicButtonIconProps & ButtonIconProps) = {
        // essentials:
        elmRef          : (elm) => {
            setRef(buttonRef, elm);
            setButtonRef2(elm);
        },
        
        
        // semantics:
        'aria-expanded' : ariaExpanded,
        
        
        // accessibilities:
        label           : label,
        tabIndex        : tabIndex,
        
        
        // appearances:
        icon            : icon,
        iconPosition    : iconPosition,
        
        
        // variants:
        // layouts:
        size            : size,
        orientation     : buttonOrientation,
        nude            : nude,
        // colors:
        theme           : theme,
        gradient        : gradient,
        outlined        : outlined,
        mild            : mild,
        
        
        // <Indicator> states:
        enabled         : enabled,
        inheritEnabled  : inheritEnabled,
        readOnly        : readOnly,
        inheritReadOnly : inheritReadOnly,
        active          : isActive,
        inheritActive   : false,
        
        
        // classes:
        classes         : [
            'last-visible-child',
        ],
        
        
        // events:
        onClick         : (e) => {
            onClick?.(e);
            
            
            
            if (!e.defaultPrevented) {
                handleToggleActive();
                e.preventDefault();
            } // if
        },
    };
    return (
        <>
            { React.cloneElement(React.cloneElement(button, defaultButtonProps, buttonChildren), button.props) }
            
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
