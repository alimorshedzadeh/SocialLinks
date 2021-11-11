import { makeStyles } from "@mui/styles";
import Layout from "../layouts/Layout";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import TwitterIcon from '@mui/icons-material/Twitter';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import InstagramIcon from '@mui/icons-material/Instagram';
import * as yup from 'yup'
import axios from 'axios'
import FacebookIcon from '@mui/icons-material/Facebook';
import { OpenAlert } from "../redux/alert/action";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeleteDialog from "../components/DeleteDialog";
const validationSchema = yup.object().shape({
    type: yup.string().required('پرکردن این فیلد الزامی است'),
    social_link: yup.string().required('پرکردن این فیلد الزامی است').url('لطفا یک لینک معتبر وارد نمایید'),
    social_id: yup.string().required('پرکردن این فیلد الزامی است').min(3, 'حداقل کاراکتر برای ای دی 3 می باشد'),
})


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))

function handleGetIcon(input) {
    switch (input) {
        case 'twitter': return <TwitterIcon />;
        case 'instagram': return <InstagramIcon />;
        case 'facebook': return <FacebookIcon />;
        case 'whatsapp': return <WhatsAppIcon />;
        case 'telegram': return <TelegramIcon />;
        case 'linkedIn': return <LinkedInIcon />;
        default: return <TwitterIcon />;
    }
}
const types = [
    {
        value: "twitter",
        title: "توییتر"
    },
    {
        value: "linkedIn",
        title: "لینکدین"
    },
    {
        value: "instagram",
        title: "اینستاگرام"
    },
    {
        value: "telegram",
        title: "تلگرام"
    },
    {
        value: "facebook",
        title: "فیس بوک"
    },
    {
        value: "whatsapp",
        title: "واتساپ"
    },
]

const breadcrumbs = [
    <Link underline="hover" key="1" color="text.primary" href="#" fontSize={12} >
        خانه
    </Link>,
    <Link
        underline="hover"
        key="2"
        color="text.primary"
        href="#"
        fontSize={12}
    >
        کاربر
    </Link>,
    <Typography key="3" fontSize={12} color="text.secondary">
        تنظیمات کاربری
    </Typography>,
];


const UserSettingPage = () => {
    const isDark = useSelector(state => state.modeReducer)
    const [state, setState] = useState('add')
    const [id, setId] = useState()
    const classes = useStyles()
    const dispatch = useDispatch()
    const [fetchedData, setFetchedData] = useState()
    const [deleteDialogOptions, setDeleteDialogOptions] = useState({
        open: false,
        id: '',
        title: '',
    })
    const handleAddSocial = () => {
        state !== 'add' ? setState('add') : setState(false)
    }

    const handleGetData = async () => {
        const { data } = await axios.get('http://localhost:3030/socials')
        setFetchedData(data)
    }

    const handleNewSocialLink = async (body) => {
        // Check for Duplicated Value
        if (fetchedData && fetchedData.length !== 0) for (let key in fetchedData) {
            const config = {
                type: 'error',
                open: true,
                msg: 'از استفاده از مقادیر تکراری خودداری نمایید'
            }
            if (fetchedData[key].social_link == body.social_link || fetchedData[key].social_id == body.social_id)
                return dispatch(OpenAlert(config))
        }
        // Start posting
        try {
            const response = await axios.post('http://localhost:3030/socials', body)
            const config = {
                type: 'plain',
                open: true,
                msg: 'عملیات با موفقیت انجام شد'
            }
            dispatch(OpenAlert(config))
            setFetchedData([...fetchedData, response.data])
        }
        // Handle Error
        catch (e) {
            const config = {
                type: 'error',
                open: true,
                msg: 'عملیات با خطا مواجه شد'
            }
            dispatch(OpenAlert(config))

        }
    }
    const handleEditSocialLink = async (body) => {
        const value = fetchedData.filter(item => item.id !== id)
        // Check for Duplicated Value
        if (value && value.length !== 0) for (let key in value) {
            const config = {
                type: 'error',
                open: true,
                msg: 'از استفاده از مقادیر تکراری خودداری نمایید'
            }
            if (value[key].social_link == body.social_link || value[key].social_id == body.social_id)
                return dispatch(OpenAlert(config))
        }
        try {
            const response = await axios.put('http://localhost:3030/socials/' + id, body)
            const config = {
                type: 'plain',
                open: true,
                msg: 'عملیات با موفقیت انجام شد'
            }
            dispatch(OpenAlert(config))
            handleGetData()
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
    function setFormEdit(setFieldValue, item) {
        setState('edit')
        setId(item.id)
        setFieldValue('type', item.type || '')
        setFieldValue('social_link', item.social_link)
        setFieldValue('social_id', item.social_id)
    }
    function handleResetFrom(reset) {
        if (state !== 'add') setState(false)
        reset()
    }
    const handleOpenDeleteDialog = (item) => {
        setDeleteDialogOptions({
            open: true,
            id: item.id,
            title: item.social_id
        })
    }
    function handleRemove() {
        let value = [...fetchedData]
        for (let key in value) {
            if (value[key].id == deleteDialogOptions.id) value.splice(key, 1)
        }
        console.log(value, id)
        setFetchedData(value)
    }

    useEffect(() => {
        handleGetData()
    }, [])
    return (
        <Layout>
            <div className={classes.root}>
                <Container sx={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6">
                            حساب کاربری
                        </Typography>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                    <Paper variant={!isDark && 'outlined'} sx={{
                        mt: 5,
                        padding: '20px 15px',
                        borderRadius: 5,
                        backgroundColor: isDark && '#202a35',
                        minHeight: 400,
                    }}>
                        <Formik
                            initialValues={{
                                type: '',
                                social_link: "",
                                social_id: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                if (state == 'add') await handleNewSocialLink(values);
                                if (state == 'edit') await handleEditSocialLink(values);
                                setSubmitting(false)
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                handleReset,
                                isSubmitting,
                                values,
                                errors,
                                touched,
                                setFieldValue
                            }) => <form onSubmit={handleSubmit}>  <Stack direction="column" spacing={3}>
                                <Typography variant="caption" letterSpacing={1} color="text.secondary">
                                    مسیر های ارتباطی
                                </Typography>
                                {state == 'edit' ?
                                    <Typography sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} variant="body2" color="secondary">
                                        <CreateOutlinedIcon />
                                        ویرایش مسیر ارتباطی
                                    </Typography> :
                                    <Typography onClick={handleAddSocial} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'fit-content' }} variant="body2" color="secondary">
                                        <AddIcon />
                                        افزودن مسیر ارتباطی
                                    </Typography>}
                                <Collapse in={Boolean(state)}>
                                    <Paper variant={!isDark && 'outlined'} sx={{
                                        padding: 2,
                                        borderRadius: 2,
                                        backgroundColor: isDark && 'rgba(255,255,255,0.1)',
                                    }}>

                                        <Collapse in={state == 'edit'}><Typography sx={{ mb: 3 }} variant="body2">ویرایش مسیر ارتباطی {values.type && types.find(item => item.value == values.type).title}</Typography></Collapse>
                                        <Grid container spacing={2}>
                                            <Grid item md={4} sm={6} xs={12}>
                                                <FormControl error={Boolean(errors.type) && touched.type} fullWidth >
                                                    <InputLabel id="demo-simple-select-helper-label">نوع*</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={values.type}
                                                        label="نوع*"
                                                        startAdornment={values.type && <InputAdornment sx={{ pr: 1 }}>
                                                            {handleGetIcon(values.type)}
                                                        </InputAdornment>}
                                                        name="type"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        {types.map((menuItem) => <MenuItem value={menuItem.value}>{menuItem.title}</MenuItem>)}

                                                    </Select>
                                                    <FormHelperText error={Boolean(errors.type) && touched.type}>{touched.type && errors.type}</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4} sm={6} xs={12}>
                                                <TextField label="لینک" fullWidth
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.social_link}
                                                    name="social_link"
                                                    error={Boolean(errors.social_link) && touched.social_link}
                                                    helperText={touched.social_link && errors.social_link}
                                                />
                                            </Grid>
                                            <Grid item md={4} sm={6} xs={12}>
                                                <TextField label="آی دی (ID)" fullWidth
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.social_id}
                                                    name="social_id"
                                                    error={Boolean(errors.social_id) && touched.social_id}
                                                    helperText={touched.social_id && errors.social_id}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Button disabled={isSubmitting} onClick={() => handleResetFrom(handleReset)} color="inherit" variant="outlined">
                                                        انصراف
                                                    </Button>&nbsp;&nbsp;
                                                    <Button disabled={isSubmitting} type="submit" variant="contained" color="secondary">
                                                        {!state || state !== "edit" ? 'افزودن' : <>
                                                            ویرایش مسیر ارتباطی {values.type && types.find(item => item.value == values.type).title}</>}
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    </Paper>
                                </Collapse>
                                {fetchedData && fetchedData.map((socialLink, index) => <Paper key={index} variant={!isDark && 'outlined'} sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    backgroundColor: isDark && 'rgba(255,255,255,0.1)',
                                }} >
                                    <Grid container flexWrap="wrap" spacing={3}>
                                        <Grid item sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} item>
                                            {handleGetIcon(socialLink.type)} &nbsp;
                                            <Typography variant="body2" component="span">{socialLink.type ? types.find(item => item.value == socialLink.type).title : types[0].title}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" component="span" color="text.secondary">آی دی (ID):</Typography>&nbsp;
                                            <Typography variant="body2" component="span" color="text.primary">{socialLink.social_id}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" component="span" color="text.secondary">لینک:</Typography>&nbsp;
                                            <Link href={socialLink.social_link}><Typography variant="body2" component="span" color="secondary">{socialLink.social_link}</Typography></Link>
                                        </Grid>
                                        <Grid item sx={{ flex: 1, textAlign: 'right' }}>
                                            <Button onClick={() => setFormEdit(setFieldValue, socialLink)} size="small" color="secondary">
                                                <CreateOutlinedIcon fontSize="small" />&nbsp;
                                                ویرایش
                                            </Button>&nbsp;
                                            <Button onClick={() => handleOpenDeleteDialog(socialLink)} size="small" color="error">
                                                <DeleteForeverOutlinedIcon fontSize="small" />&nbsp;
                                                حذف
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>)}

                            </Stack>
                                </form>}
                        </Formik>
                    </Paper>

                </Container>
            </div>
            <DeleteDialog
                open={deleteDialogOptions.open}
                onClose={() => setDeleteDialogOptions({ ...deleteDialogOptions, open: false })}
                refresh={handleRemove}
                title={deleteDialogOptions.title}
                id={deleteDialogOptions.id}
            />
        </Layout >
    );
}

export default UserSettingPage;