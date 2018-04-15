import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import {grey500, white} from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import {Link} from 'react-router'
import ThemeDefault from '../theme-default'

const LoginPage = () => {

    const styles = {
        loginContainer: {
            minWidth: 320,
            maxWidth: 400,
            height: 'auto',
            position: 'absolute',
            top: '20%',
            left: 0,
            right: 0,
            margin: 'auto'
        },
        paper: {
            padding: 20,
            overflow: 'auto'
        },
        buttonsDiv: {
            textAlign: 'center',
            padding: 10
        },
        flatButton: {
            color: grey500
        },
        checkRemember: {
            style: {
                float: 'left',
                maxWidth: 180,
                paddingTop: 5
            },
            labelStyle: {
                color: grey500
            },
            iconStyle: {
                color: grey500,
                borderColor: grey500,
                fill: grey500
            }
        },
        loginBtn: {
            float: 'left',
            marginLeft:'40%'
        },
        btn: {
            background: '#4f81e9',
            color: white,
            padding: 7,
            borderRadius: 2,
            margin: 2,
            fontSize: 13
        },
        btnFacebook: {
            background: '#4f81e9'
        },
        btnGoogle: {
            background: '#e14441'
        },
        btnSpan: {
            marginLeft: 5
        },
    }

    return (
        <MuiThemeProvider muiTheme={ThemeDefault}>
            <div>
                <div style={styles.loginContainer}>

                    <Paper style={styles.paper}>

                        <form>
                            <TextField
                                hintText="用户名"
                                floatingLabelText="用户名"
                                fullWidth={true}
                            />
                            <TextField
                                hintText="密码"
                                floatingLabelText="密码"
                                fullWidth={true}
                                type="password"
                            />

                            <div>
                               {/* <Checkbox
                                    label="Remember me"
                                    style={styles.checkRemember.style}
                                    labelStyle={styles.checkRemember.labelStyle}
                                    iconStyle={styles.checkRemember.iconStyle}
                                />*/}

                                <Link to="/index">
                                    <RaisedButton label="登录"
                                                  primary={true}
                                                  style={styles.loginBtn}/>
                                </Link>
                            </div>
                        </form>
                    </Paper>

                </div>
            </div>
        </MuiThemeProvider>
    )
}

export default LoginPage
