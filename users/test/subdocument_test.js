const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('Can crate a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'My nested post' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'My nested post')
        done()
      })
  })

  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({ name: 'Joe', posts: [] })
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('Can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
