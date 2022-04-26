import service from '@/utils/request'

//*获取店铺信息
export const getShops = (params) => {
    return service({
        url: "/admin/getShop",
        method: 'get',
        params
    })
}

//*传递要改变状态的店铺ID
export const putShopId = (data) => {
    return service({
        url: "/admin/banShop",
        method: 'put',
        data
    })
}