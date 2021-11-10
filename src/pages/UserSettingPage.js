import { makeStyles } from "@mui/styles";
import Layout from "../layouts/Layout";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux'
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))
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
    const isDark = useSelector(state=>state.modeReducer)
    const classes = useStyles()
    return (
        <Layout>
            <div className={classes.root}>
                <Container sx={{paddingTop:20,paddingBottom:20}}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6">
                            حساب کاربری
                        </Typography>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                        <Paper variant={!isDark&&'outlined'} sx={{
                            mt:5,
                            borderRadius:7,
                            backgroundColor:isDark&&'#202a35'       ,
                            width:'100%',
                            minHeight:500,
                        }}>

                        </Paper>
                </Container>
            </div>
        </Layout>
    );
}

export default UserSettingPage;