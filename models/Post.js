const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
    body: String,
    username: String,
    createdat: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', PostSchema)