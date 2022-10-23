// const request = require('supertest');
// const app = require('../app');

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
//     test(`FALSE shouldn't create new user game biodata, user game doesn't exist`, async () => {
//         try {
//             await request(app).post('/user-game-biodata/').send({
//                 user_id: 9999,
//                 fullname: dataTest.fullname,
//                 email: dataTest.email,
//                 telp: dataTest.telp,
//                 age: dataTest.age,
//                 city: dataTest.city
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
//             await request(app).post('/user-game-biodata/').send({
//                 user_id: dataTest.user_id,
//                 fullname: dataTest.fullname,
//                 email: dataTest.email,
//                 telp: dataTest.telp,
//                 age: dataTest.age,
//                 city: dataTest.city
//             }).then(res => {
//                 expect(res.statusCode).toBe(201);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('create new user game biodata success');
//                 expect(res.body.data).toEqual(
//                     expect.objectContaining({
//                         user_id: dataTest.user_id,
//                         fullname: dataTest.fullname,
//                         email: dataTest.email,
//                         telp: dataTest.telp,
//                         age: dataTest.age,
//                         city: dataTest.city
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
//             await request(app).post('/user-game-biodata/').send({
//                 user_id: 9999,
//                 fullname: dataTest.fullname,
//                 email: dataTest.email,
//                 telp: dataTest.telp,
//                 age: dataTest.age,
//                 city: dataTest.city
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
//     });

//     test(`TRUE should get all user game`, async () => {
//         try {
//             await request(app).get('/user-game-biodata/').then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('get all user game success');
//                 expect(res.body.data).toEqual(
//                     expect.arrayContaining([
//                         expect.objectContaining({
//                             id: expect.any(Number),
//                             username: expect.any(String),
//                             password: expect.any(String),
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

//     test(`TRUE should get detail user game`, async () => {
//         try {
//             await request(app).get(`/user-game-biodata/${userBiodataId}`).then(async (res) => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('get user game success');
//                 expect(res.body.data).toEqual(
//                     expect.objectContaining({
//                         id: userBiodataId,
//                         username: dataTest.username,
//                         password: expect.any(String),
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
//             await request(app).put(`/user-game-biodata/${userBiodataId}`).send({
//                 username: 'usertestupdated'
//             }).then(res => {
//                 expect(res.statusCode).toBe(200);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('update user game success');
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
//             await request(app).delete(`/user-game-biodata/${userBiodataId}`).then(res => {
//                 expect(res.statusCode).toBe(201);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(true);
//                 expect(res.body.message).toEqual('delete user game success');
//                 expect(res.body.data).toBe(1);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't get detail user game, user doesn't exist`, async () => {
//         try {
//             await request(app).get(`/user-game-biodata/${userBiodataId}`).then(async (res) => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't update user game, user doesn't exist`, async () => {
//         try {
//             await request(app).put(`/user-game-biodata/${userBiodataId}`).send({
//                 username: 'azarnuzy'
//             }).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });

//     test(`FALSE shouldn't delete user game, user doesn't exist`, async () => {
//         try {
//             await request(app).delete(`/user-game-biodata/${userBiodataId}`).then(res => {
//                 expect(res.statusCode).toBe(400);
//                 expect(res.body).toHaveProperty('status');
//                 expect(res.body).toHaveProperty('message');
//                 expect(res.body).toHaveProperty('data');
//                 expect(res.body.status).toBe(false);
//                 expect(res.body.message).toEqual('user game not found');
//                 expect(res.body.data).toBe(null);
//             })
//         } catch (err) {
//             expect(err).toBe('error');
//         }
//     });
// });