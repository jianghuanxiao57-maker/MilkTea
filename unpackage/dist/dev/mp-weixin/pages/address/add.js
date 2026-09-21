"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const store = common_vendor.useStore();
    const form = common_vendor.reactive({
      accept_name: "",
      sex: 0,
      mobile: "",
      street: "",
      door_number: ""
    });
    common_vendor.onLoad((options) => {
      if (options.id) {
        const address = store.state.addresses.find((item) => item.id == options.id);
        if (address) {
          Object.assign(form, address);
        }
      }
    });
    const save = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: form.accept_name,
        b: common_vendor.o(($event) => form.accept_name = $event.detail.value, "17"),
        c: common_vendor.p({
          hover: false
        }),
        d: !form.sex ? 1 : "",
        e: common_vendor.o(($event) => form.sex = 0, "bb"),
        f: form.sex ? 1 : "",
        g: common_vendor.o(($event) => form.sex = 1, "4c"),
        h: common_vendor.p({
          hover: false
        }),
        i: form.mobile,
        j: common_vendor.o(($event) => form.mobile = $event.detail.value, "6e"),
        k: common_vendor.p({
          hover: false
        }),
        l: form.street,
        m: common_vendor.o(($event) => form.street = $event.detail.value, "fd"),
        n: common_vendor.p({
          hover: false
        }),
        o: form.door_number,
        p: common_vendor.o(($event) => form.door_number = $event.detail.value, "f9"),
        q: common_vendor.p({
          hover: false
        }),
        r: common_vendor.o(save, "04")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ef9226d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/address/add.js.map
