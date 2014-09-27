Package.describe({
  summary: "Shows a summary of the post body content in the post list.",
  version: "0.0.1",
  git: "https://github.com/kvindasAB/Telescope/tree/new-package-post-content-summary"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');
  api.addFiles(
    [
      'lib/post-content-summary.js',
      'lib/post-content-summary.css',
      'lib/post-content-summary-settings.js',
      'lib/post_body_summary.html',
      'lib/post_body_summary.js'
    ], 'client' );

  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);

  api.use([
    'jquery',
    'underscore',
    'iron:router',
    'templating'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('alivebox:telescope-module-post-content-summary');
  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);

  api.addFiles('test/post-content-summary-tests.js');
});
