import { always, append, assoc, chain, clone, complement, converge, curry, filter, flatten, is, keys, length, map, mergeRight, of, path, pipe, pluck, prop, propEq, reduce, slice, splitAt, transpose, values, when, xprod, zipObj, __ } from 'ramda'
import { ColumnType, TypeLimiting } from '../react-app-env'

interface ObjectLiteral {
  [key: string]: any
}
export const multipledParts: any = (
  parts: any[][]
) => parts.reduce(
  <any>xprod
)
  .map(
  <any>flatten
  )
export const sliceAndTranspose = curry(
  (
    columns: ColumnType[], multipled: any[], equalsName: any
  ) => pipe(
    filter<any, any>(
      equalsName
    ),
    path(
      [
        0, 'template'
      ]
    ),
    converge(
      append, [
        clone, pipe(
          converge(
            slice(
              0
            ), [
              length,
              always(
                multipled
              )
            ]
          ), of
        )
      ]
    ),
    transpose
  )(
    columns
  )
)
/**
 *   CartesianProduct Non using Ramda
 * 
  const result = parts.reduce((
    a, b
  ) => a.reduce(
    (
      r, v
    ) => r.concat(b.map(w => [].concat(
      v, w
    ))), []
  ))
 * @param columns 
 * @param limiting 
 * @returns 
 */
export const propFilterAndPluck = (
  propNameEq: string, propValue: string, propPluck: string
) => pipe<any, any, any>(
  filter<any>(
    complement(
      propEq(
        propNameEq, propValue
      )
    )
  ),
  pluck(
    propPluck
  )
)
export const cartesianCondition: any = (
  columns: ColumnType[], limiting: TypeLimiting
) => pipe<any, any, any, any, any>(
  propFilterAndPluck(
    'name', limiting, 'template'
  ),
  multipledParts,
  when(
    always(
      is(
        String, limiting
      )
    ),
    sliceAndTranspose(
      columns, __, propEq(
        'name', limiting
      )
    )
  ),
  map(
    pipe<any, any, any>(
      flatten,
      converge(
        zipObj, [
          always(
            pluck(
              'name', columns
            )
          ), clone
        ]
      )
    )
  )
)(
  columns
)
export const enumToObject: any = pipe<any, any, any, any>(
  values,
  converge(
    splitAt, [
      pipe<any, any, any>(
        filter(
          is(
            Number
          )
        ),
        length
      ), clone
    ]
  ),
  converge(
    zipObj, [
      prop<any>(
        0
      ), prop<any>(
        1
      )
    ]
  )
)
export const renameKeys: any = curry(
  (
    keysMap: ObjectLiteral, obj: ObjectLiteral
  ) =>
    reduce(
      (
        acc, key
      ) => assoc(
        keysMap[key] || key, obj[key], acc
      ),
      {},
      keys(
        obj
      )
    )
)
export const findAndMerge = (
  els: any[], element: any, propName: string
) => map(
<any>when(
  propEq(
    propName, prop(
      propName, element
    )
  ), mergeRight(
    __, element
  )
)
)(
  els
)

export const addParam = curry(
  (
    name: string, func: any, args: any[]
  ) => chain(
    assoc(
      name
    ),
    converge(
      func, args
    )
  )
)
