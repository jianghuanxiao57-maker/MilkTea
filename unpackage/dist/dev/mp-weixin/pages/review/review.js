"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (common_vendor.unref(listCell) + common_vendor.unref(rateFormItem))();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const rateFormItem = () => "./rate-form-item/index.js";
const _sfc_main = {
  __name: "review",
  setup(__props) {
    const form = common_vendor.reactive({
      score_service: 0,
      score_order: 0,
      score_speed: 0,
      score_product: 0,
      score_enviroment: 0,
      opinion: ""
    });
    const storename = common_vendor.ref("");
    const typeCate = common_vendor.ref(1);
    const date = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      storename.value = options.storename;
      typeCate.value = options.typeCate;
      date.value = options.date;
    });
    const submit = () => {
      if (!form.score_service || !form.score_order || !form.score_speed || !form.score_product || !form.score_enviroment) {
        common_vendor.index.showToast({
          title: "请先选择评论内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showToast({
        title: "提交成功"
      });
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(storename.value),
        b: common_vendor.t(date.value),
        c: common_vendor.t(typeCate.value == 1 ? "堂食" : "外卖"),
        d: common_vendor.p({
          last: true,
          hover: false
        }),
        e: common_vendor.o(($event) => form.score_service = $event, "91"),
        f: common_vendor.p({
          label: "服务",
          tips: "能感受到良好的服务态度吗？",
          modelValue: form.score_service
        }),
        g: common_vendor.o(($event) => form.score_order = $event, "ad"),
        h: common_vendor.p({
          label: "点单",
          tips: "点单有恰当的介绍，快速准确地下单吗？",
          modelValue: form.score_order
        }),
        i: common_vendor.o(($event) => form.score_speed = $event, "b2"),
        j: common_vendor.p({
          label: "速度",
          tips: "出品的速度您认为可接受吗？",
          modelValue: form.score_speed
        }),
        k: common_vendor.o(($event) => form.score_product = $event, "6e"),
        l: common_vendor.p({
          label: "产品",
          tips: "您享用的茶饮或面包，如您所期待吗？",
          modelValue: form.score_product
        }),
        m: common_vendor.o(($event) => form.score_enviroment = $event, "75"),
        n: common_vendor.p({
          label: "环境",
          tips: "门店环境和清洁卫生，您满意吗？",
          modelValue: form.score_enviroment
        }),
        o: form.opinion,
        p: common_vendor.o(($event) => form.opinion = $event.detail.value, "56"),
        q: common_vendor.t(form.opinion.length),
        r: common_vendor.o(submit, "db")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7018a65d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/review/review.js.map
