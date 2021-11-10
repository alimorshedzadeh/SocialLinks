

import React, { Component } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';
import { create } from 'jss';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
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
            direction: this.state.rtl ? 'rtl' : 'ltr',
            palette: {
                mode: isDark ? 'dark' : 'light',
                secondary: {
                    main: '#FF409A',
                },
                primary: {
                    main: "#49a5d1",
                },
                common:{
                    main: isDark ? '#fff' : "#000",

                }
            },
            props: {
                MuiFilledInput: {
                    disableUnderline: true,
                }
            },
            components: {
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
            <ThemeProvider theme={myTheme}>
                <Helmet>
                    <style>{'body{direction:rtl}'}</style>
                    <style>{isDark?'body{background:#151b25}':'body{background:#fff}'}</style>
                </Helmet>
                {children}
            </ThemeProvider>
        )
    }
}
function mapStateToProps(state) {
    return { isDark: state.modeReducer };
}


export default connect(mapStateToProps)(ThemeContainer);

