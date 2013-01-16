var should = require("should"),
    request = require("supertest"),
    url = require("url"),
    app = require("..")();

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
};

describe("Simple Invite", function() {

  var root;

  beforeEach(function(done) {
    request(app)
      .get("/")
      .end(function(err, res) {
        res.ok.should.be.ok;
        should.not.exist(err);
        should.exist(res);
        should.exist(res.body);
        root = res.body;
        done();
      });
  });

  describe("/", function() {

    describe("GET", function() {

      it("should have a template to request an invite", function() {
        should.exist(root._templates);
        should.exist(root._templates.request);
        should.exist(root._templates.request.action);
        should.exist(root._templates.request.method);
        should.exist(root._templates.request.form);
        should.exist(root._templates.request.form.email);
        root._templates.request.method.should.eql("post");
      });

    });

    describe("/invites", function() {

      describe("POST", function() {

        it("should request an invite", function(done) {
          var form = copy(root._templates.request.form);
          form.email.value = "cameron@nujii.com";

          var href = url.parse(root._templates.request.action);

          request(app)
            .post(href.path)
            .send(form)
            .end(function(err, res) {
              if (err) return done(err);
              res.statusCode.should.eql(202);
              should.exist(res.body.message);
              done();
            });
        });

        it("should validate form has an email", function(done) {
          var form = copy(root._templates.request.form);

          var href = url.parse(root._templates.request.action);

          request(app)
            .post(href.path)
            .send(form)
            .end(function(err, res) {
              if (err) return done(err);
              res.statusCode.should.eql(400);
              done();
            });
        });

      });

    });

  });

});
