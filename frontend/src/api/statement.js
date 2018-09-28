import client from './';

class Statement {
  fetch() {
    return client.get('/statements');   
  }

  show(id) {
    return client.get(`/statements/${id}`);   
  }

  create(values) {
    return client.post('/statements', values);   
  }

  update(id, values) {
    return client.put(`/statements/${id}`, values);   
  }
}

const statementAPI = new Statement();
export default statementAPI;