let currentQuery = null;
export const router = {
  currentQuery,
  isRecent: function () {
    const state = this.currentQuery === this.getQueryString('search');
    this.currentQuery =  this.getQueryString('search');
    return state;
  }, //TODO fix hardcode
  getQueryString: function (field) {
    const reg = new RegExp(`[?&]${field}=([^&#]*)`,'i');
    const string = reg.exec(window.location.href);
    return string ? string[1] : null;
  },
  getSearchQuery: function () {
    return this.getQueryString('search');
  }, //TODO fix hardcode
  pushQuery: function (query, value) {
    window.history.pushState(null, null, `?${query}=${value}`);
  }
};