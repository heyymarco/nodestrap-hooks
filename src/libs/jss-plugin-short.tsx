// jss   (builds css  using javascript):
import type {
    Plugin,
    JssStyle,

    Rule,
    StyleSheet,
}                           from 'jss'           // base technology of our nodestrap components



const shorts: { [key: string]: string } = {
    foreg        : 'color',
    backg        : 'background',
    'backg-clip' : 'background-clip',
    anim         : 'animation',
    'gap-x'      : 'column-gap',
    'gap-y'      : 'row-gap',
};

export default function pluginShort(): Plugin { return {
    onProcessStyle: (style: JssStyle & { [key: string]: JssStyle[keyof JssStyle] }, rule: Rule, sheet?: StyleSheet): JssStyle => {
        for (const name in style) {
            if (name in shorts) {
                // set the expanded name:
                style[shorts[name]] = style[name];

                // delete the original name:
                delete style[name];
            } // if
        } // for



        return style;
    },
}}