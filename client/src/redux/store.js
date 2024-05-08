import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appStateReducer from './features/appStateSlice';
import userReducer from './features/userSlice';
import authModalReducer from './features/authModalSlice';
import globalLoadingReducer from './features/globalLoading';


const persistConfig = {
     key: 'root',
     storage,
};

const store = configureStore({
     reducer: {
          appState: appStateReducer,
          user: persistReducer(persistConfig, userReducer),
          authModal: authModalReducer,
          globalLoading: globalLoadingReducer
     }
});

let  persistor = persistStore(store);

export  {store, persistor};