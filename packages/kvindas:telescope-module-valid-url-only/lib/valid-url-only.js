Meteor.startup(function () {
  if(!Meteor.isServer){
    return;
  }
  var bindfunc = _.bind(ValidUrlService.postSubmitCallbackValidateUrl, ValidUrlService);
  postSubmitMethodCallbacks.push(bindfunc);
});

ValidUrlService = {};

ValidUrlService.postSubmitCallbackValidateUrl = function(post){
  if(this.isForceValidUrlOnlyEnabled() && !this.isUrlValid(post.url)){
    throw new Meteor.Error(1101, i18n.t('Please provide a valid URL'));
  };
  return post;
}

ValidUrlService.isUrlValid = function(url){
  if(!url || url === ""){ return false; }
  try{
    var result = HTTP.get(url);
    return true;
  } catch (e) {
    return false
  }
}

ValidUrlService.isForceValidUrlOnlyEnabled = function(){
  var setting = getSetting("forceValidUrlOnly");
  return !!setting;
}

