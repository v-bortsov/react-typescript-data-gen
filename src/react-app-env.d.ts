/// <reference types="react-scripts" />
type ColumnType = {
  name: string
  label?: string
  type?: string
  startDate?: any
  endDate?: any
  template: string | string[]
}
export enum DaysOfWeek {
  Sun = 1,
  Mon = 2,
  Tue = 3,
  Wed = 4,
  Thu = 5,
  Fri = 6,
  Sat = 7 
}
interface GeneratorState {
  columns: ColumnType[]
  rows: any[]
}
interface IDateOption {
  days: number[]
  lengthDays: number
  dates: string[]
  limit: number
  mode: 'week'|'range'
  startDate: any
  endDate: string
}
export enum Interval {
  days = 'days',
  weeks = 'weeks',
  hours = 'hours'
}
