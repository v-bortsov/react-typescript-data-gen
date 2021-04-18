import { Button, Space } from 'antd'
import { lensProp, not, over, pipe, __ } from 'ramda'
import React from 'react'
import { AppDispatch, Day } from '../react-app-env'
import { findAndMerge } from '../utils/popular'
export const setDay = (
  day: Day, days: Day[], setDays: AppDispatch
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
  value: Day[],
  onChange: any
}
export const WeekDays = ({ value, onChange }: WeekDays): JSX.Element => (
  <Space>
    { 
      value.map((
        day: Day, idx: number
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
