import client from './';

class Category {
  fetch() {
    return client.get('/categories');   
  }

  show(id) {
    return client.get(`/chat/${id}`);   
  }
}

const categoryAPI = new Category();
export default categoryAPI;