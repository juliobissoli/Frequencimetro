import api from '../services/api'

class Auth {
  static loggedIn() {
    return !!localStorage.getItem('logged')
  }

  static async login(email, password) {
    const body = {
      email,
      password
    }
    try {
      await api.post('/login', body).then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('logged', true)
      })
      return true
    } catch (e) {
      return false
    }
  }

  static token() {
    return localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('logged')
    localStorage.removeItem('token')
  }
}

export default Auth
