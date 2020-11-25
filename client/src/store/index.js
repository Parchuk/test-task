import Vue from 'vue';
import Vuex from 'vuex';
import ContactListServices from '../ContactListService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contactList: [],
    loading: false,
    modalActive: false,
    currentClickedContactId: '',
    actionsForModal: '',
  },
  mutations: {
    updtateContactList(state, contactsList) {
      state.contactList = contactsList;
    },
    toggleLoading(state, loading) {
      state.loading = loading;
    },
    toggleModal(state, modalState) {
      state.modalActive = modalState;
    },
    currentContactId(state, id) {
      state.currentClickedContactId = id;
    },
    actionsForModal(state, action) {
      state.actionsForModal = action;
    }
  },
  actions: {
    async fetchContacts(ctx) {
      ctx.commit('toggleLoading', true);
      const data = await ContactListServices.getContactList();

      ctx.commit('updtateContactList', data);
      ctx.commit('toggleLoading', false);
    },
    updateContacts(ctx, newContactList) {
      ctx.commit('updtateContactList', newContactList);
    },
    switchStatusModal(ctx, statusModal) {
      ctx.commit('toggleModal', statusModal);
    },
    setCurrentContactId(ctx, id) {
      ctx.commit('currentContactId', id);
    },
    setActionsForModal(ctx, action) {
      ctx.commit('actionsForModal', action);
    }

  },
  getters: {
    allContacts(state) {
      return state.contactList;
    },
    getStatusLoader(state) {
      return state.loading;
    },
    getStatusModal(state) {
      return state.modalActive;
    },
    getCurrentContactId(state) {
      return state.currentClickedContactId;
    },
    getActionsForModal(state) {
      return state.actionsForModal;
    }
  }

});
