// react:
import {
    default as React,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// others libs:
import {
    To,
    Path,
    parsePath,
}                           from 'history'

// nodestrap components:
import {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from './Basic'
import {
    // utilities:
    isReactRouterLink,
    isNextLink,
}                           from './ActionControl'
import {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    ButtonType,
    ButtonProps,
    Button,
}                           from './Button'



/* forked from react-router v6 */
export const resolvePath = (to: To, fromPathname = '/'): Path => {
    const {
        pathname : toPathname,
        search   = '',
        hash     = '',
    } = (typeof(to) === 'string') ? parsePath(to) : to;
    
    const pathname = (
        toPathname
        ?
        (
            toPathname.startsWith('/')
            ?
            toPathname                                // absolute path, eg:   /shoes/foo
            :
            resolvePathname(toPathname, fromPathname) // relative path, eg:   ../shoes/foo
        )
        :
        fromPathname
    );
    
    return {
        pathname,
        search : normalizeSearch(search),
        hash   : normalizeHash(hash),
    };
};

const resolvePathname = (relativePath: string, fromPathname: string): string => {
    const segments = (
        fromPathname
        .replace(/\/+$/, '') // remove the last /   =>   /products/foo   =>   /product/foo
        .split('/')          // split by /          =>   /products/foo   =>   ['', 'products', 'foo']
    );
    const relativeSegments = relativePath.split('/');
    
    relativeSegments.forEach(segment => {
        if (segment === '..') {
            // Keep the root '' segment so the pathname starts at / when `join()`ed
            if (segments.length > 1) segments.pop(); // remove the last segment
        }
        else if (segment !== '.') {
            segments.push(segment); // add a new segment to the last
        } // if
    });
    
    return (segments.length > 1) ? segments.join('/') : '/';
};
const normalizeSearch = (search: string): string => {
    return (
        (!search || (search === '?'))
        ? ''
        : search.startsWith('?')
        ? search
        : '?' + search
    );
};
const normalizeHash = (hash: string): string => {
    return (
        (!hash || (hash === '#'))
        ? ''
        : hash.startsWith('#')
        ? hash
        : '#' + hash
    );
}



// hooks:
interface CurrentActiveProps {
    // nav matches:
    caseSensitive? : boolean
    end?           : boolean
    
    
    // children:
    children?      : React.ReactNode
}
const useCurrentActive = (props: CurrentActiveProps): boolean => {
    const children = props.children;
    const to = isReactRouterLink(children) ? children.props.to : (isNextLink(children) ? children.props.href : undefined);
    
    /*
    assumes each current path segment === each route segment,
    so each `to` segment starts with `../` => go up one segment (go up one route)
    */
    const currentPathname = window?.location?.pathname ?? '';
    
    
    
    return useMemo((): boolean => {
        if (to === undefined) return false;
        let targetPathname  = resolvePath(to, currentPathname).pathname;
        
        // ensure the pathname has a trailing slash if the original to value had one.
        const hasTrailingSlash = ((typeof(to) === 'string') ? parsePath(to) : to).pathname?.endsWith('/');
        if (hasTrailingSlash && !targetPathname.endsWith('/')) targetPathname += '/';
        
        
        
        let currentPathname2 = currentPathname;
        if (!props.caseSensitive) {
            currentPathname2 = currentPathname2.toLocaleLowerCase();
            targetPathname  = targetPathname.toLocaleLowerCase();
        } // if
        
        
        
        return (
            (currentPathname2 === targetPathname) // exact match
            ||
            (
                !props.end
                &&
                (
                    currentPathname2.startsWith(targetPathname)
                    ||
                    (currentPathname2.charAt(targetPathname.length) === '/') // sub match
                )
            )
        );
    }, [to, currentPathname, props.caseSensitive, props.end]);
};



// react components:

export interface NavButtonProps
    extends
        ButtonProps,
        CurrentActiveProps
{
}
export function NavButton(props: NavButtonProps) {
    // rest props:
    const {
        // accessibilities:
        active,
    ...restProps} = props;
    
    
    
    // fn props:
    const activeDn = useCurrentActive(props);
    const activeFn = active ?? activeDn;
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restProps}
            
            
            // accessibilities:
            active={activeFn}
        />
    );
}
NavButton.prototype = Button.prototype; // mark as Button compatible
export { NavButton as default }

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType }