/**
 * Created by liang.wang on 17/9/14.
 */
import React from 'react'
import {View} from 'ea-react-dm'
import Component from '../../../../utils/base/ComponentAlert'
import {Row, Col, Panel} from 'eagle-ui'
import {ApiManagerControl} from '../../../../../../controller/Index'
import {TheadList} from '../../../../utils/index'
import {column} from '../../../../../../model/base/BaseModel'
import Immutable from 'immutable'
import _ from 'underscore'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {TextArea, InputPlus} from '../../../../utils/index'
import {Button} from 'antd'
import Paper from 'material-ui/Paper'
//import TradeRow from "../../../utils/table/TableRow";
//import $ from 'jquery'


@View(ApiManagerControl)
export default class InterfaceApiList extends Component {

    constructor(props, context) {
        super(props, context)
        this.searchValueLink = 'ApiModel.list'
        this.columnInfo = 'ApiModel.apiListInfo'
        this.initColumn()
        this.state = {
            title: '编辑',
            editorOpen: false,
            open: false
        }
        this.props.loadApiList(this.getValueByReducers('ApiModel.searchApiConfig').toJS(), this)
    }

    handleClose = () => {
        this.setState({editorOpen: false})
    }

    commitEdtor = () => {
        const apiConfig = this.getValueByReducers('ApiModel.apiConfig').toJS()
        if (this.state.title === '编辑') {
            this.props.updateApiConfig(apiConfig, this, (_this) => {
                _this.setState({editorOpen: false}, () => {
                    _this.props.loadApiList(_this.getValueByReducers('ApiModel.searchApiConfig').toJS(), _this)
                })
            })
        } else {
            this.props.addApiConfig(apiConfig, this, (_this) => {
                _this.setState({editorOpen: false}, () => {
                    _this.props.loadApiList(_this.getValueByReducers('ApiModel.searchApiConfig').toJS(), _this)
                })
            })
        }
    }

    sortBack(key, sort, _this) {
        window.console.log(key, sort, _this)
    }

    loadPageCallback(ps, _this) {
        let searchApiConfig = _this.getValueByReducers('ApiModel.searchApiConfig').toJS()
        searchApiConfig.page = 1
        searchApiConfig.pageSize = ps
        _this.setValueByReducers('ApiModel.searchApiConfig', Immutable.fromJS(searchApiConfig))
        _this.props.loadApiList(searchApiConfig)
        window.console.log('loadPageCallback---->', ps)
    }

    pageCallback(page, _this) {
        let searchApiConfig = _this.getValueByReducers('ApiModel.searchApiConfig').toJS()
        searchApiConfig.page = page
        _this.setValueByReducers('ApiModel.searchApiConfig', Immutable.fromJS(searchApiConfig))
        _this.props.loadApiList(searchApiConfig)
        window.console.log('pageCallback------>', page)
    }

    initColumn() {
        const _this = this
        const columnInfo = this.getValueByReducers(this.columnInfo).toJS()
        for (const i in columnInfo.column) {
            _.extend(columnInfo.column[i], column)
        }

        columnInfo.column[columnInfo.column.length - 1]['button'] = [
            {
                type: '',
                title: '编辑',
                class: '',
                onClick: function (ele) {
                    _this.editor(ele.toJS())
                }
            },
            {
                type: 'danger',
                title: '删除',
                class: '',
                onClick: function (ele) {
                    _this.delete(ele.toJS())
                }
            }
        ]
        this.setValueByReducers(this.columnInfo, Immutable.fromJS(columnInfo))
    }

    editor(ele) {
        this.props.getApiInfo(ele.id, this, (_this, data)=>{
            _this.setState({editorOpen: true, title: '编辑'})
            _this.setValueByReducers('ApiModel.apiConfig', data.msg)
        })
        //this.setValueByReducers('ApiModel.apiConfig', ele)
        window.console.log('editor111111----->', ele)
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
        window.console.log(666666666666)
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

    createDeleteDialog() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.deleteDialogClose}
            />,
            <FlatButton
                label="确定"
                primary={true}
                onClick={this.deleteCommit}
            />,
        ]

        return <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}>
            确认删除?
        </Dialog>
    }

    createEditorDialog() {
        const editorActions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="提交"
                primary={true}
                keyboardFocused={true}
                onClick={this.commitEdtor}
            />
        ]

        return <Dialog
            title={this.state.title}
            actions={editorActions}
            modal={false}
            open={this.state.editorOpen}
            onRequestClose={this.handleClose}
            contentStyle={{overflowY: 'inherit'}}
            bodyStyle={{overflowY: 'inherit'}}
            actionsContainerStyle={{overflowY: 'inherit'}}
            style={{overflowY: 'inherit'}}
            overlayStyle={{overflowY: 'inherit'}}>
            <div>
                <Row style={{margin: '5px'}}>
                    <InputPlus {...this.props} valueLink='ApiModel.apiConfig.systemName' placeholder='系统名称'/>
                </Row>
                <Row style={{margin: '5px'}}>
                    <InputPlus {...this.props} valueLink='ApiModel.apiConfig.apiPath' placeholder='应用路径'/>
                </Row>
                <Row style={{margin: '5px'}}>
                    <TextArea maxLength={400} {...this.props} valueLink='ApiModel.apiConfig.excuteSql'
                              placeholder='请输入执行SQL'/>
                </Row>
            </div>
        </Dialog>
    }

    render() {
        return <div>
            <Paper zDepth={1}>
                <Row>
                    <Col sm={2}/>
                    <Col sm={3} className="col-lr">
                        <InputPlus {...this.props} valueLink='ApiModel.searchApiConfig.data.apiPath'
                                   placeholder='应用路径'/>
                    </Col>
                    <Col sm={3} className="col-lr">
                        <InputPlus {...this.props} valueLink='ApiModel.searchApiConfig.data.systemName'
                                   placeholder='系统名称'/>
                    </Col>
                    <Col sm={2} className="col-lr">
                        <Button style={{width: '100%', height: '42px'}} type="primary" icon="search" size='large'
                                loading={this.state.iconLoading}
                                onClick={::this.searchList}>
                            查询
                        </Button>
                    </Col>
                    <Col sm={2} className="col-lr">
                        <Button style={{width: '100%', height: '42px'}} type="primary" icon="plus" size='large'
                                loading={this.state.iconLoading}
                                onClick={::this.addApiConfig}>
                            新增
                        </Button>
                    </Col>
                </Row>
            </Paper>
            <Panel className="marginTopSpace">
                <div>
                    {this.createEditorDialog()}
                    {this.createDeleteDialog()}
                    <TheadList {...this.props}
                               zDepth={1}
                               columnInfo={this.columnInfo}
                               searchValueLink={this.searchValueLink}
                               sortBack={this.sortBack}
                               loadPageCallback={::this.loadPageCallback}
                               pageCallback={this.pageCallback}/>
                </div>
            </Panel>
        </div>
    }
}
