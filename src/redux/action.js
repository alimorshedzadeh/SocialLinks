export const actionTypes = {
    SET_MODE_LIGHT: 'SET_MODE_LIGHT',
    SET_MODE_DARK: 'SET_MODE_DARK',
};

export const setMode = (payload) => ({
    type: actionTypes.SET_MODE_DARK,
    payload,
});

