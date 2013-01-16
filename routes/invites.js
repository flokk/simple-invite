
/**
 * Module dependencies.
 */
var db = require("simple-db")
  , E = require("http-error");

/**
 * Request an invite
 */

exports.request = function(options) {
  if (!options) options.message = "Thank you for you interest. We will send you an invitation as they become available.";
  
  return function(req, res, next) {
    if(!req.body.email || !req.body.email.value) return next(new E.BadRequest("Email field is missing"));

    var request = {
      email: req.body.email,
      date: Date.now()
    };

    db.post("requests", request, function(err, id) {
      if(err) return next(err);

      res.send(202, {
        _links: {
          self: {href: req.base+"/"}
        },
        message: options.message
      });
    });
  };
};
