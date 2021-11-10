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
    // general types:
    Tag,
    Role,
    SemanticTag,
    SemanticRole,
    
    
    
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    Element,
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

// nodestrap components:
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
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
    usesBorderAsSeparatorInline,
    
    
    
    // styles:
    usesContentMedia,
    usesContentLayout,
    usesContentVariants,
}                           from './Content'
import {
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from './Indicator'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;



// styles:
const headerElm = ['header', '.header'];
const footerElm = ['footer', '.footer'];
const bodyElm   = '.body';

export const usesCardItemLayout = () => {
    return composition([
        imports([
            // layouts:
            usesIndicatorLayout(),
            usesContentLayout(),
        ]),
        layout({
            // layouts:
            display : 'block', // fills the entire parent's width
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
        }),
    ]);
};
export const usesCardCaptionLayout = () => {
    return composition([
        layout({
            // sizes:
            // default card's items height are unresizeable (excepts for the card's body):
            flex : [[0, 1, 'auto']], // ungrowable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'caption')), // apply general cssProps starting with caption***
        }),
    ]);
};
export const usesCardHeaderLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'header')), // apply general cssProps starting with header***
        }),
    ]);
};
export const usesCardFooterLayout = () => {
    return composition([
        layout({
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'footer')), // apply general cssProps starting with footer***
        }),
    ]);
};
export const usesCardBodyLayout = () => {
    return composition([
        layout({
            // sizes:
            // default card's body height is resizeable, ensuring footers are aligned to the bottom:
            flex     : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // scrolls:
            overflow : 'auto', // enable horz & vert scrolling
            
            
            
            // customize:
            ...usesGeneralProps(usesPrefixedProps(cssProps, 'body')), // apply general cssProps starting with body***
        }),
    ]);
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
    
    
    
    return composition([
        imports([
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
        layout({
            // layouts:
         // display        : 'flex',    // customizable orientation // already defined in variant `.block`/`.inline`
         // flexDirection  : 'column',  // customizable orientation // already defined in variant `.block`/`.inline`
            justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch', // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            
            
            
            // borders:
            ...expandBorderStroke(), // expand borderStroke css vars
            ...expandBorderRadius(), // expand borderRadius css vars
            
            
            
            // animations:
            boxShadow : animRefs.boxShadow,
            filter    : animRefs.filter,
            anim      : animRefs.anim,
            
            
            
            // children:
            ...children([headerElm, footerElm, bodyElm], [
                imports([
                    // media:
                    usesContentMedia(),
                    
                    // layouts:
                    usesCardItemLayout(),
                ]),
            ]),
            ...children([headerElm, footerElm], [
                imports([
                    // layouts:
                    usesCardCaptionLayout(),
                ]),
            ]),
            ...children(headerElm, [
                imports([
                    // layouts:
                    usesCardHeaderLayout(),
                ]),
            ]),
            ...children(footerElm, [
                imports([
                    // layouts:
                    usesCardFooterLayout(),
                ]),
            ]),
            ...children(bodyElm, [
                imports([
                    // layouts:
                    usesCardBodyLayout(),
                ]),
            ]),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockSelector,  [ // block
                layout({
                    // layouts:
                    display        : 'flex',        // use block flexbox, so it takes the entire parent's width
                    flexDirection  : 'column',      // items are stacked vertically
                    
                    
                    
                    // children:
                    ...children([headerElm, footerElm, bodyElm], [
                        imports([
                            // borders:
                            usesBorderAsSeparatorBlock({ replaceLast  : true }),
                        ]),
                    ]),
                }),
            ]),
            rule(orientationInlineSelector, [ // inline
                layout({
                    // layouts:
                    display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    flexDirection  : 'row',         // items are stacked horizontally
                    
                    
                    
                    // children:
                    ...children([headerElm, footerElm, bodyElm], [
                        imports([
                            // borders:
                            usesBorderAsSeparatorInline({ replaceLast  : true }),
                        ]),
                    ]),
                }),
            ]),
        ]),
    ]);
};
export const usesCardVariants = () => {
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
            usesIndicatorVariants(),
            usesContentVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesCardStates = () => {
    return composition([
        imports([
            // states:
            usesIndicatorStates(),
        ]),
    ]);
};
export const usesCard = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesCardLayout(options),
            
            // variants:
            usesCardVariants(),
            
            // states:
            usesCardStates(),
        ]),
    ]);
};

export const useCardSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesCard(),
        ]),
    ]),
]);



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
        OrientationVariant
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
