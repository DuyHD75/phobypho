import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import userReducer from './features/userSlice';
import authModalReducer from './features/authModalSlice';
import globalLoadingReducer from './features/globalLoading';
import bookingReducer from './features/bookingSlice';

const store = configureStore({
     reducer: {
          appState: appStateReducer,
          user: userReducer,
          authModal: authModalReducer,
          globalLoading: globalLoadingReducer,
          bookingReducer: bookingReducer
     }
});



export default store;