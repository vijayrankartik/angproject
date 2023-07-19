const mongoose = require('mongoose')
const { type } = require('os')

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}
})

module.exports = mongoose.model("Post", postSchema)