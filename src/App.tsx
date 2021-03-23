import React from 'react'
import { TableGen } from './features/generator/Table'
import { Button, Dropdown } from 'antd'
import { DownOutlined, SettingFilled } from '@ant-design/icons'
import { AddColumn } from './components/AddColumn'
import 'antd/dist/antd.css' 

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown
          overlay={ <AddColumn /> }
          trigger={ ['click'] }
        >
          <a
            className="ant-dropdown-link"
            onClick={ e => e.preventDefault() }
          >
            Add Column <DownOutlined />
          </a>
        </Dropdown>
        <Dropdown
          overlay={ <AddColumn /> }
          placement="topRight"
          trigger={ ['click'] }
        >
          <Button
            icon={ <SettingFilled /> }
            type="primary"
          >
            Option
          </Button>
          {/* <a className="ant-dropdown-link" onClick={ e => e.preventDefault() }>
            Add Column <DownOutlined />
          </a> */}
        </Dropdown>
        <TableGen />
      </header>
    </div>
  )
}

export default App
