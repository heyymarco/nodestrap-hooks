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
    SingleOrArray,
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



// general types:

// semantics:
export type Tag           = keyof JSX.IntrinsicElements
export type Role          = React.AriaRole
export type PreferredTag  = SingleOrArray<Optional<Tag>>
export type PreferredRole = SingleOrArray<Optional<Role>>



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

export const setRef = <TElement extends HTMLElement>(elmRef: React.Ref<TElement>|undefined, elm: TElement|null) => {
    if (elmRef) {
        if (typeof(elmRef) === 'function') {
            elmRef(elm);
        }
        else {
            (elmRef as React.MutableRefObject<TElement|null>).current = elm;
        } // if
    } // if
};

export interface SemanticProps {
    // semantics:
    preferredTag?  : PreferredTag
    preferredRole? : PreferredRole
}
export const defineSemantic = <TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>, options: SemanticProps = props) => {
    const roleAbs       : Role|undefined = props.role ??                  (Array.isArray(options.preferredRole) ? (options.preferredRole?.[0] ?? undefined) : (options.preferredRole ?? undefined));
    const isDesiredType : boolean        = !!roleAbs  &&                  (Array.isArray(options.preferredRole) ?  options.preferredRole.includes(roleAbs)  : (options.preferredRole === roleAbs ));
    
    const tagFn         : Tag|undefined  = props.tag  ?? (isDesiredType ? (Array.isArray(options.preferredTag)  ? (options.preferredTag?.[0] ?? undefined)  : (options.preferredTag  ?? undefined)) : undefined);
    const isSemanticTag : boolean        = !!tagFn    &&                  (Array.isArray(options.preferredTag)  ?  options.preferredTag.includes(tagFn)     : (options.preferredTag  === tagFn   ));
    
    const roleFn        : Role|undefined = isDesiredType ? (isSemanticTag ? '' : roleAbs   ) : roleAbs; /* `''` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role */
    
    
    
    return [
        tagFn,
        roleFn,
        isDesiredType,
        isSemanticTag,
    ] as const;
};
export const useTestSemantic = <TElement extends HTMLElement = HTMLElement>(props: ElementProps<TElement>, options: SemanticProps) => {
    const preferredTag = ((): PreferredTag => {
        if (!props.preferredTag) return options.preferredTag;

        
        
        if (props.preferredTag === options.preferredTag) return options.preferredTag;
        
        const preferredTag1 = Array.isArray(props.preferredTag)   ? props.preferredTag   : [props.preferredTag];
        const preferredTag2 = Array.isArray(options.preferredTag) ? options.preferredTag : [options.preferredTag];
        const intersect     = preferredTag1.filter((p) => preferredTag2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    
    const preferredRole = ((): PreferredRole => {
        if (!props.preferredRole) return options.preferredRole;

        
        
        if (props.preferredRole === options.preferredRole) return options.preferredRole;
        
        const preferredRole1 = Array.isArray(props.preferredRole)   ? props.preferredRole   : [props.preferredRole];
        const preferredRole2 = Array.isArray(options.preferredRole) ? options.preferredRole : [options.preferredRole];
        const intersect      =  preferredRole1.filter((p) => preferredRole2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    
    
    
    return defineSemantic(props, { preferredTag, preferredRole });
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
    
    // accessibilities:
    'tabIndex',

    // values:
    'defaultValue',

    // more:
    'referrerPolicy',
    'ping',
];
const isHtmlProp = (propName: string) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName)

export interface ElementProps<TElement extends HTMLElement = HTMLElement>
    extends
        React.DOMAttributes<TElement>,
        React.AriaAttributes,
        SemanticProps
{
    // essentials:
    style?          : React.CSSProperties
    elmRef?         : React.Ref<TElement> // setter ref
    
    
    // semantics:
    tag?            : Tag
    role?           : Role
    
    
    // identifiers:
    id?             : string
    
    
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
    const [tag, role] = defineSemantic(props);
    const Tag         = (tag ?? 'div');

    
    
    // jsx:
    return (
        <Tag
            // other props:
            {...htmlProps}


            // accessibilities:
            role={role || undefined}
            aria-label={props['aria-label'] || undefined}


            // classes:
            className={Array.from(new Set([
                // main:
                props.mainClass,


                // additionals:
                ...(props.classes ?? []),


                // variants:
                ...(props.variantClasses ?? []),


                // states:
                ...(props.stateClasses ?? []),
            ].filter((c) => !!c))).join(' ') || undefined}
        >
            { props.children }
        </Tag>
    );
}
export { Element as default }
