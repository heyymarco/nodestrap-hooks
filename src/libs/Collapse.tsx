// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // rules:
    rule,
    states,
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
    
    OrientationName,
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
}                           from './Basic'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
}                           from './Indicator'
import {
    // general types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    
    
    
    // hooks:
    usesActivePassiveState as popupUsesActivePassiveState,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // configs:
    cssProps as pcssProps,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;



// hooks:

// states:

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassiveState = () => {
    // dependencies:
    const [activePassive, activePassiveRefs, activePassiveDecls, ...restActivePassive] = popupUsesActivePassiveState();
    
    
    
    return [
        () => style({
            ...imports([
                activePassive(),
            ]),
            ...states([
                isActived({
                    ...vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                    }),
                }),
                isActivating({
                    ...vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                        [activePassiveDecls.anim  ] : cssProps.animActive,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [activePassiveDecls.filter] : cssProps.filterActive,
                        [activePassiveDecls.anim  ] : cssProps.animPassive,
                    }),
                }),
            ]),
        }),
        activePassiveRefs,
        activePassiveDecls,
        ...restActivePassive,
    ] as const;
};
//#endregion activePassive



// styles:
export const usesCollapseLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            ...rule(orientationBlockSelector,  { // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
            }),
            ...rule(orientationInlineSelector, { // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
            }),
        }),
    });
};
export const usesCollapseVariants = () => {
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
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesCollapseStates = () => {
    // dependencies:
    
    // states:
    const [activePassive] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // states:
            usesPopupStates(),
            activePassive(),
        ]),
    });
};

export const useCollapseSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesCollapseLayout(),
            
            // variants:
            usesCollapseVariants(),
            
            // states:
            usesCollapseStates(),
        ]),
    ),
], /*sheetId :*/'gh2oi6zjs0'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesActive        : PropEx.Keyframes = {
        from : {
            overflowY    : 'hidden',
            maxBlockSize : 0,
        },
        '99%': {
            overflowY    : 'hidden',
            maxBlockSize : '100vh',
        },
        to   : {
            overflowY    : 'unset',
            maxBlockSize : 'unset',
        },
    };
    const keyframesPassive       : PropEx.Keyframes = {
        from : keyframesActive.to,
        '1%' : keyframesActive['99%'],
        to   : keyframesActive.from,
    };
    
    const keyframesActiveInline  : PropEx.Keyframes = {
        from : {
            overflowX     : 'hidden',
            maxInlineSize : 0,
        },
        '99%': {
            overflowX     : 'hidden',
            maxInlineSize : '100vw',
        },
        to   : {
            overflowX     : 'unset',
            maxInlineSize : 'unset',
        },
    };
    const keyframesPassiveInline : PropEx.Keyframes = {
        from : keyframesActiveInline.to,
        '1%' : keyframesActiveInline['99%'],
        to   : keyframesActiveInline.from,
    };
    //#endregion keyframes
    
    
    
    return {
        //#region animations
        filterActive               : pcssProps.filterActive,
        
        '@keyframes active'        : keyframesActive,
        '@keyframes passive'       : keyframesPassive,
        animActive                 : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive                : [['300ms', 'ease-out', 'both', keyframesPassive]],
        
        '@keyframes activeInline'  : keyframesActiveInline,
        '@keyframes passiveInline' : keyframesPassiveInline,
        animActiveInline           : [['300ms', 'ease-out', 'both', keyframesActiveInline ]],
        animPassiveInline          : [['300ms', 'ease-out', 'both', keyframesPassiveInline]],
        //#endregion animations
    };
}, { prefix: 'clps' });



// react components:

export interface CollapseProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>,
        
        // layouts:
        OrientationVariant
{
}
export function Collapse<TElement extends HTMLElement = HTMLElement>(props: CollapseProps<TElement>) {
    // styles:
    const sheet              = useCollapseSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
        />
    );
}
export { Collapse as default }

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy }
