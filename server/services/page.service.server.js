module.exports = function (app) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);
  var pageModel = require("../model/page/page.model.server");

/*  var PAGES = [
    { _id: "321", name: "Post 1 from server", websiteId: "456", title: "Lorem" },
    { _id: "432", name: "Post 2 from server", websiteId: "456", title: "Lorem" },
    { _id: "543", name: "Post 3 from server", websiteId: "456", title: "Lorem" }
  ];*/

  function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;

    pageModel
      .createPage(websiteId, page)
      .then(function (page) {
        res.json(page);
      }, function (err) {
        res.sendStatus(500).send(err);
      });
  }

  function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    pageModel
      .findAllPagesForWebsite(websiteId)
      .then(function (pages) {
          res.json(pages);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function findPageById(req,res ) {
    var pageId = req.params.pageId;
    pageModel
      .findPageById(pageId)
      .then(function (page) {
          res.json(page);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
      .updatePage(pageId, page)
      .then(function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function deletePage(req,res) {
    var pageId = req.params.pageId;
    //console.log(pageId);
    pageModel
      .deletePage(pageId)
      .then (function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

};
