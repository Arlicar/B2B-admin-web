import service from '@/utils/request'

//* 登录
export const login = (data) => {
    return service({
        url: "/systemAdministrator/login",
        method: 'post',
        data
    })
}

export const orderA2dd = (params) => {
    return service({
        url: "/admin/lo12gin",
        method: 'get',
        params
    })
}
export const ord3erAdd = (params) => {
    return service({
        url: "/admin/lo23gin",
        method: 'get',
        params
    })
}