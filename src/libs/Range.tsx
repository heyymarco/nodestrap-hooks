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
    isNude,
    usesNudeVariant,
    NudeVariant,
    useNudeVariant,
    usesMildVariant,
    usesBorderRadius,
    
    
    
    // styles:
    usesBasicLayout,
}                           from './Basic'
import {
    // hooks:
    usesFocusBlurState,
}                           from './Control'
import {
    // hooks:
    usePressReleaseState,
}                           from './ActionControl'
import {
    // styles:
    usesEditableActionControlLayout,
    usesEditableActionControlVariants,
    usesEditableActionControlStates,
    
    
    
    // react components:
    EditableActionControlProps,
}                           from './EditableActionControl'
// import {
//     // styles:
//     usesEditableTextControlLayout,
//     usesEditableTextControlVariants,
//     usesEditableTextControlStates,
// }                           from './EditableTextControl'
import {
    // styles:
    inputElm,
    
    
    // react components:
    Input,
}                           from './Input'
import {
    rangeTrackElm,
    rangeThumbElm,
    stripoutRange,
}                           from './stripouts'
import {
    borders,
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import {
    // styles:
    fillTextLineheightLayout,
}                           from './layouts'



// styles:
export const usesRangeLayout = () => {
    return composition([
        imports([
            // layouts:
            usesEditableActionControlLayout(),
        ]),
        layout({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // flow to the document's writing flow
            justifyContent : 'start',  // if range is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the range's first part should be visible first
            alignItems     : 'center', // default center items vertically
            flexWrap       : 'nowrap', // prevents the range to wrap to the next row
            
            
            
            // positions:
            verticalAlign  : 'baseline', // range's text should be aligned with sibling text, so the range behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, composition([
                imports([
                    stripoutRange(), // clear browser's default styles
                ]),
                layout({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    
                    
                    
                    // children:
                    ...children(rangeTrackElm, composition([
                        imports([
                            usesBasicLayout(),
                        ]),
                        layout({
                            // layouts:
                            display        : 'block',
                            
                            
                            
                            // sizes:
                            flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'track')), // apply general cssProps starting with track***
                        }),
                        // (() => {
                        //     // dependencies:
                        //     const [, , focusBlurDecls] = usesFocusBlurState();
                        //     return vars({
                        //         [focusBlurDecls.boxShadowFocusBlur] : 'inherit',
                        //         [focusBlurDecls.animFocusBlur]      : 'inherit',
                        //     });
                        // })(),
                    ]), { groupSelectors: false }), // any invalid selector does not cause the whole selectors to fail
                    
                    ...children(rangeThumbElm, composition([
                        imports([
                            usesEditableActionControlLayout(),
                        ]),
                        layout({
                            // layouts:
                            display        : 'block', // thumb is only work for `block`
                            
                            
                            
                            // sizes:
                            flex           : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                            boxSizing      : 'border-box', // the final size is including borders & paddings
                            
                            
                            
                            // spacings:
                            marginBlockStart : `calc(0px - ((${cssProps.thumbBlockSize} - ${cssProps.trackBlockSize}) / 2))`,
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'thumb')), // apply general cssProps starting with thumb***
                        }),
                        (() => {
                            // dependencies:
                            const [, , focusBlurDecls] = usesFocusBlurState();
                            return vars({
                                [focusBlurDecls.boxShadowFocusBlur] : 'inherit',
                                [focusBlurDecls.animFocusBlur]      : 'inherit',
                            });
                        })(),
                    ]), { groupSelectors: false }), // any invalid selector does not cause the whole selectors to fail
                }),
            ])),
            ...children('::after', composition([
                imports([
                    // a dummy text content, for making parent's height as tall as line-height
                    // the dummy is also used for calibrating the flex's vertical position
                    fillTextLineheightLayout(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesRangeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [, mildRefs           ] = usesMildVariant();
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return composition([
        imports([
            // variants:
            usesEditableActionControlVariants(),
            
            // layouts:
            sizes(),
            usesNudeVariant(),
        ]),
        variants([
            isNude([
                layout({
                    // foregrounds:
                    foreg          : [[mildRefs.foregMildFn], '!important'], // no valid/invalid animation
                    
                    
                    
                    // borders:
                    [borderRadiusDecls.borderStartStartRadius] : 0, // discard borderRadius
                    [borderRadiusDecls.borderStartEndRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndStartRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndEndRadius]     : 0, // discard borderRadius
                    
                    
                    
                    // animations:
                    boxShadow      : 'initial !important', // no focus animation
                }),
            ]),
        ]),
    ]);
};
export const usesRangeStates = () => {
    return composition([
        imports([
            // states:
            usesEditableActionControlStates(),
        ]),
    ]);
};
export const usesRange = () => {
    return composition([
        imports([
            // layouts:
            usesRangeLayout(),
            
            // variants:
            usesRangeVariants(),
            
            // states:
            usesRangeStates(),
        ]),
    ]);
};

export const useRangeSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesRange(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        trackBlockSize    : borders.bold,
        trackBorderRadius : borderRadiuses.pill,
        trackPadding      : 0,
        
        
        
        thumbInlineSize   : '1em',
        thumbBlockSize    : '1em',
        thumbBorderRadius : borderRadiuses.pill,
        thumbPadding      : 0,
    };
}, { prefix: 'rnge' });



// react components:

export interface RangeProps
    extends
        EditableActionControlProps<HTMLInputElement>,
        Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>,
        
        // layouts:
        NudeVariant
{
    // validations:
    min?      : string | number
    max?      : string | number
    
    
    // formats:
    step?     : number | string
    
    
    // events:
    onChange? : React.ChangeEventHandler<HTMLInputElement>
}
export function Range(props: RangeProps) {
    // styles:
    const sheet             = useRangeSheet();
    
    
    
    // variants:
    const nudeVariant       = useNudeVariant(props);
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // jsx:
    return (
        <Input
            // other props:
            {...props}
            
            
            // formats:
            type='range'
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                nudeVariant.class,
            ]}
            stateClasses={[...(props.stateClasses ?? []),
                pressReleaseState.class,
            ]}
            
            
            // events:
            onMouseDown={(e) => { props.onMouseDown?.(e); pressReleaseState.handleMouseDown(e); }}
            onKeyDown=  {(e) => { props.onKeyDown?.(e);   pressReleaseState.handleKeyDown(e);   }}
            onAnimationEnd={(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                pressReleaseState.handleAnimationEnd(e);
            }}
        />
    );
}
export { Range as default }
