Package.describe({
  summary: "Forces news url to be valid and all news having a url",
  version: "0.0.1",
  git: "https://github.com/kvindasAB/Telescope/tree/new-package-force-existing-url-only"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');
  api.addFiles(['lib/valid-url-only.js','lib/valid-url-only-settings.js' ]);

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
  api.use('kvindas:telescope-module-valid-url-only');
  api.addFiles('test/valid-url-only-tests.js');
});
