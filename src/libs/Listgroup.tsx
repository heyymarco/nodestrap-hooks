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
    children,
    
    
    
    // rules:
    variants,
    states,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
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
    usesSizes,
    OrientationName,
    noOrientationInline,
    isOrientationInline,
    VariantOrientation,
    useVariantOrientation,
    ThemeName,
    outlinedOf,
    mildOf,
    usesBorderStroke,
}                           from './BasicComponent'
import {
    // hooks:
    isActive,
}                           from './Indicator'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    usesContentStates,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from './Content'
import {
    // hooks:
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    isBlurring,
    isFocus,
    isArrive,
}                           from './Control'
import {
    // hooks:
    isPress,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'
import {
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
}                           from './Card'
import {
    stripOutList,
    stripOutFocusableElement,
}                           from './strip-outs'
import {
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs



// hooks:

// states:

//#region activePassive
export const markActive = () => composition([
    imports([
        outlinedOf(null), // keeps outlined variant
        mildOf(null),     // keeps mild     variant
        
        usesThemeActive(), // switch to active theme
    ]),
]);
export const dontMarkActive = () => composition([
    imports([
        outlinedOf(null), // keeps outlined variant
        mildOf(null),     // keeps mild     variant
        
        usesThemeActive(null), // keeps current theme
    ]),
]);

// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null) => controlUsesThemeDefault(themeName);

// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary') => controlUsesThemeActive(themeName);
//#endregion activePassive


// appearances:

export type ListStyle = 'bullet' // might be added more styles in the future
export interface VariantList {
    listStyle?: ListStyle
}
export const useVariantList = (props: VariantList) => {
    return {
        class: props.listStyle ? props.listStyle : null,
    };
};



// styles:
const wrapperElm  = ['li', '*'];
const listItemElm = ':first-child';

export const usesListgroupItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesContentLayout(),
        ]),
        layout({
            // layouts:
            display   : 'block',  // fills the entire wrapper's width
            
            
            
            // sizes:
            flex      : [[1, 1]], // growable & shrinkable, fills the entire wrapper's height
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesListgroupItemVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // overwrites propName = {item}PropName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(':not(.inline)&', [ // block
                imports([
                    // borders:
                    usesBorderAsSeparatorBlock(),
                ]),
            ]),
            rule('.inline&', [ // inline
                imports([
                    // borders:
                    usesBorderAsSeparatorInline(),
                ]),
            ]),
        ], /*minSpecificityWeight: */2), // increase specificity to combat with '.actionCtrl'
    ]);
};
export const usesListgroupItemStates = () => {
    return composition([
        imports([
            // states:
            usesContentStates(),
        ]),
    ]);
};
export const usesListgroupItem = () => {
    return composition([
        imports([
            // layouts:
            usesListgroupItemLayout(),
            
            // variants:
            usesListgroupItemVariants(),
            
            // states:
            usesListgroupItemStates(),
        ]),
    ]);
};

export const usesListgroupActionItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesActionControlLayout(),
            usesContentLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
    ]);
};
export const usesListgroupActionItemVariants = () => {
    return composition([
        imports([
            // variants:
            usesActionControlVariants(),
            usesContentVariants(),
        ]),
    ]);
};
export const usesListgroupActionItemStates = () => {
    return composition([
        imports([
            // states:
            usesActionControlStates(),
            usesContentStates(),
        ]),
        states([
            isFocus([
                layout({
                    zIndex: 2, // prevents boxShadowFocus from clipping
                }),
            ]),
            isBlurring([
                layout({
                    zIndex: 1, // prevents boxShadowFocus from clipping but below the active one
                }),
            ]),
            
            isActive([
                imports([
                    markActive(),
                ]),
            ]),
            isFocus([
                imports([
                    dontMarkActive(),
                ]),
            ]),
            isArrive([
                imports([
                    dontMarkActive(),
                ]),
            ]),
            isPress([
                imports([
                    dontMarkActive(),
                ]),
            ]),
        ], undefined, /*minSpecificityWeight: */4),
    ]);
};
export const usesListgroupActionItem = () => {
    return composition([
        imports([
            // layouts:
            usesListgroupActionItemLayout(),
            
            // variants:
            usesListgroupActionItemVariants(),
            
            // states:
            usesListgroupActionItemStates(),
        ]),
    ]);
};

export const usesListgroupLayout = () => {
    return composition([
        imports([
            // resets:
            stripOutFocusableElement(), // clear browser's default styles
            stripOutList(),             // clear browser's default styles
            
            // borders:
            usesBorderAsContainer(), // make a nicely rounded corners
        ]),
        layout({
            // layouts:
         // display        : 'flex',           // customizable orientation // already defined in block()/inline()
         // flexDirection  : 'column',         // customizable orientation // already defined in block()/inline()
            justifyContent : 'center',         // items are placed starting from the center and then spread to both sides
            alignItems     : 'stretch',        // items width are 100% of the parent
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // children:
            ...children(wrapperElm, composition([
                layout({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire Listgroup's width
                    justifyContent : 'stretch', // listItems height are 100% of the wrapper (the listItems also need to have growable & shrinkable)
                    alignItems     : 'stretch', // listItems width  are 100% of the wrapper
                    
                    
                    
                    // children:
                    ...children(listItemElm, composition([
                        imports([
                            usesListgroupItem(),
                        ]),
                        variants([
                            rule('.actionCtrl', composition([
                                imports([
                                    usesListgroupActionItem(),
                                ]),
                            ])),
                        ]),
                    ])),
                }),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesListgroupVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            noOrientationInline([ // block
                layout({
                    // layouts:
                    display           : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection     : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        imports([
                            // borders:
                            usesBorderAsSeparatorBlock(),
                        ]),
                        layout({
                            // layouts:
                            flexDirection : 'column', // listItems are stacked vertically (supports for the Accordion at blockStyle)
                        }),
                    ])),
                }),
            ]),
            isOrientationInline([ // inline
                layout({
                    // layouts:
                    display           : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    flexDirection     : 'row',         // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        imports([
                            // borders:
                            usesBorderAsSeparatorInline(),
                        ]),
                        layout({
                            // layouts:
                            flexDirection : 'row', // listItems are stacked horizontally (supports for the Accordion at inlineStyle)
                        }),
                    ])),
                }),
            ]),
        ], /*minSpecificityWeight: */2), // increase specificity to combat with '.actionCtrl'
        variants([
            rule('.bullet', [
                layout({
                    // layouts:
                    alignItems   : 'center', // child items are centered horizontally
                    
                    
                    
                    // borders:
                    // kill borders surrounding Listgroup:
                    borderWidth  : 0,
                    borderRadius : 0,
                    overflow     : 'unset',
                    
                    
                    
                    // spacings:
                    // add space between bullets:
                    gap          : cssProps.bulletSpacing,
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // borders:
                            // kill separator between bullets:
                            borderWidth : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, composition([
                                layout({
                                    // borders:
                                    borderRadius : borderRadiuses.pill, // big rounded corner
                                    overflow     : 'hidden',            // clip the children at the rounded corners
                                    
                                    
                                    
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'bullet')), // apply general cssProps starting with bullet***
                                }),
                                variants([
                                    rule(':nth-child(n)', [ // cancel out `.block`/`.inline` effect
                                        imports([
                                            // borders:
                                            usesBorderStroke(),
                                        ]),
                                    ]),
                                ]),
                            ])),
                        }),
                    ])),
                }),
            ]),
        ], /*minSpecificityWeight: */3),
    ]);
};
export const usesListgroupStates = () => {
    return composition([
        imports([
            // states:
            usesContentStates(),
        ]),
    ]);
};
export const usesListgroup = () => {
    return composition([
        imports([
            // layouts:
            usesListgroupLayout(),
            
            // variants:
            usesListgroupVariants(),
            
            // states:
            usesListgroupStates(),
        ]),
    ]);
};

export const useListgroupSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesListgroup(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        bulletSpacing   : spacers.sm,
        bulletSpacingSm : spacers.xs,
        bulletSpacingLg : spacers.md,
        
        bulletPadding   : spacers.xs,
        bulletPaddingSm : spacers.xxs,
        bulletPaddingLg : spacers.sm,
        //#endregion spacings
    };
}, { prefix: 'lg' });



// react components:

export interface ListgroupItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ActionControlProps<TElement>
{
    // accessibilities:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `Listgroup`.  
     * `false`     : independent `active`.
     */
    inheritActive? : boolean
    
    
    // behaviors:
    actionCtrl?    : boolean
    
    
    // children:
    children?      : React.ReactNode
}
export const ListgroupItem = <TElement extends HTMLElement = HTMLElement>(props: ListgroupItemProps<TElement>) => {
    // jsx:
    return (
        props.actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...props}
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? ''}
            classes={[...(props.classes ?? []),
                'actionCtrl',
            ]}
        />
        :
        <Content<TElement>
            // other props:
            {...props}
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
};
export type { ListgroupItemProps as ItemProps }
export { ListgroupItem as Item }



export interface ListgroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        ContentProps<TElement>,
        
        // layouts:
        VariantOrientation,
        
        // appearances:
        VariantList
{
    // behaviors:
    actionCtrl? : boolean
}
export const Listgroup = <TElement extends HTMLElement = HTMLElement>(props: ListgroupProps<TElement>) => {
    // styles:
    const sheet           = useListgroupSheet();
    
    
    
    // variants:
    const variOrientation = useVariantOrientation(props);
    const variList        = useVariantList(props);
    
    
    
    // rest props:
    const {
        // essentials:
        tag,
        
        
        // behaviors:
        actionCtrl,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const parentTag = tag ?? 'ul';
    const wrapTag   = ['ul', 'ol'].includes(parentTag) ? 'li' : 'div';
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={parentTag}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
                variList.class,
            ]}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <Element
                    // essentials:
                    key={index}
                    tag={wrapTag}
                >
                    {
                        isTypeOf(child, ListgroupItem)
                        ?
                        <child.type
                            // other props:
                            {...child.props}
                            
                            
                            // behaviors:
                            actionCtrl={child.props.actionCtrl ?? actionCtrl} // the default value of [actionCtrl] is belong to Listgroup's [actionCtrl]
                            
                            
                            // events:
                            onAnimationEnd={(e) => {
                                // triggers `Listgroup`'s onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                                
                                
                                // forwards:
                                child.props.onAnimationEnd?.(e);
                            }}
                        />
                        :
                        <ListgroupItem
                            // behaviors:
                            actionCtrl={actionCtrl} // the default value of [actionCtrl] is belong to Listgroup's [actionCtrl]
                            
                            
                            // events:
                            onAnimationEnd={(e) => {
                                // triggers `Listgroup`'s onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                            }}
                        >
                            { child }
                        </ListgroupItem>
                    }
                </Element>
            ))}
        </Content>
    );
};
export { Listgroup as default }

export type { OrientationName, VariantOrientation }
