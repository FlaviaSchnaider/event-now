const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  answers: {
    type: Map,
    of: [String], // array de opções marcadas por pergunta (mesmo se for 1)
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vote', voteSchema);
