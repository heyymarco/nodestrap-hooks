import {
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
    fallbacks,
    isActive,
    isFocus,
    isFocusVisible,
    
    
    
    //combinators:
    children,
}                           from './cssfn'       // cssfn core



const unset = 'unset';
const none  = 'none';



/**
 * removes browser's default styling on hyperlink (`a`).
 */
export const stripoutLink = () => style({
    ...imports([
        stripoutFocusableElement(),
    ]),
    ...style({
        color          : unset, // reset blue color
        textDecoration : unset, // reset underline
        cursor         : unset, // reset hand pointer
        
        
        
        ...isActive({
            color      : unset, // reset blue color
        }),
    }),
});


/**
 * removes browser's default styling on control (`input`, `textarea`, `button`, etc).
 */
export const stripoutControl = () => style({
    ...imports([
        stripoutFocusableElement(),
    ]),
    ...style({
        appearance      : none,
        
        textRendering   : unset,
        color           : unset,
        letterSpacing   : unset,
        wordSpacing     : unset,
        textTransform   : unset,
        textIndent      : unset,
        textShadow      : unset,
        textAlign       : unset,
        backgroundColor : unset,
        cursor          : unset,
        margin          : unset,
        font            : unset,
        padding         : unset,
        border          : unset,
        borderRadius    : unset,
        boxSizing       : unset,
    }),
});

/**
 * removes browser's default styling on `input[type=**text**]`.  
 * `**text**` = `text`|`search`|`password`|`email`|`tel`|`url`|`number`|`time`|`week`|`date`|`datetime-local`|`month`
 */
export const stripoutTextbox = () => style({
    ...imports([
        stripoutControl(),
    ]),
    ...style({
        '-moz-appearance' : 'textfield',
        
        
        
        ...rule([':valid', ':invalid'], {
            boxShadow     : unset,
        }),
        
        
        
        // children:
        ...children(['::-webkit-calendar-picker-indicator', '::-webkit-inner-spin-button', '::-webkit-search-cancel-button'], {
            appearance    : none,
            display       : none,
        }),
    }),
});

export const rangeTrackElm = ['::-webkit-slider-runnable-track', '::-moz-range-track', '::-ms-track'];
export const rangeThumbElm = ['::-webkit-slider-thumb'         , '::-moz-range-thumb', '::-ms-thumb'];
/**
 * removes browser's default styling on `input[type=range]`.
 */
export const stripoutRange = () => style({
    ...imports([
        stripoutControl(),
    ]),
    ...style({
        // children:
        ...children([rangeTrackElm, rangeThumbElm], {
            ...imports([
                stripoutControl(),
            ]),
        }, { groupSelectors: false }), // any invalid selector does not cause the whole selectors to fail
    }),
});


/**
 * removes browser's default styling on list (`ul>li` & `ol>li`).
 */
export const stripoutList = () => style({
    listStyleType      : none,
    marginBlockStart   : unset,
    marginBlockEnd     : unset,
    marginInlineStart  : unset,
    marginInlineEnd    : unset,
    paddingInlineStart : unset,
    
    
    
    // children:
    ...children('*', {
        display        : unset,
        textAlign      : unset,
    }),
});

/**
 * removes browser's default styling on figure.
 */
export const stripoutFigure = () => style({
    display           : unset,
    marginBlockStart  : unset,
    marginBlockEnd    : unset,
    marginInlineStart : unset,
    marginInlineEnd   : unset,
});

/**
 * removes browser's default styling on focusable element.
 */
export const stripoutFocusableElement = () => style({
    ...isFocus({
        outline       : unset, // reset focus outline
        outlineOffset : unset, // reset focus outline
    }),
    ...isFocusVisible({
        outline       : unset, // reset focus outline
        outlineOffset : unset, // reset focus outline
    }),
});

/**
 * hides browser's default scrollbar.
 */
export const stripoutScrollbar = () => style({
    scrollbarWidth       : none,
    '-ms-overflow-style' : none,
    
    
    
    // children:
    ...children('::-webkit-scrollbar', {
        display          : none,
    }),
});

/**
 * removes browser's default styling on image.
 */
export const stripoutImage = () => style({
    // layouts:
    display: 'block', // fills the entire parent's width
    
    
    
    // sizes:
    // fix the image's abnormal *display=block* sizing:
    // span to maximum width:
    boxSizing      : 'border-box', // the final size is including borders & paddings
    inlineSize     : 'fill-available',
    ...fallbacks({
        inlineSize : '100%',
    }),
});
