/*global $ */

import when from 'when';
import LoginAction from '../actions/LoginAction';
import {LOGIN_URL, AUTHENTICATION, GRANT_TYPE} from '../constants/LoginConstant';

class AuthenService {

    login(username, password) {
        return this._handler(when(
            $.ajax({
                url: LOGIN_URL,
                dataType: 'json',
                method: 'POST',
                cache: false,
                headers: {
                    'Authorization': AUTHENTICATION
                },
                data: {
                    grant_type: GRANT_TYPE,
                    username: username,
                    password: password
                }
            })
        ));
    }

    logout(){
        LoginAction.logout();
    }

    _handler(promise) {

        return promise
            .then(function (resp) {
                LoginAction
                    .login(
                        resp.access_token,
                        resp.refresh_token,
                        resp.jti
                    );
                return true;
            });
    }

}

export default new AuthenService();