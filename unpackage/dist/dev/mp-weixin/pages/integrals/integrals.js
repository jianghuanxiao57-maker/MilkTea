"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (common_vendor.unref(navbarBackButton) + common_vendor.unref(uniSteps))();
}
const navbarBackButton = () => "../../components/navbar-back-button.js";
const uniSteps = () => "../../components/uni-steps/uni-steps.js";
const _sfc_main = {
  __name: "integrals",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const customPoints = common_vendor.ref({});
    const stepsOption = common_vendor.ref([]);
    const activeDay = common_vendor.ref(0);
    const pointsMall = common_vendor.ref([]);
    const getStepsOptions = async () => {
      let stepsOptions = [];
      const attendance2 = await proxy.$api("attendance");
      attendance2.forEach((item, index) => {
        if (item.is_day) {
          activeDay.value = index;
        }
        let arr = {
          title: item.day_name + "天",
          desc: "+" + item.points
        };
        if (index == attendance2.length - 1) {
          arr.circle = "/static/images/integrals/goal.png";
          arr.circleStyle = "width: 47rpx; height: 39rpx;";
        }
        stepsOptions.push(arr);
      });
      stepsOption.value = stepsOptions;
    };
    const getPointsMall = async () => {
      pointsMall.value = await proxy.$api("pointsMall");
    };
    const attendance = () => {
      common_vendor.index.navigateTo({
        url: "/pages/attendance/attendance"
      });
    };
    const flow = () => {
      common_vendor.index.navigateTo({
        url: "/pages/integrals/flow"
      });
    };
    const detail = (cate, id) => {
      common_vendor.index.navigateTo({
        url: "/pages/integrals/detail?cate=" + cate + "&id=" + id
      });
    };
    common_vendor.onLoad(async () => {
      await getStepsOptions();
      customPoints.value = await proxy.$api("customPoints");
      await getPointsMall();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$9,
        b: common_assets._imports_1$5,
        c: common_vendor.t(customPoints.value.totalPoints),
        d: common_vendor.o(flow, "d1"),
        e: common_vendor.p({
          active: activeDay.value,
          options: stepsOption.value
        }),
        f: common_vendor.o(attendance, "6b"),
        g: common_vendor.f(pointsMall.value, (items, cate, i0) => {
          return {
            a: common_vendor.t(cate),
            b: common_vendor.f(items, (item, key, i1) => {
              return common_vendor.e({
                a: item.img.length ? item.img[0] : "/static/images/integrals/ticket.png",
                b: common_vendor.t(item.goods_name),
                c: common_vendor.t(item.points_price),
                d: item.amount > 0
              }, item.amount > 0 ? {} : {}, {
                e: item.amount > 0
              }, item.amount > 0 ? {
                f: common_vendor.t(parseFloat(item.amount))
              } : {}, {
                g: common_vendor.t(item.goods_stock),
                h: common_vendor.o(($event) => detail(cate, item.id), key),
                i: key
              });
            }),
            c: cate
          };
        }),
        h: common_assets._imports_2$4
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/integrals/integrals.js.map
