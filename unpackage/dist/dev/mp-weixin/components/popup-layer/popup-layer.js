"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "popup-layer",
  props: {
    showPop: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "top"
      // 方向  top，bottom，left，right 
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ["closeCallBack", "update:showPop"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ifshow = common_vendor.ref(false);
    const translateValue = common_vendor.ref(-100);
    const timer = common_vendor.ref(null);
    const iftoggle = common_vendor.ref(false);
    const _translate = common_vendor.computed(() => {
      const transformObj = {
        "top": `transform:translateY(${-translateValue.value}%)`,
        "bottom": `transform:translateY(${translateValue.value}%)`,
        "left": `transform:translateX(${-translateValue.value}%)`,
        "right": `transform:translateX(${translateValue.value}%)`
      };
      return transformObj[props.direction];
    });
    const _location = common_vendor.computed(() => {
      const positionValue = {
        "top": "bottom:0px;width:100%;",
        "bottom": "top:0px;width:100%;",
        "left": "right:0px;height:100%;",
        "right": "left:0px;height:100%;"
      };
      return positionValue[props.direction] + _translate.value;
    });
    common_vendor.onMounted(() => {
      if (props.showPop) {
        show();
      }
    });
    common_vendor.watch(() => props.showPop, (value) => {
      common_vendor.index.__f__("log", "at components/popup-layer/popup-layer.vue:73", value);
      if (value) {
        show();
      } else {
        close();
      }
    });
    const show = (events) => {
      ifshow.value = true;
      setTimeout(() => {
        translateValue.value = 0;
      }, 100);
      setTimeout(() => {
        iftoggle.value = true;
      }, 300);
    };
    const close = () => {
      if (timer.value !== null || !iftoggle.value) {
        return;
      }
      translateValue.value = -100;
      timer.value = setTimeout(() => {
        ifshow.value = false;
        timer.value = null;
        iftoggle.value = false;
        emit("closeCallBack", null);
        emit("update:showPop", false);
      }, 300);
    };
    const ableClose = () => {
      if (props.autoClose) {
        close();
      }
    };
    const stopEvent = (event) => {
    };
    __expose({
      show,
      close
    });
    return (_ctx, _cache) => {
      return {
        a: ifshow.value,
        b: common_vendor.o(ableClose, "44"),
        c: common_vendor.o(() => {
        }, "0e"),
        d: common_vendor.o(stopEvent, "ba"),
        e: common_vendor.s(_location.value)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/popup-layer/popup-layer.js.map
