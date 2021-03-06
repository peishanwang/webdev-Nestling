var mongoose = require("mongoose");
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

var websiteModel = require("../website/website.model.server");


WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.findAllWebsites = findAllWebsites;
WebsiteModel.findWebsitesByWebsiteName = findWebsitesByWebsiteName;

module.exports = WebsiteModel;

function createWebsiteForUser(userId, website)  {
  website._user = userId;
  return WebsiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findById (websiteId);
}

function updateWebsite(websiteId, website){
  delete website._id;
  return WebsiteModel
    .update({_id: websiteId},{
      $set: { name : website.name,
        description : website.description
      }}
    );
}

function deleteWebsite(websiteId) {
  return WebsiteModel.remove({_id: websiteId});
}

function findAllWebsites() {
  return WebsiteModel.find();
}

function findWebsitesByWebsiteName(websiteName) {
  //console.log("model" + " productName")
  return WebsiteModel.find({name: {'$regex': '.*' + websiteName + '.*'}});
}












