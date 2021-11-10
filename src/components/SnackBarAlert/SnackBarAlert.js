import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { OpenAlert } from '../../redux/alert/action';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function SnackBarAlert() {

    const dispatch = useDispatch();
    let alert = useSelector(state => state.AlertReducer)
    const handleClose = (event, reason) => {
        if (reason !== 'clickaway') {
            dispatch(OpenAlert({ ...alert, open: false }))
        }

    };

    return (
        <div>
            {alert.type !== 'plain' && (

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={alert.open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={alert.type || 'error'}>
                        {alert.msg || '.........'}
                    </Alert>
                </Snackbar>)}

            {alert.type == 'plain' && (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={alert.open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={alert.msg}
                    action={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            )}
        </div>
    );
}