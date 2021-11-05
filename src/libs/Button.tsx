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
    
    
    
    // rules:
    variants,
    states,
    rule,
    isNotHover,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    useTestSemantic,
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
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    notOutlined,
    isOutlined,
    usesOutlinedVariant,
    outlinedOf,
    usesMildVariant,
    usesForeg,
    usesBorderStroke,
    usesBorderRadius,
    usesPadding,
}                           from './Basic'
import {
    // hooks:
    isActive,
}                           from './Indicator'
import {
    // hooks:
    usesThemeActive,
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
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;


// appearances:

export type ButtonStyle = 'link'|'icon'|'ghost' // might be added more styles in the future
export interface ButtonVariant {
    btnStyle?: ButtonStyle
}
export const useButtonVariant = (props: ButtonVariant) => {
    return {
        class: props.btnStyle ? props.btnStyle : null,
    };
};



// styles:
export const noBackground = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    
    
    
    return composition([
        variants([
            notOutlined([
                imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
                layout({
                    // borders:
                    [borderStrokeDecls.borderWidth]  : 0, // noBorder if not explicitly `.outlined`
                }),
            ]),
        ]),
        states([
            isActive([
                imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            ]),
            isFocus([
                imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            ]),
            isArrive([
                imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            ]),
            isPress([
                imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            ]),
        ]),
    ]);
};

export const usesButtonLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    return composition([
        imports([
            // layouts:
            usesActionControlLayout(),
        ]),
        layout({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
         // flexDirection  : 'row',         // customizable orientation // already defined in variant `.block`/`.inline`
            justifyContent : 'center',      // center items (text, icon, etc) horizontally
            alignItems     : 'center',      // center items (text, icon, etc) vertically
            flexWrap       : 'wrap',        // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',    // button's text should be aligned with sibling text, so the button behave like <span> wrapper
            
            
            
            // sizes:
            /* -- auto size depends on the text's/content's size -- */
            boxSizing      : 'content-box', // the final size is excluding borders & paddings
            
            
            
            // typos:
            textAlign      : 'center',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockSelector,  [ // block
                layout({
                    // layouts:
                    flexDirection  : 'column', // items are stacked vertically
                }),
            ]),
            rule(orientationInlineSelector, [ // inline
                layout({
                    // layouts:
                    flexDirection  : 'row',    // items are stacked horizontally
                }),
            ]),
        ]),
    ]);
};
export const usesButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [, outlinedRefs            ] = usesOutlinedVariant();
    const [, mildRefs                ] = usesMildVariant();
    const [,             , foregDecls] = usesForeg();
    
    // borders:
    const [, , borderRadiusDecls]      = usesBorderRadius();
    
    // spacings:
    const [, , paddingDecls]           = usesPadding();
    
    
    
    return composition([
        imports([
            // variants:
            usesActionControlVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(['.link', '.icon', '.ghost'], [
                imports([
                    noBackground(),
                ]),
            ]),
            rule(['.link', '.icon'], [
                imports([
                    // colors:
                    usesThemeActive(), // set the active theme as the default theme
                ]),
                layout({
                    // borders:
                 // borderRadius   : borderRadiuses.sm, // small rounded corner // do not modify borderRadius directly, but use our custom vars so the children can calculate their inner borderRadius:
                    // small rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius] : borderRadiuses.sm,
                    [borderRadiusDecls.borderStartEndRadius]   : borderRadiuses.sm,
                    // small rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius]   : borderRadiuses.sm,
                    [borderRadiusDecls.borderEndEndRadius]     : borderRadiuses.sm,
                    
                    
                    
                    // spacings:
                 // padding        : spacers.xs, // do not modify padding directly, but use our custom vars so the children can calculate their negative margin (if any):
                    [paddingDecls.paddingInline] : spacers.xs,
                    [paddingDecls.paddingBlock]  : spacers.xs,
                    
                    
                    
                    // typos:
                    textDecoration : 'underline',
                    lineHeight     : 1,
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
                }),
                variants([
                    notOutlined([ // fully link style without `.outlined`:
                        imports([
                            // backgrounds:
                            gradientOf(false), // gradient is not supported if not `.outlined`
                        ]),
                    ]),
                ]),
            ]),
            rule('.icon', [
                variants([
                    notOutlined([
                        vars({
                            /*
                                `noBackground()` is causing `.outlined` actived
                                => currentColor = theme color
                                so we fix it:
                                => currentColor = foreg color at `.mild` variant
                            */
                            [foregDecls.foreg] : mildRefs.foregMildFn,
                        }),
                    ]),
                    isOutlined([
                        vars({
                            [foregDecls.foreg] : outlinedRefs.foregOutlinedFn,
                        }),
                    ]),
                ]),
            ]),
            rule('.ghost', [
                layout({
                    // borders:
                    boxShadow : 'none !important', // no focus animation
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'ghost')), // apply general cssProps starting with ghost***
                }),
                states([
                    isNotHover([
                        imports([
                            // backgrounds:
                            gradientOf(false), // hides the gradient to increase invisibility
                        ]),
                    ]),
                    isArrive([
                        layout({
                            // appearances:
                            opacity: cssProps.ghostOpacityArrive, // increase the opacity to increase visibility
                        }),
                    ]),
                ]),
            ]),
        ]),
    ]);
};
export const usesButtonStates = () => {
    return composition([
        imports([
            // states:
            usesActionControlStates(),
        ]),
    ]);
};
export const usesButton = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesButtonLayout(options),
            
            // variants:
            usesButtonVariants(),
            
            // states:
            usesButtonStates(),
        ]),
    ]);
};

export const useButtonSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesButton(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        gapInline   : spacers.sm,
        gapBlock    : spacers.sm,
        gapInlineSm : spacers.xs,
        gapBlockSm  : spacers.xs,
        gapInlineLg : spacers.md,
        gapBlockLg  : spacers.md,
        //#endregion spacings
        
        
        
        // typos:
        whiteSpace : 'normal',
        
        
        
        // ghost style:
        ghostOpacity       : 0.5,
        ghostOpacityArrive : 1,
    };
}, { prefix: 'btn' });



// react components:

export type ButtonType = 'button'|'submit'|'reset'

export interface ButtonProps
    extends
        ActionControlProps<HTMLButtonElement>,
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        React.AnchorHTMLAttributes<HTMLButtonElement>,
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        ButtonVariant
{
    // actions:
    type?        : ButtonType
    
    
    // accessibilities:
    label?       : string
    
    
    // children:
    children?    : React.ReactNode
}
export function Button(props: ButtonProps) {
    // styles:
    const sheet              = useButtonSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const buttonVariant      = useButtonVariant(props);
    
    
    
    // rest props:
    const {
        // actions:
        type,
        
        
        // accessibilities:
        label,
        
        active,
    ...restProps} = props;
    
    
    
    // fn props:
    const semanticTag  = props.semanticTag  ?? (props.href ? 'a'    : 'button');
    const semanticRole = props.semanticRole ?? (props.href ? 'link' : 'button');
    const [, , , isSemanticBtn] = useTestSemantic({ tag: props.tag, role: props.role, semanticTag, semanticRole }, { semanticTag: 'button', semanticRole: 'button' });
    
    
    
    // jsx:
    return (
        <ActionControl<HTMLButtonElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={semanticTag }
            semanticRole={semanticRole}
            
            aria-label={props['aria-label'] ?? label}
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)}
            press={props.press ?? active}
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
                buttonVariant.class,
            ]}
            
            
            // Button props:
            {...{
                // actions:
                type : props.type ?? (isSemanticBtn ? 'button' : undefined),
            }}
        >
            { props.children }
        </ActionControl>
    );
}
export { Button as default }

export type { OrientationName, OrientationVariant }
