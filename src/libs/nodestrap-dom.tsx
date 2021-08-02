// react (builds html using javascript):
import {
    default as React,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import type {
    // general types:
    Optional,
}                           from './nodestrap'   // nodestrap's core



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
    
    // accessibility:
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


    // accessibility:
    role?           : React.AriaRole


    // classes:
    mainClass?      : Optional<string>
    classes?        : Optional<string>[]
    variantClasses? : Optional<string>[]
    stateClasses?   : Optional<string>[]
}
export default function Element<TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>) {
    // html props:
    const htmlProps = useMemo(() => {
        const htmlProps = {
            ref : props.elmRef as any,
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


            // accessibility:
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
};
export { Element }



// utils:

export function isTypeOf<TProps>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>): element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>> {
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
                    (element.type.prototype instanceof funcComponent)
                    ||
                    (element.type.prototype === funcComponent.prototype)
                )
            )
        )
    );
}
