import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { append, filter, flatten, map, mergeDeepRight, mergeRight, not, pipe, prop, propEq, when, xprod, zipObj, __ } from 'ramda'
import { RootState } from '../../app/store'
export type ColumnType = {
  name: string
  label?: string
  type?: string
  template: string[]
}

interface GeneratorState {
  columns: ColumnType[]
  rows: any[]
}

const initialState: GeneratorState = {
  columns: [{
    name: 'city',
    label: 'City',
    type: 'sequence',
    template: ['Moscow', 'London', 'Jerusalem']
  },
  {
    name: 'product',
    label: 'Product',
    type: 'sequence',
    template: ['Socks', 'T-Shirt', 'Coat', 'Jeans', 'Trousers', 'Sneakers']
  },
  {
    name: 'Skill',
    label: 'Job Skill',
    type: 'sequence',
    template: ['Baker', 'Health Educator', 'Budget Analyst', 'Design Engineer', 'Designer', 'Backend Developer']
  }
  ],
  rows: []
}

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    createColumn: (
      state, action: PayloadAction<ColumnType>
    ) => { 
      state.columns = append(
        action.payload, state.columns
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
    run: state => {
      const parts = map(
        prop('template'), state.columns
      )
      const result = parts.reduce(<any>xprod).map(<any>flatten)
      const columnsName: any[] = pipe(
        map(prop('name')), flatten
      )(state.columns)

      state.rows = map(
        <any>zipObj(columnsName), result
      )
    },
    changeColumn: (
      state: any, action: PayloadAction<ColumnType>
    ) => {
      state.columns = map(<any>when(
        propEq(
          'name', action.payload.name
        ), <any>mergeDeepRight(
          __, action.payload
        )
      ))(state.columns)
    }
  }
})

export const { createColumn, removeColumn, changeColumn, run } = generatorSlice.actions

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
export const selectColumns = (state: RootState) => state.generator.columns
export const selectRows = (state: RootState) => state.generator.rows

export default generatorSlice.reducer
