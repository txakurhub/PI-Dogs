/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: '5 - 15',
  weight: '5 - 15',
  life_span: '5 - 15',
  id: 5000,
  temperaments: "Happy"
};

describe('Dogs Api routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Breed.sync({ force: true }).then(() => Breed.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () => agent.get('/dogs').expect(200));
    it('should get dogs from Api', () => agent.get('/dogs'))
  });
});
