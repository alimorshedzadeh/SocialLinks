import { actionTypes } from './action';

export const modeState=false;

export const modeReducer = (state = modeState, action) => {
    switch (action.type) {
        case actionTypes.SET_MODE_DARK:
            return action.payload;
        case actionTypes.SET_MODE_LIGHT:
            return false;
        default:
            return state;
    }
};
