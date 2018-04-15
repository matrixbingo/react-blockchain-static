/**
 * Created by liang.wang on 17/9/7.
 */
import React from 'react'
import Component from '../base/ComponentAlert'
import {Row, Col, Panel, PanelHeader, PanelContent, Paging} from 'eagle-ui'
import TableRow from './TableRow'
import Paper from 'material-ui/Paper'
import './TableRow.less'
import classNames from 'classnames'
import {imgs} from './img/imgs'
import Immutable from 'immutable'
import QueueAnim from 'rc-queue-anim'

/**
 * div table
 */
export default class TableList extends Component {

    static defaultProps = {
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
        this.props.loadPageCallback && this.props.loadPageCallback(ps, this)
    }

    pageCallback(page) {
        this.props.pageCallback && this.props.pageCallback(page, this)
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

    render() {
        let tradeList = this.getValueByReducers(this.state.searchValueLink)
        const columnInfo = this.getValueByReducers(this.props.columnInfo)
        const list = tradeList.get('list')
        //window.console.log('list------->',list)
        let totals
        if (tradeList) {
            tradeList = tradeList.toJS()
            totals = tradeList.totalCount
        }
        //console.log('search.page: ' + search.page + ' search.pageSize: ' + search.pageSize + ' totals: ' + totals)

        return (
            <Paper zDepth={2}>
                <div className="tradeList outerPanel marginTopSpace">
                    <Panel className="marginTopSpace">
                        <PanelHeader className="marginSpacePanelHeader">
                            <Row className="panelHeader">
                                <QueueAnim animConfig={[
                                    {opacity: [2, 0], translateY: [0, 80]},
                                    {opacity: [2, 0], translateY: [0, -80]}
                                ]} duration={240}>
                                    {
                                        columnInfo && columnInfo.get('column').map((item, i) => {
                                            item = item.toJS()
                                            const _className = classNames(item.sortArrow + '_style', item.classNametitle)
                                            const imgsrc = this.getImageStyles(item.sortArrow)
                                            return <Col style={{width: item.width + '%'}}
                                                        className={_className}
                                                        onClick={this.toggle.bind(this, i)} key={i}>{item.name}
                                                {item.key ?
                                                    <img src={imgsrc} style={{marginBottom: '4px'}}/> : null}
                                            </Col>
                                        })
                                    }
                                </QueueAnim>
                            </Row>
                        </PanelHeader>
                        <PanelContent style={{'padding-top': '0px'}}>
                            {list &&
                            <TableRow {...this.props} columnInfo={columnInfo} list={list}
                                      ref={(e) => this.tradeRow = e}/>}
                            <Row className="paging-margin">
                                <Col sm={1}/>
                                <Col sm={11}>
                                    <Paging showItemsNumber={true} loadPageCallback={::this.loadPageCallback}
                                            currentPage={this.state.search.page} pageSize={this.state.search.pageSize}
                                            pageCallback={::this.pageCallback}
                                            total={totals && totals > 0 ? totals : 0}/>
                                </Col>
                            </Row>
                        </PanelContent>
                    </Panel>

                </div>
            </Paper>
        )
    }
}