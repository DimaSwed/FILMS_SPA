import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeAppReducer from './slices/slice-theme'
import { moviesApi } from '../services/moviesApi'

const rootReducer = combineReducers({
  theme: themeAppReducer,
  [moviesApi.reducerPath]: moviesApi.reducer
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Добавляем moviesApi middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
