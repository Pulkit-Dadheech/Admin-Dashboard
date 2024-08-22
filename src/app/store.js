import {configureStore} from '@reduxjs/toolkit';
import {dashboardSlice} from '../features/widgets/dashboardSlice';

export const store = configureStore({
    reducer: dashboardSlice
})