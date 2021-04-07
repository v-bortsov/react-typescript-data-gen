import { Card, InputNumber, Radio, Select } from 'antd'
import { always, cond, equals, is, isNil } from 'ramda'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectColumns, selectLimiting, setLimit } from '../features/generator/generatorSlice'
import { ColumnType } from '../react-app-env'
// import { ColumnType } from '../global'

const { Option } = Select

const options = [
  { label: 'All', value: 'all' },
  { label: 'First', value: 'limit' },
  { label: 'By Column', value: 'column' }
]
export const spotGroupType = cond(
  [
    [
      is(
        Number
      ), always(
        'limit'
      )
    ], 
    [
      is(
        String
      ), always(
        'column'
      )
    ], 
    [
      isNil, always(
        'all'
      )
    ] 
  ]
)
export function RadioGroup () {
  const limit = useSelector(
    selectLimiting
  )
  const columns = useSelector(
    selectColumns
  )
  const dispatch = useDispatch()
  
  const [
    group, setGroup
  ] = useState(
    spotGroupType(
      limit
    )
  )
  
  return (
    <Card
      bordered
      style={ { width: 400 } }
      title="Limiting"
    >
      <Radio.Group
        onChange={ e => {
          if (e.target.value === 'all') {
            dispatch(
              setLimit(
                null
              )
            ) 
          } setGroup(
            e.target.value
          ) 
        } }
        options={ options }
        value={ group }
      />
      {equals(
        'limit', group
      ) && 
        <InputNumber
          defaultValue={ 3 }
          max={ 10 }
          min={ 1 }
          onChange={ value => dispatch(
            setLimit(
              value
            )
          ) }
        />
      }
      {equals(
        'column', group
      ) && 
        <Select
          defaultValue="All"
          onChange={ value => dispatch(
            setLimit(
              value
            )
          ) }
          style={ { width: 120 } }
        >
          {columns.map(
            (
              column: ColumnType, idx: number
            ) => 
              <Option
                key={ idx }
                value={ column.name }
              >
                {column.label}
              </Option>
          )}
        </Select>
      }
    </Card>
  )
}
