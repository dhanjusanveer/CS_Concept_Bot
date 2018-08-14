"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

let servicePrice = {'wireless': 40, 'internet':50, 'home phone': 20};

restService.post("/inquiry", function(req, res) {
  
  var intent = req.body.queryResult.intent.displayName;
 
  // Inquiry intent
  if (intent == "Inquiry") {
    var text = req.body.queryResult.parameters.Service;
    let price = 0;
    price = servicePrice[text];

    text = 'We offer ' + text + ' for only $' + price;
    return res.json({
      fulfillmentText: text
    });
  };
  
  // Echo intent
  if (intent == "Echo") {
    var text = req.body.queryResult.parameters.givenname
    return res.json({
    fulfillmentText: text
   });
  };
 
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
