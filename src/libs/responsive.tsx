// react:
import {
    default as React,
    useState,
    useRef as _useRef, // avoids eslint check
    createContext,
    useContext,
    
    Children,
    isValidElement,
    cloneElement,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap utilities:
import {
    useIsomorphicLayoutEffect,
}                           from './hooks'
import {
    // utilities:
    setRef,
    parseNumber,
}                           from './utilities'
import {
    // hooks:
    SizeOptions,
    useElementSize as _useElementSize, // avoids eslint check
}                           from './dimensions'



// contexts:

export interface Responsive<TFallback> {
    currentFallback : TFallback
}

/**
 * A react context for responsive stuff.
 */
export const Context = createContext<Responsive<any>>(/*defaultValue :*/{
    currentFallback : undefined,
});
Context.displayName  = 'Responsive';



// hooks:

export const useResponsiveCurrentFallback = <TFallback extends {} = any>() => {
    // contexts:
    const responsiveContext = useContext(Context);
    return responsiveContext.currentFallback as TFallback;
};



// utilities:
const isOverflowable = (elm: Element): boolean => {
    const {
        display,
        overflow,
    } = getComputedStyle(elm);
    if (display === 'none') return false;
    if (overflow !== 'visible') return false;
    
    return true;
};

const someOverflowedDescendant = (minLeft: number|null, minTop: number|null, maxRight: number|null, maxBottom: number|null, parent: Element): boolean => {
    if (Array.from(parent.children).some((child) => {
        if (!isOverflowable(child)) return false;
        
        let {
            left   : childLeft,
            top    : childTop,
            right  : childRight,
            bottom : childBottom
        } = child.getBoundingClientRect();
        childLeft   = Math.round(childLeft  );
        childTop    = Math.round(childTop   );
        childRight  = Math.round(childRight );
        childBottom = Math.round(childBottom);
        
        const {
            marginLeft   : marginLeftStr,
            marginTop    : marginTopStr,
            marginRight  : marginRightStr,
            marginBottom : marginBottomStr,
        } = getComputedStyle(child);
        const marginLeft     = (parseNumber(marginLeftStr  ) ?? 0);
        const marginTop      = (parseNumber(marginTopStr   ) ?? 0);
        const marginRight    = (parseNumber(marginRightStr ) ?? 0);
        const marginBottom   = (parseNumber(marginBottomStr) ?? 0);
        const minLeftShift   = (minLeft   === null) ? null : Math.round(minLeft   + marginLeft   );
        const minTopShift    = (minTop    === null) ? null : Math.round(minTop    + marginTop   );
        const maxRightShift  = (maxRight  === null) ? null : Math.round(maxRight  - marginRight  );
        const maxBottomShift = (maxBottom === null) ? null : Math.round(maxBottom - marginBottom );
        
        
        
        if (
            (
                (minLeftShift !== null)
                &&
                (childLeft  < minLeftShift)
            )
            ||
            (
                (minTopShift !== null)
                &&
                (childTop  < minTopShift)
            )
            ||
            (
                (maxRightShift !== null)
                &&
                (childRight  > maxRightShift)
            )
            ||
            (
                (maxBottomShift !== null)
                &&
                (childBottom > maxBottomShift)
            )
        ) {
            return true; // found
        } // if
        
        
        
        return someOverflowedDescendant(minLeftShift, minTopShift, maxRightShift, maxBottomShift, child); // nested search
    })) return true; // found
    
    return false; // not found
};



// caches:

const elementSizeOptions : SizeOptions = { box: 'content-box' };



// react components:

export type Fallbacks<T> = T[] & { 0: T }
export interface ResponsiveProviderProps<TFallback> {
    fallbacks : Fallbacks<TFallback>
    children  : React.ReactNode | ((fallback: TFallback) => React.ReactNode)
}
export function ResponsiveProvider<TFallback>(props: ResponsiveProviderProps<TFallback>) {
    // rest props:
    const {
        fallbacks,
        
        
        // children:
        children,
    } = props;
    
    
    
    // states:
    const [currentFallbackIndex, setCurrentFallbackIndex] = useState<number>(0);
    
    
    
    // fn props:
    const maxFallbackIndex  = (fallbacks.length - 1);
    const currentFallback   = (currentFallbackIndex <= maxFallbackIndex) ? fallbacks[currentFallbackIndex] : fallbacks[maxFallbackIndex];
    
    const childrenAbs       = (typeof(children) !== 'function') ? children : children(currentFallback);
    const childrenWithSizes = Children.toArray(childrenAbs).map((child) => {
        if (!isValidElement(child)) return {
            child : child,
            ref   : null,
            size  : null,
        };
        
        
        
        const childRef                 = _useRef<HTMLElement>(null);
        const [childSize, setChildRef] = _useElementSize(elementSizeOptions);
        const refName                  = (typeof(child.type) !== 'function') ? 'ref' : 'outerRef';
        const mutatedChild             = cloneElement(child, {
            [refName]: (elm: HTMLElement) => {
                setRef((child as any)[refName], elm);
                
                setRef(childRef               , elm);
                setRef(setChildRef            , elm);
            },
        });
        
        return {
            child : mutatedChild,
            ref   : childRef,
            size  : childSize,
        };
    });
    const sizes = (
        childrenWithSizes
        .flatMap(({ ref, size }) => (ref?.current && [size.width, size.height]) || [null, null])
    );
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        if (currentFallbackIndex === 0) return; // already been reseted
        
        
        
        // setups:
        setCurrentFallbackIndex(0);
    }, sizes); // resets currentFallbackIndex each time the sizes are changed

    useIsomorphicLayoutEffect(() => {
        if (currentFallbackIndex >= maxFallbackIndex) return; // maximum fallbacks has already reached => nothing more fallback
        
        
        
        const hasOverflowed = childrenWithSizes.some((childWithSize): boolean => {
            const {
                ref,
                size,
            } = childWithSize;
            const elm = ref?.current;
            if (!elm)                  return false; // ignore non-element-child or not-already-referenced-child
            if (!size)                 return false; // ignore non-element-child
            
            const {
                width  : clientWidth,
                height : clientHeight,
            } = size;
            if (clientWidth  === null) return false; // ignore not-already-calculated-child
            if (clientHeight === null) return false; // ignore not-already-calculated-child
            
            
            
            if (!isOverflowable(elm)) return false;
            
            
            
            const {
                scrollWidth,
                scrollHeight
            } = elm;
            if (
                (scrollWidth  > clientWidth ) // horz scrollbar detected
                ||
                (scrollHeight > clientHeight) // vert scrollbar detected
            ) {
                return true;
            }
            
            
            
            //#region handle padding right & bottom
            const {
                paddingLeft   : paddingLeftStr,
                paddingTop    : paddingTopStr,
                paddingRight  : paddingRightStr,
                paddingBottom : paddingBottomStr,
            } = getComputedStyle(elm);
            const paddingLeft   = (parseNumber(paddingLeftStr  ) ?? 0);
            const paddingTop    = (parseNumber(paddingTopStr   ) ?? 0);
            const paddingRight  = (parseNumber(paddingRightStr ) ?? 0);
            const paddingBottom = (parseNumber(paddingBottomStr) ?? 0);
            
            
            
            const {
                left   : elmLeft,
                top    : elmTop,
                right  : elmRight,
                bottom : elmBottom,
            } = elm.getBoundingClientRect();
            const minLeft   = Math.round(elmLeft   + paddingLeft  );
            const minTop    = Math.round(elmTop    + paddingTop   );
            const maxRight  = Math.round(elmRight  - paddingRight );
            const maxBottom = Math.round(elmBottom - paddingBottom);
            
            
            
            return someOverflowedDescendant(minLeft, minTop, maxRight, maxBottom, elm);
            //#endregion handle padding right & bottom
        });
        if (hasOverflowed) {
            setCurrentFallbackIndex(currentFallbackIndex + 1);
        } // if
    }); // run on every render & DOM has been updated
    
    
    
    // jsx:
    return (
        <Context.Provider value={{ currentFallback }}>
            { childrenWithSizes.map((childWithSize) => childWithSize.child) }
        </Context.Provider>
    );
}
export { ResponsiveProvider as default }
