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
  })
})
