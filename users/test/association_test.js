const mongoose = require('mongoose')
const User = require('../src/user')
const Comment = require('../src/comments')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'Post Title', content: 'This is not a content' })
    comment = new Comment({ content: 'This is a great comment' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save()
    ])
      .then(() => done())
  })

  it.only('Saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .then((user) => {
        console.log(user)
        done()
      })
  })
})
