const axios = require('axios')

class User {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000'
    })
  }
  list() {
    return this.api.get('/users').then(res => res.data)
  }
  profiles(id) {
    return this.api.get(`/users/${id}/profiles`).then(res => {
      const data = res.data
      console.log(data)
      return data
    })
  }
}

module.exports = new User()