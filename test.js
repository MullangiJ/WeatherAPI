//const { doesNotMatch } = require('assert');
var assert = require('assert');
const { expect } = require('chai');
var request = require("request");
//describe('weatherAPI', function () {
  describe('getDatafromAPI', function () {
    it('should return 200 response with the value', function () {
      var url = "http://localhost:3000/?city=Vijayawada";
      request(url, function (error, response, body) {
      console.log('response:', body, response.statusCode);
        expect(response.statusCode).to.equal(200);
      });
    });
    it('should return 400 response with the value', function () {
      var url = "http://localhost:3000/?city=";
      request(url, function (error, response, body) {
        console.log('response:', body, response.statusCode);
        expect(response.statusCode).to.equal(400);
      });
    });
  });

