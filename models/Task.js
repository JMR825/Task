const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Task', taskSchema);
