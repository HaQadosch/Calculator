import { produce, Draft } from "immer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type IHistoryState = {
  readonly prevValue: string
  readonly operator: string
}[]

const initialState: IHistoryState = []

const clearReducer = {
  clear: (state: IHistoryState) => produce(state, (_: Draft<IHistoryState>) => initialState)
}

export interface IHistoryOpsPayload {
  prevValue: string
  operator: string
}

export interface IHistoryReplacePayload {
  operator: string
}

/**
 * { type: 'history/pushHistory', payload: { prevalue, operation } }
 * 
 * We only keep the last 5 operations.
 * The List is being displayed from top to bottom, so the operations are stored in reverse.
 */
const pushHistoryReducer = {
  pushHistory: (state: IHistoryState, action: PayloadAction<IHistoryOpsPayload>) => produce(state, (draft: Draft<IHistoryState>) => {
    draft.push(action.payload)
    if (draft.length === 6) draft.splice(0, 1)
  })
}

const replaceHistoryReducer = {
  replaceHistory: (state: IHistoryState, action: PayloadAction<IHistoryReplacePayload>) => produce(state, (draft: Draft<IHistoryState>) => {
    draft[draft.length - 1].operator = action.payload.operator
  })
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    ...clearReducer,
    ...pushHistoryReducer,
    ...replaceHistoryReducer
  }
})