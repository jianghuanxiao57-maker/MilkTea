"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "list-cell",
  props: {
    //是否有箭头
    arrow: {
      type: Boolean,
      default: false
    },
    //是否有点击效果
    hover: {
      type: Boolean,
      default: true
    },
    //left 30rpx
    lineLeft: {
      type: Boolean,
      default: false
    },
    //right 30rpx
    lineRight: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: "26rpx 30rpx"
    },
    last: {
      type: Boolean,
      default: false
      //最后一条数据隐藏线条
    },
    radius: {
      type: Boolean,
      default: false
    },
    bgcolor: {
      type: String,
      default: "#fff"
      //背景颜色
    },
    size: {
      type: Number,
      default: 28
      //字体大小
    },
    color: {
      type: String,
      default: "#5A5B5C"
      //字体颜色
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleClick = () => {
      emit("click", {
        index: props.index
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.arrow
      }, __props.arrow ? {
        b: common_assets._imports_0$5
      } : {}, {
        c: __props.arrow ? 1 : "",
        d: __props.last ? 1 : "",
        e: __props.lineLeft ? 1 : "",
        f: __props.lineRight ? 1 : "",
        g: __props.radius ? 1 : "",
        h: __props.hover ? "tui-cell-hover" : "",
        i: __props.bgcolor,
        j: __props.size + "rpx",
        k: __props.color,
        l: __props.padding,
        m: common_vendor.o(handleClick, "17")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-68e8e7aa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/list-cell/list-cell.js.map
