import { Button, Space } from 'antd'
import { is, isNil, lensProp, not, over, pipe, __ } from 'ramda'
import React from 'react'
import { findAndMerge } from '../utils/popular'
export const setDay = (
  day: any, days: any, setDays: any
): any => pipe(
  over<any,any>(
    lensProp('active'),
    not
  ),
  findAndMerge(
    days,
    __,
    'abbr'
  ),
  setDays
)(day)

type WeekDays = {
  value: any[],
  onChange: any
}
export const WeekDays = ({ value, onChange }: WeekDays): JSX.Element => (
  <Space>
    { 
     
      value.map((
        day: any, idx: number
      ) => <Button
        key={ idx }
        onClick={ () => setDay(
          day,
          value,
          onChange
        ) }
        shape="circle"
        type={ day.active ? 'dashed' : 'primary' }
      >
        {day.abbr}
      </Button>)
    }
  </Space>
)
