import {Model} from 'ea-react-dm'

@Model('ApiModel')
export default class ApiModel {
    static list = []

    static actionState = ''

    static searchApiConfig = {
        data: {
            systemName: '',
            apiPath: '',
        },
        page: 1,
        pageSize: 10
    }

    static apiConfig = {
        'id': 0,
        'apiPath': '',
        'systemId': null,
        'systemName': '',
        'moduleName': null,
        'dbId': null,
        'apiType': null,
        'scriptEnable': null,
        'signEnable': null,
        'clazz': null,
        'sqlDes': null,
        'compressionType': null,
        'resultLimit': null,
        'isCache': null,
        'expireSeconds': null,
        'isAsync': null,
        'requestEncryptEnable': null,
        'responseEncryptEnable': null,
        'status': null,
        'isActive': null,
        'isOpen': null,
        'description': null,
        'createTime': null,
        'updateTime': null,
        'excuteSql': ''
    }

    static textArea = {
        value: ''
    }

    static apiListInfo = {
        column: [
            {
                name: '主键',
                width: 15,
                key: 'id'
            },
            {
                name: '系统名称',
                width: 20,
                key: 'systemName'
            },
            {
                name: '应用路径',
                width: 30,
                key: 'apiPath'
            },
            {
                name: '操作',
                width: 15,
                key: null,
                button: null
            }
        ]
    }
}