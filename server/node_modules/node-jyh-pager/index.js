/*
    @optoins
    itemPerPage     :한페이지당 글갯수
    pageCount       :하단 네비게이션 갯수
*/
var Pager = function(options) {
  this.options = options;
};

/*
@param
nowPage     : 현제페이지
totalCount  : 총글갯수

@returns
startNav    : 네비게이션시작 페이지 번호
endNav      : 네비게이션끝 페이지 번호
isPrev      : 네비게이션 이전 있는지유무
isNext      : 네비게이션 다음 있는지유무
*/
Pager.prototype.getBottomNav = function(nowPage, totalCount) {
  var retObj = {}; //리턴객체
  var options = this.options;

  //시작페이지계산
  retObj.startNav = (Math.floor((nowPage - 1) / options.pageCount)) * options.pageCount + 1;

  //끝페이지계산
  retObj.endNav = retObj.startNav + options.pageCount - 1;
  retObj.nowPage = nowPage;

  //뷰 글스타트 번호
  retObj.startViewNum = totalCount - ((nowPage - 1) * options.itemPerPage);


  //글이 네비게이션셋일경우
  if (retObj.startNav == 1) {
    retObj.isPrev = false;
  } else {
    retObj.prevNum = ((nowPage - 1) / options.pageCount) * options.pageCount - options.pageCount + 1;
    retObj.isPrev = true;
  }
  //네비게이션 마지막이 글전체페이지수를 초과할경우
  if (retObj.endNav >= this.getTotalPage(totalCount)) {
    retObj.endNav = this.getTotalPage(totalCount);
    retObj.isNext = false;
  } else {

    retObj.isNext = true;
  }

  retObj.totalPage = this.getTotalPage(totalCount);
  retObj.itemPerPage = options.itemPerPage;
  retObj.totalCount = totalCount

  return retObj;

};

/*

*/
Pager.prototype.getTotalPage = function(totalCount) {
  var options = this.options;
  return Math.ceil(totalCount / options.itemPerPage) || 0;
};

Pager.prototype.getSkip = function(page) {
  var options = this.options;
  return (page - 1) * options.itemPerPage;
};

module.exports = Pager;