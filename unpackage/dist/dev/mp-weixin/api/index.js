"use strict";
const api_packages = require("./packages.js");
const api_store = require("./store.js");
const api_goods = require("./goods.js");
const api_levelBenefits = require("./level-benefits.js");
const api_member = require("./member.js");
const api_rechargeCards = require("./rechargeCards.js");
const api_addresses = require("./addresses.js");
const api_attendance = require("./attendance.js");
const api_customPoints = require("./custom-points.js");
const api_pointsMall = require("./points-mall.js");
const api_attendanceList = require("./attendance-list.js");
const api_todayAttendance = require("./today-attendance.js");
const api_orders = require("./orders.js");
const api_customerCoupons = require("./customer-coupons.js");
const api_giftCards = require("./gift-cards.js");
const json = {
  packages: api_packages.packages,
  store: api_store.store,
  goods: api_goods.goods,
  levelBenefits: api_levelBenefits.levelBenefits,
  member: api_member.Member,
  rechargeCards: api_rechargeCards.rechargeCards,
  addresses: api_addresses.addresses,
  attendance: api_attendance.attendance,
  customPoints: api_customPoints.customPoints,
  pointsMall: api_pointsMall.pointsMall,
  attendanceList: api_attendanceList.attendanceList,
  todayAttendance: api_todayAttendance.todayAttendance,
  orders: api_orders.Orders,
  customerCoupons: api_customerCoupons.customerCoupons,
  giftCards: api_giftCards.giftCards
};
const api = (name) => new Promise((resolve) => resolve(json[name]), 500);
exports.api = api;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
