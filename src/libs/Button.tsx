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
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseCssfnStyle,
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
    VariantOrientation,
    useVariantOrientation,
    gradientOf,
    noOutlined,
    outlinedOf,
}                           from './BasicComponent'
import {
    // hooks:
    isActive,
}                           from './Indicator'
import {
    // hooks:
    usesThemeActive,
    isFocus,
    isLeft,
    isArrive,
}                           from './Control'
import {
    // hooks:
    isPress,
    
    
    
    // styles:
    usesActionControl,
    
    
    
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

export type BtnStyle = 'link'|'ghost' // might be added more styles in the future
export interface VariantButton {
    btnStyle?: BtnStyle
}
export const useVariantButton = (props: VariantButton) => {
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
export const usesButton = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // bases:
            usesActionControl(),
            
            // layouts:
            sizes(),
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
        variants([
            noOrientationBlock([
                layout({
                    // layouts:
                    flexDirection  : 'row',    // items are stacked horizontally
                }),
            ]),
            isOrientationBlock([
                layout({
                    // layouts:
                    flexDirection  : 'column', // items are stacked vertically
                }),
            ]),
            
            rule(['.link', '.ghost'], [
                imports([
                    noBackground(),
                ]),
            ]),
            rule('.link', [
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
            rule('.ghost', [
                layout({
                    // borders:
                    boxShadow : 'none !important', // no focus animation
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'ghost')), // apply general cssProps starting with ghost***
                }),
                states([
                    isLeft([
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
}
export const useButtonSheet = createUseCssfnStyle(() => [
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

export type BtnType = 'button'|'submit'|'reset'

export interface ButtonProps
    extends
        ActionControlProps<HTMLButtonElement>,
        
        VariantOrientation,
        VariantButton
{
    // actions:
    type?        : BtnType
    
    
    // accessibility:
    label?       : string
    text?        : string
    
    
    // children:
    children?    : React.ReactNode
}
export const Button = (props: ButtonProps) => {
    // styles:
    const sheet           = useButtonSheet();
    
    
    
    // variants:
    const variOrientation = useVariantOrientation(props);
    const variButton      = useVariantButton(props);
    
    
    
    // rest props:
    const {
        // essentials:
        tag,
        
        
        // actions:
        type,
        
        
        // accessibility:
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
            
            
            // accessibility:
            aria-label={props.label}
            press={props.press ?? active}
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
                variButton.class,
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

export type { OrientationName, VariantOrientation }
