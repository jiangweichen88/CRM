import { get } from 'lodash'
const state = {
  isAutoAnswer: false
}

const mutations = {
  SET_ISAUTOANSWER: (state, isAutoAnswer) => {
    state.isAutoAnswer = isAutoAnswer
  }
}

const actions = {
  setIsAutoAnswer({ commit }, isAutoAnswer) {
    commit('SET_ISAUTOANSWER', isAutoAnswer)
    const cccDesk_CallCenter = get($CCCSdkWsInstance, 'cccDesk_CallCenter')
    cccDesk_CallCenter && cccDesk_CallCenter.setIsAutoAnswer(isAutoAnswer)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
