import React, { useState } from 'react'
import { Button, Card, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { createColumn } from '../features/generator/generatorSlice'
import { WeekDays } from './WeekDays'

const { TextArea } = Input
const areas = [
  { label: 'Sequence', value: 'Sequence' },
  { label: 'Condition', value: 'Condition' },
  { label: 'Random', value: 'Random' },
  { label: 'Dates', value: 'Dates' }
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
export const AddColumn = () => {
  const [ form ] = Form.useForm()
  const dispatch = useDispatch()
  const [
    type, setType
  ] = useState(
    null
  )
  const [
    days, setDays
  ] = useState(
    daysOfWeek
  )
  
  const onFinish = (
    values: any
  ) => {
    if (values.type === 'Dates') {
      values.template = days
    }
    console.log(
      'Received values of form:', values
    )
    dispatch(
      createColumn(
        values
      )
    )
  }

  const handleChange = () => {
    form.setFieldsValue(
      { sights: [] }
    )
    const type = form.getFieldValue(
      'type'
    )
    setType(
      type
    )
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
        onFinish={ onFinish }
      >
        <Form.Item
          label="Type"
          name="type"
          rules={ [ { required: true, message: 'Missing type' } ] }
        >
          <Select
            onChange={ handleChange }
            options={ areas }
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name='name'
          rules={ [ { required: true } ] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lable"
          name='label'
          rules={ [ { required: true } ] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Template"
          name='template'
        >
          {
            type === 'Dates'
              ? <WeekDays { ...{ days, setDays } } />
              : <TextArea
                placeholder={ 'Pass Keywords ' }
                rows={ 4 }
              />
          }

        </Form.Item>
        <Form.Item
          label="Limit"
          name='limit'
          rules={ [ { required: true } ] }
        >
          <InputNumber />
          
        </Form.Item>
        <Form.Item
          label="Start Day"
          name="startDate"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
