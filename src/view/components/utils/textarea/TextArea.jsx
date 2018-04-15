import React, {PropTypes} from 'react'
import Component from '../base/Component'
//import {DataUtil} from '../util/Index'
import './TextArea.less'
import classNames from 'classnames'

export default class TextArea extends Component {
    static propTypes = {
        /**
         * 是否只读
         */
        viewOnly: PropTypes.bool,
        /**
         * 是否disabled
         */
        disabled: PropTypes.bool,
        /**
         * value链接
         */
        valueLink: PropTypes.string.isRequired,
        /**
         * 初始化数值
         */
        defaultValue: PropTypes.string.isRequired
    }
    /**
     * @type {{disabled: boolean, viewOnly: boolean, valueLink: string, defaultValue: string, cols: number, rows: number, maxLength: number, placeholder: string, onChangeCallback: TextArea.defaultProps.onChangeCallback}}
     * 优先级 viewOnly ---> disabled
     */
    static defaultProps = {
        viewOnly: false,
        disabled: false,
        valueLink: '',
        defaultValue: '',
        cols: 30,
        rows: 10,
        maxLength: 200,
        placeholder: '请输入内容',
        onChangeCallback: function () {
        }
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            disabled: props.disabled,
            viewOnly: props.viewOnly,
            content: props.defaultValue || this.getValueByReducers() || ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled != this.props.disabled || nextProps.viewOnly != this.props.viewOnly) {
            this.setState({
                disabled: nextProps.disabled,
                viewOnly: nextProps.viewOnly
            })
        }
    }

    onChangeHandler(evt) {
        //let val = DataUtil.StringUtils.trim(evt.target.value) || ''
        let val = evt.target.value
        if (val.length > this.props.maxLength) {
            val = val.substr(0, this.props.maxLength)
        }
        if (this.state.content != val) {
            this.setState({
                content: val
            })
            this.setValueByReducers(val)
        }
        this.props.onChangeCallback && this.props.onChangeCallback.call(evt, val, this)
    }

    render() {
        const {maxLength, cols, rows, placeholder, className} = this.props
        const remain = maxLength - this.state.content.length
        const remainColor = this.state.content.length ? '' : 'default'
        const _className = classNames((className || ''), 'q-text-ctn')
        if (this.state.viewOnly) {
            const height = this.props.rows * 14
            return (
                <div className="textArea">
                    <span style={{height: height + 'px'}}>{this.state.content}</span>
                </div>
            )
        } else {
            return (
                <div className="q-text-wrap">
                <textarea disabled={this.state.disabled}
                          ref="description"
                          className={_className}
                          onChange={this.onChangeHandler.bind(this)}
                          rows={rows}
                          cols={cols}
                          placeholder={placeholder}
                          value={this.state.content}/>
                    <p className="q-text-remain">
                        <span className={'num ' + remainColor}><i>{remain}</i>/{maxLength}</span>
                    </p>
                </div>
            )
        }
    }
}