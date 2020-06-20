const Express = require("express");
const Router = Express.Router();

const apigenius = require("genius-api");
const genius = new apigenius(process.env.GENIUS_ACCESS_TOKEN);

const Request_promise = require("request-promise");
const URL = "https://genius.com/Kendrick-lamar-maad-city-lyrics";
const Cheerio = require("cheerio");

Router.get("/scrape", function (req, res, next) {
  const url = req.query.url;
  // console.log("request received");
  console.log("requesting from " + url);
  var lyrics = "";
  Request_promise(url)
    .then(function (html) {
      console.log("scraping");
      const $ = Cheerio.load(html);
      lyrics = $(".lyrics").text();

      /*the div changing the lyrics doesnt have a consistent id
      when it doesnt have class="lyrics" it has Lyrics in a css class applied to it
      formatting needs to be applied to the text when retrieved in this way to preserve line breaks*/
      if (lyrics === "") {
        console.log("searching alternate div");
        $('div[class*="Lyrics__Container"]').find("br").replaceWith("\n");
        lyrics = $('div[class*="Lyrics__Container"]').text();
      }

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
