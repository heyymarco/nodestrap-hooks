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
    
    
    
    // layouts:
    layout,
    children,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    Element,
    
    
    
    // utilities:
    isTypeOf,
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
    // styles:
    usesContentLayout,
    usesContentVariants,
}                           from './Content'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'
import Icon                 from './Icon'
import CloseButton          from './CloseButton'
import spacers              from './spacers'     // configurable spaces defs



// styles:
const iconElm    = '.icon';
const bodyElm    = '.body';
const controlElm = '.control';

export const usesAlertLayout = () => {
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
            usesContentLayout(),
        ]),
        layout({
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
            ...children(iconElm, [
                layout({
                    // layouts:
                    gridArea    : '1 / -3', // the first row / the third column starting from the last
                    
                    
                    
                    // sizes:
                    justifySelf : 'center', // align horizontally to center
                    alignSelf   : 'start',  // align vertically   to top
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'icon')), // apply general cssProps starting with icon***
                }),
            ]),
            ...children(bodyElm, [
                layout({
                    // layouts:
                    gridArea : 'body',
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'body')), // apply general cssProps starting with body***
                }),
            ]),
            ...children(controlElm, [
                layout({
                    // layouts:
                    gridArea    : '1 / 2',  // the first row / the second column
                    
                    
                    
                    // sizes:
                    justifySelf : 'center', // align horizontally to center
                    alignSelf   : 'start',  // align vertically   to top
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'control')), // apply general cssProps starting with control***
                }),
            ]),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesAlertVariants = () => {
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
            usesPopupVariants(),
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesAlertStates = () => {
    return composition([
        imports([
            // states:
            usesPopupStates(),
        ]),
    ]);
};
export const usesAlert = () => {
    return composition([
        imports([
            // layouts:
            usesAlertLayout(),
            
            // variants:
            usesAlertVariants(),
            
            // states:
            usesAlertStates(),
        ]),
    ]);
};

export const useAlertSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesAlert(),
        ]),
    ]),
]);



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
    const [tag, role] = defineSemantic(props, { preferredTag: null, preferredRole: 'alert' });  
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
        if (isTypeOf(icon, Element)) return (
            <icon.type
                // other props:
                {...icon.props}
                
                
                // classes:
                classes={[...(icon.props.classes ?? []),
                    'icon', // inject icon class
                ]}
            />
        );
        
        
        
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
        if (isTypeOf(control, Element)) return (
            <control.type
                // other props:
                {...control.props}
                
                
                // classes:
                classes={[...(control.props.classes ?? []),
                    'control', // inject control class
                ]}
                
                
                // actions:
                onClick={(e) => {
                    control.props.onClick?.(e);
                    
                    
                    
                    handleClose?.(e);
                }}
            />
        );
        
        
        
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
            
            
            // essentials:
            tag={tag}
            
            
            // accessibilities:
            role={role}
            
            
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

export type { PopupPlacement, PopupModifier, PopupPosition }
