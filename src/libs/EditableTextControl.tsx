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
    vars,
    imports,
    
    
    
    // rules:
    states,
    
    
    
    //combinators:
    children,
    
    
    
    // utilities:
    escapeSvg,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from './css-var'     // Declares & retrieves *css variables* (css custom properties).
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    mildOf,
    usesPadding,
}                           from './Basic'
import {
    // hooks:
    isActive,
}                           from './Indicator'
import {
    // hooks:
    markActive as controlMarkActive,
    isFocus,
    isArrive,
}                           from './Control'
import {
    // hooks:
    ValidInvalidVars as EditableControlValidInvalidVars,
    isValid,
    isInvalid,
    isNoValidation,
    usesValidInvalidState as editableControlUsesValidInvalidState,
    
    
    
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
    usesIconColor,
    
    
    // styles:
    usesIconImage,
}                           from './Icon'



// hooks:

// states:

//#region activePassive
export const markActive = () => style({
    ...imports([
        controlMarkActive(),
        
        mildOf(null), // keeps mild variant
    ]),
});
//#endregion activePassive

//#region validInvalid
export interface ValidInvalidVars extends EditableControlValidInvalidVars {
    /**
     * final validation icon image.
     */
    iconImg : any
}
const [validInvalidRefs, validInvalidDecls] = createCssVar<ValidInvalidVars>();

/**
 * Uses valid & invalid states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents valid & invalid state definitions.
 */
export const usesValidInvalidState = () => {
    // dependencies:
    const [validInvalid, , , ...restValidInvalid] = editableControlUsesValidInvalidState();
    
    
    
    return [
        () => style({
            ...imports([
                validInvalid(),
            ]),
            
            ...vars({
                [validInvalidDecls.iconImg] : 'none',
            }),
            ...states([
                isValid({
                    ...vars({
                        // apply a *valid* icon indicator:
                        [validInvalidDecls.iconImg] : cssProps.iconValid,
                    }),
                }),
                isInvalid({
                    ...vars({
                        // apply an *invalid* icon indicator:
                        [validInvalidDecls.iconImg] : cssProps.iconInvalid,
                    }),
                }),
            ]),
        }),
        validInvalidRefs,
        validInvalidDecls,
        ...restValidInvalid,
    ] as const;
};
//#endregion validInvalid



// styles:
const iconElm = '::after';
export const usesEditableTextControlLayout = () => {
    // dependencies:
    
    // colors:
    const [iconColor   , iconColorRefs   ] = usesIconColor();
    
    // spacings:
    const [            , paddingRefs     ] = usesPadding();
    
    // states:
    const [            , validInvalidRefs] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
            
            // colors:
            iconColor(), // do not import `iconColor()` on pseudo `::after`
        ]),
        ...style({
            ...children(iconElm, {
                ...imports([
                    usesIconImage(
                        /*iconImage: */validInvalidRefs.iconImg,
                        /*iconColor: */iconColorRefs.iconCol
                    ),
                ]),
                ...style({
                    // layouts:
                    content           : '""',
                    display           : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // sizes:
                    boxSizing         : 'border-box', // the final size is including borders & paddings
                    blockSize         : cssProps.iconSize,
                    aspectRatio       : 1.5, // make sure the icon's image ratio is 1.5 or less
                    
                    
                    
                    // positions:
                    position          : 'absolute',
                    insetInlineEnd    : paddingRefs.paddingInline,
                    insetBlockStart   : `calc(50% - (${cssProps.iconSize} / 2))`,
                    maskPosition      : 'right', // align icon to the right
                    
                    
                    
                    // accessibilities:
                    pointerEvents     : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'icon')), // apply general cssProps starting with icon***
                }),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesEditableTextControlVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesEditableTextControlStates = () => {
    // dependencies:
    
    // states:
    const [validInvalid] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
            validInvalid(),
        ]),
        ...states([
            isActive({
                ...imports([
                    markActive(),
                ]),
            }),
            isFocus({
                ...imports([
                    markActive(),
                ]),
            }),
            isArrive({
                ...imports([
                    markActive(),
                ]),
            }),
            isNoValidation({
                ...children(iconElm, {
                    display: 'none',
                }),
            }),
        ]),
    });
};

export const useEditableTextControlSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesEditableTextControlLayout(),
            
            // variants:
            usesEditableTextControlVariants(),
            
            // states:
            usesEditableTextControlStates(),
        ]),
    ),
], /*sheetId :*/'783lmd7hos'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // accessibilities:
        cursor       : 'text',
        
        
        
        //#region animations
        iconSize     : '1em',
        iconValid    : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`,
        iconInvalid  : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")`,
        //#endregion animations
    };
}, { prefix: 'tedit' });



// react components:

export type EditableTextControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

export interface EditableTextControlProps<TElement extends EditableTextControlElement = EditableTextControlElement>
    extends
        EditableControlProps<TElement>
{
    // validations:
    minLength? : number
    maxLength? : number
}
export function EditableTextControl<TElement extends EditableTextControlElement = EditableTextControlElement>(props: EditableTextControlProps<TElement>) {
    // styles:
    const sheet = useEditableTextControlSheet();
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export { EditableTextControl as default }
