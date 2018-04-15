import {Control, Action} from 'ea-react-dm'
import UserModel from '../../model/user/UserModel'

@Control(UserModel)
export default class UserControl extends Action {

    static loadUserMenus(param, _this, callback) {
        return ::this.ajaxGet('/user/userMenus', param, 'menus', _this, callback)
    }

    static updateUserMenus(valueLink, menus) {
        valueLink = valueLink.match(/\.(.+?)$/, valueLink)[1]
        return (dispatch) => {
            dispatch(this.save(valueLink, menus))
        }
    }
}
