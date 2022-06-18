import request from 'supertest'

import { createServer } from '../src/server'
import { User } from '../src/types'

const port = 8000
const hostname = '127.0.0.1'

const user = {
  id: 'c145dcf1-ed01-4cbf-9603-470a96e44aa8',
  username: 'Bob',
  age: 99,
  hobbies: ['sport', 'music'],
}
const initialData = [user] as User[]

describe('The 1 test scenario', () => {
  const server = createServer(initialData)

  beforeAll((done) => {
    server.listen(port, hostname, () => done())
  })

  afterAll((done) => {
    server.close(() => done())
  })

  it('Get all records with a GET api/users request (initial data is expected)', async () => {
    await request(server)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200, initialData)
  })

  it('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected))', async () => {
    await request(server)
      .get(`/api/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(200, user)
  })

  it('We try to update the initial data record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id))', async () => {
    await request(server)
      .put(`/api/users/${user.id}`)
      .send({ username: 'Vlad' })
      .expect('Content-Type', /json/)
      .expect(200, { ...user, username: 'Vlad' })
  })

  it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected))', async () => {
    await request(server)
      .delete(`/api/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(204)
  })

  it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object))', async () => {
    await request(server)
      .get(`/api/users/${user.id}`)
      .expect('Content-Type', /json/)
      .expect(404)
  })

  it('A new object is created by a POST api/users request (a response containing newly created record is expected))', async () => {
    const newUser = {
      username: 'Vlad',
      age: 24,
      hobbies: ['sport', 'music'],
    }

    await request(server)
      .post(`/api/users`)
      .send(newUser)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toEqual({ ...newUser, id: expect.any(String) })
      })
  })
})
