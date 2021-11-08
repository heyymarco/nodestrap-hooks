export type Optional<T>                    = T|null|undefined
export type OptionalOrFalse<T>             = Optional<T|false>
export type SingleOrArray<T>               = T|T[]

export type DeepArray<T>                   = (T|DeepArray<T>)[] // ===       T[]  |  T[][]  |  T[][][]  |  ...
export type SingleOrDeepArray<T>           = T|DeepArray<T>     // === T  |  T[]  |  T[][]  |  T[][][]  |  ...

export type Factory<T>                     = () => T
export type ProductOrFactory<T>            = T|Factory<T>
export type ProductOrFactoryDeepArray<T>   = (ProductOrFactory<T> | ProductOrFactoryDeepArray<T>)[] // ===         T[]|F[]  |  T[][]|F[][]  |  T[][][]|F[][][]  |  ...
export type ProductOrFactoryOrDeepArray<T> =  ProductOrFactory<T> | ProductOrFactoryDeepArray<T>    // === T|F  |  T[]|F[]  |  T[][]|F[][]  |  T[][][]|F[][][]  |  ...

export type Dictionary<TValue>             = { [key: string]: TValue }
export type ValueOf<TDictionary>           = TDictionary[keyof TDictionary]
export type DictionaryOf<TDictionary>      = Dictionary<ValueOf<TDictionary>>
