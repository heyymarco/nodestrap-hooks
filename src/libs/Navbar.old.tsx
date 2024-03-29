// react:
import {
    default as React,
    useState,
    useRef,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    PropEx,
}                           from './css-types'   // ts defs support for cssfn
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // rules:
    rule,
    states,
    fallbacks,
    
    
    
    //combinators:
    children,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
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

// nodestrap utilities:
import {
    useIsomorphicLayoutEffect,
}                           from './hooks'
import {
    // utilities:
    setRef,
}                           from './utilities'

// nodestrap components:
import {
    // react components:
    ElementProps,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
    ThemeName,
    outlinedOf,
    mildOf,
    usesBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    usesPadding,
    expandPadding,
    usesAnim,
    
    
    
    // configs:
    cssProps as bcssProps,
    
    
    
    // react components:
    BasicProps,
}                           from './Basic'
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
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    isFocus,
    isArrive,
}                           from './Control'
import {
    // hooks:
    isPress,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
}                           from './ActionControl'
import {
    // styles:
    usesContainerLayout,
    usesContainerVariants,
    
    
    
    // configs:
    cssProps as ccssProps,
}                           from './Container'
import {
    // hooks:
    CurrentActiveProps,
    useCurrentActive,
    
    
    
    // react components:
    NavButtonProps,
    NavButton,
}                           from './NavButton'
import {
    TogglerMenuButtonProps,
    TogglerMenuButton,
}                           from './TogglerMenuButton'



// re-exports:
export type { CurrentActiveProps }
export { useCurrentActive }



// hooks:

// states:

//#region activePassive
export const markActive = () => style({
    ...imports([
        outlinedOf(null),      // keeps outlined variant
        mildOf(null),          // keeps mild     variant
        
        usesThemeActive(),     // switch to active theme
    ]),
});
export const dontMarkActive = () => style({
    ...imports([
        outlinedOf(null),      // keeps outlined variant
        mildOf(null),          // keeps mild     variant
        
        usesThemeActive(null), // keeps current theme
    ]),
});

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
    
    
    
    useIsomorphicLayoutEffect(() => {
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
        
        
        
        // setups:
        
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
    }, [props.compact, navbarRef]); // (re)run the setups & cleanups on every time the `props.compact` changes
    
    
    
    return {
        compact : compactFn,
        class   : compactFn ? 'compact' : null,
    };
};
//#endregion compact


// animations:

//#region menus animations
export interface MenusAnimVars {
    /**
     * final animation for the menus.
     */
    anim : any
}
const [menusAnimRefs, menusAnimDecls] = createCssVar<MenusAnimVars>();

export const usesMenusAnim = () => {
    // dependencies:
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    
    
    return [
        () => style({
            ...imports([
                // animations:
                anim(),
            ]),
            ...vars({
                [menusAnimDecls.anim] : animRefs.animNone,
            }),
            ...states([
                isActivating({
                    ...vars({
                        [menusAnimDecls.anim] : cssProps.menusAnimActive,
                    }),
                }),
                isPassivating({
                    ...vars({
                        [menusAnimDecls.anim] : cssProps.menusAnimPassive,
                    }),
                }),
            ]),
        }),
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

export const usesWrapperLayout = () => {
    // dependencies:
    
    // spacings:
    const [paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // spacings:
            paddings(),
        ]),
        ...style({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's height
            justifyContent : 'center', // center contents (text, logo, etc) horizontally
            alignItems     : 'center', // center contents (text, logo, etc) vertically (if the content's height is shorter than the section)
            flexWrap       : 'nowrap', // no wrapping
            
            
            
            // spacings:
            ...expandPadding(), // expand padding css vars
        }),
    });
};
export const usesItemLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
    });
};
export const usesSecondaryLayout = () => {
    // dependencies:
    
    // spacings:
    const [, , paddingDecls] = usesPadding();
    
    
    
    return style({
        // layouts:
        justifySelf    : 'center', // center self horizontally
        alignSelf      : 'center', // center self vertically
        
        
        
        // spacings:
        [paddingDecls.paddingInline] : '0px', // discard padding
        [paddingDecls.paddingBlock ] : '0px', // discard padding
    });
};
export const usesLogoLayout = () => {
    return style({
        // layouts:
        gridArea       : '1 / -3', // place at the same `menus`' row / place at the 3rd column from the right (negative columns are placed after all positive ones was placed)
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'logo')), // apply general cssProps starting with logo***
    });
};
export const usesTogglerLayout = () => {
    return style({
        // layouts:
        gridArea       : '1 / 2', // place at the same `menus`' row / place at the 2nd column from the left
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'toggler')), // apply general cssProps starting with toggler***
    });
};

export const usesMenusLayout = () => {
    // dependencies:
    
    // animations:
    const [, menusAnimRefs] = usesMenusAnim();
    
    
    
    return style({
        // layouts:
        gridArea       : 'menus',   // place at the defined `menus` area
        display        : 'flex',    // use flexbox to place the menus sequentially
        flexDirection  : 'row',     // menus are stacked horizontally according to the document's writing flow
        justifyContent : 'end',     // if menus are not growable, the excess space (if any) placed at the front, and if no sufficient space available => the last menu should be visible first
        alignItems     : 'stretch', // menus height are follow the tallest one
        flexWrap       : 'nowrap',  // no wrapping
        
        
        
        // animations:
        anim           : menusAnimRefs.anim,
        
        
        
        // children:
        ...children('*', { // menu section
            ...imports([
                // layouts:
                usesMenuLayout(),
                
                // variants:
                usesMenuVariants(),
                
                // states:
                usesMenuStates(),
            ]),
        }),
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'menus')), // apply general cssProps starting with menus***
    });
};
export const usesMenusCompactLayout = () => {
    return style({
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
        ...fallbacks({
            inlineSize : '-moz-available',
        }),
    });
};

export const usesMenuLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
            usesWrapperLayout(),
            
            // colors:
            usesThemeDefault(),
        ]),
        ...style({
            // borders:
            [borderStrokeDecls.borderWidth           ] : '0px', // discard border
            // remove rounded corners on top:
            [borderRadiusDecls.borderStartStartRadius] : '0px',
            [borderRadiusDecls.borderStartEndRadius  ] : '0px',
            // remove rounded corners on bottom:
            [borderRadiusDecls.borderEndStartRadius  ] : '0px',
            [borderRadiusDecls.borderEndEndRadius    ] : '0px',
            
            
            
            // sizes:
            flex : [[0, 1, 'auto']], // ungrowable, shrinkable (if menu allows wrap), initial from it's width
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'menu')), // apply general cssProps starting with menu***
        }),
    });
};
export const usesMenuVariants = () => {
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
        ]),
    });
};
export const usesMenuStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
        ...states([
            isActive({
                ...imports([
                    markActive(),
                ]),
            }),
            isFocus({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
            isArrive({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
            isPress({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
        ]),
    });
};

export const usesNavbarLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesContainerLayout(),
        ]),
        ...style({
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
            ...children(wrapperElm, { // wrapper elements
                ...imports([
                    usesWrapperLayout(),
                ]),
            }),
            ...children([logoElm, togglerElm, menusElm], { // all sections
                ...imports([
                    usesItemLayout(),
                ]),
            }),
            ...children([logoElm, togglerElm], { // secondary sections
                ...imports([
                    usesSecondaryLayout(),
                ]),
            }),
            ...children(logoElm, { // logo section
                ...imports([
                    usesLogoLayout(),
                ]),
            }),
            ...children(togglerElm, { // toggler section
                ...imports([
                    usesTogglerLayout(),
                ]),
            }),
            ...children(menusElm, { // menus section
                ...imports([
                    usesMenusLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // borders:
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    });
};
export const usesNavbarVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesContainerVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesNavbarStates = () => {
    // dependencies:
    
    // animations:
    const [menusAnim] = usesMenusAnim();
    
    
    
    return style({
        ...imports([
            // animations:
            menusAnim(),
        ]),
        ...states([
            rule(':not(.compact)', { // full
                // children:
                ...children([logoElm, togglerElm, menusElm], { // all sections
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), 'full')), // apply general cssProps starting with item*** and ending with ***Full
                }),
                ...children(logoElm, { // logo section
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'logo'), 'full')), // apply general cssProps starting with logo*** and ending with ***Full
                }),
                ...children(togglerElm, { // toggler section
                    // appearances:
                    display: 'none', // hides toggler on full mode
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'toggler'), 'full')), // apply general cssProps starting with toggler*** and ending with ***Full
                }),
                ...children(menusElm, { // menus section
                    // children:
                    ...children('*', { // menu section
                        // customize:
                        ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menu'), 'full')), // apply general cssProps starting with menu*** and ending with ***Full
                    }),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menus'), 'full')), // apply general cssProps starting with menus*** and ending with ***Full
                }),
                
                
                
                // customize:
                ...usesGeneralProps(usesSuffixedProps(cssProps, 'full')), // apply general cssProps ending with ***Full
            }),
            rule('.compact', { // compact
                // children:
                ...children([logoElm, togglerElm, menusElm], { // all sections
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'item'), 'compact')), // apply general cssProps starting with item*** and ending with ***Compact
                }),
                ...children(logoElm, { // logo section
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'logo'), 'compact')), // apply general cssProps starting with logo*** and ending with ***Compact
                }),
                ...children(togglerElm, { // toggler section
                    // customize:
                    ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'toggler'), 'compact')), // apply general cssProps starting with toggler*** and ending with ***Compact
                }),
                ...children(menusElm, { // menus section
                    ...imports([
                        usesMenusCompactLayout(),
                    ]),
                    ...style({
                        // children:
                        ...children('*', { // menu section
                            // customize:
                            ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menu'), 'compact')), // apply general cssProps starting with menu*** and ending with ***Compact
                        }),
                        
                        
                        
                        // customize:
                        ...usesGeneralProps(usesSuffixedProps(usesPrefixedProps(cssProps, 'menus'), 'compact')), // apply general cssProps starting with menus*** and ending with ***Compact
                    }),
                }),
                ...states([
                    isPassived({
                        // children:
                        ...children(menusElm, { // menus section
                            // layouts:
                            display: 'none', // hide the menus when on compact mode
                        }),
                    }),
                ]),
                
                
                
                // customize:
                ...usesGeneralProps(usesSuffixedProps(cssProps, 'compact')), // apply general cssProps ending with ***Compact
            }),
        ]),
    });
};

export const useNavbarSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesNavbarLayout(),
            
            // variants:
            usesNavbarVariants(),
            
            // states:
            usesNavbarStates(),
        ]),
    ),
], /*sheetId :*/'xf4hlnf0au'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    //#region keyframes
    const keyframesMenusActive  : PropEx.Keyframes = {
        from  : {
            overflowY    : 'hidden',
            maxBlockSize : 0,
        },
        '99%' : {
            overflowY    : 'hidden',
            maxBlockSize : '100vh',
        },
        to    : {
            overflowY    : 'unset',
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
        insetBlockStart           : '0px',
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
        } as {},
        //#endregion making menus floating (on mobile), not shifting the content
    };
}, { prefix: 'navb' });



// react components:

export interface NavbarMenuProps
    extends
        NavButtonProps
{
}
export function NavbarMenu(props: NavbarMenuProps) {
    // jsx:
    return (
        <NavButton
            // other props:
            {...props}
            
            
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
    // components:
    logo?     : React.ReactComponentElement<any, ElementProps> | boolean
    toggler?  : React.ReactComponentElement<any, ElementProps> | boolean
    
    // children:
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
        
        
        // components:
        logo    = null,
        toggler = <TogglerMenuButton /> as React.ReactComponentElement<any, TogglerMenuButtonProps>,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const mildFn = props.mild ?? false;
    
    
    
    // jsx fn props:
    const logoFn = (() => {
        // no component:
        if ((logo === undefined) || (logo === null) || (logo === false) || (logo === true)) {
            return <></>;
        } // if
        
        
        
        // native component:
        if (React.isValidElement(logo) && (typeof(logo.type) === 'string')) {
            return (
                <div
                    // classes:
                    className='logo wrapper'
                >
                    { logo }
                </div>
            );
        } // if
        
        
        
        // assumes as nodestrap's component:
        const defaultLogoProps : BasicProps = {
            classes : [...(logo.props.classes ?? []),
                'logo', // inject logo class
            ],
        };
        return React.cloneElement(React.cloneElement(logo, defaultLogoProps), logo.props);
    })();
    
    const togglerFn = (() => {
        // no component:
        if ((toggler === undefined) || (toggler === null) || (toggler === false) || (toggler === true)) {
            return <></>;
        } // if
        
        
        
        // native component:
        if (React.isValidElement(toggler) && (typeof(toggler.type) === 'string')) {
            return (
                <div
                    // classes:
                    className='toggler wrapper'
                >
                    { toggler }
                </div>
            );
        } // if
        
        
        
        // assumes as nodestrap's component:
        const defaultTogglerProps : BasicProps & TogglerActiveProps = {
            classes : [...(toggler.props.classes ?? []),
                'toggler', // inject toggler class
            ],
            
            
            // variants:
            mild : mildFn,
            // accessibilities:
            
            
            active         : isActive,
            onActiveChange : (newActive) => {
                (toggler.props as TogglerMenuButtonProps).onActiveChange?.(newActive);
                
                setActive(newActive);
            }
        };
        return React.cloneElement(React.cloneElement(toggler, defaultTogglerProps), toggler.props);
    })();
    
    
    
    // handlers:
    // watch [escape key] on the whole navbar, including menus & toggler:
    const handleKeyUp : React.KeyboardEventHandler<TElement> = (e) => {
        if (!e.defaultPrevented) {
            if (isActive && ((e.key === 'Escape') || (e.code === 'Escape'))) {
                setActive(false);
                e.preventDefault();
            } // if
        } // if
    };
    // watch [click] on the NavbarMenu:
    const handleClick : React.MouseEventHandler<HTMLElement> = (e) => {
        /* always close the menu even if `defaultPrevented` */
        if (isActive) {
            setActive(false);
            // e.preventDefault(); // do not `preventDefault()`, causing <Link> ignore the click => no client side navigation
        } // if
    };
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'nav'       }
            semanticRole={props.semanticRole ?? 'navigation'}
            
            
            // essentials:
            elmRef={(elm) => {
                setRef(props.elmRef, elm);
                setRef(navbarRef, elm);
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
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                handleKeyUp(e);
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
                {React.Children.map(children, (child) => (
                    React.isValidElement<ElementProps>(child)
                    ?
                    React.cloneElement<ElementProps>(child, {
                        // events:
                        onClick : !child.props.onClick ? handleClick : (e) => {
                            child.props.onClick?.(e);
                            
                            handleClick(e);
                        },
                    })
                    :
                    child
                ))}
            </div> }
        </Indicator>
    );
}
export { Navbar as default }
