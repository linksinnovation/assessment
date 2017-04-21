import AppDispatcher from '../dispatchers/AppDispatcher';

import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstant';

class LoginAction {

    checkToken() {
        this.login(
            localStorage.getItem('access_token'),
            localStorage.getItem('refresh_token'),
            localStorage.getItem('jti')
        )
    }

    login(access_token, refresh_token, jti) {

        var saveAcessToken = localStorage.getItem('access_token');

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            token: access_token
        });

        if (saveAcessToken !== access_token) {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('jti', jti);
        }
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('jti');
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}

export default new LoginAction();