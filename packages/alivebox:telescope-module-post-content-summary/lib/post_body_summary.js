Template[getTemplate('postBodySummary')].helpers({
  isBodySummaryEnabled: function () {
    var setting = getSetting("postContentPreview");
    return !!setting;
  }
});