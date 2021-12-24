// react:
import {
    useEffect,
    useLayoutEffect,
    useState,
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

const sheetManager = new SheetsManager(); // caches & manages sheets usage, attached to dom when in use and detached from dom when not in use
export const createUseJssSheet = <TClassName extends ClassName = ClassName>(styles: ProductOrFactory<Styles<TClassName>>, sheetId?: string): Factory<Classes<TClassName>> => {
    const sheetIdObj = {}; // a simple object for the sheet's identifier (by reference)
    // console.log('declare sheet', sheetId);
    
    
    
    return (): Classes<TClassName> => {
        // no need to use `useMemo` because fetching from `sheetManager` is inexpensive
        
        
        
        // take from an existing cached sheet (if any):
        const sheet = sheetManager.get(sheetIdObj);
        
        const sheetLazy = (
            sheet
            ?
            { sheet } // inexpensive operation
            :
            {
                sheet: () => { // expensive operation & lazy
                    // create a new sheet using our pre-configured `customJss`:
                    const newSheet = createJssSheet(styles, sheetId);
                    
                    
                    
                    // register to `sheetManager` to be cached and also to be able to attach/detach to/from dom:
                    sheetManager.add(sheetIdObj, newSheet);
                    
                    
                    
                    // here the ready to use sheet:
                    // console.log('create sheet', sheetId);
                    return newSheet;
                }
            }
        );
        
        
        
        const [referenced, setReferenced] = useState(false);
        useIsomorphicLayoutEffect(() => {
            if (!referenced) return; // not marked as referenced => do not manage
            // console.log('ref sheet', sheetId);
            
            
            
            // notify `sheetManager` that the `sheet` is being used
            // the `sheetManager` will attach the `sheet` to dom if one/more `sheet` users exist.
            sheetManager.manage(sheetIdObj);
            
            
            
            // cleanups:
            return () => {
                // notify `sheetManager` that the `sheet` is no longer being used
                // the `sheetManager` will detach the `sheet` from dom if no `sheet` user exists.
                sheetManager.unmanage(sheetIdObj);
            };
        }, [referenced]);
        
        
        
        // here the ready to use `sheet`'s classes:
        return (new Proxy(sheetLazy, {
            get: (_unusedObj, propName: string) => {
                if (propName === '$$typeof') return undefined; // react runtime type check
                
                
                
                if (typeof(sheetLazy.sheet) === 'function') sheetLazy.sheet = sheetLazy.sheet();
                if (!referenced) setReferenced(true);
                return (sheetLazy.sheet.classes as any)[propName];
            }
        }) as unknown as Classes<TClassName>);
    };
}
export const createUseSheet    = <TClassName extends ClassName = ClassName>(classes: ProductOrFactory<ClassList<TClassName>>, sheetId?: string): Factory<Classes<TClassName>> => {
    return createUseJssSheet(
        () => usesCssfn(classes),
        sheetId
    );
}
