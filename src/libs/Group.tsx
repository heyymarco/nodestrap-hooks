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
    
    
    
    // rules:
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

// nodestrap utilities:
import {
    // utilities:
    isTypeOf,
}                           from './utilities'

// nodestrap components:
import {
    // react components:
    ElementProps,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
    
    OrientationRuleOptions,
    normalizeOrientationRule,
    
    
    
    // react components:
    BasicProps,
}                           from './Basic'
import {
    // react components:
    VisuallyHidden,
}                           from './VisuallyHidden'
import {
    // hooks:
    defaultOrientationRuleOptions,
    
    OrientationName,
    OrientationVariant,
    
    ListBasicStyle,
    ListVariant,
    
    
    
    // styles:
    usesListItemBaseLayout,
    
    
    
    // react components:
    ListItem,
    
    ListProps,
    List,
}                           from './List'
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
    
    
    
    return style({
        ...imports([
            usesListItemBaseLayout(options),
        ]),
        ...style({
            // no layout modification needed.
            // the layout is belong to the Button/Radio/Check itself.
            
            
            
            // sizes:
            // just a few tweak:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesGroupItemVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // layouts:
            sizes(),
        ]),
    });
};

export const useGroupItemSheet = createUseSheet(() => [
    mainComposition(
        rule('&&:not(_)', { // makes `.GroupItem.GroupItem:not(_)` is **0.1 more specific** than `.FooCheck.FooButton`
            ...imports([
                // layouts:
                usesGroupItemLayout(),
                
                // variants:
                usesGroupItemVariants(),
            ]),
        }),
    ),
], /*sheetId :*/'d2scsx4yqe'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
                if (isTypeOf(child, Popup   ) && child.props.targetRef) return child;
                if (isTypeOf(child, Collapse) && child.props.targetRef) return child;
                if (isTypeOf(child, Dropdown) && child.props.targetRef) return child;
                
                
                
                // React element:
                if (React.isValidElement<ElementProps>(child)) {
                    return React.cloneElement(child, ({
                        // classes:
                        classes: [...(child.props.classes ?? []),
                            sheet.main, // inject GroupItem class
                        ],
                    } as ElementProps));
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
        Omit<ListProps<TElement>, 'listStyle'|'actionCtrl'>
{
    // accessibilities:
    label?       : string
    
    
    // variants:
    listStyle?   : ListBasicStyle
}
export function Group<TElement extends HTMLElement = HTMLElement>(props: GroupProps<TElement>) {
    // rest props:
    const {
        // layouts:
        nude,
        
        
        // colors:
        mild,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    const defaultChildProps : BasicProps = {
        // layouts:
        nude,
        
        
        // colors:
        mild,
    };
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
            {React.Children.map(children, (child, index) => (
                <GroupItem
                    // essentials:
                    key={index}
                >
                    {React.isValidElement<BasicProps>(child) ? React.cloneElement(React.cloneElement(child, defaultChildProps), child.props) : child}
                </GroupItem>
            ))}
        </List>
    );
}
Group.prototype = List.prototype; // mark as List compatible
export { Group as default }

export type { OrientationName, OrientationVariant }

export type { ListBasicStyle, ListVariant }
