"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_member = require("../../api/member.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const store = common_vendor.useStore();
    const getUserInfo = (e) => {
      const { errMsg, userInfo } = e.detail;
      if (errMsg !== "getUserInfo:ok") {
        common_vendor.index.showModal({
          title: "提示",
          content: "您取消了授权登录，请重新授权",
          showCancel: false
        });
        store.commit("SET_MEMBER", api_member.Member);
        common_vendor.index.navigateBack();
        return;
      } else {
        const { avatarUrl: avatar, city, country, gender, nickName: nickname, province } = userInfo;
        const member = Object.assign(api_member.Member, { avatar, city, country, gender, nickname, province });
        store.commit("SET_MEMBER", member);
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$7,
        b: common_assets._imports_1$4,
        c: common_vendor.o(getUserInfo, "d3"),
        d: common_assets._imports_2$3,
        e: common_assets._imports_3$3,
        f: common_assets._imports_4$2,
        g: common_assets._imports_5$2,
        h: common_assets._imports_6$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
