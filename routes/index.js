
/**
 * Root.
 */

exports.index = function(options) {
  if (!options.placeholder) options.placeholder = "cameron@flokk.com";
  return function(req, res){
    res.send({
      _links: {
        self: {href: req.base+"/"}
      },
      _templates: {
        request: {action: req.base+"/invites", method: "post", form: {
          email: {prompt: "Email", value: "", type: "email", placeholder: options.placeholder}
        }}
      }
    });
  };
};