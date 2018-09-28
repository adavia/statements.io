import client from './';

class Auth {
  authenticate() {
    return client.get('/auth/me');   
  }

  login(values) {
    return client.post('/auth/login', values);   
  }

  logout() {
    return client.delete('/auth/logout');   
  }
}

const authAPI = new Auth();
export default authAPI;