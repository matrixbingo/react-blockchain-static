import React, {Component /*,PropTypes*/} from 'react'
import QueueAnim from 'rc-queue-anim'

export default class QueueAnimTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    callback() {
        //window.console.log('i', index)
    }

    render() {

        return (
            <QueueAnim>
                <div key="demo1">依次进场</div>
                <div key="demo2">依次进场</div>
                <div key="demo3">依次进场</div>
                <div key="demo4">依次进场</div>
            </QueueAnim>
        )
    }
}