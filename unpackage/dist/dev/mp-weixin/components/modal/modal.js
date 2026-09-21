"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "modal",
  props: {
    //是否显示
    show: {
      type: Boolean,
      default: false
    },
    //自定义modal体
    custom: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "84%"
    },
    padding: {
      type: String,
      default: "40rpx"
    },
    radius: {
      type: String,
      default: "24rpx"
    },
    //标题
    title: {
      type: String,
      default: ""
    },
    //内容
    content: {
      type: String,
      default: ""
    },
    //内容字体颜色
    color: {
      type: String,
      default: "#999"
    },
    //内容字体大小 rpx
    size: {
      type: Number,
      default: 28
    },
    //形状 circle, square
    shape: {
      type: String,
      default: "square"
    },
    button: {
      type: Array,
      default: () => [{
        text: "取消",
        type: "red",
        plain: true
        //是否空心
      }, {
        text: "确定",
        type: "red",
        plain: false
      }]
    },
    //点击遮罩 是否可关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    //淡入效果，自定义弹框插入input输入框时传true
    fadein: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleClick = (e) => {
      if (!props.show)
        return;
      const dataset = e.currentTarget.dataset;
      emit("click", {
        index: Number(dataset.index)
      });
    };
    const handleClickCancel = () => {
      if (!props.maskClosable)
        return;
      emit("cancel");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.custom
      }, __props.custom ? {} : common_vendor.e({
        b: __props.title
      }, __props.title ? {
        c: common_vendor.t(__props.title)
      } : {}, {
        d: common_vendor.n(__props.title ? "" : "mtop"),
        e: __props.color,
        f: __props.size + "rpx",
        g: common_vendor.f(__props.button, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text || "确定"),
            b: common_vendor.n("" + (item.type || "primary") + (item.plain ? "-outline" : "")),
            c: common_vendor.n("btn-" + (item.size || "default")),
            d: "" + (item.plain ? "outline" : item.type || "primary") + "-hover",
            e: index,
            f: common_vendor.o(handleClick, index),
            g: index
          };
        }),
        h: common_vendor.n(__props.button.length != 2 ? "btn-width" : ""),
        i: common_vendor.n(__props.button.length > 2 ? "mbtm" : ""),
        j: common_vendor.n(__props.shape == "circle" ? "circle-btn" : ""),
        k: common_vendor.n(__props.button.length != 2 ? "flex-column" : "")
      }), {
        l: __props.width,
        m: __props.padding,
        n: __props.radius,
        o: common_vendor.n(__props.fadein || __props.show ? "modal-normal" : "modal-scale"),
        p: common_vendor.n(__props.show ? "modal-show" : ""),
        q: common_vendor.n(__props.show ? "mask-show" : ""),
        r: common_vendor.o(handleClickCancel, "bf"),
        s: common_vendor.o(() => {
        }, "c7")
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/modal/modal.js.map
