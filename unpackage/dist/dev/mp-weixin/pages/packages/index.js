"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(loading)();
}
const loading = () => "../../components/loading.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const loadingState = common_vendor.ref(true);
    const packages = common_vendor.ref([]);
    const getPackages = async () => {
      loadingState.value = true;
      packages.value = await proxy.$api("packages");
      loadingState.value = false;
    };
    const pay = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/packages/detail?id=" + id
      });
    };
    common_vendor.onLoad(async () => {
      await getPackages();
    });
    common_vendor.onPullDownRefresh(async () => {
      await getPackages();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(loading)
      }, !common_vendor.unref(loading) ? {
        b: common_vendor.f(packages.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.amount),
            d: index,
            e: common_vendor.o(($event) => pay(item.id), index)
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-95e97d53"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/packages/index.js.map
