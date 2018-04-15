import React from 'react'
import Component from '../utils/base/ComponentAlert'
import {Row, Col, Grid, Panel, PanelContent, PanelHeader} from 'eagle-ui'
import {InputPlus} from '../utils/index'
import {Button} from 'antd'
import {LogRegControl} from '../../../controller/Index'
import {View} from 'ea-react-dm'
import $ from 'jquery'
import Alert from 'react-s-alert'

@View(LogRegControl)
export default class Login extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            lrwid: 3,
            contwid: 6,
            accountshow: false,
            pwderrshow: false
        }
    }

    componentDidMount() {
        const _this = this
        const innerPanelWidth = () => {
            let width = $(window).width()
            if (width > 1024) {
                _this.setState({
                    lrwid: 4,
                    contwid: 4
                })
            }
        }
        innerPanelWidth()
        $(window).resize(function () {
            innerPanelWidth()
        })
    }

    checkaAcount(_this, val) {
        this.setState({
            accountshow: val == 0
        })
    }

    login() {
        const loginfo = this.getValueByReducers('LogRegModel.loginfo').toJS()
        if (loginfo.account.length < 5 || loginfo.password.length == '') {
            this.showMsg(this.props.AlertType.error, '请填写正确的账号和密码！！')
            return
        }
        this.props.login(loginfo, this, () => {
            window.location.href = '#/app'
        })
    }

    register() {
        window.location.href = '#/register'
    }

    render() {
        const regStatus = this.getValueByReducers('LogRegModel.regStatus')
        return (
            <div>
                <Alert stack={true} timeout={4000}/>
                <Grid style={{paddingTop: '100px'}}>
                    <Row>
                        <Col sm={this.state.lrwid}/>
                        <Col sm={this.state.contwid}>
                            <Panel egType="normal">
                                <PanelHeader leftFlag={false} style={{textAlign: 'center'}}>
                                    <h1>拍拍贷区块链积分平台</h1>
                                </PanelHeader>
                                <PanelContent>
                                    <Row>
                                        <Col sm={12} style={{paddingBottom: 0}}>
                                            <InputPlus {...this.props} placeholder="账户名"
                                                       valueLink="LogRegModel.loginfo.account"
                                                       validRules={{maxLength: 50}}
                                                       onBlurCallback={::this.checkaAcount}/>
                                        </Col>
                                        <Col sm={12}
                                             style={{
                                                 paddingTop: 0,
                                                 display: this.state.accountshow ? 'block' : 'none'
                                             }}>
                                            <span style={{fontSize: '12px', color: 'red'}}>账号不能为空！</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}
                                             style={{paddingBottom: 0}}>
                                            <InputPlus {...this.props} placeholder="密码" type='password'
                                                       validRules={{maxLength: 50}}
                                                       valueLink="LogRegModel.loginfo.password"/>
                                        </Col>
                                        <Col sm={12}
                                             style={{paddingTop: 0, display: this.state.pwderrshow ? 'block' : 'none'}}>
                                            <span style={{fontSize: '12px', color: 'red'}}>账户或密码错误！</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <Button type="primary" style={{width: '100%', height: '40px'}}
                                                    onClick={this.login.bind(this)}>登&nbsp;&nbsp;&nbsp;录</Button>
                                        </Col>
                                    </Row>
                                    <Row style={{display: regStatus == 0 ? 'block' : 'none'}}>
                                        <Col sm={12}>
                                            <Button type="dashed" style={{width: '100%', height: '40px'}}
                                                    onClick={this.register}>申请账号</Button>
                                        </Col>
                                    </Row>
                                </PanelContent>
                            </Panel>
                        </Col>
                        <Col sm={this.state.lrwid}/>
                    </Row>
                </Grid>
            </div>
        )
    }
}