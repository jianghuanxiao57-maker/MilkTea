"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_orders = require("../../api/orders.js");
if (!Math) {
  (common_vendor.unref(listCell) + common_vendor.unref(modal))();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const modal = () => "../../components/modal/modal.js";
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    const store = common_vendor.useStore();
    const cart = common_vendor.ref([]);
    const form = common_vendor.reactive({
      remark: ""
    });
    const ensureAddressModalVisible = common_vendor.ref(false);
    const orderType = common_vendor.computed(() => store.state.orderType);
    const address = common_vendor.computed(() => store.state.address);
    const storeInfo = common_vendor.computed(() => store.state.store);
    const total = common_vendor.computed(() => {
      return cart.value.reduce((acc, cur) => acc + cur.number * cur.price, 0);
    });
    const amount = common_vendor.computed(() => {
      return cart.value.reduce((acc, cur) => acc + cur.number * cur.price, 0);
    });
    const goToRemark = () => {
      common_vendor.index.navigateTo({
        url: "/pages/remark/remark?remark=" + form.remark
      });
    };
    const chooseAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pages/address/address?is_choose=true&scene=pay"
      });
    };
    const goToPackages = () => {
      common_vendor.index.navigateTo({
        url: "/pages/packages/index"
      });
    };
    const submit = () => {
      if (orderType.value == "takeout") {
        ensureAddressModalVisible.value = true;
      } else {
        pay();
      }
    };
    const pay = () => {
      common_vendor.index.showLoading({ title: "加载中" });
      let order = orderType.value == "takein" ? api_orders.Orders[0] : api_orders.Orders[1];
      order = Object.assign(order, { status: 1 });
      store.commit("SET_ORDER", order);
      common_vendor.index.removeStorageSync("cart");
      common_vendor.index.reLaunch({
        url: "/pages/take-foods/take-foods"
      });
      common_vendor.index.hideLoading();
    };
    common_vendor.onLoad((option) => {
      const { remark } = option;
      cart.value = common_vendor.index.getStorageSync("cart");
      if (remark) {
        form.remark = remark;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: orderType.value == "takein"
      }, orderType.value == "takein" ? {
        b: common_vendor.t(storeInfo.value.name),
        c: common_assets._imports_0$5
      } : {
        d: common_vendor.t(address.value.street),
        e: common_assets._imports_0$5,
        f: common_vendor.t(address.value.accept_name),
        g: common_vendor.t(!address.value.sex ? "先生" : "女士"),
        h: common_vendor.t(address.value.mobile),
        i: common_vendor.o(chooseAddress, "2b")
      }, {
        j: orderType.value == "takein"
      }, orderType.value == "takein" ? {
        k: common_vendor.p({
          arrow: true
        }),
        l: common_vendor.p({
          last: true,
          hover: false
        })
      } : {
        m: common_assets._imports_0$5
      }, {
        n: common_vendor.f(cart.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.number),
            c: common_vendor.t(item.price),
            d: common_vendor.t(item.props_text),
            e: index,
            f: "3a7adb9e-5-" + i0
          };
        }),
        o: common_vendor.p({
          last: true
        }),
        p: orderType.value == "takeout"
      }, orderType.value == "takeout" ? common_vendor.e({
        q: storeInfo.value.packing_fee > 0
      }, storeInfo.value.packing_fee > 0 ? {
        r: common_vendor.t(parseFloat(storeInfo.value.packing_fee)),
        s: common_vendor.p({
          last: true
        })
      } : {}, {
        t: storeInfo.value.delivery_cost > 0
      }, storeInfo.value.delivery_cost > 0 ? {
        v: common_vendor.t(parseFloat(storeInfo.value.delivery_cost)),
        w: common_vendor.p({
          last: true
        })
      } : {}) : {}, {
        x: common_vendor.o(goToPackages, "5b"),
        y: common_vendor.p({
          arrow: true
        }),
        z: common_vendor.p({
          arrow: true
        }),
        A: common_vendor.t(total.value),
        B: common_vendor.t(amount.value),
        C: common_vendor.p({
          last: true
        }),
        D: common_vendor.p({
          last: true,
          hover: false
        }),
        E: common_vendor.p({
          last: true
        }),
        F: common_vendor.t(form.remark || "点击填写备注"),
        G: common_vendor.o(goToRemark, "16"),
        H: common_vendor.p({
          arrow: true,
          last: true
        }),
        I: common_vendor.t(amount.value),
        J: common_vendor.o(submit, "39"),
        K: common_assets._imports_1$3,
        L: common_vendor.o(($event) => ensureAddressModalVisible.value = false, "c4"),
        M: common_vendor.t(address.value.accept_name),
        N: common_vendor.t(address.value.sex ? "女士" : "先生"),
        O: common_vendor.t(address.value.mobile),
        P: common_vendor.t(address.value.street + address.value.door_number),
        Q: common_vendor.o(pay, "22"),
        R: common_vendor.p({
          show: ensureAddressModalVisible.value,
          custom: true,
          ["mask-closable"]: false,
          radius: "0",
          width: "90%"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3a7adb9e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pay/pay.js.map
