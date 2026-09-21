"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const member = common_vendor.computed(() => store.state.member);
    const isLogin = common_vendor.computed(() => store.getters.isLogin);
    const takein = () => {
      store.commit("SET_ORDER_TYPE", "takein");
      common_vendor.index.switchTab({
        url: "/pages/menu/menu"
      });
    };
    const takeout = () => {
      if (!isLogin.value) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/address/address?is_choose=true"
      });
    };
    const integrals = () => {
      if (!isLogin.value) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/integrals/integrals"
      });
    };
    const packages = () => {
      common_vendor.index.navigateTo({
        url: "/pages/packages/index"
      });
    };
    const memberCode = () => {
      if (!isLogin.value) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mine/member-code"
      });
    };
    const invite = () => {
      common_vendor.index.navigateTo({
        url: "/pages/activities/invite"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(isLogin.value ? member.value.nickname : "游客"),
        b: common_assets._imports_0,
        c: common_vendor.o(takein, "a5"),
        d: common_assets._imports_1,
        e: common_vendor.o(takeout, "2a"),
        f: common_vendor.o(integrals, "27"),
        g: common_assets._imports_2,
        h: common_vendor.o(memberCode, "72"),
        i: common_assets._imports_3,
        j: common_assets._imports_4,
        k: common_assets._imports_5,
        l: common_assets._imports_6,
        m: common_vendor.o(invite, "b9"),
        n: common_assets._imports_7,
        o: common_assets._imports_8,
        p: common_vendor.o(packages, "49")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
