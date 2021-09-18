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
    usesSizes,
}                           from './BasicComponent'
import {
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



// hooks:

// appearances:

export type BadgeStyle = 'pill' // might be added more styles in the future
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
        variants([
            isEmpty([
                layout({
                    // layouts:
                    display       : 'inline-grid', // required for filling the width & height using `::before` & `::after`
                    
                    
                    
                    // // sizes:
                    // width   : '1em', // not working, (font-width  !== 1em) if the font-size is fractional number
                    // height  : '1em', // not working, (font-height !== 1em) if the font-size is fractional number
                    
                    // children:
                    // a dummy text content, for making parent's height as tall as line-height
                    // the dummy is also used for calibrating the flex's vertical position
                    ...children(['::before', '::after'], composition([
                        layout({
                            // layouts:
                            content     : '"\xa0"',       // &nbsp;
                            display     : 'inline-block', // use inline-block, so we can kill the width
                            
                            
                            
                            // appearances:
                            overflow    : 'hidden', // crop the text width (&nbsp;)
                            visibility  : 'hidden', // hide the element, but still consumes the dimension
                            
                            
                            
                            // sizes:
                            inlineSize  : 0,        // kill the width, we just need the height
                        }),
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
                    padding : cssProps.paddingBlock, // set paddingInline = paddingBlock
                }),
            ]),
        ]),
    ]);
};
export const usesBadgeVariants = () => {
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
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule('.pill', [
                layout({
                    // borders:
                    borderRadius : borderRadiuses.pill, // big rounded corner
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'pill')), // apply general cssProps starting with pill***
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
export const Badge = <TElement extends HTMLElement = HTMLElement>(props: BadgeProps<TElement>) => {
    // styles:
    const sheet        = useBadgeSheet();
    
    
    
    // variants:
    const badgeVariant = useBadgeVariant(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,
    ...restProps}  = props;
    
    
    
    // fn props:
    const activeFn = active ?? !!(props.children ?? false);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            
            // accessibilities:
            aria-label={props.label}
            active={activeFn}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                badgeVariant.class,
            ]}
        >
            { props.children }
        </Popup>
    );
};
export { Badge as default }
