Package.describe({
  summary: "Shows a summary of the post body content in the post list.",
  version: "0.0.1",
  git: "https://github.com/kvindasAB/Telescope/tree/new-package-post-content-summary"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');
  api.addFiles('lib/post-content-summary.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('alivebox:telescope-module-post-content-summary');
  api.addFiles('test/post-content-summary-tests.js');
});
