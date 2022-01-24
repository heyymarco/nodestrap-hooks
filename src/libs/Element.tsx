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

// nodestrap utilities:
import {
    // utilities:
    setRef,
}                           from './utilities'



// general types:

// semantics:
export type Tag          = keyof JSX.IntrinsicElements | ''
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
    const {
        tag,
        role,
    } = props;
    
    const {
        semanticTag,
        semanticRole,
    } = options;
    
    return useMemo(() => {
        const roleAbs       : Role|undefined = role ??                  (Array.isArray(semanticRole) ? (semanticRole?.[0] ?? undefined) : (semanticRole ?? undefined));
        const isDesiredType : boolean        = !!roleAbs &&             (Array.isArray(semanticRole) ?  semanticRole.includes(roleAbs)  : (semanticRole === roleAbs ));
        
        const tagFn         : Tag|undefined  = tag  ?? (isDesiredType ? (Array.isArray(semanticTag)  ? (semanticTag?.[0] ?? undefined)  : (semanticTag  ?? undefined)) : undefined);
        const isSemanticTag : boolean        = !!tagFn   &&             (Array.isArray(semanticTag)  ?  semanticTag.includes(tagFn)     : (semanticTag  === tagFn   ));
        
        const roleFn        : Role|undefined = isDesiredType ? (isSemanticTag ? '' : roleAbs   ) : roleAbs; /* `''` => do not render role attribute, `undefined` => lets the BaseComponent decide the appropriate role */
        
        
        
        return [
            tagFn,
            roleFn,
            isDesiredType,
            isSemanticTag,
        ] as const;
        // eslint-disable-next-line
    }, [tag, role, ...[semanticTag].flat(), ...[semanticRole].flat()]);
};
export const useTestSemantic = (props: SemanticProps, options: SemanticOptions) => {
    const {
        semanticTag  : props_semanticTag,
        semanticRole : props_semanticRole,
    } = props;
    
    const {
        semanticTag  : options_semanticTag,
        semanticRole : options_semanticRole,
    } = options;
    
    const newOptions = useMemo(() => {
        const semanticTag = ((): SemanticTag => {
            if (!props_semanticTag) return options_semanticTag;
            
            
            
            if (props_semanticTag === options_semanticTag) return options_semanticTag;
            
            const semanticTag1 = Array.isArray(props_semanticTag)   ? props_semanticTag   : [props_semanticTag];
            const semanticTag2 = Array.isArray(options_semanticTag) ? options_semanticTag : [options_semanticTag];
            const intersect    = semanticTag1.filter((p) => semanticTag2.includes(p));
            return (intersect.length) ? intersect : null;
        })();
        
        const semanticRole = ((): SemanticRole => {
            if (!props_semanticRole) return options_semanticRole;
            
            
            
            if (props_semanticRole === options_semanticRole) return options_semanticRole;
            
            const semanticRole1 = Array.isArray(props_semanticRole)   ? props_semanticRole   : [props_semanticRole];
            const semanticRole2 = Array.isArray(options_semanticRole) ? options_semanticRole : [options_semanticRole];
            const intersect     =  semanticRole1.filter((p) => semanticRole2.includes(p));
            return (intersect.length) ? intersect : null;
        })();
        
        return {
            semanticTag,
            semanticRole,
        };
    }, [props_semanticTag, props_semanticRole, options_semanticTag, options_semanticRole]);
    
    
    
    return useSemantic(props, newOptions);
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
        SemanticProps
{
    // essentials:
    style?          : React.CSSProperties
    outerRef?       : React.Ref<TElement> // setter ref
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
            ref : (elm: HTMLElement) => {
                setRef(props.outerRef, elm);
                setRef(props.elmRef  , elm);
            },
        };
        
        for (const name in props) {
            if (isHtmlProp(name)) {
                (htmlProps as any)[name] = (props as any)[name];
            } // if
        } // for
        
        return htmlProps;
    }, [props]);
    
    
    
    // className:
    const {
        mainClass,
        classes,
        variantClasses,
        stateClasses,
    } = props;
    const className = useMemo(() => {
        return (
            Array.from(new Set([
                // main:
                mainClass,
                
                
                // additionals:
                ...(classes ?? []),
                
                
                // variants:
                ...(variantClasses ?? []),
                
                
                // states:
                ...(stateClasses ?? []),
            ].filter((c) => !!c))).join(' ')
            ||
            undefined
        );
    }, [mainClass, classes, variantClasses, stateClasses]);
    
    
    
    // fn props:
    const [tag, role] = useSemantic(props);
    const Tag         = (tag || 'div');                   // ignores an empty string '' of tag
    
    
    
    // jsx:
    return (
        <Tag
            // other props:
            {...htmlProps}
            
            
            // semantics:
            role={role || undefined}                      // ignores an empty string '' of role
            aria-label={props['aria-label'] || undefined} // ignores an empty string '' of aria-label
            
            
            // classes:
            className={className}
        >
            { props.children }
        </Tag>
    );
}
export { Element as default }
