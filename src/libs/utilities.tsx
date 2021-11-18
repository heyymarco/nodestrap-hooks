// react:
import {
    default as React,
}                           from 'react'         // base technology of our cssfn components



// utilities:

export const isTypeOf = <TProps,>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>): element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>> => {
    return (
        React.isValidElement<TProps>(element)
        &&
        (
            (element.type === funcComponent)
            ||
            (
                (typeof(element.type) === 'function')
                &&
                element.type.prototype
                &&
                funcComponent.prototype
                &&
                (
                    (element.type.prototype === funcComponent.prototype)
                    ||
                    (element.type.prototype instanceof funcComponent)
                )
            )
        )
    );
};

export const setRef = <TElement extends HTMLElement>(elmRef: React.Ref<TElement>|undefined, elm: TElement|null) => {
    if (elmRef) {
        if (typeof(elmRef) === 'function') {
            elmRef(elm);
        }
        else {
            (elmRef as React.MutableRefObject<TElement|null>).current = elm;
        } // if
    } // if
};

const isSingleValue = (num: string|ReadonlyArray<string>): num is string => (typeof(num) === 'string') || (Array.isArray(num) && (num.length === 1));
export const parseNumber = (num: number|string|ReadonlyArray<string>|null|undefined): number|null => {
    if (typeof(num) === 'number') return num;
    if (!num) return null;
    
    
    
    if (!isSingleValue(num)) return null;
    if (!num) return null;
    
    
    
    num = Number.parseFloat(num);
    if (isNaN(num)) return null;
    return num;
};
