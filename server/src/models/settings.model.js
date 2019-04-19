// settings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const settings = new Schema({

    // global: [Schema.Types.Mixed]
    welcomeMsg: Boolean,
    showCounter: Boolean,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },

  }, {
    timestamps: false
  });

  return mongooseClient.model('settings', settings);
};
