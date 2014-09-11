Package.describe({
  summary: "Forces main page links to go to the post detail page",
  version: "0.0.1",
  git: "https://github.com/kvindasAB/Telescope/tree/new-package-force-detail-page"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');
  api.addFiles(['lib/force-detail-page.js', 'lib/force-detail-page-settings.js']);

  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);

  api.use([
    'jquery',
    'underscore',
    'iron:router',
    'templating'
  ], 'client');

  api.export('ForcePostDetailService');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('kvindas:telescope-module-force-detail-page');
  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);
  api.addFiles('tests/force-detail-page-tests.js', 'client');
});
