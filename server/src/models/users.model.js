// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
  
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 9,
      maxlength: 60,
      trim: true
    },
    password: {
      type: String, 
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
    
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
