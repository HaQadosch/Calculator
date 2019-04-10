import React from 'react'

export const ButtonNumber = ({ value, setDisplay, display, history: { total, operation, currentValue }, setHistory }) => {
  const handleClick = _ => {
    if (!currentValue) {
      if (value === '.') {
        value = '0.'
      }
      if (!operation) {
        setDisplay(`${value}`)
        setHistory({ currentValue: value })
      } else {
        setDisplay(`${display}${value}`)
        setHistory({ total, operation, currentValue: value })
      }
      return
    }

    const newValue = `${currentValue}${value}`
    try {
      if (Number.isNaN(Number(newValue))) {
        return
      }
    } catch (error) {
      return
    }
    setDisplay(`${display}${value}`)
    setHistory({ total, operation, currentValue: newValue })
  }

  return <button onClick={handleClick} >{value}</button>
}
