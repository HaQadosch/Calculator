import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  RootState,
  appendTotal, setTotal,
  setState,
  clearHistory,
  clearTemp
} from "../Store/rootReducer"
import { AppDispatch } from "../Store/store"
import { Status } from "../Store/Slices/statusSlice"

interface IDigit {
  id: string
  value: string
  onClick: (value: string) => void
}

const digits: Pick<IDigit, 'id' | 'value'>[] = [
  { id: 'zero', value: '0' },
  { id: 'one', value: '1' },
  { id: 'two', value: '2' },
  { id: 'three', value: '3' },
  { id: 'four', value: '4' },
  { id: 'five', value: '5' },
  { id: 'six', value: '6' },
  { id: 'seven', value: '7' },
  { id: 'eight', value: '8' },
  { id: 'nine', value: '9' },
]

const Digit: React.FC<IDigit> = ({ value, id, onClick }) => {
  return (
    <button id={ id } onClick={ (_: React.MouseEvent<HTMLButtonElement>) => onClick(value) }>
      { value }
    </button>
  )
}

export const Digits: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { state: status } = useSelector(({ status }: RootState) => status)

  return (
    <>
      { digits.map(({ value, id }) => <Digit value={ value } id={ id } key={ id } onClick={ handleClick } />) }
    </>
  )

  function handleClick (value: string): void {
    switch (status) {
      case Status.FirstInput:
      case Status.TotalInput:
        dispatch(clearHistory())
        dispatch(clearTemp())
        dispatch(setTotal({ value }))
        dispatch(setState({ state: Status.FollowUpInput }))
        break
      case Status.FollowUpInput:
        dispatch(appendTotal({ value }))
        break
      case Status.OperatorInput:
        dispatch(appendTotal({ value }))
        dispatch(setState({ state: Status.FollowUpInput }))
        break
      case Status.MaybeNegative:
        dispatch(setTotal({ value: `-${ value }` }))
        dispatch(setState({ state: Status.FollowUpInput }))
        break
      default:
      // Do nothing. 
    }
  }
}