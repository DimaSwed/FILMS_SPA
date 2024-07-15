import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IThemeState {
  theme: string
}

const initialState: IThemeState = {
  theme: 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeReducer: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    }
  }
})

export const { themeReducer } = themeSlice.actions
export default themeSlice.reducer
