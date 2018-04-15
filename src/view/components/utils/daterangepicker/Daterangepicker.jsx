import React, {PropTypes} from 'react'
import Component from '../base/Component'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker'
import moment from 'moment'
import {Button} from 'react-bootstrap'
import 'bootstrap-daterangepicker/daterangepicker.css'
import './bootstrap.css'

export default class Daterangepicker extends Component {

    static propTypes = {
        /**
         * value链接
         */
        valueLink: PropTypes.string.isRequired
    }

    static defaultProps = {
        title: '',
        valueLink: '',
        format: 'YYYY-MM-DD HH:mm',
        onChangeCallback: function () {
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment().subtract(15,'minutes'),
            endDate: moment(),
            format: 'YYYY-MM-DD HH:mm:ss',
            ranges: {
                '最近15分钟':[moment().subtract(15,'minutes'), moment()],
                '今天': [moment().startOf('day'), moment()],
                '昨天': [moment().subtract(1, 'days').startOf('day'), moment().startOf('day')],
                '最近3天': [moment().subtract(2, 'days').startOf('day'), moment()],
                '最近7天': [moment().subtract(6, 'days').startOf('day'), moment()]
              /*  '最近30天': [moment().subtract(29, 'days').startOf('day'), moment()],
                '本月': [moment().startOf('month'), moment()],
                '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]*/
            },
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '起始时间',
                toLabel: '结束时间',
                customRangeLabel: '自定义',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 1
            }
        }
    }

    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        })
        const  bTimer = picker.startDate.format('YYYY-MM-DD HH:mm')
        const  nTimer = picker.endDate.format('YYYY-MM-DD HH:mm')
        this.props.changePicker(bTimer,nTimer)
        this.setValueByReducers({
            bin: picker.startDate.format(this.props.format),
            end: picker.endDate.format(this.props.format)
        })
        this.props.onChangeCallback && this.props.onChangeCallback.call(event, {
            bin: picker.startDate.format(this.props.format),
            end: picker.endDate.format(this.props.format)
        }, this)

    }

    render() {
        let start = this.state.startDate.format('YYYY-MM-DD HH:mm')
        let end = this.state.endDate.format('YYYY-MM-DD HH:mm')
        let label = start + ' - ' + end
       /* if (start === end) {
            label = start
        }*/
       // window.console.log('start----->',start)
       // window.console.log('end------>',end)
        let buttonStyle = {width: '100%',position:'relative',overflow:'hidden'}

        return (
            <div>
                {this.props.title ? <label className="control-label col-md-3">{this.props.title}</label> : null}
                <DatetimeRangePicker
                    timePicker
                    timePicker24Hour
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    ranges={this.state.ranges}
                    locale={this.state.locale}
                    onApply={this.handleEvent.bind(this)}>
                    <Button className="selected-date-range-btn" style={buttonStyle}>
                        <div className="pull-left">
                            <i className="fa fa-calendar"/>
                            &nbsp;
                            <span>
                                    {label}
                            </span>
                        </div>
                        <div className="pull-right" style={{position:'absolute',top:'50%',right:'8px',marginTop:'-10px'}}>
                            <i className="fa fa-angle-down"/>
                        </div>
                    </Button>
                </DatetimeRangePicker>
            </div>
        )
    }
}
