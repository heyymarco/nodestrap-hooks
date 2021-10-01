// react (builds html using javascript):
import {
    default as React,
    useRef,
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
}                           from './BasicComponent'
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
    stripOutList,
    stripOutScrollbar,
    stripOutImage,
}                           from './strip-outs'



// styles:
const itemsElm   = '.items';    // `.items` is the slideList
const itemElm    = ['li', '*']; // any children inside the slideList are slideItem
const mediaElm   = ['img', 'svg', 'video'];
const prevBtnElm = '.prevBtn';
const nextBtnElm = '.nextBtn';
const navElm     = '.nav';

export const usesCarouselItemsLayout = () => {
    return composition([
        imports([
            // resets:
            stripOutList(),      // clear browser's default styles
            stripOutScrollbar(), // hides browser's scrollbar
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
            marginInline   : [['calc(0px -', cssProps.paddingInline, ')']],
            marginBlock    : [['calc(0px -', cssProps.paddingBlock,  ')']],
            
            
            
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
            stripOutImage(), // removes browser's default styling on image
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
        ContentProps<TElement>
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
    const sheet      = useCarouselSheet();
    
    
    
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
    const itemsTagFn = itemsTag ?? 'ul';
    const itemTagFn  = itemTag  ?? ['ul', 'ol'].includes(itemsTagFn) ? 'li' : 'div';
    
    
    
    // dom effects:
    const listRef    = useRef<HTMLElement|null>(null);
    
    
    
    // functions:
    const scrollBy   = (itemsElm: HTMLElement, nextSlide: boolean) => {
        const parent = itemsElm;
        
        
        
        const [limDeltaScrollLeft, limDeltaScrollTop] = [
            nextSlide ? ((parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft) : -parent.scrollLeft,
            nextSlide ? ((parent.scrollHeight - parent.clientHeight) - parent.scrollTop)  : -parent.scrollTop,
        ];
        
        const [deltaScrollLeft, deltaScrollTop] = [
            nextSlide ? Math.min(parent.clientWidth,  limDeltaScrollLeft) : Math.max(-parent.clientWidth,  limDeltaScrollLeft),
            nextSlide ? Math.min(parent.clientHeight, limDeltaScrollTop ) : Math.max(-parent.clientHeight, limDeltaScrollTop),
        ];
        
        
        
        parent.scrollBy({
            left     : deltaScrollLeft,
            top      : deltaScrollTop,
            behavior : 'smooth',
        });
    }
    const scrollTo   = (targetSlide: HTMLElement|null) => {
        if (!targetSlide) return;
        const parent = targetSlide.parentElement! as HTMLElement;
        
        
        
        const [maxDeltaScrollLeft, maxDeltaScrollTop] = [
            (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];
        
        const [deltaScrollLeft, deltaScrollTop] = (() => {
            const dimension = Dimension.from(targetSlide);
            
            return [
                Math.min(dimension.offsetLeft, maxDeltaScrollLeft),
                Math.min(dimension.offsetTop,  maxDeltaScrollTop ),
            ];
        })();
        
        
        
        parent.scrollBy({
            left     : deltaScrollLeft,
            top      : deltaScrollTop,
            behavior : 'smooth',
        });
    };
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restProps}
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { children && <Element<TElement>
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
            </Element> }
            
            {
                //#region has class prevBtn
                isTypeOf(prevBtn, Element)
                &&
                prevBtn.props.classes?.includes('prevBtn')
                //#endregion has class prevBtn
                ?
                prevBtn
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
                    onClick={(e) => {
                        const itemsElm = listRef.current;
                        if (!itemsElm) return;
                        
                        
                        
                        if (
                            (itemsElm.scrollLeft <= 0.5)
                            &&
                            (itemsElm.scrollTop  <= 0.5)
                        ) {
                            // scroll to last
                            scrollTo(itemsElm.lastElementChild as (HTMLElement|null));
                        }
                        else {
                            // scroll to previous:
                            scrollBy(itemsElm, false);
                        } // if
                    }}
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
                nextBtn
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
                    onClick={(e) => {
                        const itemsElm = listRef.current;
                        if (!itemsElm) return;
                        
                        
                        
                        if (
                            (((itemsElm.scrollWidth  - itemsElm.clientWidth ) - itemsElm.scrollLeft) <= 0.5)
                            &&
                            (((itemsElm.scrollHeight - itemsElm.clientHeight) - itemsElm.scrollTop ) <= 0.5)
                        ) {
                            // scroll to first
                            scrollTo(itemsElm.firstElementChild as (HTMLElement|null));
                        }
                        else {
                            // scroll to next:
                            scrollBy(itemsElm, true);
                        } // if
                    }}
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
                            targetRef     : (nav.props as NavscrollProps).targetRef ?? listRef,
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
                    targetRef={listRef}
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
