const mongoose = require('mongoose');
const rankingSchema = new mongoose.Schema({
    player: {
        type: 'String',
    },
    time: {
        type: 'Number',
    }
},)
const rankingModel = mongoose.model('ranking', rankingSchema);
module.exports = rankingModel;