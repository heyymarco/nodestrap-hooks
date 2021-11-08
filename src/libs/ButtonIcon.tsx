// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // general types:
    StyleCollection,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
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
import {
    // hooks:
    isSize          as basicIsSize,
    usesSizeVariant as basicUsesSizeVariant,
    SizeVariant     as BasicSizeVariant,
    useSizeVariant  as basicUseSizeVariant,
    
    OrientationName,
    OrientationRuleOptions,
    normalizeOrientationRule,
    OrientationVariant,
    
    expandBorderRadius,
    expandPadding,
    
    
    
    // configs:
    cssProps as bcssProps,
    cssDecls as bcssDecls,
}                           from './Basic'
import {
    // hooks:
    defaultOrientationRuleOptions,
    
    ButtonStyle,
    ButtonVariant,
    
    
    
    // styles:
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
    
    
    
    // configs:
    cssProps as btcssProps,
    
    
    
    // react components:
    ButtonType,
    ButtonProps,
    Button,
}                           from './Button'
import {
    // configs:
    cssProps as icssProps,
    cssDecls as icssDecls,
    
    
    
    // react components:
    IconProps as IconIconProps,
    Icon,
}                           from './Icon'
import typos                from './typos/index' // configurable typography (texting) defs



// hooks:

// layouts:

export { defaultOrientationRuleOptions };

//#region sizes
export type SizeName = 'xs'|'sm'|'lg'|'xl' | (string & {})

export const isSize = (sizeName: SizeName, styles: StyleCollection) => basicIsSize(sizeName, styles);

/**
 * Uses basic sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = (factory = sizeOf, options = sizeOptions()) => basicUsesSizeVariant(factory, options);
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `StyleCollection` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName: SizeName) => composition([
    layout({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export const sizeOptions = (): SizeName[] => ['xs', 'sm', 'lg', 'xl'];

export interface SizeVariant {
    size?: SizeName
}
export const useSizeVariant = (props: SizeVariant) => basicUseSizeVariant(props as BasicSizeVariant);
//#endregion sizes



// styles:
export const usesButtonIconLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesButtonLayout(options),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // borders:
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
        vars({
            //#region Icon
            // fills the entire parent text's height:
            [icssDecls.size]  : `calc(1em * var(${bcssDecls.lineHeight},${typos.lineHeight}))`,
            
            // set icon's color as parent's font color:
            [icssDecls.foreg] : 'currentColor',
            
            // modify icon's transition:
            [icssDecls.transition] : [
                icssProps.transition,
                
                ['color'      , 0], // no color      transition, follow Button's transition
                ['background' , 0], // no background transition, follow Button's transition
            ],
            //#endregion Icon
        }),
    ]);
};
export const usesButtonIconVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant();
    
    
    
    return composition([
        imports([
            // variants:
            usesButtonVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesButtonIconStates = () => {
    return composition([
        imports([
            // states:
            usesButtonStates(),
        ]),
    ]);
};
export const usesButtonIcon = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesButtonIconLayout(options),
            
            // variants:
            usesButtonIconVariants(),
            
            // states:
            usesButtonIconStates(),
        ]),
    ]);
};

export const useButtonIconSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesButtonIcon(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region typos
        fontSize          : typos.fontSizeNm,
        fontSizeXs        : typos.fontSizeSm,
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg        : typos.fontSizeMd,
        fontSizeXl        : typos.fontSizeLg,
        //#endregion typos
        
        
        
        //#region foreg, backg, borders
        borderRadius      : bcssProps.borderRadius,
        borderRadiusXs    : bcssProps.borderRadiusSm,
        borderRadiusSm    : bcssProps.borderRadiusSm,
        borderRadiusLg    : bcssProps.borderRadiusLg,
        borderRadiusXl    : bcssProps.borderRadiusLg,
        //#endregion foreg, backg, borders
        
        
        
        //#region spacings
        paddingInline     : bcssProps.paddingInline,
        paddingBlock      : bcssProps.paddingBlock,
        paddingInlineXs   : bcssProps.paddingInlineSm,
        paddingBlockXs    : bcssProps.paddingBlockSm,
        paddingInlineSm   : bcssProps.paddingInlineSm,
        paddingBlockSm    : bcssProps.paddingBlockSm,
        paddingInlineLg   : bcssProps.paddingInlineLg,
        paddingBlockLg    : bcssProps.paddingBlockLg,
        paddingInlineXl   : bcssProps.paddingInlineLg,
        paddingBlockXl    : bcssProps.paddingBlockLg,
        
        
        
        gapInline         : btcssProps.gapInline,
        gapBlock          : btcssProps.gapBlock,
        gapInlineXs       : btcssProps.gapInlineSm,
        gapBlockXs        : btcssProps.gapBlockSm,
        gapInlineSm       : btcssProps.gapInlineSm,
        gapBlockSm        : btcssProps.gapBlockSm,
        gapInlineLg       : btcssProps.gapInlineLg,
        gapBlockLg        : btcssProps.gapBlockLg,
        gapInlineXl       : btcssProps.gapInlineLg,
        gapBlockXl        : btcssProps.gapBlockLg,
        //#endregion spacings
    };
}, { prefix: 'btni' });



// react components:

export type IconPosition = 'start'|'end'
export interface IconProps
    extends
        Partial<Pick<IconIconProps, 'icon'>>
{
    // appearances:
    iconPosition? : IconPosition
}

export interface ButtonIconProps
    extends
        Omit<ButtonProps, 'size'>,
        IconProps,
        
        // layouts:
        SizeVariant
{
}
export function ButtonIcon(props: ButtonIconProps) {
    // styles:
    const sheet   = useButtonIconSheet();
    
    
    
    // rest props:
    const {
        // appearances:
        icon,                   // from IconProps
        iconPosition = 'start', // from IconProps
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restProps}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { icon && (iconPosition === 'start') && <Icon icon={icon} /> }
            { children }
            { icon && (iconPosition === 'end') && <Icon icon={icon} /> }
        </Button>
    );
}
ButtonIcon.prototype = Button.prototype; // mark as Button compatible
export { ButtonIcon as default }

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType }
