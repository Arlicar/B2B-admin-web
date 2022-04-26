import service from '@/utils/request'


//*获取合同列表
export const getTemplates = (params) => {
    return service({
        url: "/admin/getContract",
        method: 'get',
        params
    })
}


//!发送文件name和url到后台
export const submitTemplates = (data) => {
    return service({
        url: "/admin/addContract",
        method: 'post',
        data
    })
}
