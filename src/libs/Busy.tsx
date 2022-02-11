// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    SingleOrArray,
}                           from './types'       // cssfn's types
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
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
}                           from './Basic'
import {
    // react components:
    VisuallyHidden,
}                           from './VisuallyHidden'
import {
    // react components:
    Icon,
}                           from './Icon'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // styles:
    usesBadgeLayout,
    usesBadgeVariants,
    usesBadgeStates,
    
    
    
    // react components:
    BadgeProps,
    Badge,
}                           from './Badge'



// styles:
export const usesBusyLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBadgeLayout(),
        ]),
        ...style({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesBusyVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesBadgeVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesBusyStates = () => {
    return style({
        ...imports([
            // states:
            usesBadgeStates(),
        ]),
    });
};

export const useBusySheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesBusyLayout(),
            
            // variants:
            usesBusyVariants(),
            
            // states:
            usesBusyStates(),
        ]),
    ),
], /*sheetId :*/'y6oksyrdiq'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        //#region typos
        fontSize   : '1em',
        //#endregion typos
    };
    return {
        ...basics,
        
        
        
        //#region typos
        fontSizeSm : [['calc(', basics.fontSize, '/', 1.25, ')']],
        fontSizeLg : [['calc(', basics.fontSize, '*', 1.25, ')']],
        //#endregion typos
        
        
        
        //#region indicators
        icon       : 'busy',
        //#endregion indicators
    };
}, { prefix: 'busy' });



// utilities:
const isText = (children: React.ReactNode): children is SingleOrArray<(string|number)> => {
    if (['string', 'number'].includes(typeof(children))) return true;
    if (Array.isArray(children) && children.every((child) => ['string', 'number'].includes(typeof(child)))) return true;
    return false;
}



// react components:

export interface BusyProps<TElement extends HTMLElement = HTMLElement>
    extends
        BadgeProps<TElement>
{
}
export function Busy<TElement extends HTMLElement = HTMLElement>(props: BusyProps<TElement>) {
    // styles:
    const sheet = useBusySheet();
    
    
    
    // rest props:
    let {
        // accessibilities:
        label,
        
        
        
        // children:
        children,
    ...restProps}  = props;
    
    
    
    if ((!label) && isText(children)) {
        label    = [children].flat().join('');
        children = undefined;
    } // if
    
    
    
    // jsx:
    return (
        <Badge<TElement>
            // other props:
            {...restProps}
            
            
            // accessibilities:
            label={label ?? 'Loading...'}
            
            
            // appearances:
            nude={props.nude ?? true}
            badgeStyle={props.badgeStyle ?? 'circle'}
            outlined={props.outlined ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            <Icon icon='busy' size='1em' />
            { children && <VisuallyHidden>
                { children }
            </VisuallyHidden> }
        </Badge>
    );
}
export { Busy as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
