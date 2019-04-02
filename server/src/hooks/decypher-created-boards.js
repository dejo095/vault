// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const CryptoJS = require("crypto-js"); 

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  
  return async context => {

      let bytesTitle  = CryptoJS.AES.decrypt(context.result.title, process.env.CRYPTO_SECRET);
      context.result.title = bytesTitle.toString(CryptoJS.enc.Utf8);
      
      let bytesText  = CryptoJS.AES.decrypt(context.result.text, process.env.CRYPTO_SECRET);
      context.result.text = bytesText.toString(CryptoJS.enc.Utf8);     
    
  };

};
