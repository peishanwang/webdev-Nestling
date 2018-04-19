var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUserName = findUserByUserName;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.findUserByFacebookId = findUserByFacebookId;
UserModel.findUsersByUsernameLike = findUsersByUsernameLike;
UserModel.findAllUsers = findAllUsers;
UserModel.addFollow =  addFollow;
UserModel.deleteFollow =  deleteFollow;

module.exports = UserModel;

function findUserByFacebookId(facebookId) {
  return UserModel.findOne({'facebook.id': facebookId});
}

function createUser(user){
  return UserModel.create(user);
}

function findUserById(userId){
  return UserModel.findById(userId);
}

function findUserByUserName(username){
  return UserModel.findOne({username: username});
}

function findUserByCredentials(username, password){
  return UserModel.findOne({username: username, password: password});
}

function updateUser(userId, user){
  return UserModel.update({_id: userId}, user );
}

function deleteUser(userId) {
  return UserModel.remove({_id: userId});
}

function findUsersByUsernameLike(userName) {
  return UserModel.find({username: {'$regex': '.*' + userName + '.*'}});
}

function findAllUsers() {
  return UserModel.find();
}

function addFollow(followerId, followeeId) {
  return UserModel.findOne({_id:followeeId})
    .then(function (followee) {
      UserModel.findOne({_id:followerId})
        .then(function (follower) {
          followee.followers.push(follower);
          follower.followings.push(followee);
          followee.save();
          follower.save();
        })
    })
}

function deleteFollow(followerId, followeeId) {
  return UserModel.findOne({_id: followeeId})
    .then(function (followee) {
      UserModel.findOne({_id: followerId})
        .then(function (follower) {
          for (var i = 0; i < followee.followers.length; i++) {
            if (followee.followers[i].equals(followerId)) {
              followee.followers.splice(i, 1);
              followee.save();
              break;
            }
          }
          for (var i = 0; i < follower.followings.length; i++) {
            if (follower.followings[i].equals(followeeId)) {
              follower.followings.splice(i, 1);
              follower.save();
              break;
            }
          }
        })
    })
}





