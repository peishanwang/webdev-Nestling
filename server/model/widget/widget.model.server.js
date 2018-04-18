var mongoose = require ("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel =  mongoose.model("Widget", WidgetSchema); //mongo plurarizes

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidgets = reorderWidgets;

module.exports = WidgetModel;

function createWidget(pageId, widget)  {
  /*widget._page = pageId;
  return WidgetModel.create(widget);*/
  widget._page = pageId;
  var amt;
  return WidgetModel
    .find({_page: pageId})
    .then(function (widgets){
      //console.log(widgets);
      amt = widgets.length;
      widget.position = amt;
      return WidgetModel
        .create(widget);
    });
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
  return WidgetModel.findById (widgetId);
}

function updateWidget(widgetId, widget) {
  delete widget._id;
  return WidgetModel
    .update({_id: widgetId},{
      $set : widget
    })
}

function deleteWidget(widgetId) {
  //return WidgetModel.remove({_id: widgetId});
  return WidgetModel.findOne({_id: widgetId})
    .then (function (widget) {
      var deletedPosition = widget.position;
      //console.log(deletedPosition);
      updatePosition(widget._page, deletedPosition);
      return WidgetModel.remove({_id: widgetId});
    });
}

function reorderWidgets(pageId, startIndex, endIndex) {
  return WidgetModel.find({_page:pageId}, function (err,widgets) {
    widgets.forEach (function (widget) {
      if(startIndex < endIndex){
        if(widget.position === startIndex){
          widget.position = endIndex;
          //console.log(widget.position);
          widget.save();
          //console.log(widget.position);
        } else if (widget.position > startIndex && widget.position <= endIndex) {
          widget.position --;
          widget.save();
          //console.log(widget.text, widget.position);
        }
      } else {
        if(widget.position === startIndex){
          widget.position = endIndex;
          widget.save();
        } else if(widget.position < startIndex && widget.position >= endIndex) {
          widget.position ++;
          widget.save();
        }
      }
    })
  })
}

function updatePosition (pageId, position) {
  return WidgetModel.find({_page:pageId}, function (err, widgets) {
    widgets.forEach (function (widget) {
      if(widget.position > position){
        widget.position--;
        widget.save();
      }
    })
  });
}
