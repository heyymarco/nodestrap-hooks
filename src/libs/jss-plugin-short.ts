// jss:
import type {
    Plugin,
    JssStyle,

    Rule,
    StyleSheet,
}                           from 'jss'           // base technology of our cssfn components



const shorts: Record<string, string> = {
    foreg       : 'color',
    backg       : 'background',
    'backgClip' : 'backgroundClip',
    anim        : 'animation',
    transf      : 'transform',
    'gapX'      : 'columnGap',
    'gapY'      : 'rowGap',
    'gapInline' : 'columnGap',
    'gapBlock'  : 'rowGap',
};

const renameProps = (style: JssStyle): JssStyle => {
    // stores the style's entries __only_if__ the modification is needed:
    let styleArrLazy : [string, any][]|null = null;
    
    
    
    for (const [propName, propIndex] of Object.keys(style).map((propName, propIndex) => [propName, propIndex] as const)) {
        if (!(propName in shorts)) continue; // not in list => ignore
        
        
        
        /*
            initialize styleArrLazy (if was not initialized).
            
            convert LiteralObject to Array, so the prop order preserved.
            the order of the prop is guaranteed to be __preserved__
            so to rename the prop, just search with known `propIndex`.
        */
        if (!styleArrLazy) styleArrLazy = Object.entries(style);
        
        // set the expanded propName:
        styleArrLazy[propIndex][0] = shorts[propName];
    } // for
    
    
    
    if (styleArrLazy) return Object.fromEntries(styleArrLazy); // has changed => return the modified
    return style; // no changes => return the original
};



const onProcessStyle = (style: JssStyle, rule: Rule, sheet?: StyleSheet): JssStyle => {
    return renameProps(style);
}

const onChangeValue = (propValue: string, propName: string, rule: Rule): string|null|false => {
    if (!(propName in shorts)) return propValue; // not in list => ignore
    
    
    
    (rule as any).prop(shorts[propName], propValue); // add the modified name
    return null; // delete the original name
};

export default function pluginShort(): Plugin { return {
    onProcessStyle,
    onChangeValue,
}}