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
    vars,
    children,
    
    
    
    // rules:
    variants,
    states,
    rule,
    isNotHover,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    ElementProps,
    Element,
    
    
    
    // utilities:
    isTypeOf,
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
    OrientationName,
    noOrientationBlock,
    isOrientationBlock,
    OrientationVariant,
    useOrientationVariant,
    
    
    
    // styles:
    usesBasicComponentLayout,
    usesBasicComponentVariants,
    
    
    
    // react components:
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import Button               from './Button'
import {
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
}                           from './Card'
import spacers              from './spacers'     // configurable spaces defs



// styles:
const btnElm    = ['button', '.btn'];

export const usesButtongroupLayout = () => {
    return composition([
        imports([
            usesBasicComponentLayout(),
        ]),
        layout({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
            flexWrap       : 'nowrap',      // no wrapping
            
            
            
            // spacings:
            paddingInline  : 0,
            paddingBlock   : 0,
            
            
            
            // children:
            ...children(btnElm, composition([
                layout({
                }),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesButtongroupVariants = () => {
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
            usesBasicComponentVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            noOrientationBlock([ // inline
                layout({
                    // layouts:
                    flexDirection  : 'row',    // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children(btnElm, composition([
                        imports([
                            usesBorderAsSeparatorInline(),
                        ]),
                    ])),
                }),
            ]),
            isOrientationBlock([ // block
                layout({
                    // layouts:
                    flexDirection  : 'column', // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children(btnElm, composition([
                        imports([
                            usesBorderAsSeparatorBlock(),
                        ]),
                    ])),
                }),
            ]),
        ]),
    ]);
};
export const usesButtongroup = () => {
    return composition([
        imports([
            // layouts:
            usesButtongroupLayout(),
            
            // variants:
            usesButtongroupVariants(),
        ]),
    ]);
};

export const useButtongroupSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesButtongroup(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
    };
}, { prefix: 'btng' });



// react components:

export interface ButtongroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>,
        
        // layouts:
        OrientationVariant
{
}
export const Buttongroup = <TElement extends HTMLElement = HTMLElement>(props: ButtongroupProps<TElement>) => {
    // styles:
    const sheet   = useButtongroupSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    
    
    
    // rest props:
    const {
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx functions:
    const isButtonOrElement = (child: React.ReactNode): child is React.ReactElement<ElementProps, React.JSXElementConstructor<ElementProps>> => isTypeOf(child, Button) || isTypeOf(child, Element);
    const mutateChild = (child: React.ReactNode, key: number): React.ReactNode => {
        if (isButtonOrElement(child)) {
            if ((child.props.tag === 'button') || child.props.classes?.includes('btn')) return (
                <child.type
                    // other props:
                    {...child.props}
                    
                    
                    // essentials:
                    key={child.key ?? key}
                />
            );
            
            
            
            return (
                <child.type
                    // other props:
                    {...child.props}
                    
                    
                    // essentials:
                    key={child.key ?? key}
                    
                    
                    // classes:
                    classes={[...(child.props.classes ?? []),
                        'btn'
                    ]}
                />
            );
        } // if
        
        
        
        // other component:
        return child;
    };
    
    
    
    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...restProps}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                mutateChild(child, index)
            ))}
        </BasicComponent>
    );
};
export { Buttongroup as default }

export type { OrientationName, OrientationVariant }
