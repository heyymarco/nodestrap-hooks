// react:
import {
    default as React,
    useMemo,
}                           from 'react'         // base technology of our cssfn components

// cssfn:
import type {
    Optional,
    SingleOrArray,
}                           from './types'       // cssfn's types



// general types:

// semantics:
export type Tag          = keyof JSX.IntrinsicElements
export type Role         = React.AriaRole
export type SemanticTag  = SingleOrArray<Optional<Tag>>
export type SemanticRole = SingleOrArray<Optional<Role>>



// hooks:

export interface SemanticOptions
{
    // semantics:
    semanticTag?  : SemanticTag
    semanticRole? : SemanticRole
}
export interface SemanticProps
    extends
        SemanticOptions,
        React.AriaAttributes
{
    // semantics:
    tag?          : Tag
    role?         : Role
}
export const useSemantic     = (props: SemanticProps, options: SemanticOptions = props) => {
    const roleAbs       : Role|undefined = props.role   ??                  (Array.isArray(options.semanticRole) ? (options.semanticRole?.[0] ?? undefined) : (options.semanticRole ?? undefined));
    const isDesiredType : boolean        = !!roleAbs    &&                  (Array.isArray(options.semanticRole) ?  options.semanticRole.includes(roleAbs)  : (options.semanticRole === roleAbs ));
    
    const tagFn         : Tag|undefined  = props.tag    ?? (isDesiredType ? (Array.isArray(options.semanticTag)  ? (options.semanticTag?.[0] ?? undefined)  : (options.semanticTag  ?? undefined)) : undefined);
    const isSemanticTag : boolean        = !!tagFn      &&                  (Array.isArray(options.semanticTag)  ?  options.semanticTag.includes(tagFn)     : (options.semanticTag  === tagFn   ));
    
    const roleFn        : Role|undefined = isDesiredType ? (isSemanticTag ? '' : roleAbs   ) : roleAbs; /* `''` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role */
    
    
    
    return [
        tagFn,
        roleFn,
        isDesiredType,
        isSemanticTag,
    ] as const;
};
export const useTestSemantic = (props: SemanticProps, options: SemanticOptions) => {
    const semanticTag = ((): SemanticTag => {
        if (!props.semanticTag) return options.semanticTag;

        
        
        if (props.semanticTag === options.semanticTag) return options.semanticTag;
        
        const semanticTag1 = Array.isArray(props.semanticTag)   ? props.semanticTag   : [props.semanticTag];
        const semanticTag2 = Array.isArray(options.semanticTag) ? options.semanticTag : [options.semanticTag];
        const intersect    = semanticTag1.filter((p) => semanticTag2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    
    const semanticRole = ((): SemanticRole => {
        if (!props.semanticRole) return options.semanticRole;

        
        
        if (props.semanticRole === options.semanticRole) return options.semanticRole;
        
        const semanticRole1 = Array.isArray(props.semanticRole)   ? props.semanticRole   : [props.semanticRole];
        const semanticRole2 = Array.isArray(options.semanticRole) ? options.semanticRole : [options.semanticRole];
        const intersect     =  semanticRole1.filter((p) => semanticRole2.includes(p));
        return (intersect.length) ? intersect : null;
    })();
    
    
    
    return useSemantic(props, { semanticTag, semanticRole });
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

const isSingleValue = (num: string|ReadonlyArray<string>): num is string => (typeof(num) === 'string') || (Array.isArray(num) && (num.length === 1));
export const parseNumber = (num: number|string|ReadonlyArray<string>|null|undefined): number|null => {
    if (typeof(num) === 'number') return num;
    if (!num) return null;
    
    
    
    if (!isSingleValue(num)) return null;
    if (!num) return null;
    
    
    
    num = Number.parseFloat(num);
    if (isNaN(num)) return null;
    return num;
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

    // more:
    'referrerPolicy',
    'ping',
];
const isHtmlProp = (propName: string) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName)

export interface ElementProps<TElement extends HTMLElement = HTMLElement>
    extends
        React.DOMAttributes<TElement>,
        SemanticProps
{
    // essentials:
    style?          : React.CSSProperties
    elmRef?         : React.Ref<TElement> // setter ref
    
    
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
    const [tag, role] = useSemantic(props);
    const Tag         = (tag ?? 'div');
    
    
    
    // jsx:
    return (
        <Tag
            // other props:
            {...htmlProps}
            
            
            // semantics:
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
