import {request} from "./request"

//登录请求
export const reqLogin = ({username,password}) => request({url:'login', method:'post', data:{username,password}})

//请求左侧菜单栏项
export const reqMenu = () => request({url:'menus',method: 'get'})

//获取用户列表
export const reqUserList = (params) => request({url:'users',method:'get',params})

//改变用户状态
export const reqUpdateState =(uId,type) => request({url:`users/${uId}/state/${type}`,method:"put"})

//添加用户

export const reqAddUser = (userInfo) => request({url:'users',method:'post',data:userInfo})

//编辑用户
export const reqUpdateUser = (id,email,mobile) => request({url:`users/${id}`,method:'put',data:{email,mobile}})

