import React, {Component /*,PropTypes*/} from 'react'
import {Timeline} from '../../utils/index'
import {Grid, Row, Col} from 'eagle-ui'

export default class TimelineTest extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={3}>

                    </Col>
                    <Col sm={7}>
                        <Timeline/>
                    </Col>
                    <Col sm={1}>

                    </Col>
                </Row>
            </Grid>
        )
    }
}
