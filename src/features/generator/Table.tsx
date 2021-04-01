import React, { useRef } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { transformColumns } from './ColumnFilters'
import { selectColumns, selectRows } from './generatorSlice'

export function TableGen () {
  const rows = useSelector(selectRows)
  // const columns = useSelector(selectColumns)
  // const inputEl = useRef<HTMLInputElement | null>(null)
  // const dispatch = useDispatch()
  // const convert = transformColumns(
  //   inputEl, dispatch
  // )(columns)
  // console.log(convert)  
  return <Table
    // columns={ convert }
    dataSource={ rows }
         />
}
