// cssfn:
import type {
    SingleOrArray,
}                           from '../types'      // cssfn's types
import type {
    Prop,
    Cust,
}                           from '../css-types'  // ts defs support for jss
import {
    // general types:
    Selector,


    // styles:
    createCssfnStyle,


    // compositions:
    global,


    // layouts:
    layout,
    adjacentSiblings,


    // rules:
    variants,
    rule,
    isFirstChild,
    isLastChild,
    isNotLastChild,
}                           from '../cssfn'      // cssfn core
import {
    createCssConfig,


    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '../css-config' // Stores & retrieves configuration using *css custom properties* (css variables)
import gens                 from './general'



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        fontSize          : 'unset',
        fontSize1         : [['calc(', 2.25, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize2         : [['calc(', 2.00, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize3         : [['calc(', 1.75, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize4         : [['calc(', 1.50, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize5         : [['calc(', 1.25, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize6         : [['calc(', 1.00, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        
        fontFamily        : 'inherit' as Prop.FontFamily[]                              | Cust.Ref,
        fontWeight        : 500       as Prop.FontWeight                                | Cust.Expr,
        fontStyle         : 'inherit' as Prop.FontStyle                                 | Cust.Ref,
        textDecoration    : 'inherit' as Prop.TextDecoration                            | Cust.Ref,
        lineHeight        : 1.25      as Prop.LineHeight                                | Cust.Expr,
    
        foreg             : 'inherit' as Prop.Color                                     | Cust.Ref,
        
        marginBlockStart  : 0         as Prop.MarginBlockStart                          | Cust.Expr,
        marginBlockEnd    : '0.75em'  as Prop.MarginBlockEnd                            | Cust.Expr,
        marginInlineStart : 0         as Prop.MarginInlineStart                         | Cust.Expr,
        marginInlineEnd   : 0         as Prop.MarginInlineEnd                           | Cust.Expr,

        subOpacity        : 0.8       as Prop.Opacity                                   | Cust.Expr,
    };
}, { prefix: 'h' });
export default cssProps;



// create a new styleSheet & attach:
export const usesLevelingRule = <TCssProps extends typeof cssProps, TCssDecls extends typeof cssDecls>(cssProps: TCssProps, cssDecls: TCssDecls, selector: SingleOrArray<Selector>, levels = [1,2,3,4,5,6]) => {
    const selectors = (Array.isArray(selector) ? selector : [selector]);
    const selectorsWithLevels =
        levels
        .map((level) => selectors.map((selector) => `${selector}${level}`))
        .flat(/*depth: */1);
    
    
    
    return [
        // global rule for h1-h6:
        rule(selectorsWithLevels, [
            layout({
                // layouts:
                display : 'block',
    
    
    
                ...adjacentSiblings(selectorsWithLevels, [
                    /*
                     * treats subsequent headings as subtitles
                     * make it closer to the main heading
                     * make it further to the content
                    */
                    layout({
                        // appearances:
                        opacity: cssProps.subOpacity,
        
        
        
                        // spacings:
                        // make subtitle closer to the main heading:
                        marginBlockStart: [['calc(0px -', cssProps.marginBlockEnd, ')']], // cancel-out parent's marginBlockEnd with negative marginBlockStart
                    }),
                    variants([
                        isNotLastChild([
                            layout({
                                // spacings:
                                // make subtitle further to the content:
                                marginBlockEnd: cssProps.marginBlockEnd,
                            }),
                        ]),
                    ]),
                ]),
    
    
    
                // customize:
                ...usesGeneralProps(cssProps),
            }),
            variants([
                isFirstChild([
                    layout({
                        // spacings:
                        marginBlockStart : 0, // kill the first marginBlockStart for the first element
                    }),
                ]),
                isLastChild([
                    layout({
                        // spacings:
                        marginBlockEnd   : 0, // kill the last marginBlockEnd for the last element
                    }),
                ]),
            ]),
        ]),

        
        
        // individual rule for each h1-h6:
        ...levels
        .map((level) => rule(selectors.map((selector) => `${selector}${level}`), [
            layout({
                // customize with propName{level}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, `${level}`)),
            }),
        ])),
    ];
};
createCssfnStyle(() => [
    global([
        usesLevelingRule(cssProps, cssDecls, ['h', '.h']),
    ]),
])
.attach();
