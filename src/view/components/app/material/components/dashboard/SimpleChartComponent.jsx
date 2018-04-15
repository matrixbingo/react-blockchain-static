import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import Paper from 'material-ui/Paper'
import {white, cyan600} from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles'
import EchartsTheme from './EchartTheme'

export default class SimpleChartComponent extends Component {

    static defaultProps = {
        title: '堆叠区域图',
        theme: 'shine',
        disabled: false,
        option: {},
        url:''

    }

    constructor(props) {
        super(props)
        this.state = {}

        echarts.registerTheme(this.props.theme, EchartsTheme.getTheme(this.props.theme))

        this.styles = {
            paper: {
                backgroundColor: this.props.theme == 'dark' ? '#333' : white,
                height: 450
            },
            div: {
                height: 95,
                padding: '5px 15px 0 15px'
            },
            header: {
                fontSize: 24,
                fontWeight: typography.fontWeightLight,
                color: white,
                backgroundColor: cyan600,
                padding: 10,
            }
        }
    }

    render() {
        return (
            <Paper style={this.styles.paper} zDepth={2}>
                <div style={{...this.styles.header}}>{this.props.title}</div>
                <div style={this.styles.div}>
                    <ReactEcharts
                        smooth={true}
                        option={this.props.option}
                        style={{height: '350px', width: '100%'}}
                        theme={this.props.theme}/>
                </div>
            </Paper>
        )
    }
}
