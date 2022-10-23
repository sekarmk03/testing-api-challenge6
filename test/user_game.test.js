const request = require('supertest');
const app = require('../app');

// data test
const dataTest = {
    username: 'usertest',
    password: 'password123'
};

let userGameId;

// to test create if fail
// beforeEach( async () => {
//     const isExist = await user_game.findOne({where: {username: dataTest.username}});
//     if(isExist) await user_game.destroy({where: {username: dataTest.username}});
// });

describe(`/user-games endpoint groups`, () => {
    test(`TRUE should create new user game`, async () => {
        try {
            await request(app).post('/user-games/').send(dataTest).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('create new user game success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        username: dataTest.username
                    })
                );
                userGameId = res.body.data.id;
                // console.log(userGameId);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't create new user game, username already used`, async () => {
        try {
            await request(app).post('/user-games/').send(dataTest).then(res => {
                expect(res.statusCode).toBe(409);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('username already used');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`TRUE should get all user game`, async () => {
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

    test(`TRUE should get detail user game`, async () => {
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
                        username: dataTest.username,
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

    test(`TRUE should update user game`, async () => {
        try {
            await request(app).put(`/user-games/${userGameId}`).send({
                username: 'usertestupdated'
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

    test(`TRUE should delete user game`, async () => {
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

    test(`FALSE shouldn't get detail user game, user doesn't exist`, async () => {
        try {
            await request(app).get(`/user-games/${userGameId}`).then(async (res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't update user game, user doesn't exist`, async () => {
        try {
            await request(app).put(`/user-games/${userGameId}`).send({
                username: 'azarnuzy'
            }).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't delete user game, user doesn't exist`, async () => {
        try {
            await request(app).delete(`/user-games/${userGameId}`).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});