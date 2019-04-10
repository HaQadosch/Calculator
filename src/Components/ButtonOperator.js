import React from 'react'

export const ButtonOperator = ({ display, setDisplay, history: { total, operation, currentValue }, setHistory, value, action }) => {
  const handleClick = _ => {
    if (value === 'C') {
      setHistory({})
      setDisplay('')
      return
    }

    if (value === '=') {
      if (!operation) {
        setHistory({ total, currentValue })
      } else {
        const newTotal = operation(total)(currentValue)
        setHistory({ total: newTotal })
        setDisplay(newTotal)
      }
      return
    }

    if (!currentValue && !operation) {
      if (total !== undefined) {
        setHistory({ operation: action, total })
        setDisplay(`${total}${value}`)
      }
      return
    }

    if (!operation) {
      setHistory({ total: currentValue, operation: action })
      setDisplay(`${display}${value}`)
      return
    }
    const newTotal = !total
      ? currentValue
      : action(total)(currentValue)
    setHistory({ total: newTotal, operation: action })
    setDisplay(`${total}${value}`)
  }

  return <button onClick={handleClick} >{value}</button>
}
