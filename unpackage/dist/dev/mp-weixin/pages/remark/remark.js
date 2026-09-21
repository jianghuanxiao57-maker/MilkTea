"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "remark",
  setup(__props) {
    const remark = common_vendor.ref("");
    const quickInputs = common_vendor.ref([
      "请放门把手上",
      "请放门口",
      "请放前台桌上",
      "如地址封闭管理，请电话与我联系"
    ]);
    common_vendor.onLoad((options) => {
      remark.value = options.remark || "";
    });
    const remarkLength = common_vendor.computed(() => remark.value.length);
    common_vendor.computed(() => remark.value.length > 50);
    const handleQuickInput = (item) => {
      remark.value = remark.value.concat(" ", item);
    };
    const submit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/pay/pay?remark=" + remark.value
      });
    };
    return (_ctx, _cache) => {
      return {
        a: remarkLength.value > 50 ? 1 : "",
        b: remarkLength.value <= 50 ? 1 : "",
        c: remark.value,
        d: common_vendor.o(($event) => remark.value = $event.detail.value, "5c"),
        e: common_vendor.t(remarkLength.value),
        f: remarkLength.value > 50 ? 1 : "",
        g: remarkLength.value <= 50 ? 1 : "",
        h: common_vendor.f(quickInputs.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => handleQuickInput(item), index)
          };
        }),
        i: common_vendor.o(submit, "56")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-68c1c9ae"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/remark/remark.js.map
