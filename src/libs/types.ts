export type Optional<T>                  = T|null|undefined
export type SingleOrArray<T>             = T|T[]

export type DeepArray<T>                 = Array<T|DeepArray<T>>
export type SingleOrDeepArray<T>         = T|DeepArray<T>

export type Factory<T>                   = () => T
export type ProductOrFactory<T>          = T|Factory<T>
export type ProductOrFactoryDeepArray<T> = ProductOrFactory<T>|DeepArray<ProductOrFactory<T>>

export type Dictionary<TValue>           = { [key: string]: TValue }
export type ValueOf<TCollection>         = TCollection[keyof TCollection]
export type DictionaryOf<TCollection>    = Dictionary<ValueOf<TCollection>>
