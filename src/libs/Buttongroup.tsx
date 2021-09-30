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
}                           from './BasicComponent'
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // styles:
    usesListgroupItemInheritParentVariants,
    
    
    
    // react components:
    ListgroupItem,
    
    ListgroupProps,
    Listgroup,
}                           from './Listgroup'
import {
    // react components:
    Button,
}                           from './Button'
import {
    // react components:
    Check,
}                           from './Check'
import {
    // react components:
    Radio,
}                           from './Radio'



// styles:
export const usesButtongroupItemLayout = () => {
    return composition([
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
export const usesButtongroupItemVariants = () => {
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
            usesListgroupItemInheritParentVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesButtongroupItem = () => {
    return composition([
        variants([
            rule('&&', [ // makes `.ButtongroupItem` is more specific than `.FooButton.FooVariant`
                imports([
                    // layouts:
                    usesButtongroupItemLayout(),
                    
                    // variants:
                    usesButtongroupItemVariants(),
                ]),
            ]),
        ]),
    ]);
};

export const useButtongroupItemSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesButtongroupItem(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'btng' });



// react components:

interface ButtongroupItemProps
{
    children: React.ReactNode
}
function ButtongroupItem(props: ButtongroupItemProps) {
    // styles:
    const sheet = useButtongroupItemSheet();
    
    
    
    // jsx:
    return (
        <>
            {((child): React.ReactNode => {
                if (isTypeOf(child, Button)) {
                    return (
                        <child.type
                            // other props:
                            {...child.props}
                            
                            
                            // classes:
                            classes={[...(child.props.classes ?? []),
                                sheet.main, // inject ListgroupItem class
                            ]}
                        />
                    );
                } // if
                
                
                
                if ((isTypeOf(child, Check) || isTypeOf(child, Radio)) && (child.props.checkStyle?.toLowerCase().endsWith('btn') || child.type.name.includes('Button'))) {
                    return (
                        <child.type
                            // other props:
                            {...child.props}
                            
                            
                            // classes:
                            classes={[...(child.props.classes ?? []),
                                sheet.main, // inject ListgroupItem class
                            ]}
                        />
                    );
                } // if
                
                
                
                return child;
            })(props.children)}
        </>
    );
}
ButtongroupItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible



export interface ButtongroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // accessibilities:
    label?       : string
}
export function Buttongroup<TElement extends HTMLElement = HTMLElement>(props: ButtongroupProps<TElement>) {
    // rest props:
    const {
        // accessibilities:
        role,
        label,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Listgroup
            // other props:
            {...restProps}
            
            
            // accessibilities:
            role={role ?? 'group'}
            aria-label={label ?? 'Buttons'}
            
            
            // layouts:
            orientation={props.orientation ?? 'inline'}
            
            
            // variants:
            mild={props.mild ?? false}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <ButtongroupItem
                    // essentials:
                    key={index}
                >
                    { child }
                </ButtongroupItem>
            ))}
        </Listgroup>
    );
}
Buttongroup.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Buttongroup as default }

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }
