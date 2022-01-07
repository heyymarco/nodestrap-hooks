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
import type {
    // general types:
    Tag,
    Role,
    SemanticTag,
    SemanticRole,
}                           from './Element'
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
    PopupModifier,
    PopupPosition,
    
    
    
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



export interface DropdownButtonProps<TCloseType = DropdownCloseType>
    extends
        Omit<ButtonIconProps, 'size'>,
        TogglerActiveProps<TCloseType>,
        
        DropdownProps<HTMLButtonElement, TCloseType>
{
    // layouts:
    buttonOrientation? : OrientationName
    
    
    // accessibilities:
    label?          : string
    
    
    // children:
    buttonChildren? : React.ReactNode
    
    
    
    // semantics:
    dropdownTag?          : Tag
    dropdownRole?         : Role
    dropdownSemanticTag?  : SemanticTag
    dropdownSemanticRole? : SemanticRole
}
export function DropdownButton<TCloseType = DropdownCloseType>(props: DropdownButtonProps<TCloseType>) {
    // states:
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // semantics:
        dropdownTag,
        dropdownRole,
        dropdownSemanticTag,
        dropdownSemanticRole,
        
        
        // accessibilities:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        label,
        
        
        // layouts:
        orientation       = 'block',
        buttonOrientation = (orientation === 'inline') ? 'block' : 'inline',
        
        
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
        
        
        // children:
        children,
        buttonChildren,
    ...restProps} = props;
    const {
        // essentials:
        style,          // delete
        
        
        // semantics:
        tag,            // delete, replace with: dropdownTag
        role,           // delete, replace with: dropdownRole
        semanticTag,    // delete, replace with: dropdownSemanticTag
        semanticRole,   // delete, replace with: dropdownSemanticRole
        
        
        // identifiers:
        id,             // delete
        
        
        // classes:
        mainClass,      // delete
        classes,        // delete
        variantClasses, // delete
        stateClasses,   // delete
    ...restDropdownProps} = restProps;
    
    
    
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
    // const buttonRef = useRef<HTMLButtonElement|null>(null);
    const [buttonRef, setButtonRef] = useState<HTMLButtonElement|null>(null);
    
    
    
    // jsx:
    return (
        <>
            <ButtonIcon
                // other props:
                {...restProps}
                
                
                // essentials:
                elmRef={(elm) => {
                    setRef(elmRef, elm);
                    setButtonRef(elm);
                }}
                
                
                // semantics:
                aria-expanded={props['aria-expanded'] ?? isActive}
                
                
                // accessibilities:
                {...{
                    label,
                }}
                
                
                // layouts:
                orientation={buttonOrientation}
                
                
                // appearances:
                {...{
                    icon,
                    iconPosition,
                }}
                
                
                // children:
                children={buttonChildren}
                
                
                // classes:
                classes={[...(props.classes ?? []),
                    'last-visible-child',
                ]}
                
                
                // events:
                onClick={(e) => {
                    props.onClick?.(e);
                    
                    
                    
                    if (!e.defaultPrevented) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                }}
            />
            <Dropdown<HTMLElement, TCloseType>
                // other props:
                {...restDropdownProps}
                
                
                // semantics:
                tag ={dropdownTag }
                role={dropdownRole}
                semanticTag ={dropdownSemanticTag }
                semanticRole={dropdownSemanticRole}
                
                
                // popups:
                targetRef={props.targetRef ?? buttonRef}
                
                
                // accessibilities:
                active={isActive}
                onActiveChange={(newActive, closeType) => {
                    if (onActiveChange) { // controllable
                        onActiveChange(newActive, closeType as unknown as TCloseType);
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

export type { PopupPlacement, PopupModifier, PopupPosition }
