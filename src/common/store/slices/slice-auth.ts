// slices/slice-auth.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface AuthState {
//   isAuthenticated: boolean
// }

// const initialState: AuthState = {
//   isAuthenticated: false
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuthenticated: (state, action: PayloadAction<boolean>) => {
//       state.isAuthenticated = action.payload
//     }
//   }
// })

// export const { setAuthenticated } = authSlice.actions

// export default authSlice.reducer
// slices/slice-auth.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  sessionId?: string
}

const initialState: AuthState = {
  isAuthenticated: false,
  sessionId: undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
      console.log('Redux state updated - isAuthenticated:', state.isAuthenticated)
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload // устанавливаем sessionId
      console.log('Redux state updated - sessionId:', state.sessionId)
    }
  }
})

export const { setAuthenticated, setSessionId } = authSlice.actions

export default authSlice.reducer
