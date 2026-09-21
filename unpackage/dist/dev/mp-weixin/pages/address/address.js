"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (common_vendor.unref(uniSwipeActionItem) + common_vendor.unref(uniSwipeAction))();
}
const uniSwipeAction = () => "../../components/uni-swipe-action/uni-swipe-action.js";
const uniSwipeActionItem = () => "../../components/uni-swipe-action-item/uni-swipe-action-item.js";
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const store = common_vendor.useStore();
    const scene = common_vendor.ref("menu");
    const is_choose = common_vendor.ref(false);
    const swipeOption = common_vendor.ref([
      {
        text: "删除",
        style: {
          backgroundColor: "#D12E32"
        }
      }
    ]);
    const addresses = common_vendor.computed(() => store.state.addresses);
    common_vendor.onLoad((options) => {
      is_choose.value = options.is_choose || false;
      scene.value = options.scene || "menu";
    });
    const add = () => {
      common_vendor.index.navigateTo({
        url: "/pages/address/add"
      });
    };
    const edit = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/address/add?id=" + id
      });
    };
    const handleSwipeClick = (id) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除？",
        success: (res) => {
          if (res.confirm) {
            const index = addresses.value.findIndex((item) => item.id == id);
            const newAddresses = JSON.parse(JSON.stringify(addresses.value));
            newAddresses.splice(index, 1);
            store.commit("SET_ADDRESSES", newAddresses);
            common_vendor.index.showToast({ title: "删除成功！", icon: "success" });
          }
        }
      });
    };
    const chooseAddress = (address) => {
      if (!is_choose.value)
        return;
      store.commit("SET_ADDRESS", address);
      store.commit("SET_ORDER_TYPE", "takeout");
      if (scene.value == "menu") {
        common_vendor.index.switchTab({
          url: "/pages/menu/menu"
        });
      } else if (scene.value == "pay") {
        common_vendor.index.navigateTo({
          url: "/pages/pay/pay"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !addresses.value.length
      }, !addresses.value.length ? {} : {
        b: common_vendor.f(addresses.value, (address, index, i0) => {
          return {
            a: common_vendor.t(address.street),
            b: common_vendor.t(address.accept_name),
            c: common_vendor.t(!address.gender ? "先生" : "女士"),
            d: common_vendor.t(address.mobile),
            e: common_vendor.o(($event) => edit(address.id), index),
            f: common_vendor.o(($event) => chooseAddress(address), index),
            g: common_vendor.o(($event) => handleSwipeClick(address.id), index),
            h: index,
            i: "40ca010a-1-" + i0 + ",40ca010a-0"
          };
        }),
        c: common_assets._imports_0$8,
        d: common_vendor.p({
          options: swipeOption.value
        })
      }, {
        e: common_vendor.o(add, "42")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-40ca010a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/address/address.js.map
