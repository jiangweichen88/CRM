import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/nebula/sale/sale/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/nebula/sale/sale/user/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: '/nebula/sale/user/updatePassword',
    method: 'PATCH',
    data
  })
}
