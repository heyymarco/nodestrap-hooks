import {
    // compositions:
    composition,
    imports,
    
    
    
    // layouts:
    layout,
    children,
    
    
    
    // rules:
    variants,
    rule,
    isActive,
    isFocus,
    isFocusVisible,
}                           from './cssfn'       // cssfn core



const unset = 'unset';
const none  = 'none';



/**
 * removes browser's default styling on hyperlink (`a`).
 */
export const stripoutLink = () => composition([
    imports([
        stripoutFocusableElement(),
    ]),
    layout({
        color                 : unset, // reset blue color
        textDecoration        : unset, // reset underline
        cursor                : unset, // reset hand pointer
    }),
    variants([
        isActive([
            layout({
                color         : unset, // reset blue color
            }),
        ]),
    ]),
]);


/**
 * removes browser's default styling on control (`input`, `textarea`, `button`, etc).
 */
export const stripoutControl = () => composition([
    imports([
        stripoutFocusableElement(),
    ]),
    layout({
        appearance            : none,
        
        textRendering         : unset,
        color                 : unset,
        letterSpacing         : unset,
        wordSpacing           : unset,
        textTransform         : unset,
        textIndent            : unset,
        textShadow            : unset,
        textAlign             : unset,
        backgroundColor       : unset,
        cursor                : unset,
        margin                : unset,
        font                  : unset,
        padding               : unset,
        border                : unset,
        borderRadius          : unset,
        boxSizing             : unset,
    }),
]);

/**
 * removes browser's default styling on `input[type=**text**]`.  
 * `**text**` = `text`|`search`|`password`|`email`|`tel`|`url`|`number`|`time`|`week`|`date`|`datetime-local`|`month`
 */
export const stripoutTextbox = () => composition([
    imports([
        stripoutControl(),
    ]),
    layout({
        '-moz-appearance'  : 'textfield',
        
        
        
        // children:
        ...children(['::-webkit-calendar-picker-indicator', '::-webkit-inner-spin-button', '::-webkit-search-cancel-button'], [
            layout({
                appearance : none,
                display    : none,
            }),
        ]),
    }),
    variants([
        rule([':valid', ':invalid'], [
            layout({
                boxShadow  : unset,
            }),
        ]),
    ]),
]);

export const rangeTrackElm = ['::-webkit-slider-runnable-track', '::-moz-range-track', '::-ms-track'];
export const rangeThumbElm = ['::-webkit-slider-thumb'         , '::-moz-range-thumb', '::-ms-thumb'];
/**
 * removes browser's default styling on `input[type=range]`.
 */
export const stripoutRange = () => composition([
    imports([
        stripoutControl(),
    ]),
    layout({
        // children:
        ...children([rangeTrackElm, rangeThumbElm], [
            imports([
                stripoutControl(),
            ]),
        ], { groupSelectors: false }), // any invalid selector does not cause the whole selectors to fail
    }),
]);


/**
 * removes browser's default styling on list (`ul>li` & `ol>li`).
 */
export const stripoutList = () => composition([
    layout({
        listStyleType      : none,
        marginBlockStart   : unset,
        marginBlockEnd     : unset,
        marginInlineStart  : unset,
        marginInlineEnd    : unset,
        paddingInlineStart : unset,
        
        
        
        // children:
        ...children('*', [
            layout({
                display    : unset,
                textAlign  : unset,
            }),
        ]),
    }),
]);

/**
 * removes browser's default styling on figure.
 */
export const stripoutFigure = () => composition([
    layout({
        display           : unset,
        marginBlockStart  : unset,
        marginBlockEnd    : unset,
        marginInlineStart : unset,
        marginInlineEnd   : unset,
    }),
]);

/**
 * removes browser's default styling on focusable element.
 */
export const stripoutFocusableElement = () => composition([
    variants([
        isFocus([
            layout({
                outline       : unset, // reset focus outline
                outlineOffset : unset, // reset focus outline
            }),
        ]),
        isFocusVisible([
            layout({
                outline       : unset, // reset focus outline
                outlineOffset : unset, // reset focus outline
            }),
        ]),
    ]),
]);

/**
 * hides browser's default scrollbar.
 */
export const stripoutScrollbar = () => composition([
    layout({
        scrollbarWidth       : none,
        '-ms-overflow-style' : none,
        
        
        
        // children:
        ...children('::-webkit-scrollbar', [
            layout({
                display      : none,
            }),
        ]),
    }),
]);

/**
 * removes browser's default styling on image.
 */
export const stripoutImage = () => composition([
    layout({
        // layouts:
        display: 'block', // fills the entire parent's width
        
        
        
        // sizes:
        // fix the image's abnormal *display=block* sizing:
        // span to maximum width:
        boxSizing      : 'border-box', // the final size is including borders & paddings
        inlineSize     : 'fill-available',
        fallbacks      : {
            inlineSize : '100%',
        },
    }),
]);
