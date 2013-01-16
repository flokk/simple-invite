
/**
 * Module dependencies.
 */

var stack = require('simple-stack')
  , root = require('./routes')
  , invites = require('./routes/invites');

module.exports = function create(options) {
  if (!options) options = {};

  var app = stack(options);

  app.get('/', root.index(options));
  app.post('/invites', invites.request(options));

  return app;
};
