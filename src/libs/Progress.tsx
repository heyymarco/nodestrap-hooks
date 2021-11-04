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
    children,
    
    
    
    // rules:
    variants,
    rule,
}                           from './cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
    
    
    
    // react components:
    Element,
    
    
    
    // utilities:
    parseNumber,
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
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    usesBorderStroke,
    usesBorderRadius,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from './Basic'
import {
    // hooks:
    ListStyle,
    ListVariant,
    
    
    
    // styles:
    listItemElm,
    usesListLayout,
}                           from './List'



// defaults:
const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;



// hooks:

// progressBar vars:

export interface ProgressBarVars {
    /**
     * ProgressBar's thumb ratio.
     */
    progressBarValueRatio : any
}
const [progressBarVarRefs, progressBarVarDecls] = createCssVar<ProgressBarVars>();

/**
 * Uses ProgressBar variables.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents ProgressBar variables definitions.
 */
export const usesProgressBarVars = () => {
    return [
        () => composition([
        ]),
        progressBarVarRefs,
        progressBarVarDecls,
    ] as const;
};



// styles:
export const usesProgressLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockRule, orientationInlineRule] = usesOrientationRule(options);
    
    
    
    return composition([
        imports([
            // layouts:
            usesListLayout(options),
        ]),
        layout({
            // layouts:
            justifyContent : 'start',   // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockRule,  [ // block
                layout({
                    // overwrites propName = propName{Block}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
                }),
            ]),
            rule(orientationInlineRule, [ // inline
                layout({
                    // overwrites propName = propName{Inline}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
                }),
            ]),
        ]),
    ]);
};
export const usesProgressVariants = () => {
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
            usesBasicVariants(),
            
            // layouts:
            sizes(),
        ]),
    ]);
};
export const usesProgress = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
    return composition([
        imports([
            // layouts:
            usesProgressLayout(options),
            
            // variants:
            usesProgressVariants(),
        ]),
    ]);
};

export const useProgressSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesProgress(),
        ]),
    ]),
]);



export const usesProgressBarLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    // range vars:
    const [progressBarVars , progressBarVarRefs] = usesProgressBarVars();
    
    
    
    return composition([
        layout({
            // sizes:
            flex : [[progressBarVarRefs.progressBarValueRatio, progressBarVarRefs.progressBarValueRatio, 0]], // growable, shrinkable, initial from 0 width; using `rangeValueRatio` for the grow/shrink ratio
            
            
            
            // children:
            ...children(listItemElm, [
                imports([
                    // layouts:
                    usesBasicLayout(),
                    
                    // progressBar vars:
                    progressBarVars(),
                ]),
                layout({
                    // layouts:
                    display   : 'block',  // fills the entire wrapper's width
                    
                    
                    
                    // borders:
                    [borderStrokeDecls.borderWidth]            : 0, // discard border
                    [borderRadiusDecls.borderStartStartRadius] : 0, // discard borderRadius
                    [borderRadiusDecls.borderStartEndRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndStartRadius]   : 0, // discard borderRadius
                    [borderRadiusDecls.borderEndEndRadius]     : 0, // discard borderRadius
                    
                    
                    
                    // sizes:
                    flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                    
                    
                    
                    // typos:
                    textAlign : 'center',
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'item')), // apply general cssProps starting with item***
                }),
            ]),
        }),
    ]);
};
export const usesProgressBarVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    
    
    
    return composition([
        layout({
            // children:
            ...children(listItemElm, [
                imports([
                    // variants:
                    usesBasicVariants(),
                    
                    // layouts:
                    sizes(),
                ]),
            ]),
        }),
    ]);
};
export const usesProgressBar = () => {
    return composition([
        variants([
            rule('&&', [ // makes `.ProgressBar` is more specific than `wrapperElm`
                imports([
                    // layouts:
                    usesProgressBarLayout(),
                    
                    // variants:
                    usesProgressBarVariants(),
                ]),
            ]),
        ]),
    ]);
};

export const useProgressBarSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesProgressBar(),
        ]),
    ]),
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // sizes:
        minInlineSize        : '10rem',
        minBlockSize         : 'unset',
        
        minInlineSizeBlock   : 'unset',
        minBlockSizeBlock    : '10rem',
    };
}, { prefix: 'prgs' });



// react components:

export interface ProgressProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>,
        
        // layouts:
        OrientationVariant
{
}
export function Progress<TElement extends HTMLElement = HTMLElement>(props: ProgressProps<TElement>) {
    // styles:
    const sheet = useProgressSheet();
    
    
    
    // variants:
    const orientationVariant    = useOrientationVariant(props);
    const orientationHorizontal = (orientationVariant.class === 'inline');
    
    
    
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null] }
            semanticRole={props.semanticRole ?? 'group'}
            
            aria-orientation={props['aria-orientation'] ?? (orientationHorizontal ? 'horizontal' : 'vertical')}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
        >
            { props.children }
        </Basic>
    );
}

export type { ListStyle, ListVariant }
export type { OrientationName, OrientationVariant }



export interface ProgressBarProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicProps<TElement>
{
    // values:
    value?    : string | number
    min?      : string | number
    max?      : string | number
}
export function ProgressBar<TElement extends HTMLElement = HTMLElement>(props: ProgressBarProps<TElement>) {
    // styles:
    const sheet = useProgressBarSheet();
    
    
    
    // fn props:
    const valueFn    : number  = parseNumber(props.value)  ?? 0;
    const minFn      : number  = parseNumber(props.min)    ?? 0;
    const maxFn      : number  = parseNumber(props.max)    ?? 100;
    const negativeFn : boolean = (maxFn < minFn);
    const valueRatio : number  = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    // progressBar vars:
    const [, , progressBarVarDecls] = usesProgressBarVars();
    
    
    
    // jsx:
    return (
        <Element
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]       }
            semanticRole={props.semanticRole ?? 'progressbar'}
            
            
            aria-valuenow={props['aria-valuenow'   ] ?? valueFn}
            aria-valuemin={props['aria-valuemin'   ] ?? (negativeFn ? maxFn : minFn)}
            aria-valuemax={props['aria-valuemax'   ] ?? (negativeFn ? minFn : maxFn)}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [progressBarVarDecls.progressBarValueRatio]: valueRatio,
            }}
        >
            <Basic<TElement>
                // other props:
                {...props}
                
                
                // variants:
                mild={props.mild ?? false}
            />
        </Element>
    );
}
