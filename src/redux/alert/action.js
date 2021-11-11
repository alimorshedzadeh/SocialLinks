
export const actionTypes = {
    SET_ALERT_OPEN: 'SET_ALERT_OPEN',
    SET_ALERT_CLOSE: 'SET_ALERT_CLOSE',
};

export const OpenAlert = (payload) => ({
    type: actionTypes.SET_ALERT_OPEN,
    payload,
});

export const CloseAlert = (payload) => ({
    type: actionTypes.SET_ALERT_CLOSE,
    payload
});
