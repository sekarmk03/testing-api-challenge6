const request = require('supertest');
const app = require('../app');
const { user_game } = require('../models');
const seed = require('../db/seeders/20221023032325-user_game');

// data test
const userTest = {
    username: 'usertest',
    password: 'password123'
};

let userGameId;

// beforeEach( async () => {
//     const isExist = await user_game.findOne({where: {username: userTest.username}});
//     if(isExist) await user_game.destroy({where: {username: userTest.username}});
// });

describe('/user-games USER GAME TEST', () => {
    test('should create new user game', async () => {
        try {
            await request(app).post('/user-games/').send({
                username: userTest.username,
                password: userTest.password
            }).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('create new user game success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        username: userTest.username
                    })
                );
                userGameId = res.body.data.id;
                console.log(userGameId);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('should get all user game', async () => {
        try {
            await request(app).get('/user-games/').then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('get all user game success');
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            username: expect.any(String),
                            password: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        })
                    ])
                );
                // done();
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('should get detail user game', async () => {
        try {
            await request(app).get(`/user-games/${userGameId}`).then(async (res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('get user game success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        id: userGameId,
                        username: userTest.username,
                        password: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    })
                );
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('should update user game', async () => {
        try {
            await request(app).put(`/user-games/${userGameId}`).send({
                username: 'azarnuzy'
            }).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('update user game success');
                expect(res.body.data).toEqual(
                    expect.arrayContaining([1])
                );
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('should delete user game', async () => {
        try {
            await request(app).delete(`/user-games/${userGameId}`).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('delete user game success');
                expect(res.body.data).toBe(1);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});