"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "services",
  setup(__props) {
    const helpCenter = () => {
      common_vendor.index.navigateTo({
        url: "/pages/services/help-center"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$12,
        b: common_assets._imports_0$5,
        c: common_vendor.o(helpCenter, "0d"),
        d: common_assets._imports_2$5,
        e: common_assets._imports_0$5,
        f: common_assets._imports_3$5,
        g: common_assets._imports_0$5
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/services/services.js.map
