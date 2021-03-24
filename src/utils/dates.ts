import moment from 'moment'
import { always, aperture, assoc, chain, clone, concat, converge, curry, divide, flatten, head, ifElse, is, last, length, multiply, negate, of, pair, pipe, prop, reduce, remove, repeat, slice, subtract, tap, __ } from 'ramda'
import { IDateOption, Interval } from '../react-app-env'

// const opt = { days: [1, 2, 3], lengthDays: 7, limit: 10, mode: 'week|range', startDate: '', endDate: '' }
const interval = 7
const countDays = pipe<any, number[], number>(
  prop('days'), length
)
const ceilLimit = pipe(
  converge(
    divide, [prop('limit'), countDays]
  ), Math.ceil
)

export const addDaysToDate: any = curry((
  currentDate: string, count: number, flag: Interval
) => moment(
  currentDate, 'DD.MM.YYYY'
).add(
  count, flag
)
  .format('DD.MM.YYYY'))
export const dayToDate = pipe<string[], any, any, any>(
  pair,
  converge(
    concat, [pipe(ifElse(
      pipe(
        prop<any>(0), is(String)
      ), pipe(
        prop<any>(0), of
      ), prop<any>(0)
    )), pipe( 
      converge(
        addDaysToDate(
          __, __, 'days'
        ), [pipe(
          prop(0), last
        ), prop<any>(1)]
      ),
      of
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
  // tap(console.log),
  // pipe(
  //   aperture(2),
  //   tap(console.log),
  //   reduce(
  //     (
  //       acc: number[], curr: number[]
  //     ) => { 
  //       if (curr[1] < curr[0]) {
  //         const calcL = (interval - curr[0]) + curr[1]
  //         acc.push(calcL)
  //       } else {
  //         const calcG = curr[1] - curr[0]
  //         acc.push(calcG)
  //       }
  //       return acc
  //     }, []
  //   )
  // ),
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
      reduce, [always(dayToDate), prop('startDate'), pipe(
        prop('template'), remove(
          0, 1
        )
      )]
    )
  ),
  tap(console.log)
)// (opt)
