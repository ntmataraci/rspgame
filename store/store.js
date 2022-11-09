import { configureStore } from '@reduxjs/toolkit'
import gameSliceReducer  from './slice'
export const store = configureStore({
  reducer: {
    gameSliceReducer
  },
})