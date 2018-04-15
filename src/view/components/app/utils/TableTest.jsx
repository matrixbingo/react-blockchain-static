import React, {Component /*,PropTypes*/} from 'react'
import {Table} from 'antd'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}]

const data = []
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
    })
}

export default class TableTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bordered: false,
            loading: false,
            rowSelection: undefined,
            scroll: undefined,
            selectedRowKeys: []
        }
    }

    onSelectChange = (selectedRowKeys) => {
        window.console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({selectedRowKeys: selectedRowKeys})
    }

    render() {

        const {selectedRowKeys} = this.state

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()]  // 0...45
                    })
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false
                        }
                        return true
                    })
                    this.setState({selectedRowKeys: newSelectedRowKeys})
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = []
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true
                        }
                        return false
                    })
                    this.setState({selectedRowKeys: newSelectedRowKeys})
                },
            }],
            onSelection: this.onSelection
        }

        return (
            <Table rowSelection={rowSelection} {...this.state} columns={columns} dataSource={data}/>
        )
    }
}
