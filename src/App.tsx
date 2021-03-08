import React from 'react'
import { TableGen } from './features/generator/Table'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { AddColumn } from './components/AddColumn'
function App () {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown overlay={ <AddColumn /> } trigger={ ['click'] }>
          <a className="ant-dropdown-link" onClick={ e => e.preventDefault() }>
            Add Column <DownOutlined />
          </a>
        </Dropdown>
        <TableGen />
      </header>
    </div>
  )
}

export default App
