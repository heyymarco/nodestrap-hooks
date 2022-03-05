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
    variants,
    isEmpty,
    
    
    
    //combinators:
    children,
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
import typos                from './typos/index' // configurable typography (texting) defs
import {
    // styles:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
}                           from './layouts'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    notNude,
    usesBorderRadius,
    usesPadding,
    expandPadding,
}                           from './Basic'
import {
    // general types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    
    
    
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'



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
    
    
    
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // layouts:
            display       : 'inline-block', // use inline block, so it takes the width & height as needed
            ...isEmpty({
                display   : 'inline-grid',  // required for filling the width & height using `::before` & `::after`
            }),
            
            
            
            // positions:
            verticalAlign : 'baseline', // badge's text should be aligned with sibling text, so the badge behave like <span> wrapper
            
            
            
            // sizes:
            /* -- auto size depends on the text's/content's size -- */
            boxSizing     : 'content-box', // the final size is excluding borders & paddings
            
            
            
            // spacings:
            ...isEmpty({
                /*
                    Make the width and height equal, by making paddingInline === paddingBlock.
                */
                
                // spacings:
                [paddingDecls.paddingInline] : paddingRefs.paddingBlock,
            }),
            
            
            
            // typos:
            lineHeight    : 1,
            textAlign     : 'center',
            
            
            
            // children:
            ...isEmpty({
                /*
                    Make the width and height equal, by filling width === height === lineHeight.
                */
                
                // // sizes:
                // width   : '1em', // not working, (font-width  !== 1em) if the font-size is fractional number
                // height  : '1em', // not working, (font-height !== 1em) if the font-size is fractional number
                
                // children:
                ...children('::before', {
                    ...imports([
                        fillTextLineHeightLayout(),
                    ]),
                }),
                ...children('::after', {
                    ...imports([
                        fillTextLineWidthLayout(),
                    ]),
                }),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    });
};
export const usesBadgeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    // borders:
    const [, , borderRadiusDecls]       = usesBorderRadius();
    
    // spacings:
    const [, paddingRefs, paddingDecls] = usesPadding();
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule(['.pill', '.circle'], {
                // borders:
                // big rounded corners on top:
                [borderRadiusDecls.borderStartStartRadius] : borderRadiuses.pill,
                [borderRadiusDecls.borderStartEndRadius]   : borderRadiuses.pill,
                // big rounded corners on bottom:
                [borderRadiusDecls.borderEndStartRadius]   : borderRadiuses.pill,
                [borderRadiusDecls.borderEndEndRadius]     : borderRadiuses.pill,
            }),
            rule(['.square', '.circle'], {
                ...notNude({
                    /*
                        Make the width and height equal, by making paddingInline === paddingBlock.
                    */
                    
                    // spacings:
                    [paddingDecls.paddingInline] : paddingRefs.paddingBlock,
                }),
            }),
            rule('.pill', {
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'pill')), // apply general cssProps starting with pill***
            }),
            rule('.square', {
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'square')), // apply general cssProps starting with square***
            }),
            rule('.circle', {
                // customize:
                ...usesGeneralProps(usesPrefixedProps(cssProps, 'circle')), // apply general cssProps starting with circle***
            }),
        ]),
    });
};
export const usesBadgeStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useBadgeSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesBadgeLayout(),
            
            // variants:
            usesBadgeVariants(),
            
            // states:
            usesBadgeStates(),
        ]),
    ),
], /*sheetId :*/'a7wkthow0k'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        //#region typos
        whiteSpace    : 'normal',
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
    const activeFn = active ?? !!(props.children ?? false); // badge has a content
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            semanticTag ={props.semanticTag  ?? [null]  }
            semanticRole={props.semanticRole ?? 'status'}
            
            aria-label={props['aria-label'] ?? label}
            
            
            
            // accessibilities:
            {...{
                active        : activeFn,
                inheritActive : false,
            }}
            
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            
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

export type { PopupPlacement, PopupMiddleware, PopupStrategy }
