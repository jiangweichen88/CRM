const getters = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  imToken: (state) => state.user.imToken,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  rolesInfo: (state) => state.user.rolesInfo,
  answerList: (state) => state.user.answerList,
  permission_routes: (state) => state.permission.routes,
  userInfo: (state) => state.user.userInfo,
  isAutoAnswer: (state) => state.sdk.isAutoAnswer,
  errorLogs: (state) => state.errorLog.logs
}
export default getters
