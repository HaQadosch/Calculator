import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  RootState,
  pushHistory, replaceHistory, clearHistory,
  setTotal,
  setTemp,
  setState
} from "../Store/rootReducer"
import { AppDispatch } from "../Store/store"
import { Status } from "../Store/Slices/statusSlice";
import { operate } from "../Utils/ops";

interface IOperatorButton {
  operator: string
  id: string
}

const OperatorButton: React.FC<IOperatorButton> = ({ id, operator }) => {
  const dispatch: AppDispatch = useDispatch()
  const history = useSelector(({ history }: RootState) => history)
  const { value: total } = useSelector(({ total }: RootState) => total)
  const { state: status } = useSelector(({ status }: RootState) => status)
  const { tempValue } = useSelector(({ temp }: RootState) => temp)

  return (
    <button id={ id } onClick={ handleClick } className={ id === 'subtract' && status === Status.MaybeNegative ? 'negative' : '' }>
      { operator }
    </button>
  )

  function handleClick (_: React.MouseEvent<HTMLButtonElement>): void {
    switch (status) {
      case Status.FollowUpInput: // After entering a valid number.
        dispatch(pushHistory({
          prevValue: total,
          operator
        }))
        const temp = history.concat([{ prevValue: total, operator }]).reduce((accHistory, curHistory) => {
          return { prevValue: operate(accHistory.operator)(Number.parseFloat(accHistory.prevValue), Number.parseFloat(curHistory.prevValue)).toString(10), operator: curHistory.operator }
        })
        dispatch(setTemp({ tempValue: temp.prevValue }))
        dispatch(setTotal({ value: '0' }))
        dispatch(setState({ state: Status.OperatorInput }))
        break
      case Status.OperatorInput: // After pressing a operator.
        // Second time pushing for operator, this is to replace the previous one.
        // Unless you input a - which might indicate that the second number is negative.
        if (operator === '-') {
          dispatch(setState({ state: Status.MaybeNegative }))
          dispatch(setTemp({
            tempSign: '',
            tempValue
          }))
        } else {
          dispatch(replaceHistory({
            operator
          }))
        }
        break
      case Status.MaybeNegative: // Just after pressing the - button.
        // That was just a mistake, overwrite with the last operator.
        dispatch(setState({ state: Status.OperatorInput }))
        dispatch(replaceHistory({
          operator
        }))
        break
      case Status.TotalInput: // Just after the end of the previous evaluation.
        // Using the result of the previous calculation.
        dispatch(clearHistory())
        dispatch(pushHistory({
          prevValue: total,
          operator
        }))
        dispatch(setTotal({ value: '0' }))
        dispatch(setState({ state: Status.OperatorInput }))
        break
      case Status.FirstInput: // When this is the first button you press.
        // The `-` ops in considered minus sign.
        if (operator === '-') {
          dispatch(setState({ state: Status.MaybeNegative }))
          dispatch(setTemp({
            tempValue: '0',
            tempSign: '-'
          }))
        }
        break
      default:
      // Do nothing. 
    }
  }
}

export const OpAdd: React.FC = () => <OperatorButton id="add" operator="+" />
export const OpSubtract: React.FC = () => <OperatorButton id="subtract" operator="-" />
export const OpMultiply: React.FC = () => <OperatorButton id="multiply" operator="*" />
export const OpDivide: React.FC = () => <OperatorButton id="divide" operator="/" />
