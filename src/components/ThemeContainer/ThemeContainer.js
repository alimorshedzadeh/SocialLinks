

import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import SnackBarAlert from '../SnackBarAlert/SnackBarAlert';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

class ThemeContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rtl: true
        }
    }

    render() {
        const { isDark, children, isDashboard, lang } = this.props;
        // Create a theme instance.
        // const state = useSelector(state => state.darkMoodReducer)
        const myTheme = createTheme({
            palette: {
                mode: isDark ? 'dark' : 'light',
                secondary: {
                    main: '#ffa730',
                },
                primary: {
                    main: "#49a5d1",
                },
                common: {
                    main: isDark ? '#fff' : "#000",

                }
            },
            props: {
                MuiFilledInput: {
                    disableUnderline: true,
                }
            },
            components: {
                MuiButton: {
                    styleOverrides: { root: { boxShadow: 'none !important' } }
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            backgroundColor: isDark ? '#032036' : '#fff'
                        },
                    },
                },
            },

            typography: {
                allVariants: {
                    color: isDark ? '#fff' : '#000'
                },
                "fontFamily": ` ${lang == 'en' ? "Roboto" : "iranSans"} `,
            },

        }
        );
        return (
            <RTL >
                <ThemeProvider theme={myTheme}>
                    <Helmet>
                        <style>{'body{direction:rtl}'}</style>
                        <style>{isDark ? 'body{background:#151b25}' : 'body{background:#fff}'}</style>
                    </Helmet>
                    {children}
                    <SnackBarAlert />
                </ThemeProvider>
            </RTL>

        )
    }
}
function mapStateToProps(state) {
    return { isDark: state.modeReducer };
}


export default connect(mapStateToProps)(ThemeContainer);

