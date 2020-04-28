import axios from 'axios'

//一言接口
// export const reqyiyan = ()=>axios.get('https://v1.hitokoto.cn/?c=d')

//登录接口
export const reqLogin = ({username, password}) => axios.post('/my/login', {
    username,
    password
});
