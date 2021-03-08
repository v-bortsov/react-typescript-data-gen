import { Button, Card, Form, Input, Select } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { createColumn } from '../features/generator/generatorSlice'

const { TextArea } = Input
const areas = [
  { label: 'Sequence', value: 'Sequence' },
  { label: 'Condition', value: 'Condition' },
  { label: 'Random', value: 'Random' }
]

export const AddColumn = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    values.template = values.template.split('\n')
    dispatch(createColumn(values))
    console.log(
      'Received values of form:', values
    )
  }

  const handleChange = () => {
    form.setFieldsValue({ sights: [] })
  }

  return (
    <Card bordered style={ { width: 300 } } title="Add Column">
      <Form
        autoComplete="off" form={ form } name="dynamic_form_nest_item"
        onFinish={ onFinish }
      >
        <Form.Item label="Type" name="type" rules={ [{ required: true, message: 'Missing type' }] }>
          <Select onChange={ handleChange } options={ areas } />
        </Form.Item>
        <Form.Item label="Name" name='name' rules={ [{ required: true }] }>
          <Input />
        </Form.Item>
        <Form.Item label="Lable" name='label' rules={ [{ required: true }] }>
          <Input />
        </Form.Item>
        <Form.Item label="Template" name='template' rules={ [{ required: true }] }>
          <TextArea
            placeholder={ 'Pass Keywords ' }
            rows={ 4 }
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
