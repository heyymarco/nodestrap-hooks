// react:
import {
    default as React,
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
    variants,
    
    
    
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
    stripoutFocusableElement,
}                           from './stripouts'
import {
    // utilities:
    setRef,
}                           from './utilities'

// nodestrap components:
import {
    // general types:
    Tag,
    Role,
    SemanticTag,
    SemanticRole,
    
    
    
    // react components:
    Element,
}                           from './Element'
import {
    // hooks:
    usesSizeVariant,
    
    OrientationName,
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    
    usesBorder,
    usesBorderStroke,
    expandBorderStroke,
    usesBorderRadius,
    expandBorderRadius,
    usesAnim,
}                           from './Basic'
import {
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
}                           from './Container'
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    usesContentChildren,
}                           from './Content'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;


// appearances:

export type CardStyle = 'flat'|'flush'|'joined' // might be added more styles in the future
export interface CardVariant {
    cardStyle?: CardStyle
}
export const useCardVariant = (props: CardVariant) => {
    return {
        class: props.cardStyle ? props.cardStyle : null,
    };
};



// styles:
const headerElm = ['header', '.header'];
const footerElm = ['footer', '.footer'];
const bodyElm   = '.body';

export const usesCardItemLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            display : 'block', // fills the entire parent's width
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    });
};
export const usesCardCaptionLayout = () => {
    return style({
        // sizes:
        // default card's items height are unresizeable (excepts for the card's body):
        flex : [[0, 1, 'auto']], // ungrowable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'caption')), // apply general cssProps starting with caption***
    });
};
export const usesCardHeaderLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'header')), // apply general cssProps starting with header***
    });
};
export const usesCardFooterLayout = () => {
    return style({
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'footer')), // apply general cssProps starting with footer***
    });
};
export const usesCardBodyLayout = () => {
    return style({
        // sizes:
        // default card's body height is resizeable, ensuring footers are aligned to the bottom:
        flex     : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
        
        
        
        // scrolls:
        overflow : 'auto', // enable horz & vert scrolling
        
        
        
        // customize:
        ...usesGeneralProps(usesPrefixedProps(cssProps, 'body')), // apply general cssProps starting with body***
    });
};

export const usesCardLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    
    
    
    // dependencies:
    
    // colors:
    const [border        ] = usesBorder();
    
    // animations:
    const [anim, animRefs] = usesAnim();
    
    // borders:
    const [borderStroke  ] = usesBorderStroke();
    const [borderRadius  ] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(),     // clear browser's default styles
            
            // colors:
            border(),
            
            // borders:
            borderStroke(),
            borderRadius(),
            usesBorderAsContainer(options), // make a nicely rounded corners
            
            // animations:
            anim(),
        ]),
        ...style({
            // layouts:
            ...rule(orientationBlockSelector,  { // block
                // layouts:
                display        : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection  : 'column',      // items are stacked vertically
            }),
            ...rule(orientationInlineSelector, { // inline
                // layouts:
                display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection  : 'row',         // items are stacked horizontally
            }),
            justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch', // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // borders:
            /*
                A separator between CardItems.
                Exploits the borders as a horizontal/vertical separator depending on the Card's orientation.
            */
            ...rule(orientationBlockSelector,  { // block
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    ...imports([
                        // borders:
                        usesBorderAsSeparatorBlock({ swapFirstItem: true }), // must be placed at the last
                    ]),
                }),
            }),
            ...rule(orientationInlineSelector, { // inline
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    ...imports([
                        // borders:
                        usesBorderAsSeparatorInline({ swapFirstItem: true }), // must be placed at the last
                    ]),
                }),
            }),
            
            
            
            // animations:
            boxShadow : animRefs.boxShadow,
            filter    : animRefs.filter,
            anim      : animRefs.anim,
            
            
            
            // children:
            ...children([headerElm, footerElm, bodyElm], {
                ...imports([
                    // layouts:
                    usesCardItemLayout(),
                    
                    // children:
                    usesContentChildren(),
                ]),
            }),
            ...children([headerElm, footerElm], {
                ...imports([
                    // layouts:
                    usesCardCaptionLayout(),
                ]),
            }),
            ...children(headerElm, {
                ...imports([
                    // layouts:
                    usesCardHeaderLayout(),
                ]),
            }),
            ...children(footerElm, {
                ...imports([
                    // layouts:
                    usesCardFooterLayout(),
                ]),
            }),
            ...children(bodyElm, {
                ...imports([
                    // layouts:
                    usesCardBodyLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // borders:
            ...expandBorderStroke(), // expand borderStroke css vars
            ...expandBorderRadius(), // expand borderRadius css vars
        }),
    });
};
export const usesCardVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            rule(['.flat', '.flush'], {
                // borders:
                // kill borders surrounding Card:
                [borderStrokeDecls.borderWidth           ] : '0px',
                
                // remove rounded corners on top:
                [borderRadiusDecls.borderStartStartRadius] : '0px',
                [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                [borderRadiusDecls.borderEndEndRadius    ] : '0px',
            }),
            rule(['.flat', '.joined'], {
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // borders:
                    // kill separator between items:
                    [borderStrokeDecls.borderWidth] : '0px',
                }),
            }),
        ]),
    });
};
export const usesCardStates = () => {
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
        ]),
    });
};

export const useCardSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesCardLayout(),
            
            // variants:
            usesCardVariants(),
            
            // states:
            usesCardStates(),
        ]),
    ),
], /*sheetId :*/'wfc3nwgtcn'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // sizes:
        boxSizing           : 'border-box', // the final size is including borders & paddings
        blockSize           : '100%',       // fills the entire parent's height if the parent has a specific height, otherwise no effect
        
        
        
        // captions:
        captionFilter       : [['brightness(70%)', 'contrast(140%)']],
        
        
        
        // typos:
        wordWrap            : 'break-word',
    };
}, { prefix: 'crd' });



// react components:

export interface CardProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>,
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        CardVariant
{
    // essentials:
    headerStyle?          : React.CSSProperties
    headerRef?            : React.Ref<HTMLElement> // setter ref
    
    bodyStyle?            : React.CSSProperties
    bodyRef?              : React.Ref<HTMLElement> // setter ref
    
    footerStyle?          : React.CSSProperties
    footerRef?            : React.Ref<HTMLElement> // setter ref
    
    
    // semantics:
    headerTag?            : Tag
    bodyTag?              : Tag
    footerTag?            : Tag
    
    headerRole?           : Role
    bodyRole?             : Role
    footerRole?           : Role
    
    headerSemanticTag?    : SemanticTag
    bodySemanticTag?      : SemanticTag
    footerSemanticTag?    : SemanticTag
    
    headerSemanticRole?   : SemanticRole
    bodySemanticRole?     : SemanticRole
    footerSemanticRole?   : SemanticRole
    
    
    // classes:
    headerMainClass?      : Optional<string>
    headerClasses?        : Optional<string>[]
    headerVariantClasses? : Optional<string>[]
    headerStateClasses?   : Optional<string>[]
    
    bodyMainClass?        : Optional<string>
    bodyClasses?          : Optional<string>[]
    bodyVariantClasses?   : Optional<string>[]
    bodyStateClasses?     : Optional<string>[]
    
    footerMainClass?      : Optional<string>
    footerClasses?        : Optional<string>[]
    footerVariantClasses? : Optional<string>[]
    footerStateClasses?   : Optional<string>[]
    
    
    // children:
    header? : React.ReactNode
    footer? : React.ReactNode
}
export function Card<TElement extends HTMLElement = HTMLElement>(props: CardProps<TElement>) {
    // styles:
    const sheet                 = useCardSheet();
    
    
    
    // variants:
    const orientationVariant    = useOrientationVariant(props);
    const orientationHorizontal = (orientationVariant.class === 'inline');
    const cardVariant           = useCardVariant(props);
    
    
    
    // rest props:
    const {
        // essentials:
        headerStyle,
        headerRef,
        
        bodyStyle,
        bodyRef,
        
        footerStyle,
        footerRef,
        
        
        // semantics:
        headerTag,
        bodyTag,
        footerTag,
        
        headerRole,
        bodyRole,
        footerRole,
        
        headerSemanticTag,
        bodySemanticTag,
        footerSemanticTag,
        
        headerSemanticRole,
        bodySemanticRole,
        footerSemanticRole,
        
        
        // classes:
        headerMainClass,
        headerClasses,
        headerVariantClasses,
        headerStateClasses,
        
        bodyMainClass,
        bodyClasses,
        bodyVariantClasses,
        bodyStateClasses,
        
        footerMainClass,
        footerClasses,
        footerVariantClasses,
        footerStateClasses,
        
        
        // children:
        children,
        header,
        footer,
    ...restProps} = props;
    
    
    
    // jsx:
    if (!React.Children.count(header))   setRef(headerRef, null);
    if (!React.Children.count(children)) setRef(bodyRef  , null);
    if (!React.Children.count(footer))   setRef(footerRef, null);
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'article'}
            semanticRole={props.semanticRole ?? 'article'}
            
            aria-orientation={props['aria-orientation'] ?? (orientationHorizontal ? 'horizontal' : 'vertical')}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
                cardVariant.class,
            ]}
        >
            { header && <Element
                // essentials:
                elmRef={headerRef}
                
                
                // semantics:
                tag ={headerTag ?? 'header'}
                role={headerRole}
                semanticTag ={headerSemanticTag}
                semanticRole={headerSemanticRole}
                
                
                // classes:
                mainClass={headerMainClass}
                classes={[...(headerClasses ?? []),
                    'header',
                ]}
                variantClasses={headerVariantClasses}
                stateClasses={headerStateClasses}
                
                
                // styles:
                style={headerStyle}
            >
                { header }
            </Element> }
            
            { children && <Element
                // essentials:
                elmRef={bodyRef}
                
                
                // semantics:
                tag ={bodyTag }
                role={bodyRole}
                semanticTag ={bodySemanticTag }
                semanticRole={bodySemanticRole}
                
                
                // classes:
                mainClass={bodyMainClass}
                classes={[...(bodyClasses ?? []),
                    'body',
                ]}
                variantClasses={bodyVariantClasses}
                stateClasses={bodyStateClasses}
                
                
                // styles:
                style={bodyStyle}
            >
                { children }
            </Element> }
            
            { footer && <Element
                // essentials:
                elmRef={footerRef}
                
                
                // semantics:
                tag ={footerTag ?? 'footer'}
                role={footerRole}
                semanticTag ={footerSemanticTag}
                semanticRole={footerSemanticRole}
                
                
                // classes:
                mainClass={footerMainClass}
                classes={[...(footerClasses ?? []),
                    'footer',
                ]}
                variantClasses={footerVariantClasses}
                stateClasses={footerStateClasses}
                
                
                // styles:
                style={footerStyle}
            >
                { footer }
            </Element> }
        </Indicator>
    );
}
export { Card as default }

export type { OrientationName, OrientationVariant }
