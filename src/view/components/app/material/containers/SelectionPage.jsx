import React ,{Component}from 'react'
import { Select } from 'antd'
import {grey300} from 'material-ui/styles/colors'

export default class SelectionPage extends Component {

    handleChange(value) {
        const $value = `${value}`
        this.props.changeValue($value)
    }
    render() {
        let selectStyle = { width: '100%',backgroundColor:grey300,boxShadow:'none'}
        return (
            <Select size="large" defaultValue="1m-sum-zero" style={selectStyle} onChange={this.handleChange.bind(this)}>
                <Option value="1m-sum-zero">1分钟</Option>
                <Option value="5m-sum-zero">5分钟</Option>
                <Option value="15m-sum-zero">15分钟</Option>
                <Option value="30m-sum-zero">30分钟</Option>
                <Option value="1h-sum-zero">1小时</Option>
                <Option value="1d-sum-zero">1天</Option>
            </Select>
            )
    }
}