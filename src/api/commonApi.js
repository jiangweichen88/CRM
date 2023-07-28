import request from '@/utils/request'

export function getDictionary(data) {
  return request({
    url: '/nebula/sale/dictionary/' + data,
    method: 'get'
  })
}
export function getAutoField(data) {
  return request({
    url: '/nebula/sale/autoField/' + data,
    method: 'get'
  })
}
export function getSaleUsers() {
  return request({
    url: '/nebula/sale/users',
    method: 'get'
  })
}
export function getDeparts() {
  return request({
    url: '/nebula/sale/departs',
    method: 'get'
  })
}
export function getCallLogList(phoneNo) {
  return request({
    url: '/nebula/sale/callLog/phone/' + phoneNo,
    method: 'get'
  })
}
