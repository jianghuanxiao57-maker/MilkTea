"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_uqrcode = require("../../common/uqrcode.js");
const _sfc_main = {
  __name: "member-code",
  setup(__props) {
    const store = common_vendor.useStore();
    const instance = common_vendor.getCurrentInstance();
    const member = common_vendor.computed(() => store.state.member);
    const makeMemberCode = (i) => {
      common_uqrcode.uQRCode.make({
        canvasId: "memberCode",
        componentInstance: instance,
        text: `memberCode${i}`,
        size: common_vendor.index.upx2px(350),
        margin: 20,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        correctLevel: common_uqrcode.uQRCode.defaults.correctLevel,
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/mine/member-code.vue:80", res);
        }
      });
    };
    common_vendor.onShow(() => {
      let i = 1;
      makeMemberCode(i);
      setInterval(() => {
        i++;
        makeMemberCode(i);
      }, 3e4);
    });
    const integrals = () => {
      common_vendor.index.navigateTo({
        url: "/pages/integrals/integrals"
      });
    };
    const balance = () => {
      common_vendor.index.navigateTo({
        url: "/pages/balance/balance"
      });
    };
    const coupons = () => {
      common_vendor.index.navigateTo({
        url: "/pages/coupons/coupons"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: member.value.avatar,
        b: common_assets._imports_0$3,
        c: common_vendor.t(member.value.memberLevel),
        d: common_vendor.t(member.value.nickname),
        e: common_vendor.t(member.value.couponNum),
        f: common_vendor.o(coupons, "6e"),
        g: common_vendor.t(member.value.pointNum),
        h: common_vendor.o(integrals, "23"),
        i: common_vendor.t(member.value.balance),
        j: common_vendor.o(balance, "de"),
        k: common_vendor.t(member.value.giftBalance),
        l: common_assets._imports_1$4
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4648e08"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/member-code.js.map
