/**
 * Created by liang.wang on 17/9/14.
 */
import React from 'react'
import {View} from 'ea-react-dm'
import Component from '../../../utils/base/ComponentAlert'
import {ManagerControl} from '../../../../../controller/Index'
import {TableList} from '../../../utils/index'
import {column} from '../../../../../model/base/BaseModel'
import Immutable from 'immutable'
import _ from 'underscore'

@View(ManagerControl)
export default class InstCapitalInfo extends Component {

    constructor(props, context) {
        super(props, context)
        this.searchValueLink = 'ManagerModel.authList'
        this.columnInfo = 'ManagerModel.instCapitalInfo'
        this.props.loadAuthList(this.searchParam, this)
        this.initColumn()
    }

    sortBack(key, sort, _this) {
        window.console.log(key, sort, _this)
    }

    loadPageCallback(ps) {
        window.console.log('loadPageCallback---->', ps)
    }

    pageCallback(page) {
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
        window.console.log('editor----->', ele)
    }

    delete(ele) {
        window.console.log('delete----->', ele)
    }

    render() {
        return <TableList {...this.props}
                          columnInfo={this.columnInfo}
                          searchValueLink={this.searchValueLink}
                          sortBack={this.sortBack}
                          loadPageCallback={this.loadPageCallback}
                          pageCallback={this.pageCallback}/>
    }
}
