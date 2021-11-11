
import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import { modeReducer, modeState } from './reducer'
import { defaultState, AlertReducer } from './alert/reducer'
import { composeWithDevTools } from "redux-devtools-extension";
import storage from 'redux-persist/lib/storage';
//config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'modeReducer',
    ],
    blacklist: [
        'AlertReducer',
    ],
};
//combine
const persistedReducer = persistCombineReducers(persistConfig, { modeReducer,AlertReducer});
//state values
const initState = {
    modeReducer: modeState,
    AlertReducer:defaultState
};
//ignore this one
// eslint-disable-next-line import/prefer-default-export
export const myStore = createStore(
    persistedReducer,
    initState,
    composeWithDevTools(applyMiddleware()),
);
export let persistor =persistStore(myStore);


