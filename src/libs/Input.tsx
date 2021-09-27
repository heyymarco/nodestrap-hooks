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
    usesSizeVariant,
    usesGradientVariant,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    // styles:
    usesEditableTextControlLayout,
    usesEditableTextControlVariants,
    usesEditableTextControlStates,
    
    
    
    // react components:
    EditableTextControlProps,
    EditableTextControl,
}                           from './EditableTextControl'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'
import {
    stripOutTextbox,
}                           from './strip-outs'



// styles:
export const inputElm = ':first-child';
export const usesInputLayout = () => {
    return composition([
        imports([
            // layouts:
            usesEditableTextControlLayout(),
        ]),
        layout({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // flow to the document's writting flow
            justifyContent : 'center', // center items horizontally
            alignItems     : 'center', // center items vertically
            flexWrap       : 'nowrap', // prevents the input & icon to wrap to the next row
            
            
            
            // positions:
            verticalAlign  : 'baseline', // input's text should be aligned with sibling text, so the input behave like <span> wrapper
            
            
            
            // children:
            ...children(inputElm, composition([
                imports([
                    stripOutTextbox(), // clear browser's default styles
                ]),
                layout({
                    // layouts:
                    display        : 'block', // fills the entire parent's width
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% wrapper's width
                    alignSelf      : 'stretch', // fill the parent height
                    // // strip out input's prop [size]:
                    // // span to maximum width including parent's paddings:
                    // boxSizing      : 'border-box', // the final size is including borders & paddings
                    // inlineSize     : 'fill-available',
                    // fallbacks      : {
                    //     inlineSize : [['calc(100% + (', cssProps.paddingInline, ' * 2))']],
                    // },
                    
                    
                    
                    // spacings:
                    // cancel-out parent's padding with negative margin:
                    marginInline   : [['calc(0px -', cssProps.paddingInline, ')']],
                    marginBlock    : [['calc(0px -', cssProps.paddingBlock,  ')']],
                    
                    // copy parent's paddings:
                    paddingInline  : cssProps.paddingInline,
                    paddingBlock   : cssProps.paddingBlock,
                }),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesInputVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [gradient, , gradientDecls] = usesGradientVariant((toggle) => composition([
        vars({
            // *toggle on/off* the background gradient prop:
            [gradientDecls.backgGradTg] : toggle ? cssProps.backgGrad : ((toggle !== null) ? 'initial' : null),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesEditableTextControlVariants(),
            
            // layouts:
            sizes(),
            
            // colors:
            gradient(),
        ]),
    ]);
};
export const usesInputStates = () => {
    return composition([
        imports([
            // states:
            usesEditableTextControlStates(),
        ]),
    ]);
};
export const usesInput = () => {
    return composition([
        imports([
            // layouts:
            usesInputLayout(),
            
            // variants:
            usesInputVariants(),
            
            // states:
            usesInputStates(),
        ]),
    ]);
};

export const useInputSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesInput(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        paddingInline : bcssProps.paddingInline,
        paddingBlock  : bcssProps.paddingBlock,
        //#endregion spacings
        
        
        
        backgGrad     : [['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box']],
    };
}, { prefix: 'inp' });



// react components:

export type InputTextLike = 'text'|'search'|'password'|'email'|'tel'|'url'|'number'|'time'|'week'|'date'|'datetime-local'|'month'
export type InputType     = InputTextLike | 'color'|'file'|'range'

export interface InputProps
    extends
        EditableTextControlProps<HTMLInputElement>
        // React.InputHTMLAttributes<HTMLInputElement> // todo: implements input attr
{
    // validations:
    min?     : string | number
    max?     : string | number
    pattern? : string
    
    
    // formats:
    type?         : InputType
    placeholder?  : string
}
export function Input(props: InputProps) {
    // styles:
    const sheet    = useInputSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        tabIndex,
        
        
        // values:
        name,
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        // validations:
        required,
        minLength,
        maxLength,
        min,
        max,
        pattern,
        
        
        // formats:
        type,
        placeholder,
    ...restProps}  = props;
    
    
    
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    
    
    
    // jsx:
    return (
        <EditableTextControl<HTMLInputElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'span'}
            
            
            // accessibilities:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            <input
                // essentials:
                ref={elmRef}
                
                
                // accessibilities:
                {...{
                    tabIndex,
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                // values:
                {...{
                    name,
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
                    pattern,
                }}
                
                
                // formats:
                {...{
                    type,
                    placeholder,
                }}
                
                
                // events:
                {...{
                    onChange,
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
