import {configureStore} from '@reduxjs/toolkit'
import dashboardSlice from '../reducers/dashboardSlice';

const store = configureStore({
    reducer:{
        dashboard: dashboardSlice,
    }
});

export default store