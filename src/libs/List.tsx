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
    isFirstChild,
    isNotFirstChild,
    isLastChild,
    
    
    
    // utilities:
    escapeSvg,
}                           from './cssfn'       // cssfn core
import {
    // general types:
    Tag,
    
    
    
    // hooks:
    createUseSheet,
    useTestSemantic,
    
    
    
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
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    ThemeName,
    outlinedOf,
    mildOf,
    usesBackg,
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
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
    
    
    
    // styles:
    usesContentMedia,
    usesContentLayout,
    usesContentVariants,
}                           from './Content'
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
    // styles:
    usesButtonLayout,
    
    
    
    // react components:
    ButtonType,
}                           from './Button'
import {
    // hooks:
    usesIconColor,
    
    
    // styles:
    usesIconImage,
}                           from './Icon'
import {
    stripoutList,
    stripoutFocusableElement,
}                           from './stripouts'
import {
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import {
    // configs:
    cssProps as hcssProps,
}                           from './typos/horizontal-rule'



// defaults:
const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;



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
        class: props.listStyle ? ((Array.isArray(props.listStyle) ? props.listStyle : [props.listStyle]).filter((style) => !!style).join(' ') || null) : null,
    };
};



// styles:
// const wrapperElm  = ['li', '*'];                // inconsistent specificity
export const wrapperElm  = '*';                    // zero specificity
export const listItemElm = ':where(:first-child)'; // zero specificity



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
                    // media:
                    usesContentMedia(),
                    
                    // layouts:
                    usesContentLayout(),
                    
                    // variants:
                    usesContentVariants(),
                ]),
            ]),
        ]),
    ]);
};



export const usesListItemLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockRule, orientationInlineRule] = usesOrientationRule(options);
    const parentOrientationBlockRule  = `${orientationBlockRule}>*>&`;
    const parentOrientationInlineRule = `${orientationInlineRule}>*>&`;
    
    
    
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
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(parentOrientationBlockRule,  [ // block
                imports([
                    // borders:
                    usesBorderAsSeparatorBlock(),
                ]),
            ]),
            rule(parentOrientationInlineRule, [ // inline
                imports([
                    // borders:
                    usesBorderAsSeparatorInline(),
                ]),
            ]),
        ]),
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
export const usesListItem = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesListItemLayout(options),
            
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
    // dependencies:
    
    // spacings:
    const [, , paddingDecls] = usesPadding();
    
    
    
    return composition([
        layout({
            // spacings:
            [paddingDecls.paddingInline] : 0, // discard padding
            [paddingDecls.paddingBlock]  : 0, // discard padding
            
            
            
            // children:
            ...children('hr', [
                layout({
                    // foregrounds:
                    foreg            : 'inherit',
                    
                    
                    
                    // appearances:
                    opacity          : 'unset',
                    
                    
                    
                    // spacings:
                    marginBlockStart : `calc(${hcssProps.marginBlockStart} / 2)`,
                    marginBlockEnd   : `calc(${hcssProps.marginBlockEnd  } / 2)`,
                }),
            ]),
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



export const usesListLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockRule, orientationInlineRule] = usesOrientationRule(options);
    
    
    
    // dependencies:
    
    // colors:
    const [border      ] = usesBorder();
    
    // borders:
    const [borderStroke] = usesBorderStroke();
    const [borderRadius, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // resets:
            stripoutFocusableElement(), // clear browser's default styles
            stripoutList(),             // clear browser's default styles
            
            // colors:
            border(),
            
            // borders:
            borderStroke(),
            borderRadius(),
            usesBorderAsContainer({     // make a nicely rounded corners
                orientationBlockRule,
                orientationInlineRule,
            }),
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
            
            
            
            // borders:
            ...children(['&', wrapperElm], [
                layout({
                    // borders:
                    ...expandBorderStroke(), // expand borderStroke css vars
                    ...expandBorderRadius(), // expand borderRadius css vars
                }),
            ]),
            
            
            
            // children:
            ...children(wrapperElm, [
                layout({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire List's width
                    justifyContent : 'start',   // if listItems are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first listItem should be visible first
                    alignItems     : 'stretch', // listItems width are 100% of the wrapper (for variant `.block`) or height (for variant `.inline`)
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                }),
            ]),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockRule,  [ // block
                layout({
                    // layouts:
                    display           : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection     : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children(wrapperElm, [
                        imports([
                            // borders:
                            usesBorderAsSeparatorBlock(),
                        ]),
                        layout({
                            // layouts:
                            flexDirection : 'column', // listItem's items are stacked vertically (supports for the Accordion at blockStyle)
                            
                            
                            
                            // children:
                            ...children('*', [ // *:first-child | *:last-child => specificity weight = 1
                                variants([
                                    rule(':where(:first-child)', [
                                        layout({
                                            // borders:
                                            // add rounded corners on top:
                                            [borderRadiusDecls.borderStartStartRadius] : 'inherit', // copy wrapper's borderRadius
                                            [borderRadiusDecls.borderStartEndRadius  ] : 'inherit', // copy wrapper's borderRadius
                                        }),
                                    ]),
                                    rule(':where(:last-child)', [
                                        layout({
                                            // borders:
                                            // add rounded corners on bottom:
                                            [borderRadiusDecls.borderEndStartRadius  ] : 'inherit', // copy wrapper's borderRadius
                                            [borderRadiusDecls.borderEndEndRadius    ] : 'inherit', // copy wrapper's borderRadius
                                        }),
                                    ]),
                                ]),
                            ]),
                        }),
                    ]),
                }),
            ]),
            rule(orientationInlineRule, [ // inline
                layout({
                    // layouts:
                    display           : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    flexDirection     : 'row',         // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children(wrapperElm, [
                        imports([
                            // borders:
                            usesBorderAsSeparatorInline(),
                        ]),
                        layout({
                            // layouts:
                            flexDirection : 'row', // listItem's items are stacked horizontally (supports for the Accordion at inlineStyle)
                            
                            
                            
                            // children:
                            ...children('*', [ // *:first-child | *:last-child => specificity weight = 1
                                variants([
                                    isFirstChild([
                                        layout({
                                            // borders:
                                            // add rounded corners on left:
                                            [borderRadiusDecls.borderStartStartRadius] : 'inherit', // copy wrapper's borderRadius
                                            [borderRadiusDecls.borderEndStartRadius  ] : 'inherit', // copy wrapper's borderRadius
                                        }),
                                    ]),
                                    isLastChild([
                                        layout({
                                            // borders:
                                            // add rounded corners on right:
                                            [borderRadiusDecls.borderStartEndRadius  ] : 'inherit', // copy wrapper's borderRadius
                                            [borderRadiusDecls.borderEndEndRadius    ] : 'inherit', // copy wrapper's borderRadius
                                        }),
                                    ]),
                                ]),
                            ]),
                        }),
                    ]),
                }),
            ]),
        ]),
    ]);
};
export const usesListVariants = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockRule, orientationInlineRule] = usesOrientationRule(options);
    
    
    
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [iconColor, iconColorRefs] = usesIconColor();
    const [         , backgRefs    ] = usesBackg();
    
    // borders:
    const [, , borderDecls]                       = usesBorder();
    const [, borderStrokeRefs, borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls]                 = usesBorderRadius();
    
    
    
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
        ]),
        variants([
            rule(['.flat', '.flush', '.btn', '.tab', '.breadcrumb', '.bullet'], [
                layout({
                    // borders:
                    // kill borders surrounding List:
                    [borderStrokeDecls.borderWidth] : 0,
                    
                 // borderRadius : 0, // do not modify borderRadius directly, but use our custom vars so the children can calculate their inner borderRadius:
                    // remove rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : 0,
                    [borderRadiusDecls.borderStartEndRadius]   : 0,
                    // remove rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius]   : 0,
                    [borderRadiusDecls.borderEndEndRadius]     : 0,
                }),
            ]),
            rule(['.flat', '.joined', '.breadcrumb'], [
                layout({
                    // children:
                    ...children(wrapperElm, [
                        layout({
                            // borders:
                            // kill separator between items:
                            [borderStrokeDecls.borderWidth] : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, [
                                layout({
                                    // borders:
                                    // kill border on each item:
                                    [borderStrokeDecls.borderWidth] : 0,
                                }),
                            ]),
                        }),
                    ]),
                }),
            ]),
            
            rule('.btn', [
                layout({
                    // spacings:
                    // add space between buttons:
                    gap : cssProps.btnSpacing,
                    
                    
                    
                    // children:
                    ...children(wrapperElm, [
                        layout({
                            // borders:
                            // kill separator between buttons:
                            [borderStrokeDecls.borderWidth] : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, [
                                imports([
                                    // layouts:
                                    usesButtonLayout(),
                                ]),
                                layout({
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'btn')), // apply general cssProps starting with btn***
                                }),
                            ]),
                        }),
                    ]),
                }),
            ]),
            rule('.tab', [
                layout({
                    // children:
                    ...children(wrapperElm, [
                        layout({
                            // borders:
                            // kill separator between tabs:
                            [borderStrokeDecls.borderWidth] : 0,
                            
                            
                            
                            // children:
                            ...children(listItemElm, [
                                layout({
                                    // borders:
                                    [borderDecls.borderCol] : 'inherit', // change borderColor independent to child's theme color
                                    borderWidth             : borderStrokeRefs.borderWidth, 
                                    backgroundClip          : 'padding-box',
                                    
                                    
                                    
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'tab')), // apply general cssProps starting with tab***
                                    borderRadius: undefined as unknown as null, // tab borderRadius has been handled
                                }),
                                variants([
                                    isPassive([
                                        variants([
                                            rule(`${orientationBlockRule}&`,  [ // block
                                                layout({
                                                    // borders:
                                                    // show parent border right:
                                                    borderBlockWidth       : 0,
                                                    borderInlineStartColor : 'transparent',
                                                }),
                                            ]),
                                            rule(`${orientationInlineRule}&`, [ // inline
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
                                            rule(`${orientationBlockRule}&`,  [ // block
                                                layout({
                                                    // borders:
                                                    // hide parent border right:
                                                    borderInlineEndColor   : backgRefs.backgCol,
                                                    // add rounded corners on left:
                                                 // borderStartStartRadius : cssProps.tabBorderRadius,
                                                 // borderEndStartRadius   : cssProps.tabBorderRadius,
                                                    // do not modify borderRadius directly, but use our custom vars so the children can calculate their inner borderRadius:
                                                    [borderRadiusDecls.borderStartStartRadius] : cssProps.tabBorderRadius,
                                                    [borderRadiusDecls.borderEndStartRadius]   : cssProps.tabBorderRadius,
                                                }),
                                            ]),
                                            rule(`${orientationInlineRule}&`, [ // inline
                                                layout({
                                                    // borders:
                                                    // hide parent border bottom:
                                                    borderBlockEndColor    : backgRefs.backgCol,
                                                    // add rounded corners on top:
                                                 // borderStartStartRadius : cssProps.tabBorderRadius,
                                                 // borderStartEndRadius   : cssProps.tabBorderRadius,
                                                    // do not modify borderRadius directly, but use our custom vars so the children can calculate their inner borderRadius:
                                                    [borderRadiusDecls.borderStartStartRadius] : cssProps.tabBorderRadius,
                                                    [borderRadiusDecls.borderStartEndRadius]   : cssProps.tabBorderRadius,
                                                }),
                                            ]),
                                        ]),
                                    ]),
                                ]),
                            ]),
                        }),
                    ]),
                }),
                variants([
                    rule(orientationBlockRule,  [ // block
                        layout({
                            // layouts:
                            // tab directions are block (down) but List direction are inline:
                            display                : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                            
                            
                            
                            // borders:
                            // kill border [top, left, bottom] surrounding tab:
                            borderBlockWidth       : 0,
                            borderInlineStartWidth : 0,
                            
                            
                            
                            // children:
                            ...children(wrapperElm, [
                                layout({
                                    // spacings:
                                    // shift the items to right a bit, so the `active item` can hide the `borderRight`:
                                    marginInlineEnd : `calc(0px - ${borderStrokeRefs.borderWidth})`,
                                }),
                            ]),
                        }),
                    ]),
                    rule(orientationInlineRule, [ // inline
                        layout({
                            // layouts:
                            // tab directions are inline (right) but List direction are block:
                            display                : 'flex',        // use block flexbox, so it takes the entire parent's width
                            
                            
                            
                            // borders:
                            // kill border [left, top, right] surrounding tab:
                            borderInlineWidth      : 0,
                            borderBlockStartWidth  : 0,
                            
                            
                            
                            // children:
                            ...children(wrapperElm, [
                                layout({
                                    // spacings:
                                    // shift the items to bottom a bit, so the `active item` can hide the `borderBottom`:
                                    marginBlockEnd : `calc(0px - ${borderStrokeRefs.borderWidth})`,
                                }),
                            ]),
                        }),
                    ]),
                ]),
            ]),
            rule('.breadcrumb', [
                layout({
                    // children:
                    ...children(wrapperElm, [
                        layout({
                            // children:
                            ...children(listItemElm, [
                                layout({
                                    // typos:
                                    lineHeight    : 1,
                                    
                                    
                                    
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'breadcrumb')), // apply general cssProps starting with breadcrumb***
                                }),
                            ]),
                        }),
                        variants([
                            isNotFirstChild([
                                imports([
                                    // colors:
                                    iconColor(), // do not import `iconColor()` on pseudo `::before`
                                ]),
                                layout({
                                    // children:
                                    ...children('::before', [
                                        imports([
                                            usesIconImage(
                                                /*iconImage: */cssProps.breadcrumbSeparatorImg,
                                                /*iconColor: */iconColorRefs.iconCol,
                                            ),
                                        ]),
                                        layout({
                                            // layouts:
                                            display    : 'block', // fills the entire wrapper's width
                                            content    : '""',
                                            
                                            
                                            
                                            // customize:
                                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'breadcrumbSeparator')), // apply general cssProps starting with breadcrumbSeparator***
                                        }),
                                    ]),
                                }),
                            ]),
                        ]),
                    ]),
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
                    ...children(wrapperElm, [
                        layout({
                            // borders:
                            // kill separator between bullets:
                            [borderStrokeDecls.borderWidth] : 0,
                            
                            
                            
                            // sizes:
                            flex        : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                            
                            
                            
                            // children:
                            ...children(listItemElm, [
                                layout({
                                    // borders:
                                    borderWidth  : borderStrokeRefs.borderWidth, 
                                    
                                 // borderRadius : borderRadiuses.pill, // big rounded corner // do not modify borderRadius directly, but use our custom vars so the children can calculate their inner borderRadius:
                                    // big rounded corners on top:
                                    [borderRadiusDecls.borderStartStartRadius] : borderRadiuses.pill,
                                    [borderRadiusDecls.borderStartEndRadius]   : borderRadiuses.pill,
                                    // big rounded corners on bottom:
                                    [borderRadiusDecls.borderEndStartRadius]   : borderRadiuses.pill,
                                    [borderRadiusDecls.borderEndEndRadius]     : borderRadiuses.pill,
                                    
                                    overflow     : 'hidden',            // clip the children at the rounded corners
                                    
                                    
                                    
                                    // customize:
                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'bullet')), // apply general cssProps starting with bullet***
                                }),
                            ]),
                        }),
                    ]),
                }),
            ]),
            rule('.numbered', [
                layout({
                    // counters:
                    counterReset: 'ListNumber',
                    
                    
                    
                    // children:
                    ...children(wrapperElm, [
                        layout({
                            // children:
                            ...children(listItemElm, [
                                variants([
                                    rule(':not(.void)', [
                                        layout({
                                            // children:
                                            ...children('::before', [
                                                layout({
                                                    // counters:
                                                    counterIncrement : 'ListNumber',
                                                    
                                                    
                                                    
                                                    // customize:
                                                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'numbered')), // apply general cssProps starting with numbered***
                                                }),
                                            ]),
                                        }),
                                    ])
                                ]),
                            ]),
                        }),
                    ]),
                }),
            ]),
        ], { minSpecificityWeight: 2 }),
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
export const usesList = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesListLayout(options),
            
            // variants:
            usesListVariants(options),
            
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
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
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
                                
                                
                                
                                // triggers `List`'s onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
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
