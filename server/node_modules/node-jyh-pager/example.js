let Pager = require("node-jyh-pager")


var page = 1;
let count = 100 //ex) 100

let pager = new Pager({
  itemPerPage: 10,
  pageCount: 10
})

let nav = pager.getBottomNav(page, count)
console.log(nav)
/*
{ startNav: 1,
  endNav: 10,
  nowPage: 1,
  startViewNum: 100,
  isPrev: false,
  isNext: false,
  totalPage: 10,
  itemPerPage: 10 }
*/

let totalPage = pager.getTotalPage(count)
console.log(totalPage)
//10

let skip = pager.getSkip(count)
console.log(skip)
//990