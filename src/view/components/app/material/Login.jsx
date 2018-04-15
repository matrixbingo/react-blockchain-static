import React, {Component /*,PropTypes*/} from 'react'
import LogoGather from '../queue-anim/LogoGather'
import {deepOrange500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import './Login.less'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state =
            {
                name: 'Cat in the Hat',
                multiline: 'Controlled'
            }
    }

    handleChangeMultiline(event) {
        this.setState({
            multiline: event.target.value,
        })
    }

    handleChange(name, value) {
        this.setState({...this.state, [name]: value})
    }

    onClickCallBack(){
        window.location.href = 'http://127.0.0.1:3005/index.html#/app'
    }
    render() {
        const muiTheme = getMuiTheme({
            palette: {
                accent1Color: deepOrange500
            }
        })

        const styles = {
            textField: {
                marginLeft: '10px',
                marginRight: '10px',
                width: 200,
            },
            container: {
                textAlign: 'center'
            }
        }

        return (
            <div>
                <LogoGather/>

                <div className="muiThemeProvider">
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <div style={styles.container}>
                            <TextField
                                floatingLabelShrinkStyle={{color: 'white', fontSize: '20px'}}
                                floatingLabelFocusStyle={{color: 'white', fontSize: '20px'}}
                                floatingLabelStyle={{color: 'white', fontSize: '20px'}}
                                inputStyle={{color: 'white', fontSize: '20px'}}
                                className="input-textField"
                                hintText="username"
                                floatingLabelText="用户名"
                            /><br/>
                            <TextField
                                floatingLabelShrinkStyle={{color: 'white', fontSize: '20px'}}
                                floatingLabelFocusStyle={{color: 'white', fontSize: '20px'}}
                                floatingLabelStyle={{color: 'white', fontSize: '20px'}}
                                inputStyle={{color: 'white', fontSize: '20px'}}
                                hintText="password"
                                floatingLabelText="密  码"
                                type="password"
                            /><br/>
                            <FlatButton label="登  录" backgroundColor="#7681ff"
                                        onClick={this.onClickCallBack.bind(this)}
                                        rippleColor="white"
                                        fullWidth={true}
                                        labelStyle={{color: 'white', fontSize: '15px'}}
                                        primary={true}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}
