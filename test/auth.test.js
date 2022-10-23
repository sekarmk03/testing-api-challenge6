const request = require('supertest');
const app = require('../app');
const {user_game} = require('../models')

// data test
const dataTest = {
    username: 'usertest',
    password: 'password123'
};

let token = '';

describe(`/auth endpoint group`, () => {
    // to delete user before register
    beforeAll(async () => {
        const isExist = await user_game.findOne({where: {username: dataTest.username}});
        if(isExist) await user_game.destroy({where: {username: dataTest.username}});
    });
    test(`TRUE should register success`, async () => {
        try {
            await request(app).post('/auth/register').send(dataTest).then(res => {
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
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    })

    test(`FALSE should register fail, username already used`, async () => {
        try {
            await request(app).post('/auth/register').send(dataTest).then(res => {
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
            await request(app).post('/auth/login').send(dataTest).then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('token');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toEqual('login success');
                expect(res.body.data).toEqual(
                    expect.objectContaining({
                        username: dataTest.username,
                        token: expect.any(String)
                    })
                );
                token = res.body.data.token;
            })
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    // test(`FALSE should login fail, username doesnt exist`, async () => {
    //     try {
    //         await request(app).post('/auth/login').send({
    //             username: 9999,
    //             password: dataTest.password
    //         }).then(res => {
    //             expect(res.statusCode).toBe(400);
    //             expect(res.body).toHaveProperty('status');
    //             expect(res.body).toHaveProperty('message');
    //             expect(res.body).toHaveProperty('data');
    //             expect(res.body.status).toBe(false);
    //             expect(res.body.message).toEqual('username doesnt exist');
    //             expect(res.body.data).toBe(null);
    //         })
    //     } catch (err) {
    //         expect(err).toBe('error');
    //     }
    // });

    test(`FALSE should login fail, wrong username/password`, async () => {
        try {
            await request(app).post('/auth/login').send({
                username: dataTest.username,
                password: `${dataTest.password}0`
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