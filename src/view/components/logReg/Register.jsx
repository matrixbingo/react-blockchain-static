import React from 'react'
import Component from '../utils/base/ComponentAlert'
import {Row, Col, Grid, Panel, PanelContent} from 'eagle-ui'
import {InputPlus} from '../utils/index'
import {Button, Steps, Icon, Alert, Spin} from 'antd'
import {LogRegControl} from '../../../controller/Index'
import {View} from 'ea-react-dm'
import {DataUtil} from '../utils/util/Index'
import $ from 'jquery'

@View(LogRegControl)
export default class Register extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            regBtn: 'dashed',
            lrwid: 3,
            contwid: 6,
            nameerrshow: false,
            emailerrshow: false,
            pwderrshow: false,
            pwderrshow2: false,
            stepStatus: ['process', 'wait', 'wait'],
            stepAudit: 'hourglass',
            spinShow: false
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

    checkData() {
        const reginfo = this.getValueByReducers('LogRegModel.reginfo').toJS()
        const isCanReg = DataUtil.validate.email(reginfo.email) && (reginfo.displayName.length < 20 && reginfo.displayName.length > 2) && (reginfo.password.length < 20 && reginfo.password.length > 7) && reginfo.password == reginfo.password2
        if (isCanReg) {
            this.setState({
                regBtn: 'primary'
            })
        } else {
            this.setState({
                regBtn: 'dashed'
            })
        }
        return isCanReg
    }

    checkEmail(_this, val) {
        this.setState({
            emailerrshow: !DataUtil.validate.email(val)
        })
        this.checkData()
    }

    checkDisplayName(_this, val) {
        this.setState({
            nameerrshow: val.length > 20 || val.length < 3
        })
        this.checkData()
    }

    checkPwd1(_this, val) {
        this.setState({
            pwderrshow: val.length > 20 || val.length < 8
        })
        this.checkData()
    }

    checkPwd2(_this, val) {
        let pwd1 = this.getValueByReducers('LogRegModel.reginfo.password')
        this.setState({
            pwderrshow2: val.length > 20 || val.length < 8 || pwd1 != val
        })
        this.checkData()
    }

    register() {
        let reginfo = this.getValueByReducers('LogRegModel.reginfo').toJS()
        let timer
        if (this.checkData()) {
            this.props.applyAccount(reginfo, this, function (_this, data) {
                _this.setState({
                    stepStatus: ['finish', 'process', 'wait'],
                    stepAudit: 'loading',
                    spinShow: true
                }, () => {
                    timer = window.setTimeout(() => {
                        _this.setState({
                            stepStatus: ['finish', 'finish', 'finish'],
                            stepAudit: 'hourglass',
                            spinShow: false
                        }, () => {
                            _this.setValueByReducers('LogRegModel.loginfo.account', data.msg)
                            _this.setValueByReducers('LogRegModel.regStatus', 1)
                            window.clearTimeout(timer)
                        })
                    }, 5000)
                })
            })
        }
    }

    toLogin() {
        window.location.href = '#/login'
    }

    render() {
        const regStatus = this.getValueByReducers('LogRegModel.regStatus')
        const loginfo = this.getValueByReducers('LogRegModel.loginfo')
        const Step = Steps.Step
        return (
            <Grid style={{paddingTop: '100px'}}>
                <Row>
                    <Col sm={this.state.lrwid}/>
                    <Col sm={this.state.contwid} style={{textAlign: 'center'}}>
                        <h1 style={{fontSize: '24px', paddingBottom: '24px'}}>拍拍贷区块链积分平台</h1>
                    </Col>
                    <Col sm={this.state.lrwid}/>
                </Row>
                <Row>
                    <Col sm={this.state.lrwid}/>
                    <Col sm={this.state.contwid}>
                        <Steps>
                            <Step status={this.state.stepStatus[0]} title="申请账号" icon={<Icon type="user"/>}/>
                            <Step status={this.state.stepStatus[1]} title="审核中"
                                  icon={<Icon type={this.state.stepAudit}/>}/>
                            <Step status={this.state.stepStatus[2]} title="审核通过" icon={<Icon type="smile-o"/>}/>
                        </Steps>
                    </Col>
                    <Col sm={this.state.lrwid}/>
                </Row>
                <Spin tip="审核中，请稍后..." spinning={this.state.spinShow}>
                    <Row style={{display: regStatus == 0 ? 'block' : 'none'}}>
                        <Col sm={this.state.lrwid}/>
                        <Col sm={this.state.contwid}>
                            <Panel egType="normal">
                                <PanelContent>
                                    <Row>
                                        <Col sm={12} style={{paddingBottom: 0}}>
                                            <InputPlus {...this.props} placeholder="邮箱"
                                                       valueLink="LogRegModel.reginfo.email"
                                                       validRules={{maxLength: 50}} onBlurCallback={::this.checkEmail}/>
                                        </Col>
                                        <Col sm={12}
                                             style={{
                                                 paddingTop: 0,
                                                 display: this.state.emailerrshow ? 'block' : 'none'
                                             }}>
                                            <span style={{fontSize: '12px', color: 'red'}}>请输入正确的邮箱格式！</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12} style={{paddingBottom: 0}}>
                                            <InputPlus {...this.props} placeholder="请输入昵称，长度3到20之间"
                                                       valueLink="LogRegModel.reginfo.displayName"
                                                       validRules={{maxLength: 20}}
                                                       onBlurCallback={::this.checkDisplayName}/>
                                        </Col>
                                        <Col sm={12}
                                             style={{
                                                 paddingTop: 0,
                                                 display: this.state.nameerrshow ? 'block' : 'none'
                                             }}>
                                            <span style={{fontSize: '12px', color: 'red'}}>昵称长度3到20之间！</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}
                                             style={{paddingBottom: 0}}>
                                            <InputPlus {...this.props} placeholder="请输入密码，长度8到20之间" type='password'
                                                       validRules={{maxLength: 20}}
                                                       valueLink="LogRegModel.reginfo.password"
                                                       onBlurCallback={::this.checkPwd1}/>
                                        </Col>
                                        <Col sm={12}
                                             style={{paddingTop: 0, display: this.state.pwderrshow ? 'block' : 'none'}}>
                                            <span style={{fontSize: '12px', color: 'red'}}>密码长度8到20之间！</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}
                                             style={{paddingBottom: 0}}>
                                            <InputPlus {...this.props} placeholder="确认密码" type='password'
                                                       validRules={{maxLength: 50}}
                                                       valueLink="LogRegModel.reginfo.password2"
                                                       onBlurCallback={::this.checkPwd2}/>
                                        </Col>
                                        <Col sm={12}
                                             style={{
                                                 paddingTop: 0,
                                                 display: this.state.pwderrshow2 ? 'block' : 'none'
                                             }}>
                                            <span style={{fontSize: '12px', color: 'red'}}>两次密码不一致！</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={12}>
                                            <Button type={this.state.regBtn} style={{width: '100%', height: '40px'}}
                                                    onClick={::this.register}>立即申请</Button>
                                        </Col>
                                    </Row>
                                </PanelContent>
                            </Panel>
                        </Col>
                        <Col sm={this.state.lrwid}/>
                    </Row>
                </Spin>
                <div style={{display: regStatus == 1 ? 'block' : 'none'}}>
                    <Row>
                        <Col sm={this.state.lrwid}/>
                        <Col sm={this.state.contwid}>
                            <Alert
                                message='您的账号申请成功,务必保存！'
                                description={'您的账号: ' + loginfo.get('account')}
                                type="success"
                                showIcon/>
                        </Col>
                        <Col sm={this.state.lrwid}/>
                    </Row>
                    <Row>
                        <Col sm={this.state.lrwid}/>
                        <Col sm={this.state.contwid}>
                            <Col sm={12}>
                                <Button type="primary" ghost onClick={::this.toLogin}>返回登录</Button>
                            </Col>
                        </Col>
                        <Col sm={this.state.lrwid}/>
                    </Row>
                </div>
            </Grid>
        )
    }
}