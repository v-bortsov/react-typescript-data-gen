import moment from 'moment'
import { always, aperture, assoc, chain, clone, concat, converge, curry, divide, flatten, ifElse, is, last, length, of, pair, pipe, prop, reduce, repeat, when, __ } from 'ramda'
import { Interval } from '../react-app-env'

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
  currentDate: string,
  count: number, flag: Interval
) => moment(
  currentDate, 'DD.MM.YYYY'
).add(
  count, flag
)
  .format('DD.MM.YYYY'))
export const dayToDate = pipe<string[], any, any, any>(
  pair,
  converge(
    concat, [pipe(
      prop<any>(0), 
      when(
        is(String),
        of
      )
    ), pipe( 
      converge(
        addDaysToDate(
          __, __, 'days'
        ), [
          pipe(
            prop<any>(0),
            ifElse(
              is(String), clone, last
            )
          ),
          prop<any>(1)
        ]
      ),
      of
    )]
  )
)
export const transformDates = pipe<any, any, any, any>(
  chain(
    assoc('template'), pipe(
      converge(
        repeat, [prop('days'), ceilLimit]
      ),
      flatten
    )
  ),
  // transfer from dayOfWeek to addDay
  chain(
    assoc('template'), pipe<any, any, any, any>(
      prop('template'),
      aperture(2),
      reduce(
        (
          acc: number[], curr: number[]
        ) => {
          acc.push(curr[1] < curr[0] ? ((interval - curr[0]) + curr[1]) : (curr[1] - curr[0]))
          return acc
        }, []
      )
    )
  ),
  chain(
    assoc('dates'),
    converge(
      reduce, [always(dayToDate), prop('startDate'),
        prop('template')
      ]
    )
  )
)// (opt)
