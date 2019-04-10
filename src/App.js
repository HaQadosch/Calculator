import React, { useState } from 'react'
import './App.css'
import { Screen } from './Components/Screen'
import { Keypad } from './Components/Keypad'

export const App = () => {
  const [history, setHistory] = useState({})
  const [display, setDisplay] = useState('')

  return (
    <>
      <Screen display={display} />
      <Keypad setDisplay={setDisplay} display={display} setHistory={setHistory} history={history} />
    </>
  )
}
