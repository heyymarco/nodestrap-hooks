// react:
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components
// doesn't work:
// import {
//     // general types:
//     To,
//     
//     
//     // hooks:
//     useHref,
// }                        from 'react-router'
import type {
    // general types:
    To,
}                           from 'react-router'
import * as reactRouter     from 'react-router'
// doesn't work:
// import {
//     // hooks:
//     useLinkClickHandler,
// }                        from 'react-router-dom'
import * as reactRouterDom  from 'react-router-dom'



const {
    useHref,
} = reactRouter;
const {
    useLinkClickHandler,
} = reactRouterDom;



export interface ReactRouterLinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
{
    // react router links:
    reloadDocument? : boolean
    replace?        : boolean
    state?          : any
    to              : To
    component?      : React.ReactElement
    passHref?       : boolean
    
    
    // children:
    children?       : React.ReactNode
}
/**
 * The public API for rendering a history-aware <a>.
 */
export const ReactRouterLink = React.forwardRef<HTMLAnchorElement, ReactRouterLinkProps>(function LinkWithRef(props, ref) { // the function name must be `LinkWithRef` to be recognized by our `ActionControl`
    // rest props:
    const {
        // react router links:
        reloadDocument,
        replace = false,
        state,
        to,
        component,
        passHref = false,
        
        
        // links:
        target,
    ...restProps} = props;
    
    
    
    // fn props:
    const href = useHref(to);
    
    
    
    // handlers:
    const internalHandleClick = useLinkClickHandler(to, { replace, state, target });
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        props.onClick?.(e);
        
        
        
        if (!e.defaultPrevented && !reloadDocument) internalHandleClick(e);
    };
    
    
    
    // jsx:
    if (component) {
        return React.cloneElement(component, {
            // essentials:
            ref,
            
            
            // links:
            ...(passHref ? {
                href,
                target,
            } : {}),
            
            
            // events:
            onClick: handleClick,
        });
    } // if
    return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
            // other props:
            {...restProps}
            
            
            // essentials:
            ref={ref}
            
            
            // links:
            href={href}
            target={target}
            
            
            // events:
            onClick={handleClick}
        />
    );
});
export { ReactRouterLink as Link }
export default ReactRouterLink;
