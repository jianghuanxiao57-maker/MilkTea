"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "giftcard",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const giftCards = common_vendor.ref({});
    const currentTab = common_vendor.ref(0);
    const giftCardType = common_vendor.ref(0);
    const myCards = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      giftCards.value = await proxy.$api("giftCards");
    });
    const switchTab = (index) => {
      if (currentTab.value == index)
        return;
      currentTab.value = index;
    };
    const switchGiftCardType = (index) => {
      if (giftCardType.value == index)
        return;
      giftCardType.value = index;
    };
    const handleSwiperItemChange = () => {
      return true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !currentTab.value ? 1 : "",
        b: common_vendor.o(($event) => switchTab(0), "1d"),
        c: currentTab.value ? 1 : "",
        d: common_vendor.o(($event) => switchTab(1), "2d"),
        e: giftCards.value.img,
        f: common_vendor.f(giftCards.value.category_list, (category, index, i0) => {
          return {
            a: common_vendor.t(category.name),
            b: common_vendor.f(category.themesList, (theme, key, i1) => {
              return {
                a: theme.imageUrls,
                b: common_vendor.t(theme.activityName),
                c: key
              };
            }),
            c: index
          };
        }),
        g: common_vendor.o(handleSwiperItemChange, "be"),
        h: !giftCardType.value ? 1 : "",
        i: common_vendor.o(($event) => switchGiftCardType(0), "c6"),
        j: giftCardType.value ? 1 : "",
        k: common_vendor.o(($event) => switchGiftCardType(1), "57"),
        l: !myCards.value.length
      }, !myCards.value.length ? {} : {}, {
        m: !myCards.value.length
      }, !myCards.value.length ? {} : {}, {
        n: giftCardType.value,
        o: common_vendor.o((e) => switchGiftCardType(e.detail.current), "63"),
        p: common_vendor.o(handleSwiperItemChange, "2a"),
        q: currentTab.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a097a116"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/giftcard/giftcard.js.map
