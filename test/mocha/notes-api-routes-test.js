var server = require('../../server');
var chai = require('chai'); //$ npm install chai-http
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('noteRoutes', function() {
  var url = 'http://localhost:3000';
  var note = {
    id: '',
    name: '',
    body: ''
  };
  var id;

  it('creates a new note', function (done) {
    chai.request(url)
      .post('/api/v_0_0_1/notes') //post is for new notes
      .req(function(req) {
        req.send({"noteBody":"a new note"});
      })
      .res(function(res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.noteBody).to.eql('a new note');
        id = res.body._id;
        done();
      });
  });

  it('gets a note', function (done) {
    chai.request(url)
      .get('/api/v_0_0_1/notes')
      .res(function(res) {
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body[0]).to.have.property('noteBody');
        done();
      });
  });

  it('gets a single note', function(done) {
    chai.request(url)
      .get('/api/v_0_0_1/notes/' + id)
      .res(function(res) {
          expect(res).to.have.status(200);
          expect(res.body.noteBody).to.eql('a new note');
          expect(res.body._id).to.eql(id);
          done();
      });
  });

  it('updates a note', function (done) {
    chai.request(url)
      .put('/api/v_0_0_1/notes/' + id) //use put to get existing note (why not by ID?)
      .req(function(req) {
        req.send({"noteBody":"an updated note"}); //update the contents of that note
      })
      .res(function(res) {
        expect(res).to.have.status(202);
        expect(res.body.noteBody).to.eql('an updated note');
        done();
      });
  });

  it('deletes a note', function (done) {
    chai.request(url)
      .del('/api/v_0_0_1/notes/' + id) //add note.id
      .res(function(res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('deleted');
        done();
      });
  });

});



//update a single one
//think about what the tests should look like for these things
//how to test a full CRUD of the note with nothing in it (assume DB empty)
//test file not dependent on other test file contents
//hint: do creation first when testing an API