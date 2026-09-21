"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const api_addresses = require("../api/addresses.js");
const store = common_vendor.createStore({
  state() {
    return {
      store: {},
      cart: [],
      orderType: "takein",
      address: {},
      addresses: api_addresses.addresses,
      member: {},
      order: {}
    };
  },
  getters: {
    isLogin: (state) => Object.keys(state.member).length > 0
    //是否登录
  },
  mutations: {
    SET_ORDER_TYPE(state, type) {
      state.orderType = type;
    },
    SET_MEMBER(state, member) {
      state.member = member;
    },
    SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_ADDRESSES(state, addresses) {
      state.addresses = addresses;
    },
    SET_STORE(state, store2) {
      state.store = store2;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    REMOVE_CART(state) {
      state.cart = [];
    },
    SET_ORDER(state, order) {
      state.order = order;
    }
  },
  actions: {
    async getStore({ commit }) {
      const store2 = await api_index.api("store");
      commit("SET_STORE", store2);
    }
  }
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
