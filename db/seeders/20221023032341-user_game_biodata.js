'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('user_game_biodata', [
      {
        user_id: 1,
        fullname: 'Sekar Madu Kusumawardani',
        email: 'sekarmadu99@gmail.com',
        telp: '089691798633',
        age: 20,
        city: "Bandung",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        fullname: 'Muhammad Azar Nuzy',
        email: 'azarnuzy@gmail.com',
        telp: '082246449106',
        age: 21,
        city: "Pandeglang",
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user_game_biodata', null, {});
  }
};
