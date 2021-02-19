const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')
const { UserInputError } = require('apollo-server')

module.exports = {

    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }

            const post = Post.findById(postId)

            // console.log("Length tg: ", post.comments.length)
            if (post) {
                // console.log("Length: ", post.comments.length)
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            } else throw new UserInputError('Post not found')
        }

    }
}