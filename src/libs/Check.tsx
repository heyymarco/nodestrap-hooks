// react (builds html using javascript):
import {
    default as React,
    useRef,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Cust,
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
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
    states,
    rule,
    isNotLastChild,
    
    
    
    // utilities:
    escapeSvg,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
    fallbacks,
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
    usesMildVariant,
    usesForeg,
    usesAnim,
}                           from './BasicComponent'
import {
    // hooks:
    isActived,
    isActivating,
    isPassivating,
    isPassived,
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    // hooks:
    usesActivePassiveAsPressReleaseState,
}                           from './ActionControl'
import {
    // styles:
    usesEditableActionControlLayout,
    usesEditableActionControlVariants,
    usesEditableActionControlStates,
    
    
    
    // react components:
    EditableActionControlProps,
    EditableActionControl,
}                           from './EditableActionControl'
import {
    // styles:
    usesIconImage,
}                           from './Icon'
import {
    // styles:
    usesButtonLayout,
}                           from './Button'
import {
    // hooks:
    usePropEnabled,
}                           from './accessibilities'



// hooks:

// animations:

//#region check animations
export interface CheckAnimVars {
    /**
     * none filter.
     */
    filterNone  : any
    /**
     * final filter for the checkbox.
     */
    checkFilter : any
    
    /**
     * none transform.
     */
    transfNone  : any
    /**
     * final transform for the checkbox.
     */
    checkTransf : any
    
    /**
     * none animation.
     */
    animNone    : any
    /**
     * final animation for the checkbox.
     */
    checkAnim   : any
}
const [checkAnimRefs, checkAnimDecls] = createCssVar<CheckAnimVars>();

const setsCheckFilter = new Set<Cust.Ref>();
const setsCheckTransf = new Set<Cust.Ref>();
const setsCheckAnim   = new Set<Cust.Ref>();
const checkPropsManager  = {
    filters             : () => Array.from(setsCheckFilter),
    registerFilter      : (item: Cust.Ref) => setsCheckFilter.add(item),
    unregisterFilter    : (item: Cust.Ref) => setsCheckFilter.delete(item),
    
    transfs             : () => Array.from(setsCheckTransf),
    registerTransf      : (item: Cust.Ref) => setsCheckTransf.add(item),
    unregisterTransf    : (item: Cust.Ref) => setsCheckTransf.delete(item),
    
    anims               : () => Array.from(setsCheckAnim),
    registerAnim        : (item: Cust.Ref) => setsCheckAnim.add(item),
    unregisterAnim      : (item: Cust.Ref) => setsCheckAnim.delete(item),
} as const;

export const usesCheckAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            imports([
                // animations:
                anim(),
            ]),
            vars({
                [checkAnimDecls.checkFilter]        : [[ // double array => makes the JSS treat as space separated values
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...checkPropsManager.filters().map((filter) => fallbacks(
                        filter,
                        
                        animRefs.filterNone, // default => none filter
                    )),
                ]],
                
                [checkAnimDecls.checkTransf]        : [[ // double array => makes the JSS treat as space separated values
                    // combining: transf1 * transf2 * transf3 ...
                    
                    // layers:
                    ...checkPropsManager.transfs().map((transf) => fallbacks(
                        transf,
                        
                        animRefs.transfNone, // default => none transf
                    )),
                ]],
                
                [checkAnimDecls.checkAnim]          : [ // single array => makes the JSS treat as comma separated values
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...checkPropsManager.anims().map((anim) => fallbacks(
                        anim,
                        
                        animRefs.animNone, // default => none anim
                    )),
                ],
            }),
        ]),
        checkAnimRefs,
        checkAnimDecls,
        checkPropsManager,
    ] as const;
};

{
    const [, animRefs] = usesAnim();
    
    checkPropsManager.registerFilter(animRefs.filterNone);
    checkPropsManager.registerTransf(animRefs.transfNone);
    checkPropsManager.registerAnim(animRefs.animNone);
}
//#endregion check animations


// states:

//#region checkClear
export interface CheckClearVars {
    filterCheckClearIn  : any
    filterCheckClearOut : any
    transfCheckClearIn  : any
    transfCheckClearOut : any
    animCheckClear      : any
}
const [checkClearRefs, checkClearDecls] = createCssVar<CheckClearVars>();

{
    const [, , , checkPropsManager] = usesCheckAnim();
    checkPropsManager.registerFilter(checkClearRefs.filterCheckClearIn);
    checkPropsManager.registerFilter(checkClearRefs.filterCheckClearOut);
    checkPropsManager.registerTransf(checkClearRefs.transfCheckClearIn);
    checkPropsManager.registerTransf(checkClearRefs.transfCheckClearOut);
    checkPropsManager.registerAnim(checkClearRefs.animCheckClear);
}

/**
 * Uses check & clear states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents check & clear state definitions.
 */
export const usesCheckClearState = () => {
    // dependencies:
    const [, animRefs] = usesAnim();
    
    
    
    return [
        () => composition([
            vars({
                [checkClearDecls.filterCheckClearIn]  : animRefs.filterNone,
                [checkClearDecls.filterCheckClearOut] : animRefs.filterNone,
                
                [checkClearDecls.transfCheckClearIn]  : animRefs.transfNone,
                [checkClearDecls.transfCheckClearOut] : animRefs.transfNone,
                
                [checkClearDecls.animCheckClear]      : animRefs.animNone,
            }),
            states([
                isActived([
                    vars({
                        [checkClearDecls.filterCheckClearIn]  : cssProps.filterCheck,
                        
                        [checkClearDecls.transfCheckClearIn]  : cssProps.transfCheck,
                    }),
                ]),
                isActivating([
                    vars({
                        [checkClearDecls.filterCheckClearIn]  : cssProps.filterCheck,
                        [checkClearDecls.filterCheckClearOut] : cssProps.filterClear,
                        
                        [checkClearDecls.transfCheckClearIn]  : cssProps.transfCheck,
                        [checkClearDecls.transfCheckClearOut] : cssProps.transfClear,
                        
                        [checkClearDecls.animCheckClear]      : cssProps.animCheck,
                    }),
                ]),
                isPassivating([
                    vars({
                        [checkClearDecls.filterCheckClearIn]  : cssProps.filterCheck,
                        [checkClearDecls.filterCheckClearOut] : cssProps.filterClear,
                        
                        [checkClearDecls.transfCheckClearIn]  : cssProps.transfCheck,
                        [checkClearDecls.transfCheckClearOut] : cssProps.transfClear,
                        
                        [checkClearDecls.animCheckClear]      : cssProps.animClear,
                    }),
                ]),
                isPassived([
                    vars({
                        [checkClearDecls.filterCheckClearOut] : cssProps.filterClear,
                        
                        [checkClearDecls.transfCheckClearOut] : cssProps.transfClear,
                    }),
                ]),
            ]),
        ]),
        checkClearRefs,
        checkClearDecls,
    ] as const;
};
//#endregion checkClear


// appearances:

export type CheckStyle = 'btn'|'togglerBtn'|'switch' // might be added more styles in the future
export interface CheckVariant {
    checkStyle?: CheckStyle
}
export const useCheckVariant = (props: CheckVariant) => {
    return {
        class: props.checkStyle ? props.checkStyle : null,
    };
};



// styles:
export const inputElm = ':first-child';
export const checkElm = '::before';
export const labelElm = ':nth-child(1n+2)';

export const usesCheckLayout = () => {
    // dependencies:
    
    // colors:
    const [         , mildRefs     ] = usesMildVariant();
    const [foreg    , foregRefs    ] = usesForeg();
    
    // animations:
    const [checkAnim, checkAnimRefs] = usesCheckAnim();
    
    
    
    return composition([
        imports([
            // layouts:
            usesEditableActionControlLayout(),
            
            // colors:
            foreg(),
            
            // animations:
            checkAnim(),
        ]),
        layout({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // items are placed starting from the center (in case of input & label are wrapped, each placed at the center)
            alignItems     : 'center',      // center items vertically (indicator & label are always at center no matter how tall is the wrapper)
            flexWrap       : 'wrap',        // allows the label to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline', // check's text should be aligned with sibling text, so the check behave like <span> wrapper
            
            
            
            // foregrounds:
            foreg          : [[mildRefs.foregMildFn], '!important'], // no valid/invalid animation
            
            
            
            // backgrounds:
            backg          : 'initial !important', // no valid/invalid animation
            
            
            
            // borders:
            border         : 0, // discard border
            borderRadius   : 0, // discard borderRadius
            
            
            
            // spacings:
            padding        : 0, // discard padding
            
            
            
            // animations:
            boxShadow      : 'initial !important', // no focus animation
            
            
            
            // children:
            // a dummy text content, for making parent's height as tall as line-height
            // the dummy is also used for calibrating the flex's vertical position
            ...children('::before', composition([
                layout({
                    // layouts:
                    content    : '"\xa0"',       // &nbsp;
                    display    : 'inline-block', // use inline-block, so we can kill the width
                    
                    
                    
                    // appearances:
                    overflow   : 'hidden', // crop the text width (&nbsp;)
                    visibility : 'hidden', // hide the element, but still consumes the dimension
                    
                    
                    
                    // sizes:
                    inlineSize : 0,        // kill the width, we just need the height
                }),
            ])),
            ...children(inputElm, composition([
                imports([
                    // layouts:
                    usesEditableActionControlLayout(),
                ]),
                layout({
                    // layouts:
                    display       : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // sizes:
                    flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                    boxSizing     : 'border-box', // the final size is including borders & paddings
                    // the size is exactly the same as current font size:
                    inlineSize    : '1em',
                    blockSize     : '1em',
                    
                    
                    
                    // spacings:
                    padding       : 0, // discard padding
                    
                    
                    
                    // borders:
                    overflow      : 'hidden', // clip the icon at borderRadius
                    
                    
                    
                    // accessibilities:
                    pointerEvents : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // animations:
                    filter        : 'initial !important', // uses parent filter
                    
                    
                    
                    // children:
                    ...children(checkElm, composition([
                        imports([
                            // check indicator:
                            usesIconImage(
                                /*iconImage: */cssProps.img,
                                /*iconColor: */foregRefs.foreg,
                            ),
                        ]),
                        layout({
                            // layouts:
                            content   : '""',
                            display   : 'block', // fills the entire parent's width
                            
                            
                            
                            // sizes:
                            // fills the entire parent:
                            boxSizing : 'border-box', // the final size is including borders & paddings
                            blockSize : '100%', // fills the entire parent's height
                            
                            
                            
                            // animations:
                            filter    : checkAnimRefs.checkFilter,
                            transf    : checkAnimRefs.checkTransf,
                            anim      : checkAnimRefs.checkAnim,
                        }),
                    ])),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(cssProps), // apply general cssProps
                }),
                variants([
                    isNotLastChild(composition([
                        layout({
                            // spacing between input & label:
                            marginInlineEnd : cssProps.spacing,
                        }),
                    ])),
                ]),
            ])),
            ...children(labelElm, composition([
                layout({
                    // layouts:
                    display       : 'inline', // use inline, so it takes the width & height automatically
                    
                    
                    
                    // sizes:
                    flex          : [[1, 1, 'auto']], // growable, shrinkable, initial from it's width
                    
                    
                    
                    // positions:
                    verticalAlign : 'baseline', // label's text should be aligned with sibling text, so the label behave like <span> wrapper
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'label')), // apply general cssProps starting with label***
                }),
            ])),
        }),
    ]);
};
export const usesCheckVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesEditableActionControlVariants(),
            
            // layouts:
            sizes(),
        ]),
        variants([
            rule(['.btn', '.togglerBtn'], [
                layout({
                    // layouts:
                    flexWrap       : 'nowrap', // because the input is visually hidden => prevents the label from wrapping to the next row
                    
                    
                    
                    // children:
                    ...children(inputElm, composition([
                        layout({
                            // hides the checkbox while still preserving animations
                            
                            
                            
                            // appearances:
                         // visibility : 'hidden', // invisible but still exists (not recommended, causing uneven transition)
                            opacity    : 0, // invisible but still exists & smooth transition between visible & hidden
                            
                            
                            
                            // sizes:
                            boxSizing  : 'border-box', // the final size is including borders & paddings
                            inlineSize : 0, // kill the width
                            blockSize  : 0, // kill the height
                            
                            
                            
                            // borders:
                            border     : 0, // kill the border
                            
                            
                            
                            // spacings:
                            padding    : 0, // kill the paddings
                        }),
                        variants([
                            isNotLastChild(composition([
                                layout({
                                    marginInlineEnd : 0, // kill the spacing between input & label
                                }),
                            ])),
                        ]),
                    ])),
                    ...children(labelElm, composition([
                        imports([
                            // layouts:
                            usesButtonLayout(),
                        ]),
                        layout({
                            // sizes:
                            flex      : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                            alignSelf : 'stretch',        // follows parent's height
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'btn')), // apply general cssProps starting with btn***
                        }),
                    ])),
                    
                    
                    
                    // overwrites propName = {btn}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'btn')),
                }),
            ]),
            rule('.togglerBtn', [ // todo: fix blinky when mouseUp
                imports([
                    // states:
                    usesActivePassiveAsPressReleaseState(),
                ]),
                layout({
                    ...children(labelElm, composition([
                        layout({
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'togglerBtn')), // apply general cssProps starting with togglerBtn***
                        }),
                    ])),
                    
                    
                    
                    // overwrites propName = {togglerBtn}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'togglerBtn')),
                }),
            ]),
            
            rule('.switch', [
                layout({
                    // children:
                    ...children(inputElm, composition([
                        layout({
                            // sizes:
                            inlineSize   : '2em',   // make the width twice the height
                            
                            
                            
                            // borders:
                            borderRadius : '0.5em', // make circle corners
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'switch')), // apply general cssProps starting with switch***
                        }),
                    ])),
                    
                    
                    
                    // overwrites propName = {switch}propName:
                    ...overwriteProps(cssDecls, usesPrefixedProps(cssProps, 'switch')),
                }),
            ]),
        ]),
    ]);
};
export const usesCheckStates = () => {
    // dependencies:
    
    // states:
    const [checkClear] = usesCheckClearState();
    
    
    
    return composition([
        imports([
            // states:
            usesEditableActionControlStates(),
            checkClear(),
        ]),
    ]);
};
export const usesCheck = () => {
    return composition([
        imports([
            // layouts:
            usesCheckLayout(),
            
            // variants:
            usesCheckVariants(),
            
            // states:
            usesCheckStates(),
        ]),
    ]);
};

export const useCheckSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesCheck(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, checkAnimRefs, , checkPropsManager] = usesCheckAnim();
    const filters = checkPropsManager.filters();
    const transfs = checkPropsManager.transfs();
    
    const defaultFilter = (filter : Cust.Ref) => fallbacks(filter, checkAnimRefs.filterNone);
    const defaultTransf = (transf : Cust.Ref) => fallbacks(transf, checkAnimRefs.transfNone);
    const isRef         = (expr   : Cust.Expr): expr is Cust.Ref => (typeof(expr) === 'string') && expr.startsWith('var(--');
    
    const [, {filterCheckClearIn, filterCheckClearOut, transfCheckClearIn, transfCheckClearOut}] = usesCheckClearState();
    
    
    
    //#region keyframes
    const keyframesCheck         : PropEx.Keyframes = {
        from : {
            filter    : [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => ![filterCheckClearIn, filterCheckClearOut].includes(f)),
                
                filterCheckClearOut,
            ].map(defaultFilter)],
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearOut,
            ].map(defaultTransf)],
        },
        to   : {
            filter    : [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => ![filterCheckClearIn, filterCheckClearOut].includes(f)),
                
                filterCheckClearIn,
            ].map(defaultFilter)],
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearIn,
            ].map(defaultTransf)],
        },
    };
    const keyframesClear         : PropEx.Keyframes = {
        from : keyframesCheck.to,
        to   : keyframesCheck.from,
    };
    
    
    
    const keyframesSwitchCheck   : PropEx.Keyframes = {
        from : keyframesCheck.from,
        '75%': {
            transformOrigin: 'left', // todo: orientation aware transform => left will be top if the element rotated 90deg clockwise
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearIn,
                'scaleX(1.2)', // add a bumpy effect
            ].map((t) => isRef(t) ? defaultTransf(t) : t)],
        },
        to   : keyframesCheck.to,
    };
    const keyframesSwitchClear   : PropEx.Keyframes = {
        from : keyframesSwitchCheck.to,
        '75%': {
            transformOrigin: 'right', // todo: orientation aware transform => right will be bottom if the element rotated 90deg clockwise
            transform : [[ // double array => makes the JSS treat as space separated values
                ...transfs.filter((t) => ![transfCheckClearIn, transfCheckClearOut].includes(t)),
                
                transfCheckClearOut,
                'scaleX(1.2)', // add a bumpy effect
            ].map((t) => isRef(t) ? defaultTransf(t) : t)],
        },
        to   : keyframesSwitchCheck.from,
    };
    //#endregion keyframes
    
    
    
    return {
        // spacings:
        spacing                  : '0.3em',
        
        
        
        //#region indicators
        // forked from Bootstrap 5:
        img                      : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")`,
        
        // forked from Bootstrap 5:
        switchImg                : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")`,
        //#endregion indicators
        
        
        
        //#region animations
        filterCheck              : [['opacity(100%)']],
        filterClear              : [['opacity(0%)'  ]],
        transfCheck              : 'initial',
        transfClear              : 'initial',
        
        '@keyframes check'       : keyframesCheck,
        '@keyframes clear'       : keyframesClear,
        animCheck                : [['150ms', 'ease-out', 'both', keyframesCheck      ]],
        animClear                : [['150ms', 'ease-out', 'both', keyframesClear      ]],
        
        
        
        switchFilterCheck        : [['opacity(100%)'     ]],
        switchFilterClear        : [['opacity(50%)'      ]],
        switchTransfCheck        : [['translateX(0.5em)' ]],
        switchTransfClear        : [['translateX(-0.5em)']],
        
        '@keyframes switchCheck' : keyframesSwitchCheck,
        '@keyframes switchClear' : keyframesSwitchClear,
        switchAnimCheck          : [['200ms', 'ease-out', 'both', keyframesSwitchCheck]],
        switchAnimClear          : [['200ms', 'ease-out', 'both', keyframesSwitchClear]],
        //#endregion animations
    };
}, { prefix: 'chk' });



// react components:

export interface CheckProps
    extends
        EditableActionControlProps<HTMLInputElement>,
        TogglerActiveProps,
        
        // appearances:
        CheckVariant
{
    // values:
    defaultChecked? : boolean
    checked?        : boolean
    
    
    // formats:
    type?           : 'checkbox' | 'radio'
    
    
    // accessibilities:
    label?          : string
    text?           : string
    
    
    // events:
    onChange?       : React.ChangeEventHandler<HTMLInputElement>
    
    
    // children:
    children?       : React.ReactNode
}
export function Check(props: CheckProps) {
    // styles:
    const sheet        = useCheckSheet();
    
    
    
    // variants:
    const checkVariant = useCheckVariant(props);
    
    
    
    // states:
    const inputRef  = useRef<HTMLInputElement|null>(null);
    const [isActive, setActive] = useTogglerActive({
        ...props,
        
        defaultActive : props.defaultActive ?? props.defaultChecked, // forwards `defaultChecked` to `defaultActive`
        active        : props.active        ?? props.checked,        // forwards `checked`        to `active`
    }, /*changeEventTarget :*/inputRef);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        
        // accessibilities:
        label,
        text,
        
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        defaultChecked, // delete, already forwarded to `defaultActive`
        checked,        // delete, already forwarded to `active`
        onChange,       // forwards to `input[type='checkbox']`
        
        
        // values:
        name,
        defaultValue,
        value,
        
        
        // validations:
        required,
        
        
        // formats:
        type = 'checkbox',
    ...restProps}  = props;
    
    
    
    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    }
    
    
    
    // fn props:
    const propEnabled = usePropEnabled(props);
    
    const ariaRole    = props.role            ?? 'checkbox';
    const ariaChecked = props['aria-checked'] ?? ((ariaRole === 'checkbox') ? isActive : undefined);
    
    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'span'}
            
            
            // accessibilities:
            role={ariaRole}
            aria-checked={ariaChecked}
            aria-label={label}
            active={isActive}
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                checkVariant.class,
            ]}
            
            
            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    handleToggleActive();
                    e.preventDefault();
                } // if
            }}
            onKeyDown={(e) => {
                // backwards:
                props.onKeyDown?.(e);
                
                
                
                if (!e.defaultPrevented) e.preventDefault(); // prevents pressing space for scrolling page
            }}
            onKeyUp={(e) => {
                // backwards:
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                } // if
            }}
        >
            <input
                // essentials:
                ref={(elm) => {
                    inputRef.current = elm;
                    
                    
                    // forwards:
                    if (elmRef) {
                        if (typeof(elmRef) === 'function') {
                            elmRef(elm);
                        }
                        else {
                            (elmRef as React.MutableRefObject<HTMLInputElement|null>).current = elm;
                        } // if
                    } // if
                }}
                
                
                // accessibilities:
                aria-hidden={true} // the input just for check indicator & storing value
                tabIndex={-1}      // non focusable
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={true}    // for satisfying React of **controllable readOnly check**
                checked={isActive} // **controllable check**
                
                
                // values:
                {...{
                    name,
                    defaultValue,
                    value,
                }}
                
                
                // validations:
                {...{
                    required,
                }}
                
                
                // formats:
                {...{
                    type,
                }}
                
                
                // events:
                onAnimationEnd={(e) => {
                    // triggers `Check`'s onAnimationEnd event
                    e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                }}
                
                {...{
                    onChange,
                }}
                onClick={(e) => e.stopPropagation()} // prevents firing `change` event triggering parent's `onClick`
            />
            { (text || props.children) &&
                <span
                    // events:
                    // listening input's onAnimationEnd is enough
                    // onAnimationEnd={(e) => {
                    //     // triggers `Check`'s onAnimationEnd event
                    //     e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                    // }}
                >
                    { text }
                    { props.children }
                </span>
            }
        </EditableActionControl>
    );
}
export { Check as default }
