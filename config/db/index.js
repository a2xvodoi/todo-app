const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb+srv://a2xvodoi:a16112000@cluster0.xmv6l.mongodb.net/todo-app?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('connect susseccfully mongodb');
    } catch (error) {
        console.log('connect falure mongodb');
    }
    
}

module.exports = { connect};
