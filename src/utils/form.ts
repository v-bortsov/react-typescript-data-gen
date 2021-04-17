import { DatePicker, Input, InputNumber, Select } from 'antd'
import { always, assoc, chain, compose, cond, converge, curry, equals, includes, indexBy, mergeRight, objOf, path, pick, pipe, pluck, prop, T, __ } from 'ramda'
import { WeekDays } from '../components/WeekDays'
import { createColumn } from '../features/generator/generatorSlice'
import { AppDispatch, Field } from '../react-app-env'
import { mergeAndRestruct } from './popular'
const daysOfWeek = [
  { label: 'Sunday', abbr: 'Sun', active: false },
  { label: 'Monday', abbr: 'Mon', active: true },
  { label: 'Tuesday', abbr: 'Tue', active: false },
  { label: 'Wednesday', abbr: 'Wed', active: false },
  { label: 'Thursday', abbr: 'Thu', active: false },
  { label: 'Friday', abbr: 'Fri', active: false },
  { label: 'Saturday', abbr: 'Sat', active: false }
]
const areas = [
  { label: 'Custom', value: 'custom' },
  { label: 'Integer', value: 'integer' },
  { label: 'Dates', value: 'dates' }
]
const { TextArea } = Input
const baseColumn = [
  'name',
  'label',
  'type',
  'collect'
]
export const unionFields = [
  {name: 'type', label: 'Type', rules: [{ required: true, message: 'Missing type' }], component: 'Select', options: areas, defaultValue: null},
  {name: 'name', label: 'Name', rules: [{ required: true }], component: 'Input', defaultValue: null},
  {name: 'label', label: 'Label', rules: [{ required: true }], component: 'Input', defaultValue: null},
]
export const customFields = [...unionFields, {name: 'collect', label: 'Collect', rules: [{ required: true }], component: 'TextArea', defaultValue: null},]
export const dateFields = [
  ...unionFields,
  {name: 'days', label: 'Days of week', rules: [{ required: true }], component: 'WeekDays', defaultValue: daysOfWeek },
  {name: 'startDay', label: 'Start Day', rules: [{ required: true }], component: 'DatePicker', defaultValue: null },
  {name: 'limit', label: 'Limit', rules: [{ required: true }], component: 'InputNumber', defaultValue: 0 },
]
export const integerFields = [
  ...unionFields,
  {name: 'from', label: 'From', rules: [{ required: true }], component: 'InputNumber', defaultValue: 1 },
  {name: 'to', label: 'To', rules: [{ required: true }], component: 'InputNumber', defaultValue: 10 },
  {name: 'length', label: 'Length', rules: [{ required: true }], component: 'InputNumber', defaultValue: 10 },
]
export const components = {
  Input, InputNumber, DatePicker, Select, TextArea, WeekDays
}
export const selectByType = cond<string, any[]>([
  [equals('custom'), always(customFields)],
  [equals('integer'), always(integerFields)],
  [equals('dates'), always(dateFields)],
  [T, always([])]
])

export const onFinish = curry((
  dispatch: any, state: any, values: any
) => pipe(
  indexBy<any>(prop('name')),
  pluck('value'),
  mergeAndRestruct(
    baseColumn,
    'options'
  ),
  (newValues)=> dispatch(createColumn(newValues))
)(state.fields))

export const extractValueByComponent = curry((
  component, event
) => cond<any, any>([
  [
    includes(
      __,
      ['Input', 'TextArea']
    ), pipe(
      always(event),
      path(['target', 'value'])
    )
  ],
  [
    equals('DatePicker'), pipe(
      always(event),
      (e)=>e.format('DD.MM.YYYY')
    )
  ],
  [
    includes(
      __,
      ['InputNumber', 'Select']
    ), compose(always(event))
  ],
  [equals('WeekDays'), compose(always(event))]
])(component))
// (component: any)=> React.createElement(component)
export const getReactComponentFromCollect = pipe<any, any, any>(
  prop('component'),
  prop(
    __,
    components
  )
)
export const addValueAndOnChange: any = (dispatch: AppDispatch)=>chain(
  assoc('onChange'),
  curry((
    props: any, e: any
  )=>pipe<Field, any, any>(
    converge(
      mergeRight,
      [
        pick(['name']), always(pipe<any, any, any>(
          extractValueByComponent(props.component),
          objOf('value')
        )(e))
      ]
    ),
    dispatch
  )(props))
)
