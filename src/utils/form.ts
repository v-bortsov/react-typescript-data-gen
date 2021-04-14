import { assoc, converge, curry, indexBy, mergeRight, objOf, omit, pick, pipe, pluck, prop, tap } from "ramda"
import { createColumn } from "../features/generator/generatorSlice"
const baseColumn = [
  'name',
  'label',
  'type',
  'collect'
]
export const onFinish = curry((
  dispatch: any, state: any, values: any
) => pipe(
  indexBy<any>(prop('name')),
  pluck('value'),
  converge(
    mergeRight,
    [
      pick(baseColumn), pipe(
        omit(baseColumn),
        objOf('options')
      )
    ]
  ),
  assoc(
    'type',
    state.type
  ),
  (newValues)=> dispatch(createColumn(newValues))
)(state.fields))