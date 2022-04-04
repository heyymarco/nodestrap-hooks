// react:
import {
    useEffect,
    useLayoutEffect,
    useReducer,
}                           from 'react'         // base technology of our nodestrap components

// others libs:
import {
    isBrowser,
}                           from 'is-in-browser'



// hooks:

/**
 * A React helper hook for using `useLayoutEffect` with a fallback to a regular `useEffect` for environments where `useLayoutEffect` should not be used (such as server-side rendering).
 */
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;



const triggerRenderReducer = (indices: object, newIndices: void): object => {
    return {}; // update with a new object
};
export const useTriggerRender = () => {
    const [, setState] = useReducer(triggerRenderReducer, {});
    return setState;
};