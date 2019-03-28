// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const CryptoJS = require("crypto-js"); 

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context.result;
    const user = context.params.user;

    let tempArray = [];

    data.forEach((board) => {
      let boardId = board._id;
      let active = board.active;
      let title = board.title.toString();
      let text = board.text.toString();
      let ownerId = board.ownerId;
      let createdAt = board.createdAt;
      let updatedAt = board.updatedAt;

      let bytesTitle  = CryptoJS.AES.decrypt(title, process.env.CRYPTO_SECRET);
      title = bytesTitle.toString(CryptoJS.enc.Utf8);
      
      let bytesText  = CryptoJS.AES.decrypt(text, process.env.CRYPTO_SECRET);
      text = bytesText.toString(CryptoJS.enc.Utf8);

      tempArray.push({
        boardId,
        active,
        title,
        text,
        ownerId,
        createdAt,
        updatedAt
      })
      
    });
    
    context.result.data = tempArray;

    return context;
  };
};
