"use strict";
const components_uniSwipeActionItem_mpwxs = require("./mpwxs.js");
const common_vendor = require("../../common/vendor.js");
const block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("closeSwipe", "change");
};
const _sfc_main = {
  mixins: [components_uniSwipeActionItem_mpwxs.mpwxs],
  props: {
    /**
     * 按钮内容
     */
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 变量控制开关
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * 是否自动关闭
     */
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  inject: ["swipeaction"]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.options, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.style && item.style.color ? item.style.color : "#FFFFFF",
        c: index,
        d: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD",
        e: item.style && item.style.fontSize ? item.style.fontSize : "16px",
        f: common_vendor.o(($event) => _ctx.onClick(index, item), index)
      };
    }),
    b: _ctx.btn,
    c: $props.disabled,
    d: _ctx.pos,
    e: _ctx.pos,
    f: common_vendor.o((...args) => _ctx.change && _ctx.change(...args), "55")
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3ebdcd95"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-swipe-action-item/uni-swipe-action-item.js.map
