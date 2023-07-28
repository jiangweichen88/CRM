import request from '@/utils/request'
// 获取任务列表
export function getTaskList(params) {
  return request({
    url: '/nebula/sale/task',
    method: 'get',
    params: params
  })
}

// 添加任务
export function addTask(data) {
  return request({
    url: '/nebula/sale/task',
    method: 'post',
    data
  })
}

// 修改任务
export function editTask(data) {
  return request({
    url: '/nebula/sale/task',
    method: 'PATCH',
    data
  })
}

// 删除任务
export function deleteTask(data) {
  return request({
    url: '/nebula/sale/task/' + data,
    method: 'delete'
  })
}

// 工作台通话统计
export function callLogStatis(params) {
  return request({
    url: '/nebula/sale/callLog/statis',
    method: 'get',
    params: params
  })
}
