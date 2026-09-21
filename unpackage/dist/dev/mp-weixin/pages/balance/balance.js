"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "balance",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const agree = common_vendor.ref(false);
    const amounts = common_vendor.ref([]);
    common_vendor.onLoad(async () => {
      amounts.value = await proxy.$api("rechargeCards");
    });
    const rechargeCard = common_vendor.computed(() => {
      return amounts.value.find((item) => item.selected) || "";
    });
    const handleSelected = (index) => {
      amounts.value.forEach((item) => item.selected = false);
      amounts.value[index].selected = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$6,
        b: common_vendor.f(amounts.value, (item, index, i0) => {
          return {
            a: common_vendor.t(parseInt(item.value)),
            b: item.selected ? 1 : "",
            c: !item.selected ? 1 : "",
            d: index,
            e: common_vendor.o(($event) => handleSelected(index), index)
          };
        }),
        c: rechargeCard.value
      }, rechargeCard.value ? {
        d: common_vendor.t(rechargeCard.value.desc)
      } : {}, {
        e: common_vendor.o(($event) => agree.value = !agree.value, "69"),
        f: agree.value ? 1 : "",
        g: !agree.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-81f3da6b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/balance/balance.js.map
