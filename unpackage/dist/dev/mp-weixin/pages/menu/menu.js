"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (common_vendor.unref(modal) + common_vendor.unref(popupLayer))();
}
const modal = () => "../../components/modal/modal.js";
const popupLayer = () => "../../components/popup-layer/popup-layer.js";
const _sfc_main = {
  __name: "menu",
  setup(__props) {
    const store = common_vendor.useStore();
    const { proxy } = common_vendor.getCurrentInstance();
    const goods = common_vendor.ref([]);
    const ads = common_vendor.ref([
      { image: "https://img-shop.qmimg.cn/s23107/2020/04/27/4ebdb582a5185358c4.jpg?imageView2/2/w/600/h/600" },
      { image: "https://images.qmai.cn/s23107/2020/05/08/c25de6ef72d2890630.png?imageView2/2/w/600/h/600" },
      { image: "https://img-shop.qmimg.cn/s23107/2020/04/10/add546c1b1561f880d.jpg?imageView2/2/w/600/h/600" },
      { image: "https://images.qmai.cn/s23107/2020/04/30/b3af19e0de8ed42f61.jpg?imageView2/2/w/600/h/600" },
      { image: "https://img-shop.qmimg.cn/s23107/2020/04/17/8aeb78516d63864420.jpg?imageView2/2/w/600/h/600" }
    ]);
    const loading = common_vendor.ref(true);
    const currentCateId = common_vendor.ref(6905);
    const cateScrollTop = common_vendor.ref(0);
    const menuScrollIntoView = common_vendor.ref("");
    const cart = common_vendor.ref([]);
    const goodDetailModalVisible = common_vendor.ref(false);
    const good = common_vendor.ref({});
    const category = common_vendor.ref({});
    const cartPopupVisible = common_vendor.ref(false);
    const sizeCalcState = common_vendor.ref(false);
    const orderType = common_vendor.computed(() => store.state.orderType);
    const address = common_vendor.computed(() => store.state.address);
    const storeInfo = common_vendor.computed(() => store.state.store);
    const isLogin = common_vendor.computed(() => store.getters.isLogin);
    const goodCartNum = (id) => {
      return cart.value.reduce((acc, cur) => {
        if (cur.id === id) {
          return acc += cur.number;
        }
        return acc;
      }, 0);
    };
    const menuCartNum = (id) => {
      return cart.value.reduce((acc, cur) => {
        if (cur.cate_id === id) {
          return acc += cur.number;
        }
        return acc;
      }, 0);
    };
    const getCartGoodsNumber = common_vendor.computed(() => {
      return cart.value.reduce((acc, cur) => acc + cur.number, 0);
    });
    const getCartGoodsPrice = common_vendor.computed(() => {
      return cart.value.reduce((acc, cur) => acc + cur.number * cur.price, 0);
    });
    const disabledPay = common_vendor.computed(() => {
      return orderType.value == "takeout" && getCartGoodsPrice.value < storeInfo.value.min_price ? true : false;
    });
    const spread = common_vendor.computed(() => {
      if (orderType.value != "takeout")
        return;
      return parseFloat((storeInfo.value.min_price - getCartGoodsPrice.value).toFixed(2));
    });
    const setOrderType = (type) => {
      store.commit("SET_ORDER_TYPE", type);
    };
    const getStore = () => {
      return store.dispatch("getStore");
    };
    const init = async () => {
      loading.value = true;
      await getStore();
      goods.value = await proxy.$api("goods");
      loading.value = false;
      cart.value = common_vendor.index.getStorageSync("cart") || [];
    };
    const takout = () => {
      if (orderType.value == "takeout")
        return;
      if (!isLogin.value) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/address/address?is_choose=true"
      });
    };
    const handleMenuTap = (id) => {
      if (!sizeCalcState.value) {
        calcSize();
      }
      currentCateId.value = id;
      common_vendor.nextTick$1(() => {
        const item = goods.value.find((item2) => item2.id == id);
        if (item) {
          cateScrollTop.value = item.top;
        }
      });
    };
    const handleGoodsScroll = ({ detail }) => {
      if (!sizeCalcState.value) {
        calcSize();
      }
      const { scrollTop } = detail;
      let tabs = goods.value.filter((item) => item.top <= scrollTop).reverse();
      if (tabs.length > 0) {
        currentCateId.value = tabs[0].id;
      }
    };
    const calcSize = () => {
      let h = 10;
      let view = common_vendor.index.createSelectorQuery().select("#ads");
      view.fields({
        size: true
      }, (data) => {
        h += Math.floor(data.height);
      }).exec();
      goods.value.forEach((item) => {
        let view2 = common_vendor.index.createSelectorQuery().select(`#cate-${item.id}`);
        view2.fields({
          size: true
        }, (data) => {
          item.top = h;
          h += data.height;
          item.bottom = h;
        }).exec();
      });
      sizeCalcState.value = true;
    };
    const handleAddToCart = (cate, goodItem, num) => {
      const index = cart.value.findIndex((item) => {
        if (goodItem.use_property) {
          return item.id === goodItem.id && item.props_text === goodItem.props_text;
        } else {
          return item.id === goodItem.id;
        }
      });
      if (index > -1) {
        cart.value[index].number += num;
      } else {
        cart.value.push({
          id: goodItem.id,
          cate_id: cate.id,
          name: goodItem.name,
          price: goodItem.price,
          number: num,
          image: goodItem.images,
          use_property: goodItem.use_property,
          props_text: goodItem.props_text,
          props: goodItem.props
        });
      }
    };
    const handleReduceFromCart = (item, goodItem) => {
      const index = cart.value.findIndex((cartItem) => cartItem.id === goodItem.id);
      cart.value[index].number -= 1;
      if (cart.value[index].number <= 0) {
        cart.value.splice(index, 1);
      }
    };
    const showGoodDetailModal = (item, goodItem) => {
      good.value = JSON.parse(JSON.stringify({ ...goodItem, number: 1 }));
      category.value = JSON.parse(JSON.stringify(item));
      goodDetailModalVisible.value = true;
    };
    const closeGoodDetailModal = () => {
      goodDetailModalVisible.value = false;
      category.value = {};
      good.value = {};
    };
    const changePropertyDefault = (index, key) => {
      good.value.property[index].values.forEach((value) => value.is_default = 0);
      good.value.property[index].values[key].is_default = 1;
      good.value.number = 1;
    };
    const getGoodSelectedProps = (goodItem, type = "text") => {
      if (goodItem.use_property) {
        let props = [];
        goodItem.property.forEach(({ values }) => {
          values.forEach((value) => {
            if (value.is_default) {
              props.push(type === "text" ? value.value : value.id);
            }
          });
        });
        return type === "text" ? props.join("，") : props;
      }
      return "";
    };
    const handlePropertyAdd = () => {
      good.value.number += 1;
    };
    const handlePropertyReduce = () => {
      if (good.value.number === 1)
        return;
      good.value.number -= 1;
    };
    const handleAddToCartInModal = () => {
      const product = Object.assign({}, good.value, { props_text: getGoodSelectedProps(good.value), props: getGoodSelectedProps(good.value, "id") });
      handleAddToCart(category.value, product, good.value.number);
      closeGoodDetailModal();
    };
    const openCartPopup = () => {
      cartPopupVisible.value = !cartPopupVisible.value;
    };
    const handleCartClear = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定清空购物车么",
        success: ({ confirm }) => {
          if (confirm) {
            cartPopupVisible.value = false;
            cart.value = [];
          }
        }
      });
    };
    const handleCartItemAdd = (index) => {
      cart.value[index].number += 1;
    };
    const handleCartItemReduce = (index) => {
      if (cart.value[index].number === 1) {
        cart.value.splice(index, 1);
      } else {
        cart.value[index].number -= 1;
      }
      if (!cart.value.length) {
        cartPopupVisible.value = false;
      }
    };
    const toPay = () => {
      if (!isLogin.value) {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
        return;
      }
      common_vendor.index.showLoading({ title: "加载中" });
      common_vendor.index.setStorageSync("cart", JSON.parse(JSON.stringify(cart.value)));
      common_vendor.index.navigateTo({
        url: "/pages/pay/pay"
      });
      common_vendor.index.hideLoading();
    };
    common_vendor.onLoad(async () => {
      await init();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !loading.value
      }, !loading.value ? common_vendor.e({
        b: goods.value.length
      }, goods.value.length ? common_vendor.e({
        c: orderType.value == "takein"
      }, orderType.value == "takein" ? {
        d: common_vendor.t(storeInfo.value.name),
        e: common_assets._imports_0$1,
        f: common_vendor.t(storeInfo.value.distance_text)
      } : {
        g: common_assets._imports_0$1,
        h: common_vendor.t(address.value.street),
        i: common_vendor.t(storeInfo.value.name)
      }, {
        j: orderType.value == "takein" ? 1 : "",
        k: common_vendor.o(($event) => setOrderType("takein"), "f7"),
        l: orderType.value == "takeout" ? 1 : "",
        m: common_vendor.o(takout, "33"),
        n: common_vendor.f(goods.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(menuCartNum(item.id)),
            c: menuCartNum(item.id),
            d: `menu-${item.id}`,
            e: item.id === currentCateId.value ? 1 : "",
            f: index,
            g: common_vendor.o(($event) => handleMenuTap(item.id), index)
          };
        }),
        o: menuScrollIntoView.value,
        p: common_vendor.f(ads.value, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        }),
        q: common_vendor.f(goods.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.icon,
            c: common_vendor.f(item.goods_list, (good2, key, i1) => {
              return common_vendor.e({
                a: good2.images,
                b: common_vendor.o(($event) => showGoodDetailModal(item, good2), key),
                c: common_vendor.t(good2.name),
                d: common_vendor.t(good2.content),
                e: common_vendor.t(good2.price),
                f: good2.use_property
              }, good2.use_property ? {
                g: common_vendor.o(($event) => showGoodDetailModal(item, good2), key),
                h: common_vendor.t(goodCartNum(good2.id)),
                i: goodCartNum(good2.id)
              } : {
                j: goodCartNum(good2.id),
                k: common_vendor.o(($event) => handleReduceFromCart(item, good2), key),
                l: common_vendor.t(goodCartNum(good2.id)),
                m: goodCartNum(good2.id),
                n: common_vendor.o(($event) => handleAddToCart(item, good2, 1), key)
              }, {
                o: key
              });
            }),
            d: index,
            e: `cate-${item.id}`
          };
        }),
        r: cateScrollTop.value,
        s: common_vendor.o(handleGoodsScroll, "f6"),
        t: cart.value.length > 0
      }, cart.value.length > 0 ? {
        v: common_assets._imports_1$1,
        w: common_vendor.o(openCartPopup, "de"),
        x: common_vendor.t(getCartGoodsNumber.value),
        y: common_vendor.t(getCartGoodsPrice.value),
        z: common_vendor.t(disabledPay.value ? `差${spread.value}元起送` : "去结算"),
        A: common_vendor.o(toPay, "7d"),
        B: disabledPay.value
      } : {}) : {}, {
        C: good.value.images
      }, good.value.images ? {
        D: good.value.images
      } : {}, {
        E: common_assets._imports_2$1,
        F: common_assets._imports_3$1,
        G: common_vendor.o(closeGoodDetailModal, "1e"),
        H: common_vendor.t(good.value.name),
        I: common_vendor.t(good.value.content),
        J: good.value.use_property
      }, good.value.use_property ? {
        K: common_vendor.f(good.value.property, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.desc
          }, item.desc ? {
            c: common_vendor.t(item.desc)
          } : {}, {
            d: common_vendor.f(item.values, (value, key, i1) => {
              return {
                a: common_vendor.t(value.value),
                b: key,
                c: value.is_default ? 1 : "",
                d: common_vendor.o(($event) => changePropertyDefault(index, key), key)
              };
            }),
            e: index
          });
        })
      } : {}, {
        L: common_vendor.t(good.value.price),
        M: getGoodSelectedProps(good.value)
      }, getGoodSelectedProps(good.value) ? {
        N: common_vendor.t(getGoodSelectedProps(good.value))
      } : {}, {
        O: common_vendor.o(handlePropertyReduce, "e6"),
        P: common_vendor.t(good.value.number),
        Q: common_vendor.o(handlePropertyAdd, "9d"),
        R: common_vendor.o(handleAddToCartInModal, "b9"),
        S: common_vendor.p({
          show: goodDetailModalVisible.value,
          color: "#5A5B5C",
          width: "90%",
          custom: true,
          padding: "0rpx",
          radius: "12rpx"
        }),
        T: common_vendor.o(handleCartClear, "c3"),
        U: common_vendor.f(cart.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.props_text),
            c: common_vendor.t(item.price),
            d: common_vendor.o(($event) => handleCartItemReduce(index), index),
            e: common_vendor.t(item.number),
            f: common_vendor.o(($event) => handleCartItemAdd(index), index),
            g: index
          };
        }),
        V: orderType.value == "takeout" && storeInfo.value.packing_fee
      }, orderType.value == "takeout" && storeInfo.value.packing_fee ? {
        W: common_vendor.t(parseFloat(storeInfo.value.packing_fee))
      } : {}, {
        X: common_vendor.p({
          direction: "top",
          ["show-pop"]: cartPopupVisible.value
        })
      }) : {
        Y: common_assets._imports_0$2
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-388b40d3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/menu.js.map
