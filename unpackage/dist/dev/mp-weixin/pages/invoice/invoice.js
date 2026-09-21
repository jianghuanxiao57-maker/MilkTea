"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  listCell();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "invoice",
  setup(__props) {
    const form = common_vendor.reactive({
      taitou: 0,
      username: "",
      email: "",
      telphone: ""
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          hover: false,
          ["line-left"]: true,
          ["line-right"]: true
        }),
        b: common_vendor.p({
          hover: false,
          ["line-left"]: true,
          ["line-right"]: true
        }),
        c: !form.taitou ? 1 : "",
        d: common_vendor.o(($event) => form.taitou = 0, "16"),
        e: form.taitou ? 1 : "",
        f: common_vendor.o(($event) => form.taitou = 1, "26"),
        g: common_vendor.p({
          hover: false,
          ["line-left"]: true,
          ["line-right"]: true
        }),
        h: form.username,
        i: common_vendor.o(($event) => form.username = $event.detail.value, "61"),
        j: common_vendor.p({
          hover: false,
          ["line-left"]: true,
          ["line-right"]: true
        }),
        k: form.email,
        l: common_vendor.o(($event) => form.email = $event.detail.value, "df"),
        m: common_vendor.p({
          hover: false,
          ["line-left"]: true,
          ["line-right"]: true
        }),
        n: form.telphone,
        o: common_vendor.o(($event) => form.telphone = $event.detail.value, "35"),
        p: common_vendor.p({
          hover: false,
          ["line-left"]: true,
          ["line-right"]: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-173c115b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/invoice/invoice.js.map
