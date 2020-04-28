const Express = require("express");
const Router = Express.Router();

const apigenius = require("genius-api");
const genius = new apigenius(process.env.GENIUS_ACCESS_TOKEN);

const Request_promise = require("request-promise");
const URL = "https://genius.com/Kendrick-lamar-maad-city-lyrics";
const Cheerio = require("cheerio");

Router.get("/scrape", function (req, res, next) {
  const url = req.query.url;
  console.log("request received");
  console.log(url);
  Request_promise(url)
    .then(function (html) {
      //if successful
      const $ = Cheerio.load(html);
      const lyrics = $(".lyrics").text();
      // console.log(lyrics);
      res.send(lyrics);
    })
    .catch(function (err) {
      res.send("lyrics not found");
      // console.log("lyrics not found");
    });
});

Router.get("/genius/search", function (req, res, next) {
  console.log("genius search");
  // console.log(req.query.searchTerm);
  const searchTerm = req.query.searchTerm;
  // console.log("search term", searchTerm);
  genius
    .search(searchTerm)
    .then(function (response) {
      console.log("hits", response.hits[0]);
      res.send(response.hits[0].result.url);
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = Router;
