var objectId = require('mongodb').ObjectId;

module.exports = function(app, db){
    
    //create
    app.post('/nodes', (req, res) => {

        const myDB = db.db('notesdb');
      //  myDB.collection('notes');

        const note = {text: req.body.body,  title: req.body.title};
        myDB.collection('notes').insert(note, (err, result) => {
            if(err){
                res.send({'error': 'an error has occured'});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        console.log(req.body); //{title: xxx, body:xxx}
        //res.send('Hello from Post');
    });

    //Read
    app.get('/nodes/:id', (req, res) => {

        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = {'_id' : new objectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'an error again'});
            }
            else{
                res.send(item);
            }
        });

        console.log('asking for a note');
     //   res.send('this should be reurned note');
    });

    //Update
    app.put('/nodes/:id', (req, res) => {
        
        const myDB = db.db('notesdb');
        
        const id = req.params.id;
        const details = {'_id' : new objectId(id)};
        const note = {text: req.body.body,  title: req.body.title};

        myDB.collection('notes').update(details, note, (err, result) => {
           if(err){
                res.send({'error': 'an error again'});
           }
           else{
                 res.send(note);
                    }
                });
        
                console.log('Updating a note');
             //   res.send('this should be reurned note');
            });

    //Delete
    app.delete('/nodes/:id', (req, res) => {
        
        const myDB = db.db('notesdb');
        
        const id = req.params.id;
        const details = {'_id' : new objectId(id)};

        myDB.collection('notes').remove(details, (err, item) => {
           if(err){
                res.send({'error': 'an error again'});
           }
           else{
                 res.send('Note'+ id + 'deleted!');
                    }
                });
        
                console.log('Updating a note');
             //   res.send('this should be reurned note');
            });
};