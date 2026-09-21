"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "index",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ""
    },
    tips: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleScoreClick = (index) => {
      emit("update:modelValue", index + 1);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.label),
        b: common_vendor.f(5, (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => handleScoreClick(index), index),
            c: common_vendor.n(__props.modelValue > index ? "iconshoucangfill" : "iconshoucang"),
            d: __props.modelValue <= index || !__props.modelValue ? 1 : __props.modelValue / 5 + 0.1
          };
        }),
        c: common_vendor.t(__props.tips),
        d: common_vendor.p({
          hover: false,
          last: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a54740a6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/review/rate-form-item/index.js.map
