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
    vars,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    states,
    isNotHover,
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

// nodestrap components:
import {
    // hooks:
    useTestSemantic,
}                           from './Element'
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
    
    
    
    return style({
        ...variants([
            notOutlined({
                ...style({
                    // borders:
                    [borderStrokeDecls.borderWidth]: '0px', // noBorder if not explicitly `.outlined`
                }),
            }),
        ]),
        ...states([
            isActive({
                ...imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            }),
            isFocus({
                ...imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            }),
            isArrive({
                ...imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            }),
            isPress({
                ...imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            }),
        ]),
        ...variants([
            notOutlined({
                ...imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
            }),
        ], { minSpecificityWeight: 4 }), // force to win with states' specificity weight
    });
};

export const usesButtonLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
        ]),
        ...style({
            // layouts:
            display           : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            ...rule(orientationBlockSelector,  { // block
                flexDirection : 'column',      // items are stacked vertically
            }),
            ...rule(orientationInlineSelector, { // inline
                flexDirection : 'row',         // items are stacked horizontally
            }),
            justifyContent    : 'center',      // center items (text, icon, etc) horizontally
            alignItems        : 'center',      // center items (text, icon, etc) vertically
            flexWrap          : 'wrap',        // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign     : 'baseline',    // button's text should be aligned with sibling text, so the button behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesButtonLinkVariant = () => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // spacings:
    const [, , paddingDecls]      = usesPadding();
    
    
    
    return style({
        ...imports([
            // backgrounds:
            noBackground(),
            
            // colors:
            usesThemeActive(), // set the active theme as the default theme
        ]),
        ...style({
            // borders:
            // small rounded corners on top:
            [borderRadiusDecls.borderStartStartRadius] : borderRadiuses.sm,
            [borderRadiusDecls.borderStartEndRadius  ] : borderRadiuses.sm,
            // small rounded corners on bottom:
            [borderRadiusDecls.borderEndStartRadius  ] : borderRadiuses.sm,
            [borderRadiusDecls.borderEndEndRadius    ] : borderRadiuses.sm,
            
            
            
            // spacings:
            [paddingDecls.paddingInline] : spacers.xs,
            [paddingDecls.paddingBlock ] : spacers.xs,
            
            
            
            // typos:
            textDecoration : 'underline',
            lineHeight     : 1,
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
        }),
        ...variants([
            notOutlined({ // fully link style without `.outlined`:
                ...imports([
                    // backgrounds:
                    gradientOf(false), // gradient is not supported if not `.outlined`
                ]),
            }),
        ]),
    });
};
export const usesButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    // colors:
    const [, outlinedRefs            ] = usesOutlinedVariant();
    const [, mildRefs                ] = usesMildVariant();
    const [,             , foregDecls] = usesForeg();
    
    
    
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule(['.link', '.icon', '.ghost'], {
                ...imports([
                    noBackground(),
                ]),
            }),
            rule(['.link', '.icon'], {
                ...imports([
                    usesButtonLinkVariant(),
                ]),
            }),
            rule('.icon', {
                ...variants([
                    notOutlined({
                        ...vars({
                            /*
                                `noBackground()` is causing `.outlined` actived
                                => currentColor = theme color
                                so we fix it:
                                => currentColor = foreg color at `.mild` variant
                            */
                            [foregDecls.foreg] : mildRefs.foregFn,
                        }),
                    }),
                    isOutlined({
                        ...vars({
                            [foregDecls.foreg] : outlinedRefs.foregFn,
                        }),
                    }),
                ]),
            }),
            rule('.ghost', {
                ...style({
                    // borders:
                    boxShadow : 'none !important', // no focus animation
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'ghost')), // apply general cssProps starting with ghost***
                }),
                ...states([
                    isNotHover({
                        ...imports([
                            // backgrounds:
                            gradientOf(false), // hides the gradient to increase invisibility
                        ]),
                    }),
                    isArrive({
                        // appearances:
                        opacity: cssProps.ghostOpacityArrive, // increase the opacity to increase visibility
                    }),
                ]),
            }),
        ]),
    });
};
export const usesButtonStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
    });
};

export const useButtonSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesButtonLayout(),
            
            // variants:
            usesButtonVariants(),
            
            // states:
            usesButtonStates(),
        ]),
    ),
], /*sheetId :*/'7rehb2h20q'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        gapInline          : spacers.sm,
        gapBlock           : spacers.sm,
        gapInlineSm        : spacers.xs,
        gapBlockSm         : spacers.xs,
        gapInlineLg        : spacers.md,
        gapBlockLg         : spacers.md,
        //#endregion spacings
        
        
        
        // typos:
        whiteSpace         : 'normal',
        
        
        
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
    const semanticTag  = props.semanticTag  ?? (props.href ? 'a'    : ['button', 'a']);
    const semanticRole = props.semanticRole ?? (props.href ? 'link' : ['button', 'link']);
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
            press={props.press ?? (active || undefined)}
            
            
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
