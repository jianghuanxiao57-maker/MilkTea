"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_pointsMall = require("../../api/points-mall.js");
if (!Math) {
  common_vendor.unref(jyfParser)();
}
const jyfParser = () => "../../components/jyf-parser/jyf-parser.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const descRef = common_vendor.ref(null);
    const customPoints = common_vendor.ref({});
    const pointGood = common_vendor.ref({});
    const useTips = common_vendor.ref([
      { title: "使用条件", value: "无门槛" },
      { title: "优惠形式", value: "免最高1件" },
      { title: "有效期", value: "领券当日开始90天内有效" },
      { title: "使用时段", value: "00:00:00~23:59:59" },
      { title: "使用限制", value: "不限制" },
      { title: "兑换限制", value: "不限制" },
      { title: "活动商品", value: "限部分商品" },
      { title: "是否与其他优惠共享", value: "否" },
      { title: "使用场景", value: "仅外卖、堂食可用" }
    ]);
    common_vendor.onLoad(async ({ cate, id }) => {
      pointGood.value = api_pointsMall.pointsMall[cate].find((item) => item.id == id);
      common_vendor.nextTick$1(() => {
        if (descRef.value) {
          descRef.value.setContent(pointGood.value.exchange_desc || "");
        }
      });
      customPoints.value = await proxy.$api("customPoints");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: pointGood.value.goods_type == 2
      }, pointGood.value.goods_type == 2 ? common_vendor.e({
        b: pointGood.value.img[0],
        c: common_vendor.t(pointGood.value.points_price),
        d: pointGood.value.amount > 0
      }, pointGood.value.amount > 0 ? {} : {}, {
        e: pointGood.value.amount > 0
      }, pointGood.value.amount > 0 ? {
        f: common_vendor.t(pointGood.value.amount)
      } : {}, {
        g: common_vendor.t(pointGood.value.goods_name),
        h: common_vendor.t(pointGood.value.goods_stock),
        i: common_vendor.sr(descRef, "54115b1c-0", {
          "k": "descRef"
        })
      }) : {
        j: common_assets._imports_0$11,
        k: common_vendor.t(pointGood.value.goods_name),
        l: common_vendor.t(pointGood.value.points_price),
        m: common_vendor.t(pointGood.value.goods_stock),
        n: common_vendor.sr(descRef, "54115b1c-1", {
          "k": "descRef"
        }),
        o: common_vendor.f(useTips.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.value),
            c: index
          };
        })
      }, {
        p: common_vendor.t(customPoints.value.totalPoints < pointGood.value.points_price ? "积分不足" : "立即兑换"),
        q: customPoints.value.totalPoints < pointGood.value.points_price
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-54115b1c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/integrals/detail.js.map
