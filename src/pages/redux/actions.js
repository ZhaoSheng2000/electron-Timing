/*
包含n个 action creator
异步action
同步action
 */
//每一个type必然对应一个同步action
import {
    LOGIN_SUCCESS,
    ERR_MSG,
} from "./action-types";

import {
    reqLogin,
} from "../../api";


//登陆成功的同步action
const loginSuccess = (user) => ({type: LOGIN_SUCCESS, data: user});
//错误提示信息的action
const errMsg = (msg) => ({type: ERR_MSG, data: msg});
//登陆的异步action
export const userLogin = (user) => {
    return async dispatch => {
        const response = await reqLogin(user);
        const result = response.data;
        if (result.err_code === 1002) {
            dispatch(errMsg('该用户不存在！'))
        } else
            dispatch(loginSuccess(result))
    }
};




