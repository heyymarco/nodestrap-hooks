// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    
    
    
    // rules:
    rules,
    variants,
    states,
    rule,
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
    OrientationName,
    OrientationVariant,
    useOrientationVariant,
}                           from './BasicComponent'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
}                           from './Indicator'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
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

// states:

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassiveState = () => {
    // dependencies:
    const [activePassive, activePassiveRefs, activePassiveDecls, ...restActivePassive] = popupUsesActivePassiveState();
    
    
    
    return [
        () => composition([
            imports([
                activePassive(),
            ]),
            states([
                isActived([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                    }),
                ]),
                isActivating([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                        [activePassiveDecls.animActivePassive]   : cssProps.animActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [activePassiveDecls.filterActivePassive] : cssProps.filterActive,
                        [activePassiveDecls.animActivePassive]   : cssProps.animPassive,
                    }),
                ]),
            ]),
        ]),
        activePassiveRefs,
        activePassiveDecls,
        ...restActivePassive,
    ] as const;
};
//#endregion activePassive



// styles:
export const usesCollapseLayout = () => {
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesCollapseVariants = (blockSelector = ':not(.inline)', inlineSelector = '.inline') => {
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
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(blockSelector, [ // block
                layout({
                    // overwrites propName = propName{Block}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
                }),
            ]),
            rule(inlineSelector, [ // inline
                layout({
                    // overwrites propName = propName{Inline}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
                }),
            ]),
        ]),
    ]);
};
export const usesCollapseStates = () => {
    // dependencies:
    
    // states:
    const [activePassive] = usesActivePassiveState();
    
    
    
    return composition([
        imports([
            // states:
            usesPopupStates(),
            activePassive(),
        ]),
    ]);
};
export const usesCollapse = () => {
    return composition([
        rules([
            rule('&&', [ // makes Collapse more specific than ListGroupItem
                imports([
                    // layouts:
                    usesCollapseLayout(),
                    
                    // variants:
                    usesCollapseVariants(),
                    
                    // states:
                    usesCollapseStates(),
                ]),
            ]),
        ]),
    ]);
};

export const useCollapseSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesCollapse(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesActive        : PropEx.Keyframes = {
        from : {
            overflow     : 'hidden',
            maxBlockSize : 0,
        },
        '99%': {
            overflow     : 'hidden',
            maxBlockSize : '100vh',
        },
        to   : {
            overflow     : 'unset',
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
            overflow      : 'hidden',
            maxInlineSize : 0,
        },
        '99%': {
            overflow      : 'hidden',
            maxInlineSize : '100vw',
        },
        to   : {
            overflow      : 'unset',
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
export const Collapse = <TElement extends HTMLElement = HTMLElement>(props: CollapseProps<TElement>) => {
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
};
export { Collapse as default }

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupModifier, PopupPosition }
