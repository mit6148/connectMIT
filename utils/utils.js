var nodemailer = require('nodemailer');

var utils = (function() {

  var _utils = {};

  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL, 
                  // you can try with TLS, but port is then 587
    auth: {
      user: 'donotreplyconnectmit@gmail.com', // Your email id
      pass: 'hannahisanalrightperson' // Your password
    }
    // auth: {
    //   user: 'donotreplyrendezvousteam@gmail.com', // Your email id
    //   pass: 'W{UvmwAB/,fgnGQNDZa,ZVumn&C[%hki+CDRk7yxGttByETXyW' // Your password
    // }
  };

  _utils.transporter = nodemailer.createTransport(smtpConfig);

  _utils.transporter.verify(function(error, success) {
    if (error) {
        console.log("transporter error: " + error);
    } else {
         console.log('Server is ready to take our messages');
    }
  });

  Object.freeze(_utils);
  return _utils;

})();

module.exports = utils;