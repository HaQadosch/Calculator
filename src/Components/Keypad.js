import React from 'react'
import { keypad } from '../keypadSetup'
import { ButtonOperator } from './ButtonOperator'
import { ButtonNumber } from './ButtonNumber'
import './Keypad.css'

export const Keypad = ({ display, setDisplay, history, setHistory }) => {
  const keys = keypad.setup()
  return (
    <section className='keypad'>
      {keys.map((row, indRow) => <div key={indRow} >{row.map(({ type, value, action }, indKey) => type === 'number'
        ? <ButtonNumber key={`${indRow}_${indKey}`} history={history} setHistory={setHistory} display={display} setDisplay={setDisplay} value={value} />
        : <ButtonOperator key={`${indRow}_${indKey}`} display={display} setDisplay={setDisplay} history={history} setHistory={setHistory} value={value} action={action} />
      )}</div>)}
    </section>
  )
}
