import React from 'react'
import './Screen.css'

export const Screen = ({ display }) => {
  return (
    <div className='screen'>
      <p>{display}</p>
    </div>
  )
}
