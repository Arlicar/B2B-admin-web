import service from '@/utils/request'


//!获取交易订单信息
export const getOrders = (params) => {
    return service({
        url: "/admin/getOrderList",
        method: 'get',
        params
    })
}

//!获取询价信息
export const getInquiry = (params) => {
    return service({
        url: "/inquiry/getAll",
        method: 'get',
        params
    })
}

//*获取售后列表信息
export const getService = (params) => {
    return service({
        url: "/admin/serviceList",
        method: 'get',
        params
    })
}

//*获取竞价列表信息
export const getBiddings = (params) => {
    return service({
        url: "/admin/getBidding",
        method: 'get',
        params
    })
}