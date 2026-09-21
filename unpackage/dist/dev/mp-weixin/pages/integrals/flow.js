"use strict";
const common_vendor = require("../../common/vendor.js");
const api_pointsFlow = require("../../api/points-flow.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "flow",
  setup(__props) {
    const store = common_vendor.useStore();
    const pointNum = common_vendor.ref(0);
    const pointsFlowList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      const member = store.state.member;
      pointNum.value = member.pointNum;
      pointsFlowList.value = api_pointsFlow.pointsFlow;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(pointNum.value),
        b: common_vendor.f(pointsFlowList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.reason),
            b: common_vendor.t(item.createdAt),
            c: common_vendor.t(item.changeType == 1 ? "+" : "-"),
            d: common_vendor.t(item.changeNum),
            e: common_vendor.t(item.sellerName),
            f: index,
            g: "9e8b679b-0-" + i0
          };
        }),
        c: common_vendor.p({
          hover: false,
          bgcolor: "#F5F9FB"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e8b679b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/integrals/flow.js.map
