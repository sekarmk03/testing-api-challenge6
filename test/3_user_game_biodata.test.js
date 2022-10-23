// const request = require('supertest');
// const app = require('../app');
// const token = require('./1_auth.test');

// console.log(token);

// // data test
// const dataTest = {
//     user_id: 1,
//     fullname: 'user test',
//     email: 'user@test.com',
//     telp: '089123456789',
//     age: 22,
//     city: 'Bogor'
// };

// let userBiodataId;

// // to test create if fail
// // beforeEach( async () => {
// //     const isExist = await user_game_biodata.findOne({where: {user_id: dataTest.user_id}});
// //     if(isExist) await user_game_biodata.destroy({where: {user_id: dataTest.user_id}});
// // });

// describe(`/user-game-biodata`, () => {
//     test(`FALSE shouldn't create new user game biodata, unauthorized`, async () => {
//         try {
//             await request(app).post('/user-game-biodata/').send(dataTest2).then(res => {
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
//     })

//     test(`FALSE shouldn't create new user game biodata, user game doesn't exist`, async () => {
//         try {
//             await request(app).post('/user-game-biodata/').set('Authorization', `${token}`).send({
//                 user_id: 9999,
//                 fullname: dataTest2.fullname,
//                 email: dataTest2.email,
//                 telp: dataTest2.telp,
//                 age: dataTest2.age,
//                 city: dataTest2.city
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

//     test(`TRUE should create new user game biodata`, async () => {
//         try {
//             await request(app).post('/user-game-biodata/').set('Authorization', `${token}`).send(dataTest2).then(res => {
//                 expect(res.statusCode).toBe(201);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('create new user game biodata success');
//                 expect(res.body.data).toEqual(
//                     expect.objectContaining({
//                         user_id: dataTest2.user_id,
//                         fullname: dataTest2.fullname,
//                         email: dataTest2.email,
//                         telp: dataTest2.telp,
//                         age: dataTest2.age,
//                         city: dataTest2.city
//                     })
//                 );
//                 userBiodataId = res.body.data.id;
//                 // console.log(userBiodataId);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't create new user game biodata, user game biodata already exist`, async () => {
//         try {
//             await request(app).post('/user-game-biodata/').set('Authorization', `${token}`).send(dataTest2).then(res => {
//                 expect(res.statusCode).toBe(409);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game biodata already exist');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should get all user game biodata`, async () => {
//         try {
//             await request(app).get('/user-game-biodata/').set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('get all user game biodata success');
//                 expect(res.body.data).toEqual(
//                     expect.arrayContaining([
//                         expect.objectContaining({
//                             id: expect.any(Number),
//                             user_id: expect.any(Number),
//                             fullname: expect.any(String),
//                             email: expect.any(String),
//                             telp: expect.any(String),
//                             age: expect.any(Number),
//                             city: expect.any(String),
//                             createdAt: expect.any(String),
//                             updatedAt: expect.any(String)
//                         })
//                     ])
//                 );
//                 // done();
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should get detail user game biodata`, async () => {
//         try {
//             await request(app).get(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('get user game biodata success');
//                 expect(res.body.data).toEqual(
//                     expect.objectContaining({
//                         id: userBiodataId,
//                         user_id: expect.any(Number),
//                         fullname: expect.any(String),
//                         email: expect.any(String),
//                         telp: expect.any(String),
//                         age: expect.any(Number),
//                         city: expect.any(String),
//                         createdAt: expect.any(String),
//                         updatedAt: expect.any(String)
//                     })
//                 );
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should update user game`, async () => {
//         try {
//             await request(app).put(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).send({
//                 user_id: 2,
//                 fullname: 'this is user test'
//             }).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('update user game biodata success');
//                 expect(res.body.data).toEqual(
//                     expect.arrayContaining([1])
//                 );
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`TRUE should delete user game`, async () => {
//         try {
//             await request(app).delete(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(201);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('delete user game biodata success');
//                 expect(res.body.data).toBe(1);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't get detail user game biodata, user game biodata doesn't exist`, async () => {
//         try {
//             await request(app).get(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game biodata not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't update user game biodata, user game biodata doesn't exist`, async () => {
//         try {
//             await request(app).put(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).send({
//                 fullname: 'user testing sksk',
//                 city: 'karawang'
//             }).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game biodata not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't delete user game biodata, user game biodata doesn't exist`, async () => {
//         try {
//             await request(app).delete(`/user-game-biodata/${userBiodataId}`).set('Authorization', `${token}`).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game biodata not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });
// });