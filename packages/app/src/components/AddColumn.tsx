import { Button, Card, Form } from 'antd'
import { always, assoc, clone, converge, curry, includes, map, pick, pipe, prop, __ } from 'ramda'
import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, Field, FormField } from '../react-app-env'
import { addValueAndOnChange, getReactComponentFromCollect, onFinish, unionFields } from '../utils/form'
import { reducer } from '../utils/hook'

const getComponentWithProps = curry((
  Component: any, props: Field
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
      [
        'value',
        'defaultValue',
        'onChange',
        'options'
      ],
      props
    )}/></Form.Item>
  : <Component {...pick(
    [
      'value',
      'defaultValue',
      'onChange'
    ],
    props
  )}/>)

export const Fields: React.FC<{state: FormField, dispatch: AppDispatch}> = ({state, dispatch}: {state: FormField, dispatch: AppDispatch}) => pipe<any, any, any>(
  prop<any, any>('fields'),
  map(converge(
    getComponentWithProps,
    [getReactComponentFromCollect, addValueAndOnChange(dispatch)]
  ))
)(state) 

const FormFields = ([state, dispatch]: any): JSX.Element=>(
  <Card
    bordered
    style={ { width: 400 } }
    title="Add Column"
  >
    <Form
      autoComplete="off"
      name="dynamic_form_nest_item"
      onFinish={ onFinish(
        useDispatch(),
        state
      ) }
    >
      <Fields {...{state, dispatch}} />
      <Button
        htmlType="submit"
        type="primary"
      >
        Submit
      </Button>
    </Form>
  </Card>
)
export const AddColumn = (): JSX.Element => pipe<any, any, any>(
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
  FormFields
)(unionFields
  .slice(
    0,
    1
  ))

