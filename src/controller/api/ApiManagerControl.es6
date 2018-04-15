import {Control, Action} from 'ea-react-dm'
import ApiModel from '../../model/api/ApiModel'

@Control(ApiModel)
export default class ApiManagerControl extends Action {

    static loadApiList(param, _this, callback) {
        return this.ajaxPost('/apiConfig/list', param, 'list', _this, callback)
    }

    static getApiInfo(id, _this, callback){
        return this.ajaxGet('/apiConfig/' + id, null, 'apiConfig', _this, callback)
    }

    static updateApiConfig(apiConfig, _this, callback) {
        return this.ajaxGet('/apiConfig/update', apiConfig, 'actionState', _this, callback)
    }

    static addApiConfig(apiConfig, _this, callback) {
        return this.ajaxPost('/apiConfig', apiConfig, 'actionState', _this, callback)
    }

    static deleteApiConfig(id, _this, callback) {
        return this.fetch('/apiConfig/' + id, 'DELETE', null, 'actionState', _this, callback)
    }
}