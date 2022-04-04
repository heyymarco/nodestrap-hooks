// react:
import {
    default as React,
    useState,
    useRef,
    useRef as _useRef, // avoids eslint check
    createContext,
    useContext,
    
    Children,
    isValidElement,
    cloneElement,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    SingleOrArray,
}                           from './types'       // cssfn's types

// nodestrap utilities:
import {
    useIsomorphicLayoutEffect,
}                           from './hooks'
import {
    // utilities:
    setRef,
    parseNumber,
}                           from './utilities'



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
const isOverflowable = (element: Element): boolean => {
    const {
        display,
        overflow,
    } = getComputedStyle(element);
    if (display === 'none') return false;
    if (overflow !== 'visible') return false;
    
    return true;
};

const hasOverflowedDescendant = (minLeft: number|null, minTop: number|null, maxRight: number|null, maxBottom: number|null, element: Element): boolean => {
    if (Array.from(element.children).some((child) => {
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
        
        
        
        return hasOverflowedDescendant(minLeftShift, minTopShift, maxRightShift, maxBottomShift, child); // nested search
    })) return true; // found
    
    return false; // not found
};

export const isOverflowed = (element: Element): boolean => {
    if (!isOverflowable(element)) return false;
    
    
    
    const {
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
    } = element;
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
    } = getComputedStyle(element);
    const paddingLeft   = (parseNumber(paddingLeftStr  ) ?? 0);
    const paddingTop    = (parseNumber(paddingTopStr   ) ?? 0);
    const paddingRight  = (parseNumber(paddingRightStr ) ?? 0);
    const paddingBottom = (parseNumber(paddingBottomStr) ?? 0);
    
    
    
    const {
        left   : elmLeft,
        top    : elmTop,
        right  : elmRight,
        bottom : elmBottom,
    } = element.getBoundingClientRect();
    const minLeft   = Math.round(elmLeft   + paddingLeft  );
    const minTop    = Math.round(elmTop    + paddingTop   );
    const maxRight  = Math.round(elmRight  - paddingRight );
    const maxBottom = Math.round(elmBottom - paddingBottom);
    
    
    
    return hasOverflowedDescendant(minLeft, minTop, maxRight, maxBottom, element);
    //#endregion handle padding right & bottom
};



// hooks:
export interface ResponsiveOptions {
    // responsives:
    horzResponsive? : boolean
    vertResponsive? : boolean
}
export const useResponsive = (elmRefs: SingleOrArray<React.RefObject<Element>|null>, options: ResponsiveOptions = {}, resizeCallback: () => void) => {
    // options:
    const {
        horzResponsive = true,
        vertResponsive = false,
    } = options;
    
    
    
    // states:
    const prevSizes = useRef<(number | null)[]|undefined>(undefined);
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // setups:
        const childrenRefs = [elmRefs].flat().map((elmRef) => elmRef?.current ?? null);
        
        const handleResize = () => {
            const overflowableChildren = (
                childrenRefs
                .map((child) => (child && isOverflowable(child) && child) || null)
            );
            const trackWidths  = horzResponsive ? (
                overflowableChildren
                .map((child) => child && child.clientWidth)
            ) : [];
            const trackHeights = vertResponsive ? (
                overflowableChildren
                .map((child) => child && child.clientHeight)
            ) : [];
            const trackSizes   = [...trackWidths, ...trackHeights];
            
            const oldSizes = prevSizes.current;
            if (!((): boolean => {
                if (oldSizes === undefined) return false; // never assigned => difference detected
                
                if (trackSizes.length !== oldSizes.length) return false; // difference detected
                
                for (let i = 0; i < trackSizes.length; i++) {
                    if (trackSizes[i] !== oldSizes[i]) return false; // difference detected
                } // for
                
                return true; // no differences detected
            })()) {
                prevSizes.current = trackSizes;
                
                if (oldSizes !== undefined) { // ever assigned => trigger re-assigned
                    resizeCallback();
                } // if
            } // if
        };
        
        const observer = new ResizeObserver(handleResize);
        const sizeOptions : ResizeObserverOptions = { box: 'content-box' };
        childrenRefs.forEach((child) => child && observer.observe(child, sizeOptions));
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, []); // runs once
};



// react components:

export type Fallbacks<T> = T[] & { 0: T }
export interface ResponsiveProviderProps<TFallback>
    extends
        ResponsiveOptions
{
    // responsives:
    fallbacks       : Fallbacks<TFallback>
    
    // children:
    children        : React.ReactNode | ((fallback: TFallback) => React.ReactNode)
}
export function ResponsiveProvider<TFallback>(props: ResponsiveProviderProps<TFallback>) {
    // rest props:
    const {
        // responsives:
        fallbacks,
        horzResponsive = true,
        vertResponsive = false,
        
        
        // children:
        children,
    } = props;
    
    
    
    // states:
    const [currentFallbackIndex, setCurrentFallbackIndex] = useState<number>(0);
    
    
    
    // fn props:
    const maxFallbackIndex  = (fallbacks.length - 1);
    const currentFallback   = (currentFallbackIndex <= maxFallbackIndex) ? fallbacks[currentFallbackIndex] : fallbacks[maxFallbackIndex];
    
    const childrenAbs       = (typeof(children) !== 'function') ? children : children(currentFallback);
    const childrenWithRefs  = Children.toArray(childrenAbs).map((child) => {
        if (!isValidElement(child)) return {
            child : child,
            ref   : null,
        };
        
        
        
        const childRef                 = _useRef<HTMLElement>(null);
        const refName                  = (typeof(child.type) !== 'function') ? 'ref' : 'outerRef';
        const mutatedChild             = cloneElement(child, {
            [refName]: (elm: HTMLElement) => {
                setRef((child as any)[refName], elm);
                
                setRef(childRef               , elm);
            },
        });
        
        return {
            child : mutatedChild,
            ref   : childRef,
        };
    });
    
    
    
    // dom effects:
    const childrenRefs = childrenWithRefs.map(({ ref }) => ref);
    useResponsive(childrenRefs, { horzResponsive, vertResponsive }, () => {
        // console.log('resize');
        
        console.log('reset', currentFallbackIndex);
        setCurrentFallbackIndex(0);
    });
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (currentFallbackIndex >= maxFallbackIndex) return; // maximum fallbacks has already reached => nothing more fallback
        
        
        
        const hasOverflowed = childrenRefs.some((ref): boolean => {
            const child = ref?.current;
            if (!child) return false;
            return isOverflowed(child);
        });
        if (hasOverflowed) {
            setCurrentFallbackIndex(currentFallbackIndex + 1);
        } // if
    }); // runs on every render & DOM has been updated
    
    
    
    // jsx:
    console.log('current', currentFallback);
    return (
        <Context.Provider value={{ currentFallback }}>
            { childrenWithRefs.map(({ child }) => child) }
        </Context.Provider>
    );
}
export { ResponsiveProvider as default }
