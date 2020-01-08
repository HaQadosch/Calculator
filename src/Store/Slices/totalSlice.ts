import { produce, Draft } from "immer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITotalState {
  readonly value: string
}

export interface ISetTotalPayload {
  value: string
}

const initialState: ITotalState = {
  value: '0'
}

const setTotalReducer = {
  setTotal: (state: ITotalState, action: PayloadAction<ISetTotalPayload>) => produce(state, (_: Draft<ITotalState>) => action.payload)
}

const appendTotalReducer = {
  appendTotal: (state: ITotalState, action: PayloadAction<ISetTotalPayload>) => produce(state, (draft: Draft<ITotalState>) => {
    draft.value = `${ draft.value !== "0" ? draft.value : '' }${ action.payload.value }`
  })
}

const clearReducer = {
  clear: (state: ITotalState) => produce(state, (_: Draft<ITotalState>) => initialState)
}

export const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    ...setTotalReducer,
    ...appendTotalReducer,
    ...clearReducer
  }
})