"use strict";
const common_vendor = require("../../../common/vendor.js");
const block0 = {};
const block1 = {};
global.Parser = {};
const trees = () => Promise.resolve().then(() => RDovVW5pYXBwLWliOmbqi9jb21wb25lbnRzL2p5Zi1wYXJzZXIvbGlicy90cmVlcy52dWU);
const _sfc_main = {
  components: {
    trees
  },
  name: "trees",
  data() {
    return {
      ns: [],
      placeholder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',
      loadVideo: true
    };
  },
  props: {
    nodes: Array,
    lazyLoad: Boolean
  },
  watch: {
    nodes: {
      immediate: true,
      handler(val) {
        this.ns = val;
      }
    }
  },
  mounted() {
    var _top = this.$parent;
    while (_top.$options.name != "parser") {
      if (_top.top) {
        _top = _top.top;
        break;
      }
      _top = _top.$parent;
    }
    this.top = _top;
    for (var j = this.nodes.length, item; item = this.nodes[--j]; ) {
      if (item.c)
        continue;
      if (item.name == "img")
        _top.imgList.setItem(item.attrs.i, item.attrs.src);
      else if (item.name == "video" || item.name == "audio") {
        var ctx;
        if (item.name == "video")
          ctx = common_vendor.index.createVideoContext(item.attrs.id, this);
        else if (this.$refs[item.attrs.id])
          ctx = this.$refs[item.attrs.id][0];
        if (ctx) {
          ctx.id = item.attrs.id;
          _top.videoContexts.push(ctx);
        }
      }
    }
  },
  methods: {
    play(e) {
      var contexts = this.top.videoContexts;
      if (contexts.length > 1 && this.top.autopause) {
        for (var i = contexts.length; i--; )
          if (contexts[i].id != e.currentTarget.dataset.id)
            contexts[i].pause();
      }
    },
    imgtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true, data = {
          id: e.target.id,
          src: attrs.src,
          ignore: () => preview = false
        };
        global.Parser.onImgtap && global.Parser.onImgtap(data);
        this.top.$emit("imgtap", data);
        if (preview) {
          var urls = this.top.imgList, current = urls[attrs.i] ? parseInt(attrs.i) : (urls = [attrs.src], 0);
          common_vendor.index.previewImage({
            current,
            urls
          });
        }
      }
    },
    loadImg(e) {
      var node = this.ns[e.currentTarget.dataset.i];
      if (this.lazyLoad && !node.load)
        this.$set(node, "load", true);
    },
    linkpress(e) {
      var jump = true, attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      global.Parser.onLinkpress && global.Parser.onLinkpress(attrs);
      this.top.$emit("linkpress", attrs);
      if (jump) {
        if (attrs["app-id"]) {
          return common_vendor.index.navigateToMiniProgram({
            appId: attrs["app-id"],
            path: attrs.path
          });
        }
        if (attrs.href) {
          if (attrs.href[0] == "#") {
            if (this.top.useAnchor)
              this.top.navigateTo({
                id: attrs.href.substring(1)
              });
          } else if (attrs.href.indexOf("http") == 0 || attrs.href.indexOf("//") == 0) {
            common_vendor.index.setClipboardData({
              data: attrs.href,
              success: () => common_vendor.index.showToast({
                title: "链接已复制"
              })
            });
          } else
            common_vendor.index.navigateTo({
              url: attrs.href
            });
        }
      }
    },
    error(e) {
      var context, target = e.currentTarget, source = target.dataset.source, node = this.ns[target.dataset.i];
      if (source == "video" || source == "audio") {
        var index = (node.i || 0) + 1;
        if (index < node.attrs.source.length)
          this.$set(node, "i", index);
        if (source == "video")
          context = common_vendor.index.createVideoContext(target.id, this);
        else if (e.detail.__args__) {
          e.detail = e.detail.__args__[0];
          context = e.detail.context;
        }
      } else if (source == "img")
        context = {
          setSrc: (src) => {
            node.attrs.src = src;
          }
        };
      this.top && this.top.$emit("error", {
        source,
        target,
        errMsg: e.detail.errMsg,
        errCode: e.detail.errCode,
        context
      });
    },
    _loadVideo(e) {
      var i = e.target.dataset.i;
      this.ns[i].lazyLoad = false;
      this.ns[i].attrs.autoplay = true;
    }
  }
};
if (!Array) {
  const _component_trees = common_vendor.resolveComponent("trees");
  _component_trees();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.ns, (n, index, i0) => {
      return common_vendor.e({
        a: n.name == "img"
      }, n.name == "img" ? {
        b: [{
          attrs: {
            src: $props.lazyLoad && !n.load ? $data.placeholder : n.attrs.src,
            alt: n.attrs.alt || "",
            width: n.attrs.width || "",
            style: "max-width:100%;display:block" + (n.attrs.height ? ";height:" + n.attrs.height : "")
          },
          name: "img"
        }],
        c: $props.lazyLoad && !n.load ? $data.placeholder : n.attrs.src,
        d: $props.lazyLoad,
        e: !n.attrs.ignore,
        f: index,
        g: common_vendor.o((...args) => $options.loadImg && $options.loadImg(...args), index),
        h: common_vendor.o((...args) => $options.error && $options.error(...args), index),
        i: common_vendor.n("_img " + n.attrs.class),
        j: common_vendor.s(n.attrs.style),
        k: n.attrs,
        l: common_vendor.o((...args) => $options.imgtap && $options.imgtap(...args), index)
      } : n.type == "text" ? {
        n: common_vendor.t(n.text)
      } : n.name == "br" ? {} : n.lazyLoad || n.name == "video" && !$data.loadVideo ? {
        q: n.attrs.id,
        r: common_vendor.n("_video " + (n.attrs.class || "")),
        s: common_vendor.s(n.attrs.style),
        t: index,
        v: common_vendor.o((...args) => $options._loadVideo && $options._loadVideo(...args), index)
      } : n.name == "video" ? {
        x: n.attrs.id,
        y: common_vendor.n(n.attrs.class),
        z: common_vendor.s(n.attrs.style),
        A: n.attrs.autoplay,
        B: n.attrs.controls,
        C: n.attrs.loop,
        D: n.attrs.muted,
        E: n.attrs.poster,
        F: n.attrs.source[n.i || 0],
        G: n.attrs["unit-id"],
        H: n.attrs.id,
        I: common_vendor.o((...args) => $options.error && $options.error(...args), index),
        J: common_vendor.o((...args) => $options.play && $options.play(...args), index)
      } : n.name == "audio" ? {
        L: n.attrs.id,
        M: common_vendor.n(n.attrs.class),
        N: common_vendor.s(n.attrs.style),
        O: n.attrs.author,
        P: n.attrs.autoplay,
        Q: n.attrs.controls,
        R: n.attrs.loop,
        S: n.attrs.name,
        T: n.attrs.poster,
        U: n.attrs.source[n.i || 0],
        V: index,
        W: n.attrs.id,
        X: common_vendor.o((...args) => $options.error && $options.error(...args), index),
        Y: common_vendor.o((...args) => $options.play && $options.play(...args), index)
      } : n.name == "a" ? {
        aa: "5c01485f-0-" + i0,
        ab: common_vendor.p({
          nodes: n.children
        }),
        ac: common_vendor.n("_a " + (n.attrs.class || "")),
        ad: common_vendor.s(n.attrs.style),
        ae: n.attrs,
        af: common_vendor.o((...args) => $options.linkpress && $options.linkpress(...args), index)
      } : n.name == "li" ? common_vendor.e({
        ah: n.type == "ol"
      }, n.type == "ol" ? {
        ai: common_vendor.t(n.num)
      } : common_vendor.e({
        aj: n.floor % 3 == 0
      }, n.floor % 3 == 0 ? {} : n.floor % 3 == 2 ? {} : {}, {
        ak: n.floor % 3 == 2
      }), {
        al: "5c01485f-1-" + i0,
        am: common_vendor.p({
          nodes: n.children,
          lazyLoad: $props.lazyLoad
        }),
        an: n.attrs.id,
        ao: common_vendor.n(n.attrs.class),
        ap: common_vendor.s((n.attrs.style || "") + ";display:flex")
      }) : n.name == "table" && n.c ? {
        ar: common_vendor.f(n.children, (tbody, i, i1) => {
          return {
            a: common_vendor.f(tbody.children, (tr, j, i2) => {
              return common_vendor.e({
                a: tr.name == "td"
              }, tr.name == "td" ? {
                b: "5c01485f-2-" + i0 + "-" + i1 + "-" + i2,
                c: common_vendor.p({
                  nodes: tr.children
                })
              } : {
                d: common_vendor.f(tr.children, (td, k, i3) => {
                  return {
                    a: k,
                    b: common_vendor.n(td.attrs.class),
                    c: common_vendor.s((td.attrs.style || "") + (td.name[0] == "t" ? ";display:table-" + (td.name == "tr" ? "row" : "cell") : "")),
                    d: "5c01485f-3-" + i0 + "-" + i1 + "-" + i2 + "-" + i3,
                    e: common_vendor.p({
                      nodes: td.children
                    })
                  };
                })
              }, {
                e: j,
                f: common_vendor.n(tr.attrs.class),
                g: common_vendor.s((tr.attrs.style || "") + (tr.name[0] == "t" ? ";display:table-" + (tr.name == "tr" ? "row" : "cell") : ""))
              });
            }),
            b: i,
            c: common_vendor.n(tbody.attrs.class),
            d: common_vendor.s((tbody.attrs.style || "") + (tbody.name[0] == "t" ? ";display:table-" + (tbody.name == "tr" ? "row" : "row-group") : ""))
          };
        }),
        as: n.attrs.id,
        at: common_vendor.n(n.attrs.class),
        av: common_vendor.s((n.attrs.style || "") + ";display:table")
      } : common_vendor.e({
        aw: n.attrs.id,
        ax: common_vendor.n("_p __" + n.name),
        ay: [n]
      }, {
        az: common_vendor.n((n.attrs.id || "") + " _" + n.name + " " + (n.attrs.class || "")),
        aA: common_vendor.s(n.attrs.style),
        aB: "5c01485f-4-" + i0,
        aC: common_vendor.p({
          nodes: n.children,
          lazyLoad: $props.lazyLoad
        })
      }), {
        m: n.type == "text",
        o: n.name == "br",
        p: n.lazyLoad || n.name == "video" && !$data.loadVideo,
        w: n.name == "video",
        K: n.name == "audio",
        Z: n.name == "a",
        ag: n.name == "li",
        aq: n.name == "table" && n.c,
        aD: index
      });
    })
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
if (typeof block1 === "function")
  block1(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
const RDovVW5pYXBwLWliOmbqi9jb21wb25lbnRzL2p5Zi1wYXJzZXIvbGlicy90cmVlcy52dWU = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/jyf-parser/libs/trees.js.map
