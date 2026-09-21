"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  uniIcons();
}
const uniIcons = () => "../uni-icons/uni-icons.js";
const _sfc_main = {
  __name: "uni-steps",
  props: {
    direction: {
      // 排列方向 row column
      type: String,
      default: "row"
    },
    activeColor: {
      // 激活状态颜色
      type: String,
      default: "#FAB714"
    },
    deactiveColor: {
      // 未激活状态颜色
      type: String,
      default: "#cccccc"
    },
    active: {
      // 当前步骤
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default: () => []
    },
    // 数据
    last: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.options, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index <= __props.active ? __props.activeColor : __props.deactiveColor,
            c: index
          };
        }),
        b: common_vendor.n(__props.direction === "column" ? "uni-steps__column-title" : "uni-steps__row-title"),
        c: common_vendor.n(__props.direction === "column" ? "uni-steps__column-text" : "uni-steps__row-text"),
        d: common_vendor.n(__props.direction === "column" ? "uni-steps__column-text-container" : "uni-steps__row-text-container"),
        e: common_vendor.f(__props.options, (item, index, i0) => {
          return common_vendor.e({
            a: index <= __props.active && index !== 0 ? __props.activeColor : index === 0 ? "transparent" : __props.deactiveColor,
            b: item.circle
          }, item.circle ? {
            c: item.circle,
            d: common_vendor.s(item.circleStyle)
          } : common_vendor.e({
            e: index === __props.active
          }, index === __props.active ? {
            f: "9212b55c-0-" + i0,
            g: common_vendor.p({
              color: __props.activeColor,
              type: "checkbox-filled",
              size: "14"
            }),
            h: common_vendor.n(__props.direction === "column" ? "uni-steps__column-check" : "uni-steps__row-check")
          } : {
            i: common_vendor.n(__props.direction === "column" ? "uni-steps__column-circle" : "uni-steps__row-circle"),
            j: index < __props.active ? __props.activeColor : __props.deactiveColor
          }), {
            k: index < __props.active && index !== __props.options.length - 1 ? __props.activeColor : index === __props.options.length - 1 ? "transparent" : __props.deactiveColor,
            l: index
          });
        }),
        f: common_vendor.n(__props.direction === "column" ? "uni-steps__column-line" : "uni-steps__row-line"),
        g: common_vendor.n(__props.direction === "column" ? "uni-steps__column-line--before" : "uni-steps__row-line--before"),
        h: common_vendor.n(__props.direction === "column" ? "uni-steps__column-line" : "uni-steps__row-line"),
        i: common_vendor.n(__props.direction === "column" ? "uni-steps__column-line--after" : "uni-steps__row-line--after"),
        j: common_vendor.n(__props.direction === "column" ? "uni-steps__column-line-item" : "uni-steps__row-line-item"),
        k: common_vendor.n(__props.direction === "column" ? "uni-steps__column-container" : "uni-steps__row-container"),
        l: common_vendor.f(__props.options, (item, index, i0) => {
          return {
            a: common_vendor.t(item.desc),
            b: index <= __props.active ? __props.activeColor : __props.deactiveColor,
            c: index
          };
        }),
        m: common_vendor.n(__props.direction === "column" ? "uni-steps__column-desc" : "uni-steps__row-desc"),
        n: common_vendor.n(__props.direction === "column" ? "uni-steps__column-text" : "uni-steps__row-text"),
        o: common_vendor.n(__props.direction === "column" ? "uni-steps__column-text-container" : "uni-steps__row-text-container"),
        p: common_vendor.n(__props.direction === "column" ? "uni-steps__column" : "uni-steps__row")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9212b55c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-steps/uni-steps.js.map
