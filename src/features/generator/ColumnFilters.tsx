import React from 'react'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../app/store'
import { renameKeys } from '../../utils/popular'
import { TextAreaRef } from 'antd/lib/input/TextArea'
import { map, omit, pipe, props, zipObj } from 'ramda'
import { AimOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import {
  changeColumn,
  removeColumn,
  run
} from './generatorSlice'
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 
const { TextArea } = Input

export const transformColumns = (
  ref: React.Ref<TextAreaRef>, dispatch: AppDispatch
) =>
  map(
    pipe(
      props(
        ['label', 'name', 'label', 'template']
      ), zipObj(
        ['title', 'dataIndex', 'key', 'template']
      ), (
        obj: any
      ) => {
        const value = obj.template.join(
          '\n'
        )
      
        const omitColumns = omit(
          ['template'], obj
        )
        const passObj = { ...renameKeys(
          { title: 'label', dataIndex: 'name' }, omitColumns
        )
        }
        return {
          ...omitColumns,
          filterDropdown: () => (
            <div style={ { padding: 8 } }>
              <TextArea
                onChange={ e => dispatch(
                  changeColumn(
                    { ...passObj,
                      template: e.target.value.split(
                        '\n'
                      ) }
                  )
                ) }
                placeholder={ 'Pass Keywords ' }
                ref={ ref }
                rows={ 4 }
                style={ { width: 188, marginBottom: 8, display: 'block' } }
                value={ value }
              />
              <Space>
                <Button
                  danger
                  icon={ <DeleteOutlined /> }
                  onClick={ () => dispatch(
                    removeColumn(
                      { ...passObj }
                    )
                  ) }
                  size="small"
                  style={ { width: 90 } }
                >
                  Remove
                </Button>
                <Button
                  icon={ <SaveOutlined /> }
                  onClick={ () => {
                    dispatch(
                      run()
                    )
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
          filterIcon: (
            filtered: boolean
          ) => <AimOutlined style={ { color: filtered ? '#1890ff' : undefined } } />,
          onFilterDropdownVisibleChange: (
            visible: boolean
          ) => {
            if (visible) {
              setTimeout(
                () => ref?.current?.focus(), 100
              )
            }
          },
          render: (
            text: string
          ) => text
        }
      }
    )
  )
