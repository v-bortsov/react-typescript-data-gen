import { Button } from 'antd'
import React from 'react'
import { findAndMerge } from '../utils/popular'

export const WeekDays = ({ days, setDays }: any) => {
  const setDay = (day: any) => {
    day.active = !day.active
    // console.log(day)
    const newDaysWeek = findAndMerge(
      days, day, 'abbr'
    )
    // console.log(newDaysWeek)
    
    setDays(newDaysWeek)
  }
  return (
    <>
      {
      days.map((
        day: any, idx: number
      ) => 
        <Button
          key={ idx }
          onClick={ () => setDay(day) }
          shape="circle"
          type={ day.active ? 'dashed' : 'primary' }
        >
          {day.abbr}
        </Button>)
    }
    </>
  )
}