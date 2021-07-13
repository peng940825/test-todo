export default {
  install(Vue) {
    Vue.prototype.$getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
    Vue.prototype.$setLocalStorage = (key, value) =>
      localStorage.setItem(key, JSON.stringify(value));
  },
};
