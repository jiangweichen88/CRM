import request from '@/utils/request'

// discover
export function getDiscoverListApi(data) {
  return request({
    url: '/nebula/sale/knowledge/articles',
    method: 'get',
    params: data
  })
}

// tree
export function getlevelTreeListApi(parentId) {
  return request({
    url: '/nebula/sale/knowledge/directory/levelTreeList?parentId=' + parentId,
    method: 'get'
  })
}
export function getTreeArticlesApi(id, data) {
  return request({
    url: `/nebula/sale/knowledge/directory/${id}/articles`,
    method: 'get',
    params: data
  })
}