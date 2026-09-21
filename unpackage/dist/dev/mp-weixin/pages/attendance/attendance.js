"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (common_vendor.unref(navbarBackButton) + common_vendor.unref(uniCalendar) + common_vendor.unref(modal))();
}
const navbarBackButton = () => "../../components/navbar-back-button.js";
const uniCalendar = () => "./uni-calendar/uni-calendar.js";
const modal = () => "../../components/modal/modal.js";
const _sfc_main = {
  __name: "attendance",
  setup(__props) {
    const store = common_vendor.useStore();
    const { proxy } = common_vendor.getCurrentInstance();
    const customPoints = common_vendor.ref({});
    const attendanceModalVisible = common_vendor.ref(false);
    const attendanceList = common_vendor.ref([]);
    const todayAttendance = common_vendor.ref({});
    const startDate = common_vendor.ref("");
    common_vendor.ref("");
    const member = common_vendor.computed(() => store.state.member);
    const attendance = () => {
      attendanceModalVisible.value = true;
    };
    common_vendor.onLoad(async () => {
      customPoints.value = await proxy.$api("customPoints");
      attendanceList.value = await proxy.$api("attendanceList");
      todayAttendance.value = await proxy.$api("todayAttendance");
      const date = /* @__PURE__ */ new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      startDate.value = `${year}-${month}-01`;
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$10,
        b: member.value.avatar,
        c: common_vendor.t(member.value.nickname),
        d: common_vendor.t(customPoints.value.totalPoints),
        e: common_vendor.o(attendance, "44"),
        f: common_vendor.p({
          ["show-month"]: false,
          ["start-date"]: startDate.value,
          selected: attendanceList.value,
          continuous: todayAttendance.value.attendance_continuity_day
        }),
        g: common_assets._imports_1$6,
        h: common_vendor.o(($event) => attendanceModalVisible.value = false, "7a"),
        i: common_vendor.p({
          custom: true,
          show: attendanceModalVisible.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a1b796e8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/attendance/attendance.js.map
