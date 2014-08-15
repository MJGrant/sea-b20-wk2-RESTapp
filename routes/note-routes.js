var Note = require('../models/note');

module.exports = function(app) {
//using this pattern means we don't have to worry about back and forth passing
//when we pass in app, it's actually manipulating the app we pass in
  var baseUrl = '/api/v_0_0_1/notes';

  app.get(baseUrl, function (req, res) {
    Note.find({}, function(err, notes) { //pass empty object into mongodb = find everything!
      if (err) return res.status(500).json(err);
      return res.json(notes);
    });
  });

  app.post(baseUrl, function(req, res) {
    var note = new Note(req.body);
    note.save(function(err, resNote) { //resNote - don't use res or note
      if (err) return resNote.status(500).json(err);
      return res.send(resNote);
    });
  });

  app.get(baseUrl + '/:id', function(req, res) {
    Note.findOne({'_id': req.params.id}, function(err, note) {
      if (err) return res.status(500).json(err);
      return res.json(note);
    });
  }); //findOne is for finding one of an array

  app.put(baseUrl + '/:id', function (req, res) {
    var note = req.body;
    delete note._id;
    Note.findOneAndUpdate({'_id':req.params.id}, note, function(err, resNote) {
      if (err) return res.status(500).json(err);
      return res.status(202).json(resNote);
    });
  });

  app.delete(baseUrl + '/:id', function (req, res) {
    Note.remove({'_id' : req.params.id}, function(err, resNote) {
      if (err) return res.status(500).json(err);
      return res.status(200).json({'msg':'deleted'});
    });
  });
};

//stretch goal:
//abstract all the callbacks into a function that you can just put into there so eah one is one line
//npm crudify