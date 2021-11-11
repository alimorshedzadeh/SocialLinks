import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { OpenAlert } from '../redux/alert/action';

const DeleteDialog = ({
    title,
    id,
    open,
    refresh,
    onClose
}) => {
    const [value, setValue] = React.useState()
    const dispatch = useDispatch()
    const handleDelete = async () => {
        setValue('')
        try {
            const response = axios.delete('http://localhost:3030/socials/' + id)
            const config = {
                type: 'plain',
                open: true,
                msg: 'لینک با موفقیت حذف شد'
            }
            dispatch(OpenAlert(config))
            onClose()
            refresh()
        }
        catch (e) {
            const config = {
                type: 'error',
                open: true,
                msg: 'عملیات با خطا مواجه شد'
            }
            dispatch(OpenAlert(config))
        }
    }
    return (

        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle>آیا از تصمیم خود مطمئن هستید ؟</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    برای حذف مسیر ارتباطی {title} لطفا تایید را بنویسید.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    value={value}
                    placeholder="تایید"
                    fullWidth
                    onKeyUp={(e) => {if (e.key == 'Enter' && value == 'تایید') handleDelete()} }
                    onChange={e => setValue(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>انصراف</Button>
                <Button onClick={handleDelete} color="error" disabled={value !== 'تایید'} >حذف</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;