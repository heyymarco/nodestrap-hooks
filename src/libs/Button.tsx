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
    OrientationName,
    noOrientationBlock,
    isOrientationBlock,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    noOutlined,
    outlinedOf,
    usesMild,
    usesForeg,
}                           from './BasicComponent'
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
    return composition([
        variants([
            noOutlined([
                imports([
                    outlinedOf(true), // keeps outlined variant
                ]),
                layout({
                    // borders:
                    border : 'none', // noBorder if not explicitly `.outlined`
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

export const usesButtonLayout = () => {
    return composition([
        imports([
            // layouts:
            usesActionControlLayout(),
        ]),
        layout({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
         // flexDirection  : 'row',         // customizable orientation // already defined in inline()/block()
            justifyContent : 'center',      // center items horizontally
            alignItems     : 'center',      // center items vertically
            
            
            
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
    ]);
};
export const usesButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [, mildRefs            ] = usesMild();
    const [,         , foregDecls] = usesForeg();
    
    
    
    return composition([
        imports([
            // variants:
            usesActionControlVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            noOrientationBlock([ // inline
                layout({
                    // layouts:
                    flexDirection  : 'row',    // items are stacked horizontally
                }),
            ]),
            isOrientationBlock([ // block
                layout({
                    // layouts:
                    flexDirection  : 'column', // items are stacked vertically
                }),
            ]),
            
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
                    // typos:
                    textDecoration : 'underline',
                    lineHeight     : 1,
                    
                    
                    
                    // borders:
                    borderRadius   : borderRadiuses.sm,
                    
                    
                    
                    // spacings:
                    padding        : spacers.xs,
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'link')), // apply general cssProps starting with link***
                }),
                variants([
                    noOutlined([ // fully link style without `.outlined`:
                        imports([
                            // backgrounds:
                            gradientOf(false), // gradient is not supported if not `.outlined`
                        ]),
                    ]),
                ]),
            ]),
            rule('.icon', [
                vars({
                    [foregDecls.foreg] : mildRefs.foregMildFn,
                }),
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
export const usesButton = () => {
    return composition([
        imports([
            // layouts:
            usesButtonLayout(),
            
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
        // typos:
        whiteSpace  : 'normal',
        
        
        
        //#region spacings
        gapX        : spacers.sm,
        gapY        : spacers.sm,
        gapXSm      : spacers.xs,
        gapYSm      : spacers.xs,
        gapXLg      : spacers.md,
        gapYLg      : spacers.md,
        //#endregion spacings
        
        
        
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
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        ButtonVariant
{
    // actions:
    type?        : ButtonType
    
    
    // accessibilities:
    label?       : string
    text?        : string
    
    
    // children:
    children?    : React.ReactNode
}
export const Button = (props: ButtonProps) => {
    // styles:
    const sheet              = useButtonSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const buttonVariant      = useButtonVariant(props);
    
    
    
    // rest props:
    const {
        // essentials:
        tag,
        
        
        // actions:
        type,
        
        
        // accessibilities:
        active,
    ...restProps} = props;
    
    
    
    // fn props:
    const tagFn  = tag  ?? 'button';
    const typeFn = type ?? (['button', 'input'].includes(tagFn) ? 'button' : undefined);
    
    
    
    // jsx:
    return (
        <ActionControl<HTMLButtonElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={tagFn}
            
            
            // accessibilities:
            aria-label={props.label}
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
                type    : typeFn,
            }}
        >
            { props.text }
            { props.children }
        </ActionControl>
    );
};
export { Button as default }

export type { OrientationName, OrientationVariant }
