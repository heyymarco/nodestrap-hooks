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
    variants,
    states,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
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
    usesSizes,
}                           from './BasicComponent'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    // hooks:
    usesActivePassive as popupUsesActivePassive,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // configs:
    cssProps as pcssProps,
    
    
    
    // react components:
    Popup,
}                           from './Popup'
import {
    // hooks:
    OrientationName,
    VariantOrientation,
    
    ListStyle,
    VariantList,
    
    
    
    // styles:
    usesListgroupItemLayout,
    usesListgroupItemVariants,
    usesListgroupItemStates,
    
    
    
    // react components:
    ListgroupItemProps,
    ListgroupItem,
    
    ListgroupProps,
    Listgroup,
}                           from './Listgroup'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'



// hooks:

// states:

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents active & passive state definitions.
 */
export const usesActivePassive = () => {
    // dependencies:
    const [activePassive, activePassiveRefs, activePassiveDecls, ...restActivePassive] = popupUsesActivePassive();
    
    
    
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

/*
    AccordionItem is just a composite component made of
    ListGroupItem
    and
    *modified* Popup
*/

export const usesAccordionItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
            usesListgroupItemLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesAccordionItemVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesPopupVariants(),
            usesListgroupItemVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(':not(.inline)>*>&', [ // block
                layout({
                    // overwrites propName = propName{Block}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
                }),
            ]),
            rule('.inline>*>&', [ // inline
                layout({
                    // overwrites propName = propName{Inline}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
                }),
            ]),
        ]),
    ]);
};
export const usesAccordionItemStates = () => {
    // dependencies:
    
    // states:
    const [activePassive] = usesActivePassive();
    
    
    
    return composition([
        imports([
            // states:
            usesPopupStates(),
            usesListgroupItemStates(),
            activePassive(),
        ]),
    ]);
};
export const usesAccordionItem = () => {
    return composition([
        imports([
            // layouts:
            usesAccordionItemLayout(),
            
            // variants:
            usesAccordionItemVariants(),
            
            // states:
            usesAccordionItemStates(),
        ]),
    ]);
};

export const useAccordionItemSheet = createUseCssfnStyle(() => [
    mainComposition([
        imports([
            usesAccordionItem(),
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
            maxInlineSize : '100vh',
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
}, { prefix: 'accr' });



// react components:

export interface AccordionItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItemProps<TElement>,
        TogglerActiveProps
{
    // accessibility:
    label?          : string | React.ReactNode
}
export const AccordionItem = <TElement extends HTMLElement = HTMLElement>(props: AccordionItemProps<TElement>) => {
    // styles:
    const sheet                 = useAccordionItemSheet();
    
    
    
    // states:
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // accessibility:
        label,          // delete, moved to children
        
        defaultActive,  // delete, already handled by useTogglerActive
        onActiveChange, // delete, already handled by useTogglerActive
        active,         // delete, already handled by useTogglerActive
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    // jsx:
    return (<>
        <ListgroupItem
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'h1'}
            
            
            // accessibility:
            aria-expanded={isActive}
            active={isActive}
            
            
            // behaviors:
            actionCtrl={props.actionCtrl ?? true}
            
            
            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    setActive(!isActive); // toggle active
                    e.preventDefault();
                } // if
            }}
        >
            { label }
        </ListgroupItem>
        <Popup<TElement>
            // variants:
            theme={props.theme}
            size={props.size}
            gradient={props.gradient}
            outlined={props.outlined}
            mild={props.mild}
            
            
            // accessibility:
            inheritEnabled={props.inheritEnabled}
            enabled={propEnabled}
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            active={isActive}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { children }
        </Popup>
    </>);
};
AccordionItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible

export type { AccordionItemProps as ItemProps }
export { AccordionItem as Item }



// Accordion => Listgroup

export type { ListgroupProps, ListgroupProps as AccordionProps }
export { Listgroup as default, Listgroup as Accordion }

export type { OrientationName, VariantOrientation }
export type { ListStyle, VariantList }
