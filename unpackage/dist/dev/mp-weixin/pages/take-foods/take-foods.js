"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "take-foods",
  setup(__props) {
    const store = common_vendor.useStore();
    const { proxy } = common_vendor.getCurrentInstance();
    const order = common_vendor.computed(() => store.state.order);
    const formatDateTime = (datetime) => {
      return proxy.$util ? proxy.$util.formatDateTime(datetime) : datetime;
    };
    const orders = () => {
      if (!store.getters.isLogin) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/orders/orders"
      });
    };
    const menu = () => {
      common_vendor.index.switchTab({
        url: "/pages/menu/menu"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !Object.keys(order.value).length
      }, !Object.keys(order.value).length ? {
        b: common_assets._imports_0$2,
        c: common_vendor.o(menu, "eb"),
        d: common_vendor.o(orders, "ef")
      } : common_vendor.e({
        e: common_vendor.t(order.value.store.name),
        f: common_assets._imports_1$2,
        g: common_assets._imports_2$2,
        h: common_vendor.p({
          hover: false
        }),
        i: order.value.typeCate == 1
      }, order.value.typeCate == 1 ? {
        j: common_vendor.t(order.value.sort_num)
      } : {}, {
        k: order.value.status >= 1
      }, order.value.status >= 1 ? {
        l: common_assets._imports_3$2
      } : {
        m: common_assets._imports_3$2
      }, {
        n: order.value.status >= 2
      }, order.value.status >= 2 ? {
        o: common_assets._imports_4$1
      } : {
        p: common_assets._imports_5$1
      }, {
        q: order.value.status >= 2 ? 1 : "",
        r: order.value.typeCate == 2
      }, order.value.typeCate == 2 ? common_vendor.e({
        s: order.value.status >= 3
      }, order.value.status >= 3 ? {
        t: common_assets._imports_6$1
      } : {
        v: common_assets._imports_7$1
      }, {
        w: order.value.status >= 3 ? 1 : ""
      }) : {}, {
        x: order.value.status >= 4
      }, order.value.status >= 4 ? {
        y: common_assets._imports_8$1
      } : {
        z: common_assets._imports_7$1
      }, {
        A: order.value.status >= 4 ? 1 : "",
        B: order.value.status >= 1 ? 1 : "",
        C: order.value.status >= 2 ? 1 : "",
        D: order.value.typeCate == 2
      }, order.value.typeCate == 2 ? {
        E: order.value.status >= 3 ? 1 : ""
      } : {}, {
        F: common_vendor.t(order.value.typeCate == 2 ? "已送达" : "请取餐"),
        G: order.value.status >= 4 ? 1 : "",
        H: order.value.typeCate == 1 ? 1 : "",
        I: order.value.typeCate == 2 ? 1 : "",
        J: order.value.status <= 1
      }, order.value.status <= 1 ? {} : {}, {
        K: common_vendor.f(order.value.goods, (good, index, i0) => {
          return {
            a: common_vendor.t(good.name),
            b: common_vendor.t(good.property),
            c: common_vendor.t(good.number),
            d: common_vendor.t(good.price),
            e: index
          };
        }),
        L: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx"
        }),
        M: common_vendor.t(order.value.pay_mode),
        N: common_vendor.t(order.value.amount),
        O: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx"
        }),
        P: common_vendor.t(formatDateTime(order.value.created_at)),
        Q: common_vendor.t(order.value.store.name),
        R: common_vendor.t(order.value.pay_mode),
        S: common_vendor.t(order.value.order_no),
        T: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx"
        }),
        U: common_vendor.t(order.value.sort_num),
        V: common_vendor.t(order.value.productioned_time),
        W: common_vendor.t(order.value.postscript),
        X: common_vendor.p({
          hover: false,
          padding: "50rpx 30rpx 20rpx",
          last: true
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63e67725"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/take-foods/take-foods.js.map
