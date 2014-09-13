Meteor.startup(function () {

  if(!Meteor.isClient){
    return;
  }
  var template = Template[getTemplate('postTitle')];
  if(!template){ return; }

  template.helpers({
    postLink: function(){
      return ForcePostDetailService.postLink(this, ForcePostDetailService.isForcePostDetailEnabled() );
    },
    postTarget: function() {
      return ForcePostDetailService.postTarget(this, ForcePostDetailService.isForcePostDetailEnabled() );
    }
  });

});

ForcePostDetailService = {};

ForcePostDetailService.POST_DETAIL_ROUTE = "post_page";

ForcePostDetailService.postLink = function(item, forceDetailEnabled){
  if((forceDetailEnabled && this.isPostDetailPage()) || !forceDetailEnabled ){
    return !!item.url ? getOutgoingUrl(item.url) : "/posts/"+item._id;
  }
  return "/posts/"+item._id;
}

ForcePostDetailService.postTarget = function(item, forceDetailEnabled){
  if((forceDetailEnabled && this.isPostDetailPage()) || !forceDetailEnabled ){
    return !!item.url ? '_blank' : '';
  }
  return '';
}

ForcePostDetailService.isPostDetailPage = function(){
  if(!Router || !Router.current() || !Router.current().route){ return false; }
  return this.isPostDetailRoute(Router.current().route.name);
}

ForcePostDetailService.isPostDetailRoute = function(route){
  return route === this.POST_DETAIL_ROUTE;
}

ForcePostDetailService.isForcePostDetailEnabled = function(){
  var setting = getSetting("forcePostDetailPage");
  return !!setting;
}