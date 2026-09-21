"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const components_jyfParser_libs_config = require("./config.js");
class CssHandler {
  constructor(tagStyle) {
    __publicField(this, "getStyle", (data) => this.styles = new CssParser(data, this.styles).parse());
    var styles = Object.assign({}, components_jyfParser_libs_config.cfg.userAgentStyles);
    for (var item in tagStyle)
      styles[item] = (styles[item] ? styles[item] + ";" : "") + tagStyle[item];
    this.styles = styles;
  }
  match(name, attrs) {
    var tmp, matched = (tmp = this.styles[name]) ? tmp + ";" : "";
    if (attrs.class) {
      var items = attrs.class.split(" ");
      for (var i = 0, item; item = items[i]; i++)
        if (tmp = this.styles["." + item])
          matched += tmp + ";";
    }
    if (tmp = this.styles["#" + attrs.id])
      matched += tmp + ";";
    return matched;
  }
}
class CssParser {
  constructor(data, init) {
    __publicField(this, "section", () => this.data.substring(this.start, this.i));
    __publicField(this, "isLetter", (c) => c >= "a" && c <= "z" || c >= "A" && c <= "Z");
    this.data = data;
    this.floor = 0;
    this.i = 0;
    this.list = [];
    this.res = init;
    this.state = this.Space;
  }
  parse() {
    for (var c; c = this.data[this.i]; this.i++)
      this.state(c);
    return this.res;
  }
  // 状态机
  Space(c) {
    if (c == "." || c == "#" || this.isLetter(c)) {
      this.start = this.i;
      this.state = this.Name;
    } else if (c == "/" && this.data[this.i + 1] == "*")
      this.Comment();
    else if (!components_jyfParser_libs_config.cfg.blankChar[c] && c != ";")
      this.state = this.Ignore;
  }
  Comment() {
    this.i = this.data.indexOf("*/", this.i) + 1;
    if (!this.i)
      this.i = this.data.length;
    this.state = this.Space;
  }
  Ignore(c) {
    if (c == "{")
      this.floor++;
    else if (c == "}" && !--this.floor)
      this.state = this.Space;
  }
  Name(c) {
    if (components_jyfParser_libs_config.cfg.blankChar[c]) {
      this.list.push(this.section());
      this.state = this.NameSpace;
    } else if (c == "{") {
      this.list.push(this.section());
      this.Content();
    } else if (c == ",") {
      this.list.push(this.section());
      this.Comma();
    } else if (!this.isLetter(c) && (c < "0" || c > "9") && c != "-" && c != "_")
      this.state = this.Ignore;
  }
  NameSpace(c) {
    if (c == "{")
      this.Content();
    else if (c == ",")
      this.Comma();
    else if (!components_jyfParser_libs_config.cfg.blankChar[c])
      this.state = this.Ignore;
  }
  Comma() {
    while (components_jyfParser_libs_config.cfg.blankChar[this.data[++this.i]])
      ;
    if (this.data[this.i] == "{")
      this.Content();
    else {
      this.start = this.i--;
      this.state = this.Name;
    }
  }
  Content() {
    this.start = ++this.i;
    if ((this.i = this.data.indexOf("}", this.i)) == -1)
      this.i = this.data.length;
    var content = this.section();
    for (var i = 0, item; item = this.list[i++]; )
      if (this.res[item])
        this.res[item] += ";" + content;
      else
        this.res[item] = content;
    this.list = [];
    this.state = this.Space;
  }
}
exports.CssHandler = CssHandler;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/jyf-parser/libs/CssHandler.js.map
