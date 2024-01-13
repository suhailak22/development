import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Dashboard from './Dashboard'
import Header from '../Components/Header'

function Users() {
    const [hideBarr, setHideBarr] = useState(true);
  const [Theme, setTheme] = useState(true);
  function handleSidebar(data) {
    setHideBarr(data);
  }
  function handleTheme(data) {
    setTheme(data);
  }
  return (
    <div className='users'>
        <Sidebar theme={Theme} barStatus={handleSidebar} />

        <div
        className="dashboard-content"
        style={{ width: hideBarr ? "82%" : "95%" }}
      >
        <div className="page-section">
        <Header pagePath={'Properties'} Changetheme={handleTheme} width={hideBarr ? "80%" : "85%"} />
          
        </div>
        </div>
    </div>
  )
}

export default Users