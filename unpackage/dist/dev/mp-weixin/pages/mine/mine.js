"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const store = common_vendor.useStore();
    const newIcon = common_vendor.ref("https://img-shop.qmimg.cn/s16/images/2020/05/12/ffb0613dded704b6.png");
    const member = common_vendor.computed(() => store.state.member);
    const isLogin = common_vendor.computed(() => store.getters.isLogin);
    const growthValue = common_vendor.computed(() => {
      if (!isLogin.value)
        return 0;
      const { currentValue, needValue } = member.value;
      return currentValue / (currentValue + needValue) * 100;
    });
    const login = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const balance = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/balance/balance"
      });
    };
    const addresses = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/address/address"
      });
    };
    const integrals = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/integrals/integrals"
      });
    };
    const attendance = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/attendance/attendance"
      });
    };
    const orders = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/orders/orders"
      });
    };
    const memberCode = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mine/member-code"
      });
    };
    const coupons = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/coupons/coupons"
      });
    };
    const userinfo = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mine/userinfo"
      });
    };
    const services = () => {
      common_vendor.index.navigateTo({
        url: "/pages/services/services"
      });
    };
    const giftCards = () => {
      if (!isLogin.value) {
        login();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/giftcard/giftcard"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$4,
        b: common_vendor.o(memberCode, "99"),
        c: isLogin.value ? member.value.avatar : "/static/images/mine/default.png",
        d: isLogin.value
      }, isLogin.value ? {
        e: common_assets._imports_0$3,
        f: common_vendor.t(member.value.memberLevel)
      } : {}, {
        g: isLogin.value
      }, isLogin.value ? {
        h: common_vendor.t(member.value.nickname),
        i: common_vendor.o(userinfo, "3b")
      } : {
        j: common_vendor.o(login, "23")
      }, {
        k: common_vendor.t(isLogin.value ? member.value.currentValue : 0),
        l: common_vendor.t(isLogin.value ? member.value.currentValue + member.value.needValue : 0),
        m: growthValue.value,
        n: common_vendor.t(isLogin.value ? member.value.couponNum : "***"),
        o: common_vendor.o(coupons, "1b"),
        p: common_vendor.t(isLogin.value ? member.value.pointNum : "***"),
        q: common_vendor.o(integrals, "2a"),
        r: common_vendor.t(isLogin.value ? member.value.balance : "***"),
        s: common_vendor.o(balance, "da"),
        t: common_vendor.t(isLogin.value ? member.value.giftBalance : "***"),
        v: common_vendor.o(giftCards, "e6"),
        w: !isLogin.value
      }, !isLogin.value ? {
        x: common_vendor.o(login, "3e"),
        y: common_assets._imports_2$3,
        z: common_assets._imports_3$3,
        A: common_assets._imports_4$2,
        B: common_assets._imports_5$2,
        C: common_assets._imports_6$2
      } : {}, {
        D: common_assets._imports_7$2,
        E: common_assets._imports_8$2,
        F: common_vendor.o(attendance, "c2"),
        G: common_assets._imports_9,
        H: newIcon.value,
        I: common_assets._imports_10,
        J: common_assets._imports_11,
        K: common_assets._imports_12,
        L: common_vendor.o(orders, "ff"),
        M: common_assets._imports_13,
        N: common_vendor.o(userinfo, "e2"),
        O: common_assets._imports_14,
        P: common_vendor.o(addresses, "b3"),
        Q: common_assets._imports_15,
        R: common_vendor.o(services, "dc")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
