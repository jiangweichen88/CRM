import request from '@/utils/request'

export function getMyTicketList(data) {
  return request({
    url: '/nebula/sale/tickets/myTicketList',
    method: 'get',
    params: data
  })
}
export function addTicketList(data) {
  return request({
    url: '/nebula/sale/tickets',
    method: 'post',
    data
  })
}
export function sentTicketList(ticketId, data) {
  return request({
    url: '/nebula/sale/tickets/' + ticketId + '/assign',
    method: 'put',
    params: data
  })
}
export function getAllTicketList(data) {
  return request({
    url: '/nebula/sale/tickets',
    method: 'get',
    params: data
  })
}
export function searchTicketList(data) {
  return request({
    url: '/nebula/sale/tickets/search',
    method: 'get',
    params: data
  })
}
export function getTicketItem(id) {
  return request({
    url: '/nebula/sale/tickets/' + id,
    method: 'get'
  })
}
export function submitTicketReplies(ticketId, data) {
  return request({
    url: 'nebula/sale/tickets/' + ticketId + '/replies',
    method: 'post',
    params: data
  })
}
export function getSubmitTicketReplies(ticketId) {
  return request({
    url: '/nebula/sale/tickets/' + ticketId + '/replies',
    method: 'get'
  })
}
export function endTicket(ticketId) {
  return request({
    url: '/nebula/sale/tickets/' + ticketId + '/close',
    method: 'delete'
  })
}
