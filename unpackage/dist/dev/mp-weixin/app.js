"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
const api_index = require("./api/index.js");
const common_util = require("./common/util.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/menu/menu.js";
  "./pages/take-foods/take-foods.js";
  "./pages/mine/mine.js";
  "./pages/pay/pay.js";
  "./pages/remark/remark.js";
  "./pages/packages/index.js";
  "./pages/packages/detail.js";
  "./pages/balance/balance.js";
  "./pages/login/login.js";
  "./pages/address/address.js";
  "./pages/address/add.js";
  "./pages/integrals/integrals.js";
  "./pages/attendance/attendance.js";
  "./pages/orders/orders.js";
  "./pages/orders/detail.js";
  "./pages/mine/member-code.js";
  "./pages/coupons/coupons.js";
  "./pages/mine/userinfo.js";
  "./pages/integrals/flow.js";
  "./pages/integrals/detail.js";
  "./pages/review/review.js";
  "./pages/activities/invite.js";
  "./pages/services/services.js";
  "./pages/invoice/invoice.js";
  "./pages/services/help-center.js";
  "./pages/giftcard/giftcard.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      common_vendor.index.__f__("log", "at App.vue:5", "App Launch");
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at App.vue:9", "App Show");
    });
    common_vendor.onHide(() => {
      common_vendor.index.__f__("log", "at App.vue:13", "App Hide");
    });
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(store_index.store);
  app.config.globalProperties.$api = api_index.api;
  app.config.globalProperties.$util = common_util.util;
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
