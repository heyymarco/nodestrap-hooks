// react (builds html using javascript):
import {
    default as React,
    useMemo,
    useLayoutEffect,
}                           from 'react'        // base technology of our cssfn components

// jss   (builds css  using javascript):
import {
    // general types:
    Classes,
    Styles,

    SheetsManager,
}                           from 'jss'          // base technology of our cssfn components

// cssfn:
import type {
    Optional,
    Factory,
    ProductOrFactory,
}                           from './types'      // cssfn's types
import {
    // general types:
    ClassName,
    ClassList,

    
    // styles:
    createJssSheet,

    
    // cssfn hooks:
    usesCssfn,
}                           from './cssfn'      // cssfn core



// hooks:
const styleSheetManager = new SheetsManager(); // caches & manages styleSheets usage, attached to dom when in use and detached from dom when not in use
export const createUseJssSheet = <TClassName extends ClassName = ClassName>(styles: ProductOrFactory<Styles<TClassName>>): Factory<Classes<TClassName>> => {
    const styleSheetId  = {}; // a simple object for the styleSheet's identifier (by reference)

    
    
    return (): Classes<TClassName> => {
        const styleSheet = ( // no need to use `useMemo` because fetching from `styleSheetManager` is inexpensive
            // take from an existing cached styleSheet (if any):
            styleSheetManager.get(styleSheetId) // inexpensive operation
            ??
            // or create a new one:
            (() => { // expensive operation
                // create a new styleSheet using our pre-configured `customJss`:
                const newStyleSheet = createJssSheet(styles);
                
                
                
                // register to `styleSheetManager` to be cached and also to be able to attach/detach to/from dom:
                styleSheetManager.add(styleSheetId, newStyleSheet);

                
                
                // here the ready to use styleSheet:
                return newStyleSheet;
            })()
        );
        
        
        
        useLayoutEffect(() => {
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



// utilities:

export const isTypeOf = <TProps,>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>): element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>> => {
    return (
        React.isValidElement<TProps>(element)
        &&
        (
            (element.type === funcComponent)
            ||
            (
                (typeof element.type === 'function')
                &&
                (
                    (
                        element.type.prototype
                        &&
                        funcComponent.prototype
                        &&
                        (element.type.prototype === funcComponent.prototype)
                    )
                    ||
                    (element.type.prototype instanceof funcComponent)
                )
            )
        )
    );
};

export const setElmRef = <TElement extends HTMLElement>(elmRef: React.Ref<TElement>|undefined, elm: TElement|null) => {
    if (elmRef) {
        if (typeof(elmRef) === 'function') {
            elmRef(elm);
        }
        else {
            (elmRef as React.MutableRefObject<TElement|null>).current = elm;
        } // if
    } // if
};



// react components:

const htmlPropList = [
    // All HTML Attributes
    'accept',
    'acceptCharset',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'as',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'cite',
    'classID',
    'cols',
    'colSpan',
    'content',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'disabled',
    'download',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'high',
    'href',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'integrity',
    'keyParams',
    'keyType',
    'kind',
    'label',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsInline',
    'poster',
    'preload',
    'readOnly',
    'rel',
    'required',
    'reversed',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'summary',
    'target',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap',

    // Standard HTML Attributes:
    'accessKey',
    // 'className',
    'contentEditable',
    'contextMenu',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'slot',
    'spellCheck',
    'style',
    'title',
    'translate',
    
    // accessibilities:
    'tabIndex',

    // values:
    'defaultValue',
];
const isHtmlProp = (propName: string) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName)

export interface ElementProps<TElement extends HTMLElement = HTMLElement>
    extends
        React.DOMAttributes<TElement>,
        React.AriaAttributes
{
    // essentials:
    tag?            : keyof JSX.IntrinsicElements
    style?          : React.CSSProperties
    elmRef?         : React.Ref<TElement> // setter ref


    // identifiers:
    id?             : string


    // accessibilities:
    role?           : React.AriaRole


    // classes:
    mainClass?      : Optional<string>
    classes?        : Optional<string>[]
    variantClasses? : Optional<string>[]
    stateClasses?   : Optional<string>[]
}
export function Element<TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>) {
    // html props:
    const htmlProps = useMemo(() => {
        const htmlProps : {} = {
            ref : props.elmRef,
        };

        for (const name in props) {
            if (isHtmlProp(name)) {
                (htmlProps as any)[name] = (props as any)[name];
            } // if
        } // for
        
        return htmlProps;
    }, [props]);



    // fn props:
    const Tag = (props.tag ?? 'div');

    
    
    // jsx:
    return (
        <Tag
            // other props:
            {...htmlProps}


            // accessibilities:
            role={props.role}


            // classes:
            className={[
                // main:
                props.mainClass,


                // additionals:
                ...(props.classes ?? []),


                // variants:
                ...(props.variantClasses ?? []),


                // states:
                ...(props.stateClasses ?? []),
            ].filter((c) => !!c).join(' ') || undefined}
        >
            { props.children }
        </Tag>
    );
}
export { Element as default }
