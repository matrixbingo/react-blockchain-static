/**
 * Created by liang.wang on 17/9/14.
 */
import React from 'react'
import {View} from 'ea-react-dm'
import Component from '../../../../utils/base/ComponentAlert'
import {Row, Col, Panel} from 'eagle-ui'
import {DbInfoControl} from '../../../../../../controller/Index'
import {column} from '../../../../../../model/base/BaseModel'
import Immutable from 'immutable'
import _ from 'underscore'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {TextArea, InputPlus} from '../../../../utils/index'
import {PanelHeader, PanelContent, Paging} from 'eagle-ui'
import Timeline from '../timeline/Timeline'
import Paper from 'material-ui/Paper'
//import DbInfoEditor from './DbInfoEditor'
//import Dialog from './Dialog'
//import TradeRow from "../../../utils/table/TableRow";
//import $ from 'jquery'


@View(DbInfoControl)
export default class DbInfoList extends Component {

    constructor(props, context) {
        super(props, context)
        this.searchValueLink = 'DBInfoModel.list'
        this.columnInfo = 'DBInfoModel.dbListInfo'
        this.initColumn()
        this.state = {
            title: '编辑',
            editorOpen: false,
            open: false
        }
        this.props.loadApiList(this.getValueByReducers('DBInfoModel.searchDbInfo').toJS(), this)
    }

    handleClose = () => {
        this.setState({editorOpen: false})
    }

    commitEdtor = () => {
        const apiConfig = this.getValueByReducers('DBInfoModel.apiConfig').toJS()
        if (this.state.title === '编辑') {
            this.props.updateApiConfig(apiConfig, this, (_this) => {
                _this.setState({editorOpen: false}, () => {
                    _this.props.loadApiList(_this.getValueByReducers('DBInfoModel.searchDbInfo').toJS(), _this)
                })
            })
        } else {
            this.props.addApiConfig(apiConfig, this, (_this) => {
                _this.setState({editorOpen: false}, () => {
                    _this.props.loadApiList(_this.getValueByReducers('DBInfoModel.searchDbInfo').toJS(), _this)
                })
            })
        }
    }

    sortBack(key, sort, _this) {
        window.console.log(key, sort, _this)
    }

    loadPageCallback(ps, _this) {
        let searchDbInfo = _this.getValueByReducers('DBInfoModel.searchDbInfo').toJS()
        searchDbInfo.page = 1
        searchDbInfo.pageSize = ps
        _this.setValueByReducers('DBInfoModel.searchDbInfo', Immutable.fromJS(searchDbInfo))
        _this.props.loadApiList(searchDbInfo)
        window.console.log('loadPageCallback---->', ps)
    }

    pageCallback(page, _this) {
        let searchDbInfo = _this.getValueByReducers('DBInfoModel.searchDbInfo').toJS()
        searchDbInfo.page = page
        _this.setValueByReducers('DBInfoModel.searchDbInfo', Immutable.fromJS(searchDbInfo))
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
        this.setValueByReducers('DBInfoModel.apiConfig', ele)
        window.console.log('editor----->', ele)
    }

    delete(ele) {
        this.setState({open: true})
        this.setValueByReducers('DBInfoModel.apiConfig', Immutable.fromJS(ele))
    }

    deleteDialogClose = () => {
        this.setState({open: false})
    }

    deleteCommit = () => {
        const apiconfig = this.getValueByReducers('DBInfoModel.apiConfig').toJS()
        window.console.log(444444444444)
        this.props.deleteApiConfig(apiconfig.id, this, (_this) => {
            _this.setState({open: false}, () => {
                _this.props.loadApiList(_this.getValueByReducers('DBInfoModel.searchDbInfo').toJS(), _this)
            })
        })
    }

    searchList() {
        this.props.loadApiList(this.getValueByReducers('DBInfoModel.searchDbInfo').toJS(), this)
    }

    addApiConfig() {
        this.setValueByReducers('DBInfoModel.apiConfig', {})
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
                    <InputPlus {...this.props} valueLink='DBInfoModel.apiConfig.systemName' placeholder='DB名称'/>
                </Row>
                <Row style={{margin: '5px'}}>
                    <InputPlus {...this.props} valueLink='DBInfoModel.apiConfig.apiPath' placeholder='应用路径'/>
                </Row>
                <Row style={{margin: '5px'}}>
                    <TextArea maxLength={400} {...this.props} valueLink='DBInfoModel.apiConfig.excuteSql'
                              placeholder='请输入执行SQL'/>
                </Row>
            </div>
        </Dialog>
    }

    render() {
        //const _this = this
        let tradeList = this.getValueByReducers('DBInfoModel.list')
        const search = this.getValueByReducers('DBInfoModel.searchDbInfo').toJS()
        const list = tradeList.get('list')
        let totals
        if (tradeList) {
            tradeList = tradeList.toJS()
            totals = tradeList.totalCount
        }
        return <div>
            <div>
                {this.createEditorDialog()}
                {this.createDeleteDialog()}
            </div>
            <Paper zDepth={1}>
                <Timeline list={list} />
            </Paper>
                    <Row>
                        <Col sm={11}>
                            <Paging showItemsNumber={true} loadPageCallback={::this.loadPageCallback}
                                    currentPage={search.page} pageSize={search.pageSize}
                                    pageCallback={::this.pageCallback} total={totals && totals > 0 ? totals : 0}/>
                        </Col>
                    </Row>
        </div>
    }
}
