import React, {Component /*,PropTypes*/} from 'react'
import {View} from 'ea-react-dm'
import {InputPlus} from '../../utils/index'
import TestControl from '../../../../controller/test/TestControl'
import {Grid, Row, Col, Button} from 'eagle-ui'
import '../../../styles/test.less'

@View(TestControl)
export default class InputPulsTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputPuls: {
                disabled: false,
                viewOnly: false,
                span: false
            }
        }
    }

    clickInputPuls(type) {
        if (type === 1) {
            this.setState({
                inputPuls: {
                    disabled: !this.state.inputPuls.disabled
                }
            })
        }
        if (type === 2) {
            this.setState({
                inputPuls: {
                    viewOnly: !this.state.inputPuls.viewOnly
                }
            })
        }
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={4}>
                        <Row>
                            <Col>
                                <Button onClick={this.clickInputPuls.bind(this, 1)}>InputPuls disabled</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={this.clickInputPuls.bind(this, 2)}>InputPuls viewOnly</Button>
                            </Col>
                        </Row>
                        <Row>
                            {this.props['testmodel'].get('inputPuls').get('value')}
                        </Row>
                    </Col>
                    <Col sm={7}>
                        <InputPlus {...this.props} valueLink='testmodel.inputPuls.value'
                                   disabled={this.state.inputPuls.disabled}
                                   viewOnly={this.state.inputPuls.viewOnly}
                                   span={this.state.inputPuls.span} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <InputPlus {...this.props} valueLink='testmodel.inputPuls.value'
                                   viewOnly={this.state.inputPuls.viewOnly}
                                   validRules={{
                                       isInt: true,
                                       maxLength:10
                                   }}
                                   span={this.state.inputPuls.span} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}
