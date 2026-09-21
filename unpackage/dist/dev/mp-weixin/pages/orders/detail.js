"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_orders = require("../../api/orders.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const order = common_vendor.ref({});
    const formatDateTime = (datetime) => {
      return proxy.$util ? proxy.$util.formatDateTime(datetime) : datetime;
    };
    const review = () => {
      const date = order.value.completed_time.split(" ")[0];
      common_vendor.index.navigateTo({
        url: "/pages/review/review?storename=" + order.value.store.name + "&typeCate=" + order.value.typeCate + "&date=" + date
      });
    };
    const goToInvoice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/invoice/invoice"
      });
    };
    common_vendor.onLoad(({ id }) => {
      order.value = api_orders.Orders.find((item) => item.id == id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(order.value.store.name),
        b: common_assets._imports_0$1,
        c: common_vendor.t(order.value.store.address),
        d: common_assets._imports_1$2,
        e: common_assets._imports_2$2,
        f: common_vendor.p({
          hover: false
        }),
        g: common_vendor.f(order.value.goods, (good, index, i0) => {
          return {
            a: common_vendor.t(good.name),
            b: common_vendor.t(good.property),
            c: common_vendor.t(good.number),
            d: common_vendor.t(good.price),
            e: index
          };
        }),
        h: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx"
        }),
        i: common_vendor.t(order.value.pay_mode),
        j: common_vendor.t(order.value.amount),
        k: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx"
        }),
        l: common_vendor.t(formatDateTime(order.value.created_at)),
        m: common_vendor.t(order.value.store.name),
        n: common_vendor.t(order.value.pay_mode),
        o: common_vendor.t(order.value.order_no),
        p: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx"
        }),
        q: common_vendor.t(order.value.sort_num),
        r: common_vendor.t(order.value.productioned_time),
        s: common_vendor.t(order.value.postscript),
        t: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx 20rpx",
          last: true
        }),
        v: common_assets._imports_3$4,
        w: !order.value.invoice_status
      }, !order.value.invoice_status ? {
        x: common_vendor.o(goToInvoice, "62"),
        y: common_assets._imports_4$3
      } : {}, {
        z: order.value.invoice_status > 0
      }, order.value.invoice_status > 0 ? {} : {}, {
        A: common_vendor.o(review, "1b")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc4602bd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orders/detail.js.map
