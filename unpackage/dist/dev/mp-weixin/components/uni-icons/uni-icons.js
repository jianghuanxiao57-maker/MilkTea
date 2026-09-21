"use strict";
const common_vendor = require("../../common/vendor.js");
const components_uniIcons_icons = require("./icons.js");
const _sfc_main = {
  __name: "uni-icons",
  props: {
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333333"
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const _onClick = () => {
      emit("click");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(components_uniIcons_icons.icons)[__props.type]),
        b: __props.color,
        c: __props.size + "px",
        d: common_vendor.o(_onClick, "19")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f218fb61"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-icons/uni-icons.js.map
