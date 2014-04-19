Template.post_submit.helpers({
  categoriesEnabled: function(){
    return Categories.find().count();
  },
  categories: function(){
    return Categories.find();
  },
  users: function(){
    return Meteor.users.find();
  },
  userName: function(){
    return getDisplayName(this);
  },
  isSelected: function(){
    var post=Posts.findOne(Session.get('selectedPostId'));
    return post && this._id == post.userId;
  }
});

Template.post_submit.rendered = function(){
  Session.set('selectedPostId', null);
  if(!this.editor && $('#editor').exists())
    this.editor= new EpicEditor(EpicEditorOptions).load();
  $('#submitted').datepicker().on('changeDate', function(ev){
    $('#submitted_hidden').val(moment(ev.date).valueOf());
  });

  $("#postUser").selectToAutocomplete();

}

Template.post_submit.events({
  'click input[type=submit]': function(e, instance){
    e.preventDefault();

    $(e.target).addClass('disabled');

    if(!Meteor.user()){
      throwError(i18n.t('You must be logged in.'));
      return false;
    }

    var title= $('#title').val();
    var url = $('#url').val();
    var shortUrl = $('#short-url').val();
    var body = instance.editor.exportFile();
    var categories=[];
    var sticky=!!$('#sticky').attr('checked');
    var submitted = $('#submitted_hidden').val();
    var userId = $('#postUser').val();
    var status = parseInt($('input[name=status]:checked').val());

    $('input[name=category]:checked').each(function() {
      categories.push(Categories.findOne($(this).val()));
     });

    var properties = {
        headline: title
      , body: body
      , shortUrl: shortUrl
      , categories: categories
      , sticky: sticky
      , submitted: submitted
      , userId: userId
      , status: status
    };
    if(url){
      var cleanUrl = (url.substring(0, 7) == "http://" || url.substring(0, 8) == "https://") ? url : "http://"+url;
      properties.url = cleanUrl;
    }

    Meteor.call('post', properties, function(error, post) {
      if(error){
        throwError(error.reason);
        clearSeenErrors();
        $(e.target).removeClass('disabled');
        if(error.error == 603)
          Router.go('/posts/'+error.details);
      }else{
        trackEvent("new post", {'postId': post.postId});
        if(post.status === STATUS_PENDING)
          throwError('Thanks, your post is awaiting approval.')
        Router.go('/posts/'+post.postId);
      }
    });
  },
  'click .get-title-link': function(e){
    var url, $titleLinkEl, $titleEl, $descEl;
    e.preventDefault();

    url=$("#url").val();
    $titleLinkEl = $(".get-title-link");
    $titleEl = $("#title");
    $descEl  = $("#editor iframe").contents().find("#epiceditor-editor-frame").contents().find("body");

    if(!url){
        alert("Please fill in an URL first!");
    }

    recommendTitleAndContent(url, $titleEl, $descEl, $titleLinkEl);
  },

  'blur #url': function(e){
    console.log("blur url...");
    var url, lastValidatedUrl, $titleLinkEl, $titleEl, $descEl, autoRecommend;
    e.preventDefault();
    autoRecommend = getSetting("autoRecommendPostData", false);
    if(!autoRecommend){
        return;
    }

    url = $("#url").val();
    lastValidatedUrl = $("#validated_url").val();

    // Url already recommended
    if(url === lastValidatedUrl){
        return;
    }

    $titleLinkEl = $(".get-title-link");
    $titleEl = $("#title");
    $descEl  = $("#editor iframe").contents().find("#epiceditor-editor-frame").contents().find("body");

    if(!url){
        alert("Please fill in an URL first!");
    }

    recommendTitleAndContent(url, $titleEl, $descEl, $titleLinkEl);
    $("#validated_url").val(url);
  }



});