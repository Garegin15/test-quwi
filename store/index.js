export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const actions = {
  async fetchMenu({ commit }) {
    try {
      const menu = (await $prismic.api.getSingle('menu')).data

      commit('SET_DATA', data)
    } catch (e) {
      const error = 'Please create a menu document'

      commit('SET_ERROR', error);
    }
  },
  // async nuxtServerInit({ dispatch }) {
  //   // await dispatch('core/load')
  // }
}
