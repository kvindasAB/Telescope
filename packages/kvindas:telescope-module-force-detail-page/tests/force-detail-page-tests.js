window.getOutgoingUrl = function(url){
  return url;
}

Tinytest.add('Should indicate is not post detail route', function (test) {
  test.equal(ForcePostDetailService.isPostDetailRoute("other"), false);
});

Tinytest.add('Should indicate is post detail route', function (test) {
  test.equal(ForcePostDetailService.isPostDetailRoute(ForcePostDetailService.POST_DETAIL_ROUTE), true);
});

Tinytest.add('Should return postLink post detail url', function (test) {
  ForcePostDetailService.isPostDetailPage = function(){return false;}
  var item = createData("http://anotherdomain.com", 5050);
  var url = ForcePostDetailService.postLink(item);
  test.equal(url, "/posts/"+item._id);
});

Tinytest.add('Should return postLink post outgoing url', function (test) {
  ForcePostDetailService.isPostDetailPage = function(){return true;}
  var item = createData("http://anotherdomain.com", 5050);
  var url = ForcePostDetailService.postLink(item);
  test.equal(url, getOutgoingUrl(item.url) );
});

Tinytest.add('Should return postTarget self for postDetail page', function (test) {
  ForcePostDetailService.isPostDetailPage = function(){return false;}
  var item = createData("http://anotherdomain.com", 5050);
  var target = ForcePostDetailService.postTarget(item);
  test.equal(target, "");
});

Tinytest.add('Should return postTarget blank for outgoing url', function (test) {
  ForcePostDetailService.isPostDetailPage = function(){return true;}
  var item = createData("http://anotherdomain.com", 5050);
  var target = ForcePostDetailService.postTarget(item);
  test.equal(target, "_blank" );
});

function createData(url, id){
  return {
    url: url,
    _id: id
  }
}