import client from './';

class Review {
  fetch(id) {
    return client.get(`/statements/${id}/reviews`);   
  }

  create(id, values) {
    return client.post(`/statements/${id}/reviews`, values);
  }
}

const reviewAPI = new Review();
export default reviewAPI;