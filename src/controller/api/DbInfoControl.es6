import {Control, Action} from 'ea-react-dm'
import {DBInfoModel} from '../../model/Index'

@Control(DBInfoModel)
export default class DbInfoControl extends Action {

    static loadApiList(param, _this, callback) {
        return ::this.ajaxGet('/dbInfo/list', param, 'list', _this, callback)
    }

    static getBlockDetail(param, _this, callback) {
        return this.ajaxGet('/api/getBlockDetail', param, 'tradeList', _this, callback)
    }

    static updateApiConfig(apiConfig, _this, callback) {
        return this.ajaxGet('/apiConfig/update', apiConfig, 'actionState', _this, callback)
        //return ::this.ajaxPost('/stkciholder/search', param, 'tradeList', _this, callback)
    }

    static addApiConfig(apiConfig, _this, callback) {
        return this.ajaxGet('/apiConfig/dv', apiConfig, 'actionState', _this, callback)
    }

    static deleteApiConfig(id, _this, callback) {
        return this.ajaxGet('/apiConfig/' + id + '/delete', null, 'actionState', _this, callback)
    }
}