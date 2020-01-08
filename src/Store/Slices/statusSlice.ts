import { produce, Draft } from "immer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * 
 * 3 possible states: 
 *  - FirstInput, no matter what the display is, delete and replace with the new input
 *  - FollowUpInput, after the FirstInput, add the numbers and build the value
 *  - TotalInput, after the =, display the result of the operation, this is an end State.
 */


export enum Status {
  FirstInput = 'FirstInput',
  FollowUpInput = 'FollowUpInput',
  OperatorInput = 'OperatorInput',
  TotalInput = 'TotalInput',
  MaybeNegative = 'MaybeNegative'
}

interface ICalcState {
  readonly state: Status
}

export interface ISetCalcPayload {
  state: Status
}

const initialState: ICalcState = {
  state: Status.FirstInput
}

const setStateReducer = {
  setState: (state: ICalcState, action: PayloadAction<ISetCalcPayload>) => produce(state, (_: Draft<ICalcState>) => action.payload)
}

const clearReducer = {
  clear: (state: ICalcState) => produce(state, (_: Draft<ICalcState>) => initialState)
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    ...setStateReducer,
    ...clearReducer
  }
})