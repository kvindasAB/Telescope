Tinytest.add('Should return false with invalid url', function (test) {
  var result = ValidUrlService.isUrlValid("http://asdqwedasd");
  test.equal(result, false);
});

Tinytest.add('Should return true with valid url', function (test) {
  var result = ValidUrlService.isUrlValid("http://www.google.com");
  test.equal(result, true);
});
