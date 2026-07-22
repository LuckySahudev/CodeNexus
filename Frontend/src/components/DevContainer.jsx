import React from 'react'
import { Outlet } from 'react-router-dom'

const DevContainer = () => {
  return (
    <div className=" h-full  flex-1 p-6 text-2xl bg-mist-900 overflow-y-scroll scrollbar-hide" >
      <Outlet />
    </div>
  )
}

export default DevContainer
