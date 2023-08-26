import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: "Data",
    initialState: {
        isLoading: false,
        isSucces: false,
        data: [],
        weatherDat: [],
        isFail: null
    },
    reducers: {
        dataLoading: (state, action) => {
            state.isLoading = true
        },
        dataSucc: (state, action) => {
            state.isSucces = true
            state.isLoading = false
            state.data = action.payload
        },
        weatherDatsucc: (state, action) => {
            state.weatherDat = action.payload
        },
        dataFail: (state, action) => {
            state.isLoading = false
            state.isSucces = false
            state.isFail = action.payload
        }
    }
})

export const { dataLoading, dataSucc, dataFail, weatherDatsucc } = dataSlice.actions

export default dataSlice.reducer
