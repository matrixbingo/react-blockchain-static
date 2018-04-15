/**
 * Created by liang.wang on 17/9/14.
 */
import React from 'react'
import Component from '../../../../utils/base/ComponentAlert'
import {Row, Col, Panel} from 'eagle-ui'
import Immutable from 'immutable'
import FlatButton from 'material-ui/FlatButton'
import DbInfoEditor from './DbInfoEditor'

export default class Dialog extends Component {

    constructor(props, context) {
        super(props, context)
        this.searchValueLink = 'ApiModel.list'
        this.columnInfo = 'ApiModel.apiListInfo'
        this.initColumn()
        this.state = {
            title: '编辑',
            editorOpen: false,
            open: false,
            visible: true
        }
    }

    componentWillReceiveProps(nextProps){

    }

    cancel = () => {
        this.setState({editorOpen: false})
    }

    commit = () => {

    }

    editor(ele) {
        this.setState({editorOpen: true, title: '编辑'})
        this.setValueByReducers('ApiModel.apiConfig', ele)
        window.console.log('editor----->', ele)
    }

    delete(ele) {
        this.setState({open: true})
        this.setValueByReducers('ApiModel.apiConfig', Immutable.fromJS(ele))
    }

    deleteDialogClose = () => {
        this.setState({open: false})
    }

    deleteCommit = () => {
        const apiconfig = this.getValueByReducers('ApiModel.apiConfig').toJS()
        window.console.log(5555555555555)
        this.props.deleteApiConfig(apiconfig.id, this, (_this) => {
            _this.setState({open: false}, () => {
                _this.props.loadApiList(_this.getValueByReducers('ApiModel.searchApiConfig').toJS(), _this)
            })
        })
    }

    searchList() {
        this.props.loadApiList(this.getValueByReducers('ApiModel.searchApiConfig').toJS(), this)
    }

    addApiConfig() {
        this.setValueByReducers('ApiModel.apiConfig', {})
        this.setState({editorOpen: true, title: '新建'})
    }

    render() {
        const editorActions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.cancel}
            />,
            <FlatButton
                label="提交"
                primary={true}
                keyboardFocused={true}
                onClick={this.commit}
            />
        ]

        return <Dialog
            title={this.state.title}
            actions={editorActions}
            modal={false}
            open={this.state.editorOpen}
            onRequestClose={this.cancel}
            contentStyle={{overflowY: 'inherit'}}
            bodyStyle={{overflowY: 'inherit'}}
            actionsContainerStyle={{overflowY: 'inherit'}}
            style={{overflowY: 'inherit'}}
            overlayStyle={{overflowY: 'inherit'}}>
                {/*<DbInfoEditor />*/}
        </Dialog>
    }
}
