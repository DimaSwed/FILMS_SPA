import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeAppReducer from './slices/slice-theme'

const rootReducer = combineReducers({
  theme: themeAppReducer
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
