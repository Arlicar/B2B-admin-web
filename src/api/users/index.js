import service from '@/utils/request'

//*获取用户信息
export const getUsers = (params) => {
    return service({
        url: "/admin/user",
        method: 'get',
        params
    })
}

//*修改用户状态
export const changeUserState = (data) => {
    return service({
        url: "/admin/user",
        method: 'put',
        data
    })
}

//*获取企业认证信息
export const getCompanies = (params) => {
    return service({
        url: "/authentication/getCompany",
        method: 'get',
        params
    })
}

//*获取个人认证信息
export const getPersons = (params) => {
    return service({
        url: "/authentication/getPersonal",
        method: 'get',
        params
    })
}

//*获取用户api信息
export const getUserApi = (params) => {
    return service({
        url: "/companyApi/getAll",
        method: 'get',
        params
    })
}

//*添加用户api信息
export const addUserApi = (data) => {
    return service({
        url: "/companyApi/add",
        method: 'post',
        data
    })
}

//*删除用户api
export const deleteUserApi = (params) => {
    return service({
        url: "/companyApi/delete",
        method: 'delete',
        params
    })
}

//*更新用户api
export const updateUserApi = (data) => {
    return service({
        url: "/companyApi/update",
        method: 'put',
        data
    })
}

//*获取用户路由
export const getUserRouter = (params) => {
    return service({
        url: "/companyRoute/get",
        method: 'get',
        params
    })
}

//*增添用户路由
export const addUserRouter = (data) => {
    return service({
        url: "/companyRoute/add",
        method: 'post',
        data
    })
}

//*删除用户路由
export const deleteUserRouter = (params) => {
    return service({
        url: "/companyRoute/delete",
        method: 'delete',
        params
    })
}

//*修改用户路由
export const updateUserRouter = (data) => {
    return service({
        url: "/companyRoute/update",
        method: 'put',
        data
    })
}