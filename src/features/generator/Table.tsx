import React, { useRef } from 'react'
import { Table, Space, Input, Button } from 'antd'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { AimOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import {
  changeColumn,
  selectColumns,
  removeColumn,
  run,
  selectRows
} from './generatorSlice'
import { map, omit, pipe, props, zipObj } from 'ramda'
import { renameKeys } from '../../utils'
import { TextAreaRef } from 'antd/lib/input/TextArea'
import { RootState } from '../../app/store'

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 
const { TextArea } = Input

const transformColumns = (
  ref: React.Ref<TextAreaRef>, dispatch: AppDispatch
) =>
  map(pipe(
    props(['label', 'name', 'label', 'template']), zipObj(['title', 'dataIndex', 'key', 'template']), (obj: any) => {
      const value = obj.template.join('\n')
      
      const omitColumns = omit(
        ['template'], obj
      )
      const passObj = { ...renameKeys(
        { title: 'label', dataIndex: 'name' }, omitColumns
      )
      }
      return {
        ...omitColumns,
        filterDropdown: (object: any) => (
          <div style={ { padding: 8 } }>
            <TextArea
              onChange={ e => dispatch(changeColumn({ ...passObj, template: e.target.value.split('\n') })) }
              placeholder={ 'Pass Keywords ' }
              ref={ ref }
              rows={ 4 }
              style={ { width: 188, marginBottom: 8, display: 'block' } }
              value={ value }
            />
            <Space>
              <Button
                danger icon={ <DeleteOutlined /> }
                onClick={ () => dispatch(removeColumn({ ...passObj })) }
                size="small"
                style={ { width: 90 } }
              >
                Remove
              </Button>
              <Button
                icon={ <SaveOutlined /> }
                onClick={ () => {
                  dispatch(run())
                } }
                size="small"
                style={ { width: 90 } }
                type="primary"
              >
                GO
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => <AimOutlined style={ { color: filtered ? '#1890ff' : undefined } } />,
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(
              () => ref?.current?.focus(), 100
            )
          }
        },
        render: (text: string) =>
          (
            text
          )
      }
    }
  ))

export function TableGen () {
  const rows = useSelector(selectRows)
  const columns = useSelector(selectColumns)
  const inputEl = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const convert = transformColumns(
    inputEl, dispatch
  )(columns)
  console.log(convert)  
  return <Table columns={ convert } dataSource={ rows } />
}
