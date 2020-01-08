import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  RootState,
  pushHistory, replaceHistory,
  setTotal,
  setTemp,
  setState
} from "../Store/rootReducer"
import { AppDispatch } from "../Store/store"
import { Status } from "../Store/Slices/statusSlice";
import { operate } from "../Utils/ops";

export const Equals: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useSelector(({ history }: RootState) => history)
  const { value: lastValue } = useSelector(({ total }: RootState) => total)
  const { tempValue: tempTotal } = useSelector(({ temp }: RootState) => temp)
  const { state: status } = useSelector(({ status }: RootState) => status)


  return (
    <button id="equals" onClick={ handleClick }>
      =
    </button>
  )

  function handleClick (_: React.MouseEvent<HTMLButtonElement>): void {
    switch (status) {
      case Status.OperatorInput: // Result has already been computed as temp in the last ops dispatch.
        dispatch(replaceHistory({
          operator: '='
        }))
        dispatch(setTotal({ value: tempTotal }))
        dispatch(setState({ state: Status.TotalInput }))
        break
      case Status.FollowUpInput:
        dispatch(pushHistory({
          prevValue: lastValue,
          operator: '='
        }))
        {
          const lastOperator = history[history.length - 1]?.operator
          const total = operate(lastOperator)(Number.parseFloat(tempTotal), Number.parseFloat(lastValue)).toString(10)
          dispatch(setTemp({ tempValue: total }))
          dispatch(setTotal({ value: total }))
        }
        dispatch(setState({ state: Status.TotalInput }))
        break
      case Status.FirstInput:
      case Status.TotalInput:
      default:
      // Do nothing. 
    }
  }
}
