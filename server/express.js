/**
  @license
  Copyright (c) 2015 Samuel Cardillo. All rights reserved.
**/

// Including and starting all inclusions
var serverPort = "5005";
var express = require("express");
var app = express()
  , bodyParser = require('body-parser')
  , server = require('http').createServer(app)
  , google = require('google')
  , googleImg = require('google-images');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));   // to support URL-encoded bodies
app.use(function(req,res,next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

console.log("######################################");
console.log("# Google Material Design (Polymer 1.0)");
console.log("# Samuel LESPES CARDILLO");
console.log("######################################");
console.log("[I] Express server started on port " + serverPort + "...");

// ======================= START EXPRESS.JS API ======================= //
/** 
 *  /search
 *  Method : POST
 *  Parameters :
 *    @query  string    required
 **/
app.post("/search",function(req,res){
  var outputAPI = {};
  outputAPI["web"] = new Array();
  outputAPI["img"] = new Array();

  if(!req.body.query) return res.end("{'error':'Missing argument'}");

  // Google Image
  googleImg.search({ for: req.body.query, page: 1, callback: function (err, images) {
    outputAPI["img"] = images;
  }})

  // Google Search
  google.resultsPerPage = 50;

  google(req.body.query, function (err, next, links){
    if (err) console.error(err)

    for (var i = 0; i < links.length; ++i) {
      outputAPI["web"].push(links[i]);
    }
    console.log("[I] New research : (" + req.body.query + ")...");

    return res.end(JSON.stringify(outputAPI));
  })
});

// ======================= LISTENING ON THE PORT ======================= //
server.listen(serverPort);
