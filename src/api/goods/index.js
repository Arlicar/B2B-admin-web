import service from '@/utils/request'

//!审核不通过
export const refuseGoods = (params) => {
    return service({
        url: "/admin/rejectGoods",
        method: 'delete',
        params
    })
}

//*审核通过
export const passGoods = (data) => {
    return service({
        url: "/admin/passGoods",
        method: 'put',
        data
    })
}

//*获取分类信息
export const getCategory = (params) => {
    return service({
        url: "/category/get",
        method: 'get',
        params
    })
}

//*删除分类信息
export const deleteCategory = (params) => {
    return service({
        url: "/category/delete",
        method: 'delete',
        params
    })
}

//* 提交新分类信息
export const addCategory = (data) => {
    return service({
        url: "/category/add",
        method: 'post',
        data
    })
}
//* 更新分类信息
export const updateCategory = (data) => {
    return service({
        url: "/category/update",
        method: 'post',
        data
    })
}