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
    usesPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // hooks:
    usesFocusBlurState,
    
    
    
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
}                           from './Control'
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from './EditableControl'
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
    EditableActionControl,
    EditableActionControlProps,
}                           from './EditableActionControl'
import {
    // styles:
    inputElm,
    
    
    // react components:
    Input,
}                           from './Input'
import {
    borders,
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import {
    // styles:
    fillTextLineheightLayout,
}                           from './layouts'



// styles:
const trackElm = '.track';
const thumbElm = '.thumb';
export const usesRangeLayout = () => {
    // dependencies:
    
    // spacings:
    const [, , paddingDecls] = usesPadding();
    
    
    
    return composition([
        imports([
            // layouts:
            usesEditableControlLayout(),
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
            
            
            
            // // animations:
            // boxShadow      : 'initial !important', // no focus animation
            
            
            
            // children:
            ...children('::before', composition([
                imports([
                    // a dummy text content, for making parent's height as tall as line-height
                    // the dummy is also used for calibrating the flex's vertical position
                    fillTextLineheightLayout(),
                ]),
            ])),
            ...children(trackElm, composition([
                layout({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    
                    
                    
                    // animations:
                    boxShadow      : 'initial !important', // no focus animation
                    
                    
                    
                    // children:
                    ...children(thumbElm, composition([
                        layout({
                            // layouts:
                            display         : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // sizes:
                            boxSizing       : 'border-box', // the final size is including borders & paddings
                            
                            
                            
                            // positions:
                            position        : 'relative',
                            insetBlockStart : `calc(0px - (${cssProps.thumbBlockSize} / 2))`,
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'thumb')), // apply general cssProps starting with thumb***
                        }),
                    ])),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'track')), // apply general cssProps starting with track***
                }),
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
            usesEditableControlVariants(),
            
            // layouts:
            sizes(),
            usesNudeVariant(),
        ]),
        variants([
            isNude([
                layout({
                    // foregrounds:
                    foreg     : [[mildRefs.foregMildFn], '!important'], // no valid/invalid animation
                    
                    
                    
                    // borders:
                    [borderRadiusDecls.borderStartStartRadius] : 0, // discard borderRadius
                    [borderRadiusDecls.borderStartEndRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndStartRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndEndRadius]     : 0, // discard borderRadius
                    
                    
                    
                    // animations:
                    boxShadow : 'initial !important', // no focus animation
                }),
            ]),
        ]),
    ]);
};
export const usesRangeStates = () => {
    return composition([
        imports([
            // states:
            usesEditableControlStates(),
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
        trackBlockSize    : '0.4em',
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
    const sheet          = useRangeSheet();
    
    
    
    // fn props:
    const nude           = props.nude ?? true;
    const theme          = props.theme ?? 'primary';
    const themeAlternate = ((theme === 'primary') ? 'secondary' : 'primary');
    const mild           = props.mild ?? false;
    const mildAlternate  = nude ? mild : !mild;
    
    
    
    // variants:
    const nudeVariant    = useNudeVariant({ nude });
    
    
    
    // jsx:
    return (
        <EditableControl
            // other props:
            {...props}
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
            
            
            // variants:
            theme={theme}
            mild={mild}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                nudeVariant.class,
            ]}
        >
            <EditableControl
                // accessibilities:
                tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
                
                
                // variants:
                theme={themeAlternate}
                mild={mild}
                
                
                // classes:
                classes={[...(props.classes ?? []),
                    'track',
                ]}
            >
                <EditableActionControl
                    // variants:
                    theme={theme}
                    mild={mildAlternate}
                    
                    
                    // classes:
                    classes={[...(props.classes ?? []),
                        'thumb',
                    ]}
                >
                </EditableActionControl>
            </EditableControl>
        </EditableControl>
    );
}
export { Range as default }
