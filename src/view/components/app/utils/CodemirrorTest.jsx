import React, {Component /*,PropTypes*/} from 'react'
import CodeMirror from 'react-codemirror'
import './CodemirrorTest.less'


export default class CodemirrorTest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            code:"// Code"
        }
    }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    render() {
        const options = {
            lineNumbers: true
        }
        return (
            <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        )
    }
}
