import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { append, clone, filter, ifElse, is, not, pipe, Placeholder, prop, propEq, split, __ } from 'ramda'
import { RootState } from '../../app/store'
import { ColumnType, GeneratorState, TypeLimiting } from '../../react-app-env.d'
import { dayOfWeekToDate } from '../../utils/dates'
import { addParam, cartesianCondition, findAndMerge } from '../../utils/popular'

export const initialState: GeneratorState = {
  columns: [
    {
      name: 'city',
      label: 'City',
      type: 'sequence',
      template: [
        'Moscow', 'London', 'Jerusalem'
      ]
    },
    {
      name: 'product',
      label: 'Product',
      type: 'sequence',
      template: [
        'Socks', 'T-Shirt', 'Coat', 'Jeans', 'Trousers', 'Sneakers'
      ]
    },
    {
      name: 'Skill',
      label: 'Job Skill',
      type: 'sequence',
      template: [
        'Baker', 'Health Educator', 'Budget Analyst', 'Design Engineer', 'Designer', 'Backend Developer'
      ]
    }
  ],
  rows: [],
  limiting: null
}

export const generatorSlice = createSlice(
  {
    name: 'generator',
    initialState,
    reducers: {
      createColumn: (
        state, action: PayloadAction<ColumnType>
      ) => {
        state.columns = pipe<any, any, any, any>(
          ifElse(
            pipe(
              prop(
                'template'
              ),
              is(
                String
              )
            ),
            addParam(
              'template',
              pipe(
                prop<any, any>(
                  'template'
                ),
                split(
                  '\n'
                )
              ),
              [ clone ]
            ),
            dayOfWeekToDate
          ),
          append<any, any, any[]>(
            __, state.columns
          )
        )(
          action.payload
        )
      },
      removeColumn: (
        state, action: PayloadAction<ColumnType>
      ) => {
        const name = action.payload.name

        state.columns = filter(
          pipe(
            propEq(
              'name', name
            ), not
          ), state.columns
        )
      },
      setLimit: (
        state, action: PayloadAction<TypeLimiting>
      ) => {
        state.limiting = action.payload
      },
      run: state => {
        const { columns, limiting } = current(
          state
        )
        
        state.rows = cartesianCondition(
          columns, limiting
        )
      },
      changeColumn: (
        state: any, action: PayloadAction<ColumnType>
      ) => {
        state.columns = findAndMerge(
          state.columns, action.payload, 'name'
        )
      }
    }
  }
)

export const { createColumn, removeColumn, changeColumn, run, setLimit } = generatorSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.countevalue)`
export const selectColumns = (
  state: RootState
) => state.generator.columns
export const selectRows = (
  state: RootState
) => state.generator.rows
export const selectLimiting = (
  state: RootState
) => state.generator.limiting

export default generatorSlice.reducer
