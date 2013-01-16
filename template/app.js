var service = require("simple-invite");

var app = module.exports = service({
  auth: function auth(req, res, next) {
    // Auth goes logic here
    next();
  }
});

app.on("invite-request", function() {

});
