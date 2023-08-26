import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import dataIdSlice from './dataIdSlice'

export const store = configureStore({
    reducer: {
        data: dataSlice,
        dataId: dataIdSlice,
    },
})