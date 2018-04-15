import {Model} from 'ea-react-dm'

@Model('DBInfoModel')
export default class DBInfoModel {
    static list = []

    static actionState = ''

    static addDbInfo = {
        id: 2,
        url: "jdbc:mysql://172.18.17.16:3306/ppdai_rt_appbillphone",
        name: "130Mysql Datasource",
        driver: "com.mysql.jdbc.Driver",
        userAccount: "root",
        password: "123456",
        dbType: 0,
        description: "",
        enable: "true"
    }

    static searchDbInfo = {
        offset: 1,
        page: 1,
        pageSize: 10
    }

    static apiConfig = {
        id: 0,
        systemName: '',
        apiPath: '',
        excuteSql: ''
    }

    static textArea = {
        value: ''
    }

    static dbListInfo = {
        column: [
            {
                name: '主键',
                width: 5,
                key: 'id'
            },
            {
                name: '数据源名称',
                width: 13,
                key: 'name'
            },
            {
                name: '数据源名称',
                width: 13,
                key: 'driver'
            },
            {
                name: '数据源类型',
                width: 10,
                map: {0: 'Mysql', 1: 'Phoenix', 2: 'Hbase'},
                key: 'dbType'
            },
            {
                name: '数据源URL',
                width: 30,
                key: 'url'
            },
            {
                name: '操作',
                width: 10,
                key: null,
                button: null
            }
        ]
    }
}