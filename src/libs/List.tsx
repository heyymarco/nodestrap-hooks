// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    SingleOrArray,
}                           from './types'      // cssfn's types
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
    isNotFirstChild,
    
    
    
    // utilities:
    escapeSvg,
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
    usesSizeVariant,
    OrientationName,
    noOrientationInline,
    isOrientationInline,
    OrientationVariant,
    useOrientationVariant,
    ThemeName,
    outlinedOf,
    mildOf,
    usesForeg,
    usesBackg,
    usesBorderStroke,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './Basic'
import {
    // hooks:
    isActive,
    isPassive,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
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
    // styles:
    usesButtonLayout,
}                           from './Button'
import {
    // styles:
    usesIconImage,
}                           from './Icon'
import {
    stripOutList,
    stripOutFocusableElement,
}                           from './strip-outs'
import {
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import {
    // configs:
    cssProps as hcssProps,
}                           from './typos/horizontal-rule'



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

export type ListStyle = 'content'|'flat'|'flush'|'joined'|'btn'|'tab'|'breadcrumb'|'bullet'|'numbered' // might be added more styles in the future
export interface ListVariant {
    listStyle?: SingleOrArray<ListStyle>
}
export const useListVariant = (props: ListVariant) => {
    return {
        class: props.listStyle ? ((Array.isArray(props.listStyle) ? props.listStyle : [props.listStyle]).join(' ') || null) : null,
    };
};



// styles:
const wrapperElm  = ['li', '*'];
const listItemElm = ':first-child';



export const usesListItemInheritMildVariant = () => {
    return composition([
        variants([
            rule('.mild>*>&', [ // content
                imports([
                    mildOf(true),
                ]),
            ]),
        ]),
    ]);
};
export const usesListItemInheritParentVariants = () => {
    return composition([
        variants([
            rule('.content>*>&', [ // content
                imports([
                    usesContentLayout(),
                    usesContentVariants(),
                ]),
            ]),
            
            rule(':not(.inline)>*>&', [ // block
                imports([
                    // borders:
                    usesBorderAsSeparatorBlock(),
                ]),
            ]),
            rule('.inline>*>&', [ // inline
                imports([
                    // borders:
                    usesBorderAsSeparatorInline(),
                ]),
            ]),
        ]),
    ]);
};



export const usesListItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesIndicatorLayout(),
        ]),
        layout({
            // layouts:
            display   : 'block',  // fills the entire wrapper's width
            
            
            
            // sizes:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesListItemVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = {item}PropName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesIndicatorVariants(),
            usesListItemInheritMildVariant(),
            usesListItemInheritParentVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesListItemStates = () => {
    return composition([
        imports([
            // states:
            usesIndicatorStates(),
        ]),
    ]);
};
export const usesListItem = () => {
    return composition([
        imports([
            // layouts:
            usesListItemLayout(),
            
            // variants:
            usesListItemVariants(),
            
            // states:
            usesListItemStates(),
        ]),
    ]);
};

export const useListItemSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesListItem(),
        ]),
    ]),
]);



export const usesListSeparatorItemLayout = () => {
    return composition([
        layout({
            // spacings:
            padding : 0,
            
            
            
            // children:
            ...children('hr', composition([
                layout({
                    // spacings:
                    marginBlockStart : `calc(${hcssProps.marginBlockStart} / 2)`,
                    marginBlockEnd   : `calc(${hcssProps.marginBlockEnd  } / 2)`,
                }),
            ])),
        }),
    ]);
};
export const usesListSeparatorItem = () => {
    return composition([
        variants([
            rule('&&', [ // makes `.ListSeparatorItem` is more specific than `.ListSeparator`
                imports([
                    // layouts:
                    usesListSeparatorItemLayout(),
                ]),
            ]),
        ]),
    ]);
};
export const useListSeparatorItemSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesListSeparatorItem(),
        ]),
    ]),
]);



export const usesListActionItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesActionControlLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
    ]);
};
export const usesListActionItemVariants = () => {
    return composition([
        imports([
            // variants:
            usesActionControlVariants(),
            usesListItemInheritMildVariant(),
        ]),
    ]);
};
export const usesListActionItemStates = () => {
    return composition([
        imports([
            // states:
            usesActionControlStates(),
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
        ]),
    ]);
};
export const usesListActionItem = () => {
    return composition([
        imports([
            // layouts:
            usesListActionItemLayout(),
            
            // variants:
            usesListActionItemVariants(),
            
            // states:
            usesListActionItemStates(),
        ]),
    ]);
};

export const useListActionItemSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesListActionItem(),
        ]),
    ]),
]);



export const usesListLayout = () => {
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
         // display        : 'flex',    // customizable orientation // already defined in variant `.block`/`.inline`
         // flexDirection  : 'column',  // customizable orientation // already defined in variant `.block`/`.inline`
            justifyContent : 'start',   // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            alignItems     : 'stretch', // wrappers width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // children:
            ...children(wrapperElm, composition([
                layout({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire List's width
                    justifyContent : 'start',   // if listItems are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first listItem should be visible first
                    alignItems     : 'stretch', // listItems width are 100% of the wrapper (for variant `.block`) or height (for variant `.inline`)
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                }),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesListVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [foreg, foregRefs] = usesForeg();
    const [     , backgRefs] = usesBackg();
    
    
    
    return composition([
        imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule('.content', [ // content
                imports([
                    usesContentVariants(),
                ]),
            ]),
            
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
                            flexDirection : 'column', // listItem's items are stacked vertically (supports for the Accordion at blockStyle)
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
                            flexDirection : 'row', // listItem's items are stacked horizontally (supports for the Accordion at inlineStyle)
                        }),
                    ])),
                }),
            ]),
        ]),
        variants([
            rule(['.flat', '.flush', '.btn', '.breadcrumb', '.bullet'], [
                layout({
                    // borders:
                    // kill borders surrounding List:
                    borderWidth  : 0,
                    borderRadius : 0,
                    overflow     : 'unset',
                }),
            ]),
            rule(['.flat', '.joined', '.breadcrumb'], [
                layout({
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // borders:
                            // kill separator between items:
                            borderWidth : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, composition([
                                layout({
                                    // borders:
                                    // kill border on each item:
                                    borderWidth : 0,
                                }),
                            ])),
                        }),
                    ])),
                }),
            ]),
            
            rule('.btn', [
                layout({
                    // spacings:
                    // add space between buttons:
                    gap : cssProps.bulletSpacing,
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // borders:
                            // kill separator between buttons:
                            borderWidth : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, composition([
                                imports([
                                    // layouts:
                                    usesButtonLayout(),
                                ]),
                            ])),
                        }),
                    ])),
                }),
            ]),
            rule('.tab', [
                layout({
                    // borders:
                    // allow the items to overflow, so the `active item` can hide the `border(Bottom|Right)`:
                    overflow: 'visible',
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // borders:
                            // kill separator between tabs:
                            borderWidth : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, composition([
                                imports([
                                    // borders:
                                    usesBorderStroke(),
                                ]),
                                layout({
                                    // borders:
                                    backgroundClip : 'padding-box',
                                }),
                                variants([
                                    isPassive([
                                        variants([
                                            rule(':not(.inline)&', [ // block
                                                layout({
                                                    // borders:
                                                    // show parent border right:
                                                    borderBlockWidth       : 0,
                                                    borderInlineStartColor : 'transparent',
                                                }),
                                            ]),
                                            rule('.inline&', [ // inline
                                                layout({
                                                    // borders:
                                                    // show parent border bottom:
                                                    borderInlineWidth      : 0,
                                                    borderBlockStartColor  : 'transparent',
                                                }),
                                            ]),
                                        ]),
                                    ]),
                                    isActive([
                                        variants([
                                            rule(':not(.inline)&', [ // block
                                                layout({
                                                    // borders:
                                                    // hide parent border right:
                                                    borderInlineEndColor   : backgRefs.backgCol,
                                                    // add rounded corners on left:
                                                    borderStartStartRadius : cssProps.tabBorderRadius,
                                                    borderEndStartRadius   : cssProps.tabBorderRadius,
                                                }),
                                            ]),
                                            rule('.inline&', [ // inline
                                                layout({
                                                    // borders:
                                                    // hide parent border bottom:
                                                    borderBlockEndColor    : backgRefs.backgCol,
                                                    // add rounded corners on top:
                                                    borderStartStartRadius : cssProps.tabBorderRadius,
                                                    borderStartEndRadius   : cssProps.tabBorderRadius,
                                                }),
                                            ]),
                                        ]),
                                    ]),
                                ]),
                            ])),
                        }),
                    ])),
                }),
                variants([
                    noOrientationInline([ // block
                        layout({
                            // layouts:
                            // tab directions are block (down) but List direction are inline:
                            display                : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                            
                            
                            
                            // borders:
                            // kill border [top, left, bottom] surrounding tab:
                            borderBlockWidth       : 0,
                            borderInlineStartWidth : 0,
                            borderRadius           : 0,
                            
                            
                            
                            // children:
                            ...children(wrapperElm, composition([
                                layout({
                                    // spacings:
                                    // shift the items to right a bit, so the `active item` can hide the `borderRight`:
                                    marginInlineEnd : `calc(0px - ${bcssProps.borderWidth})`,
                                }),
                            ])),
                        }),
                    ]),
                    isOrientationInline([ // inline
                        layout({
                            // layouts:
                            // tab directions are inline (right) but List direction are block:
                            display                : 'flex',        // use block flexbox, so it takes the entire parent's width
                            
                            
                            
                            // borders:
                            // kill border [left, top, right] surrounding tab:
                            borderInlineWidth      : 0,
                            borderBlockStartWidth  : 0,
                            borderRadius           : 0,
                            
                            
                            
                            // children:
                            ...children(wrapperElm, composition([
                                layout({
                                    // spacings:
                                    // shift the items to bottom a bit, so the `active item` can hide the `borderBottom`:
                                    marginBlockEnd : `calc(0px - ${bcssProps.borderWidth})`,
                                }),
                            ])),
                        }),
                    ]),
                ]),
            ]),
            rule('.breadcrumb', [
                layout({
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // children:
                            ...children(listItemElm, composition([
                                layout({
                                    // typos:
                                    lineHeight    : 1,
                                    
                                    
                                    
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'breadcrumb')), // apply general cssProps starting with breadcrumb***
                                }),
                            ])),
                        }),
                        variants([
                            isNotFirstChild([
                                imports([
                                    // colors:
                                    foreg(),
                                ]),
                                layout({
                                    // children:
                                    ...children('::before', composition([
                                        imports([
                                            usesIconImage(
                                                /*iconImage: */cssProps.breadcrumbSeparatorImg,
                                                /*iconColor: */foregRefs.foreg,
                                            ),
                                        ]),
                                        layout({
                                            // layouts:
                                            display    : 'block', // fills the entire wrapper's width
                                            content    : '""',
                                            
                                            
                                            
                                            // customize:
                                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'breadcrumbSeparator')), // apply general cssProps starting with breadcrumbSeparator***
                                        }),
                                    ])),
                                }),
                            ]),
                        ]),
                    ])),
                }),
            ]),
            rule('.bullet', [
                layout({
                    // layouts:
                    justifyContent : 'space-between', // separates each bullet as far as possible
                    alignItems     : 'center',        // each bullet might have different size, so center it instead of stretch it
                    
                    
                    
                    // spacings:
                    // add space between bullets:
                    gap            : cssProps.bulletSpacing,
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // borders:
                            // kill separator between bullets:
                            borderWidth : 0,
                            
                            
                            
                            // sizes:
                            flex        : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                            
                            
                            
                            // children:
                            ...children(listItemElm, composition([
                                imports([
                                    // borders:
                                    usesBorderStroke(),
                                ]),
                                layout({
                                    // borders:
                                    borderRadius : borderRadiuses.pill, // big rounded corner
                                    overflow     : 'hidden',            // clip the children at the rounded corners
                                    
                                    
                                    
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'bullet')), // apply general cssProps starting with bullet***
                                }),
                            ])),
                        }),
                    ])),
                }),
            ]),
            rule('.numbered', [
                layout({
                    // counters:
                    counterReset: 'ListNumber',
                    
                    
                    
                    // children:
                    ...children(wrapperElm, composition([
                        layout({
                            // children:
                            ...children(listItemElm, composition([
                                variants([
                                    rule(':not(.void)', [
                                        layout({
                                            // children:
                                            ...children('::before', composition([
                                                layout({
                                                    // counters:
                                                    counterIncrement : 'ListNumber',
                                                    content          : [['counters(ListNumber, ".")', '". "']],
                                                }),
                                            ])),
                                        }),
                                    ])
                                ]),
                            ])),
                        }),
                    ])),
                }),
            ]),
        ], /*minSpecificityWeight: */2),
    ]);
};
export const usesListStates = () => {
    return composition([
        imports([
            // states:
            usesIndicatorStates(),
        ]),
    ]);
};
export const usesList = () => {
    return composition([
        imports([
            // layouts:
            usesListLayout(),
            
            // variants:
            usesListVariants(),
            
            // states:
            usesListStates(),
        ]),
    ]);
};

export const useListSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesList(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        btnSpacing        : spacers.sm,
        btnSpacingSm      : spacers.xs,
        btnSpacingLg      : spacers.md,
        
        
        
        tabBorderRadius   : bcssProps.borderRadius,
        tabBorderRadiusSm : bcssProps.borderRadiusSm,
        tabBorderRadiusLg : bcssProps.borderRadiusLg,
        
        
        
        breadcrumbPaddingInline         : bcssProps.paddingBlock,
        breadcrumbPaddingBlock          : bcssProps.paddingBlock,
        breadcrumbPaddingInlineSm       : bcssProps.paddingBlockSm,
        breadcrumbPaddingBlockSm        : bcssProps.paddingBlockSm,
        breadcrumbPaddingInlineLg       : bcssProps.paddingBlockLg,
        breadcrumbPaddingBlockLg        : bcssProps.paddingBlockLg,
        
        breadcrumbSeparatorImg          : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><polyline points='7.5 3 16.5 12 7.5 21' fill='none' stroke='#000' stroke-linecap='square' stroke-width='3'/></svg>")}")`,
        breadcrumbSeparatorInlineSize   : '0.8em',
        breadcrumbSeparatorMarginInline : '0.25em',
        
        
        
        bulletSpacing     : spacers.sm,
        bulletSpacingSm   : spacers.xs,
        bulletSpacingLg   : spacers.md,
        
        bulletPadding     : spacers.xs,
        bulletPaddingSm   : spacers.xxs,
        bulletPaddingLg   : spacers.sm,
        //#endregion spacings
    };
}, { prefix: 'lg' });



// react components:

export interface ListItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ActionControlProps<TElement>,
        React.AnchorHTMLAttributes<TElement>
{
    // accessibilities:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `List`.  
     * `false`     : independent `active`.
     */
    inheritActive? : boolean
    
    
    // behaviors:
    actionCtrl?    : boolean
    
    
    // children:
    children?      : React.ReactNode
}
export function ListItem<TElement extends HTMLElement = HTMLElement>(props: ListItemProps<TElement>) {
    // styles:
    const sheet       = useListItemSheet();
    const sheetAction = useListActionItemSheet();
    
    
    
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
            mainClass={props.mainClass ?? [sheet.main, sheetAction.main].join(' ')}
        />
        :
        <Indicator<TElement>
            // other props:
            {...props}
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        />
    );
}
export type { ListItemProps as ItemProps }
export { ListItem as Item }



export function ListSeparatorItem<TElement extends HTMLElement = HTMLElement>(props: ListItemProps<TElement>) {
    // styles:
    const sheet          = useListItemSheet();
    const sheetSeparator = useListSeparatorItemSheet();
    
    
    
    // jsx:
    return (
        <ListItem<TElement>
            // other props:
            {...props}
            
            
            // behaviors:
            actionCtrl={false}
            
            
            // classes:
            mainClass={props.mainClass ?? [sheet.main, sheetSeparator.main, 'void'].join(' ')}
        >
            <hr />
        </ListItem>
    );
}
ListSeparatorItem.prototype = ListItem.prototype; // mark as ListItem compatible



export interface ListProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>,
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        ListVariant
{
    // behaviors:
    actionCtrl? : boolean
}
export function List<TElement extends HTMLElement = HTMLElement>(props: ListProps<TElement>) {
    // styles:
    const sheet              = useListSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const listVariant        = useListVariant(props);
    
    
    
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
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={parentTag}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
                listVariant.class,
            ]}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <Element
                    // essentials:
                    key={index}
                    tag={wrapTag}
                >
                    {
                        isTypeOf(child, ListItem)
                        ?
                        <child.type
                            // other props:
                            {...child.props}
                            
                            
                            // behaviors:
                            actionCtrl={child.props.actionCtrl ?? actionCtrl} // the default value of [actionCtrl] is belong to List's [actionCtrl]
                            
                            
                            // events:
                            onAnimationEnd={(e) => {
                                // triggers `List`'s onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                                
                                
                                // forwards:
                                child.props.onAnimationEnd?.(e);
                            }}
                        />
                        :
                        <ListItem
                            // behaviors:
                            actionCtrl={actionCtrl} // the default value of [actionCtrl] is belong to List's [actionCtrl]
                            
                            
                            // events:
                            onAnimationEnd={(e) => {
                                // triggers `List`'s onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                            }}
                        >
                            { child }
                        </ListItem>
                    }
                </Element>
            ))}
        </Indicator>
    );
}
export { List as default }

export type { OrientationName, OrientationVariant }
