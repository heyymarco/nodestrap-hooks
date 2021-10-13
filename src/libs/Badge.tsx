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
    rule,
    isEmpty,
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
import {
    // hooks:
    usesSizeVariant,
    notNude,
    usesBorderRadius,
    usesPadding,
}                           from './Basic'
import {
    // general types:
    PopupPlacement,
    PopupModifier,
    PopupPosition,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'
import typos                from './typos/index' // configurable typography (texting) defs
import {
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import {
    // styles:
    fillTextLineheightLayout,
}                           from './layouts'



// hooks:

// appearances:

export type BadgeStyle = 'pill'|'square'|'circle' // might be added more styles in the future
export interface BadgeVariant {
    badgeStyle?: BadgeStyle
}
export const useBadgeVariant = (props: BadgeVariant) => {
    return {
        class: props.badgeStyle ? props.badgeStyle : null,
    };
};



// styles:
export const usesBadgeLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddingRefs, paddingDecls] = usesPadding();
    
    
    
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
        ]),
        layout({
            // layouts:
            display       : 'inline-block', // use inline block, so it takes the width & height as needed
            
            
            
            // positions:
            verticalAlign : 'baseline', // badge's text should be aligned with sibling text, so the badge behave like <span> wrapper
            
            
            
            // sizes:
            /* -- auto size depends on the text's/content's size -- */
            boxSizing     : 'content-box', // the final size is excluding borders & paddings
            
            
            
            // typos:
            lineHeight    : 1,
            textAlign     : 'center',
            whiteSpace    : 'nowrap',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        vars({
            // spacings:
            // cssProps.padding** => ref.padding**
            [paddingDecls.paddingInline] : cssProps.paddingInline,
            [paddingDecls.paddingBlock]  : cssProps.paddingBlock,
            padding                      : undefined as unknown as null, // delete short prop
            paddingInline                : paddingRefs.paddingInline,    // overwrite padding prop
            paddingBlock                 : paddingRefs.paddingBlock,     // overwrite padding prop
        }),
        variants([
            isEmpty([
                layout({
                    // layouts:
                    display       : 'inline-grid', // required for filling the width & height using `::before` & `::after`
                    
                    
                    
                    // // sizes:
                    // width   : '1em', // not working, (font-width  !== 1em) if the font-size is fractional number
                    // height  : '1em', // not working, (font-height !== 1em) if the font-size is fractional number
                    
                    // children:
                    ...children(['::before', '::after'], composition([
                        imports([
                            // a dummy text content, for making parent's height as tall as line-height
                            // the dummy is also used for calibrating the flex's vertical position
                            fillTextLineheightLayout(),
                        ]),
                    ])),
                    ...children('::after', composition([
                        layout({
                            // layouts:
                            writingMode : 'vertical-lr', // rotate the element 90°
                            
                            
                            
                            // appearances:
                            overflow    : 'unset', // fix Firefox bug
                        }),
                    ])),
                    
                    
                    
                    // spacings:
                    [paddingDecls.paddingInline] : paddingRefs.paddingBlock, // set paddingInline = paddingBlock
                }),
            ]),
        ]),
    ]);
};
export const usesBadgeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // borders:
    const [, , borderRadiusDecls]       = usesBorderRadius();
    
    // spacings:
    const [, paddingRefs, paddingDecls] = usesPadding();
    
    
    
    return composition([
        imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(['.pill', '.circle'], [
                layout({
                    // borders:
                 // borderRadius : borderRadiuses.pill, // big rounded corner // do not modify borderRadius directly, but use our custom vars so the children can calculate their inner borderRadius:
                    // big rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : borderRadiuses.pill,
                    [borderRadiusDecls.borderStartEndRadius]   : borderRadiuses.pill,
                    // big rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius]   : borderRadiuses.pill,
                    [borderRadiusDecls.borderEndEndRadius]     : borderRadiuses.pill,
                }),
            ]),
            rule(['.square', '.circle'], [
                variants([
                    notNude([
                        layout({
                            // spacings:
                            [paddingDecls.paddingInline] : paddingRefs.paddingBlock, // set paddingInline = paddingBlock
                        }),
                    ]),
                ]),
            ]),
            rule('.pill', [
                layout({
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'pill')), // apply general cssProps starting with pill***
                }),
            ]),
            rule('.square', [
                layout({
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'square')), // apply general cssProps starting with square***
                }),
            ]),
            rule('.circle', [
                layout({
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'circle')), // apply general cssProps starting with circle***
                }),
            ]),
        ]),
    ]);
};
export const usesBadgeStates = () => {
    return composition([
        imports([
            // states:
            usesPopupStates(),
        ]),
    ]);
};
export const usesBadge = () => {
    return composition([
        imports([
            // layouts:
            usesBadgeLayout(),
            
            // variants:
            usesBadgeVariants(),
            
            // states:
            usesBadgeStates(),
        ]),
    ]);
};

export const useBadgeSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesBadge(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        //#region typos
        fontSize      : '0.75em',
        fontWeight    : typos.fontWeightBold,
        //#endregion typos
        
        
        
        //#region spacings
        paddingInline : '0.65em',
        paddingBlock  : '0.35em',
        //#endregion spacings
    };
    return {
        ...basics,
        
        
        
        //#region typos
        fontSizeSm      : [['calc(', basics.fontSize     , '/', 1.25, ')']],
        fontSizeLg      : [['calc(', basics.fontSize     , '*', 1.25, ')']],
        //#endregion typos
        
        
        
        //#region spacings
        paddingInlineSm : [['calc(', basics.paddingInline, '/', 1.25, ')']],
        paddingBlockSm  : [['calc(', basics.paddingBlock , '/', 1.25, ')']],
        paddingInlineLg : [['calc(', basics.paddingInline, '*', 1.25, ')']],
        paddingBlockLg  : [['calc(', basics.paddingBlock , '*', 1.25, ')']],
        //#endregion spacings
    };
}, { prefix: 'bge' });

const defaultPopupModifiers = [
    { name: 'flip', enabled: false },
    { name: 'preventOverflow', enabled: false },
];



// react components:

export interface BadgeProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>,
        
        // appearances:
        BadgeVariant
{
    // accessibilities:
    label? : string
}
export function Badge<TElement extends HTMLElement = HTMLElement>(props: BadgeProps<TElement>) {
    // styles:
    const sheet        = useBadgeSheet();
    
    
    
    // variants:
    const badgeVariant = useBadgeVariant(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        label,
        
        active,         // from accessibilities
        inheritActive,  // from accessibilities
    ...restProps}  = props;
    
    
    
    // fn props:
    const activeFn = active ?? !!(props.children ?? false);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'span'}
            
            
            // accessibilities:
            aria-label={label}
            {...{
                active        : activeFn,
                inheritActive : false,
            }}
            
            
            // popups:
            popupModifiers={[...defaultPopupModifiers,
                ...(props.popupModifiers ?? []),
            ]}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                badgeVariant.class,
            ]}
        >
            { props.children }
        </Popup>
    );
}
export { Badge as default }

export type { PopupPlacement, PopupModifier, PopupPosition }
