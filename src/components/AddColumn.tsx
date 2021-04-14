import { Button, Card, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { always, assoc, assocPath, chain, clone, complement, compose, cond, converge, curry, equals, ifElse, includes, isEmpty, isNil, map, mergeRight, not, objOf, pair, path, pathEq, pick, pipe, prop, T, tap, __ } from 'ramda'
import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { ColumnType, Nullable } from '../react-app-env'
import { onFinish } from '../utils/form'
import { findAndMerge } from '../utils/popular'
import { WeekDays } from './WeekDays'

const { TextArea } = Input
const areas = [
  { label: 'Custom', value: 'custom' },
  { label: 'Integer', value: 'integer' },
  { label: 'Dates', value: 'dates' }
]
const daysOfWeek = [
  { label: 'Sunday', abbr: 'Sun', active: false },
  { label: 'Monday', abbr: 'Mon', active: true },
  { label: 'Tuesday', abbr: 'Tue', active: false },
  { label: 'Wednesday', abbr: 'Wed', active: false },
  { label: 'Thursday', abbr: 'Thu', active: false },
  { label: 'Friday', abbr: 'Fri', active: false },
  { label: 'Saturday', abbr: 'Sat', active: false }
]
const unionFields = [{name: 'name', label: 'Name', rules: [{ required: true }], component: 'Input', value: null}, {name: 'label', label: 'Label', rules: [{ required: true }], component: 'Input', value: null},]
const customFields = [...unionFields, {name: 'collect', label: 'Collect', rules: [{ required: true }], component: 'TextArea', value: null},]
const dateFields = [
  ...unionFields,
  {name: 'days', label: 'Days of week', rules: [{ required: true }], component: 'WeekDays', value: daysOfWeek },
  {name: 'startDay', label: 'Start Day', rules: [{ required: true }], component: 'DatePicker', value: null },
  {name: 'limit', label: 'Limit', rules: [{ required: true }], component: 'InputNumber', value: 0 },
]
const integerFields = [
  ...unionFields,
  {name: 'from', label: 'From', rules: [{ required: true }], component: 'InputNumber', value: 1 },
  {name: 'to', label: 'To', rules: [{ required: true }], component: 'InputNumber', value: 10 },
  {name: 'length', label: 'Length', rules: [{ required: true }], component: 'InputNumber', value: 10 },
]
const components = {
  Input, InputNumber, DatePicker, Select, TextArea, WeekDays
}
const selectByType = cond<string, any[]>([
  [equals('custom'), always(customFields)],
  [equals('integer'), always(integerFields)],
  [equals('dates'), always(dateFields)],
  [T, always([])]
])
// (component: any)=> React.createElement(component)
const getReactComponentFromCollect = pipe<any, any, any>(
  prop('component'),
  prop(
    __,
    components
  )
)
const getComponentWithProps = curry((
  Component: any, props: any
): JSX.Element => includes(
  props.component,
  [
    'Input',
    'InputNumber',
    'DatePicker',
    'Select',
    'TextArea'
  ]
)
  ? <Form.Item {...pick(
    [
      'name',
      'label',
      'rules'
    ],
    props
  )}><Component {...pick(
      ['value', 'onChange'],
      props
    )}/></Form.Item>
  : <Component {...pick(
    ['value', 'onChange'],
    props
  )}/>)


const actionOnOtherFields = converge(
  assocPath([0, 'fields']),
  [
    converge(
      findAndMerge,
      [
        path<any>([0, 'fields']),
        prop<any>(1),
        always('name')
      ]
    ), clone
  ]
)
const actionOnTypeField = pipe(
  converge(
    assocPath([0, 'type']),
    [path([1, 'value']), clone]
  ),
  converge(
    assocPath([0, 'fields']),
    [
      pipe(
        path([1, 'value']),
        selectByType,
      ), clone
    ]
  )
)
//   const [state, changeState] = useReducer(changeValue, initialCount, assoc('fields', __, ));
const reducer = pipe(
  pair,
  cond([
    [
      pathEq(
        [1, 'name'],
        'type'
      ), actionOnTypeField
    ],
    [
      pipe(
        prop(1),
        isEmpty,
        not
      ), actionOnOtherFields
    ],
    [
      pipe(
        prop(1),
        isEmpty
      ), clone
    ]
  ]),
  tap(x => console.log(
    'test',
    x
  )),
  prop<any>(0)
)
const extractValue = curry((
  component, event
) => cond([
  [
    includes(
      __,
      [
        'Input',
        'Select',
        'TextArea'
      ]
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
  [equals('InputNumber'), compose(always(event))],
  [equals('WeekDays'), compose(always(event))]
])(component))

const addValueAndOnChange = (dispatch)=>pipe(chain(
  assoc('onChange'),
  curry((
    props, e
  )=>pipe(
    converge(
      mergeRight,
      [
        pick(['name']), always(pipe(
          extractValue(props.component),
          objOf('value')
        )(e))
      ]
    ),
    dispatch
  )(props))
))

const composeFields = ([state, dispatch])=> pipe(
  prop('fields'),
  map(converge(
    getComponentWithProps,
    [getReactComponentFromCollect, addValueAndOnChange(dispatch)]
  ))
)(state)

const mainForm = pipe<Nullable<any>, any>(ifElse(
  complement(isNil),
  pipe(
    selectByType,
    converge(
      curry(useReducer),
      [
        always(reducer),
        clone,
        always(assoc(
          'fields',
          __,
          {}
        ))
      ]
    ),
    composeFields
  ),
  always([])
))


export const FormFields: React.FC<ColumnType<any>> = (props: ColumnType<any>) => <div/>

export const AddColumn = (): JSX.Element => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [state, changeState] = useReducer(
    reducer,
    {fields: [], type: null},
    function(init){return init;}
  );
  console.log(state);

  const handleChange = () => {
    form.setFieldsValue({ sights: [] })
    const type = form.getFieldValue('type')
    changeState({name: 'type', value: type})
  }

  return (
    <Card
      bordered
      style={ { width: 400 } }
      title="Add Column"
    >
      <Form
        autoComplete="off"
        form={ form }
        name="dynamic_form_nest_item"
        onFinish={ onFinish(
          dispatch,
          state
        ) }
      >
        <Form.Item
          label="Type"
          name="type"
          rules={ [{ required: true, message: 'Missing type' }] }
        >
          <Select
            onChange={ handleChange }
            options={ areas }
          />
        </Form.Item>
        {/* {mainForm(type)} */}
        {composeFields([state, changeState])}
        <Button
          htmlType="submit"
          type="primary"
        >
            Submit
        </Button>
      </Form>
    </Card>
  )
}
