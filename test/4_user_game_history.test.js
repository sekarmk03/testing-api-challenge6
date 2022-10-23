// const request = require('supertest');
// const app = require('../app');
// const token = require('./1_auth.test');

// // data test
// const dataTest3 = {
//     user_id: 3,
//     spend_time: 1200,
//     result: 'draw',
//     score: 400
// };

// let userHistoryId;

// describe(`/user-game-histories`, () => {
//     test(`FALSE shouldn't create new user game history, unauthorized`, async () => {
//         try {
//             await request(app).post('/user-game-histories/').send(dataTest3).then(res => {
//                 expect(res.statusCode).toBe(401);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual(`you're not authorized`);
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't create new user game history, user game doesn't exist`, async () => {
//         try {
//             await request(app).post('/user-game-histories/').set('Authorization', `${token}`).send({
//                 user_id: 9999,
//                 spend_time: 1200,
//                 result: 'draw',
//                 score: 400
//             }).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game doesnt exist');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     })

//     test(`TRUE should create new user game history`, async () => {
//         try {
//             await request(app).post('/user-game-histories/').set('Authorization', `${token}`).send(dataTest3).then(res => {
//                 expect(res.statusCode).toBe(201);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('create new user game history success');
//                 expect(res.body.data).toEqual(
//                     expect.objectContaining(dataTest3)
//                 );
//                 userHistoryId = res.body.data.id;
//                 // console.log(userHistoryId);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should get all user game histories`, async () => {
//         try {
//             await request(app).get('/user-game-histories/').set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('get all user game histories success');
//                 expect(res.body.data).toEqual(
//                     expect.arrayContaining([
//                         expect.objectContaining({
//                             id: expect.any(Number),
//                             user_id: expect.any(Number),
//                             spend_time: expect.any(Number),
//                             result: expect.any(String),
//                             score: expect.any(Number)
//                         })
//                     ])
//                 );
//                 // done();
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should get detail user game history`, async () => {
//         try {
//             await request(app).get(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('get user game history success');
//                 expect(res.body.data).toEqual(
//                     expect.objectContaining(dataTest3)
//                 );
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should update user game history`, async () => {
//         try {
//             await request(app).put(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).send({
//                 spend_time: 5200,
//                 result: 'win'
//             }).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('update user game history success');
//                 expect(res.body.data).toEqual(
//                     expect.arrayContaining([1])
//                 );
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should delete user game history`, async () => {
//         try {
//             await request(app).delete(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(201);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('delete user game history success');
//                 expect(res.body.data).toBe(1);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't get detail user game history, user game history doesn't exist`, async () => {
//         try {
//             await request(app).get(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game history not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't update user game history, user game history doesn't exist`, async () => {
//         try {
//             await request(app).put(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).send({
//                 spend_time: 7100,
//                 result: 'lose'
//             }).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game history not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't delete user game history, user game history doesn't exist`, async () => {
//         try {
//             await request(app).delete(`/user-game-histories/${userHistoryId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game history not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });
// });