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
    
    
    
    //combinators:
    children,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import spacers              from './spacers'     // configurable spaces defs

// nodestrap components:
import type {
    // react components:
    ElementProps,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
}                           from './Content'
import Icon                 from './Icon'
import CloseButton          from './CloseButton'
import {
    // general types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'



// styles:
const iconElm    = '.icon';
const bodyElm    = '.body';
const controlElm = '.control';

export const usesAlertLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            /*
                just one explicit area: `body`
                icon & control rely on implicit area
            */
            gridTemplateRows    : [['auto'/*fluid height*/]],
            gridTemplateColumns : [['auto'/*fluid width*/ ]],
            gridTemplateAreas   : [[
                '"body"',
            ]],
            
            // implicit areas:
            gridAutoFlow        : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
            gridAutoRows        : 'min-content', // other areas than `body` should take the minimum required height
            gridAutoColumns     : 'min-content', // other areas than `body` should take the minimum required width
            // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*
            
            // child default sizes:
            justifyItems        : 'stretch', // each section fills the entire area's width
            alignItems          : 'stretch', // each section fills the entire area's height
            
            
            
            // children:
            ...children(iconElm, {
                // layouts:
                gridArea    : '1 / -3', // the first row / the third column starting from the last
                
                
                
                // sizes:
                justifySelf : 'center', // align horizontally to center
                alignSelf   : 'start',  // align vertically   to top
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'icon')), // apply general cssProps starting with icon***
            }),
            ...children(bodyElm, {
                // layouts:
                gridArea : 'body',
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'body')), // apply general cssProps starting with body***
            }),
            ...children(controlElm, {
                // layouts:
                gridArea    : '1 / 2',  // the first row / the second column
                
                
                
                // sizes:
                justifySelf : 'center', // align horizontally to center
                alignSelf   : 'start',  // align vertically   to top
                
                
                
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'control')), // apply general cssProps starting with control***
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesAlertVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesAlertStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useAlertSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesAlertLayout(),
            
            // variants:
            usesAlertVariants(),
            
            // states:
            usesAlertStates(),
        ]),
    ),
], /*sheetId :*/'a5qyy5nbby'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        gapInline : spacers.default,
        gapBlock  : spacers.default,
        //#endregion spacings
    };
}, { prefix: 'alrt' });



// react components:

export interface AlertProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
    // actions:
    onActiveChange? : (newActive: boolean) => void
    
    
    // children:
    icon?     : React.ReactChild | boolean | null | string
    children? : React.ReactNode
    control?  : React.ReactChild | boolean | null
}
export function Alert<TElement extends HTMLElement = HTMLElement>(props: AlertProps<TElement>) {
    // styles:
    const sheet   = useAlertSheet();
    
    
    
    // rest props:
    const {
        // actions:
        onActiveChange,
        
        
        // children:
        icon,
        children: body,
        control,
    ...restProps} = props;
    
    
    
    // fn props:
    const mildFn      = props.mild ?? false;
    
    
    
    // jsx fn props:
    const iconFn  = (() => {
        // default (unset) or string:
        if ((icon === undefined) || (typeof icon === 'string')) return (
            <Icon
                // appearances:
                icon={icon ?? (() => {
                    switch (props.theme) {
                        case 'success'   : return 'check_circle';
                        case 'warning'   : return 'warning';
                        case 'danger'    : return 'error';
                     // case 'primary'   :
                     // case 'secondary' :
                     // case 'info'      :
                     // case 'light'     :
                     // case 'dark'      :
                        default          : return 'info';
                    } // switch
                })()}
                
                
                // variants:
                size='md'
                theme={props.theme}
                mild={!mildFn}
                
                
                // classes:
                classes={[
                    'icon', // inject icon class
                ]}
            />
        );
        
        
        
        // nodestrap's component:
        if (React.isValidElement<ElementProps>(icon)) return React.cloneElement(icon, ({
            // classes:
            classes: [...(icon.props.classes ?? []),
                'icon', // inject icon class
            ],
        } as ElementProps));
        
        
        
        // other component:
        return icon && (
            <div
                // classes:
                className='icon'
            >
                { icon }
            </div>
        );
    })();
    
    const bodyFn  = (() => {
        return body && (
            <div
                // classes:
                className='body'
            >
                { body }
            </div>
        );
    })();
    
    const controlFn = (() => {
        // handlers:
        const handleClose = onActiveChange && ((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            if (!e.defaultPrevented) {
                onActiveChange(false);
                e.preventDefault();
            } // if
        });
        
        
        
        // default (unset):
        if (control === undefined) return (
            <CloseButton
                // variants:
                size='xs'
                
                
                // classes:
                classes={[
                    'control', // inject control class
                ]}
                
                
                // actions:
                onClick={handleClose}
            />
        );
        
        
        
        // nodestrap's component:
        if (React.isValidElement<ElementProps>(control)) return React.cloneElement(control, ({
            // classes:
            classes: [...(control.props.classes ?? []),
                'control', // inject control class
            ],
            
            
            // actions:
            onClick: (e) => {
                control.props.onClick?.(e);
                
                
                
                handleClose?.(e);
            },
        } as ElementProps));
        
        
        
        // other component:
        return control && (
            <div
                // classes:
                className='control'
            >
                { control }
            </div>
        );
    })();
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null] }
            semanticRole={props.semanticRole ?? 'alert'}
            
            
            
            // variants:
            mild={mildFn}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { iconFn }
            
            { bodyFn }
            
            { controlFn }
        </Popup>
    );
}
export { Alert as default }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }
