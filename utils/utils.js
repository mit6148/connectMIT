var nodemailer = require('nodemailer');

var utils = (function() {

  var _utils = {};

  /**
    Send an error code with success:false and error message
    as provided in the arguments to the response argument provided.
    The caller of this function should return after calling
  */
  // _utils.sendErrorResponse = function(res, errorCode, error) {
  //   res.status(errorCode).json({
  //     success: false,
  //     err: error
  //   }).end();
  // };

  /**
    Send a 200 OK with success:true in the request body to the
    response argument provided.
    The caller of this function should return after calling
  */
  // _utils.sendSuccessResponse = function(res, content) {
  //   res.status(200).json({
  //     success: true,
  //     content: content
  //   }).end();
  // };

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