const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should create song', async() => {
    const res = await request(app)
      .post('/api/v1/songs')
      .send({ title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
     
    expect(res.body).toEqual({ id: expect.any(String), title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
  });

  it('should get all songs', async () => {
    await Song.insert({ title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' });
    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual([{  id: expect.any(String), title: 'Sangria', artist: 'Blake Shelton', album: 'Bringing Back The Sunshine' }]);
  });

});
