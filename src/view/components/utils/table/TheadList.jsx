/**
 * Created by liang.wang on 17/9/7.
 */
import React from 'react'
import Component from '../base/ComponentAlert'
import {Row, Col, Panel, Paging} from 'eagle-ui'
//import TbodyRow from './TbodyRow'
import Paper from 'material-ui/Paper'
import './TbodyRow.less'
import classNames from 'classnames'
import {imgs} from './img/imgs'
import {Button} from 'antd'
import Immutable from 'immutable'
import {DataUtil} from '../util/Index'

/**
 *  table
 */
export default class TheadList extends Component {

    static defaultProps = {
        zDepth: 2,
        searchValueLink: '',
        columnInfo: '',
        sortBack: function () {
        },
        loadPageCallback: function () {
        },
        pageCallback: function () {
        }
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            searchValueLink: this.props.searchValueLink,
            expand: 'up',
            refreshRow: false,
            toastType: 'success',
            toastMsg: '',
            iconLoading: false,
            search: {
                page: 1,
                pageSize: 10
            }
        }
    }

    getImageStyles(type) {
        switch (type) {
            case 'both':
                return imgs.SORT_BOTH
            case 'asc':
                return imgs.SORT_ASC
            case 'desc':
                return imgs.SORT_DESC
        }
    }

    loadPageCallback(ps) {
        this.setState({
            search: {
                page: 1,
                pageSize: parseInt(ps)
            }
        }, () => {
            this.props.loadPageCallback && this.props.loadPageCallback(ps, this)
        })
    }

    pageCallback(page) {
        this.setState({
            search: {
                page: page,
                pageSize: this.state.search.pageSize
            }
        }, () => {
            this.props.pageCallback && this.props.pageCallback(page, this)
        })
    }

    toggle(num) {
        const columnInfo = this.getValueByReducers(this.props.columnInfo).toJS()
        if (!columnInfo.column[num].key) {
            return
        }
        const addSelected = (classNametitle) => {
            if (classNametitle.indexOf('col-color-select') > -1) {
                return classNametitle
            }
            return classNametitle + 'col-color-select'
        }
        const removeSelected = (classNametitle) => {
            return classNametitle.replace('col-color-select', '')
        }

        for (const i in columnInfo.column) {
            if (num == i) {
                columnInfo.column[i].classNametitle = addSelected(columnInfo.column[i].classNametitle)
                columnInfo.column[i].classNameColumn = addSelected(columnInfo.column[i].classNameColumn)
                columnInfo.column[i].sortArrow = this.toggleSort(columnInfo.column[i].key, columnInfo.column[i].sortArrow)
            } else {
                columnInfo.column[i].classNametitle = removeSelected(columnInfo.column[i].classNametitle)
                columnInfo.column[i].classNameColumn = removeSelected(columnInfo.column[i].classNameColumn)
                columnInfo.column[i].sortArrow = 'both'
            }
        }
        this.setValueByReducers(this.props.columnInfo, Immutable.fromJS(columnInfo))
    }

    toggleSort(key, sort) {
        let _sort = 'sort'

        switch (sort) {
            case 'both':
                _sort = 'asc'
                break
            case 'asc':
                _sort = 'desc'
                break
            case 'desc':
                _sort = 'asc'
                break
        }
        this.props.sortBack && this.props.sortBack(key, _sort, this)
        return _sort
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
        let tradeList = this.getValueByReducers(this.state.searchValueLink)
        const columnInfo = this.getValueByReducers(this.props.columnInfo)
        const list = tradeList.get('list')
        //window.console.log('table list------->', list)
        let totals
        if (tradeList) {
            tradeList = tradeList.toJS()
            totals = tradeList.totalCount
        }
        //console.log('search.page: ' + search.page + ' search.pageSize: ' + search.pageSize + ' totals: ' + totals)
        let rowNo = 1
        return (
            <Paper zDepth={this.props.zDepth}>
                <div className="tradeList outerPanel marginTopSpace">
                    <Panel className="marginTopSpace">
                        <table border="1" style={{width: '100%'}}>
                            <thead className="marginSpacePanelHeader">
                            <tr className="panelHeader">
                                {
                                    columnInfo && columnInfo.get('column').map((item, i) => {
                                        item = item.toJS()
                                        const _className = classNames(item.sortArrow + '_style', item.classNametitle)
                                        const imgsrc = this.getImageStyles(item.sortArrow)
                                        return <th style={{width: item.width + '%', padding: '7px'}}
                                                   className={_className}
                                                   onClick={this.toggle.bind(this, i)} key={i}>{item.name}
                                            {item.key ?
                                                <img src={imgsrc} style={{marginBottom: '4px'}}/> : null}
                                        </th>
                                    })
                                }

                            </tr>
                            </thead>
                            <tbody style={{'padding-top': '0px'}} className="tbodyRow">
                            {
                                list && list.map((ele) => {
                                    let rowColor = rowNo % 2 == 0 ? 'row-color-odd' : 'row-color-eve'
                                    rowNo++
                                    return <tr className={rowColor}>
                                        {
                                            columnInfo && columnInfo.get('column').map((item, i) => {
                                                if (item.get('button')) {
                                                    return <td style={{width: item.get('width') + '%'}}
                                                               className={item.get('classNameColumn')}
                                                               key={i}>{_this.createButton(item, ele)}
                                                    </td>
                                                }

                                                item = item.toJS()
                                                return <td
                                                    style={{width: item.width + '%', border: '1px solid #e9e9e9'}}
                                                    className="td-center"
                                                    key={i}>{item.map ? DataUtil.StringUtils.isEmpty( item.map[ele.get(item.key)] ) ? '-' :item.map[ele.get(item.key)] :
                                                    (item.key ? (DataUtil.StringUtils.isEmpty(ele.get(item.key)) ? '-' : ele.get(item.key)) : '-')}
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                        <Row className="paging-margin">
                            <Col sm={1}/>
                            <Col sm={11}>
                                <Paging showItemsNumber={true} loadPageCallback={::this.loadPageCallback}
                                        currentPage={this.state.search.page}
                                        pageSize={this.state.search.pageSize}
                                        pageCallback={::this.pageCallback}
                                        total={totals && totals > 0 ? totals : 0}/>
                            </Col>
                        </Row>
                    </Panel>
                </div>
            </Paper>
        )
    }
}