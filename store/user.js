export const strict = false

export const state = () => ({
  user: null,
  info: null,
});

export const mutations = {
  setUser(state, payload) {
    state.user = null
    if (payload) {
      state.user = payload
    }
  },
  setInfo(state, payload) {
    state.info = null
    if (payload) {
      state.info = payload
    }
  }
};

export const actions = {
  setUser({
    commit
  }, payload) {
    commit('setUser', payload)
  },
  setInfo({
    commit
  }, payload) {
    commit('setInfo', payload)
  },
};

export const getters = {
  user: state => {
    return state.user
  },
  info: state => {
    return state.info
  },
  isAuthenticated(state) {
    return !!state.user
  }
};
