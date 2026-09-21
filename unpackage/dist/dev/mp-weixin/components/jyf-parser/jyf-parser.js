"use strict";
const common_vendor = require("../../common/vendor.js");
const components_jyfParser_libs_MpHtmlParser = require("./libs/MpHtmlParser.js");
const trees = () => "./libs/trees.js";
var cache = {};
var fs = common_vendor.index.getFileSystemManager ? common_vendor.index.getFileSystemManager() : null;
function hash(str) {
  for (var i = str.length, val = 5381; i--; )
    val += (val << 5) + str.charCodeAt(i);
  return val;
}
const _sfc_main = {
  name: "parser",
  data() {
    return {
      scaleAm: "",
      showAm: "",
      imgs: [],
      nodes: []
    };
  },
  components: {
    trees
  },
  props: {
    "html": null,
    "autopause": {
      type: Boolean,
      default: true
    },
    "autosetTitle": {
      type: Boolean,
      default: true
    },
    "compress": Number,
    "useCache": Boolean,
    "domain": String,
    "gestureZoom": Boolean,
    "lazyLoad": Boolean,
    "selectable": Boolean,
    "tagStyle": Object,
    "showWithAnimation": Boolean,
    "useAnchor": Boolean
  },
  watch: {
    html(html) {
      this.setContent(html);
    }
  },
  mounted() {
    this.imgList = [];
    this.imgList.each = function(f) {
      for (var i = 0, len = this.length; i < len; i++)
        this.setItem(i, f(this[i], i, this));
    };
    this.imgList.setItem = function(i, src) {
      if (i == void 0 || !src)
        return;
      if (src.indexOf("http") == 0 && this.includes(src)) {
        var newSrc = "";
        for (var j = 0, c; c = src[j]; j++) {
          if (c == "/" && src[j - 1] != "/" && src[j + 1] != "/")
            break;
          newSrc += Math.random() > 0.5 ? c.toUpperCase() : c;
        }
        newSrc += src.substr(j);
        return this[i] = newSrc;
      }
      this[i] = src;
      if (src.includes("data:image")) {
        var filePath, info = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
        if (!info)
          return;
        filePath = `${common_vendor.wx$1.env.USER_DATA_PATH}/${Date.now()}.${info[1]}`;
        fs && fs.writeFile({
          filePath,
          data: info[3],
          encoding: info[2],
          success: () => this[i] = filePath
        });
      }
    };
    if (this.html)
      this.setContent(this.html);
  },
  beforeDestroy() {
    this.imgList.each((src) => {
      if (src && src.includes(common_vendor.index.env.USER_DATA_PATH))
        fs && fs.unlink({
          filePath: src
        });
    });
    clearInterval(this._timer);
  },
  methods: {
    setContent(html, append) {
      var nodes;
      if (!html)
        return this.nodes = [];
      else if (typeof html == "string") {
        let parser = new components_jyfParser_libs_MpHtmlParser.MpHtmlParser(html, this);
        if (this.useCache) {
          var hashVal = hash(html);
          if (cache[hashVal])
            nodes = cache[hashVal];
          else {
            nodes = parser.parse();
            cache[hashVal] = nodes;
          }
        } else
          nodes = parser.parse();
        this.$emit("parse", nodes);
      } else if (Object.prototype.toString.call(html) == "[object Array]") {
        if (html.length && html[0].PoweredBy != "Parser") {
          let parser = new components_jyfParser_libs_MpHtmlParser.MpHtmlParser(html, this);
          (function f(ns) {
            for (var i = 0, n; n = ns[i]; i++) {
              if (n.type == "text")
                continue;
              n.attrs = n.attrs || {};
              for (var item in n.attrs)
                if (typeof n.attrs[item] != "string")
                  n.attrs[item] = n.attrs[item].toString();
              parser.matchAttr(n, parser);
              if (n.children && n.children.length) {
                parser.STACK.push(n);
                f(n.children);
                parser.popNode(parser.STACK.pop());
              } else
                n.children = void 0;
            }
          })(html);
        }
        nodes = html;
      } else if (typeof html == "object" && html.nodes) {
        nodes = html.nodes;
        common_vendor.index.__f__("warn", "at components/jyf-parser/jyf-parser.vue:429", "错误的 html 类型：object 类型已废弃");
      } else
        return common_vendor.index.__f__("warn", "at components/jyf-parser/jyf-parser.vue:431", "错误的 html 类型：" + typeof html);
      if (append)
        this.nodes = this.nodes.concat(nodes);
      else
        this.nodes = nodes;
      if (nodes.length && nodes[0].title && this.autosetTitle)
        common_vendor.index.setNavigationBarTitle({
          title: nodes[0].title
        });
      this.$nextTick(() => {
        this.imgList.length = 0;
        this.videoContexts = [];
        this.$emit("load");
      });
      var height;
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        this.createSelectorQuery().select("#top").boundingClientRect().exec((res) => {
          this.width = res[0].width;
          if (res[0].height == height) {
            this.$emit("ready", res[0]);
            clearInterval(this._timer);
          }
          height = res[0].height;
        });
      }, 350);
      if (this.showWithAnimation && !append)
        this.showAm = "animation:show .5s";
    },
    getText(ns = this.nodes) {
      var txt = "";
      for (var i = 0, n; n = ns[i++]; ) {
        if (n.type == "text")
          txt += n.text.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        else if (n.type == "br")
          txt += "\n";
        else {
          var block = n.name == "p" || n.name == "div" || n.name == "tr" || n.name == "li" || n.name[0] == "h" && n.name[1] > "0" && n.name[1] < "7";
          if (block && txt && txt[txt.length - 1] != "\n")
            txt += "\n";
          if (n.children)
            txt += this.getText(n.children);
          if (block && txt[txt.length - 1] != "\n")
            txt += "\n";
          else if (n.name == "td" || n.name == "th")
            txt += "	";
        }
      }
      return txt;
    },
    navigateTo(obj) {
      if (!this.useAnchor)
        return obj.fail && obj.fail({
          errMsg: "Anchor is disabled"
        });
      var Scroll = (selector, component) => {
        common_vendor.index.createSelectorQuery().in(component ? component : this).select(selector).boundingClientRect().selectViewport().scrollOffset().exec((res) => {
          if (!res || !res[0])
            return obj.fail && obj.fail({
              errMsg: "Label not found"
            });
          obj.scrollTop = res[1].scrollTop + res[0].top + (obj.offset || 0);
          common_vendor.index.pageScrollTo(obj);
        });
      };
      if (!obj.id)
        Scroll("#top");
      else {
        Scroll("#top >>> #" + obj.id + ", #top >>> ." + obj.id);
      }
    },
    getVideoContext(id) {
      if (!id)
        return this.videoContexts;
      else
        for (var i = this.videoContexts.length; i--; )
          if (this.videoContexts[i].id == id)
            return this.videoContexts[i];
    },
    // 预加载
    preLoad(html, num) {
      if (typeof html == "string") {
        var id = hash(html);
        html = new components_jyfParser_libs_MpHtmlParser.MpHtmlParser(html, this).parse();
        cache[id] = html;
      }
      var wait = [];
      (function f(ns) {
        for (var i = 0, n; n = ns[i++]; ) {
          if (n.name == "img" && n.attrs.src && !wait.includes(n.attrs.src))
            wait.push(n.attrs.src);
          f(n.children || []);
        }
      })(html);
      if (num)
        wait = wait.slice(0, num);
      this._wait = (this._wait || []).concat(wait);
      if (!this.imgs)
        this.imgs = this._wait.splice(0, 15);
      else if (this.imgs.length < 15)
        this.imgs = this.imgs.concat(this._wait.splice(0, 15 - this.imgs.length));
    },
    _load(e) {
      if (this._wait.length)
        this.$set(this.imgs, e.target.id, this._wait.shift());
    },
    _tap(e) {
      if (this.gestureZoom && e.timeStamp - this._lastT < 300) {
        var initY = e.touches[0].pageY - e.currentTarget.offsetTop;
        if (this._zoom) {
          this._scaleAm.translateX(0).scale(1).step();
          common_vendor.index.pageScrollTo({
            scrollTop: (initY + this._initY) / 2 - e.touches[0].clientY,
            duration: 400
          });
        } else {
          var initX = e.touches[0].pageX - e.currentTarget.offsetLeft;
          this._initY = initY;
          this._scaleAm = common_vendor.index.createAnimation({
            transformOrigin: `${initX}px ${this._initY}px 0`,
            timingFunction: "ease-in-out"
          });
          this._scaleAm.scale(2).step();
          this._tMax = initX / 2;
          this._tMin = (initX - this.width) / 2;
          this._tX = 0;
        }
        this._zoom = !this._zoom;
        this.scaleAm = this._scaleAm.export();
      }
      this._lastT = e.timeStamp;
    },
    _touchstart(e) {
      if (e.touches.length == 1)
        this._initX = this._lastX = e.touches[0].pageX;
    },
    _touchmove(e) {
      var diff = e.touches[0].pageX - this._lastX;
      if (this._zoom && e.touches.length == 1 && Math.abs(diff) > 20) {
        this._lastX = e.touches[0].pageX;
        if (this._tX <= this._tMin && diff < 0 || this._tX >= this._tMax && diff > 0)
          return;
        this._tX += diff * Math.abs(this._lastX - this._initX) * 0.05;
        if (this._tX < this._tMin)
          this._tX = this._tMin;
        if (this._tX > this._tMax)
          this._tX = this._tMax;
        this._scaleAm.translateX(this._tX).step();
        this.scaleAm = this._scaleAm.export();
      }
    }
  }
};
if (!Array) {
  const _component_trees = common_vendor.resolveComponent("trees");
  _component_trees();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.nodes.length
  }, !$data.nodes.length ? {} : {}, {
    b: common_vendor.p({
      nodes: $data.nodes,
      ["lazy-load"]: $props.lazyLoad
    }),
    c: common_vendor.f($data.imgs, (item, index, i0) => {
      return {
        a: index,
        b: index,
        c: item,
        d: common_vendor.o((...args) => $options._load && $options._load(...args), index)
      };
    }),
    d: common_vendor.s($data.showAm + ($props.selectable ? ";user-select:text;-webkit-user-select:text" : "")),
    e: $data.scaleAm,
    f: common_vendor.o((...args) => $options._tap && $options._tap(...args), "2e"),
    g: common_vendor.o((...args) => $options._touchstart && $options._touchstart(...args), "81"),
    h: common_vendor.o((...args) => $options._touchmove && $options._touchmove(...args), "d2")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/jyf-parser/jyf-parser.js.map
