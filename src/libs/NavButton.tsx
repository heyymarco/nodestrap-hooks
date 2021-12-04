// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // general types:
    StyleCollection,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
}                           from './cssfn'       // cssfn core

// nodestrap utilities:
import typos                from './typos/index' // configurable typography (texting) defs

// others libs:
import {
    To,
    Path,
    parsePath,
}                           from 'history'

// nodestrap components:
import {
    // hooks:
    isSize          as basicIsSize,
    usesSizeVariant as basicUsesSizeVariant,
    SizeVariant     as BasicSizeVariant,
    useSizeVariant  as basicUseSizeVariant,
    
    OrientationName,
    OrientationRuleOptions,
    normalizeOrientationRule,
    OrientationVariant,
    
    expandBorderRadius,
    expandPadding,
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
            toPathname // eg:   /shoes/foo
            :
            resolvePathname(toPathname, fromPathname) // eg:   ../shoes/foo   +   /product
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

// react components:

export interface NavButtonProps
    extends
        ButtonProps
{
}
export function NavButton(props: NavButtonProps) {
    // rest props:
    const {
        // accessibilities:
        active,
        
        
        // children:
        children,
    ...restProps} = props;
    
    
    
    // fn props:
    const activeFn = active ?? ((): boolean => {
        const to = isReactRouterLink(children) ? children.props.to : (isNextLink(children) ? children.props.href : undefined);
        if (!to) return false;
        
        const currentPathname = window?.location?.pathname ?? '';
        const targetPathname  = resolvePath(to, currentPathname);
        
        return true;
    })();
    
    
    
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