import { combineReducers } from "@reduxjs/toolkit";
import { totalSlice } from "./Slices/totalSlice";
import { historySlice } from "./Slices/historySlice";
import { tempValueSlice } from "./Slices/tempTotalSlice";
import { statusSlice } from "./Slices/statusSlice";

const { reducer: totalReducer, actions: { setTotal, clear, appendTotal } } = totalSlice
const { reducer: historyReducer, actions: { pushHistory, clear: clearHistory, replaceHistory } } = historySlice
const { reducer: tempValueReducer, actions: { setTemp, clear: clearTemp } } = tempValueSlice
const { reducer: statusReducer, actions: { setState, clear: clearStatus } } = statusSlice

export const rootReducer = combineReducers({
  total: totalReducer,
  history: historyReducer,
  temp: tempValueReducer,
  status: statusReducer
})

export type RootState = ReturnType<typeof rootReducer>
export {
  setTotal, clear, appendTotal,
  pushHistory, clearHistory, replaceHistory,
  setTemp, clearTemp,
  setState, clearStatus
}