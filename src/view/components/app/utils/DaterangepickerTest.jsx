import React, {Component} from 'react'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar'
import zhCN from 'rc-calendar/lib/locale/zh_CN'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import Picker from 'rc-calendar/lib/Picker'
import moment from 'moment'
import './antd-range-calendar.css'

function newArray(start, end) {
    const result = []
    for (let i = start; i < end; i++) {
        result.push(i)
    }
    return result
}

const formatStr = 'YYYY-MM-DD HH:mm:ss'

function format(v) {
    return v ? v.format(formatStr) : ''
}

export default class DaterangepickerTest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hoverValue: [],
            value: [],
            disabled: false
        }
    }

    onHoverChange(hoverValue) {
        this.setState({hoverValue})
    }

    onChange(value) {
        window.console.log('onChange', value)
        this.setState({value})
    }

    disabledTime(time, type) {
        window.console.log('disabledTime----->', time, type)
        if (type === 'start') {
            return {
                disabledHours() {
                    const hours = newArray(0, 60)
                    hours.splice(20, 4)
                    return hours
                },
                disabledMinutes(h) {
                    if (h === 20) {
                        return newArray(0, 31)
                    } else if (h === 23) {
                        return newArray(30, 60)
                    }
                    return []
                },
                disabledSeconds() {
                    return [55, 56]
                },
            }
        }
        return {
            disabledHours() {
                const hours = newArray(0, 60)
                hours.splice(2, 6)
                return hours
            },
            disabledMinutes(h) {
                if (h === 20) {
                    return newArray(0, 31)
                } else if (h === 23) {
                    return newArray(30, 60)
                }
                return []
            },
            disabledSeconds() {
                return [55, 56]
            },
        }
    }

    isValidRange(v) {
        return v && v[0] && v[1]
    }

    render() {
        moment.locale('zh-cn')
        const now = moment()
        now.utcOffset(8)
        const defaultCalendarValue = now.clone()
        defaultCalendarValue.add(-1, 'month')

        const timePickerElement = (
            <TimePickerPanel
                defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
            />
        )
        window.console.log('now:----->', now)
        const state = this.state
        const calendar = (
            <RangeCalendar
                hoverValue={state.hoverValue}
                onHoverChange={this.onHoverChange.bind(this)}
                showWeekNumber={false}
                dateInputPlaceholder={['start', 'end']}
                defaultValue={[now, now.clone().add(1, 'months')]}
                locale={zhCN}
                disabledTime={this.disabledTime.bind(this)}
                timePicker={timePickerElement}
            />
        )
        return (
            <div>
                <Picker value={state.value}
                        onChange={this.onChange.bind(this)}
                        animation="slide-up"
                        calendar={calendar}>
                    {
                        ({value}) => {
                            return (<span>
                <input
                    placeholder="please select"
                    style={{width: 350}}
                    disabled={state.disabled}
                    readOnly
                    className="ant-calendar-picker-input ant-input"
                    value={this.isValidRange.bind(this, value) && `${format(value[0])} - ${format(value[1])}` || ''}
                />
                </span>)
                        }
                    }
                </Picker>

            </div>
        )
    }
}
