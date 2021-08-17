export type Optional<T>                = T|null|undefined
export type SingleOrArray<T>           = T|T[]

export type Factory<TProduct>          = () => TProduct
export type ProductOrFactory<TProduct> = TProduct|Factory<TProduct>

export type Dictionary<TValue>         = { [key: string]: TValue }
export type ValueOf<TCollection>       = TCollection[keyof TCollection]
export type DictionaryOf<TCollection>  = Dictionary<ValueOf<TCollection>>
