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
})
