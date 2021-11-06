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
    
    
    
    // react components:
    ElementProps,
    
    
    
    // utilities:
    isTypeOf,
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
    OrientationRuleOptions,
    normalizeOrientationRule,
}                           from './Basic'
import {
    // hooks:
    defaultOrientationRuleOptions,
    
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // styles:
    usesListItemBaseLayout,
    
    
    
    // react components:
    ListItem,
    
    ListProps,
    List,
}                           from './List'
import {
    // react components:
    VisuallyHidden,
}                           from './VisuallyHidden'
import {
    // react components:
    Popup,
}                           from './Popup'
import {
    // react components:
    Collapse,
}                           from './Collapse'
import {
    // react components:
    Dropdown,
}                           from './Dropdown'



// hooks:

// layouts:

export { defaultOrientationRuleOptions };



// styles:
export const usesGroupItemLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            usesListItemBaseLayout(options),
        ]),
        layout({
            // no layout modification needed.
            // the layout is belong to the Button/Radio/Check itself.
            
            
            
            // sizes:
            // just a few tweak:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesGroupItemVariants = () => {
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
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesGroupItem = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        variants([
            rule('&&', [ // makes `.GroupItem` is more specific than `.FooButton.FooVariant`
                imports([
                    // layouts:
                    usesGroupItemLayout(options),
                    
                    // variants:
                    usesGroupItemVariants(),
                ]),
            ]),
        ]),
    ]);
};

export const useGroupItemSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesGroupItem(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'grp' });



// react components:

interface GroupItemProps
{
    children: React.ReactNode
}
function GroupItem(props: GroupItemProps) {
    // styles:
    const sheet = useGroupItemSheet();
    
    
    
    // jsx:
    return (
        <>
            {((child): React.ReactNode => {
                // excludes hidden element:
                if (isTypeOf(child, VisuallyHidden)) return child;
                
                
                
                // overlayed element:
                if (isTypeOf(child, Popup))    return child;
                if (isTypeOf(child, Collapse)) return child;
                if (isTypeOf(child, Dropdown)) return child;
                
                
                
                // React element:
                if (React.isValidElement<ElementProps>(child)) {
                    return (
                        <child.type
                            // other props:
                            {...child.props}
                            
                            
                            // classes:
                            classes={[...(child.props.classes ?? []),
                                sheet.main, // inject GroupItem class
                            ]}
                        />
                    );
                } // if
                
                
                
                // unknown element or text or null:
                return child;
            })(props.children)}
        </>
    );
}
GroupItem.prototype = ListItem.prototype; // mark as ListItem compatible



export interface GroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListProps<TElement>
{
    // accessibilities:
    label?       : string
}
export function Group<TElement extends HTMLElement = HTMLElement>(props: GroupProps<TElement>) {
    // rest props:
    const {
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <List<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null] }
            semanticRole={props.semanticRole ?? 'group'}
            
            
            // layouts:
            orientation={props.orientation ?? 'inline'}
            
            
            // variants:
            mild={props.mild ?? false}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <GroupItem
                    // essentials:
                    key={index}
                >
                    { child }
                </GroupItem>
            ))}
        </List>
    );
}
Group.prototype = List.prototype; // mark as List compatible
export { Group as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
