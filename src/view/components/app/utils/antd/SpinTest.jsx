import React, {Component /*,PropTypes*/} from 'react'
//import {View} from 'ea-react-dm'
import {Grid} from 'eagle-ui'
import {Spin, Switch, Alert} from 'antd'
import './antd.less'

export default class SpinTest extends Component {
    constructor(props) {
        super(props)
        this.state = {loading: false}
    }

    toggle = (value) => {
        this.setState({loading: value})
    }

    render() {
        const container = (
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
        )

        return (
            <Grid>
                <Spin spinning={this.state.loading}>{container}</Spin>
                Loading state：<Switch checked={this.state.loading} onChange={this.toggle}/>
            </Grid>
        )
    }
}
