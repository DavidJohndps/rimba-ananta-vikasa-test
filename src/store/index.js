import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      discount: [
        {
          id: 1,
          isPercentage: false,
          amount: 10000,
          name: "Diskon 10.000",
        },
        {
          id: 2,
          isPercentage: true,
          amount: 10,
          name: "Diskon 10%",
        },
      ],
    },
    shoppingCart: [],
    products: [],
    transactions: [],
  },
  getters: {
    getCredentials: (state) => state.user,
    getShoppingCart: (state) => state.shoppingCart,
    getProducts: (state) => state.products,
    getTransactions: (state) => state.transactions,
  },
  mutations: {
    updateCredential: (state, payload) => {
      Object.keys(payload).map((key) => {
        state.user[key] = payload[key];
      });
    },
    removeCredential: (state) => {
      Object.keys(state.credential).map(
        (key) => (state.credential[key] = null)
      );
    },
    addCartItem: (state, payload) => {
      const { product, qty: addQty } = payload;
      const index = state.shoppingCart.findIndex(
        (item) => item.product.id == product.id
      );
      if (index != -1) {
        const itemInCart = state.shoppingCart[index];
        const totalQty = itemInCart.qty + addQty;
        totalQty >= state.shoppingCart
          ? (itemInCart.qty = itemInCart.product.stock)
          : (itemInCart.qty += addQty);
      } else state.shoppingCart.push({ product, qty: addQty });
    },
    removeCartItem: (state, payload) => {
      const { id } = payload.product;
      state.shoppingCart = state.shoppingCart.filter((item) => item.product.id != id);
    },
    emptyCartItem: (state) => (state.shoppingCart = []),
    addProduct: (state, payload) => {
      for (var item of payload) {
        // console.log(item)
        const isExist = state.products.findIndex(
          (product) => product.id == item.id
        );
        if (isExist == -1) state.products.push(item);
      }
    },
    updateProduct: (state, payload) => {
      const index = state.products.findIndex(
        (product) => product.id == payload[0].id
      );
      if (index != -1) {
        Object.keys(state.products[index]).map(
          (key) => (state.products[index][key] = payload[0][key])
        );
      }
    },
    deleteProduct: (state, payload) => {
      state.products = state.products.filter(
        (product) => product.id != payload.id
      );
    },
    addTransaction: (state, payload) => {
      for (var item of payload) {
        const isExist = state.transactions.findIndex(
          (transaction) => transaction.id == item.id
        );
        if (isExist == -1) state.transactions.push(item);
      }
    },
  },
  actions: {},
  modules: {},
});
