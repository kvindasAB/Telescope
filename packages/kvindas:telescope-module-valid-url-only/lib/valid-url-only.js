Meteor.startup(function () {
  if(!Meteor.isServer){
    return;
  }
  postSubmitServerCallbacks.push(postSubmitCallbackValidateUrl);
});

function postSubmitCallbackValidateUrl(post){
  if(isForceValidUrlOnlyEnabled() && !isUrlValid(post.url)){
    throw new Meteor.Error(1101, i18n.t('Please provide a valid URL'));
  };
  return post;
}

function isUrlValid(url, successFn, failFn){
  if(!url || url === ""){ return false; }
  try{
    var result = HTTP.get(url);
    return true;
  } catch (e) {
    return false
  }
}

function isForceValidUrlOnlyEnabled(){
  var setting = getSetting("forceValidUrlOnly");
  console.log("Setting: " + setting);
  return !!setting;
}

