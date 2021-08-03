export type Optional<T>               = T|null|undefined
export type Factory<TProduct>         = () => TProduct
export type Dictionary<TValue>        = { [key: string]: TValue }
export type ValueOf<TCollection>      = TCollection[keyof TCollection]
export type DictionaryOf<TCollection> = Dictionary<ValueOf<TCollection>>
