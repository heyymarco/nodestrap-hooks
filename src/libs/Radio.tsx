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
    vars,
    children,
    
    
    
    // utilities:
    escapeSvg,
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
    useTogglerActive,
}                           from './Indicator'
import {
    // hooks:
    CheckStyle,
    CheckVariant,
    
    
    
    // styles:
    inputElm,
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // configs:
    cssDecls as ccssDecls,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from './Check'



// styles:
export const usesRadioLayout = () => {
    return composition([
        imports([
            // layouts:
            usesCheckLayout(),
        ]),
        layout({
            // children:
            ...children(inputElm, composition([
                layout({
                    // borders:
                    borderRadius : '0.5em', // make circle corners
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
            ])),
        }),
        vars({
            [ccssDecls.img] : cssProps.img,
        }),
    ]);
};
export const usesRadioVariants = () => {
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
            usesCheckVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesRadioStates = () => {
    return composition([
        imports([
            // states:
            usesCheckStates(),
        ]),
    ]);
};
export const usesRadio = () => {
    return composition([
        imports([
            // layouts:
            usesRadioLayout(),
            
            // variants:
            usesRadioVariants(),
            
            // states:
            usesRadioStates(),
        ]),
    ]);
};

export const useRadioSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesRadio(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region indicators
        // forked from Bootstrap 5:
        img                      : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#000'/></svg>")}")`,
        //#endregion indicators
    };
}, { prefix: 'rad' });



// react components:

export interface RadioProps
    extends
        CheckProps
{
}
export const Radio = (props: RadioProps) => {
    // styles:
    const sheet = useRadioSheet();
    
    
    
    // states:
    const inputRef  = useRef<HTMLInputElement|null>(null);
    const [isActive, setActive] = useTogglerActive({
        ...props,
        
        defaultActive : props.defaultActive ?? props.defaultChecked, // forwards `defaultChecked` to `defaultActive`
        active        : props.active        ?? props.checked,        // forwards `checked`        to `active`
    }, /*changeEventTarget :*/inputRef);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
    ...restProps}  = props;
    
    
    
    // dom effects:
    useEffect(() => {
        const radio = inputRef.current;
        if (!radio) return; // radio was unloaded => nothing to do
        
        
        
        // handlers:
        const handleClear = () => {
            setActive(false); // set as inactive
        };
        
        
        
        // setups:
        radio.addEventListener('clear', handleClear);
        
        
        
        // cleanups:
        return () => {
            radio.removeEventListener('clear', handleClear);
        };
    }, [setActive]);
    
    
    
    // handlers:
    const handleCheck = () => {
        setActive(true); // set as active
    }
    
    
    
    // jsx:
    return (
        <Check
            // other props:
            {...restProps}
            
            
            // essentials:
            elmRef={(elm) => {
                inputRef.current = elm;
                
                
                // forwards:
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<HTMLInputElement|null>).current = elm;
                    } // if
                } // if
            }}
            
            
            // accessibilities:
            active={isActive}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // formats:
            type={props.type ?? 'radio'}
            
            
            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    handleCheck();
                    e.preventDefault();
                } // if
            }}
            onKeyUp={(e) => {
                // backwards:
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        handleCheck();
                        e.preventDefault();
                    } // if
                } // if
            }}
            
            onChange={(e) => {
                if (!props.name)       return; // the radio must have a name
                if (!e.target.checked) return; // the radio is checked not cleared
                
                
                
                let parentGroup = e.target.parentElement;
                //#region find nearest `<form>` or grandGrandParent
                while (parentGroup) {
                    if (parentGroup.tagName === 'FORM') break; // found nearest `<form>`
                    
                    // find next:
                    const grandParent = parentGroup.parentElement;
                    if (!grandParent) break;
                    parentGroup = grandParent;
                } // while
                //#endregion find nearest `<form>` or grandGrandParent
                
                
                
                if (parentGroup) {
                    for (const radio of (Array.from(parentGroup.querySelectorAll('input[type=radio]')) as HTMLInputElement[])) {
                        if (radio === e.target) continue; // radio is self => skip
                        if (radio.name !== props.name) continue; // radio's name is different to us => skip
                        
                        
                        
                        radio.dispatchEvent(new Event('clear', { bubbles: false }));
                    } // for
                } // if
            }}
        />
    );
};
export { Radio as default }

export type { CheckStyle, CheckVariant }
