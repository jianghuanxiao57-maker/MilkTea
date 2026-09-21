"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(modal)();
}
const modal = () => "../../components/modal/modal.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const packageData = common_vendor.ref({
      start_at: "",
      end_at: ""
    });
    const coupon = common_vendor.ref({
      detail: {}
    });
    const couponDetailModalShow = common_vendor.ref(false);
    const couponNum = common_vendor.computed(() => {
      return packageData.value.coupons && packageData.value.coupons.reduce((acc, c) => acc + c.coupon_num, 0);
    });
    const openCouponDetailModal = (couponItem) => {
      coupon.value = couponItem;
      couponDetailModalShow.value = true;
    };
    const closeCouponDetailModal = () => {
      couponDetailModalShow.value = false;
    };
    common_vendor.onLoad(async (option) => {
      const packages = await proxy.$api("packages");
      packageData.value = packages.filter((item) => item.id == option.id)[0];
    });
    return (_ctx, _cache) => {
      return {
        a: packageData.value.image,
        b: common_vendor.t(packageData.value.title),
        c: common_vendor.t(couponNum.value),
        d: common_vendor.f(packageData.value.coupons, (couponItem, index, i0) => {
          return {
            a: couponItem.detail.image,
            b: common_vendor.t(couponItem.coupon_num),
            c: common_vendor.t(couponItem.detail.coupon_title),
            d: common_vendor.t(couponItem.detail.expire),
            e: common_vendor.t(couponItem.detail && couponItem.detail.coupon_use_time[0].use_time_start),
            f: common_vendor.t(couponItem.detail && couponItem.detail.coupon_use_time[0].use_time_end),
            g: index,
            h: common_vendor.o(($event) => openCouponDetailModal(couponItem), index)
          };
        }),
        e: common_vendor.t(packageData.value.start_at.split(" ")[0]),
        f: common_vendor.t(packageData.value.end_at.split(" ")[0]),
        g: common_vendor.t(packageData.value.content),
        h: common_vendor.t(packageData.value.amount),
        i: common_vendor.t(coupon.value.detail.coupon_title),
        j: common_vendor.t(coupon.value.detail.expire),
        k: common_vendor.t(coupon.value.detail.desc),
        l: common_vendor.o(closeCouponDetailModal, "e9"),
        m: common_vendor.p({
          custom: true,
          show: couponDetailModalShow.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/packages/detail.js.map
