// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import themeAppReducer from './slices/slice-theme'
// // import { moviesApi } from '../services/moviesApiKinopoisk'
// import { moviesApi } from '../services/moviesApiTMDB'

// const rootReducer = combineReducers({
//   theme: themeAppReducer,
//   [moviesApi.reducerPath]: moviesApi.reducer
// })

// export const makeStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     // Добавляем moviesApi middleware
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
//   })
// }

// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeAppReducer from './slices/slice-theme'
import authReducer from './slices/slice-auth'
import { moviesApi } from '../services/moviesApiTMDB'
import { createWrapper } from 'next-redux-wrapper'

const rootReducer = combineReducers({
  theme: themeAppReducer,
  auth: authReducer,
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
export const wrapper = createWrapper(makeStore)
