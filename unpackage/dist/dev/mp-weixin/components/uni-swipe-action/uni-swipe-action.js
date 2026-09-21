"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "uni-swipe-action",
  setup(__props) {
    const children = common_vendor.ref([]);
    common_vendor.provide("swipeaction", {
      children,
      closeOther
    });
    function closeOther(vm) {
      children.value.forEach((item, index) => {
        if (vm === item)
          return;
        let position = item.position[0];
        let show = position.show;
        if (show) {
          position.show = false;
        }
      });
    }
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-swipe-action/uni-swipe-action.js.map
