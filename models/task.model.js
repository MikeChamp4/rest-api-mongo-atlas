const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TaskSchema = schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now,
    }
})

module.exports = mongoose.model('Task', TaskSchema);