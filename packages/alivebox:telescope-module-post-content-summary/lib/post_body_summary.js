Template[getTemplate('postBodySummary')].helpers({
  isBodySummaryEnabled: function () {
    var setting = getSetting("postContentPreview");
    return !!setting;
  },

  postHtmlBodyPreview: function() {
    /*
    if(!this.htmlBody){ return "" }
    var body = this.htmlBody;
    if(this.htmlBody.length > 143){
      body = this.htmlBody.substring(0, 160);
      body += "...</p>";
    }

    return body;
    */
    return this.htmlBody;
  }


});

Template[getTemplate('postBodySummary')].rendered = function() {
  $('.ellipsis p').dotdotdot({
    watch: "window"
  });
}