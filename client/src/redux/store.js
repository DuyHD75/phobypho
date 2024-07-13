import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import userReducer from './features/userSlice';
import authModalReducer from './features/authModalSlice';
import globalLoadingReducer from './features/globalLoading';

const store = configureStore({
     reducer: {
          appState: appStateReducer,
          user: userReducer,
          authModal: authModalReducer,
          globalLoading: globalLoadingReducer
     }
});



export default store;