import axios from 'axios'


const baseUrl = 'http://47.103.219.149:5000'
//一言接口
// export const reqyiyan = ()=>axios.get('https://v1.hitokoto.cn/?c=d')

//登录接口
export const reqLogin = ({email, password}) => axios.post(baseUrl + '/api/users/login', {
    email,
    password
});
//注册接口
export const reqRegister = ({email, name, password}) => axios.post(baseUrl + '/api/users/register', {
    email,
    name,
    password
})
export const reqTimeLine = ({userId, createTime,timeline}) => axios.post(baseUrl + '/api/timeline/newline', {
    userId,
    createTime,
    timeline
})
export const reqFindLine = ({userId}) => axios.post(baseUrl + '/api/timeline/findline', {userId})
//添加计划
export const reqAddPlan = ({userId,plans}) =>axios.post(baseUrl+'/api/timeline/addplan',{userId,plans})
//getplan
export const reqGetPlan = ({userId}) =>axios.post(baseUrl+"/api/timeline/getplan",{userId})
//delplan
export const reqDelPlan = ({id}) =>axios.post(baseUrl+"/api/timeline/delplan",{id})