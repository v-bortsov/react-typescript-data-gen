/// <reference types="react-scripts" />
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>; 
type ColumnType = {
  name: string
  label?: string
  type?: string
  startDate?: any
  endDate?: any
  template: string | string[]
  days?: number[]
}
export enum DaysOfWeek {
    Sun = 0,
    Mon = 1,
    Tue = 2,
    Wed = 3,
    Thu = 4,
    Fri = 5,
    Sat = 6
  }
  type TypeLimiting = (null | number | ColumnType.name)
  interface GeneratorState {
    columns: ColumnType[]
    rows: any[]
    limiting: TypeLimiting
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
