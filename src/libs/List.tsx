// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    SingleOrArray,
}                           from './types'      // cssfn's types
import {
    // general types:
    SelectorCollection,
    
    
    
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    states,
    isNotFirstChild,
    
    
    
    //combinators:
    children,
    
    
    
    // utilities:
    escapeSvg,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import {
    horizontalRule,
}                           from './typos/index'
import {
    stripoutList,
    stripoutFocusableElement,
}                           from './stripouts'
import {
    // utilities:
    isTypeOf,
}                           from './utilities'

// nodestrap components:
import {
    // general types:
    Tag,
    
    
    
    // hooks:
    useTestSemantic,
    
    
    
    // react components:
    Element,
}                           from './Element'
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
    
    ThemeName,
    outlinedOf,
    mildOf,
    usesBorder,
    usesBorderStroke,
    expandBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    usesPadding,
    
    
    
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
    // hooks:
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
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
    // selectors:
    selectorIsFirstVisibleChild,
    selectorIsLastVisibleChild,
    
    
    
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
}                           from './Container'
import {
    // styles:
    usesContentBasicLayout,
    usesContentBasicVariants,
    usesContentChildren,
}                           from './Content'
import {
    // hooks:
    usesIconColor,
    
    
    // styles:
    usesIconImage,
}                           from './Icon'
import {
    // styles:
    usesButtonLayout,
    
    
    
    // react components:
    ButtonType,
}                           from './Button'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;


// states:

//#region activePassive
export const markActive = () => style({
    ...imports([
        outlinedOf(null), // keeps outlined variant
        mildOf(null),     // keeps mild     variant
        
        usesThemeActive(), // switch to active theme
    ]),
});
export const dontMarkActive = () => style({
    ...imports([
        outlinedOf(null), // keeps outlined variant
        mildOf(null),     // keeps mild     variant
        
        usesThemeActive(null), // keeps current theme
    ]),
});

// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null) => controlUsesThemeDefault(themeName);

// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary') => controlUsesThemeActive(themeName);
//#endregion activePassive


// appearances:

export type ListBasicStyle = 'flat'|'flush'|'joined';
export type ListStyle      = ListBasicStyle|'content'|'btn'|'tab'|'breadcrumb'|'bullet'|'numbered' // might be added more styles in the future
export interface ListVariant {
    listStyle?: SingleOrArray<ListStyle>
}
export const useListVariant = (props: ListVariant) => {
    return {
        class: props.listStyle ? ((Array.isArray(props.listStyle) ? props.listStyle : [props.listStyle]).filter((style) => !!style).join(' ') || null) : null,
    };
};



// styles:
// const wrapperElm  = ['li', '*'];                // inconsistent specificity
export const wrapperElm  = '*';                    // zero specificity
export const listItemElm = ':where(:first-child)'; // zero specificity



export const stripoutCommonBasicLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        // borders:
        // undef border stroke:
        [borderStrokeDecls.border     ] : null,
        [borderStrokeDecls.borderWidth] : null,
        
        // undef border radius:
        [borderRadiusDecls.borderStartStartRadius] : null,
        [borderRadiusDecls.borderStartEndRadius  ] : null,
        [borderRadiusDecls.borderEndStartRadius  ] : null,
        [borderRadiusDecls.borderEndEndRadius    ] : null,
    });
};
export const usesListItemInheritMildVariant = () => {
    return style({
        ...variants([
            rule('.mild>*>&', { // .mild>*>.listItem => specificity weight excluding parent = 1
                ...imports([
                    mildOf(true),
                ]),
            }),
        ]),
    });
};



export const usesListItemBaseLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    /*
        a hack with :not(_)
        the total selector combined with parent is something like this: `:not(.inline)>*>.listItem:not(_)`, the specificity weight = 2.1
        the specificity of 2.1 is a bit higher than:
        * `.list.content`             , the specificity weight = 2
        * `.someComponent.togglerBtn` , the specificity weight = 2
        but can be easily overriden by specificity weight >= 3, like:
        * `.list.btn.btn`             , the specificity weight = 3
        * `.someComponent.boo.foo`    , the specificity weight = 3
    */
    const parentOrientationBlockSelector  = `${orientationBlockSelector}>*>&:not(_)`;
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&:not(_)`;
    
    
    
    return style({
        // borders:
        ...rule(parentOrientationBlockSelector,  { // block
            ...imports([
                usesBorderAsSeparatorBlock(),      // must be placed at the last
            ]),
        }),
        ...rule(parentOrientationInlineSelector, { // inline
            ...imports([
                usesBorderAsSeparatorInline(),     // must be placed at the last
            ]),
        }),
    });
};
export const usesListItemLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
            
            // resets:
            stripoutCommonBasicLayout(),
            
            // layouts:
            usesListItemBaseLayout(options),
        ]),
        ...style({
            // layouts:
            display   : 'block',  // fills the entire wrapper's width
            
            
            
            // sizes:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    });
};
export const usesListItemVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = {item}PropName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            usesListItemInheritMildVariant(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesListItemStates = () => {
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
        ]),
    });
};

export const useListItemSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesListItemLayout(),
            
            // variants:
            usesListItemVariants(),
            
            // states:
            usesListItemStates(),
        ]),
    ),
], /*sheetId :*/'2vajf0sgc2'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesListSeparatorItemLayout = () => {
    // options:
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(defaultOrientationRuleOptions);
    const parentOrientationBlockSelector  = `${orientationBlockSelector}>*>&`;
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&`;
    
    
    
    // dependencies:
    
    // colors:
    const [, borderRefs    ] = usesBorder();
    
    // spacings:
    const [, , paddingDecls] = usesPadding();
    
    
    
    return style({
        // layouts:
        display        : 'flex',    // use block flexbox, so it takes the entire wrapper's width
        ...rule(parentOrientationBlockSelector, {
            flexDirection     : 'row',    // items are stacked horizontally
        }),
        ...rule(parentOrientationInlineSelector, {
            flexDirection     : 'column', // items are stacked vertically
        }),
        justifyContent : 'center',  // center items (text, icon, etc) horizontally
        alignItems     : 'center',  // center items (text, icon, etc) vertically
        flexWrap       : 'nowrap',  // no wrapping
        
        
        
        // spacings:
        [paddingDecls.paddingInline] : '0px', // discard padding
        [paddingDecls.paddingBlock ] : '0px', // discard padding
        
        
        
        // children:
        ...children('hr', {
            // foregrounds:
            foreg            : borderRefs.borderCol,
            
            
            
            // sizes:
            flex             : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // appearances:
            opacity          : 'unset',
            
            
            
            // spacings:
            marginBlockStart : `calc(${horizontalRule.cssProps.marginBlockStart} / 2)`,
            marginBlockEnd   : `calc(${horizontalRule.cssProps.marginBlockEnd  } / 2)`,
        }),
        ...rule(parentOrientationInlineSelector, {
            // children:
            ...children('hr', {
                // appearances:
                // rotate the <hr> 90 deg:
                writingMode: 'vertical-lr',
            }),
        }),
    });
};

export const useListSeparatorItemSheet = createUseSheet(() => [
    mainComposition(
        rule('&&', { // makes `.ListSeparatorItem` is more specific than `.ListItem`
            ...imports([
                // layouts:
                usesListSeparatorItemLayout(),
            ]),
        }),
    ),
], /*sheetId :*/'n8qnfmo0ja'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesListActionItemLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
            
            // resets:
            stripoutCommonBasicLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
    });
};
export const usesListActionItemVariants = () => {
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            usesListItemInheritMildVariant(),
        ]),
    });
};
export const usesListActionItemStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
        ...states([
            isActive({
                ...imports([
                    markActive(),
                ]),
            }),
            isFocus({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
            isArrive({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
            isPress({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
        ]),
    });
};

export const useListActionItemSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesListActionItemLayout(),
            
            // variants:
            usesListActionItemVariants(),
            
            // states:
            usesListActionItemStates(),
        ]),
    ),
], /*sheetId :*/'1jdx2owh1e'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesListLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    // dependencies:
    
    // colors:
    const [border      ] = usesBorder();
    
    // borders:
    const [borderStroke] = usesBorderStroke();
    const [borderRadius, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(),     // clear browser's default styles
            stripoutList(),                 // clear browser's default styles
            
            // colors:
            border(),
            
            // borders:
            // borderStroke(), // moved out to dedicated border stroke for each list & wrapper
            borderRadius(),
            usesBorderAsContainer(options), // make a nicely rounded corners
        ]),
        ...style({
            // layouts:
            ...rule(orientationBlockSelector,  {   // block
                display           : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection     : 'column',      // items are stacked vertically
            }),
            ...rule(orientationInlineSelector, {   // inline
                display           : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection     : 'row',         // items are stacked horizontally
            }),
            justifyContent : 'start',   // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            alignItems     : 'stretch', // wrappers width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                ...imports([
                    borderStroke(), // dedicated border stroke for each list & wrapper
                ]),
            }),
            ...rule(orientationBlockSelector,  { // block
                // children:
                ...children(wrapperElm, {
                    ...imports([
                        // borders:
                        usesBorderAsSeparatorBlock(), // must be placed at the last
                    ]),
                }),
            }),
            ...rule(orientationInlineSelector, { // inline
                // children:
                ...children(wrapperElm, {
                    ...imports([
                        // borders:
                        usesBorderAsSeparatorInline(), // must be placed at the last
                    ]),
                }),
            }),
            
            
            
            // children:
            ...children(wrapperElm, {
                // layouts:
                display        : 'flex',    // use block flexbox, so it takes the entire List's width
                justifyContent : 'start',   // if listItems are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first listItem should be visible first
                alignItems     : 'stretch', // listItems width are 100% of the wrapper (for variant `.block`) or height (for variant `.inline`)
                flexWrap       : 'nowrap',  // no wrapping
                
                
                
                // sizes:
                flex           : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            }),
            ...rule(orientationBlockSelector,  { // block
                // children:
                ...children(wrapperElm, {
                    // layouts:
                    flexDirection : 'column', // listItem's items are stacked vertically (supports for the Accordion at blockStyle)
                    
                    
                    
                    // children:
                    /*
                        a hack with :not(_)
                        the total selector combined with parent is something like this: `.list:not(.inline)>*>:not(_):where(:first-child)`, the specificity weight = 2.1
                        the specificity of 2.1 is a bit higher than:
                        * `.list.content`             , the specificity weight = 2
                        * `.someComponent.togglerBtn` , the specificity weight = 2
                        but can be easily overriden by specificity weight >= 3, like:
                        * `.list.btn.btn`             , the specificity weight = 3
                        * `.someComponent.boo.foo`    , the specificity weight = 3
                    */
                    ...children(':not(_)', {
                        ...rule(selectorIsFirstVisibleChild, {
                            // borders:
                            // add rounded corners on top:
                            [borderRadiusDecls.borderStartStartRadius      ] : 'inherit', // copy wrapper's borderRadius
                            [borderRadiusDecls.borderStartEndRadius        ] : 'inherit', // copy wrapper's borderRadius
                        }),
                        ...rule(selectorIsLastVisibleChild,  {
                            // borders:
                            // add rounded corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius        ] : 'inherit', // copy wrapper's borderRadius
                            [borderRadiusDecls.borderEndEndRadius          ] : 'inherit', // copy wrapper's borderRadius
                        }),
                    }),
                }),
            }),
            ...rule(orientationInlineSelector, { // inline
                // children:
                ...children(wrapperElm, {
                    // layouts:
                    flexDirection : 'row', // listItem's items are stacked horizontally (supports for the Accordion at inlineStyle)
                    
                    
                    
                    // children:
                    /*
                        a hack with :not(_)
                        the total selector combined with parent is something like this: `.list:not(.inline)>*>:not(_):where(:first-child)`, the specificity weight = 2.1
                        the specificity of 2.1 is a bit higher than:
                        * `.list.content`             , the specificity weight = 2
                        * `.someComponent.togglerBtn` , the specificity weight = 2
                        but can be easily overriden by specificity weight >= 3, like:
                        * `.list.btn.btn`             , the specificity weight = 3
                        * `.someComponent.boo.foo`    , the specificity weight = 3
                    */
                    ...children(':not(_)', {
                        ...rule(selectorIsFirstVisibleChild, {
                            // borders:
                            // add rounded corners on left:
                            [borderRadiusDecls.borderStartStartRadius      ] : 'inherit', // copy wrapper's borderRadius
                            [borderRadiusDecls.borderEndStartRadius        ] : 'inherit', // copy wrapper's borderRadius
                        }),
                        ...rule(selectorIsLastVisibleChild,  {
                            // borders:
                            // add rounded corners on right:
                            [borderRadiusDecls.borderStartEndRadius        ] : 'inherit', // copy wrapper's borderRadius
                            [borderRadiusDecls.borderEndEndRadius          ] : 'inherit', // copy wrapper's borderRadius
                        }),
                    }),
                }),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                // borders:
                ...expandBorderStroke(), // expand borderStroke css vars
            }),
            ...expandBorderRadius(),     // expand borderRadius css vars
        }),
    });
};
export interface ListBasicVariantOptions {
    additionRemoveBorderSelector?    : SelectorCollection
    additionRemoveSeparatorSelector? : SelectorCollection
    
    specificityWeight?               : number
}
export const usesListBasicVariants = (options?: ListBasicVariantOptions) => {
    // options:
    const {
        additionRemoveBorderSelector,
        additionRemoveSeparatorSelector,
        specificityWeight,
    } = options ?? {};
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...variants([
            rule(['.flat', '.flush', additionRemoveBorderSelector], {
                // borders:
                // kill borders surrounding List:
                [borderStrokeDecls.borderWidth           ] : '0px',
                
                // remove rounded corners on top:
                [borderRadiusDecls.borderStartStartRadius] : '0px',
                [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                [borderRadiusDecls.borderEndEndRadius    ] : '0px',
            }),
            rule(['.flat', '.joined', additionRemoveSeparatorSelector], {
                // children:
                ...children(wrapperElm, {
                    // borders:
                    // kill separator between items:
                    [borderStrokeDecls.borderWidth] : '0px',
                }),
            }),
        ], { specificityWeight }),
    });
}
export const usesListVariants = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    // colors:
    const [         ,              , borderDecls] = usesBorder();
    const [iconColor, iconColorRefs             ] = usesIconColor();
    
    // borders:
    const [borderStroke, borderStrokeRefs,                  ] = usesBorderStroke();
    const [            ,                 , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule('.content', { // content
                ...imports([
                    // variants:
                    usesContentBasicVariants(),
                ]),
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children('*', { // Accordion support, both for `listItemElm` and secondListItemElm
                        ...imports([
                            // layouts:
                            usesContentBasicLayout(),
                            
                            // children:
                            usesContentChildren(),
                        ]),
                    }),
                }),
            }),
        ]),
        ...imports([
            usesListBasicVariants({
                additionRemoveBorderSelector    : ['.btn', '.tab', '.breadcrumb', '.bullet'],
                additionRemoveSeparatorSelector : ['.btn', '.tab', '.breadcrumb', '.bullet'],
                // specificityWeight            : 2, // not needed
            }),
        ]),
        ...variants([ 
            rule('.btn', {
                // spacings:
                // add space between buttons:
                gap : cssProps.btnSpacing,
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        ...imports([
                            // layouts:
                            usesButtonLayout(),
                        ]),
                        ...style({
                            // accessibilities:
                            // undef cursor:
                            cursor : null,
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'btn')), // apply general cssProps starting with btn***
                        }),
                    }),
                }),
            }),
            rule('.tab', {
                // layouts:
                ...rule(orientationBlockSelector,  { // block
                    // tab directions are block (down) but List direction are inline:
                    display                : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    
                    
                    
                    // borders:
                    // kill border [top, left, bottom] surrounding tab:
                    borderBlockWidth       : 0,
                    borderInlineStartWidth : 0,
                }),
                ...rule(orientationInlineSelector, { // inline
                    // tab directions are inline (right) but List direction are block:
                    display                : 'flex',        // use block flexbox, so it takes the entire parent's width
                    
                    
                    
                    // borders:
                    // kill border [left, top, right] surrounding tab:
                    borderInlineWidth      : 0,
                    borderBlockStartWidth  : 0,
                }),
                
                
                
                // children:
                ...rule(orientationBlockSelector,  { // block
                    // children:
                    ...children(wrapperElm, {
                        // spacings:
                        // shift the items to right a bit, so the `active item` can hide the `borderRight`:
                        marginInlineEnd : `calc(0px - ${borderStrokeRefs.borderWidth})`,
                    }),
                }),
                ...rule(orientationInlineSelector, { // inline
                    // children:
                    ...children(wrapperElm, {
                        // spacings:
                        // shift the items to bottom a bit, so the `active item` can hide the `borderBottom`:
                        marginBlockEnd : `calc(0px - ${borderStrokeRefs.borderWidth})`,
                    }),
                }),
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        ...imports([
                            // borders:
                            borderStroke(),
                        ]),
                        ...style({
                            // borders:
                            ...expandBorderStroke(), // expand borderStroke css vars
                            [borderDecls.borderCol] : 'inherit', // change borderColor independent to child's theme color
                            backgroundClip          : 'padding-box',
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'tab')), // apply general cssProps starting with tab***
                            borderRadius: null, // tab borderRadius has been handled
                        }),
                        ...states([
                            isPassive({
                                ...rule(`${orientationBlockSelector}&`,  { // block
                                    // borders:
                                    // show parent border right:
                                    borderBlockWidth       : '0px',
                                    borderInlineStartColor : 'transparent',
                                }),
                                ...rule(`${orientationInlineSelector}&`, { // inline
                                    // borders:
                                    // show parent border bottom:
                                    borderInlineWidth      : '0px',
                                    borderBlockStartColor  : 'transparent',
                                }),
                            }),
                            isActive({
                                ...rule(`${orientationBlockSelector}&`,  { // block
                                    // borders:
                                    // hide parent border right:
                                    borderInlineEndWidth   : '0px',
                                    // add rounded corners on left:
                                    [borderRadiusDecls.borderStartStartRadius] : cssProps.tabBorderRadius,
                                    [borderRadiusDecls.borderEndStartRadius  ] : cssProps.tabBorderRadius,
                                }),
                                ...rule(`${orientationInlineSelector}&`, { // inline
                                    // borders:
                                    // hide parent border bottom:
                                    borderBlockEndWidth    : '0px',
                                    // add rounded corners on top:
                                    [borderRadiusDecls.borderStartStartRadius] : cssProps.tabBorderRadius,
                                    [borderRadiusDecls.borderStartEndRadius  ] : cssProps.tabBorderRadius,
                                }),
                            }),
                        ]),
                    }),
                }),
            }),
            rule('.breadcrumb', {
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...isNotFirstChild({
                        ...imports([
                            // colors:
                            iconColor(), // do not import `iconColor()` on pseudo `::before`
                        ]),
                        // children:
                        ...children('::before', {
                            ...imports([
                                usesIconImage(
                                    /*iconImage: */cssProps.breadcrumbSeparatorImg,
                                    /*iconColor: */iconColorRefs.iconCol,
                                ),
                            ]),
                            ...style({
                                // layouts:
                                display    : 'block', // fills the entire wrapper's width
                                content    : '""',
                                
                                
                                
                                // sizes:
                                flex       : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                                
                                
                                
                                // customize:
                                ...usesGeneralProps(usesPrefixedProps(cssProps, 'breadcrumbSeparator')), // apply general cssProps starting with breadcrumbSeparator***
                            }),
                        }),
                    }),
                    ...children(listItemElm, {
                        // typos:
                        lineHeight    : 1,
                        
                        
                        
                        // customize:
                        ...usesGeneralProps(usesPrefixedProps(cssProps, 'breadcrumb')), // apply general cssProps starting with breadcrumb***
                    }),
                }),
            }),
            rule('.bullet', {
                // layouts:
                justifyContent : 'space-between', // separates each bullet as far as possible
                alignItems     : 'center',        // each bullet might have different size, so center it instead of stretch it
                
                
                
                // spacings:
                // add space between bullets:
                gap            : cssProps.bulletSpacing,
                
                
                
                // children:
                ...children(wrapperElm, {
                    // sizes:
                    flex        : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                    
                    
                    
                    // children:
                    ...children(listItemElm, {
                        ...imports([
                            // borders:
                            borderStroke(),
                        ]),
                        ...style({
                            // borders:
                            ...expandBorderStroke(), // expand borderStroke css vars
                            
                            // big rounded corners on top:
                            [borderRadiusDecls.borderStartStartRadius] : borderRadiuses.pill,
                            [borderRadiusDecls.borderStartEndRadius  ] : borderRadiuses.pill,
                            // big rounded corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius  ] : borderRadiuses.pill,
                            [borderRadiusDecls.borderEndEndRadius    ] : borderRadiuses.pill,
                            
                            overflow     : 'hidden',            // clip the children at the rounded corners
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'bullet')), // apply general cssProps starting with bullet***
                        }),
                    }),
                }),
            }),
            rule('.numbered', {
                // counters:
                counterReset: 'ListNumber',
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        ...rule(':not(.void)', {
                            // children:
                            ...children('::before', {
                                // counters:
                                counterIncrement : 'ListNumber',
                                
                                
                                
                                // customize:
                                ...usesGeneralProps(usesPrefixedProps(cssProps, 'numbered')), // apply general cssProps starting with numbered***
                            }),
                        }),
                    }),
                }),
            }),
        ], { specificityWeight: 2 }),
        /*
            the total selector combined with parent is something like this: `.list.btn.btn`, the specificity weight = 3
            the specificity of 3 is a bit higher than:
            *      `:not(.inline)>*>.listItem:not(_)`           , the specificity weight = 2.1 (listItem's borderSeparator)
            * `.list:not(.inline)>*>:not(_):where(:first-child)`, the specificity weight = 2.1 (listItem's borderRadius)
        */
    });
};
export const usesListStates = () => {
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
        ]),
    });
};

export const useListSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesListLayout(),
            
            // variants:
            usesListVariants(),
            
            // states:
            usesListStates(),
        ]),
    ),
], /*sheetId :*/'dj4jw72kyr'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        btnSpacing        : spacers.sm,
        btnSpacingSm      : spacers.xs,
        btnSpacingLg      : spacers.md,
        
        
        
        tabTextAlign      : 'center',
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
        
        
        
        numberedContent   : [['counters(ListNumber, ".")', '". "']],
    };
}, { prefix: 'lst' });



// react components:

export interface ListItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ActionControlProps<TElement>,
        React.ButtonHTMLAttributes<TElement>,
        React.AnchorHTMLAttributes<TElement>
{
    // actions:
    type?          : ButtonType
    
    
    
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
    
    
    
    /* not using <button> for "button" because the children may contain any_html_elements */
    // fn props:
    // const semanticTag  = props.semanticTag  ?? (props.href ? 'a'    : 'button');
    // const semanticRole = props.semanticRole ?? (props.href ? 'link' : 'button');
    // const [, , , isSemanticBtn] = useTestSemantic({ tag: props.tag, role: props.role, semanticTag, semanticRole }, { semanticTag: 'button', semanticRole: 'button' });
    
    
    
    // jsx:
    return (
        props.actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? (props.href ? 'a'    : [null]  )} /* not using <button> for "button" because the children may contain any_html_elements */
            semanticRole={props.semanticRole ?? (props.href ? 'link' : 'button')}
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? [sheet.main, sheetAction.main].join(' ')}
            
            
            /* not using <button> for "button" because the children may contain any_html_elements */
            // // Button props:
            // {...{
            //     // actions:
            //     type : props.type ?? (isSemanticBtn ? 'button' : undefined),
            // }}
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
    const sheet                 = useListSheet();
    
    
    
    // variants:
    const orientationVariant    = useOrientationVariant(props);
    const orientationHorizontal = (orientationVariant.class === 'inline');
    const listVariant           = useListVariant(props);
    
    
    
    // rest props:
    const {
        // behaviors:
        actionCtrl,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const listTag          = ['ul', 'ol'] as Array<Tag>;
    const listRole         = 'list';
    const semanticTag      = props.semanticTag  ?? listTag;
    const semanticRole     = props.semanticRole ?? listRole;
    const [, , isList, isSemanticList] = useTestSemantic({ tag: props.tag, role: props.role, semanticTag, semanticRole }, { semanticTag: listTag, semanticRole: listRole });
    
    const wrapSemanticTag  = (isSemanticList ? 'li'       : [null]);
    const wrapSemanticRole = (isList         ? 'listitem' : [null]);
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={semanticTag }
            semanticRole={semanticRole}
            
            aria-orientation={props['aria-orientation'] ?? (orientationHorizontal ? 'horizontal' : 'vertical')}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
                listVariant.class,
            ]}
        >
            {React.Children.map(children, (child, index) => {
                // handlers:
                const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
                    // triggers `List`'s onAnimationEnd event
                    e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                };
                
                
                
                // jsx:
                return (
                    <Element
                        // essentials:
                        key={index}
                        
                        
                        // semantics:
                        semanticTag ={wrapSemanticTag }
                        semanticRole={wrapSemanticRole}
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
                                    child.props.onAnimationEnd?.(e);
                                    
                                    
                                    
                                    handleAnimationEnd(e);
                                }}
                            />
                            :
                            <ListItem
                                // behaviors:
                                actionCtrl={actionCtrl} // the default value of [actionCtrl] is belong to List's [actionCtrl]
                                
                                
                                // events:
                                onAnimationEnd={handleAnimationEnd}
                            >
                                { child }
                            </ListItem>
                        }
                    </Element>
                );
            })}
        </Indicator>
    );
}
export { List as default }

export type { OrientationName, OrientationVariant }
