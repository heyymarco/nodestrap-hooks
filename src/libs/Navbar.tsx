// react (builds html using javascript):
import {
    default as React,
    useState,
    useRef,
    useLayoutEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // general types:
    Style,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    children,
    
    
    
    // rules:
    rules,
    states,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    Element,
    
    
    
    // utilities:
    isTypeOf,
    setElmRef,
}                           from './react-cssfn' // cssfn for react
import {
    createCssVar,
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
    ThemeName,
    outlinedOf,
    mildOf,
    usesAnim,
    
    
    
    // configs:
    cssProps as bcssProps,
}                           from './Basic'
import {
    // styles:
    usesContainerLayout,
    usesContainerVariants,
    
    
    
    // configs:
    cssProps as ccssProps,
}                           from './Container'
import {
    // hooks:
    isActivating,
    isPassivating,
    isPassived,
    isActive,
    TogglerActiveProps,
    useTogglerActive,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    // hooks:
    markActive       as controlMarkActive,
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    isBlurring,
    isFocus,
    isArrive,
}                           from './Control'
import {
    // hooks:
    isPress,
    usesActivePassiveAsPressReleaseState,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'
import {
    // react components:
    CheckProps,
    Check,
}                           from './Check'
import TogglerMenuButton    from './TogglerMenuButton'



// hooks:

// states:

//#region activePassive
export const markActive = () => composition([
    imports([
        controlMarkActive(),
        
        mildOf(null), // keeps mild variant
        
        usesThemeActive(), // switch to active theme
    ]),
]);
export const dontMarkActive = () => composition([
    imports([
        outlinedOf(null), // keeps outlined variant
        mildOf(null),     // keeps mild     variant
        
        usesThemeActive(null), // keeps current theme
    ]),
]);

// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null) => controlUsesThemeDefault(themeName);

// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary') => controlUsesThemeActive(themeName);
//#endregion activePassive

//#region compact
export interface CompactState {
    compact? : boolean
}
export const useCompactState = <TElement extends HTMLElement = HTMLElement>(props: CompactState, navbarRef: React.RefObject<TElement>) => {
    // states:
    const [compactDn, setCompactDn] = useState<boolean>(false); // uncontrollable (dynamic) state: true => compact mode, false => full mode
    
    
    
    /*
     * state is compact/full based on [controllable compact] (if set) and fallback to [uncontrollable compact]
     */
    const compactFn: boolean = props.compact /*controllable*/ ?? compactDn /*uncontrollable*/;
    
    
    
    useLayoutEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar)                     return; // navbar was unloaded => nothing to do
        if (props.compact !== undefined) return; // controllable [compact] is set => no uncontrollable required
        
        
        
        // functions:
        const handleUpdate = async () => { // keeps the UI responsive (not blocking) while handling the event
            // prepare the condition for dom measurement:
            const classList  = navbar.classList;
            const hasCompact = classList.contains('compact');
            if (hasCompact) {
                // turn off ResizeObserver (to avoid triggering `ResizeObserver event` => firing `handleUpdate()`):
                turnOffResizeObserver();
                
                classList.remove('compact'); // kill compact mode, so we can measure the menu's overflows
            } // if
            
            
            
            // measuring the menu's overflows:
            const {
                scrollWidth,
                clientWidth,
                
                scrollHeight,
                clientHeight,
            } = navbar;
            
            
            
            // restore to original condition as before measurement:
            if (hasCompact) {
                classList.add('compact'); // <== warning: causing to trigger `ResizeObserver event` at the next event loop
                
                // turn on ResizeObserver soon (to avoid triggering `ResizeObserver event` => firing `handleUpdate()`):
                setTimeout(() => {
                    turnOnResizeObserver();
                }, 0);
            } // if
            
            
            
            // update the dynamic compact mode based on the measured menu's overflows:
            setCompactDn(
                (scrollWidth > clientWidth)
                ||
                (scrollHeight > clientHeight)
            );
        };
        
        
        
        // update for the first time:
        handleUpdate();
        
        
        
        //#region update in the future
        //#region when navbar / navbar's items resized
        let initialResizeEvent : boolean|null = null;
        const resizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
            // ignores the insertion dom event:
            if (initialResizeEvent) {
                initialResizeEvent = false;
                return;
            } // if
            
            
            
            // ignores the removal dom event:
            let items = entries.map((e) => e.target as HTMLElement).filter((item) => {
                if (navbar.parentElement) { // navbar is still exist on the document
                    // check if the item is navbar itself or the child of navbar
                    if ((item === navbar) || (item.parentElement === navbar)) return true; // confirmed
                } // if
                
                
                
                resizeObserver?.unobserve(item); // no longer exist => remove from observer
                return false; // not the child of navbar
            });
            if (!items.length) return; // no existing items => nothing to do
            
            
            
            // ignores resizing by animations:
            items = items.filter((item) => (item.getAnimations().length === 0));
            if (!items.length) return; // no non_animating items => nothing to do
            
            
            
            // update after being resized:
            await handleUpdate();
        }) : null;
        
        const resizeObserverItems = [navbar, ...(Array.from(navbar.children) as HTMLElement[])];
        const turnOnResizeObserver = () => {
            if (resizeObserver && (initialResizeEvent === null)) {
                resizeObserverItems.forEach((item) => {
                    // update in the future:
                    initialResizeEvent = true; // prevent the insertion dom event
                    resizeObserver.observe(item, { box: 'border-box' });
                });
            } // if
        }
        const turnOffResizeObserver = () => {
            initialResizeEvent = null;
            resizeObserver?.disconnect();
        }
        
        turnOnResizeObserver();
        //#endregion when navbar / navbar's items resized
        //#endregion update in the future
        
        
        
        // cleanups:
        return () => {
            resizeObserver?.disconnect();
        };
    }, [props.compact, navbarRef]);
    
    
    
    return {
        class: compactFn ? 'compact' : null,
    };
};
//#endregion compact


// animations:

//#region menus animations
interface MenusAnimVars {
    /**
     * none animation.
     */
    animNone  : any
    /**
     * final animation for the menus.
     */
    menusAnim : any
}
const [menusAnimRefs, menusAnimDecls] = createCssVar<MenusAnimVars>();

export const usesMenusAnim = () => {
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
                [menusAnimDecls.menusAnim] : animRefs.animNone,
            }),
            states([
                isActivating([
                    vars({
                        [menusAnimDecls.menusAnim] : cssProps.menusAnimActive,
                    }),
                ]),
                isPassivating([
                    vars({
                        [menusAnimDecls.menusAnim] : cssProps.menusAnimPassive,
                    }),
                ]),
            ]),
        ]),
        menusAnimRefs,
        menusAnimDecls,
    ] as const;
};
//#endregion menus animations



// styles:
const wrapperElm = '.wrapper';
const logoElm    = '.logo';
const togglerElm = '.toggler';
const menusElm   = '.menus';
const menuElm    = '.menus>*';

export const usesWrapperLayout = () => {
    return composition([
        layout({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's height
            justifyContent : 'center', // center contents (text, logo, etc) horizontally
            alignItems     : 'center', // center contents (text, logo, etc) vertically (if the content's height is shorter than the section)
            flexWrap       : 'nowrap', // no wrapping
            
            
            
            // spacings:
            paddingInline  : bcssProps.paddingInline,
            paddingBlock   : bcssProps.paddingBlock,
        }),
    ]);
};
export const usesItemLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesSecondaryLayout = () => {
    return composition([
        layout({
            // layouts:
            justifySelf    : 'center', // center self horizontally
            alignSelf      : 'center', // center self vertically
            
            
            
            // spacings:
            paddingInline  : 0,
        }),
    ]);
};
export const usesLogoLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea       : '1 / -3', // place at the same `menus`' row / place at the 3rd column from the right (negative columns are placed after all positive ones was placed)
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'logo')), // apply general cssProps starting with logo***
        }),
    ]);
};
export const usesTogglerLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea       : '1 / 2', // place at the same `menus`' row / place at the 2nd column from the left
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'toggler')), // apply general cssProps starting with toggler***
        }),
    ]);
};

export const usesMenusLayout = () => {
    // dependencies:
    
    // animations:
    const [, menusAnimRefs] = usesMenusAnim();
    
    
    
    return composition([
        layout({
            // layouts:
            gridArea       : 'menus',   // place at the defined `menus` area
            display        : 'flex',    // use flexbox to place the menus sequentially
            flexDirection  : 'row',     // menus are stacked horizontally according to the document's writing flow
            justifyContent : 'end',     // if menus are not growable, the excess space (if any) placed at the front, and if no sufficient space available => the last menu should be visible first
            alignItems     : 'stretch', // menus height are follow the tallest one
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // animations:
            anim           : menusAnimRefs.menusAnim,
            
            
            
            // children:
            ...children('*', composition([ // menu section
                imports([
                    usesMenuLayout(),
                    usesMenuVariants(),
                    usesMenuStates(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'menus')), // apply general cssProps starting with menus***
        }),
    ]);
};
export const usesMenusCompactLayout = () => {
    return composition([
        layout({
            // layouts:
            gridArea       : '-1 / -3 / -1 / 3', // place at the 1st column from the bottom / place start from the 3rd column from the right to 3rd column from the left (negative columns are placed after all positive ones was placed)
            flexDirection  : 'column',  // place the menus vertically
            
            
            
            // backgrounds:
            backg          : 'inherit', // supports for floating menus's background
            
            
            
            // borders:
            borderBlock    : 'inherit', // supports for floating menus's border
            
            
            
            // sizes:
            // supports for floating menus, fills the entire page's width
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : '-moz-available',
            },
        }),
    ]);
};

export const usesMenuLayout = () => {
    return composition([
        imports([
            // layouts:
            usesActionControlLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        layout({
            // borders:
            border       : 0, // discard border
            borderRadius : 0, // discard borderRadius
            
            
            
            // sizes:
            flex         : [[0, 1, 'auto']], // ungrowable, shrinkable (if menu allows wrap), initial from it's width
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'menu')), // apply general cssProps starting with menu***
        }),
    ]);
};
export const usesMenuVariants = () => {
    return composition([
        imports([
            // variants:
            usesActionControlVariants(),
        ]),
    ]);
};
export const usesMenuStates = () => {
    return composition([
        imports([
            // states:
            usesActionControlStates(),
            usesActivePassiveAsPressReleaseState(),
        ]),
        states([
            isFocus([
                layout({
                    zIndex: 2, // prevents boxShadowFocus from clipping
                }),
            ]),
            isBlurring([
                layout({
                    zIndex: 1, // prevents boxShadowFocus from clipping but below the active one
                }),
            ]),
            
            isActive([
                imports([
                    markActive(),
                ]),
            ]),
            isFocus([
                imports([
                    dontMarkActive(),
                ]),
            ]),
            isArrive([
                imports([
                    dontMarkActive(),
                ]),
            ]),
            isPress([
                imports([
                    dontMarkActive(),
                ]),
            ]),
        ]),
    ]);
};

export const usesNavbarLayout = () => {
    return composition([
        imports([
            // layouts:
            usesContainerLayout(),
        ]),
        layout({
            // layouts:
            display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            /*
                just one explicit area: `menus`
                logo & toggler rely on implicit area
            */
            gridTemplateRows    : [['auto'/*fluid height*/]],
            gridTemplateColumns : [['auto'/*fluid width, menus' width = maximum width - logo's width - toggler's width*/]],
            gridTemplateAreas   : [[
                '"menus"',
            ]],
            
            // implicit areas:
            gridAutoFlow        : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
            gridAutoRows        : 'min-content', // other areas than `menus` should take the minimum required height
            gridAutoColumns     : 'min-content', // other areas than `menus` should take the minimum required width
            // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*
            
            // child default sizes:
            justifyItems        : 'stretch', // each section fills the entire area's width
            alignItems          : 'stretch', // each section fills the entire area's height (the shorter sections follow the tallest one)
            
            
            
            // children:
            ...children([wrapperElm, menuElm], composition([ // wrapper elements
                imports([
                    usesWrapperLayout(),
                ]),
            ])),
            ...children([logoElm, togglerElm, menusElm], composition([ // all sections
                imports([
                    usesItemLayout(),
                ]),
            ])),
            ...children([logoElm, togglerElm], composition([ // secondary sections
                imports([
                    usesSecondaryLayout(),
                ]),
            ])),
            ...children(logoElm, composition([ // logo section
                imports([
                    usesLogoLayout(),
                ]),
            ])),
            ...children(togglerElm, composition([ // toggler section
                imports([
                    usesTogglerLayout(),
                ]),
            ])),
            ...children(menusElm, composition([ // menus section
                imports([
                    usesMenusLayout(),
                ]),
            ])),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesNavbarVariants = () => {
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
            usesContainerVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesNavbarStates = () => {
    // dependencies:
    
    // animations:
    const [menusAnim] = usesMenusAnim();
    
    
    
    return composition([
        imports([
            // animations:
            menusAnim(),
        ]),
        states([
            rule(':not(.compact)', [ // full
                layout({
                    // children:
                    ...children([logoElm, togglerElm, menusElm], composition([ // all sections
                        layout({
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), 'full')), // apply general cssProps starting with item*** and ending with ***Full
                        }),
                    ])),
                    ...children(logoElm, composition([ // logo section
                        layout({
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'logo'), 'full')), // apply general cssProps starting with logo*** and ending with ***Full
                        }),
                    ])),
                    ...children(togglerElm, composition([ // toggler section
                        layout({
                            // appearances:
                            display: 'none', // hides toggler on full mode
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'toggler'), 'full')), // apply general cssProps starting with toggler*** and ending with ***Full
                        }),
                    ])),
                    ...children(menusElm, composition([ // menus section
                        layout({
                            // children:
                            ...children('*', composition([ // menu section
                                layout({
                                    // customize:
                                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menu'), 'full')), // apply general cssProps starting with menu*** and ending with ***Full
                                }),
                            ])),
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menus'), 'full')), // apply general cssProps starting with menus*** and ending with ***Full
                        }),
                    ])),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(cssProps, 'full')), // apply general cssProps ending with ***Full
                }),
            ]),
            rule('.compact', [ // compact
                layout({
                    // children:
                    ...children([logoElm, togglerElm, menusElm], composition([ // all sections
                        layout({
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), 'compact')), // apply general cssProps starting with item*** and ending with ***Compact
                        }),
                    ])),
                    ...children(logoElm, composition([ // logo section
                        layout({
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'logo'), 'compact')), // apply general cssProps starting with logo*** and ending with ***Compact
                        }),
                    ])),
                    ...children(togglerElm, composition([ // toggler section
                        layout({
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'toggler'), 'compact')), // apply general cssProps starting with toggler*** and ending with ***Compact
                        }),
                    ])),
                    ...children(menusElm, composition([ // menus section
                        imports([
                            usesMenusCompactLayout(),
                        ]),
                        layout({
                            // children:
                            ...children('*', composition([ // menu section
                                layout({
                                    // customize:
                                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menu'), 'compact')), // apply general cssProps starting with menu*** and ending with ***Compact
                                }),
                            ])),
                            
                            
                            
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menus'), 'compact')), // apply general cssProps starting with menus*** and ending with ***Compact
                        }),
                    ])),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(cssProps, 'compact')), // apply general cssProps ending with ***Compact
                }),
                rules([
                    isPassived([
                        layout({
                            // children:
                            ...children(menusElm, composition([ // menus section
                                layout({
                                    // layouts:
                                    display: 'none', // hide the menus when on compact mode
                                }),
                            ])),
                        }),
                    ]),
                ]),
            ]),
        ]),
    ]);
};
export const usesNavbar = () => {
    return composition([
        imports([
            // layouts:
            usesNavbarLayout(),
            
            // variants:
            usesNavbarVariants(),
            
            // states:
            usesNavbarStates(),
        ]),
    ]);
};

export const useNavbarSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesNavbar(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesMenusActive  : PropEx.Keyframes = {
        from  : {
            overflow     : 'hidden',
            maxBlockSize : 0,
        },
        '99%' : {
            overflow     : 'hidden',
            maxBlockSize : '100vh',
        },
        to    : {
            overflow     : 'unset',
            maxBlockSize : 'unset',
        },
    };
    const keyframesMenusPassive : PropEx.Keyframes = {
        from  : keyframesMenusActive.to,
        '1%'  : keyframesMenusActive['99%'],
        to    : keyframesMenusActive.from,
    };
    //#endregion keyframes
    
    
    
    return {
        //#region positions
        zIndex                    : 1020,
        position                  : 'sticky',
        //#endregion positions
        
        
        
        //#region borders
        borderInline              : 'none',
        borderBlockStart          : 'none',
        borderRadius              : 0,
        //#endregion borders
        
        
        
        //#region spacings
        paddingInline             : ccssProps.paddingInline, // override to Basic
        paddingBlock              : bcssProps.paddingBlock,  // override to Basic
        
        gapInline                 : bcssProps.paddingInline,
        gapBlock                  : bcssProps.paddingBlock,
        //#endregion spacings
        
        
        
        //#region animations
        '@keyframes menusActive'  : keyframesMenusActive,
        '@keyframes menusPassive' : keyframesMenusPassive,
        menusAnimActive           : [['300ms', 'ease-out', 'both', keyframesMenusActive ]],
        menusAnimPassive          : [['300ms', 'ease-out', 'both', keyframesMenusPassive]],
        //#endregion animations
        
        
        
        // menus:
        // at full mode, cancel-out Navbar's paddingBlock with negative margin:
        menusMarginBlockFull      : [['calc(0px -', bcssProps.paddingBlock,  ')']],
        
        // at compact mode, cancel-out Navbar's paddingInline with negative margin:
        menusMarginInlineCompact  : [['calc(0px -', ccssProps.paddingInline, ')']],
        
        
        
        // menu:
        menuWhiteSpace            : 'nowrap',
        menuTextAlign             : 'center',
        
        
        
        //#region making menus floating (on mobile), not shifting the content
        ...{
            // do not make row spacing when the menus shown (we'll make the menus as ghost element, floating in front of the contents below the navbar)
            gapBlock : 0,
            
            
            
            // menus:
            menusPositionCompact         : 'absolute',
            menusMarginBlockStartCompact : bcssProps.paddingBlock,
            menusPaddingBlockEndCompact  : bcssProps.paddingBlock,
        } as Style,
        //#endregion making menus floating (on mobile), not shifting the content
    };
}, { prefix: 'navb' });



// react components:

export interface NavbarMenuProps<TElement extends HTMLElement = HTMLElement>
    extends
        ActionControlProps<TElement>,
        React.AnchorHTMLAttributes<TElement>
{
}
export function NavbarMenu<TElement extends HTMLElement = HTMLElement>(props: NavbarMenuProps<TElement>) {
    // jsx:
    return (
        <ActionControl<TElement>
            // other props:
            {...props}
            
            
            // essentials:
            tag={props.tag ?? 'a'}
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}

export type { NavbarMenuProps as MenuProps }
export { NavbarMenu as Menu }



export interface NavbarProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>,
        TogglerActiveProps,
        
        // states:
        CompactState
{
    // children:
    logo?     : React.ReactChild | boolean | null
    toggler?  : React.ReactChild | boolean | null
    children? : React.ReactNode
}
export function Navbar<TElement extends HTMLElement = HTMLElement>(props: NavbarProps<TElement>) {
    // styles:
    const sheet                 = useNavbarSheet();
    
    
    
    // states:
    const navbarRef             = useRef<TElement|null>(null);
    const compactState          = useCompactState(props, navbarRef);
    const [isActive, setActive] = useTogglerActive(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`
        
        
        // children:
        logo,
        toggler,
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const mildFn = props.mild ?? false;
    
    
    
    // jsx fn props:
    const logoFn = (() => {
        // nodestrap's component:
        if (isTypeOf(logo, Element)) return (
            <logo.type
                // other props:
                {...logo.props}
                
                
                // classes:
                classes={[...(logo.props.classes ?? []),
                    'logo', // inject logo class
                ]}
            />
        );
        
        
        
        // other component:
        return logo && (
            <div
                // classes:
                className='logo wrapper'
            >
                { logo }
            </div>
        );
    })();
    
    const togglerFn = (() => {
        // default (unset):
        if (toggler === undefined) return (
            <TogglerMenuButton
                // accessibilities:
                active={isActive}
                onActiveChange={(newActive) => {
                    setActive(newActive);
                }}
                
                
                // variants:
                mild={mildFn}
                
                
                // classes:
                classes={[
                    'toggler', // inject toggler class
                ]}
            />
        );
        
        
        
        // nodestrap's component:
        if (isTypeOf(toggler, Element)) return (
            <toggler.type
                // other props:
                {...toggler.props}
                
                
                // classes:
                classes={[...(toggler.props.classes ?? []),
                    'toggler', // inject toggler class
                ]}
                
                
                {...(isTypeOf(toggler, Indicator) ? ({
                    // accessibilities:
                    active         : (toggler.props as IndicatorProps).active ?? isActive,
                } as IndicatorProps) : {})}
                
                
                {...(isTypeOf(toggler, Check) ? ({
                    // accessibilities:
                    onActiveChange : (toggler.props as CheckProps).onActiveChange ?? ((newActive) => {
                        setActive(newActive);
                    }),
                } as CheckProps) : {})}
            />
        );
        
        
        
        // other component:
        return toggler && (
            <div
                // classes:
                className='toggler wrapper'
            >
                { toggler }
            </div>
        );
    })();
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // essentials:
            tag={props.tag ?? 'nav'}
            elmRef={(elm) => {
                setElmRef(props.elmRef, elm);
                setElmRef(navbarRef, elm);
            }}
            
            
            // accessibilities:
            active={isActive}
            
            
            // variants:
            mild={mildFn}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            stateClasses={[...(props.stateClasses ?? []),
                compactState.class,
            ]}
            
            
            // events:
            // watch [escape key] on the whole navbar, including menus & toggler:
            onKeyUp={(e) => {
                // backwards:
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if (isActive && ((e.key === 'Escape') || (e.code === 'Escape'))) {
                        setActive(false);
                        e.preventDefault();
                    } // if
                } // if
            }}
        >
            { logoFn }
            { togglerFn }
            { children && <div
                // classes:
                className='menus'
                
                
                // events:
                onAnimationEnd={(e) => {
                    /*
                        active/passive rely on `.menus`' active/passive
                        
                        // todo will be perfected soon:
                        enable/disable rely on `NavbarMenu` enable/disable
                        if the `Navbar` doesn't have any `NavbarMenu` it wouldn't work
                    */
                    // triggers `Navbar`'s onAnimationEnd event
                    e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                }}
            >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    isTypeOf(child, NavbarMenu)
                    ?
                    <child.type
                        // other props:
                        {...child.props}
                        
                        
                        // essentials:
                        key={child.key ?? index}
                    />
                    :
                    <NavbarMenu
                        // essentials:
                        key={index}
                    >
                        { child }
                    </NavbarMenu>
                ))}
            </div> }
        </Indicator>
    );
}
export { Navbar as default }
