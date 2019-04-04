// boards-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const boards = new Schema({

    title: {
      type: String, 
      required: true,
      minlength: 1,
      maxlength: 100,
      trim: true
    },
    text: { 
      type: String, 
      required: true,
      minlength: 1,
      trim: true
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    active: {
      type: Boolean,
      default: true
    }

  }, {
    timestamps: true
  });

  return mongooseClient.model('boards', boards);
};
