'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sandbox');
const db = mongoose.connection;

db.on('error', () => {
    console.error('connection err: ', err);
});

db.once('open', () => {
    console.log('database connection successful');
    // All dataabase communication goes here
    const Schema = mongoose.Schema;
    const AnimalSchema = new Schema({
        type: String,
        color: String,
        size: String,
        mass: Number,
        name: String
    });
    const Animal = mongoose.model('Animal', AnimalSchema);
    const elephant = new Animal({
        type: 'elephant',
        color: 'gray',
        size: 'big',
        mass: 6000,
        name: 'Lawrence'
    });

    elephant.save( (err) => {
        if (err) console.error('Save failed.');
        else console.log('Animal saved.');
        db.close( () => {
            console.log('Database closed');
        } );
    } );

});

