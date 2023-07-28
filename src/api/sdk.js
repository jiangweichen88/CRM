import request from '@/utils/request'

export function getContacts() {
  return request({
    url: '/nebula/sale/contacts',
    method: 'get'
  })
}
export function delContacts(data) {
  return request({
    url: '/nebula/sale/contacts/' + data,
    method: 'delete'
  })
}
export function getUserInfo() {
  return request({
    url: '/nebula/sale/seat/loginInfo',
    method: 'get'
  })
}
