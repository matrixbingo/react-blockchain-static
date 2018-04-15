import React from 'react'
import Component from '../utils/base/ComponentAlert'
import {Row, Col, Grid, Panel, PanelContent, PanelHeader} from 'eagle-ui'
import {Steps, Icon} from 'antd'
import {InputPlus} from '../utils/index'
import {Button} from 'antd'
import {LogRegControl} from '../../../controller/Index'
import {View} from 'ea-react-dm'
import $ from 'jquery'

@View(LogRegControl)
export default class RegSuccess extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            lrwid: 3,
            contwid: 6,
            emailerrshow: false,
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
            emailerrshow: val == 0
        })
    }

    login() {

    }

    register() {
        window.location.href = '#/register'
    }

    render() {
        const Step = Steps.Step
        return (
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
                                    <Col sm={12}>
                                        <Steps>
                                            <Step status="finish" title="Login" icon={<Icon type="user"/>}/>
                                            <Step status="finish" title="Verification" icon={<Icon type="solution"/>}/>
                                            <Step status="process" title="Pay" icon={<Icon type="loading"/>}/>
                                            <Step status="wait" title="Done" icon={<Icon type="smile-o"/>}/>
                                        </Steps>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} style={{paddingBottom: 0}}>
                                        <InputPlus {...this.props} placeholder="密码" type='password'
                                                   validRules={{maxLength: 50}}
                                                   valueLink="LogRegModel.loginfo.password"/>
                                    </Col>
                                    <Col sm={12}
                                         style={{paddingTop: 0, display: this.state.pwderrshow ? 'block' : 'none'}}>
                                        <span style={{fontSize: '12px', color: 'red'}}>邮箱或密码错误！</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Button type="primary" style={{width: '100%', height: '40px'}}
                                                onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                                    </Col>
                                </Row>
                                <Row>
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
        )
    }
}