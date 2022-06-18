import path from 'path'
import { config } from 'dotenv'
import request from 'supertest'

import { createServer } from '../src/server'
import { User } from '../src/types'

config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
})

const port = (process.env.PORT || 3000) as number
const hostname = process.env.HOST_NAME || 'localhost'

describe('The 1 test scenario', () => {
  const user = {
    id: 'c145dcf1-ed01-4cbf-9603-470a96e44aa8',
    username: 'Bob',
    age: 99,
    hobbies: ['sport', 'music'],
  }
  const initialData = [user] as User[]

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
      .post('/api/users')
      .send(newUser)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toEqual({ ...newUser, id: expect.any(String) })
      })
  })
})

describe('The 2 test scenario', () => {
  const noUuid = '123'
  const uuid = 'c145dcf1-ed01-4cbf-9603-470a96e44aa8'
  const user = {
    username: 'Vlad',
    age: 24,
    hobbies: ['sport', 'music'],
  }
  const initialData = [] as User[]

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

  it('A new object is created by a POST api/users request (a response containing newly created record is expected))', async () => {
    await request(server)
      .post('/api/users')
      .send(user)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toEqual({ ...user, id: expect.any(String) })
      })
  })

  it('Get all records with a GET api/users request (the array of user is expected))', async () => {
    await request(server)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual([{ ...user, id: expect.any(String) }])
      })
  })

  it('We try to update the initial data record with a PUT api/users/uuid request (a response with 404 status expected))', async () => {
    await request(server)
      .get(`/api/users/${uuid}`)
      .expect('Content-Type', /json/)
      .expect(404, { message: `User with id ${uuid} not found` })
  })

  it('We try to update the initial data record with a PUT api/users/noUuid request (a response with 400 status expected))', async () => {
    await request(server)
      .get(`/api/users/${noUuid}`)
      .expect('Content-Type', /json/)
      .expect(400, { message: `User id ${noUuid} is invalid (not uuid)` })
  })

  it('With a DELETE api/users/noUuid request, we had an error (a response with 400 status expected))', async () => {
    await request(server)
      .delete(`/api/users/${noUuid}`)
      .expect('Content-Type', /json/)
      .expect(400, { message: `User id ${noUuid} is invalid (not uuid)` })
  })
})

describe('The 3 test scenario', () => {
  const noUuid = '123'
  const uuid = 'c145dcf1-ed01-4cbf-9603-470a96e44aa8'
  const userVlad = {
    username: 'Vlad',
    age: 24,
    hobbies: ['sport', 'music'],
  }
  const userBob = {
    username: 'Bob',
    age: 99,
    hobbies: [],
  }
  const initialData = [] as User[]

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

  it('A new object is created by a POST api/users request (a response containing newly created record is expected))', async () => {
    await request(server)
      .post('/api/users')
      .send(userVlad)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toEqual({ ...userVlad, id: expect.any(String) })
      })
  })

  it('A new object is created by a POST api/users request (a response containing newly created record is expected))', async () => {
    await request(server)
      .post('/api/users')
      .send(userBob)
      .then((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toEqual({ ...userBob, id: expect.any(String) })
      })
  })

  it('Get all records with a GET api/users request (the array of users is expected))', async () => {
    await request(server)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body).toEqual([
          { ...userVlad, id: expect.any(String) },
          { ...userBob, id: expect.any(String) },
        ])
      })
  })

  it('We try to GET non-existent with a GET api/users/uuid request (a response with 404 status expected))', async () => {
    await request(server)
      .get(`/api/users/${uuid}`)
      .expect('Content-Type', /json/)
      .expect(404, { message: `User with id ${uuid} not found` })
  })

  it('We try to GET non-existent record with a GET api/users/noUuid request (a response with 400 status expected))', async () => {
    await request(server)
      .get(`/api/users/${noUuid}`)
      .expect('Content-Type', /json/)
      .expect(400, { message: `User id ${noUuid} is invalid (not uuid)` })
  })

  it('We try to GET non-existent record with a GET api/nonExistentPath request (a response with 404 status expected))', async () => {
    await request(server)
      .get('/api/nonExistentPath')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Route not found' })
  })
})
