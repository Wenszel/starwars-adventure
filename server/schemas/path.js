const mongoose = require('mongoose');
const pathsSchema = new mongoose.Schema({
    path: {
        type: 'Array',
    }
},)
const paths = mongoose.model('paths', pathsSchema);
module.exports = paths;