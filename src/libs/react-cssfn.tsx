// react:
import {
    useEffect,
    useLayoutEffect,
}                           from 'react'         // base technology of our cssfn components

// jss:
import {
    // general types:
    Classes,
    Styles,

    SheetsManager,
}                           from 'jss'           // base technology of our cssfn components

// cssfn:
import type {
    Factory,
    ProductOrFactory,
}                           from './types'       // cssfn's types
import {
    // general types:
    ClassName,
    ClassList,

    
    // styles:
    createJssSheet,

    
    // cssfn hooks:
    usesCssfn,
}                           from './cssfn'       // cssfn core

// others libs:
import {
    isBrowser,
}                           from 'is-in-browser'



// hooks:

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

const styleSheetManager = new SheetsManager(); // caches & manages styleSheets usage, attached to dom when in use and detached from dom when not in use
export const createUseJssSheet = <TClassName extends ClassName = ClassName>(styles: ProductOrFactory<Styles<TClassName>>): Factory<Classes<TClassName>> => {
    const styleSheetId  = {}; // a simple object for the styleSheet's identifier (by reference)
    
    // create a new styleSheet using our pre-configured `customJss`:
    const styleSheet = createJssSheet(styles);
    
    // register to `styleSheetManager` to be cached and also to be able to attach/detach to/from dom:
    styleSheetManager.add(styleSheetId, styleSheet);
    
    
    
    return (): Classes<TClassName> => {
        useIsomorphicLayoutEffect(() => {
            // setups:
            
            // notify `styleSheetManager` that the `styleSheet` is being used
            // the `styleSheetManager` will attach the `styleSheet` to dom if one/more `styleSheet` users exist.
            styleSheetManager.manage(styleSheetId);
            
            
            
            // cleanups:
            return () => {
                // notify `styleSheetManager` that the `styleSheet` is no longer being used
                // the `styleSheetManager` will detach the `styleSheet` from dom if no `styleSheet` user exists.
                styleSheetManager.unmanage(styleSheetId);
            };
        }, []);



        // here the ready to use `styleSheet`'s classes:
        return styleSheet.classes;
    };
}
export const createUseSheet    = <TClassName extends ClassName = ClassName>(classes: ProductOrFactory<ClassList<TClassName>>): Factory<Classes<TClassName>> => {
    return createUseJssSheet(
        () => usesCssfn(classes)
    );
}
