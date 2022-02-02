// react:
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Optional,
}                           from './types'       // cssfn's types
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // rules:
    rule,
    
    
    
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
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    stripoutList,
    stripoutScrollbar,
    stripoutImage,
}                           from './stripouts'
import {
    // utilities:
    isTypeOf,
    setRef,
}                           from './utilities'

// nodestrap components:
import {
    // general types:
    Tag,
    Role,
    SemanticTag,
    SemanticRole,
    
    
    
    // hooks:
    useTestSemantic,
    
    
    
    // react components:
    ElementProps,
    Element,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
    usesPadding,
    expandPadding,
}                           from './Basic'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // configs:
    cssProps as ccssProps,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from './Content'
import {
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'
import {
    // utilities:
    Dimension,
    
    
    
    // react components:
    NavscrollItem,
    
    NavscrollProps,
    Navscroll,
}                           from './Navscroll'



// hooks:

// appearances:

export interface CarouselVariant {
    infiniteLoop? : boolean
}
export const useCarouselVariant = (props: CarouselVariant) => {
    return {
        infiniteLoop: props.infiniteLoop ?? false,
    };
};



// styles:
const itemsElm   = '.items';    // `.items` is the slideList
const dummyElm   = '.dummy';
// const itemElm    = ['li', '*'];  // poor specificity // any children inside the slideList are slideItem
const itemElm    = ':nth-child(n)'; // better specificity // any children inside the slideList are slideItem
const mediaElm   = ['figure', 'img', 'svg', 'video', '.media'];
const prevBtnElm = '.prevBtn';
const nextBtnElm = '.nextBtn';
const navElm     = '.nav';

export const usesCarouselItemsLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddingRefs] = usesPadding();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutList(),      // clear browser's default styles
            stripoutScrollbar(), // hides browser's scrollbar
        ]),
        ...style({
            // layouts:
            gridArea       : '1 / 1 / -1 / -1', // fills the entire grid areas, from the first row/column to the last row/column
            display        : 'flex',            // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',             // items are stacked horizontally
            justifyContent : 'start',           // items are placed starting from the left, so the first item is initially visible
            alignItems     : 'stretch',         // items height are follow the tallest one
            flexWrap       : 'nowrap',          // no wrapping, so the sliding works
            
            
            
            // positions:
            position       : 'relative', // (optional) makes calculating slide's offsetLeft/offsetTop faster
            
            
            
            // spacings:
            // cancel-out parent's padding with negative margin:
            marginInline   : `calc(0px - ${paddingRefs.paddingInline})`,
            marginBlock    : `calc(0px - ${paddingRefs.paddingBlock})`,
            
            
            
            // scrolls:
            overflowX      : 'scroll',                  // enable horizontal scrolling
            scrollSnapType : [['inline', 'mandatory']], // enable horizontal scroll snap
            scrollBehavior : 'smooth',                  // smooth scrolling when it's triggered by the navigation or CSSOM scrolling APIs
            '-webkit-overflow-scrolling': 'touch',      // supports for iOS Safari
            
            
            
            // children:
            ...children(itemElm, {
                ...imports([
                    usesCarouselItemLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'items')), // apply general cssProps starting with items***
        }),
    });
};
export const usesCarouselItemLayout = () => {
    return style({
        // layouts:
        display         : 'flex',   // use block flexbox, so it takes the entire parent's width
        flexDirection   : 'row',    // the flex direction to horz, so we can adjust the content's height
        justifyContent  : 'center', // center items horizontally
        alignItems      : 'center', // if the content's height is shorter than the section, place it at the center vertically
        flexWrap        : 'nowrap', // no wrapping
        
        
        
        // sizes:
        flex            : [[0, 0, '100%']], // ungrowable, unshrinkable, initial 100% parent's width
        // (important) force the media follow the <li> width, so it doesn't break the flex width:
        boxSizing       : 'border-box',     // the final size is including borders & paddings
        inlineSize      : '100%',           // fills the entire parent's width
        
        
        
        // scrolls:
        scrollSnapAlign : 'center', // put a magnet at the center
        scrollSnapStop  : 'normal', // scrolls one by one or multiple at once
        
        
        
        // children:
        ...children(mediaElm, {
            ...imports([
                usesCarouselMediaLayout(),
            ]),
        }),
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
    });
};
export const usesCarouselMediaLayout = () => {
    return style({
        ...imports([
            stripoutImage(), // removes browser's default styling on image
        ]),
        ...style({
            // layouts:
            ...rule(':first-child:last-child', { // only one child
                display : 'block', // fills the entire parent's width
            }),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with media***
        }),
    });
};

export const usesNavBtnLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'navBtn')), // apply general cssProps starting with navBtn***
    });
};
export const usesPrevBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'prevBtn',
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'prevBtn')), // apply general cssProps starting with prevBtn***
    });
};
export const usesNextBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'nextBtn',
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'nextBtn')), // apply general cssProps starting with nextBtn***
    });
};

export const usesNavLayout = () => {
    return style({
        // layouts:
        gridArea    : 'nav',
        
        
        
        // sizes:
        justifySelf : 'center', // do not stretch the nav, just place it at the center horizontally
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'nav')), // apply general cssProps starting with nav***
    });
};

export const usesCarouselLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            gridTemplateRows    : [[
                '1fr',
                'min-content',
            ]],
            gridTemplateColumns : [['15%', '1fr', '15%']],
            gridTemplateAreas   : [[
                '"prevBtn main nextBtn"',
                '"prevBtn nav  nextBtn"',
            ]],
            
            // child default sizes:
            justifyItems        : 'stretch', // each section fills the entire area's width
            alignItems          : 'stretch', // each section fills the entire area's height
            
            
            
            // borders:
            overflow            : 'hidden', // clip the children at the rounded corners
            
            
            
            // children:
            ...children(itemsElm, {
                ...imports([
                    usesCarouselItemsLayout(),
                ]),
            }),
            ...children(dummyElm, {
                // appearances:
             // visibility : 'hidden', // causing onScroll doesn't work in Firefox
                opacity    : 0,
                zIndex     : -1,
            }),
            
            ...children([prevBtnElm, nextBtnElm], {
                ...imports([
                    usesNavBtnLayout(),
                ]),
            }),
            ...children(prevBtnElm, {
                ...imports([
                    usesPrevBtnLayout(),
                ]),
            }),
            ...children(nextBtnElm, {
                ...imports([
                    usesNextBtnLayout(),
                ]),
            }),
            
            ...children(navElm, {
                ...imports([
                    usesNavLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    });
};
export const usesCarouselVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};

export const useCarouselSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesCarouselLayout(),
            
            // variants:
            usesCarouselVariants(),
        ]),
    ),
], /*sheetId :*/'v35mas3qt6'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region spacings
        paddingInline       : 0,
        paddingBlock        : 0,
        
        navMarginBlockEnd   : ccssProps.paddingBlock,
        navMarginBlockEndSm : ccssProps.paddingBlockSm,
        navMarginBlockEndLg : ccssProps.paddingBlockLg,
        //#endregion spacings
        
        
        
        //#region borders
        navBtnBorderRadius  : 0,
        //#endregion borders
    };
}, { prefix: 'crsl' });



// react components:

export interface CarouselItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>
{
}
export function CarouselItem<TElement extends HTMLElement = HTMLElement>(props: CarouselItemProps<TElement>) {
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}
            
            
            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}

export type { CarouselItemProps as ItemProps }
export { CarouselItem as Item }



export interface CarouselProps<TElement extends HTMLElement = HTMLElement>
    extends
        ContentProps<TElement>,
        
        // appearances:
        CarouselVariant
{
    // essentials:
    scrollRef?           : React.Ref<HTMLElement> // setter ref
    
    
    // semantics:
    itemsTag?            : Tag
    itemTag?             : Tag
    
    itemsRole?           : Role
    itemRole?            : Role
    
    itemsSemanticTag?    : SemanticTag
    itemSemanticTag?     : SemanticTag
    
    itemsSemanticRole?   : SemanticRole
    itemSemanticRole?    : SemanticRole
    
    
    // classes:
    itemsMainClass?      : Optional<string>
    itemsClasses?        : Optional<string>[]
    itemsVariantClasses? : Optional<string>[]
    itemsStateClasses?   : Optional<string>[]
    
    itemMainClass?       : Optional<string>
    itemClasses?         : Optional<string>[]
    itemVariantClasses?  : Optional<string>[]
    itemStateClasses?    : Optional<string>[]
    
    
    // children:
    children?            : React.ReactNode
    prevBtn?             : React.ReactChild | boolean | null
    nextBtn?             : React.ReactChild | boolean | null
    nav?                 : React.ReactChild | boolean | null
}
export function Carousel<TElement extends HTMLElement = HTMLElement>(props: CarouselProps<TElement>) {
    // styles:
    const sheet           = useCarouselSheet();
    
    
    
    // variants:
    const carouselVariant = useCarouselVariant(props);
    const infiniteLoop    = carouselVariant.infiniteLoop;
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        scrollRef,
        
        
        // semantics:
        itemsTag,
        itemTag,
        
        itemsRole,
        itemRole,
        
        itemsSemanticTag,
        itemSemanticTag,
        
        itemsSemanticRole,
        itemSemanticRole,
        
        
        // classes:
        itemsMainClass,
        itemsClasses,
        itemsVariantClasses,
        itemsStateClasses,
        
        itemMainClass,
        itemClasses,
        itemVariantClasses,
        itemStateClasses,
        
        
        // children:
        children,
        prevBtn,
        nextBtn,
        nav,
    ...restProps} = props;
    
    
    
    // fn props:
    const itemsTotal          = React.Children.count(children);
    
    const listTag             = ['ul', 'ol'] as Array<Tag>;
    const listRole            = 'list';
    const itemsSemanticTagFn  = itemsSemanticTag  ?? listTag;
    const itemsSemanticRoleFn = itemsSemanticRole ?? listRole;
    const [, , isList, isSemanticList] = useTestSemantic({ tag: itemsTag, role: itemsRole, semanticTag: itemsSemanticTagFn, semanticRole: itemsSemanticRoleFn }, { semanticTag: listTag, semanticRole: listRole });
    
    const itemSemanticTagFn   = itemSemanticTag  ?? (isSemanticList ? 'li'       : [null]);
    const itemSemanticRoleFn  = itemSemanticRole ?? (isList         ? 'listitem' : [null]);
    
    
    
    // dom effects:
    const listRef      = useRef<HTMLElement|null>(null);
    const listDummyRef = useRef<HTMLElement|null>(null);
    const dummyDiff    = useRef<number>(0);
    const setDummyDiff = (diff: number) => {
        if (!itemsTotal) return;
        
        dummyDiff.current = (((dummyDiff.current - diff) % itemsTotal) + itemsTotal) % itemsTotal;
    };
    
    // sync dummyElm scrolling position to itemsElm scrolling position, once at startup:
    useEffect(() => {
        if (!infiniteLoop) return; // only for infiniteLoop mode
        
        const dummyElm = listDummyRef.current;
        if (!dummyElm) return; // dummyElm must be exist to sync
        
        const itemsElm = listRef.current;
        if (!itemsElm) return; // itemsElm must be exist for syncing
        
        
        
        // fn props:
        const itemsCurrent = itemsElm.scrollLeft;
        const ratio        = (dummyElm.scrollWidth - dummyElm.clientWidth) / (itemsElm.scrollWidth - itemsElm.clientWidth);
        const dummyCurrent = itemsCurrent * ratio;
        
        
        
        // setups:
        dummyElm.scrollTo({
            left     : Math.round(
                Math.min(Math.max(
                    dummyCurrent
                , 0), (dummyElm.scrollWidth - dummyElm.clientWidth))
            ),
            
            behavior : ('instant' as any) // no scrolling animation during sync
        });
    }, [infiniteLoop]); // (re)run the setups on every time the infiniteLoop mode changes
    
    // sync itemsElm scrolling position to dummyElm scrolling position, every `scrollBy()`/`scrollTo()` called:
    useEffect(() => {
        if (!infiniteLoop) return; // only for infiniteLoop mode
        
        const dummyElm = listDummyRef.current;
        if (!dummyElm) return; // dummyElm must be exist for syncing
        
        
        
        // functions:
        const calculateScrollItems = (dummyElm: HTMLElement, itemsElm: HTMLElement, optionsOrX: ScrollToOptions|number|undefined, relative: boolean) => {
            const dummyCurrent  = relative ? dummyElm.scrollLeft : 0;
            const dummyLeft     =  (typeof(optionsOrX) !== 'number') ? (optionsOrX?.left ?? 0) : optionsOrX;
            const dummyBehavior = ((typeof(optionsOrX) !== 'number') && optionsOrX?.behavior) || 'smooth';
            
            const ratio         = (itemsElm.scrollWidth - itemsElm.clientWidth) / (dummyElm.scrollWidth - dummyElm.clientWidth);
            const itemsCurrent  = dummyCurrent * ratio;
            const itemsLeft     = dummyLeft    * ratio;
            const itemsDiff     = (dummyDiff.current * itemsElm.clientWidth); // converts logical diff to physical diff
            const itemsLeftLoop = itemsCurrent + itemsLeft + itemsDiff;       // current scroll + scroll by + diff
            const itemsLeftAbs  = itemsLeftLoop % itemsElm.scrollWidth;       // wrap overflowed left
            
            return {
                left     : Math.round(
                    Math.min(Math.max(
                        itemsLeftAbs
                    , 0), (itemsElm.scrollWidth - itemsElm.clientWidth))
                    -
                    (relative ? itemsElm.scrollLeft : 0)
                ),
                
                behavior : dummyBehavior,
            };
        };
        
        
        
        // setups:
        
        const oriScrollBy = dummyElm.scrollBy;
        dummyElm.scrollBy = (function(this: HTMLElement, optionsOrX?: ScrollToOptions|number, y?: number) {
            const itemsElm = listRef.current;
            if (itemsElm) { // itemsElm must be exist to sync
                itemsElm.scrollBy(calculateScrollItems(this, itemsElm, optionsOrX, true));
            } // if
            
            
            
            // call the original:
            if (typeof(optionsOrX) !== 'number') {
                (oriScrollBy as any).call(this, optionsOrX);
            }
            else {
                (oriScrollBy as any).call(this, optionsOrX, y);
            } // if
        } as any);
        
        const oriScrollTo = dummyElm.scrollTo;
        dummyElm.scrollTo = (function(this: HTMLElement, optionsOrX?: ScrollToOptions|number, y?: number) {
            const itemsElm = listRef.current;
            if (itemsElm) { // itemsElm must be exist to sync
                itemsElm.scrollTo(calculateScrollItems(this, itemsElm, optionsOrX, false));
            } // if
            
            
            
            // call the original:
            if (typeof(optionsOrX) !== 'number') {
                (oriScrollTo as any).call(this, optionsOrX);
            }
            else {
                (oriScrollTo as any).call(this, optionsOrX, y);
            } // if
        } as any);
        
        
        
        // cleanups:
        return () => {
            // restore the hacked to original:
            dummyElm.scrollBy = oriScrollBy;
            dummyElm.scrollTo = oriScrollTo;
        };
    }, [infiniteLoop]); // (re)run the setups & cleanups on every time the infiniteLoop mode changes
    
    
    
    // functions:
    const normalizeScrollItems = (itemsElm: HTMLElement) => {
        if (!itemsTotal) return; // empty items => nothing to do
        
        const diff = dummyDiff.current;
        if (!diff) return; // no difference => nothing to do
        
        
        
        // remember the current scrollPos before modifying:
        const scrollPos = itemsElm.scrollLeft;
        
        
        
        // decide which side to be moved:
        const modifLeft = diff <= (itemsTotal / 2);
        if (modifLeft) { // modify the left side
            Array.from(itemsElm.childNodes).slice(0, diff) // take nth elements from the left
            .forEach((item) => itemsElm.append(item));     // insert the items at the end
        }
        else { // modify the right side
            Array.from(itemsElm.childNodes).slice(-(itemsTotal - diff))   // take nth elements from the right
            .reverse()                                     // inserting at the beginning causes the inserted items to be reversed, so we're re-reversing them to keep the order
            .forEach((item) => itemsElm.insertBefore(item, itemsElm.firstElementChild)); // insert the items at the beginning
        } // if
        
        
        
        // set the scrollPos to the correct image:
        const style = getComputedStyle(itemsElm);
        const step  = itemsElm.clientWidth - (Number.parseInt(style.paddingLeft) || 0) - (Number.parseInt(style.paddingRight ) || 0);
        const move  = modifLeft ? (itemsTotal - diff) : (-diff);
        itemsElm.scrollTo({
            left     : scrollPos + (step * move),
            behavior : ('instant' as any) // no scrolling animation during sync
        });
        
        
        
        // reset the diff of itemsElm & dummyElm:
        dummyDiff.current = 0;
    };
    
    const scrollBy = (itemsElm: HTMLElement, nextSlide: boolean) => {
        const parent = itemsElm;
        
        
        
        // calculate the limit of the allowed scrolling distances:
        const [minLeft, maxLeft, minTop, maxTop] = [
            -parent.scrollLeft,
            (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
            
            -parent.scrollTop,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        
        // calculate the scrolling distance:
        const style = getComputedStyle(parent);
        const [scrollLeft, scrollRight] = [
            Math.min(Math.max((itemsElm.clientWidth  - (Number.parseInt(style.paddingLeft) || 0)  - (Number.parseInt(style.paddingRight ) || 0)) * (nextSlide ? 1 : -1), minLeft), maxLeft),
            Math.min(Math.max((itemsElm.clientHeight - (Number.parseInt(style.paddingTop ) || 0)  - (Number.parseInt(style.paddingBottom) || 0)) * (nextSlide ? 1 : -1), minTop ), maxTop ),
        ];
        
        
        
        parent.scrollBy({
            left     : scrollLeft,
            top      : scrollRight,
            behavior : 'smooth',
        });
    };
    const scrollTo = (targetSlide: HTMLElement|null) => {
        if (!targetSlide) return;
        const parent = targetSlide.parentElement! as HTMLElement;
        
        
        
        // calculate the limit of the allowed scrolling distances:
        const [minLeft, maxLeft, minTop, maxTop] = [
            -parent.scrollLeft,
            (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
            
            -parent.scrollTop,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        
        // calculate the scrolling distance:
        const style = getComputedStyle(parent);
        const dimension = Dimension.from(targetSlide);
        const [scrollLeft, scrollRight] = [
            Math.min(Math.max(dimension.offsetLeft - (Number.parseInt(style.paddingLeft) || 0), minLeft), maxLeft),
            Math.min(Math.max(dimension.offsetTop  - (Number.parseInt(style.paddingTop ) || 0), minTop ), maxTop ),
        ];
        
        
        
        parent.scrollBy({
            left     : scrollLeft,
            top      : scrollRight,
            behavior : 'smooth',
        });
    };
    
    const isBeginOfScroll = (itemsElm: HTMLElement) => (
        (itemsElm.scrollLeft <= 0.5)
        &&
        (itemsElm.scrollTop  <= 0.5)
    );
    const isEndOfScroll   = (itemsElm: HTMLElement) => (
        (((itemsElm.scrollWidth  - itemsElm.clientWidth ) - itemsElm.scrollLeft) <= 0.5)
        &&
        (((itemsElm.scrollHeight - itemsElm.clientHeight) - itemsElm.scrollTop ) <= 0.5)
    );
    
    const handlePrev = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!e.defaultPrevented) {
            const dummyElm = listDummyRef.current;
            const itemsElm = listRef.current;
            
            
            
            if (infiniteLoop && dummyElm) {
                let itemsShifted = false;
                if (itemsElm && isBeginOfScroll(itemsElm)) {
                    // move the last item to the first:
                    const item = itemsElm.lastElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        
                        
                        
                        itemsElm.insertBefore(item, itemsElm.firstElementChild); // insert the items at the beginning
                        itemsShifted = true;
                        
                        
                        
                        // set the current scrollPos to the next item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos + itemsElm.clientWidth), behavior: ('instant' as any) }); // no scrolling animation during sync
                    } // if
                    
                    
                    
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(-1);
                } // if
                
                
                
                const doScroll = () => {
                    if (isBeginOfScroll(dummyElm)) {
                        // scroll to last:
                        scrollTo(dummyElm.lastElementChild as (HTMLElement|null));
                    }
                    else {
                        // scroll to previous:
                        scrollBy(dummyElm, false);
                    } // if
                };
                if (itemsShifted) {
                    setTimeout(doScroll, 0); // wait until scrolling shift completed and then doScroll()
                }
                else {
                    doScroll();
                } // if
                
                
                
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            }
            else if (itemsElm) {
                if (isBeginOfScroll(itemsElm)) {
                    // scroll to last:
                    scrollTo(itemsElm.lastElementChild as (HTMLElement|null));
                }
                else {
                    // scroll to previous:
                    scrollBy(itemsElm, false);
                } // if
                
                
                
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            } // if
        } // if
    };
    const handleNext = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!e.defaultPrevented) {
            const dummyElm = listDummyRef.current;
            const itemsElm = listRef.current;
            
            
            
            if (infiniteLoop && dummyElm) {
                let itemsShifted = false;
                if (itemsElm && isEndOfScroll(itemsElm)) {
                    // move the first item to the last:
                    const item = itemsElm.firstElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        
                        
                        
                        itemsElm.append(item); // insert the items at the end
                        itemsShifted = true;
                        
                        
                        
                        // set the current scrollPos to the prev item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos - itemsElm.clientWidth), behavior: ('instant' as any) }); // no scrolling animation during sync
                    } // if
                    
                    
                    
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(1);
                } // if
                
                
                
                const doScroll = () => {
                    if (isEndOfScroll(dummyElm)) {
                        // scroll to first:
                        scrollTo(dummyElm.firstElementChild as (HTMLElement|null));
                    }
                    else {
                        // scroll to next:
                        scrollBy(dummyElm, true);
                    } // if
                };
                if (itemsShifted) {
                    setTimeout(doScroll, 0); // wait until scrolling shift completed and then doScroll()
                }
                else {
                    doScroll();
                } // if
                
                
                
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            }
            else if (itemsElm) {
                if (isEndOfScroll(itemsElm)) {
                    // scroll to first:
                    scrollTo(itemsElm.firstElementChild as (HTMLElement|null));
                }
                else {
                    // scroll to next:
                    scrollBy(itemsElm, true);
                } // if
                
                
                
                // all necessary task has been performed, no further action needed:
                e.preventDefault();
            } // if
        } // if
    };
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restProps}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { children && <>
                <Element<TElement>
                    // essentials:
                    elmRef={(elm) => {
                        setRef(elmRef, elm);
                        if (!infiniteLoop) setRef(scrollRef, elm);
                        setRef(listRef, elm);
                    }}
                    
                    
                    // semantics:
                    tag ={itemsTag }
                    role={itemsRole}
                    semanticTag ={itemsSemanticTagFn }
                    semanticRole={itemsSemanticRoleFn}
                    
                    
                    // classes:
                    mainClass={itemsMainClass}
                    classes={[...(itemsClasses ?? []),
                        'items',
                    ]}
                    variantClasses={itemsVariantClasses}
                    stateClasses={itemsStateClasses}
                >
                {React.Children.map(children, (child, index) => (
                    isTypeOf(child, CarouselItem)
                    ?
                    <child.type
                        // other props:
                        {...child.props}
                        
                        
                        // essentials:
                        key={child.key ?? index}
                        
                        
                        // semantics:
                        tag ={child.props.tag  ?? itemTag }
                        role={child.props.role ?? itemRole}
                        semanticTag ={child.props.semanticTag  ?? itemSemanticTagFn }
                        semanticRole={child.props.semanticRole ?? itemSemanticRoleFn}
                        
                        
                        // classes:
                        mainClass={itemMainClass}
                        classes={itemClasses}
                        variantClasses={itemVariantClasses}
                        stateClasses={itemStateClasses}
                    />
                    :
                    <CarouselItem
                        // essentials:
                        key={index}
                        
                        
                        // semantics:
                        tag ={itemTag }
                        role={itemRole}
                        semanticTag ={itemSemanticTagFn }
                        semanticRole={itemSemanticRoleFn}
                    >
                        { child }
                    </CarouselItem>
                ))}
                </Element>
                
                { infiniteLoop && <Element<TElement>
                    // essentials:
                    elmRef={(elm) => {
                        setRef(scrollRef, elm);
                        setRef(listDummyRef, elm);
                    }}
                    
                    
                    // semantics:
                    aria-hidden={true} // just a dummy element, no meaningful content here
                    
                    
                    // classes:
                    mainClass='items dummy'
                    
                    
                    // events:
                    onScroll={(e) => {
                        const diff = dummyDiff.current;
                        if (!diff) return; // no difference => nothing to do
                        
                        
                        
                        const dummyElm = e.target as HTMLElement;
                        const itemsElm = listRef.current;
                        if (!itemsElm) return; // itemsElm must be exist to normalize
                        
                        
                        
                        const style = getComputedStyle(dummyElm);
                        const step  = dummyElm.clientWidth - (Number.parseInt(style.paddingLeft) || 0) - (Number.parseInt(style.paddingRight ) || 0);
                        if (dummyElm.scrollLeft % step) return; // not an exact step => scrolling is still in progress => abort
                        
                        
                        
                        normalizeScrollItems(itemsElm);
                    }}
                >
                {React.Children.map(children, (child, index) => (
                    <div
                        // essentials:
                        key={index}
                    >
                    </div>
                ))}
                </Element> }
            </> }
            
            {
                //#region has class prevBtn
                isTypeOf(prevBtn, Element)
                &&
                prevBtn.props.classes?.includes('prevBtn')
                //#endregion has class prevBtn
                ?
                <prevBtn.type
                    // other props:
                    {...prevBtn.props}
                    
                    
                    // events:
                    onClick={(e) => {
                        prevBtn.props.onClick?.(e);
                        
                        
                        
                        handlePrev(e);
                    }}
                />
                :
                <NavButton
                    // classes:
                    classes={[
                        'prevBtn',
                    ]}
                    
                    
                    // accessibilities:
                    label='Previous'
                    
                    
                    // appearances:
                    icon='prev'
                    
                    
                    // events:
                    onClick={handlePrev}
                >
                    { prevBtn }
                </NavButton>
            }
            
            {
                //#region has class nextBtn
                isTypeOf(nextBtn, Element)
                &&
                nextBtn.props.classes?.includes('nextBtn')
                //#endregion has class nextBtn
                ?
                <nextBtn.type
                    // other props:
                    {...nextBtn.props}
                    
                    
                    // events:
                    onClick={(e) => {
                        nextBtn.props.onClick?.(e);
                        
                        
                        
                        handleNext(e);
                    }}
                />
                :
                <NavButton
                    // classes:
                    classes={[
                        'nextBtn',
                    ]}
                    
                    
                    // accessibilities:
                    label='Next'
                    
                    
                    // appearances:
                    icon='next'
                    
                    
                    // events:
                    onClick={handleNext}
                >
                    { nextBtn }
                </NavButton>
            }
            
            {
                nav
                ?
                (
                    isTypeOf(nav, Element)
                    ?
                    <nav.type
                        // other props:
                        {...nav.props}
                        
                        
                        // essentials:
                        key={nav.key}
                        
                        
                        // classes:
                        classes={[...(nav.props.classes ?? []),
                            'nav', // inject nav class
                        ]}
                        
                        
                        {...(isTypeOf(nav, Navscroll) ? ({
                            // scrolls:
                            targetRef     : (nav.props as NavscrollProps).targetRef ?? (infiniteLoop ? listDummyRef : listRef),
                            interpolation : (nav.props as NavscrollProps).interpolation ?? true,
                        } as NavscrollProps) : {})}
                    />
                    :
                    nav
                )
                :
                <Navscroll
                    // variants:
                    theme={props.theme}
                    size={props.size}
                    listStyle='bullet'
                    orientation='inline'
                    
                    
                    // behaviors:
                    actionCtrl={true}
                    
                    
                    // classes:
                    classes={[
                        'nav', // inject nav class
                    ]}
                    
                    
                    // scrolls:
                    targetRef={(infiniteLoop ? listDummyRef : listRef)}
                    interpolation={true}
                >
                    {React.Children.map(children, (child, index) => (
                        <NavscrollItem
                            // essentials:
                            key={index}
                            
                            
                            // semantics:
                            tag='button'
                            
                            
                            // accessibilities:
                            {...(React.isValidElement<React.HTMLAttributes<HTMLElement>>(child) ? ({
                                title : child.props.title,
                            } as React.HTMLAttributes<HTMLElement>) : {})}
                        />
                    ))}
                </Navscroll>
            }
        </Content>
    );
}
export { Carousel as default }



interface NavButtonProps
    extends
        ButtonIconProps
{
}
function NavButton(props: NavButtonProps) {
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...props}
            
            
            // variants:
            size={props.size ?? 'lg'}
            gradient={props.gradient ?? true}
            btnStyle={props.btnStyle ?? 'ghost'}
        />
    );
}
