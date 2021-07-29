import type { Plugin, Rule, JssStyle, StyleSheet } from 'jss';



const shorthands: { [key: string]: string } = {
    foreg        : 'color',
    backg        : 'background',
    'backg-clip' : 'background-clip',
    anim         : 'animation',
    'gap-x'      : 'column-gap',
    'gap-y'      : 'row-gap',
};

const plugin : Plugin = {
    onProcessStyle: (style: JssStyle & {[key: string]: JssStyle[keyof JssStyle]}, rule: Rule, sheet?: StyleSheet): JssStyle => {
        for (const name in style) {
            if (name in shorthands) {
                // set the expanded name:
                style[shorthands[name]] = style[name];

                // delete the original name:
                style[name] = null;
            }
        } // for



        return style;
    },
};

export default function normalizeShorthands(): Plugin {
    return plugin;
}