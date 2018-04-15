import {Control, Action} from 'ea-react-dm'
import ManagerModel from '../../model/manager/ManagerModel'

@Control(ManagerModel)
export default class ManagerControl extends Action {

    static loadAuthList(param, _this, callback) {
        return ::this.ajaxGet('/auth/selectAuth', param, 'authList', _this, callback)
    }
}