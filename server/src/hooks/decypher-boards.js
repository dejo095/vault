// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const CryptoJS = require("crypto-js"); 

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  
  return async context => {

    context.result.data.forEach((board) => {
      
      let bytesTitle  = CryptoJS.AES.decrypt(board.title, process.env.CRYPTO_SECRET);
      board.title = bytesTitle.toString(CryptoJS.enc.Utf8);
      
      let bytesText  = CryptoJS.AES.decrypt(board.text, process.env.CRYPTO_SECRET);
      board.text = bytesText.toString(CryptoJS.enc.Utf8);     
      
    });
    
  };

};
