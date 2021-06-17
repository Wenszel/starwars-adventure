const mongoose = require('mongoose');
const configSchema = new mongoose.Schema({
    size: {
        type: 'Number',
    }
},)
const config = mongoose.model('config', configSchema);
module.exports = config;