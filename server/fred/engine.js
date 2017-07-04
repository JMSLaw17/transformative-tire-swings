const nlp = require('compromise');
const model = require('../../database-postgres/models/index.js');
const apiHandler = require('../apihandler');
const parseTools = require('./parseTools');

const response = (str = "is there fog today?", loc = {"lat":"37.7837039","lon":"-122.4091297"}) => {

  let place = parseTools.findPlace(str); //place will be an empty string if no place

  return model.words.getWordsApiMatch()
    .then((data) => {
    	//find an api match
      return parseTools.findMatch(str, data);
    })
    .then((api) => {
    	//call api
      return apiHandler(api, loc, place, str);
    });

};

module.exports = response;
