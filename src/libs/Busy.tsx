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
    usesSizeVariant,
}                           from './Basic'
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
import {
    // react components:
    VisuallyHidden,
}                           from './VisuallyHidden'
import {
    // react components:
    Icon,
}                           from './Icon'



// styles:
export const usesBusyLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBadgeLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesBusyVariants = () => {
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
            usesBadgeVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesBusyStates = () => {
    return composition([
        imports([
            // states:
            usesBadgeStates(),
        ]),
    ]);
};
export const usesBusy = () => {
    return composition([
        imports([
            // layouts:
            usesBusyLayout(),
            
            // variants:
            usesBusyVariants(),
            
            // states:
            usesBusyStates(),
        ]),
    ]);
};

export const useBusySheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesBusy(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        //#region typos
        fontSize      : '1em',
        //#endregion typos
    };
    return {
        ...basics,
        
        
        
        //#region typos
        fontSizeSm      : [['calc(', basics.fontSize     , '/', 1.25, ')']],
        fontSizeLg      : [['calc(', basics.fontSize     , '*', 1.25, ')']],
        //#endregion typos
        
        
        
        //#region indicators
        icon : 'busy',
        //#endregion indicators
    };
}, { prefix: 'busy' });



// react components:

export interface BusyProps<TElement extends HTMLElement = HTMLElement>
    extends
        BadgeProps<TElement>
{
}
export function Busy<TElement extends HTMLElement = HTMLElement>(props: BusyProps<TElement>) {
    // styles:
    const sheet = useBusySheet();
    
    
    
    // jsx:
    return (
        <Badge<TElement>
            // other props:
            {...props}
            
            
            // accessibilities:
            label={props.label ?? 'Loading...'}
            
            
            // appearances:
            nude={props.nude ?? true}
            badgeStyle={props.badgeStyle ?? 'circle'}
            outlined={props.outlined ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            <Icon icon='busy' size='1em' />
            { ((props.children ?? false) !== false) && <VisuallyHidden>
                { props.children }
            </VisuallyHidden> }
        </Badge>
    );
}
export { Busy as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
