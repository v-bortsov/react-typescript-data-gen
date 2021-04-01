import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import renderer from 'react-test-renderer'
import App from './App'
import { RadioGroup } from './components/RadioGroup'
global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn()
  }
}
// beforeAll(() => {
//   Object.defineProperty(
//     window, 'matchMedia', {
//       writable: true,
//       value: jest.fn().mockImplementation(query => ({
//         matches: false,
//         media: query,
//         onchange: null,
//         addListener: jest.fn(), // Deprecated
//         removeListener: jest.fn(), // Deprecated
//         addEventListener: jest.fn(),
//         removeEventListener: jest.fn(),
//         dispatchEvent: jest.fn()
//       }))
//     }
//   )
// })
it(
  'renders learn react link', () => {
    const { getByText } = render(
      <Provider store={ store }>
        <App />
      </Provider>
    )
  
    expect(
      getByText(
        /Add Column/i
      )
    ).toBeInTheDocument()
  }
)
it(
  'renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={ store }>
          <RadioGroup />
        </Provider>
      )
      .toJSON()
    expect(
      tree
    ).toMatchSnapshot()
  }
)
