import React, { Component /*,PropTypes*/} from 'react'
import {View} from 'ea-react-dm'
import {Daterangepicker} from '../../utils/index'
import TestControl from '../../../../controller/test/TestControl'
import {Grid, Row, Col} from 'eagle-ui'

@View(TestControl)
export default class DaterangepickerTest extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const picker = this.props['testmodel'].get('dataTime')
        let bin = null, end = null
        if(picker != null){
            bin = picker.bin
            end = picker.end
        }
        window.console.log('time', bin, end)
        return (
            <Grid fluid>
                <Row>
                    <Col sm={2}>
                        {bin}
                    </Col>
                    <Col sm={2}>
                        {end}
                    </Col>
                    <Col sm={7}>
                        <Daterangepicker {...this.props} valueLink='testmodel.dataTime' format='YYYY-MM-DD HH:mm:ss'/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
