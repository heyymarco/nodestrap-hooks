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
    createUseCssfnStyle,
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
    usesSizes,
    usesGradient,
    
    
    
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
const inputElm = ':first-child';
export const usesInputLayout = () => {
    return composition([
        imports([
            // layouts:
            usesEditableTextControlLayout(),
        ]),
        layout({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // items are stacked horizontally
            justifyContent : 'center', // center items horizontally
            alignItems     : 'center', // center items vertically
            
            
            
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
                    // strip out input's prop [size]:
                    // span to maximum width including parent's paddings:
                    boxSizing      : 'border-box', // the final size is including borders & paddings
                    inlineSize     : 'fill-available',
                    fallbacks      : {
                        inlineSize : [['calc(100% + (', cssProps.paddingInline, ' * 2))']],
                    },
                    
                    
                    
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
    const [sizes] = usesSizes((sizeName) => composition([
        vars({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    // colors:
    const [gradient, , gradientDecls] = usesGradient((toggle) => composition([
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

export const useInputSheet = createUseCssfnStyle(() => [
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
export const Input = (props: InputProps) => {
    // styles:
    const sheet    = useInputSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibility:
        tabIndex,
        
        
        // values:
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
            
            
            // accessibility:
            tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            <input
                // essentials:
                ref={elmRef}
                
                
                // accessibility:
                tabIndex={tabIndex} // focusable
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                // values:
                defaultValue={defaultValue}
                value={value}
                
                
                // validations:
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                min={min}
                max={max}
                pattern={pattern}
                
                
                // formats:
                type={type}
                placeholder={placeholder}
                
                
                // events:
                onChange={onChange} // forwards `onChange` event
            />
        </EditableTextControl>
    );
};
export { Input as default }



export const TextInput     = (props: InputProps) => <Input {...props} type='text' />
export const SearchInput   = (props: InputProps) => <Input {...props} type='search' />
export const PasswordInput = (props: InputProps) => <Input {...props} type='password' />
export const EmailInput    = (props: InputProps) => <Input {...props} type='email' />
export const TelInput      = (props: InputProps) => <Input {...props} type='tel' />
export const UrlInput      = (props: InputProps) => <Input {...props} type='url' />
export const NumberInput   = (props: InputProps) => <Input {...props} type='number' />
export const TimeInput     = (props: InputProps) => <Input {...props} type='time' />
export const WeekInput     = (props: InputProps) => <Input {...props} type='week' />
export const DateInput     = (props: InputProps) => <Input {...props} type='date' />
export const DateTimeInput = (props: InputProps) => <Input {...props} type='datetime-local' />
export const MonthInput    = (props: InputProps) => <Input {...props} type='month' />



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
