import { createSlice } from '@reduxjs/toolkit'

const dataIdSlice = createSlice({
    name: "dataId",
    initialState: {
        isLoading: false,
        isSucc: false,
        dataId: [],
        isFail: null
    },
    reducers: {
        dataIdLoad: (state, action) => {
            state.isLoading = true
        },
        dataIdSucc: (state, action) => {
            state.isLoading = false
            state.isSucc = true
            state.dataId = action.payload
        },
    }

})

export const { dataIdLoad, dataIdSucc } = dataIdSlice.actions

export default dataIdSlice.reducer