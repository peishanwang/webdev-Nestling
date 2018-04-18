module.exports = function (app) {
  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });

  app.post('/api/page/:pageId/widget', createWidget)
  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.put('/api/widget/:widgetId', updateWidget);
  app.delete('/api/widget/:widgetId', deleteWidget);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  var widgetModel = require("../model/widget/widget.model.server");

  function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetForWidId(widgetId);
    widget.url = 'uploads/'+filename;

    widgetModel
      .updateWidget(widgetId, widget)
      .then(function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });

    var callbackUrl   = "/user/website/"
      + websiteId + '/page/' + pageId + '/widget/' + widgetId;

    res.redirect(callbackUrl);
  }

  function reorderWidgets(req,res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.start);
    var endIndex = parseInt(req.query.end);
    widgetModel
      .reorderWidgets(pageId, startIndex, endIndex)
      .then(function (status) {
        res.send(status);
      }, function (err) {
        res.sendStatus(500).send(err);
      });
  }

  function createWidget (req,res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel
      .createWidget(pageId, widget)
      .then(function (widget) {
        res.json(widget);

      }, function (err) {
        res.sendStatus(500).send(err);
      });
  }


  function findAllWidgetsForPage (req,res) {
    var pageId = req.params.pageId;
    widgetModel
      .findAllWidgetsForPage(pageId)
      .then(function (widgets) {
          res.json(widgets);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function findWidgetById (req,res) {
    var widgetId  = req.params.widgetId;
    widgetModel
      .findWidgetById(widgetId)
      .then(function (widget) {
          res.json(widget);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function updateWidget (req,res) {
    var widgetId  = req.params.widgetId;
    var widget = req.body;
    widgetModel
      .updateWidget(widgetId, widget)
      .then(function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

  function deleteWidget (req,res) {
    var widgetId  = req.params.widgetId;
    widgetModel
      .deleteWidget(widgetId)
      .then (function (status) {
          res.send(status);
        },
        function (err) {
          res.sendStatus(500).send(err);
        });
  }

};
