module.exports = function(app){
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
  var websiteModel = require('../model/website/website.model.server');

  function createWebsite(req,res) {
    var userId = req.params.userId;
    var website = req.body;
    websiteModel
      .createWebsiteForUser(userId, website)
      .then (function (website) {
          res.json(website);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }


  function findAllWebsitesForUser(req,res) {
    var userId = req.params.userId;
    websiteModel
      .findAllWebsitesForUser(userId)
      .then(function (websites) {
          res.json(websites);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
      .findWebsiteById(websiteId)
      .then(function (website) {
          res.json(website);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function updateWebsite(req,res) {
    var websiteId = req.params.websiteId;
    var website  = req.body;
    websiteModel
      .updateWebsite(websiteId, website)
      .then (function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    websiteModel
      .deleteWebsite(websiteId)
      .then (function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }
}


