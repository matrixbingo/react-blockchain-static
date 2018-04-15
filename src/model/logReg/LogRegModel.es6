import {Model} from 'ea-react-dm'

@Model('LogRegModel')
export default class LogRegModel {

    /*登录*/
    static loginfo = {account: '', password: ''}

    /*注册*/
    static applyAccount = {displayName: 'yurx', email: 'yurx001@qq.com', password: 'yu001'}

    static regStatus = 0 //0:未完成 1：已完成 2：错误

    static reginfo = {displayName: 'zhangsan', email: 'asd@asc.com', password: '12345678', password2: '12345678'}

    static applyAccountReponse = {}



}