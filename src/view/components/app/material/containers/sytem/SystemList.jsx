/**
 * Created by liang.wang on 17/9/14.
 */
import React from 'react'
import {View} from 'ea-react-dm'
import Component from '../../../../utils/base/ComponentAlert'
import {Row, Col, Panel} from 'eagle-ui'
import {SystemControl} from '../../../../../../controller/Index'
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


@View(SystemControl)
export default class SystemList extends Component {

    constructor(props, context) {
        super(props, context)
        this.searchValueLink = 'SystemModel.list'
        this.columnInfo = 'SystemModel.dbListInfo'
        this.initColumn()
        this.state = {
            title: '编辑',
            editorOpen: false,
            open: false
        }
        this.props.loadApiList(this.getValueByReducers('SystemModel.searchDbInfo').toJS(), this)
    }

    handleClose = () => {
        this.setState({editorOpen: false})
    }

    commitEdtor = () => {
        const apiConfig = this.getValueByReducers('SystemModel.apiConfig').toJS()
        if (this.state.title === '编辑') {
            this.props.updateApiConfig(apiConfig, this, (_this) => {
                _this.setState({editorOpen: false}, () => {
                    _this.props.loadApiList(_this.getValueByReducers('SystemModel.searchDbInfo').toJS(), _this)
                })
            })
        } else {
            this.props.addApiConfig(apiConfig, this, (_this) => {
                _this.setState({editorOpen: false}, () => {
                    _this.props.loadApiList(_this.getValueByReducers('SystemModel.searchDbInfo').toJS(), _this)
                })
            })
        }
    }

    sortBack(key, sort, _this) {
        window.console.log(key, sort, _this)
    }

    loadPageCallback(ps, _this) {
        let searchDbInfo = _this.getValueByReducers('SystemModel.searchDbInfo').toJS()
        searchDbInfo.page = 1
        searchDbInfo.pageSize = ps
        _this.setValueByReducers('SystemModel.searchDbInfo', Immutable.fromJS(searchDbInfo))
        _this.props.loadApiList(searchDbInfo)
        window.console.log('loadPageCallback---->', ps)
    }

    pageCallback(page, _this) {
        let searchDbInfo = _this.getValueByReducers('SystemModel.searchDbInfo').toJS()
        searchDbInfo.page = page
        _this.setValueByReducers('SystemModel.searchDbInfo', Immutable.fromJS(searchDbInfo))
        _this.props.loadApiList(searchDbInfo)
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
        this.setState({editorOpen: true, title: '编辑'})
        this.setValueByReducers('SystemModel.apiConfig', ele)
        window.console.log('editor----->', ele)
    }

    delete(ele) {
        this.setState({open: true})
        this.setValueByReducers('SystemModel.apiConfig', Immutable.fromJS(ele))
    }

    deleteDialogClose = () => {
        this.setState({open: false})
    }

    deleteCommit = () => {
        const apiconfig = this.getValueByReducers('SystemModel.apiConfig').toJS()
        window.console.log(22222222222)
        this.props.deleteApiConfig(apiconfig.id, this, (_this) => {
            _this.setState({open: false}, () => {
                _this.props.loadApiList(_this.getValueByReducers('SystemModel.searchDbInfo').toJS(), _this)
            })
        })
    }

    searchList() {
        this.props.loadApiList(this.getValueByReducers('SystemModel.searchDbInfo').toJS(), this)
    }

    addApiConfig() {
        this.setValueByReducers('SystemModel.apiConfig', {})
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
                    <InputPlus {...this.props} valueLink='SystemModel.apiConfig.systemName' placeholder='DB名称'/>
                </Row>
                <Row style={{margin: '5px'}}>
                    <InputPlus {...this.props} valueLink='SystemModel.apiConfig.apiPath' placeholder='应用路径'/>
                </Row>
                <Row style={{margin: '5px'}}>
                    <TextArea maxLength={400} {...this.props} valueLink='SystemModel.apiConfig.excuteSql'
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
                        <InputPlus {...this.props} valueLink='SystemModel.searchDbInfo.data.name'
                                   placeholder='应用路径'/>
                    </Col>
                    <Col sm={3} className="col-lr">
                        <InputPlus {...this.props} valueLink='SystemModel.searchDbInfo.data.driver'
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
