import request from '@/utils/request'

export function getCustomerList(data) {
  return request({
    url: '/nebula/sale/customer',
    method: 'get',
    params: data
  })
}
export function addCustomer(data) {
  return request({
    url: '/nebula/sale/customer',
    method: 'post',
    data
  })
}
export function editSaveCustomer(data, id) {
  return request({
    url: '/nebula/sale/customer/' + id,
    method: 'put',
    data
  })
}
export function delCustomer(data) {
  return request({
    url: '/nebula/sale/customer/' + data,
    method: 'delete'
  })
}
export function customerDetail(data) {
  return request({
    url: '/nebula/sale/customer/' + data,
    method: 'get'
  })
}
export function detailSalesStageAdd(data, id) {
  return request({
    url: '/nebula/sale/salesStage/' + id,
    method: 'post',
    data
  })
}
export function detailSalesStageList(data, params = { pageNo: 1, pageSize: 20 }) {
  return request({
    url: '/nebula/sale/salesStage/' + data,
    method: 'get',
    params: params
  })
}
export function addContacts(data) {
  return request({
    headers: {
      // 修改请求头
      'Content-Type': 'application/json',
      accept: '*/*'
    },
    url: '/nebula/sale/contacts',
    method: 'post',
    data
  })
}
export function addPic(data) {
  return request({
    headers: {
      // 修改请求头
      'Content-Type': 'multipart/form-data',
      accept: '*/*'
    },
    url: '/nebula/sale/file',
    method: 'post',
    data
  })
}
