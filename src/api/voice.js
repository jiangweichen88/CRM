import request from '@/utils/request'

export function getCallLog(data) {
  return request({
    url: '/nebula/sale/callLog',
    method: 'get',
    params: data
  })
}
export function postCallLog(data) {
  return request({
    url: '/nebula/sale/callLog',
    method: 'post',
    data
  })
}
export function getCustomerId(phoneNu) {
  return request({
    url: '/nebula/sale/customer/simple/' + phoneNu,
    method: 'get'
  })
}
