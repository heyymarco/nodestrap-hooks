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
    createUseSheet,
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
    usePressReleaseState,
    
    
    
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

export const useEditableActionControlSheet = createUseSheet(() => [
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
export function EditableActionControl<TElement extends EditableControlElement = EditableControlElement>(props: EditableActionControlProps<TElement>) {
    // styles:
    const sheet             = useEditableActionControlSheet();
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                pressReleaseState.class,
            ]}
            
            
            // events:
            onMouseDown={(e) => { props.onMouseDown?.(e); pressReleaseState.handleMouseDown(e); }}
            onKeyDown=  {(e) => { props.onKeyDown?.(e);   pressReleaseState.handleKeyDown(e);   }}
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                pressReleaseState.handleAnimationEnd(e);
            }}
        />
    );
}
export { EditableActionControl as default }
