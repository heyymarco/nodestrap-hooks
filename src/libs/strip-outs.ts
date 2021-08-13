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
}                           from './cssfn'      // cssfn core



const unset = 'unset';
const none  = 'none';



/**
 * removes browser's default styling on hyperlink (`a`).
 */
export const stripOutLink = () => composition([
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
        isFocus([
            layout({
                outline       : unset, // reset focus outline
                outlineOffset : unset, // reset focus outline
            }),
        ]),
    ]),
]);


/**
 * removes browser's default styling on control (`input`, `textarea`, `button`, etc).
 */
export const stripOutControl = () => composition([
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
        boxSizing             : unset,
    }),
    variants([
        isFocus([
            layout({
                outline       : unset, // reset focus outline
                outlineOffset : unset, // reset focus outline
            }),
        ]),
    ]),
]);

/**
 * removes browser's default styling on `input[type=**text**]`.  
 * `**text**` = `text`|`search`|`password`|`email`|`tel`|`url`|`number`|`time`|`week`|`date`|`datetime-local`|`month`
 */
export const stripOutTextbox = () => composition([
    imports([
        stripOutControl(),
    ]),
    layout({
        '-moz-appearance'  : 'textfield',



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


/**
 * removes browser's default styling on list (`ul>li` & `ol>li`).
 */
export const stripOutList = () => composition([
    layout({
        listStyleType      : none,
        marginBlockStart   : unset,
        marginBlockEnd     : unset,
        marginInlineStart  : unset,
        marginInlineEnd    : unset,
        paddingInlineStart : unset,



        ...children('li', [
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
export const stripOutFigure = () => composition([
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
export const stripOutFocusableElement = () => composition([
    variants([
        isFocus([
            layout({
                outline: unset,
            }),
        ]),
    ]),
]);

/**
 * hides browser's default scrollbar.
 */
export const stripOutScrollbar = () => composition([
    layout({
        scrollbarWidth       : none,
        '-ms-overflow-style' : none,



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
export const stripOutImage = () => composition([
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
