const request = require('supertest');
const app = require('../app');
const {user_game} = require('../models')

// data test user_game
const dataTest1 = {
    username: 'usertest',
    password: 'password123'
};

// data test user_game_biodata
const dataTest2 = {
    user_id: 3,
    fullname: 'user test',
    email: 'user@test.com',
    telp: '089123456789',
    age: 22,
    city: 'Bogor'
};

// data test user_game_history
const dataTest3 = {
    user_id: 3,
    spend_time: 1200,
    result: 'draw',
    score: 400
};

let userGameId;
let userBiodataId;
let userHistoryId;

let token = '';

describe(`/auth endpoint group`, () => {
    // to delete user before register
    beforeAll(async () => {
        const isExist = await user_game.findOne({where: {username: dataTest1.username}});
        if(isExist) await user_game.destroy({where: {username: dataTest1.username}});
    });

    test(`TRUE should register success`, async () => {
        try {
            await request(app).post('/auth/register').send(dataTest1).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('create new user game success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        username: dataTest1.username
                    })
                );
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    })

    test(`FALSE should register fail, username already used`, async () => {
        try {
            await request(app).post('/auth/register').send(dataTest1).then(res => {
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

    test(`TRUE should login success`, async () => {
        try {
            await request(app).post('/auth/login').send(dataTest1).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('token');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('login success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        username: dataTest1.username,
                        token: expect.any(String)
                    })
                );
                token = res.body.data.token;
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE should login fail, wrong username/password`, async () => {
        try {
            await request(app).post('/auth/login').send({
                username: dataTest1.username,
                password: `${dataTest1.password}0`
            }).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('wrong username or password');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

})

describe(`/user-games endpoint groups`, () => {
    beforeAll(async () => {
        const isExist = await user_game.findOne({where: {username: dataTest1.username}});
        if(isExist) await user_game.destroy({where: {username: dataTest1.username}});
    });

    test(`TRUE should create new user game`, async () => {
        try {
            await request(app).post('/user-games/').send(dataTest1).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('create new user game success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        username: dataTest1.username
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
            await request(app).post('/user-games/').send(dataTest1).then(res => {
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
                        username: dataTest1.username,
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

describe(`/user-game-biodata`, () => {
    test(`FALSE shouldn't create new user game biodata, unauthorized`, async () => {
        try {
            await request(app).post('/user-game-biodata/').send(dataTest2).then(res => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual(`you're not authorized`);
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    })

    test(`FALSE shouldn't create new user game biodata, user game doesn't exist`, async () => {
        try {
            await request(app).post('/user-game-biodata/').set('Authorization', `${token}`).send({
                user_id: 9999,
                fullname: dataTest2.fullname,
                email: dataTest2.email,
                telp: dataTest2.telp,
                age: dataTest2.age,
                city: dataTest2.city
            }).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game doesnt exist');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    })

    test(`TRUE should create new user game biodata`, async () => {
        try {
            await request(app).post('/user-game-biodata/').set('Authorization', `${token}`).send(dataTest2).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('create new user game biodata success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        user_id: dataTest2.user_id,
                        fullname: dataTest2.fullname,
                        email: dataTest2.email,
                        telp: dataTest2.telp,
                        age: dataTest2.age,
                        city: dataTest2.city
                    })
                );
                userBiodataId = res.body.data.id;
                // console.log(userBiodataId);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't create new user game biodata, user game biodata already exist`, async () => {
        try {
            await request(app).post('/user-game-biodata/').set('Authorization', `${token}`).send(dataTest2).then(res => {
                expect(res.statusCode).toBe(409);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game biodata already exist');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`TRUE should get all user game biodata`, async () => {
        try {
            await request(app).get('/user-game-biodata/').set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('get all user game biodata success');
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            user_id: expect.any(Number),
                            fullname: expect.any(String),
                            email: expect.any(String),
                            telp: expect.any(String),
                            age: expect.any(Number),
                            city: expect.any(String),
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

    test(`TRUE should get detail user game biodata`, async () => {
        try {
            await request(app).get(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('get user game biodata success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        id: userBiodataId,
                        user_id: expect.any(Number),
                        fullname: expect.any(String),
                        email: expect.any(String),
                        telp: expect.any(String),
                        age: expect.any(Number),
                        city: expect.any(String),
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
            await request(app).put(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).send({
                user_id: 2,
                fullname: 'this is user test'
            }).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('update user game biodata success');
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
            await request(app).delete(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('delete user game biodata success');
                expect(res.body.data).toBe(1);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't get detail user game biodata, user game biodata doesn't exist`, async () => {
        try {
            await request(app).get(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game biodata not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't update user game biodata, user game biodata doesn't exist`, async () => {
        try {
            await request(app).put(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).send({
                fullname: 'user testing sksk',
                city: 'karawang'
            }).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game biodata not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't delete user game biodata, user game biodata doesn't exist`, async () => {
        try {
            await request(app).delete(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game biodata not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});

describe(`/user-game-histories`, () => {
    test(`FALSE shouldn't create new user game history, unauthorized`, async () => {
        try {
            await request(app).post('/user-game-histories/').send(dataTest3).then(res => {
                expect(res.statusCode).toBe(401);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual(`you're not authorized`);
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't create new user game history, user game doesn't exist`, async () => {
        try {
            await request(app).post('/user-game-histories/').set('Authorization', `${token}`).send({
                user_id: 9999,
                spend_time: 1200,
                result: 'draw',
                score: 400
            }).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game doesnt exist');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    })

    test(`TRUE should create new user game history`, async () => {
        try {
            await request(app).post('/user-game-histories/').set('Authorization', `${token}`).send(dataTest3).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('create new user game history success');
                expect(res.body.data).toEqual(
                    expect.objectContaining(dataTest3)
                );
                userHistoryId = res.body.data.id;
                // console.log(userHistoryId);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`TRUE should get all user game histories`, async () => {
        try {
            await request(app).get('/user-game-histories/').set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('get all user game histories success');
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            user_id: expect.any(Number),
                            spend_time: expect.any(Number),
                            result: expect.any(String),
                            score: expect.any(Number)
                        })
                    ])
                );
                // done();
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`TRUE should get detail user game history`, async () => {
        try {
            await request(app).get(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('get user game history success');
                expect(res.body.data).toEqual(
                    expect.objectContaining(dataTest3)
                );
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`TRUE should update user game history`, async () => {
        try {
            await request(app).put(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).send({
                spend_time: 5200,
                result: 'win'
            }).then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('update user game history success');
                expect(res.body.data).toEqual(
                    expect.arrayContaining([1])
                );
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`TRUE should delete user game history`, async () => {
        try {
            await request(app).delete(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('delete user game history success');
                expect(res.body.data).toBe(1);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't get detail user game history, user game history doesn't exist`, async () => {
        try {
            await request(app).get(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game history not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't update user game history, user game history doesn't exist`, async () => {
        try {
            await request(app).put(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).send({
                spend_time: 7100,
                result: 'lose'
            }).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game history not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test(`FALSE shouldn't delete user game history, user game history doesn't exist`, async () => {
        try {
            await request(app).delete(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toEqual('user game history not found');
                expect(res.body.data).toBe(null);
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });
});