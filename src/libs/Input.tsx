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
    fallbacks,
    
    
    
    //combinators:
    children,
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

// nodestrap utilities:
import {
    stripoutTextbox,
}                           from './stripouts'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    usesGradientVariant,
    expandBorderRadius,
    usesPadding,
}                           from './Basic'
import {
    // styles:
    usesEditableTextControlLayout,
    usesEditableTextControlVariants,
    usesEditableTextControlStates,
    
    
    
    // react components:
    EditableTextControlProps,
    EditableTextControl,
}                           from './EditableTextControl'



// styles:
export const inputElm = ':first-child';
export const usesInputLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddingRefs] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableTextControlLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // flow to the document's writing flow
            justifyContent : 'start',  // if input is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the input's first letter should be visible first
            alignItems     : 'center', // default center items vertically (especially for the validation icon indicator)
            flexWrap       : 'nowrap', // prevents the input & icon to wrap to the next row
            
            
            
            // positions:
            verticalAlign  : 'baseline', // input's text should be aligned with sibling text, so the input behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, {
                ...imports([
                    stripoutTextbox(), // clear browser's default styles
                ]),
                ...style({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    alignSelf      : 'stretch',        // follows parent's height
                    // strip out the *weird input's prop [size]* so it can follow flex behavior:
                    // span to maximum width including parent's paddings:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    ...fallbacks({
                        inlineSize : `calc(100% + (${paddingRefs.paddingInline} * 2))`,
                    }),
                    
                    
                    
                    // borders:
                    // affects for :autofill
                    ...expandBorderRadius(),     // expand borderRadius css vars
                    
                    
                    
                    // spacings:
                    // cancel-out parent's padding with negative margin:
                    marginInline   : `calc(0px - ${paddingRefs.paddingInline})`,
                    marginBlock    : `calc(0px - ${paddingRefs.paddingBlock })`,
                    
                    // copy parent's paddings:
                    paddingInline  : paddingRefs.paddingInline,
                    paddingBlock   : paddingRefs.paddingBlock,
                }),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    });
};
export const usesInputVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    // colors:
    const [gradient, , gradientDecls] = usesGradientVariant((toggle) => style({
        ...vars({
            // *toggle on/off* the background gradient prop:
            [gradientDecls.backgGradTg] : toggle ? cssProps.backgGrad : ((toggle !== null) ? 'initial' : null),
        }),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableTextControlVariants(),
            
            // layouts:
            sizes(),
            
            // colors:
            gradient(),
        ]),
    });
};
export const usesInputStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableTextControlStates(),
        ]),
    });
};

export const useInputSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesInputLayout(),
            
            // variants:
            usesInputVariants(),
            
            // states:
            usesInputStates(),
        ]),
    ),
], /*sheetId :*/'b75oz4h9pp'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        backgGrad     : [['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box']],
    };
}, { prefix: 'inp' });



// react components:

export type InputTextLike                 = 'text'|'search'|'password'|'email'|'tel'|'url'|'number'|'time'|'week'|'date'|'datetime-local'|'month'
export type InputType                     = InputTextLike | 'color'|'file'|'range'
export type InputHTMLAttributes<TElement> = Omit<React.InputHTMLAttributes<TElement>, 'size'|'src'|'alt'|'width'|'height'|'crossOrigin'|'checked'|'multiple'|'accept'|'capture'|'formAction'|'formEncType'|'formMethod'|'formNoValidate'|'formTarget'|keyof React.HTMLAttributes<TElement>>

export interface InputProps
    extends
        EditableTextControlProps<HTMLInputElement>,
        InputHTMLAttributes<HTMLInputElement>
{
    // validations:
    min?     : string | number
    max?     : string | number
    step?    : string | number
    pattern? : string
    
    
    // formats:
    type?         : InputType
    placeholder?  : string
    autoComplete? : string
    list?         : string
}
export function Input(props: InputProps) {
    // styles:
    const sheet    = useInputSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        autoFocus,
        tabIndex,
        enterKeyHint,
        
        
        // values:
        name,
        form,
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        // validations:
        required,
        minLength,
        maxLength,
        min,
        max,
        step,
        pattern,
        
        
        // formats:
        type,
        placeholder,
        autoComplete,
        list,
    ...restProps}  = props;
    
    
    
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // jsx:
    return (
        <EditableTextControl<HTMLInputElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
            enabled={props.enabled ?? !(props.disabled ?? false)}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            <input
                // essentials:
                ref={elmRef}
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex,
                    enterKeyHint,
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                // values:
                {...{
                    name,
                    form,
                    defaultValue,
                    value,
                }}
                
                
                // validations:
                {...{
                    required,
                    minLength,
                    maxLength,
                    min,
                    max,
                    step,
                    pattern,
                }}
                
                
                // formats:
                {...{
                    type,
                    placeholder,
                    autoComplete,
                    list,
                }}
                
                
                // events:
                onChange={(e) => {
                    onChange?.(e);
                    
                    
                    
                    // then do nothing here, just for satisfying React for controllable readonly input
                    // passing `onChange={undefined}` causing React unhappy
                }}
            />
        </EditableTextControl>
    );
}
export { Input as default }



export function TextInput     (props: InputProps) { return <Input {...props} type='text' />           }
export function SearchInput   (props: InputProps) { return <Input {...props} type='search' />         }
export function PasswordInput (props: InputProps) { return <Input {...props} type='password' />       }
export function EmailInput    (props: InputProps) { return <Input {...props} type='email' />          }
export function TelInput      (props: InputProps) { return <Input {...props} type='tel' />            }
export function UrlInput      (props: InputProps) { return <Input {...props} type='url' />            }
export function NumberInput   (props: InputProps) { return <Input {...props} type='number' />         }
export function TimeInput     (props: InputProps) { return <Input {...props} type='time' />           }
export function WeekInput     (props: InputProps) { return <Input {...props} type='week' />           }
export function DateInput     (props: InputProps) { return <Input {...props} type='date' />           }
export function DateTimeInput (props: InputProps) { return <Input {...props} type='datetime-local' /> }
export function MonthInput    (props: InputProps) { return <Input {...props} type='month' />          }

// mark as Input compatible:
TextInput.prototype     = Input.prototype;
SearchInput.prototype   = Input.prototype;
PasswordInput.prototype = Input.prototype;
EmailInput.prototype    = Input.prototype;
TelInput.prototype      = Input.prototype;
UrlInput.prototype      = Input.prototype;
NumberInput.prototype   = Input.prototype;
TimeInput.prototype     = Input.prototype;
WeekInput.prototype     = Input.prototype;
DateInput.prototype     = Input.prototype;
DateTimeInput.prototype = Input.prototype;
MonthInput.prototype    = Input.prototype;



export {
    TextInput       as Text,
    SearchInput     as Search,
    PasswordInput   as Password,
    EmailInput      as Email,
    TelInput        as Tel,
    UrlInput        as Url,
    NumberInput     as Number,
    TimeInput       as Time,
    WeekInput       as Week,
    DateInput       as Date,
    DateTimeInput   as DateTime,
    MonthInput      as Month,
}
