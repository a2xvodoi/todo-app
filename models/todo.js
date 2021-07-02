const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    ten: String,    
},{
    timestamps: true,
}
);

module.exports = mongoose.model('todo',Todo);