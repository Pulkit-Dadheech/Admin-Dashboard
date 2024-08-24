import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/widgets/dashboardSlice';

export const store = configureStore({
    reducer: {
        subDashboard: dashboardReducer
    }
});
