// react (builds html using javascript):
import {
    default as React,
    useMemo,
    useLayoutEffect,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import {
    // general types:
    Classes,
    Styles,

    SheetsManager,
}                           from 'jss'          // base technology of our nodestrap components
// custom jss-plugins:
import {
    mergeStyle,
}                           from './jss-plugin-extend'

// nodestrap (modular web components):
import type {
    Optional,
    Factory,
}                           from './types'      // nodestrap's types
import {
    // general types:
    Style,
    ClassList,

    createStyle,
}                           from './nodestrap'  // nodestrap's core



// hooks:
const styleSheetManager = new SheetsManager(); // caches & manages styleSheets usage, attached to dom when in use and detached from dom when not in use
export const createUseStyle          = <TClass extends string = string>(styles: Styles<TClass>|Factory<Styles<TClass>>): Factory<Classes<TClass>> => {
    const styleSheetId  = {}; // a simple object for the styleSheet's identifier (by reference)

    
    
    return (): Classes<TClass> => {
        const styleSheet = ( // no need to use `useMemo` because fetching from `styleSheetManager` is inexpensive
            // take from an existing cached styleSheet (if any):
            styleSheetManager.get(styleSheetId) // inexpensive operation
            ??
            // or create a new one:
            (() => { // expensive operation
                // create a new styleSheet using our pre-configured `customJss`:
                const newStyleSheet = createStyle(styles);
                
                
                
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
export const createUseComponentStyle = <TClass extends string = string>(classes: ClassList<TClass>|Factory<ClassList<TClass>>): Factory<Classes<TClass>> => {
    return createUseStyle(
        ((): Styles<TClass> => {
            const mergedStyles = {} as Styles<TClass>;

            
            
            ((typeof(classes) === 'function') ? classes() : classes)
            .map((classEntry): Style => ({ [classEntry[0] ?? 'main']: classEntry[1] })) // convert each `ClassEntry` to `Style` of `Style`
            .forEach((style) => mergeStyle(mergedStyles, style)); // merge each `Style` to `mergedStyles`

            
            
            // here the merged `Style`s:
            return mergedStyles;
        })
    );
}



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
