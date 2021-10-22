// react (builds html using javascript):
import {
    default as React,
    useReducer,
    useRef,
    useCallback,
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
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // utilities:
    setRef,
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
    OrientationName,
    notOrientationBlock,
    isOrientationBlock,
    OrientationVariant,
    useOrientationVariant,
    isNude,
    usesNudeVariant,
    NudeVariant,
    useNudeVariant,
    usesMildVariant,
    usesBorderRadius,
}                           from './Basic'
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControl,
}                           from './EditableControl'
import {
    // react components:
    EditableActionControl,
    EditableActionControlProps,
}                           from './EditableActionControl'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'
import {
    borderRadiuses,
}                           from './borders'     // configurable borders & border radiuses defs
import {
    // styles:
    fillTextLineheightLayout,
}                           from './layouts'

// others libs:
// @ts-ignore
import triggerChange        from 'react-trigger-change'



// styles:
export const inputElm = ':first-child';
export const trackElm = '.track';
export const thumbElm = '.thumb';

export interface RangeVars {
    /**
     * Range's thumb ratio.
     */
    rangeValueRatio : any
}
const [rangeVarRefs, rangeVarDecls] = createCssVar<RangeVars>();

export const usesRangeLayout = () => {
    return composition([
        imports([
            // layouts:
            usesEditableControlLayout(),
        ]),
        layout({
            // layouts:
         // display        : 'flex',   // customizable orientation // already defined in variant `.block`/`.inline`
         // flexDirection  : 'row',    // customizable orientation // already defined in variant `.block`/`.inline`
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
            ...children(inputElm, composition([
                layout({
                    // layouts:
                    display: 'none', // hide the input
                }),
            ])),
            ...children(trackElm, composition([
                layout({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire Range's width
                 // flexDirection  : 'row',     // customizable orientation // already defined in variant `.block`/`.inline`
                    justifyContent : 'start',   // if thumb is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the thumb's first part should be visible first
                    alignItems     : 'center',  // center thumb vertically
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // sizes:
                    boxSizing      : 'border-box',     // the final size is including borders & paddings
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    
                    
                    
                    // animations:
                    boxShadow      : 'initial !important', // no focus animation
                    
                    
                    
                    // children:
                    ...children(['::before', '::after'], composition([
                        layout({
                            // layouts:
                            content   : '""',
                            display   : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // sizes:
                            alignSelf : 'stretch',      // follows parent's height
                        }),
                    ])),
                    ...children(thumbElm, composition([
                        layout({
                            // layouts:
                            display   : 'inline-block', // use inline-block, so it takes the width & height as we set
                            
                            
                            
                            // sizes:
                            boxSizing : 'border-box', // the final size is including borders & paddings
                            
                            
                            
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
            notOrientationBlock([ // inline
                layout({
                    // layouts:
                    display        : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection  : 'row',         // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children(trackElm, composition([
                        layout({
                            // layouts:
                            flexDirection : 'row',    // items are stacked horizontally
                            
                            
                            
                            // children:
                            ...children('::before', composition([
                                layout({
                                    // sizes:
                                    flex : [[rangeVarRefs.rangeValueRatio, rangeVarRefs.rangeValueRatio, 0]], // growable, shrinkable, initial from 0 width; using `rangeValueRatio` for the grow/shrink ratio
                                }),
                            ])),
                            ...children('::after', composition([
                                layout({
                                    // sizes:
                                    flex : [[`calc(1 - ${rangeVarRefs.rangeValueRatio})`, `calc(1 - ${rangeVarRefs.rangeValueRatio})`, 0]], // growable, shrinkable, initial from 0 width; using `1 - rangeValueRatio` for the grow/shrink ratio
                                }),
                            ])),
                        }),
                    ])),
                    
                    
                    
                    // overwrites propName = propName{Inline}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
                }),
            ]),
            isOrientationBlock([ // block
                layout({
                    // layouts:
                    display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    flexDirection  : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children('::before', composition([
                        layout({
                            // rotate a dummy text 90 degree:
                            writingMode : 'vertical-lr',
                        }),
                    ])),
                    ...children(trackElm, composition([
                        layout({
                            // layouts:
                            flexDirection : 'column', // items are stacked vertically
                            
                            
                            
                            // children:
                            ...children('::before', composition([
                                layout({
                                    // sizes:
                                    flex : [[`calc(1 - ${rangeVarRefs.rangeValueRatio})`, `calc(1 - ${rangeVarRefs.rangeValueRatio})`, 0]], // growable, shrinkable, initial from 0 width; using `1 - rangeValueRatio` for the grow/shrink ratio
                                }),
                            ])),
                            ...children('::after', composition([
                                layout({
                                    // sizes:
                                    flex : [[rangeVarRefs.rangeValueRatio, rangeVarRefs.rangeValueRatio, 0]], // growable, shrinkable, initial from 0 width; using `rangeValueRatio` for the grow/shrink ratio
                                }),
                            ])),
                        }),
                    ])),
                    
                    
                    
                    // overwrites propName = propName{Block}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
                }),
            ]),
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
        minInlineSize        : '8rem',
        minBlockSize         : 'auto',
        
        minInlineSizeBlock   : 'auto',
        minBlockSizeBlock    : '8rem',
        
        
        
        trackInlineSize      : 'auto',
        trackBlockSize       : '0.4em',
        trackBorderRadius    : borderRadiuses.pill,
        trackPadding         : 0,
        
        trackInlineSizeBlock : '0.4em',
        trackBlockSizeBlock  : 'auto',
        
        
        
        thumbInlineSize      : '1em',
        thumbBlockSize       : '1em',
        thumbBorderRadius    : borderRadiuses.pill,
        thumbPadding         : 0,
    };
}, { prefix: 'rnge' });



// utilities:
const isSingleValue = (num: string|ReadonlyArray<string>): num is string => (typeof(num) === 'string') || (Array.isArray(num) && (num.length === 1));
const parseNumber = (num: number|string|ReadonlyArray<string>|null|undefined): number|null => {
    if (typeof(num) === 'number') return num;
    if (!num) return null;
    
    
    
    if (!isSingleValue(num)) return null;
    if (!num) return null;
    
    
    
    num = Number.parseFloat(num);
    if (isNaN(num)) return null;
    return num;
};



// react components:

export interface RangeProps
    extends
        EditableActionControlProps<HTMLInputElement>,
        Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>,
        
        // layouts:
        OrientationVariant,
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
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    const nude           = props.nude ?? true;
    const theme          = props.theme ?? 'primary';
    const themeAlternate = ((theme !== 'secondary') ? 'secondary' : 'primary');
    const mild           = props.mild ?? false;
    const mildAlternate  = nude ? mild : !mild;
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const nudeVariant        = useNudeVariant({ nude });
    
    
    
    // fn props:
    const minFn          : number  = parseNumber(min)  ?? 0;
    const maxFn          : number  = parseNumber(max)  ?? 100;
    const stepFn         : number  = (step === 'any') ? 0 : (parseNumber(step) ?? 1);
    const negativeFn     : boolean = (maxFn < minFn);
    const defaultValueFn : number  = (minFn + ((maxFn - minFn) / 2));
    
    
    
    // dom effects:
    const inputRef = useRef<HTMLInputElement|null>(null);
    const trackRef = useRef<HTMLInputElement|null>(null);
    const thumbRef = useRef<HTMLInputElement|null>(null);
    
    
    
    // utilities:
    const trimValue = useCallback((value: number): number => {
        // make sure the requested value is between the min value & max value:
        value     = Math.min(Math.max(
            value
        , (negativeFn ? maxFn : minFn)), (negativeFn ? minFn : maxFn));
        
        // if step was specified => stepping the value starting from min value:
        if (stepFn > 0) {
            let steps    = Math.round((value - minFn) / stepFn); // get the_nearest_stepped_value
            
            // make sure the_nearest_stepped_value is not exceeded the max value:
            let maxSteps = (maxFn - minFn) / stepFn;
            maxSteps     = negativeFn ? Math.ceil(maxSteps) : Math.floor(maxSteps); // remove the decimal fraction
            
            // re-align the steps:
            steps        = negativeFn ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
            
            // calculate the new value:
            value        = minFn + (steps * stepFn);
        } // if
        
        return value;
    }, [minFn, maxFn, stepFn, negativeFn]);
    const triggerInputChange = (value: number) => {
        const inputElm = inputRef.current;
        if (!inputElm) return;
        
        
        
        inputElm.valueAsNumber = value;
        setTimeout(() => {
            triggerChange(inputElm);
        }, 0);
    };
    
    
    
    // states:
    interface ValueReducerAction {
        type           : 'setValue'|'setValueRatio'
        payload        : number
        triggerChange? : boolean
    }
    const [valueDn, setValueDn]    = useReducer(useCallback((value: number, action: ValueReducerAction): number => {
        switch (action.type) {
            case 'setValue': {
                const newValue = trimValue(action.payload);
                
                if ((newValue !== value) && (action.triggerChange === true)) {
                    triggerInputChange(newValue);
                } // if
                
                return newValue;
            }
            case 'setValueRatio': {
                let valueRatio = action.payload;
                
                // make sure the valueRatio is between 0 & 1:
                valueRatio     = Math.min(Math.max(
                    valueRatio
                , 0), 1);
                
                const newValue = trimValue(minFn + ((maxFn - minFn) * valueRatio));
                
                if ((newValue !== value) && (action.triggerChange === true)) {
                    triggerInputChange(newValue);
                } // if
                
                return newValue;
            }
            
            default:
                return value; // no change
        } // switch
    }, [minFn, maxFn, trimValue]), /*initialState: */parseNumber(defaultValue) ?? defaultValueFn);
    
    
    
    // fn props:
    const valueFn        : number = trimValue(parseNumber(value) /*controllable*/ ?? valueDn /*uncontrollable*/);
    const valueRatio     : number = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    // handlers:
    const handleMouseMove = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (!propEnabled)    return; // control is disabled => no response required
        if (propReadOnly)    return; // control is readOnly => no response required
        if (e.buttons !== 1) return; // only handle left_click only
        
        
        
        const elm          = trackRef.current ?? e.currentTarget;
        const rect         = elm.getBoundingClientRect();
        
        const style        = getComputedStyle(elm);
        const borderLeft   = (Number.parseInt(style.borderLeftWidth) || 0);
        const paddingLeft  = (Number.parseInt(style.paddingLeft)     || 0);
        const paddingRight = (Number.parseInt(style.paddingRight)    || 0);
        const thumbWidth   = thumbRef.current?.offsetWidth ?? 0;
        const trackWidth   = (elm.clientWidth - paddingLeft - paddingRight - thumbWidth);
        
        const cursorPos    = e.clientX - rect.left - borderLeft - paddingLeft - (thumbWidth / 2);
        // if ((cursorPos < 0) || (cursorPos > trackWidth)) return; // setValueRatio will take care of this
        const valueRatio   = cursorPos / trackWidth;
        
        setValueDn({ type: 'setValueRatio', payload: valueRatio, triggerChange: true });
    };
    
    
    
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
                orientationVariant.class,
                nudeVariant.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [rangeVarDecls.rangeValueRatio]: valueRatio,
            }}
            
            
            // events:
            onMouseMove={(e) => {
                props.onMouseMove?.(e);
                
                
                
                handleMouseMove(e);
            }}
        >
            <input
                // essentials:
                ref={(elm) => {
                    setRef(elmRef, elm);
                    setRef(inputRef, elm);
                }}
                
                
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
                    min  : negativeFn ? trimValue(maxFn) : minFn,
                    max  : negativeFn ? minFn            : maxFn,
                    step : stepFn,
                }}
                
                
                // formats:
                {...{
                    type : 'range',
                }}
                
                
                // events:
                onChange={(e) => {
                    onChange?.(e);
                    
                    
                    
                    // setValueDn({ type: 'setValue', payload: parseNumber(e.currentTarget.value) ?? valueDn });
                }}
            />
            <EditableControl<HTMLInputElement>
                // essentials:
                elmRef={(elm) => {
                    setRef(trackRef, elm);
                }}
                
                
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
                    // essentials:
                    elmRef={(elm) => {
                        setRef(thumbRef, elm);
                    }}
                    
                    
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

export type { OrientationName, OrientationVariant }
