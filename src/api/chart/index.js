import service from '@/utils/request'

//*获取图表数据
export const getChart = (params) => {
    return service({
        url: "/statistic/accesss",
        method: 'get',
        params
    })
}

//*获取词云数据
export const getWords = (params) => {
    return service({
        url: "/statistic/category",
        method: 'get',
        params
    })
}