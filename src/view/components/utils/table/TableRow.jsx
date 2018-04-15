/**
 * Created by liang.wang on 17/9/7.
 */
import React, {Component} from 'react'
import {Row, Col} from 'eagle-ui'
import './TableRow.less'
import {Button} from 'antd'
import QueueAnim from 'rc-queue-anim'

export default class TradeRow extends Component {

    constructor(props, context) {
        super(props, context)
    }

    createButton(ele, row) {
        return <div className='button-editor'>
            {
                ele.get('button').map((item, i) => {
                    item = item.toJS()
                    return <span style={{paddingRight: '8px'}} key={i}>
                        <Button size='small' type={item.type}
                                onClick={item.onClick.bind(this, row)}>{item.title}</Button>
                    </span>
                })
            }
        </div>
    }

    render() {
        const _this = this
        const list = this.props.list
        const columnInfo = this.props.columnInfo
        let rowNo = 1
        return (
            <div className="tradeRow">
                {
                    list && list.map((ele) => {
                        let rowColor = rowNo % 2 == 0 ? 'row-color-odd' : 'row-color-eve'
                        rowNo++
                        return <div key={rowNo}>
                            <Row className={rowColor}>
                                <QueueAnim duration={240}>
                                {
                                    columnInfo && columnInfo.get('column').map((item, i) => {
                                        if (item.get('button')) {
                                            return <Col style={{
                                                width: item.get('width') + '%',
                                                paddingTop: '0px',
                                                paddingBottom: '0px'
                                            }}
                                                        className={item.get('classNameColumn')}
                                                        key={i}>{_this.createButton(item, ele)}
                                            </Col>
                                        }

                                        item = item.toJS()
                                        return <Col style={{width: item.width + '%'}} className={item.classNameColumn}
                                                    key={i}>{item.key ? ele.get(item.key) ? ele.get(item.key) : '-' : '-'}
                                        </Col>
                                    })
                                }
                                </QueueAnim>
                            </Row>
                        </div>
                    })
                }
            </div>
        )
    }
}