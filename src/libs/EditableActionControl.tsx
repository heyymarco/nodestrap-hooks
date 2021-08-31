// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    composition,
    mainComposition,
    imports,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
}                           from './react-cssfn' // cssfn for react
import {
    // hooks:
    EditableControlElement,
    
    
    
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from './EditableControl'
import {
    // hooks:
    useStatePressRelease,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
}                           from './ActionControl'



// styles:
export const usesEditableActionControlLayout = () => {
    return composition([
        imports([
            // layouts:
            usesEditableControlLayout(),
            usesActionControlLayout(),
        ]),
    ]);
};
export const usesEditableActionControlVariants = () => {
    return composition([
        imports([
            // variants:
            usesEditableControlVariants(),
            usesActionControlVariants(),
        ]),
    ]);
};
export const usesEditableActionControlStates = () => {
    return composition([
        imports([
            // states:
            usesEditableControlStates(),
            usesActionControlStates(),
        ]),
    ]);
};
export const usesEditableActionControl = () => {
    return composition([
        imports([
            // layouts:
            usesEditableActionControlLayout(),
            
            // variants:
            usesEditableActionControlVariants(),
            
            // states:
            usesEditableActionControlStates(),
        ]),
    ]);
};

export const useEditableActionControlSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesEditableActionControl(),
        ]),
    ]),
]);



// react components:

export type { EditableControlElement }

export interface EditableActionControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        EditableControlProps<TElement>,
        ActionControlProps<TElement>
{
}
export const EditableActionControl = <TElement extends EditableControlElement = EditableControlElement>(props: EditableActionControlProps<TElement>) => {
    // styles:
    const sheet        = useEditableActionControlSheet();
    
    
    
    // states:
    const statePrssRls = useStatePressRelease(props);
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                statePrssRls.class,
            ]}
            
            
            // events:
            onMouseDown={(e) => { statePrssRls.handleMouseDown(e); props.onMouseDown?.(e); }}
            onKeyDown=  {(e) => { statePrssRls.handleKeyDown(e);   props.onKeyDown?.(e);   }}
            onAnimationEnd={(e) => {
                // states:
                statePrssRls.handleAnimationEnd(e);
                
                
                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
};
export { EditableActionControl as default }
