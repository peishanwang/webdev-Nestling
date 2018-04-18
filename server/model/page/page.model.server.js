var mongoose = require ("mongoose");
var PageSchema = require("./page.schema.server");
var PageModel =  mongoose.model("Page", PageSchema);

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function createPage(websiteId, page) {
  page._website= websiteId;
  return PageModel.create(page);

}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({_website: websiteId});
}

function findPageById(pageId) {
  return PageModel.findById (pageId);
}

function updatePage(pageId, page) {
  delete page._id;
  return PageModel
    .update({_id: pageId}, {
        $set: {
          name: page.name,
          title: page.title
        }
      }
    );
}

function deletePage(pageId) {
  return PageModel.remove({_id: pageId});
}
