const { getPostsData, getUsersData } = require('./requests')

class Letter {

  // HELPERS
  formatCompanyName (company) {
    return company.name
  }

  formatAddress (address) {
    return `${address.street}, ${address.suite} - ${address.zipcode} ${address.city}`
  }


  // GET METHOD
  get() {
    return Promise.all([
      getUsersData(),
      getPostsData(),
    ]).then(([userRes, postRes]) => {
      const users = userRes.data.map((user) => {
        const posts = postRes.data.filter((post) => post.userId === user.id);
        const updatedPostData = posts.map(({id, title, body}) => ({id, title, body}))
        const data = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: this.formatAddress(user.address),
          phone: user.phone,
          website: user.website,
          company: this.formatCompanyName(user.company),
          posts: updatedPostData
        }
        return data ;
      })
      return users;
    }).catch((e) => {
      if (e.code === 'ERR_BAD_REQUEST') {
        throw new Error('Data could not be found');
      } else {
        throw new Error('Missing authentication token');
      }

    })
  }
}

module.exports = Letter;
