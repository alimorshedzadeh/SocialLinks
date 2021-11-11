import { actionTypes } from './action';

export const defaultState = { open: false, type: 'success',msg:'' };

export const AlertReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALERT_OPEN:
            return action.payload;
        case actionTypes.SET_ALERT_CLOSE:
            return action.payload;
        default:
            return state;
    }
};
