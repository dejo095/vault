// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const CryptoJS = require("crypto-js"); 

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const { data } = context;
    const user = context.params.user;
    
    let title = context.data.title.toString().trim().substring(0, 100);
    let text = context.data.text.toString().trim().substring(0, 255);

    title = CryptoJS.AES.encrypt(title, process.env.CRYPTO_SECRET);
    text = CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET);

    context.data.title = title;
    context.data.text = text;
    
    return context;
  };
};
