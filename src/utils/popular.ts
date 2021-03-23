import { curry, reduce, assoc, keys, map, when, propEq, prop, mergeRight, __, clone, converge, filter, is, pipe, splitAt, values, zipObj, length } from 'ramda'

interface ObjectLiteral {
  [key: string]: any
}
export const enumToObject: any = pipe<any, any, any, any>(
  values,
  converge(
    splitAt, [pipe(
      filter(is(Number)),
      <any>length
    ), clone]
  ),
  converge(
    zipObj, [prop(0), prop(1)]
  )
)
export const renameKeys: any = curry((
  keysMap: ObjectLiteral, obj: ObjectLiteral
) =>
  reduce(
    (
      acc, key
    ) => assoc(
      keysMap[key] || key, obj[key], acc
    ),
    {},
    keys(obj)
  ))
export const findAndMerge = (
  els: any[], element: any, propName: string
) => map(<any>when(
  propEq(
    propName, prop(
      propName, element
    )
  ), mergeRight(
    __, element
  )
))(els)
