/**
 * Created by liang.wang on 17/9/14.
 */
import React from 'react'
import Component from '../../../../utils/base/ComponentAlert'
import {Row, Col, Panel} from 'eagle-ui'
import {InputPlus} from '../../../../utils/index'


export default class DbInfoEditor extends Component {

    constructor(props, context) {
        super(props, context)
        this.searchValueLink = 'DBInfoModel.list'
        this.columnInfo = 'DBInfoModel.apiListInfo'
        this.state = {
            title: '编辑',
            editorOpen: false,
            open: false,
            visible: true
        }
    }

    render() {
        return <div>
            <Row style={{margin: '5px'}}>
                <Col sm={1}></Col>
                <Col sm={3} className="category-col" style={{padding: '13px 6px 10px 10px'}}>
                    <span className="spanInline" style={{display: 'inline', float: 'right'}}>数据源名称:</span>
                </Col>
                <Col sm={6} style={{paddingLeft: '10px'}}>
                    <InputPlus {...this.props} valueLink='DBInfoModel.addDbInfo.name' placeholder='系统名称'/>
                </Col>
                <Col sm={1}></Col>
            </Row>
        </div>
    }
}
