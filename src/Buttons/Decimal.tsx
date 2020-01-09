import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  RootState,
  appendTotal, setTotal,
} from "../Store/rootReducer"
import { AppDispatch } from "../Store/store"
import { Status } from "../Store/Slices/statusSlice"

export const Decimal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { state: status } = useSelector(({ status }: RootState) => status)
  const { value: total } = useSelector(({ total }: RootState) => total)

  return (
    <button id="decimal" onClick={ handleClick }>
      .
    </button>
  )

  function handleClick (_: React.MouseEvent<HTMLButtonElement>): void {
    switch (status) {
      case Status.TotalInput:
      case Status.OperatorInput:
      case Status.FirstInput: // No previous input for that number, I assume the number is 0.xxx
        dispatch(setTotal({
          value: '0.'
        }))
        break
      case Status.FollowUpInput: // The number becomes a float.
      case Status.MaybeNegative:
        if (!/\./.test(total)) {
          dispatch(appendTotal({
            value: '.'
          }))
        }
        break
    }
  }
}
