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
    SizeName       as BasicComponentSizeName,
    isSize         as basicComponentIsSize,
    usesSizes      as basicComponentUsesSizes,
    SizeVariant    as BasicComponentSizeVariant,
    useSizeVariant as basicComponentUseSizeVariant,
    
    OrientationName,
    OrientationVariant,
    
    
    
    // configs:
    cssProps as bcssProps,
    cssDecls as bcssDecls,
}                           from './BasicComponent'
import {
    // hooks:
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
    Icon,
}                           from './Icon'
import typos                from './typos/index' // configurable typography (texting) defs



// hooks:

// layouts:

//#region sizes
export type SizeName = 'xs'|'sm'|'lg'|'xl' | string

export const isSize = (sizeName: SizeName, styles: StyleCollection) => basicComponentIsSize(sizeName as BasicComponentSizeName, styles);

/**
 * Uses basic sizes.  
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizes = (factory = sizeOf, options = sizeOptions()) => basicComponentUsesSizes(factory, options as BasicComponentSizeName[]);
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
export const useSizeVariant = (props: SizeVariant) => basicComponentUseSizeVariant(props as BasicComponentSizeVariant);
//#endregion sizes



// styles:
export const usesButtonIconLayout = () => {
    return composition([
        imports([
            // layouts:
            usesButtonLayout(),
        ]),
        layout({
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        vars({
            //#region Icon
            // fills the entire parent text's height:
            [icssDecls.size]  : [['calc(1em *',
                `var(${bcssDecls.lineHeight},${typos.lineHeight})`,
            ')']],
            
            // set icon's color as parent's font color:
            [icssDecls.foreg] : 'currentColor',
            
            // modify icon's transition:
            [icssDecls.transition] : [
                icssProps.transition,
                
                ['color'      , '0s'], // no color      transition, follow Button's transition
                ['background' , '0s'], // no background transition, follow Button's transition
            ],
            //#endregion Icon
        }),
    ]);
};
export const usesButtonIconVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes();
    
    
    
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
export const usesButtonIcon = () => {
    return composition([
        imports([
            // layouts:
            usesButtonIconLayout(),
            
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
        fontSize          : typos.fontSize,
        fontSizeXs        : typos.fontSizeSm,
        fontSizeSm        : typos.fontSizeSm,
        fontSizeLg        : typos.fontSizeLg,
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
        
        
        
        gapX              : btcssProps.gapX,
        gapY              : btcssProps.gapY,
        gapXXs            : btcssProps.gapXSm,
        gapYXs            : btcssProps.gapYSm,
        gapXSm            : btcssProps.gapXSm,
        gapYSm            : btcssProps.gapYSm,
        gapXLg            : btcssProps.gapXLg,
        gapYLg            : btcssProps.gapYLg,
        gapXXl            : btcssProps.gapXLg,
        gapYXl            : btcssProps.gapYLg,
        //#endregion spacings
    };
}, { prefix: 'btni' });



// react components:

export interface ButtonIconProps
    extends
        ButtonProps,
        
        // layouts:
        SizeVariant
{
    // appearances:
    icon?: string
}
export const ButtonIcon = (props: ButtonIconProps) => {
    // styles:
    const sheet   = useButtonIconSheet();
    
    
    
    // rest props:
    const {
        // appearances:
        icon,
        
        
        // accessibilities:
        text,
        
        
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
            { icon && <Icon icon={icon} /> }
            { text }
            { children }
        </Button>
    );
};
ButtonIcon.prototype = Button.prototype; // mark as Button compatible
export { ButtonIcon as default }

export type { OrientationName, OrientationVariant }
export type { ButtonStyle, ButtonVariant, ButtonType }
