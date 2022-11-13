var utils = require('./utils');

var messageIdCounter = 1;
var messages = [
  // Note: an initial message is useful for debugging purposes.
  /*
  {
    text: 'hello world',
    username: 'fred',
    message_id: objectIdCounter
  }
  */
];

var actions = {
  'GET': function(request, response) {
    if (request.url === '/classes/messages') {
      utils.sendResponse(response, messages);
    } else {
      utils.sendResponse(response, null, 404);
    }
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      message.messageId = ++messageIdCounter;
      messages.push(message);
      utils.sendResponse(response, [{messageId: message.message_id}], 201);
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  }
};

exports.requestHandler = utils.makeActionHandler(actions);

/*****************************Previous Implementation***************************/
// var messageArray = [];
// var messageNumber = 0;

// const urlParser = require('url');

// var requestHandler = function(request, response) {
//   console.log('Serving request type ' + request.method + ' for url ' + request.url);

//   var statusCode = 200;

//   var headers = {
//     'access-control-allow-origin': '*',
//     'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'access-control-allow-headers': 'content-type, accept, authorization',
//     'access-control-max-age': 10, // Seconds.
//     'Content-Type': 'application/json'
//   };

//   const url = urlParser.parse(request.url).pathname;
//   if (url !== '/classes/messages') {
//     response.writeHead(404, headers);
//     response.end();
//   } else {
//     if (request.method === 'GET') {
//       statusCode = 200;
//     } else if (request.method === 'OPTIONS') {
//       statusCode = 200;
//     } else if (request.method === 'POST') {
//       //create data variable
//       var messageData;
//       //listens to stream, chunk/data is of type buffer, array like structure
//       //convert it to string and add it to data/messageData
//       request.on('data', function(data) {
//         //attach data to the data variable
//         messageData = JSON.parse(data);
//       });
//       request.on('end', function() {
//         //use parse and push data chunk (message) to data array
//         //assign ID to message
//         //write head
//         //end
//         messageArray.push(messageData);
//       });
//       statusCode = 201;
//     }
//     response.writeHead(statusCode, headers);
//     // let method = request.method;
//     // let url = request.url;
//     // let body = messageArray;
//     // const bodyResponse = {headers, method, url, body};
//     response.end(JSON.stringify(messageArray));
//   }
// };

// module.exports.requestHandler = requestHandler;