// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from './react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from './css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)
import {
    // hooks:
    usesSizes,
}                           from './BasicComponent'
import {
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from './Popup'
import typos                from './typos/index' // configurable typography (texting) defs



// styles:
export const usesBadgeLayout = () => {
    return composition([
        imports([
            // layouts:
            usesPopupLayout(),
        ]),
        layout({
            // layouts:
            display       : 'inline-block', // use inline block, so it takes the width & height as needed
            
            
            
            // positions:
            verticalAlign : 'baseline', // badge's text should be aligned with sibling text, so the badge behave like <span> wrapper
            
            
            
            // sizes:
            /* -- auto size depends on the text's/content's size -- */
            boxSizing     : 'content-box', // the final size is excluding borders & paddings
            
            
            
            // typos:
            lineHeight    : 1,
            textAlign     : 'center',
            whiteSpace    : 'nowrap',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
    ]);
};
export const usesBadgeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizes((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesBadgeStates = () => {
    return composition([
        imports([
            // states:
            usesPopupStates(),
        ]),
    ]);
};
export const usesBadge = () => {
    return composition([
        imports([
            // layouts:
            usesBadgeLayout(),
            
            // variants:
            usesBadgeVariants(),
            
            // states:
            usesBadgeStates(),
        ]),
    ]);
};

export const useBadgeSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesBadge(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        //#region typos
        fontSize      : '0.75em',
        fontWeight    : typos.fontWeightBold,
        //#endregion typos
        
        
        
        //#region spacings
        paddingInline : '0.65em',
        paddingBlock  : '0.35em',
        //#endregion spacings
    };
    return {
        ...basics,
        
        
        
        //#region typos
        fontSizeSm      : [['calc(', basics.fontSize     , '/', 1.25, ')']],
        fontSizeLg      : [['calc(', basics.fontSize     , '*', 1.25, ')']],
        //#endregion typos
        
        
        
        //#region spacings
        paddingInlineSm : [['calc(', basics.paddingInline, '/', 1.25, ')']],
        paddingBlockSm  : [['calc(', basics.paddingBlock , '/', 1.25, ')']],
        paddingInlineLg : [['calc(', basics.paddingInline, '*', 1.25, ')']],
        paddingBlockLg  : [['calc(', basics.paddingBlock , '*', 1.25, ')']],
        //#endregion spacings
    };
}, { prefix: 'bge' });



// react components:

export interface BadgeProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
    // accessibilities:
    label? : string
}
export const Badge = <TElement extends HTMLElement = HTMLElement>(props: BadgeProps<TElement>) => {
    // styles:
    const sheet = useBadgeSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,
    ...restProps}  = props;
    
    
    
    // fn props:
    const activeFn = (active ?? true) && !!(props.children ?? false);
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restProps}
            
            
            
            // accessibilities:
            aria-label={props.label}
            active={activeFn}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
        >
            { props.children }
        </Popup>
    );
};
export { Badge as default }
