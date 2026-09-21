"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(listCell)();
}
const listCell = () => "../../components/list-cell/list-cell.js";
const _sfc_main = {
  __name: "userinfo",
  setup(__props) {
    const store = common_vendor.useStore();
    const getDate = (type) => {
      const date2 = /* @__PURE__ */ new Date();
      let year = date2.getFullYear();
      let month = date2.getMonth() + 1;
      let day = date2.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    };
    const member = common_vendor.reactive({});
    const date = common_vendor.ref(getDate("format"));
    const startDate = common_vendor.computed(() => getDate("start"));
    const endDate = common_vendor.computed(() => getDate("end"));
    common_vendor.onLoad(() => {
      Object.assign(member, store.state.member);
    });
    const handleDateChange = (e) => {
      member.birthday = e.target.value;
    };
    const save = () => {
      const updatedMember = Object.assign(store.state.member, member);
      store.commit("SET_MEMBER", updatedMember);
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: member.nickname,
        b: common_vendor.o(($event) => member.nickname = $event.detail.value, "21"),
        c: common_vendor.p({
          hover: false
        }),
        d: member.mobilePhone,
        e: common_vendor.o(($event) => member.mobilePhone = $event.detail.value, "d3"),
        f: common_vendor.p({
          hover: false
        }),
        g: member.gender == "1" ? 1 : "",
        h: common_vendor.o(($event) => member.gender = 1, "b6"),
        i: member.gender == "2" ? 1 : "",
        j: common_vendor.o(($event) => member.gender = 2, "1a"),
        k: common_vendor.p({
          hover: false
        }),
        l: !member.birthday
      }, !member.birthday ? {
        m: date.value,
        n: startDate.value,
        o: endDate.value,
        p: common_vendor.o(handleDateChange, "ab")
      } : {
        q: member.birthday
      }, {
        r: common_vendor.p({
          hover: false,
          arrow: !member.birthday
        }),
        s: member.openingCardDate,
        t: common_vendor.o(($event) => member.openingCardDate = $event.detail.value, "a3"),
        v: common_vendor.p({
          hover: false,
          last: true
        }),
        w: common_vendor.o(save, "c3")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ef92957"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/userinfo.js.map
