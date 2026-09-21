"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "orders",
  setup(__props) {
    const store = common_vendor.useStore();
    const { proxy } = common_vendor.getCurrentInstance();
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    const orderList = common_vendor.ref([]);
    const orderGoodsName = (goods) => {
      let arr = [];
      goods.forEach((good) => arr.push(good.name + "*" + good.number));
      return arr.join("，");
    };
    const formatDateTime = (datetime) => {
      return proxy.$util ? proxy.$util.formatDateTime(datetime) : datetime;
    };
    const getOrders = async (isRefresh = false) => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      let orders = await proxy.$api("orders");
      if (isRefresh) {
        orderList.value = [];
        page.value = 1;
      }
      orders = orders.slice(pageSize.value * (page.value - 1), pageSize.value * page.value);
      if (orders.length) {
        orderList.value = orderList.value.concat(orders);
        page.value += 1;
      }
      common_vendor.index.hideLoading();
    };
    const detail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/orders/detail?id=" + id
      });
    };
    const review = (order) => {
      const date = order.completed_time.split(" ")[0];
      common_vendor.index.navigateTo({
        url: "/pages/review/review?storename=" + order.store.name + "&typeCate=" + order.typeCate + "&date=" + date
      });
    };
    const goToInvoice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/invoice/invoice"
      });
    };
    common_vendor.onLoad(async () => {
      if (!store.getters.isLogin) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
      }
      await getOrders(false);
    });
    common_vendor.onReachBottom(async () => {
      await getOrders(false);
    });
    common_vendor.onPullDownRefresh(async () => {
      await getOrders(true);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orderList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.store.name),
            b: common_vendor.t(item.order_no),
            c: common_vendor.t(item.status_text),
            d: "ee8dbcec-0-" + i0,
            e: common_vendor.t(orderGoodsName(item.goods)),
            f: common_vendor.t(formatDateTime(item.created_at)),
            g: common_vendor.t(item.goods_num),
            h: common_vendor.t(item.amount),
            i: item.invoice_status > 0
          }, item.invoice_status > 0 ? {} : {
            j: common_vendor.o(goToInvoice, index)
          }, {
            k: common_vendor.o(($event) => review(item), index),
            l: "ee8dbcec-1-" + i0,
            m: index,
            n: common_vendor.o(($event) => detail(item.id), index)
          });
        }),
        b: common_vendor.p({
          hover: false
        }),
        c: common_vendor.p({
          hover: false,
          last: true
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/orders/orders.js.map
