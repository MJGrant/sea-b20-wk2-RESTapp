var server = require('../../server');
var chai = require('chai'); //$ npm install --save-dev chai-http
var chaihttp = require('chai-http');

//need to make a server.js simple express server
chai.use(chaihttp);
var expect = chai.expect;

describe('200 ok', function() {
  it('should get 200', function(done) { //pass done so it knows when it's done
    //mocha knows what to place as the parameter
    chai.request('http://localhost:3000')
    .get('/')
    .res(function(res) {
      expect(res).to.have.status(200);
      done(); //common pattern, here's "done". Grunt plugins use this pattern.
    });
  });
});

//to run test:
//$ mocha test/mocha/200-ok-test.js