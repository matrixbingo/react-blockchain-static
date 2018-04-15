import React from 'react'
import Component from '../../utils/base/ComponentAlert'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import Paper from 'material-ui/Paper'
import {white, cyan600} from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles'
import EchartsTheme from './EchartTheme'
import {fetch} from 'ea-react-dm'
import {rtools} from '../../../pages/Index'
import _ from 'underscore'
import {Spin} from 'antd'
import './ReactEchartsPlus.less'

export default class ReactEchartsPlus extends Component {

    static defaultProps = {
        title: '堆叠区域图',
        theme: 'shine',
        disabled: false,
        option: {},
        url: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            url: this.props.url,
            option: this.props.option,
            lengendData: this.props.lengendData
        }

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

    componentWillReceiveProps(nextProps) {
        //window.console.log('nextProps:', nextProps)
        if (nextProps.url != this.state.url || _.difference(nextProps.lengendData, this.state.lengendData).length > 0) {
            this.setState({
                url: nextProps.url,
                lengendData: nextProps.lengendData
            }, () => {
                this.loadData()
            })
        }
    }

    componentDidMount() {
        const _this = this
        this.timer = window.setInterval(() => {
            if (rtools != undefined) {
                _this.loadData()
                window.clearInterval(_this.timer)
            }
        }, 200)
    }

    loadData() {
        const _this = this
        this.setState({
            loading: true
        }, () => {
            rtools.constructor.addLoadingBar({
                run: () => {
                }, end: () => {
                }
            })
            const url = _this.state.url
            fetch(url, {
                method: 'GET',
                timeout: 60000
            }).then((data) => {
                if (data && data.code == 200) {
                    _this.initData(data.msg)
                }
                _this.setState({
                    loading: false
                })
            }, (error) => {
                _this.setState({
                    loading: false
                }, () => {
                    _this.showMsg(_this.props.AlertType.error, url + ' error!!')
                })
                window.console.error('loadData : ' + url + ' error!!', error)
            })
        })
    }

    initData(data) {
        const _this = this
        const transformData = (fnresult, json) => {
            // window.console.log('json--->', json)

            const resultData = fnresult(json)
            const lengendData = resultData[0]
            const timeData = resultData[1]
            const seriseData = resultData[2]
            return [lengendData, timeData, seriseData]
        }
        const reData =
            function (result) {

                let timeData = []
                let lengendData = _this.state.lengendData._tail.array
                let cell = []
                let bill = []
                let zmCnt = []

                _.each(result, function (value) {
                    timeData.push(new Date(value.ts).toLocaleString())
                    cell.push(value.metrics.DX_M_U_Mobile)
                    bill.push(value.metrics.DX_M_S_BillGenerate)
                    zmCnt.push(value.metrics.DX_M_U_ZM_Confirm)
                })
                let seriesData = [{
                    name: lengendData[0],
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    areaStyle: {normal: {}},
                    data: cell
                }, {
                    name: lengendData[1],
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    areaStyle: {normal: {}},
                    data: bill
                }, {
                    name: lengendData[2],
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    areaStyle: {normal: {}},
                    data: zmCnt
                }]
                return [lengendData, timeData, seriesData]
            }

        const rs = transformData(reData, data)
        //window.console.log('rs---->', rs[2])
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: rs[0]
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: rs[1]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: rs[2]
        }

        this.setState({option: option})
    }

    render() {
        const _this = this
        return (
            <Paper style={this.styles.paper} zDepth={2}>
                <div style={{...this.styles.header}}>{this.props.title}</div>
                <div className="msg">
                    <Spin tip="Loading..." className="msg-spin-body" size="large" spinning={this.state.loading}>
                        <div style={this.styles.div}>
                            {
                                _.isEmpty(_this.state.option) ? null :
                                    <ReactEcharts
                                        smooth={true}
                                        option={this.state.option}
                                        style={{height: '350px', width: '100%'}}
                                        theme={this.props.theme}/>
                            }
                        </div>
                    </Spin>
                </div>
            </Paper>
        )
    }
}
