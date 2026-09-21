"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "navbar-back-button",
  setup(__props) {
    const height = common_vendor.ref(0);
    const left = common_vendor.ref(0);
    const top = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      const menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
      const systemInfo = common_vendor.index.getSystemInfoSync();
      top.value = menuButton.top;
      left.value = systemInfo.windowWidth - menuButton.right;
      height.value = menuButton.height;
    });
    const click = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$14,
        b: height.value + "px",
        c: height.value + "px",
        d: height.value + "px",
        e: top.value + "px",
        f: left.value + "px",
        g: common_vendor.o(click, "c4")
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/navbar-back-button.js.map
