"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (common_vendor.unref(jyfParser) + common_vendor.unref(modal))();
}
const modal = () => "../../components/modal/modal.js";
const jyfParser = () => "../../components/jyf-parser/jyf-parser.js";
const _sfc_main = {
  __name: "coupons",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const couponExplainRef = common_vendor.ref(null);
    const tabs = common_vendor.ref([
      { title: "全部", value: "all" },
      { title: "茶饮券", value: "1" },
      { title: "酒屋券", value: "2" }
    ]);
    const activeTabIndex = common_vendor.ref("");
    const coupons = common_vendor.ref([]);
    const detailModalVisible = common_vendor.ref(false);
    const coupon = common_vendor.ref({});
    const handleTab = (index) => {
      activeTabIndex.value = index;
    };
    const getCoupons = async (type) => {
      const couponList = await proxy.$api("customerCoupons");
      if (type == "all") {
        coupons.value = couponList;
      } else {
        coupons.value = couponList.filter((item) => item.couponType == type);
      }
    };
    const openDetailModal = (couponItem) => {
      coupon.value = couponItem;
      if (couponExplainRef.value) {
        couponExplainRef.value.setContent(coupon.value.couponExplain || "");
      }
      detailModalVisible.value = true;
    };
    const closeDetailModal = () => {
      detailModalVisible.value = false;
      coupon.value = {};
    };
    const useCoupon = () => {
      common_vendor.index.switchTab({
        url: "/pages/menu/menu"
      });
    };
    const showTip1 = () => {
      common_vendor.index.showToast({
        title: "您暂时还没有赠送中卡券哦~",
        icon: "none"
      });
    };
    const showTip2 = () => {
      common_vendor.index.showToast({
        title: "您暂时还没有券码哦~",
        icon: "none"
      });
    };
    common_vendor.watch(activeTabIndex, async (val) => {
      const type = tabs.value[val].value;
      await getCoupons(type);
    });
    common_vendor.onShow(() => {
      activeTabIndex.value = 0;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: activeTabIndex.value == index ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => handleTab(index), index)
          };
        }),
        b: common_vendor.f(coupons.value, (item, index, i0) => {
          return {
            a: item.imageUrl,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.endAt),
            d: index,
            e: common_vendor.o(($event) => openDetailModal(item), index)
          };
        }),
        c: common_vendor.o(showTip1, "14"),
        d: common_vendor.o(showTip2, "17"),
        e: common_vendor.t(coupon.value.title),
        f: common_vendor.t(coupon.value.beginAt),
        g: common_vendor.t(coupon.value.endAt),
        h: common_vendor.sr(couponExplainRef, "8d9323cd-1,8d9323cd-0", {
          "k": "couponExplainRef"
        }),
        i: common_vendor.o(useCoupon, "3e"),
        j: common_vendor.o(closeDetailModal, "8e"),
        k: common_vendor.p({
          custom: true,
          show: detailModalVisible.value,
          width: "90%"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8d9323cd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/coupons/coupons.js.map
