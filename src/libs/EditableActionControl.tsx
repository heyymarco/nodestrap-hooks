// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react

// nodestrap utilities:
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'

// nodestrap components:
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



// styles:
export const usesEditableActionControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
            usesActionControlLayout(),
        ]),
    });
};
export const usesEditableActionControlVariants = () => {
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            usesActionControlVariants(),
        ]),
    });
};
export const usesEditableActionControlStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
            usesActionControlStates(),
        ]),
    });
};

export const useEditableActionControlSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesEditableActionControlLayout(),
            
            // variants:
            usesEditableActionControlVariants(),
            
            // states:
            usesEditableActionControlStates(),
        ]),
    ),
], /*sheetId :*/'viprxwh99g'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:

export type { EditableControlElement }

export interface EditableActionControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        EditableControlProps<TElement>,
        Omit<ActionControlProps<TElement>, 'onChange'>
{
}
export function EditableActionControl<TElement extends EditableControlElement = EditableControlElement>(props: EditableActionControlProps<TElement>) {
    // styles:
    const sheet             = useEditableActionControlSheet();
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
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
            onClick={(propEnabled || undefined) && props.onClick} // ignores onClick if disabled
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
