import React from 'react'

import { useDispatch } from 'react-redux'
import { clear, clearHistory, clearTemp, setState } from "../Store/rootReducer"
import { AppDispatch } from "../Store/store";
import { Status } from "../Store/Slices/statusSlice";

export const Clear: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  return (
    <button id="clear" onClick={ handleClick }>
      AC
    </button>
  )

  function handleClick () {
    dispatch(clear())
    dispatch(clearHistory())
    dispatch(clearTemp())
    dispatch(setState({ state: Status.FirstInput }))
  }
}

/**
 * {type: 'total/setTotal', payload: { value: 1954 }}
 */