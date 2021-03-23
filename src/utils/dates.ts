import moment from 'moment'
import { always, assoc, chain, clone, concat, converge, divide, flatten, length, multiply, negate, of, pair, pipe, prop, reduce, remove, repeat, slice, subtract } from 'ramda'
import { IDateOption, Interval } from '../react-app-env'

// const opt = { days: [1, 2, 3], lengthDays: 7, limit: 10, mode: 'week|range', startDate: '', endDate: '' }

const countDays = pipe<any, number[], number>(
  prop('days'), length
)
const ceilLimit = pipe(
  converge(
    divide, [prop('limit'), countDays]
  ), Math.ceil
)

export const addDaysToDate: any = (
  currentDate: string, count: number, flag: Interval
) => moment(
  currentDate, 'DD.MM.YYYY'
).add(
  count, flag
)
  .format('DD.MM.YYYY')
export const dayToDate = pipe<string[], any, any>(
  pair,
  converge(
    concat, [prop<any>(0), pipe(
      prop<any>(1), addDaysToDate, of
    )]
  ) 
)
export const transformDates = pipe<any, any, any, IDateOption>(
  chain(
    assoc('template'), pipe(
      converge(
        repeat, [prop('days'), ceilLimit]
      ),
      flatten
    )
  ),
  chain(
    assoc('template'),
    converge(
      slice, [always(0), pipe(
        converge(
          subtract, [converge(
            multiply, [ceilLimit, countDays]
          ), prop('limit')]
        ), negate
      ), clone]
    )
  ),
  chain(
    assoc('dates'),
    converge(
      reduce, [dayToDate, pipe(
        prop('startDate'), of
      ), pipe(
        prop('days'), remove(
          0, 1
        )
      )]
    )
  )
)// (opt)
