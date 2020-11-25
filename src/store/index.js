import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'

Vue.use(Vuex);

import * as types from './mutation-types';

const savedLists = localStorage.getItem('trollo-lists');

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user : {},
  lists: savedLists ? JSON.parse(savedLists) : [
    {
      title: 'To Do',
      cards: [
        { body: 'English' },
        { body: 'Mathematics' },
      ]
    },
    {
      title: 'Next Up',
      cards: [
        { body: 'Science' }
      ]
    },
    {
      title: 'In Progress',
      cards: []
    }
  ]
};

const actions = {
  login({commit}, user){
    console.log('entro')
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios({url: process.env.VUE_APP_API_URL + 'users/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            Axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
    })
  },
  register({commit}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      Axios({url: process.env.VUE_APP_API_URL + 'users', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            Axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
    })
  },
  logout({commit}){
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete Axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}
const mutations = {
  auth_request(state){
    state.status = 'loading'
  },
  auth_success(state, token, user){
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error(state){
    state.status = 'error'
  },
  logout(state){
    state.status = ''
    state.token = ''
  },
  [types.ADD_LIST](state, { title }) {
    state.lists.push({ title, cards: [] });
  },
  [types.REMOVE_LIST](state, { listIndex }) {
    state.lists.splice(listIndex, listIndex);
  },
  [types.ADD_CARD_TO_LIST](state, { to, body }) {
    state.lists[to].cards.push({ body });
  },
  [types.REMOVE_CARD_FROM_LIST](state, { from, cardIndex }) {
    state.lists[from].cards.splice(cardIndex, 1);
  },
  [types.MOVE_CARD_TO_LIST](state, { from, to }) {
    const targetCard = state.lists[from.listIndex].cards[from.cardIndex];
    state.lists[from.listIndex].cards.splice(from.cardIndex, 1);
    if (to.cardIndex !== null) {
      state.lists[to.listIndex].cards.splice(to.cardIndex, 0, targetCard);
    } else {
      state.lists[to.listIndex].cards.push(targetCard);
    }
  },
};

const getters = {
  listsCount: (state) => state.lists.length,
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

store.subscribe((mutation, { lists }) => {
  localStorage.setItem('trollo-lists', JSON.stringify(lists));
});

export default store;
