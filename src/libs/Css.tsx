import type { Property }   from 'csstype' // ts defs support for jss
import type { JssStyle }   from 'jss'     // ts defs support for jss



export type { Property as Prop }



export namespace Cust {
    export type Ref     = string // 'var(--blah)' => string
    export type General = string  | number // 'center', 'inline-flex', 12, '12px', 1.5, '150%'
    export type Expr    = General | Ref | (General|Ref)[][] // [['clamp(', 12, 'var(--blah)', '100vw', ')']]
}



export namespace PropEx {
    export type Keyframes = { [key: string]: JssStyle }
    export type Length    = 0 | string
}