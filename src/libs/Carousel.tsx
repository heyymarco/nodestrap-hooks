// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
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
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    ElementProps,
    Element,
    
    
    
    // utilities:
    isTypeOf,
    setElmRef,
}                           from './react-cssfn' // cssfn for react
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
import {
    stripoutList,
    stripoutScrollbar,
    stripoutImage,
}                           from './stripouts'



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
const mediaElm   = ['figure', 'img', 'svg', 'video'];
const prevBtnElm = '.prevBtn';
const nextBtnElm = '.nextBtn';
const navElm     = '.nav';

export const usesCarouselItemsLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddingRefs] = usesPadding();
    
    
    
    return composition([
        imports([
            // resets:
            stripoutList(),      // clear browser's default styles
            stripoutScrollbar(), // hides browser's scrollbar
        ]),
        layout({
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
            ...children(itemElm, composition([
                imports([
                    usesCarouselItemLayout(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'items')), // apply general cssProps starting with items***
        }),
    ]);
};
export const usesCarouselItemLayout = () => {
    return composition([
        layout({
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
            ...children(mediaElm, composition([
                imports([
                    usesCarouselMediaLayout(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesCarouselMediaLayout = () => {
    return composition([
        imports([
            stripoutImage(), // removes browser's default styling on image
        ]),
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'media')), // apply general cssProps starting with media***
        }),
        variants([
            rule(':first-child:last-child', [ // only one child
                layout({
                    // layouts:
                    display : 'block', // fills the entire parent's width
                }),
            ]),
        ]),
    ]);
};

export const usesNavBtnLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'navBtn')), // apply general cssProps starting with navBtn***
        }),
    ]);
};
export const usesPrevBtnLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea : 'prevBtn',
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'prevBtn')), // apply general cssProps starting with prevBtn***
        }),
    ]);
};
export const usesNextBtnLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea : 'nextBtn',
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'nextBtn')), // apply general cssProps starting with nextBtn***
        }),
    ]);
};

export const usesNavLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea    : 'nav',
            
            
            
            // sizes:
            justifySelf : 'center', // do not stretch the nav, just place it at the center horizontally
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'nav')), // apply general cssProps starting with nav***
        }),
    ]);
};

export const usesCarouselLayout = () => {
    return composition([
        imports([
            // layouts:
            usesContentLayout(),
        ]),
        layout({
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
            ...children(itemsElm, composition([
                imports([
                    usesCarouselItemsLayout(),
                ]),
            ])),
            ...children(dummyElm, composition([
                layout({
                    // appearances:
                    visibility : 'hidden',
                    zIndex     : -1,
                }),
            ])),
            
            ...children([prevBtnElm, nextBtnElm], composition([
                imports([
                    usesNavBtnLayout(),
                ]),
            ])),
            ...children(prevBtnElm, composition([
                imports([
                    usesPrevBtnLayout(),
                ]),
            ])),
            ...children(nextBtnElm, composition([
                imports([
                    usesNextBtnLayout(),
                ]),
            ])),
            
            ...children(navElm, composition([
                imports([
                    usesNavLayout(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
export const usesCarouselVariants = () => {
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
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesCarousel = () => {
    return composition([
        imports([
            // layouts:
            usesCarouselLayout(),
            
            // variants:
            usesCarouselVariants(),
        ]),
    ]);
};

export const useCarouselSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesCarousel(),
        ]),
    ]),
]);



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
            
            
            // essentials:
            tag={props.tag ?? 'div'}
            
            
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
    itemsTag? : keyof JSX.IntrinsicElements
    itemTag?  : keyof JSX.IntrinsicElements
    
    
    // children:
    children? : React.ReactNode
    prevBtn?  : React.ReactChild | boolean | null
    nextBtn?  : React.ReactChild | boolean | null
    nav?      : React.ReactChild | boolean | null
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
        itemsTag,
        itemTag,
        
        
        // children:
        children,
        prevBtn,
        nextBtn,
        nav,
    ...restProps} = props;
    
    
    
    // fn props:
    const itemsTotal = (children && (Array.isArray(children) ? children.length : 1)) || 0;
    const itemsTagFn = itemsTag ?? 'ul';
    const itemTagFn  = itemTag  ?? ['ul', 'ol'].includes(itemsTagFn) ? 'li' : 'div';
    
    
    
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
        if (!infiniteLoop) return;
        
        const dummyElm = listDummyRef.current;
        if (!dummyElm) return; // dummyElm must be exist to sync
        
        const itemsElm = listRef.current;
        if (!itemsElm) return; // itemsElm must be exist for syncing
        
        
        
        dummyElm.scrollTo({ left: itemsElm.scrollLeft, top: itemsElm.scrollTop, behavior: ('instant' as any) }); // no scrolling animation during sync
    }, [infiniteLoop]);
    
    // sync itemsElm scrolling position to dummyElm scrolling position, every `scrollBy()`/`scrollTo()` called:
    useEffect(() => {
        if (!infiniteLoop) return;
        
        const dummyElm = listDummyRef.current;
        if (!dummyElm) return; // dummyElm must be exist for syncing
        
        
        
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
    }, [infiniteLoop, dummyDiff, itemsTotal]);
    
    
    
    // functions:
    const normalizeScrollItems = (itemsElm: HTMLElement) => {
        if (!itemsTotal) return; // empty items => nothing to do
        
        const diff = dummyDiff.current;
        if (!diff) return; // no difference => nothing to do
        
        
        
        // remember the current scrollPos before modifying:
        const scrollPos = itemsElm.scrollLeft;
        
        
        
        // decide which side to be moved:
        if (diff <= itemsTotal) { // modify the left side
            Array.from(itemsElm.childNodes).slice(0, diff) // take nth elements from the left
            .forEach((item) => itemsElm.append(item));     // insert the items at the end
        }
        else { // modify the right side
            Array.from(itemsElm.childNodes).slice(-diff)   // take nth elements from the right
            .reverse()                                     // inserting at the beginning causes the inserted items to be reversed, so we're re-reversing them to keep the order
            .forEach((item) => itemsElm.insertBefore(item, itemsElm.firstElementChild)); // insert the items at the beginning
        } // if
        
        
        
        // set the scrollPos to the correct image:
        const style = getComputedStyle(itemsElm);
        const step  = itemsElm.clientWidth - (Number.parseInt(style.paddingLeft) || 0) - (Number.parseInt(style.paddingRight ) || 0);
        itemsElm.scrollTo({ left: scrollPos - (step * diff), behavior: ('instant' as any) }); // no scrolling animation during sync
        
        
        
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
            
            
            
            if (carouselVariant.infiniteLoop && dummyElm) {
                if (itemsElm && isBeginOfScroll(itemsElm)) {
                    // move the last item to the first:
                    const item = itemsElm.lastElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        
                        
                        
                        itemsElm.insertBefore(item, itemsElm.firstElementChild); // insert the items at the beginning
                        
                        
                        
                        // set the current scrollPos to the next item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos + itemsElm.clientWidth), behavior: ('instant' as any) }); // no scrolling animation during sync
                    } // if
                    
                    
                    
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(-1);
                } // if
                
                
                
                if (isBeginOfScroll(dummyElm)) {
                    // scroll to last:
                    scrollTo(dummyElm.lastElementChild as (HTMLElement|null));
                }
                else {
                    // scroll to previous:
                    scrollBy(dummyElm, false);
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
            
            
            
            if (carouselVariant.infiniteLoop && dummyElm) {
                if (itemsElm && isEndOfScroll(itemsElm)) {
                    // move the first item to the last:
                    const item = itemsElm.firstElementChild;
                    if (item) {
                        // remember the current scrollPos before modifying:
                        const scrollPos = itemsElm.scrollLeft;
                        
                        
                        
                        itemsElm.append(item); // insert the items at the end
                        
                        
                        
                        // set the current scrollPos to the prev item, so the scrolling effect can occur:
                        itemsElm.scrollTo({ left: (scrollPos - itemsElm.clientWidth), behavior: ('instant' as any) }); // no scrolling animation during sync
                    } // if
                    
                    
                    
                    // calculate the diff of itemsElm & dummyElm:
                    setDummyDiff(1);
                } // if
                
                
                
                if (isEndOfScroll(dummyElm)) {
                    // scroll to first:
                    scrollTo(dummyElm.firstElementChild as (HTMLElement|null));
                }
                else {
                    // scroll to next:
                    scrollBy(dummyElm, true);
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
                    tag={itemsTagFn}
                    elmRef={(elm) => {
                        setElmRef(elmRef, elm);
                        setElmRef(listRef, elm);
                    }}
                    
                    
                    // classes:
                    mainClass='items'
                >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    isTypeOf(child, CarouselItem)
                    ?
                    <child.type
                        // other props:
                        {...child.props}
                        
                        
                        // essentials:
                        key={child.key ?? index}
                        tag={child.props.tag ?? itemTagFn}
                    />
                    :
                    <CarouselItem
                        // essentials:
                        key={index}
                        tag={itemTagFn}
                    >
                        { child }
                    </CarouselItem>
                ))}
                </Element>
                
                { carouselVariant.infiniteLoop && <Element<TElement>
                    // essentials:
                    tag={itemsTagFn}
                    elmRef={(elm) => {
                        setElmRef(listDummyRef, elm);
                    }}
                    
                    
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
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
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
                            targetRef     : (nav.props as NavscrollProps).targetRef ?? (carouselVariant.infiniteLoop ? listDummyRef : listRef),
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
                    targetRef={(carouselVariant.infiniteLoop ? listDummyRef : listRef)}
                    interpolation={true}
                >
                    {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                        <NavscrollItem
                            // essentials:
                            key={index}
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
