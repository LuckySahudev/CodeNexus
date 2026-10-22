import React from 'react'
import { Outlet } from 'react-router-dom'

const DevContainer = () => {
  return (
    <div className="min-h-0 h-full flex-1 overflow-y-scroll bg-mist-900 p-6 text-2xl scrollbar-hide" >
      <Outlet />
    </div>
  )
}

export default DevContainer
