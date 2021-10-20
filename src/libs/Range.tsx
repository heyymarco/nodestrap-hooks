// react (builds html using javascript):
import {
    default as React,
    useReducer,
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
    siblings,
    
    
    
    // rules:
    rules,
    variants,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from './css-var'     // Declares & retrieves *css variables* (css custom properties).
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
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'
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

export interface RangeVars {
    /**
     * Range's thumb position.
     */
    rangeValuePos : any
}
const [rangeVarRefs, rangeVarDecls] = createCssVar<RangeVars>();

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
                            display          : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // sizes:
                            boxSizing        : 'border-box', // the final size is including borders & paddings
                            
                            
                            
                            // positions:
                            position         : 'relative',
                            insetBlockStart  : `calc(0px - (${cssProps.thumbBlockSize} / 2))`,
                            insetInlineStart : `calc((100% - ${cssProps.thumbInlineSize}) * ${rangeVarRefs.rangeValuePos})`,
                            
                            
                            
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



// utilities:
const isSingleValue = (num: string|ReadonlyArray<string>): num is string => (typeof(num) === 'string') || Array.isArray(num) && (num.length === 1);
const parseNumber = (num: number|string|ReadonlyArray<string>|null|undefined): number|null => {
    if (typeof(num) === 'number') return num;
    if (!num) return null;
    
    
    
    if (!isSingleValue(num)) return null;
    if (!num) return null;
    
    
    
    num = Number.parseFloat(num);
    if (num === NaN) return null;
    return num;
};



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
    step?     : string | number
    
    
    // events:
    onChange? : React.ChangeEventHandler<HTMLInputElement>
}
export function Range(props: RangeProps) {
    // styles:
    const sheet = useRangeSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        autoFocus,
        tabIndex,
        
        
        // values:
        name,
        form,
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        // validations:
        required,
        min,
        max,
        step,
    ...restProps}  = props;
    
    
    
    // fn props:
    const propEnabled             = usePropEnabled(props);
    const propReadOnly            = usePropReadOnly(props);
    const nude                    = props.nude ?? true;
    const theme                   = props.theme ?? 'primary';
    const themeAlternate          = ((theme !== 'secondary') ? 'secondary' : 'primary');
    const mild                    = props.mild ?? false;
    const mildAlternate           = nude ? mild : !mild;
    
    
    
    // variants:
    const nudeVariant             = useNudeVariant({ nude });
    
    
    
    // fn props:
    const minFn          : number = parseNumber(min)  ?? 0;
    const maxFn          : number = parseNumber(max)  ?? 100;
    const stepFn         : number = parseNumber(step) ?? 1;
    const defaultValueFn : number = (maxFn < minFn) ? minFn : (minFn + ((maxFn - minFn) / 2));
    
    
    
    // states:
    const [valueDn, setValueDn]   = useReducer((value: number, action: number): number => {
        return action;
    }, /*initialState: */parseNumber(defaultValue) ?? defaultValueFn);
    
    
    
    // fn props:
    const valueFn        : number = Math.min(Math.max(
        parseNumber(value) /*controllable*/ ?? valueDn /*uncontrollable*/
    , minFn), maxFn);
    const valuePos       : number = (valueFn - Math.abs(minFn)) / Math.abs(maxFn - minFn);
    
    
    
    // jsx:
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restProps}
            
            
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
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [rangeVarDecls.rangeValuePos]: valuePos,
            }}
        >
            <input
                // essentials:
                ref={elmRef}
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex,
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                // values:
                {...{
                    name,
                    form,
                    // defaultValue,
                    value : valueFn,
                }}
                
                
                // validations:
                {...{
                    required,
                    min  : minFn,
                    max  : maxFn,
                    step : stepFn,
                }}
                
                
                // formats:
                {...{
                    type : 'range',
                }}
                
                
                // events:
                onChange={(e) => {
                    onChange?.(e);
                    setValueDn(parseNumber(e.target.value) ?? valueDn)
                }}
            />
            <EditableControl<HTMLInputElement>
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
                <EditableActionControl<HTMLInputElement>
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
