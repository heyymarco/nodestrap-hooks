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
    
    
    
    // rules:
    variants,
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
}                           from './Basic'
import {
    // hooks:
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    // styles:
    usesCollapseLayout,
    usesCollapseVariants,
    usesCollapseStates,
    
    
    
    // react components:
    Collapse,
}                           from './Collapse'
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // styles:
    usesListItemLayout,
    usesListItemVariants,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItem,
    
    ListProps,
    List,
}                           from './List'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'



// styles:

/*
    AccordionItem is just a composite component made of
    ListItem
    and
    *modified* Collapse
*/

export const usesAccordionItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesCollapseLayout(),
            usesListItemLayout(),
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
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesCollapseVariants(':not(.inline)>*>&', '.inline>*>&'),
            usesListItemVariants(),
            
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
    return composition([
        imports([
            // states:
            usesCollapseStates(),
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

export const useAccordionItemSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesAccordionItem(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'accr' });



// react components:

export interface AccordionItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListItemProps<TElement>,
        TogglerActiveProps
{
    // accessibilities:
    label?          : string | React.ReactNode
}
export function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: AccordionItemProps<TElement>) {
    // styles:
    const sheet                 = useAccordionItemSheet();
    
    
    
    // states:
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        label,          // delete, moved to children
        
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    }
    
    
    
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
    // jsx:
    return (<>
        <ListItem<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            preferredTag={props.preferredTag   ?? ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}
            preferredRole={props.preferredRole ?? 'heading'}
            
            
            // accessibilities:
            aria-expanded={isActive}
            active={isActive}
            
            
            // behaviors:
            actionCtrl={props.actionCtrl ?? true}
            
            
            // events:
            onClick={(e) => {
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    handleToggleActive();
                    e.preventDefault();
                } // if
            }}
            onKeyDown={(e) => {
                props.onKeyDown?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        // prevents pressing space for scrolling page
                        e.preventDefault();
                    } // if
                } // if
            }}
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                } // if
            }}
        >
            { label }
        </ListItem>
        <Collapse<TElement>
            // variants:
            theme={props.theme}
            size={props.size}
            gradient={props.gradient}
            outlined={props.outlined}
            mild={props.mild}
            
            
            // accessibilities:
            inheritEnabled={props.inheritEnabled}
            enabled={propEnabled}
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            active={isActive}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { children }
        </Collapse>
    </>);
}
AccordionItem.prototype = ListItem.prototype; // mark as ListItem compatible

export type { AccordionItemProps as ItemProps }
export { AccordionItem as Item }



// ListSeparatorItem => AccordionSeparatorItem
export { ListSeparatorItem, ListSeparatorItem as AccordionSeparatorItem, ListSeparatorItem as SeparatorItem }



// Accordion => List

export type { ListProps, ListProps as AccordionProps }
export { List as default, List as Accordion }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
