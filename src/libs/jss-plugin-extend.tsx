// jss   (builds css  using javascript):
import type {
    Plugin,
    JssStyle,

    Rule,
    StyleSheet,
}                           from 'jss'           // base technology of our nodestrap components



type LiteralObject    = { [key: string]: any }
const isLiteralObject = (object: any): object is LiteralObject => object && (typeof(object) === 'object') && !Array.isArray(object);



const mergeExtendProp    = (currentObject: LiteralObject, rule?: Rule, sheet?: StyleSheet): void => {
    const extend = currentObject.extend;
    if (!extend) return; // nothing to extend


    
    // if extend is an array => loop it
    // otherwise => convert to single array => loop it
    for (const singleExtend of (Array.isArray(extend) ? extend : [extend])) {
        // extend using a literalObject:
        if (isLiteralObject(singleExtend)) {
            mergeComplex(currentObject, singleExtend, rule, sheet);
        } // if
        
        
        
        // extend using a rule name:
        else if (typeof(singleExtend) === 'string') {
            if (sheet) {
                const rule = sheet.getRule(singleExtend);
                if (rule) {
                    // todo detect circular extend, causing infinite loop
    
                    const ruleStyle = (rule.options?.parent as any)?.rules?.raw?.[singleExtend] as JssStyle|null|undefined;
                    if (ruleStyle) {
                        mergeComplex(currentObject, ruleStyle, rule, sheet);
                    } // if
                } // if
            } // if
        } // if
    } // for



    // extended => remove unused extend prop:
    // delete currentObject.extend;
    currentObject.extend = null; // maybe it's safer not to mutate the rule, instead set it to null
}
const mergeLiteralObject = (currentObject: LiteralObject, newObject: LiteralObject, rule?: Rule, sheet?: StyleSheet): void => {
    for (const [name, newValue] of Object.entries(newObject)) {
        // `extend` is a special prop that we don't handle here:
        if (name === 'extend') continue;



        if (!isLiteralObject(newValue)) {
            // `newValue` is not a `LiteralObject` => unmergeable => add/overwrite `newValue` into `currentObject`:
            currentObject[name] = newValue;
        }
        else {
            // `newValue` is a `LiteralObject` => possibility to merge with `currentValue`

            const currentValue = currentObject[name];
            if (!isLiteralObject(currentValue)) {
                // `currentValue` is not a `LiteralObject` => unmergeable => add/overwrite `newValue` into `currentObject`:
                currentObject[name] = newValue;
            }
            else {
                // both `newValue` & `currentValue` are `LiteralObject` => merge them recursively (deeply):
                mergeComplex(currentValue, newValue, rule, sheet);
            } // if
        } // if
    } // for
}
const mergeComplex       = (currentObject: LiteralObject, newObject: LiteralObject, rule?: Rule, sheet?: StyleSheet): void => {
    mergeExtendProp(newObject, rule, sheet);
    mergeLiteralObject(currentObject, newObject, rule, sheet);
}



export default function pluginExtend(): Plugin { return {
    onProcessStyle: (style: JssStyle & { [key: string]: JssStyle[keyof JssStyle] }, rule: Rule, sheet?: StyleSheet): JssStyle => {
        mergeExtendProp(style, rule, sheet);



        return style;
    },

    onChangeValue: (value: string, prop: string, rule: Rule): string|null|false => {
        if (prop !== 'extend') return value;

        return null;
    },
}}