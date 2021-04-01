import { enumToObject, findAndMerge } from './popular'
import { DaysOfWeek } from '../react-app-env.d'

it(
  'enumToObject', () => {
    expect(
      enumToObject(
        DaysOfWeek
      )
    ).toEqual(
      {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
      }
    )
  }
)
it(
  'findAndMerge', () => {
    expect(
      findAndMerge(
        [{ test: 'a' }, { test: 'b' }, { test: 'c' }], { test: 'c', prop: 'add' }, 'test'
      )
    ).toEqual(
      [{ test: 'a' }, { test: 'b' }, { test: 'c', prop: 'add' }]
    )
  }
)
