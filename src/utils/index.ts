import { assoc, curry, keys, reduce } from 'ramda'
interface ObjectLiteral {
  [key: string]: any
}
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
