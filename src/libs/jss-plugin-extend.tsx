// jss   (builds css  using javascript):
import type {
    Plugin,
    JssStyle,

    Rule,
    StyleSheet,
}                           from 'jss'           // base technology of our nodestrap components

// others:
import warning              from 'tiny-warning'



// utilities:
type LiteralObject    = { [key: string]: any }
const isLiteralObject = (object: any): object is LiteralObject => object && (typeof(object) === 'object') && !Array.isArray(object);



const mergeExtendProp    = (currentObject: LiteralObject, rule?: Rule, sheet?: StyleSheet): void => {
    const extend = currentObject.extend;
    if (!extend) return; // nothing to extend


    
    // if extend is an array => loop it
    // otherwise => convert to single array => loop it
    for (const singleExtend of (Array.isArray(extend) ? extend : [extend])) {
        //#region extend using a literalObject
        if (isLiteralObject(singleExtend)) {
            mergeComplex(currentObject, singleExtend, rule, sheet);
        } // if
        //#endregion extend using a literalObject
        
        
        
        //#region extend using a rule name
        else if (typeof(singleExtend) === 'string') {
            if (sheet) {
                const refRule = sheet.getRule(singleExtend);
                if (refRule) {
                    if (refRule === rule) {
                        warning(false, `[JSS] A rule tries to extend itself \n${rule.toString()}`);
                        
                        // todo detect circular extend, causing infinite recursive
                    }
                    else {
                        // now it seems the `refRule` is not itself nor circular ref
                        // warning: calling `mergeComplex` might causing infinite recursive if the `refRule` it itself or circular ref
                        
                        const ruleStyle = (refRule.options?.parent as any)?.rules?.raw?.[singleExtend] as JssStyle|null|undefined;
                        if (ruleStyle) {
                            mergeComplex(currentObject, ruleStyle, rule, sheet);
                        } // if
                    } // if
                } // if
            } // if
        } // if
        //#endregion extend using a rule name
    } // for



    // the `extend` has been completed => remove unused `extend` prop:
    // delete currentObject.extend;
    currentObject.extend = null; // maybe it's safer not to mutate the current rule, instead set it to `null`
}
const mergeLiteralObject = (currentObject: LiteralObject, newObject: LiteralObject, rule?: Rule, sheet?: StyleSheet): void => {
    for (const [name, newValue] of Object.entries(newObject)) { // loop through newObject's props
        // `extend` is a special prop that we don't handle here:
        if (name === 'extend') continue; // skip `extend` prop



        if (!isLiteralObject(newValue)) {
            // `newValue` is not a `LiteralObject` => unmergeable => add/overwrite `newValue` into `currentObject`:
            currentObject[name] = newValue; // add/overwrite
        }
        else {
            // `newValue` is a `LiteralObject` => possibility to merge with `currentValue`

            let currentValue = currentObject[name];
            if (!isLiteralObject(currentValue)) {
                // `currentValue` is not a `LiteralObject` => unmergeable => add/overwrite `newValue` into `currentObject`:
                currentObject[name] = newValue; // add/overwrite
            }
            else {
                // both `newValue` & `currentValue` are `LiteralObject` => merge them recursively (deeply):

                currentValue = {...currentValue}; // clone the `currentValue` to avoid side effect, because the `currentValue` is not **the primary object** we're working on
                mergeComplex(currentValue, newValue, rule, sheet);
                currentObject[name] = currentValue; // set the mutated `currentValue` back to `currentObject`
            } // if
        } // if
    } // for
}
const mergeComplex       = (currentObject: LiteralObject, newObject: LiteralObject, rule?: Rule, sheet?: StyleSheet): void => {
    newObject = {...newObject}; // clone the `newObject` to avoid side effect, because the `newObject` is not **the primary object** we're working on
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