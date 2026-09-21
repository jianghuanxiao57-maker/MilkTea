"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    weeks: {
      type: Object,
      default() {
        return {};
      }
    },
    calendar: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    }
  },
  attached() {
    common_vendor.index.__f__("log", "at pages/attendance/uni-calendar/uni-calendar-item.vue:68", this.weeks, this.calendar);
  },
  methods: {
    choiceDate(weeks) {
      this.$emit("change", weeks);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.selected && $props.weeks.extraInfo
  }, $props.selected && $props.weeks.extraInfo ? {} : common_vendor.e({
    b: common_vendor.t($props.weeks.date),
    c: $props.weeks.isDay ? 1 : "",
    d: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    e: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    f: $props.weeks.multiple ? 1 : "",
    g: $props.weeks.disable ? 1 : "",
    h: $props.lunar && !$props.weeks.extraInfo
  }, $props.lunar && !$props.weeks.extraInfo ? {
    i: common_vendor.t($props.weeks.isDay ? "今天" : $props.weeks.lunar.IDayCn === "初一" ? $props.weeks.lunar.IMonthCn : $props.weeks.lunar.IDayCn),
    j: $props.weeks.isDay ? 1 : "",
    k: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    l: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    m: $props.weeks.multiple ? 1 : "",
    n: $props.weeks.disable ? 1 : ""
  } : {}, {
    o: $props.weeks.extraInfo && $props.weeks.extraInfo.info
  }, $props.weeks.extraInfo && $props.weeks.extraInfo.info ? {
    p: common_vendor.t($props.weeks.extraInfo.info),
    q: $props.weeks.extraInfo.info ? 1 : "",
    r: $props.weeks.isDay ? 1 : "",
    s: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    t: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    v: $props.weeks.multiple ? 1 : "",
    w: $props.weeks.disable ? 1 : ""
  } : {}), {
    x: $props.weeks.disable ? 1 : "",
    y: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    z: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    A: $props.weeks.multiple ? 1 : "",
    B: common_vendor.o(($event) => $options.choiceDate($props.weeks), "6a")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-714ec332"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/attendance/uni-calendar/uni-calendar-item.js.map
