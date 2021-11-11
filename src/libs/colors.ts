// cssfn:
import type {
    Optional,
    Dictionary,
    ValueOf,
    DictionaryOf,
}                           from './types'      // cssfn's types
import type {
    Prop,
}                           from './css-types'  // ts defs support for jss
import createCssConfig      from './css-config' // Stores & retrieves configuration using *css custom properties* (css variables)

// other libs:
import Color                from 'color'        // color utilities



// color fn:

// might be removed if *css 4* color() -or- color-mod() was released

const textColor = (color: Color) => (color.isLight() ? themes.dark : themes.light)
const thinLevel = 0.5
const thinColor = (color: Color) => color.alpha(thinLevel)
const mildLevel = 0.8
const mildColor = (color: Color) => color.mix(page1.backg as Color, mildLevel)
const boldLevel = 0.8
const boldColor = (color: Color) => color.mix(page2.foreg as Color, boldLevel)



//#region define colors by group
const basics = {
    blue     : Color('#0d6efd'),
    indigo   : Color('#6610f2'),
    purple   : Color('#6f42c1'),
    pink     : Color('#d63384'),
    red      : Color('#dc3545'),
    orange   : Color('#fd7e14'),
    yellow   : Color('#ffc107'),
    green    : Color('#198754'),
    teal     : Color('#20c997'),
    cyan     : Color('#0dcaf0'),

    black    : Color('#000000'),
    white    : Color('#ffffff'),
    gray     : Color('#6c757d'),
    grayDark : Color('#343a40'),
};

const themes = {
    primary   : basics.blue,
    secondary : basics.gray,
    success   : basics.green,
    info      : basics.cyan,
    warning   : basics.yellow,
    danger    : basics.red,
    light     : Color('#f8f9fa'),
    dark      : Color('#212529'),
};

const page1 = {
    backg : basics.white,
};

const page2 = {
    foreg : textColor(page1.backg),
};
const page3 = {
    backgThin : thinColor(page1.backg),
    backgMild : mildColor(page1.backg),
    backgBold : boldColor(page1.backg),

    foregThin : thinColor(page2.foreg),
    foregMild : mildColor(page2.foreg),
    foregBold : boldColor(page2.foreg),
};

const themesText = {
    primaryText   : textColor(themes.primary),
    secondaryText : textColor(themes.secondary),
    successText   : textColor(themes.success),
    infoText      : textColor(themes.info),
    warningText   : textColor(themes.warning),
    dangerText    : textColor(themes.danger),
    lightText     : textColor(themes.light),
    darkText      : textColor(themes.dark),
};

const themesThin = {
    primaryThin   : thinColor(themes.primary),
    secondaryThin : thinColor(themes.secondary),
    successThin   : thinColor(themes.success),
    infoThin      : thinColor(themes.info),
    warningThin   : thinColor(themes.warning),
    dangerThin    : thinColor(themes.danger),
    lightThin     : thinColor(themes.light),
    darkThin      : thinColor(themes.dark),
};

const themesMild = {
    primaryMild   : mildColor(themes.primary),
    secondaryMild : mildColor(themes.secondary),
    successMild   : mildColor(themes.success),
    infoMild      : mildColor(themes.info),
    warningMild   : mildColor(themes.warning),
    dangerMild    : mildColor(themes.danger),
    lightMild     : mildColor(themes.light),
    darkMild      : mildColor(themes.dark),
};

const themesBold = {
    primaryBold   : boldColor(themes.primary),
    secondaryBold : boldColor(themes.secondary),
    successBold   : boldColor(themes.success),
    infoBold      : boldColor(themes.info),
    warningBold   : boldColor(themes.warning),
    dangerBold    : boldColor(themes.danger),
    lightBold     : boldColor(themes.light),
    darkBold      : boldColor(themes.dark),
};

const allColors = {
    ...basics,
    ...themes,
    ...page1,
    ...page2,
    ...page3,
    ...themesText,
    ...themesThin,
    ...themesMild,
    ...themesBold,
};
//#endregion define colors by group



export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    type ColorList  = typeof allColors;
    type ColorProxy = { [key in keyof ColorList]: Prop.Color };
    return new Proxy(allColors as unknown as ColorProxy, {
        get: (t, prop: string) => {
            const color = (allColors as Dictionary<Color>)[prop];
            if (color === undefined) return undefined;
            return stringColor(color);
        },
    });
}, { prefix: 'col' });
export { cssProps as colors, cssProps as default }
const colors = cssProps;



const createProxy = <TColorGroup extends { [key in keyof TColorGroup]: Color },>(colorGroup: TColorGroup) => new Proxy(colorGroup as unknown as { [key in keyof TColorGroup]: ValueOf<typeof colors> }, {
    get: (cg, prop: string): (ValueOf<typeof colors>|undefined) => {
        if (!(prop in colorGroup)) return undefined; // not found

        return (colors as DictionaryOf<typeof colors>)[prop];
    },
    set: (cg, prop: string, newValue: ValueOf<typeof colors>) => {
        if (prop in colorGroup) { // already exists => update
            (colors as DictionaryOf<typeof colors>)[prop] = newValue;
        }
        else { // create a new one and stored both to colorGroup & colors
            const colorValue = Color(newValue);

            (colorGroup as Dictionary<Color>)[prop]   = colorValue;

            (cssVals as DictionaryOf<typeof cssVals>)[prop] = (colorValue.alpha() === 1) ? colorValue.hex() : colorValue.toString();
        } // if
        

        return true;
    },
});

const themesProxy     = createProxy(themes);
const themesTextProxy = createProxy(themesText);

export {
    themesProxy     as themes,
    themesTextProxy as themesText,
}



// utilities:
const stringColor = (color: Color) => (color.alpha() === 1) ? color.hex() : color.toString();

export const defineTheme = (name: string, color: Optional<Color|string>) => {
    if (!color) {
        delete (themes     as DictionaryOf<typeof themes>    )[   name      ];
        delete (themesText as DictionaryOf<typeof themesText>)[`${name}Text`];
        delete (themesThin as DictionaryOf<typeof themesThin>)[`${name}Thin`];
        delete (themesMild as DictionaryOf<typeof themesMild>)[`${name}Mild`];
        delete (themesBold as DictionaryOf<typeof themesBold>)[`${name}Bold`];
        
        (cssVals as DictionaryOf<typeof cssVals>)[   name      ] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Text`] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Thin`] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Mild`] = undefined as any;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Bold`] = undefined as any;
    }
    else {
        if (typeof(color) === 'string') color = Color(color);
        
        const theme     = color            as any;
        const themeText = textColor(color) as any;
        const themeThin = thinColor(color) as any;
        const themeMild = mildColor(color) as any;
        const themeBold = boldColor(color) as any;
        
        (themes     as DictionaryOf<typeof themes>    )[   name      ] = theme;
        (themesText as DictionaryOf<typeof themesText>)[`${name}Text`] = themeText;
        (themesThin as DictionaryOf<typeof themesThin>)[`${name}Thin`] = themeThin;
        (themesMild as DictionaryOf<typeof themesMild>)[`${name}Mild`] = themeMild;
        (themesBold as DictionaryOf<typeof themesBold>)[`${name}Bold`] = themeBold;
        
        (cssVals as DictionaryOf<typeof cssVals>)[   name      ] = theme;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Text`] = themeText;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Thin`] = themeThin;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Mild`] = themeMild;
        (cssVals as DictionaryOf<typeof cssVals>)[`${name}Bold`] = themeBold;
    } // if
};
