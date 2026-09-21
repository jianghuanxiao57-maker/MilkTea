"use strict";
const pages_attendance_uniCalendar_util = require("./util.js");
const common_vendor = require("../../../common/vendor.js");
const uniCalendarItem = () => "./uni-calendar-item.js";
const _sfc_main = {
  components: {
    uniCalendarItem
  },
  props: {
    /**
     * 当前日期
     */
    date: {
      type: String,
      default: ""
    },
    /**
     * 打点日期
     */
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * 是否开启阴历日期
     */
    lunar: {
      type: Boolean,
      default: false
    },
    /**
     * 开始时间
     */
    startDate: {
      type: String,
      default: ""
    },
    /**
     * 结束时间
     */
    endDate: {
      type: String,
      default: ""
    },
    /**
     * 范围
     */
    range: {
      type: Boolean,
      default: false
    },
    /**
     * 插入
     */
    insert: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示月份背景
     */
    showMonth: {
      type: Boolean,
      default: false
    },
    /* 连续签到天数 */
    continuous: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      weeks: [],
      calendar: {},
      nowDate: "",
      aniMaskShow: false
    };
  },
  watch: {
    selected(newVal) {
      this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
      this.weeks = this.cale.weeks;
    }
  },
  created() {
    this.cale = new pages_attendance_uniCalendar_util.Calendar({
      date: this.date,
      selected: this.selected,
      startDate: this.startDate,
      endDate: this.endDate,
      range: this.range
    });
    this.init(this.cale.date.fullDate);
  },
  methods: {
    // 取消穿透
    clean() {
    },
    init(date) {
      this.weeks = this.cale.weeks;
      this.nowDate = this.calendar = this.cale.getInfo(date);
    },
    open() {
      this.show = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.aniMaskShow = true;
        }, 50);
      });
    },
    close() {
      this.aniMaskShow = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false;
        }, 300);
      });
    },
    confirm() {
      this.setEmit("confirm");
      this.close();
    },
    change() {
      if (!this.insert)
        return;
      this.setEmit("change");
    },
    monthSwitch() {
      let {
        year,
        month
      } = this.nowDate;
      this.$emit("monthSwitch", {
        year,
        month: Number(month)
      });
    },
    setEmit(name) {
      let {
        year,
        month,
        date,
        fullDate,
        lunar,
        extraInfo
      } = this.calendar;
      this.$emit(name, {
        range: this.cale.multipleStatus,
        year,
        month,
        date,
        fulldate: fullDate,
        lunar,
        extraInfo: extraInfo || {}
      });
    },
    choiceDate(weeks) {
      return;
    },
    backtoday() {
      this.cale.setDate(this.date);
      this.weeks = this.cale.weeks;
      this.nowDate = this.calendar = this.cale.getInfo(this.date);
      this.change();
    },
    pre() {
      const preDate = this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate;
      this.setDate(preDate);
      this.monthSwitch();
    },
    next() {
      const nextDate = this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate;
      this.setDate(nextDate);
      this.monthSwitch();
    },
    setDate(date) {
      this.cale.setDate(date);
      this.weeks = this.cale.weeks;
      this.nowDate = this.cale.getInfo(date);
    }
  }
};
if (!Array) {
  const _component_uni_calendar_item = common_vendor.resolveComponent("uni-calendar-item");
  _component_uni_calendar_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.insert && $data.show
  }, !$props.insert && $data.show ? {
    b: $data.aniMaskShow ? 1 : "",
    c: common_vendor.o((...args) => $options.clean && $options.clean(...args), "48")
  } : {}, {
    d: $props.insert || $data.show
  }, $props.insert || $data.show ? common_vendor.e({
    e: !$props.insert
  }, !$props.insert ? {
    f: common_vendor.o((...args) => $options.close && $options.close(...args), "78"),
    g: common_vendor.o((...args) => $options.confirm && $options.confirm(...args), "10")
  } : {}, {
    h: common_vendor.o((...args) => $options.pre && $options.pre(...args), "98"),
    i: common_vendor.t(($data.nowDate.year || "") + "-" + ($data.nowDate.month || "")),
    j: common_vendor.o((...args) => $options.next && $options.next(...args), "08"),
    k: common_vendor.t($props.continuous),
    l: $props.showMonth
  }, $props.showMonth ? {
    m: common_vendor.t($data.nowDate.month)
  } : {}, {
    n: common_vendor.f($data.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: common_vendor.o($options.choiceDate, weeksIndex),
            b: "8324cbc2-0-" + i0 + "-" + i1,
            c: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: $props.selected,
              lunar: $props.lunar
            }),
            d: weeksIndex
          };
        }),
        b: weekIndex
      };
    }),
    o: !$props.insert ? 1 : "",
    p: $data.aniMaskShow ? 1 : ""
  }) : {}, {
    q: common_vendor.o((...args) => $options.clean && $options.clean(...args), "33")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8324cbc2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/attendance/uni-calendar/uni-calendar.js.map
