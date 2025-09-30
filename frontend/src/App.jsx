import React from 'react'
import LoginButton from './components/Login.jsx'
import LogoutButton from './components/Logout.jsx'
import Profile from './components/Profile.jsx'
function App() {
  return (
    <div>
      <div className="mainContainer flex flex-col">
        <LoginButton />
        <LogoutButton />
        <Profile/>
      </div>
    </div>
  )
}

export default App
