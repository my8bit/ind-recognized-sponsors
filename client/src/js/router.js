export const router = {
  adjust: function (data) {
    return data;
  },
  getQueryString: function (field) {
    const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    const string = reg.exec(window.location.href);
    return string ? string[1] : null;
  },
  pushQuery: function (query, value) {
    history.pushState(null, null, `?${query}=${value}`);
  }
}