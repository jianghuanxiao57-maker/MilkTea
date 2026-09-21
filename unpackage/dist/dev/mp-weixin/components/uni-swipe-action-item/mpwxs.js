"use strict";
const common_vendor = require("../../common/vendor.js");
const mpwxs = {
  data() {
    return {
      position: [],
      button: []
    };
  },
  computed: {
    pos() {
      return JSON.stringify(this.position);
    },
    btn() {
      return JSON.stringify(this.button);
    }
  },
  watch: {
    show(newVal) {
      if (this.autoClose)
        return;
      let valueObj = this.position[0];
      if (!valueObj) {
        this.init();
        return;
      }
      valueObj.show = newVal;
      this.position[0] = valueObj;
    }
  },
  created() {
    if (this.swipeaction.children !== void 0) {
      this.swipeaction.children.value.push(this);
    }
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.swipeaction.children.value.forEach((item, index) => {
      if (item === this) {
        this.swipeaction.children.value.splice(index, 1);
      }
    });
  },
  methods: {
    init() {
      setTimeout(() => {
        this.getSize();
        this.getButtonSize();
      }, 50);
    },
    closeSwipe(e) {
      if (!this.autoClose)
        return;
      this.swipeaction.closeOther(this);
    },
    change(e) {
      this.$emit("change", e.open);
      let valueObj = this.position[0];
      if (valueObj.show !== e.open) {
        valueObj.show = e.open;
        this.position[0] = valueObj;
      }
    },
    onClick(index, item) {
      this.$emit("click", {
        content: item,
        index
      });
    },
    appTouchStart() {
    },
    appTouchEnd() {
    },
    getSize() {
      const views = common_vendor.index.createSelectorQuery().in(this);
      views.selectAll(".selector-query-hock").boundingClientRect((data) => {
        if (this.autoClose) {
          data[0].show = false;
        } else {
          data[0].show = this.show;
        }
        this.position = data;
      }).exec();
    },
    getButtonSize() {
      const views = common_vendor.index.createSelectorQuery().in(this);
      views.selectAll(".button-hock").boundingClientRect((data) => {
        this.button = data;
      }).exec();
    }
  }
};
exports.mpwxs = mpwxs;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-swipe-action-item/mpwxs.js.map
