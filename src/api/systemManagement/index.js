import service from '@/utils/request'

//*获取api信息
export const getApi = (params) => {
    return service({
        url: "/systemApiAuthority/getAll",
        method: 'get',
        params
    })
}

//*添加api信息
export const addApi = (data) => {
    return service({
        url: "/companyAPI/add",
        method: 'post',
        data
    })
}

//*更新api信息
export const updateApi = (data) => {
    return service({
        url: "/companyAPI/add",
        method: 'post',
        data
    })
}

//!删除api信息
export const deleteApi = (params) => {
    return service({
        url: "/systemApiAuthority/delete",
        method: 'delete',
        params
    })
}

//*获取路由列表
export const getRoute = (params) => {
    return service({
        url: "/systemRouteAuthority/get",
        method: 'get',
        params
    })
}

//!删除路由
export const deleteRoute = (params) => {
    return service({
        url: "/systemRouteAuthority/delete",
        method: 'delete',
        params
    })
}

//*添加路由
export const addRoute = (data) => {
    return service({
        url: "/systemRouteAuthority/add",
        method: 'post',
        data
    })
}

//*更新路由
export const updateRoute = (data) => {
    return service({
        url: "/systemRouteAuthority/update",
        method: 'put',
        data
    })
}

//*获取角色列表
export const getRole = (params) => {
    return service({
        url: "/systemRole/getAll",
        method: 'get',
        params
    })
}

//*新增角色
export const addRole = (data) => {
    return service({
        url: "/systemRole/add",
        method: 'post',
        data
    })
}

//*更新角色信息
export const updateRole = (data) => {
    return service({
        url: "/systemRole/update",
        method: 'put',
        data
    })
}

//!删除角色信息
export const deleteRole = (params) => {
    return service({
        url: "/systemRole/delete",
        method: 'delete',
        params
    })
}

// 获取管理员列表
export const getAdmin = (params) => {
    return service({
        url: "/systemAdministrator/get",
        method: 'get',
        params
    })
}

// 新增管理员
export const addAdmin = (data) => {
    return service({
        url: "/systemAdministrator/add",
        method: 'post',
        data
    })
}

// 更新管理员信息
export const updateAdmin = (data) => {
    return service({
        url: "/systemAdministrator/update",
        method: 'put',
        data
    })
}

// 删除管理员
export const deleteAdmin = (params) => {
    return service({
        url: "/systemAdministrator/delete",
        method: 'delete',
        params
    })
}