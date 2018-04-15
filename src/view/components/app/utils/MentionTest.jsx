import React, {Component /*,PropTypes*/} from 'react'
import {Mention} from 'antd'

const {toString} = Mention

export default class MentionTest extends Component {

    static defaultProps = {
        prefix: ['S', 'F']
    }

    constructor(props) {
        super(props)
        this.suggestions = {
            S: ['ELECT'],
            F: ['ROM'],
            L: ['IMIT']
        }
    }

    onChange(editorState) {
        window.console.log(toString(editorState))
    }

    onSelect(suggestion) {
        window.console.log('onSelect', suggestion)
    }

    render() {
        return (
            <Mention
                prefix={this.props.prefix}
                suggestionStyle={{'margin-top': '105px', 'max-height': '300px'}}
                onChange={this.onChange.bind(this)}
                onSelect={this.onSelect.bind(this)}
                suggestions={this.suggestions}
            />
        )
    }
}
