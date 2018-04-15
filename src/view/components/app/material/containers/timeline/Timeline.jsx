import React from 'react'
import Component from '../../../../utils/base/Component'
import './Timeline.less'
import {Badge, Modal} from 'antd'

export default class Timeline extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = { visible: false }
    }

    info() {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() {}
        })
    }

    render() {
        const list = this.props.list
        return (
            <div className="htmleaf-container">
                <div className="htmleaf-container-base">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-timeline">
                                    {
                                        list && list.map((ele) => {
                                            return <div className="timeline">
                                                <div className="timeline-content">
                                                    <span className="date">
                                                        <span className="month"></span>
                                                    </span>
                                                    <h2 className="title">{ele.get('blockNumber')}</h2>
                                                    <div className="description">
                                                        <div className="col-md-12">
                                                            <Badge count={ele.get('trasactionCount')} overflowCount={99} showZero={false}>
                                                                <span style={{padding:'0 7px 0 0', fontSize:'18px'}} onClick={this.info.bind(this, ele)}>当前区块</span>
                                                            </Badge>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <span style={{wordWrap: 'break-word', fontSize: '10px'}}>
                                                               {ele.get('currentHash')}
                                                            </span>
                                                        </div>
                                                        <div style={{display: 'none'}}>
                                                            <div className="col-md-12">
                                                                前区块
                                                            </div>
                                                            <div className="col-md-12">
                                                                <span
                                                                    style={{wordWrap: 'break-word', fontSize: '10px'}}>
                                                                    {ele.get('parentHash')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}